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
}
