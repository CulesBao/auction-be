import { ICommand } from "@nestjs/cqrs";
import { Uuid } from "common/types";
import { Gender } from "modules/user/domain/gender";
import { UserEntity } from "modules/user/entities/user.entity";

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly userEntity: UserEntity,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly avatarId: Uuid | null,
    public readonly birthday: string | null,
    public readonly gender: Gender | null,
    public readonly phoneNumber: string,
  ) {}
}
