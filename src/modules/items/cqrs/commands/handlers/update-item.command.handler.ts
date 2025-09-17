import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateItemCommand } from '../implements/update-item.command';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { ItemRepository } from 'src/modules/items/repository/item.repository';

@CommandHandler(UpdateItemCommand)
export class UpdateItemCommandHandler
  implements ICommandHandler<UpdateItemCommand>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(command: UpdateItemCommand): Promise<void> {
    const currentDate = new Date();
    if (command.endTime <= currentDate) {
      throw new BadRequestException({
        description: 'End time must be in the future',
      });
    }
    if (command.startTime >= command.endTime) {
      throw new BadRequestException({
        description: 'Start time must be before end time',
      });
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
