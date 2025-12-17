import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetRevenueByOwnerIdQuery } from "../implements/get-revenue-by-owner-id.query";
import { Inject } from "@nestjs/common";
import { ItemRepository } from "modules/items/repository/item.repository";
import { GetRevenueByOwnerIdResponseDto } from "modules/items/dto/response/get-revenue-by-owner-id.response.dto";

@QueryHandler(GetRevenueByOwnerIdQuery)
export class GetRevenueByOwnerIdQueryHandler
  implements IQueryHandler<GetRevenueByOwnerIdQuery>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(
    query: GetRevenueByOwnerIdQuery,
  ): Promise<GetRevenueByOwnerIdResponseDto> {
    const { ownerId, startDate, endDate } = query;
    return new GetRevenueByOwnerIdResponseDto(
      (await this.itemRepository.getRevenueByOwnerId(
        ownerId,
        startDate,
        endDate,
      )) || 0,
    );
  }
}
