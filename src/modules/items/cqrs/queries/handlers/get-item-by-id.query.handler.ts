import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemByIdQuery } from '../implements/get-item-by-id.query';
import { Inject } from '@nestjs/common';
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
    const item = await this.itemRepository.findByIdOrThrow(query.id);

    return GetItemByIdResponseDto.fromEntity(item);
  }
}
