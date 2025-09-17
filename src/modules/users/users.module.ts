import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserCommandHandler } from './cqrs/commands/handlers/create-user.command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetUserByIdQueryHandler } from './cqrs/queries/handlers/get-user-by-id.query.handler';

const commandsHandlers = [CreateUserCommandHandler];
const queryHandlers = [GetUserByIdQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [UsersController],
  providers: [UserRepository, ...commandsHandlers, ...queryHandlers],
  exports: [UserRepository],
})
export class UsersModule {}
