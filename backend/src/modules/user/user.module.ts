import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repository/user.repository";
import { UserEntity } from "./entities/user.entity";
import { UserController } from "./user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { UpdateUserCommandHandler } from "./cqrs/commands/handlers/update-user.command.handler";
import { MediaServiceModule } from "modules/media-service/media-service.module";

const commandHandlers = [UpdateUserCommandHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    CqrsModule,
    MediaServiceModule,
  ],
  controllers: [UserController],
  providers: [UserRepository, ...commandHandlers],
  exports: [UserRepository],
})
export class UserModule {}
