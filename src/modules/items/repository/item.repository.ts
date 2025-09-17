import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '../entities/item.entity';
import { Repository } from 'typeorm';

export class ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly itemRepository: Repository<ItemEntity>,
  ) {}

  async create(item: Partial<ItemEntity>): Promise<ItemEntity> {
    return await this.itemRepository.save(this.itemRepository.create(item));
  }
}
