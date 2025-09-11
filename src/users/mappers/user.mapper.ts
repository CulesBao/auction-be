import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserCommand } from '../cqrs/commands/handlers/create-user.command.handler';
import { User } from '../domain/user';
import { v4 } from 'uuid';

export class UserMapper {
    static fromCreateUserDto(dto: CreateUserDto): CreateUserCommand {
        return new CreateUserCommand(
            dto.name,
            dto.email,
            dto.password
        );
    }

    static toDomain(command: CreateUserCommand): User {
        return {
            id: v4(),
            name: command.name,
            email: command.email,
            password: command.password,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as User;
    }
}
