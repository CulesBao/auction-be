import { Uuid } from 'common/types';

import { ItemEntity } from '../../items/entities/item.entity';
import { UserEntity } from 'modules/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bids')
export class BidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: Uuid;

  @ManyToOne(() => ItemEntity, (item) => item.bids, { cascade: true })
  item: ItemEntity;

  @Column('uuid')
  itemId: Uuid;

  @ManyToOne(() => UserEntity, (user) => user.bids, { cascade: true })
  user: UserEntity;

  @Column('uuid')
  userId: Uuid;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
