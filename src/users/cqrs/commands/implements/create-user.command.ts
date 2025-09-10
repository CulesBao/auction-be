import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateUserCommand } from "../handlers/create-user.command.handler";
import { IUserRepository } from "src/users/repository/iuser.repository";
import { BadRequestException, ConflictException, Inject } from "@nestjs/common";
import { USERS_TOKEN } from "src/users/ussrs.token";
import * as bcrypt from 'bcrypt';
import { User } from "src/users/domain/user";

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
    private readonly saltRounds = 10;
    constructor(
        @Inject(USERS_TOKEN.REPOSITORY)
        private readonly userRepository: IUserRepository
    ) { }

    async execute(command: CreateUserCommand): Promise<void> {
        const { name, email, password } = command;

        const isExistingUser = await this.userRepository.findByEmail(email);
        if (isExistingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const user = User.created(name, email, await bcrypt.hash(password, this.saltRounds));

        await this.userRepository.create(user);
    }
}