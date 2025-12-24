import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repository/user.repository";
import { UserEntity } from "./entities/user.entity";
import { MediaModule } from "modules/media/media.module";
import { UserController } from "./user.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { UpdateUserCommandHandler } from "./cqrs/commands/handlers/update-user.command.handler";

const commandHandlers = [UpdateUserCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), MediaModule, CqrsModule],
  controllers: [UserController],
  providers: [UserRepository, ...commandHandlers],
  exports: [UserRepository],
})
export class UserModule {}
