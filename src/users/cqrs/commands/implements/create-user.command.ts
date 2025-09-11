import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../handlers/create-user.command.handler';
import { ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/users/repository/user.repository';
import { UserMapper } from 'src/users/mappers/user.mapper';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
    implements ICommandHandler<CreateUserCommand> {
    private readonly saltRounds = 10;
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: UserRepository,
    ) { }

    async execute(command: CreateUserCommand): Promise<void> {
        const { name, email, password } = command;

        const isExistingUser = await this.userRepository.existBy(email);
        if (isExistingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const user = UserMapper.toUser({
            name,
            email,
            password: await bcrypt.hash(password, this.saltRounds),
        });

        await this.userRepository.create(user);
    }
}