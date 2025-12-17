import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetWinningBidsByUserIdQuery } from "../implements/get-winning-bids-by-user-id.query";
import { Inject } from "@nestjs/common";
import { ItemRepository } from "modules/items/repository/item.repository";
import { GetWinningBidsByUserIdResponseDto } from "modules/items/dto/response/get-winning-bids-by-user-id.response.dto";

@QueryHandler(GetWinningBidsByUserIdQuery)
export class GetWinningBidsByUserIdQueryHandler
  implements IQueryHandler<GetWinningBidsByUserIdQuery>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(
    query: GetWinningBidsByUserIdQuery,
  ): Promise<GetWinningBidsByUserIdResponseDto[]> {
    const items = await this.itemRepository.findWinningBidsByUserId(
      query.userId,
    );
    return items.map((item) =>
      GetWinningBidsByUserIdResponseDto.fromEntity(item),
    );
  }
}
