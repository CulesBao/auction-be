import { Uuid } from "../../../common/types";
import { Gender } from "./gender";
import { RoleType } from "../../../guards/role-type";
import { UserEntity } from "../entities/user.entity";

export class User {
  id: Uuid;

  role?: RoleType;

  keyCloakId?: Uuid | null;

  firstName: string;

  lastName: string;

  email: string;

  picture?: string;

  gender?: Gender | null;

  birthday?: string;

  phoneNumber: string;

  relationshipType?: string | null;

  public static fromEntity(userEntity: UserEntity): User {
    return {
      id: userEntity.id,
      role: userEntity.role,
      keyCloakId: userEntity.keyCloakId ?? null,
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      email: userEntity.email,
      picture: userEntity.picture,
      gender: userEntity.gender,
      birthday: userEntity.birthday,
      phoneNumber: userEntity.phoneNumber,
    };
  }
}
