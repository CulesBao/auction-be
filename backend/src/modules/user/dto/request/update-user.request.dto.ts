import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsUUID,
  MaxLength,
  MinLength,
} from "class-validator";
import { Uuid } from "common/types";
import { IsNullable } from "decorator/validator.decorators";
import { Gender } from "modules/user/domain/gender";

export class UpdateUserRequestDto {
  @ApiProperty({
    example: "John",
    description: "The first name of the user",
  })
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @ApiProperty({
    example: "Doe",
    description: "The last name of the user",
  })
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The ID of the avatar media",
    nullable: true,
  })
  @IsUUID()
  @IsNullable()
  avatarId: Uuid | null;

  @ApiProperty({
    example: "2021-08-15",
    description: "The birthday of the user",
    nullable: true,
  })
  @IsDateString()
  @IsNullable()
  birthday: string | null;

  @ApiProperty({
    example: "MALE",
    description: "The gender of the user",
    nullable: true,
  })
  @IsEnum(Gender)
  @IsNullable()
  gender: Gender | null;

  @ApiProperty({
    example: "+1234567890",
    description: "The phone number of the user",
  })
  @MinLength(8)
  @IsNumberString()
  @MaxLength(13)
  phoneNumber: string;
}
