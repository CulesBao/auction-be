import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ApiConfigService } from "shared/services/api-config.service";
import { MediaService } from "./media-service.token";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ApiConfigService],
        name: MediaService.name,
        useFactory: async (configService: ApiConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.rabbitMqUrl],
            queue: "media_queue",
            queueOptions: {
              durable: false,
            },
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MediaServiceModule {}
