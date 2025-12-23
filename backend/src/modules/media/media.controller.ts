import { Body, Controller, Get, Post, Query } from "@nestjs/common";
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
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { GetPresignedUrlQuery } from "./cqrs/queries/implements/get-presigned-url.query";
import { RequireLoggedIn } from "guards/role-container";
import { CreateMediaResponseDto } from "./dto/response/create-media.response.dto";
import { CreateMediaRequestDto } from "./dto/request/create-media.request.dto";
import { MediaMapper } from "./mapper/media.mapper";

@Controller("media")
@ApiTags("Media")
export class MediaController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("/")
  @RequireLoggedIn()
  @ApiOperation({ summary: "Upload media file" })
  @ApiResponse({
    status: 200,
    description: "Media file uploaded successfully.",
    type: CreateMediaResponseDto,
  })
  async createMedia(
    @Body() createMediaRequestDto: CreateMediaRequestDto,
  ): Promise<CreateMediaResponseDto> {
    return CreateMediaResponseDto.fromDomain(
      await this.commandBus.execute(
        MediaMapper.fromCreateMediaRequestDto(createMediaRequestDto),
      ),
    );
  }

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
