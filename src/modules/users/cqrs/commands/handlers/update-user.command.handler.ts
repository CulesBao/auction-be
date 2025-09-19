import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../implements/update-user.command';
import { Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/modules/users/repository/user.repository';
import * as bcrypt from 'bcrypt';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UpdateUserCommand): Promise<void> {
    const { password, ...rest } = command;
    const user = await this.userRepository.findById(command.id);
    if (!user) {
      throw new NotFoundException({
        description: `User with ID ${command.id} not found.`,
      });
    }

    await this.userRepository.create({
      ...user,
      ...rest,
      password: password ? bcrypt.hashSync(password, 10) : user.password,
    });
  }
}
