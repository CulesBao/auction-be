import { Uuid } from "common/types";
import { UserEntity } from "modules/user/entities/user.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BidEntity } from "../../bids/entities/bid.entity";
import { MediaEntity } from "modules/media/entities/media.entity";

@Entity("items")
export class ItemEntity {
  @PrimaryGeneratedColumn("uuid")
  id: Uuid;

  @Column({ nullable: false, type: "varchar", length: 100 })
  name: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.items, { cascade: true })
  owner: UserEntity;

  @Column({ type: "uuid" })
  ownerId: Uuid;

  @ManyToMany(() => MediaEntity)
  @JoinTable({ name: "item_medias" })
  medias: MediaEntity[];

  @Column({ nullable: false, type: "decimal" })
  startingPrice: number;

  @Column({ nullable: false, type: "timestamp" })
  startTime: Date;

  @Column({ nullable: false, type: "timestamp" })
  endTime: Date;

  @ManyToOne(() => UserEntity, { cascade: true })
  winner: UserEntity;

  @Column({ type: "uuid", nullable: true })
  winnerId: Uuid | null;

  @Column({ type: "decimal", nullable: true })
  finalPrice: number | null;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => BidEntity, (bid) => bid.item)
  bids: BidEntity[];

  @Column({ type: "boolean", default: false })
  isWinnerNotified: boolean;
}
