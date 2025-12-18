import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetStatisticByUserIdQuery } from "../implements/get-statistic-by-user-id.query";
import { ItemRepository } from "modules/items/repository/item.repository";
import { GetStatisticByUserIdResponseDto } from "modules/items/dto/response/get-statistic-by-user-id.response.dto";

@QueryHandler(GetStatisticByUserIdQuery)
export class GetStatisticByUserIdQueryHandler
  implements IQueryHandler<GetStatisticByUserIdQuery>
{
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(
    query: GetStatisticByUserIdQuery,
  ): Promise<GetStatisticByUserIdResponseDto> {
    return GetStatisticByUserIdResponseDto.fromGetStatisticByUserIdDto(
      await this.itemRepository.getStatisticByUserId(
        query.userId,
        query.startDate,
        query.endDate,
      ),
    );
  }
}
