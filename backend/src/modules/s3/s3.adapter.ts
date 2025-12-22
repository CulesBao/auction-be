import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ApiConfigService } from "shared/services/api-config.service";
import { GetPresignedUrlRequestDto } from "./dto/request/get-presigned-url.request.dto";
import { GetPresignedUrlResponseDto } from "./dto/response/get-presigned-url.response.dto";
import { MediaAdapterInterface } from "modules/media/interfaces/media-adapter.interface";

@Injectable()
export class S3Adapter implements MediaAdapterInterface {
  private readonly client: SupabaseClient;

  constructor(private readonly configService: ApiConfigService) {
    const s3Config = this.configService.s3Config;

    Logger.log(`Initializing S3 client with Supabase URL`, S3Adapter.name);

    this.client = createClient(
      s3Config.supabaseUrl,
      s3Config.supabaseServiceRoleKey,
    );

    Logger.log(`S3 client initialized successfully`, S3Adapter.name);
  }

  async getPresignedUrl(
    request: GetPresignedUrlRequestDto,
  ): Promise<GetPresignedUrlResponseDto> {
    const fileName =
      request.userId + crypto.randomUUID() + "_" + request.fileName;

    const { data, error } = await this.client.storage
      .from(request.bucket)
      .createSignedUploadUrl(fileName);

    if (error) {
      throw new BadRequestException({
        description: `Failed to create presigned URL: ${error.message}`,
      });
    }

    return {
      presignedUrl: data.signedUrl,
      userId: request.userId,
      fileName,
      expiredAt: new Date(Date.now() + 60 * 1000),
    };
  }
}
