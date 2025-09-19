import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateItemCommandHandler } from './cqrs/commands/handlers/create-item.command.handler';
import { ItemRepository } from './repository/item.repository';
import { UsersModule } from '../users/users.module';
import { GetItemByIdQueryHandler } from './cqrs/queries/handlers/get-item-by-id.query.handler';
import { GetItemsByOwnerIdHandler } from './cqrs/queries/handlers/get-items-by-owner-id.handler';
import { UpdateItemCommandHandler } from './cqrs/commands/handlers/update-item.command.handler';
import { GetNonBiddedItemsQueryHandler } from './cqrs/queries/handlers/get-non-bidded-items.query.handler';
import { GetWinningBidsByUserIdQueryHandler } from './cqrs/queries/handlers/get-winning-bids-by-user-id.query.handler';

const commandHandlers = [CreateItemCommandHandler, UpdateItemCommandHandler];
const queryHandlers = [
  GetItemByIdQueryHandler,
  GetItemsByOwnerIdHandler,
  GetNonBiddedItemsQueryHandler,
  GetWinningBidsByUserIdQueryHandler,
];

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity]), CqrsModule, UsersModule],
  controllers: [ItemsController],
  providers: [ItemRepository, ...commandHandlers, ...queryHandlers],
})
export class ItemsModule {}
