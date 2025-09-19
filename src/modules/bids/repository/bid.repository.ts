import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BidEntity } from '../entities/bid.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class BidRepository {
  constructor(
    @InjectRepository(BidEntity)
    private readonly bidRepository: Repository<BidEntity>,
  ) {}

  async create(bid: Partial<BidEntity>): Promise<void> {
    await this.bidRepository.save(this.bidRepository.create(bid));
  }

  async findByItemId(itemId: UUID): Promise<BidEntity | null> {
    return this.bidRepository.findOne({
      where: { itemId },
      order: { price: 'DESC' },
    });
  }
}
