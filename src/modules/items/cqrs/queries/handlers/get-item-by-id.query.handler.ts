import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetItemByIdQuery } from '../implements/get-item-by-id.query';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/modules/items/repository/item.repository';
import { GetItemByIdResponseDto } from 'src/modules/items/dto/get-item-by-id.response.dto';
import { isUuid } from 'uuidv4';

@QueryHandler(GetItemByIdQuery)
export class GetItemByIdQueryHandler
  implements IQueryHandler<GetItemByIdQuery>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute(query: GetItemByIdQuery): Promise<GetItemByIdResponseDto> {
    if (isUuid(query.id) === false) {
      throw new BadRequestException({
        description: `Invalid UUID format for ID ${query.id}`,
      });
    }

    const item = await this.itemRepository.findById(query.id);

    if (!item) {
      throw new NotFoundException({
        description: `Item with ID ${query.id} not found`,
      });
    }

    return GetItemByIdResponseDto.fromEntity(item);
  }
}
