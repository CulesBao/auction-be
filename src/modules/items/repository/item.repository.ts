import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '../entities/item.entity';
import { DataSource, IsNull, LessThan, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

export class ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async create(item: Partial<ItemEntity>): Promise<ItemEntity> {
    return await this.itemRepository.save(this.itemRepository.create(item));
  }

  async findById(id: UUID): Promise<ItemEntity | null> {
    return await this.itemRepository.findOneBy({ id });
  }

  async findByIdOrThrow(id: UUID): Promise<ItemEntity> {
    const item = await this.itemRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException({
        description: `Item with ID ${id} not found.`,
      });
    }

    return item;
  }

  async findByOwnerId(ownerId: UUID): Promise<ItemEntity[]> {
    return await this.itemRepository.findBy({ ownerId });
  }

  async update(id: UUID, updateData: Partial<ItemEntity>): Promise<void> {
    await this.itemRepository.update(id, updateData);
  }

  async findNonBiddedItems(
    name: string | undefined,
    startingPriceFrom: number | undefined,
    startingPriceTo: number | undefined,
  ): Promise<ItemEntity[]> {
    return await this.itemRepository.findBy({
      name: name ? `%${name}%` : undefined,
      startingPrice:
        startingPriceFrom && startingPriceTo
          ? MoreThanOrEqual(startingPriceFrom) &&
            LessThanOrEqual(startingPriceTo)
          : startingPriceFrom
            ? MoreThanOrEqual(startingPriceFrom)
            : startingPriceTo
              ? LessThanOrEqual(startingPriceTo)
              : undefined,
      winnerId: IsNull(),
      finalPrice: IsNull(),
    });
  }

  async findWinningBidsByUserId(userId: UUID): Promise<ItemEntity[]> {
    return await this.itemRepository.findBy({
      winnerId: userId,
      endTime: LessThan(new Date()),
    });
  }

  async getRevenueByOwnerId(
    ownerId: UUID,
    startDate: Date,
    endDate: Date,
  ): Promise<number | null> {
    const revenue: number | null = await this.dataSource
      .getRepository(ItemEntity)
      .createQueryBuilder('item')
      .select('SUM(item.finalPrice)', 'revenue')
      .where('item.ownerId = :ownerId', { ownerId })
      .andWhere('item.endTime BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('item.finalPrice IS NOT NULL')
      .getRawOne<{ revenue: string | null }>()
      .then(
        (
          result:
            | {
                revenue: string | null;
              }
            | undefined,
        ) => {
          if (result && result.revenue !== null) {
            return parseFloat(result.revenue);
          }
          return null;
        },
      );

    return revenue;
  }
}
