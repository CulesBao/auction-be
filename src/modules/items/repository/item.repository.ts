import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '../entities/item.entity';
import { IsNull, Repository } from 'typeorm';
import { UUID } from 'crypto';
import { MoreThanOrEqual, LessThanOrEqual } from 'typeorm';

export class ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  async create(item: Partial<ItemEntity>): Promise<ItemEntity> {
    return await this.itemRepository.save(this.itemRepository.create(item));
  }

  async findById(id: UUID): Promise<ItemEntity | null> {
    return await this.itemRepository.findOneBy({ id });
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
    return await this.itemRepository.find({
      where: {
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
      },
    });
  }
}
