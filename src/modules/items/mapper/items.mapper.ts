import { UUID } from 'crypto';
import { CreateItemCommand } from '../cqrs/commands/implements/create-item.command';
import { UpdateItemCommand } from '../cqrs/commands/implements/update-item.command';
import { CreateItemRequestDto } from '../dto/request/create-item.request.dto';
import { UpdateItemRequestDto } from '../dto/request/update-item.request.dto';

export class ItemsMapper {
  static fromCreateItemRequestDto(
    dto: CreateItemRequestDto,
  ): CreateItemCommand {
    return new CreateItemCommand(
      dto.name,
      dto.description,
      dto.ownerId,
      dto.startingPrice,
      dto.startTime,
      dto.endTime,
    );
  }

  static fromUpdateItemRequestDto(
    id: UUID,
    dto: UpdateItemRequestDto,
  ): UpdateItemCommand {
    return new UpdateItemCommand(
      id,
      dto.name,
      dto.description,
      dto.startingPrice,
      dto.startTime,
      dto.endTime,
      dto.ownerId,
    );
  }
}
