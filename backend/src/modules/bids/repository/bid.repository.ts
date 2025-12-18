import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BidEntity } from "../entities/bid.entity";
import { Repository } from "typeorm";
import { Uuid } from "common/types";

@Injectable()
export class BidRepository {
  constructor(
    @InjectRepository(BidEntity)
    private readonly bidRepository: Repository<BidEntity>,
  ) {}

  async create(bid: Partial<BidEntity>): Promise<void> {
    await this.bidRepository.save(this.bidRepository.create(bid));
  }

  async findByItemId(itemId: Uuid): Promise<BidEntity | null> {
    return this.bidRepository.findOne({
      where: { itemId },
      order: { price: "DESC" },
    });
  }

  async findCountAndSumByUserId(userId: Uuid): Promise<{
    activeBidsCount: number;
    activeWinningBidsCount: number;
    activeWinningBidsSum: number;
    bids: BidEntity[];
  }> {
    const bids = await this.bidRepository.find({
      where: {
        userId,
      },
      relations: {
        item: true,
      },
      order: {
        createdAt: "DESC",
      },
    });

    const result = await this.bidRepository
      .createQueryBuilder("bid")
      .leftJoin("bid.item", "item")
      .where("bid.userId = :userId", { userId })
      .andWhere("item.endTime >= :now", { now: new Date() })
      .select("COUNT(DISTINCT item.id)", "activeBidsCount")
      .addSelect(
        `SUM(CASE WHEN bid.id = (
        SELECT b.id FROM bids b 
        WHERE b.item_id = item.id 
        ORDER BY b.price DESC LIMIT 1
      ) THEN 1 ELSE 0 END)`,
        "activeWinningBidsCount",
      )
      .addSelect(
        `SUM(CASE WHEN bid.id = (
        SELECT b.id FROM bids b 
        WHERE b.item_id = item.id 
        ORDER BY b.price DESC LIMIT 1
      ) THEN bid.price ELSE 0 END)`,
        "activeWinningBidsSum",
      )
      .getRawOne();

    return {
      activeBidsCount: parseInt(result.activeBidsCount, 10) || 0,
      activeWinningBidsCount: parseInt(result.activeWinningBidsCount, 10) || 0,
      activeWinningBidsSum: parseFloat(result.activeWinningBidsSum) || 0,
      bids,
    };
  }
}
