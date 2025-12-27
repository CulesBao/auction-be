import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetItemByIdQuery } from "../implements/get-item-by-id.query";
import { Inject } from "@nestjs/common";
import { ItemRepository } from "modules/items/repository/item.repository";
import { GetItemByIdResponseDto } from "modules/items/dto/response/get-item-by-id.response.dto";
import { MediaService } from "modules/media-service/media-service.token";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { MediaDto } from "modules/media-service/dto/media.dto";

@QueryHandler(GetItemByIdQuery)
export class GetItemByIdQueryHandler
  implements IQueryHandler<GetItemByIdQuery>
{
  constructor(
    @Inject(ItemRepository)
    private readonly itemRepository: ItemRepository,
    @Inject(MediaService.name)
    private readonly client: ClientProxy,
  ) {}

  async execute(query: GetItemByIdQuery): Promise<GetItemByIdResponseDto> {
    const item = await this.itemRepository.findByIdWithRelationsOrThrow(
      query.id,
    );

    const medias = await firstValueFrom(
      this.client.send<MediaDto[]>(MediaService.getByIds, item.mediaIds),
    );

    return GetItemByIdResponseDto.fromEntity(item, medias);
  }
}
