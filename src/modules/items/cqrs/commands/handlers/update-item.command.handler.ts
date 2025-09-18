import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateItemCommand } from '../implements/update-item.command';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ItemRepository } from 'src/modules/items/repository/item.repository';
import { AuctionTimeVo } from 'src/modules/items/domain/vo/auction-time.vo';

@CommandHandler(UpdateItemCommand)
export class UpdateItemCommandHandler
  implements ICommandHandler<UpdateItemCommand>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(command: UpdateItemCommand): Promise<void> {
    try {
      new AuctionTimeVo(command.startTime, command.endTime).validate();
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException({ description: error.message });
      }
    }

    const item = await this.itemRepository.findById(command.id);

    if (!item) {
      throw new BadRequestException({
        description: `Item with ID ${command.id} not found`,
      });
    }

    if (item.ownerId !== command.ownerId) {
      throw new UnauthorizedException({
        description: 'You are not the owner of this item',
      });
    }

    if (item.currentPrice && item.currentPrice < command.startingPrice) {
      throw new BadRequestException({
        description:
          'Cannot set starting price lower than current price or bids have been placed',
      });
    }

    await this.itemRepository.update(command.id, {
      name: command.name,
      description: command.description,
      startingPrice: command.startingPrice,
      startTime: command.startTime,
      endTime: command.endTime,
    });
  }
}
