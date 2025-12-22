import { Controller, Get, Query } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetPresignedUrlResponseDto } from "./dto/response/get-presigned-url.response.dto";
import { AuthUser } from "decorator/auth-user.decorator";
import { UserEntity } from "modules/user/entities/user.entity";
import { QueryBus } from "@nestjs/cqrs";
import { GetPresignedUrlQuery } from "./cqrs/queries/implements/get-presigned-url.query";
import { RequireLoggedIn } from "guards/role-container";

@Controller("media")
@ApiTags("Media")
export class MediaController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get("/presigned-url")
  @ApiBearerAuth()
  @RequireLoggedIn()
  @ApiOperation({ summary: "Get presigned URL for media upload" })
  @ApiResponse({
    status: 200,
    description: "Presigned URL retrieved successfully.",
    type: GetPresignedUrlResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: "Bad Request.",
  })
  @ApiQuery({
    name: "fileName",
    required: true,
    description: "Name of the file to be uploaded",
  })
  @ApiQuery({
    name: "bucket",
    required: true,
    description: "Target bucket for the upload",
  })
  async getPresignedUrl(
    @AuthUser() user: UserEntity,
    @Query("fileName") fileName: string,
    @Query("bucket") bucket: string,
  ): Promise<GetPresignedUrlResponseDto> {
    return GetPresignedUrlResponseDto.fromDomain(
      await this.queryBus.execute(
        new GetPresignedUrlQuery(bucket, user.id, fileName),
      ),
    );
  }
}
