import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlaceBidOnItemCommand } from '../implements/place-bid-on-item.command';
import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common';
import { ItemRepository } from '../../../repository/item.repository';
import { UserRepository } from '../../../../users/repository/user.repository';

const validateBidTime = (
  startTime: Date,
  endTime: Date,
  itemId: string,
  biddedAt: Date | null,
) => {
  const now = new Date();

  if (now < startTime || now > endTime) {
    throw new ForbiddenException({
      description: `Bidding is not allowed on item with ID ${itemId} as it is not active`,
    });
  }

  if (biddedAt && now <= biddedAt) {
    throw new ForbiddenException({
      description: `Bid time must be after the last bid time on item with ID ${itemId}`,
    });
  }
};

@CommandHandler(PlaceBidOnItemCommand)
export class PlaceBidOnItemCommandHandler
  implements ICommandHandler<PlaceBidOnItemCommand>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: PlaceBidOnItemCommand): Promise<void> {
    const item = await this.itemRepository.findById(command.itemId);
    const now = new Date();
    if (!item) {
      throw new NotFoundException({
        description: `Item with ID ${command.itemId} not found`,
      });
    }

    const bidder = await this.userRepository.findById(command.bidderId);
    if (!bidder) {
      throw new NotFoundException({
        description: `User with ID ${command.bidderId} not found`,
      });
    }

    if (item.ownerId === command.bidderId) {
      throw new ForbiddenException({
        description: `Owner cannot place a bid on their own item with ID ${command.itemId}`,
      });
    }

    validateBidTime(item.startTime, item.endTime, item.id, item.biddedAt);

    await this.itemRepository.create({
      ...item,
      currentPrice: command.bidPrice,
      currentBidderId: command.bidderId,
      currentBidder: bidder,
      biddedAt: now,
    });
  }
}
