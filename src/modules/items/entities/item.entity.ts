import { UUID } from 'crypto';
import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BidEntity } from '../../bids/entities/bid.entity';

@Entity('items')
export class ItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ nullable: false, type: 'varchar', length: 100 })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.items, { cascade: true })
  owner: UserEntity;

  @Column({ type: 'uuid' })
  ownerId: UUID;

  @Column({ nullable: false, type: 'decimal' })
  startingPrice: number;

  @Column({ nullable: false, type: 'timestamp' })
  startTime: Date;

  @Column({ nullable: false, type: 'timestamp' })
  endTime: Date;

  @ManyToOne(() => UserEntity, { cascade: true })
  winner: UserEntity;

  @Column({ type: 'uuid', nullable: true })
  winnerId: UUID | null;

  @Column({ type: 'decimal', nullable: true })
  finalPrice: number | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => BidEntity, (bid) => bid.item)
  bids: BidEntity[];
}
