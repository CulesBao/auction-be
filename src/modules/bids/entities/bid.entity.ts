import { UUID } from 'crypto';
import { ItemEntity } from '../../items/entities/item.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bids')
export class BidEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @ManyToOne(() => ItemEntity, (item) => item.bids, { cascade: true })
  item: ItemEntity;

  @Column('uuid')
  itemId: UUID;

  @ManyToOne(() => UserEntity, (user) => user.bids, { cascade: true })
  user: UserEntity;

  @Column('uuid')
  userId: UUID;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
