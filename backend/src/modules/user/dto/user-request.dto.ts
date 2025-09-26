import { Gender } from "../domain/gender";
import { EnumField, StringField } from "../../../decorator/field.decorators";
import { UserRequest } from "../domain/user-request";
import _ from "lodash";
import { ApiProperty } from "@nestjs/swagger";

export class UserRequestDto {
  @StringField()
  @ApiProperty({
    example: "John",
    description: "First name of the user",
  })
  firstName: string;

  @StringField()
  @ApiProperty({
    example: "Doe",
    description: "Last name of the user",
  })
  lastName: string;

  @StringField()
  @ApiProperty({
    example: "john.doe@example.com",
    description: "Email address of the user",
  })
  email: string;

  @EnumField(() => Gender)
  @ApiProperty({
    example: "male",
    description: "Gender of the user",
  })
  gender: Gender;

  @StringField()
  @ApiProperty({
    example: "1990-01-01",
    description: "Birthday of the user",
  })
  birthday: string;

  @StringField()
  @ApiProperty({
    example: "+1234567890",
    description: "Phone number of the user",
  })
  phoneNumber: string;

  public static toUserRequest(_this: UserRequestDto): UserRequest {
    return {
      ..._this,
      email: _.toLower(_this.email),
    };
  }
}
