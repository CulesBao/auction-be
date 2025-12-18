import { BidEntity } from "../entities/bid.entity";

export class Bid {
  constructor(
    public readonly id: string,

    public readonly itemId: string,

    public readonly itemName: string,

    public readonly itemEndTime: Date,

    public readonly userId: string,

    public readonly price: number,

    public readonly createdAt: Date,
  ) {}

  public static fromEntity(entity: BidEntity): Bid {
    return {
      id: entity.id,
      itemId: entity.itemId,
      itemName: entity.item.name,
      itemEndTime: entity.item.endTime,
      userId: entity.userId,
      price: entity.price,
      createdAt: entity.createdAt,
    };
  }

  public static fromEntities(entities: BidEntity[]): Bid[] {
    return entities.map(this.fromEntity);
  }
}
