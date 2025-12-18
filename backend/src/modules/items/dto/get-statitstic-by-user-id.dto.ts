class MonthlySalesReport {
  month: string;

  revenue: number;

  itemSold: number;

  spending: number;

  itemsWon: number;

  bidsPlaced: number;
}
export class GetStatisticByUserIdDto {
  totalRevenue: number;

  totalItemsSold: number;

  totalSpending: number;

  totalItemsWon: number;

  totalBidsPlaced: number;

  monthlySalesReports: MonthlySalesReport[];
}
