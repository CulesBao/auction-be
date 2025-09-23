import { Module } from '@nestjs/common';
import { BidsController } from './bids.controller';
import { PlaceBidOnItemCommandHandler } from './cqrs/commands/handlers/place-bid-on-item.command.handler';
import { BidRepository } from './repository/bid.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BidEntity } from './entities/bid.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from '../users/users.module';
import { ItemsModule } from '../items/items.module';

const commandsHandlers = [PlaceBidOnItemCommandHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([BidEntity]),
    CqrsModule,
    UsersModule,
    ItemsModule,
  ],
  controllers: [BidsController],
  providers: [...commandsHandlers, BidRepository],
})
export class BidsModule {}
