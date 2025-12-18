import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetMyBidsQuery } from "../implements/get-my-bids.query";
import { BidRepository } from "modules/bids/repository/bid.repository";
import { GetMyBidsResponseDto } from "modules/bids/dto/response/get-my-bids.response.dto";

@QueryHandler(GetMyBidsQuery)
export class GetMyBidsQueryHandler implements IQueryHandler<GetMyBidsQuery> {
  constructor(private readonly bidRepository: BidRepository) {}

  async execute(query: GetMyBidsQuery): Promise<GetMyBidsResponseDto> {
    return GetMyBidsResponseDto.fromBuilder(
      await this.bidRepository.findCountAndSumByUserId(query.userId),
    );
  }
}
