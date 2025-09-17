import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateItemCommandHandler } from './cqrs/commands/handlers/create-item.command.handler';
import { ItemRepository } from './repository/item.repository';
import { UsersModule } from '../users/users.module';
import { GetItemByIdQueryHandler } from './cqrs/queries/handlers/get-item-by-id.query.handler';

const commandHandlers = [CreateItemCommandHandler];
const queryHandlers = [GetItemByIdQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity]), CqrsModule, UsersModule],
  controllers: [ItemsController],
  providers: [ItemRepository, ...commandHandlers, ...queryHandlers],
})
export class ItemsModule {}
