/* eslint-disable unicorn/prefer-top-level-await */
import { Logger, RequestMethod, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { json, urlencoded } from "express";
import { initializeTransactionalContext } from "typeorm-transactional";

import { AppModule } from "./app.module";
import { configLogging } from "./configuration/config-logging";
import { configureSwagger } from "./configuration/config-swagger";
import { ApiConfigService } from "./shared/services/api-config.service";
import { SharedModule } from "./shared/shared.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);

  const configService = app.select(SharedModule).get(ApiConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.rabbitMqUrl],
      queue: "auction_queue",
      queueOptions: {
        durable: false,
      },
    },
  });

  app.setGlobalPrefix("auction-service/api/v1", {
    exclude: [{ path: "health", method: RequestMethod.GET }],
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: false,
    }),
  );

  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));

  configureSwagger(app, configService);
  configLogging(app, configService);

  await app.startAllMicroservices();
  await app.listen(configService.serverPort);

  Logger.log(`server running on ${await app.getUrl()}`);

  return app;
}

void bootstrap();
