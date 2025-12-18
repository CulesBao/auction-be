import { ApiProperty } from "@nestjs/swagger";
import { Bid } from "modules/bids/domain/bid";
import { BidEntity } from "modules/bids/entities/bid.entity";

export class GetMyBidsResponseDto {
  @ApiProperty({
    description: "Total number of active bids placed by the user",
    example: 5,
  })
  activeBidsCount: number;

  @ApiProperty({
    description: "Total number of active winning bids placed by the user",
    example: 2,
  })
  activeWinningBidsCount: number;

  @ApiProperty({
    description: "Total sum of active winning bids placed by the user",
    example: 1500,
  })
  activeWinningBidsSum: number;

  @ApiProperty({ type: () => [Bid] })
  bids: Bid[];

  public static fromBuilder(builder: {
    activeBidsCount: number;
    activeWinningBidsCount: number;
    activeWinningBidsSum: number;
    bids: BidEntity[];
  }): GetMyBidsResponseDto {
    return {
      activeBidsCount: builder.activeBidsCount,
      activeWinningBidsCount: builder.activeWinningBidsCount,
      activeWinningBidsSum: builder.activeWinningBidsSum,
      bids: Bid.fromEntities(builder.bids),
    };
  }
}
