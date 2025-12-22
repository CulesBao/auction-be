import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { GetPresignedUrlQueryHandler } from "./cqrs/queries/handlers/get-presigned-url.query";
import { S3Adapter } from "modules/s3/s3.adapter";
import { S3Module } from "modules/s3/s3.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MediaEntity } from "./entities/media.entity";
import { CqrsModule } from "@nestjs/cqrs";
import { MediaAdapterToken } from "./media.token";

const queryHandlers = [GetPresignedUrlQueryHandler];

@Module({
  controllers: [MediaController],
  providers: [
    ...queryHandlers,
    { provide: MediaAdapterToken, useClass: S3Adapter },
  ],
  imports: [TypeOrmModule.forFeature([MediaEntity]), CqrsModule, S3Module],
})
export class MediaModule {}
