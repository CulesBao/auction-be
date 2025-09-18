import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateItemCommand } from '../implements/create-item.command';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/modules/items/repository/item.repository';
import { UserRepository } from 'src/modules/users/repository/user.repository';
import { AuctionTimeVo } from 'src/modules/items/domain/vo/auction-time.vo';

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
    try {
      new AuctionTimeVo(command.startTime, command.endTime).validate();
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException({ description: error.message });
      }
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
