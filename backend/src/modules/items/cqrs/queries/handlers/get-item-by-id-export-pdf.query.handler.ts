import { IQueryHandler, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { GetItemByIdExportPdfQuery } from "../implements/get-item-by-id-export-pdf.query";
import { ItemRepository } from "modules/items/repository/item.repository";
import { formatCurrency, formatDateTime } from "utils/format.utils";
import { v4 as uuidv4 } from "uuid";
import { ItemEntity } from "modules/items/entities/item.entity";
import { join } from "path";
import { CreatePdfQuery } from "modules/pdf/cqrs/queries/implements/create-pdf.query";

@QueryHandler(GetItemByIdExportPdfQuery)
export class GetItemByIdExportPdfQueryHandler
  implements IQueryHandler<GetItemByIdExportPdfQuery>
{
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetItemByIdExportPdfQuery): Promise<Buffer> {
    const rawItem = await this.itemRepository.findByIdWithRelationsOrThrow(
      query.id,
    );

    const context = {
      item: this.formatItem(rawItem),
      generatedAt: formatDateTime(new Date()),
      reportId: uuidv4(),
    };

    const htmlPath = join(
      process.cwd(),
      "src",
      "templates",
      "item-detail.html",
    );

    return await this.queryBus.execute(new CreatePdfQuery(htmlPath, context));
  }

  private formatItem(item: ItemEntity) {
    return {
      id: item.id,
      name: item.name,
      owner: {
        ownerId: item.owner.id,
        email: item.owner.email,
        name: item.owner.firstName + " " + item.owner.lastName,
      },
      description: item.description,
      startingPrice: item.startingPrice,
      startingPriceFormatted: formatCurrency(item.startingPrice),
      startTime: item.startTime,
      startTimeFormatted: formatDateTime(item.startTime),
      endTime: item.endTime,
      endTimeFormatted: formatDateTime(item.endTime),
      winner: item.winner
        ? {
            winnerId: item.winner.id,
            email: item.winner.email,
            name: item.winner.firstName + " " + item.winner.lastName,
          }
        : null,
      finalPrice: item.finalPrice,
      finalPriceFormatted: formatCurrency(item.finalPrice),
      bids: item.bids
        ? item.bids.map((bid) => {
            return {
              id: bid.id,
              price: bid.price,
              priceFormatted: formatCurrency(bid.price),
              bidder: {
                bidId: bid.user.id,
                email: bid.user.email,
                name: bid.user.firstName + " " + bid.user.lastName,
              },
            };
          })
        : [],
    };
  }
}
