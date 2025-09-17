import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemByIdQuery } from '../implements/get-item-by-id.query';
import { Inject, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/modules/items/repository/item.repository';
import { GetItemByIdResponseDto } from 'src/modules/items/dto/response/get-item-by-id.response.dto';

@QueryHandler(GetItemByIdQuery)
export class GetItemByIdQueryHandler
  implements IQueryHandler<GetItemByIdQuery>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(query: GetItemByIdQuery): Promise<GetItemByIdResponseDto> {
    const item = await this.itemRepository.findById(query.id);

    if (!item) {
      throw new NotFoundException({
        description: `Item with ID ${query.id} not found`,
      });
    }

    return GetItemByIdResponseDto.fromEntity(item);
  }
}
