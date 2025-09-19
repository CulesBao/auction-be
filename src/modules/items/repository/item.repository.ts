import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '../entities/item.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { NotFoundException } from '@nestjs/common';

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
}
