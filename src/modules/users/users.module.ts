import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserCommandHandler } from './cqrs/commands/implements/create-user.command';
import { CqrsModule } from '@nestjs/cqrs';

const commandHandlers = [CreateUserCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), CqrsModule],
  controllers: [UsersController],
  providers: [UserRepository, ...commandHandlers],
})
export class UsersModule {}
