import { CreateItemCommand } from '../cqrs/commands/implements/create-item.command';
import { CreateItemDto } from '../dto/request/create-item.request.dto';

export class ItemsMapper {
  static fromCreateItemDto(dto: CreateItemDto): CreateItemCommand {
    return new CreateItemCommand(
      dto.name,
      dto.description,
      dto.ownerId,
      dto.startingPrice,
      dto.startTime,
      dto.endTime,
    );
  }
}
