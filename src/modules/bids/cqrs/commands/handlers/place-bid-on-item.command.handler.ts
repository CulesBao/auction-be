import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlaceBidOnItemCommand } from '../implements/place-bid-on-item.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { BidRepository } from 'src/modules/bids/repository/bid.repository';
import { UserRepository } from 'src/modules/users/repository/user.repository';
import { ItemRepository } from 'src/modules/items/repository/item.repository';
import { BidDomainService } from 'src/modules/bids/domain/bid-domain.service';
import { DataSource } from 'typeorm';

@CommandHandler(PlaceBidOnItemCommand)
export class PlaceBidOnItemCommandHandler
  implements ICommandHandler<PlaceBidOnItemCommand>
{
  constructor(
    @Inject(BidRepository)
    private readonly bidRepository: BidRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: PlaceBidOnItemCommand): Promise<void> {
    const user = await this.userRepository.findById(command.userId);
    if (!user) {
      throw new NotFoundException({
        description: `User with ID ${command.userId} not found.`,
      });
    }

    const item = await this.itemRepository.findById(command.itemId);
    if (!item) {
      throw new NotFoundException({
        description: `Item with ID ${command.itemId} not found.`,
      });
    }

    const highestBid = await this.bidRepository.findByItemId(command.itemId);
    BidDomainService.ensureBiddingPeriodValid(item.startTime, item.endTime);

    BidDomainService.ensureNotOwner(item.ownerId, command.userId);

    BidDomainService.ensureBidPriceValid(
      command.price,
      item.startingPrice,
      highestBid?.price,
    );

    await this.dataSource.transaction(async () => {
      await this.bidRepository.create(command);
      await this.itemRepository.create({
        ...item,
        winner: user,
        winnerId: user.id,
        finalPrice: command.price,
      });
    });
  }
}
