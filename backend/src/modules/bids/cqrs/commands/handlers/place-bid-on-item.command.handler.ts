import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PlaceBidOnItemCommand } from "../implements/place-bid-on-item.command";
import { BidRepository } from "modules/bids/repository/bid.repository";
import { UserRepository } from "modules/user/repository/user.repository";
import { ItemRepository } from "modules/items/repository/item.repository";
import { BidDomainValidation } from "modules/bids/domain/bid-domain.validation";
import { DataSource } from "typeorm";

@CommandHandler(PlaceBidOnItemCommand)
export class PlaceBidOnItemCommandHandler
  implements ICommandHandler<PlaceBidOnItemCommand>
{
  constructor(
    private readonly bidRepository: BidRepository,
    private readonly userRepository: UserRepository,
    private readonly itemRepository: ItemRepository,
    private readonly dataSource: DataSource,
  ) {}

  async execute(command: PlaceBidOnItemCommand): Promise<void> {
    const user = await this.userRepository.findByIdOrThrow(command.userId);

    const item = await this.itemRepository.findByIdOrThrow(command.itemId);

    const highestBid = await this.bidRepository.findByItemId(command.itemId);

    BidDomainValidation.ensureBiddingPeriodValid(item.startTime, item.endTime);

    BidDomainValidation.ensureNotOwner(item.ownerId, command.userId);

    BidDomainValidation.ensureBidPriceValid(
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
