import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPresignedUrlQuery } from "../implements/get-presigned-url.query";
import { MediaAdapterInterface } from "modules/media/interfaces/media-adapter.interface";
import { GetPresignedUrl } from "modules/media/domain/get-presigned-url";
import { Inject } from "@nestjs/common";
import { MediaAdapterToken } from "modules/media/media.token";

@QueryHandler(GetPresignedUrlQuery)
export class GetPresignedUrlQueryHandler
  implements IQueryHandler<GetPresignedUrlQuery>
{
  constructor(
    @Inject(MediaAdapterToken)
    private readonly mediaAdapterInterface: MediaAdapterInterface,
  ) {}

  async execute(query: GetPresignedUrlQuery): Promise<GetPresignedUrl> {
    return this.mediaAdapterInterface.getPresignedUrl({
      bucket: query.bucket,
      userId: query.userId,
      fileName: query.fileName,
    });
  }
}
