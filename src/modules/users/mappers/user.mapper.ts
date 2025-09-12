import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserCommand } from '../cqrs/commands/implements/create-user.command';
import { User } from '../domain/user';

export class UserMapper {
  static fromCreateUserDto(dto: CreateUserDto): CreateUserCommand {
    return new CreateUserCommand(dto.name, dto.email, dto.password);
  }

  static toDomain(command: CreateUserCommand): Partial<User> {
    return {
      name: command.name,
      email: command.email,
      password: command.password,
    };
  }
}
