import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserCommand } from '../cqrs/commands/handlers/create-user.command.handler';
import { User } from '../domain/user';
import { uuid } from 'uuidv4';

export class UserMapper {
    static toCreateUserCommand(dto: CreateUserDto): CreateUserCommand {
        return new CreateUserCommand(
            dto.name,
            dto.email,
            dto.password
        );
    }

    static toUser(command: CreateUserCommand): User {
        return new User(
            uuid(),
            command.name,
            command.email,
            command.password,
            new Date(),
            new Date(),
        );
    }
}
