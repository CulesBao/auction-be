import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemsByOwnerIdQuery } from '../implements/get-items-by-owner-id.query';
import { Inject } from '@nestjs/common';
import { ItemRepository } from 'src/modules/items/repository/item.repository';
import { GetItemsByOwnerIdResponseDto } from 'src/modules/items/dto/response/get-items-by-owner-id.response.dto';

@QueryHandler(GetItemsByOwnerIdQuery)
export class GetItemsByOwnerIdHandler
  implements IQueryHandler<GetItemsByOwnerIdQuery>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}
  async execute(
    query: GetItemsByOwnerIdQuery,
  ): Promise<GetItemsByOwnerIdResponseDto[]> {
    const items = await this.itemRepository.findByOwnerId(query.ownerId);
    return items.map((item) => GetItemsByOwnerIdResponseDto.fromEntity(item));
  }
}
