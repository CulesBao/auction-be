import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { USERS_TOKEN } from './ussrs.token';
import { UserRepository } from './repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserCommandHandler } from './cqrs/commands/implements/create-user.command';
import { CqrsModule } from '@nestjs/cqrs';

const commandHandlers = [CreateUserCommandHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule
  ],
  controllers: [UsersController],
  providers: [{
    provide: USERS_TOKEN.REPOSITORY,
    useClass: UserRepository
  },
  ...commandHandlers],
})
export class UsersModule { }
