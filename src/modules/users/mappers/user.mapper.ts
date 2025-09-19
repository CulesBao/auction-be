import { CreateUserRequestDto } from '../dto/request/create-user.request.dto';
import { CreateUserCommand } from '../cqrs/commands/implements/create-user.command';
import { User } from '../domain/user';
import { UserEntity } from '../entities/user.entity';
import { GetUserByIdResponseDto } from '../dto/response/get-user-by-id.response.dto';
import { UpdateUserRequestDto } from '../dto/request/update-user.request.dto';
import { UpdateUserCommand } from '../cqrs/commands/implements/update-user.command';
import { UUID } from 'crypto';

export class UserMapper {
  static fromCreateUserRequestDto(
    dto: CreateUserRequestDto,
  ): CreateUserCommand {
    return new CreateUserCommand(dto.name, dto.email, dto.password);
  }

  static toDomain(command: CreateUserCommand): Partial<User> {
    return {
      name: command.name,
      email: command.email,
      password: command.password,
    };
  }

  static fromEntity(user: UserEntity): GetUserByIdResponseDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static fromUpdateUserRequestDto(
    id: UUID,
    dto: UpdateUserRequestDto,
  ): UpdateUserCommand {
    return new UpdateUserCommand(id, dto.name, dto.password);
  }
}
