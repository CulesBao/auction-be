import { ApiProperty } from "@nestjs/swagger";
import { GetStatisticByUserIdDto } from "../get-statitstic-by-user-id.dto";

class MonthlySalesReport {
  @ApiProperty({
    example: "2024-01",
    description: "Month in YYYY-MM format",
  })
  month: string;

  @ApiProperty({
    example: 1500,
    description: "Total revenue for the month",
  })
  revenue: number;

  @ApiProperty({
    example: 10,
    description: "Number of items sold in the month",
  })
  itemSold: number;

  @ApiProperty({
    example: 500,
    description: "Total spending for the month",
  })
  spending: number;

  @ApiProperty({
    example: 8,
    description: "Number of items won in the month",
  })
  itemsWon: number;

  @ApiProperty({
    example: 20,
    description: "Number of bids placed in the month",
  })
  bidsPlaced: number;
}
export class GetStatisticByUserIdResponseDto {
  @ApiProperty({
    example: 7500,
    description: "Total revenue generated from sold items",
  })
  totalRevenue: number;

  @ApiProperty({
    example: 25,
    description: "Total number of items won by the user",
  })
  totalItemsSold: number;

  @ApiProperty({
    example: 3000,
    description: "Total spending by the user on winning bids",
  })
  totalSpending: number;

  @ApiProperty({
    example: 12,
    description: "Total number of items won by the user",
  })
  totalItemsWon: number;

  @ApiProperty({
    example: 100,
    description: "Total number of bids placed by the user",
  })
  totalBidsPlaced: number;

  @ApiProperty({
    type: [MonthlySalesReport],
    description: "Monthly sales reports",
  })
  monthlySalesReports: MonthlySalesReport[];

  static fromGetStatisticByUserIdDto(
    dto: GetStatisticByUserIdDto,
  ): GetStatisticByUserIdResponseDto {
    return {
      totalRevenue: dto.totalRevenue,
      totalItemsSold: dto.totalItemsSold,
      totalSpending: dto.totalSpending,
      totalItemsWon: dto.totalItemsWon,
      totalBidsPlaced: dto.totalBidsPlaced,
      monthlySalesReports: dto.monthlySalesReports,
    };
  }
}
