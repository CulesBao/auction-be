import { Uuid } from "common/types";
import { Gender } from "./gender";
import { UpdateUserRequestDto } from "../dto/request/update-user.request.dto";
import { UpdateUserCommand } from "../cqrs/commands/implements/update-user.command";
import { UserEntity } from "../entities/user.entity";

export class UpdateUser {
  firstName: string;

  lastName: string;

  avatarId: Uuid | null;

  birthday: string | null;

  gender: Gender | null;

  phoneNumber: string;

  static fromUpdateUserRequestDto(
    userEntity: UserEntity,
    updateUserRequestDto: UpdateUserRequestDto,
  ): UpdateUserCommand {
    return new UpdateUserCommand(
      userEntity,
      updateUserRequestDto.firstName,
      updateUserRequestDto.lastName,
      updateUserRequestDto.avatarId,
      updateUserRequestDto.birthday,
      updateUserRequestDto.gender,
      updateUserRequestDto.phoneNumber,
    );
  }
}
