import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateItemCommand } from '../implements/create-item.command';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/modules/items/repository/item.repository';
import { UserRepository } from 'src/modules/users/repository/user.repository';

@CommandHandler(CreateItemCommand)
export class CreateItemCommandHandler
  implements ICommandHandler<CreateItemCommand>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: CreateItemCommand): Promise<void> {
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

    const user = await this.userRepository.findById(command.ownerId);
    if (!user) {
      throw new NotFoundException({
        description: `User with ID ${command.ownerId} not found`,
      });
    }

    await this.itemRepository.create({
      ...command,
      owner: user,
    });
  }
}
