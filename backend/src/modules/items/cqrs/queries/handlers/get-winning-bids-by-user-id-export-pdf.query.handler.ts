import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetWinningBidsByUserIdExportPdfQuery } from "../implements/get-winning-bids-by-user-id-export-pdf.query";
import { ItemRepository } from "modules/items/repository/item.repository";
import { join } from "path";
import { CreatePdfQuery } from "modules/pdf/cqrs/queries/implements/create-pdf.query";
import { UserRepository } from "modules/user/repository/user.repository";
import { v4 as uuidv4 } from "uuid";
import { formatCurrency, formatDateTime, sum } from "utils/format.utils";

@QueryHandler(GetWinningBidsByUserIdExportPdfQuery)
export class GetWinningBidsByUserIdExportPdfQueryHandler
  implements IQueryHandler<GetWinningBidsByUserIdExportPdfQuery>
{
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly userRepository: UserRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetWinningBidsByUserIdExportPdfQuery): Promise<Buffer> {
    const userEntity = await this.userRepository.findByIdOrThrow(query.userId);

    const winningBids = await this.itemRepository.findWinningBidsByUserId(
      query.userId,
    );

    const context = this.buildContext(userEntity, winningBids);

    const htmlPath = join(
      process.cwd(),
      "src",
      "templates",
      "winning-bids.html",
    );

    return await this.queryBus.execute(new CreatePdfQuery(htmlPath, context));
  }

  private buildContext(userEntity: any, winningBids: any[]) {
    const items = (winningBids || []).map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description ?? "",
      startTime: item.startTime,
      endTime: item.endTime,
      finalPrice: item.finalPrice ?? 0,
      finalPriceFormatted: formatCurrency(item.finalPrice),
      startTimeFormatted: formatDateTime(item.startTime),
      endTimeFormatted: formatDateTime(item.endTime),
    }));

    const total = sum(items, (it) => it.finalPrice || 0);
    const summary = {
      count: items.length,
      total,
      totalFormatted: formatCurrency(total),
    };
    const generatedAt = formatDateTime(new Date());
    const reportId = uuidv4();

    return {
      user: {
        fullName: `${userEntity.firstName} ${userEntity.lastName}`,
        email: userEntity.email,
      },
      items,
      summary,
      generatedAt,
      reportId,
    };
  }
}
