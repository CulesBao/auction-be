import { Uuid } from "common/types";
import { PlaceBidOnItemCommand } from "../cqrs/commands/implements/place-bid-on-item.command";
import { PlaceBidOnItemRequestDto } from "../dto/request/place-bid-on-item.request.dto";

export class BidMapper {
  static fromPlaceBidOnItemRequestDto(
    dto: PlaceBidOnItemRequestDto,
    userId: Uuid,
  ): PlaceBidOnItemCommand {
    return new PlaceBidOnItemCommand(dto.itemId, userId, dto.price);
  }
}
