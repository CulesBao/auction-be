import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetItemsByFilterQuery } from "../implements/get-items-by-filter.query";
import { ItemRepository } from "modules/items/repository/item.repository";
import { GetItemsByFilterResponseDto } from "modules/items/dto/response/get-items-by-filter.response.dto";

@QueryHandler(GetItemsByFilterQuery)
export class GetItemsByFilterQueryHandler
  implements IQueryHandler<GetItemsByFilterQuery>
{
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(
    query: GetItemsByFilterQuery,
  ): Promise<GetItemsByFilterResponseDto[]> {
    return GetItemsByFilterResponseDto.fromEntities(
      await this.itemRepository.findItemsByFilter(
        query.name,
        query.ownerName,
        query.startTime,
        query.endTime,
        query.startingPriceFrom,
        query.startingPriceTo,
      ),
    );
  }
}
