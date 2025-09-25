import { IsEmail } from "class-validator";
import { StringField } from "../../../decorator/field.decorators";
import { LoginForm } from "../domain/login-form";
import _ from "lodash";
import { ApiProperty } from "@nestjs/swagger";

export class LoginFormDto {
  @IsEmail()
  @StringField()
  @ApiProperty({
    example: "john.doe@example.com",
    description: "Email address of the user",
  })
  email: string;

  @StringField({ minLength: 6 })
  @ApiProperty({
    example: "password123",
    description: "Password for the user",
  })
  password: string;

  public static toLoginForm(dto: LoginFormDto): LoginForm {
    return {
      ...dto,
      email: _.toLower(dto.email),
    };
  }
}
