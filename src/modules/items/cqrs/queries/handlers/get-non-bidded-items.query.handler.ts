import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetNonBiddedItemsQuery } from '../implements/get-non-bidded-items.query';
import { Inject } from '@nestjs/common';
import { ItemRepository } from 'src/modules/items/repository/item.repository';
import { GetNonBiddedItemsResponseDto } from 'src/modules/items/dto/response/get-non-bidded-items.response.dto';

@QueryHandler(GetNonBiddedItemsQuery)
export class GetNonBiddedItemsQueryHandler
  implements IQueryHandler<GetNonBiddedItemsQuery>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(
    query: GetNonBiddedItemsQuery,
  ): Promise<GetNonBiddedItemsResponseDto[]> {
    const items = await this.itemRepository.findNonBiddedItems(
      query.name,
      query.startingPriceFrom,
      query.startingPriceTo,
    );
    return items.map((item) => GetNonBiddedItemsResponseDto.fromEntity(item));
  }
}
