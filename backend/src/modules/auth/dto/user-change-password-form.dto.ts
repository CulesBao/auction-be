import { ApiProperty } from "@nestjs/swagger";

export class UserChangePasswordFormDto {
  @ApiProperty({
    description: "The current password of the user",
    example: "OldPassword123!",
  })
  currentPassword: string;

  @ApiProperty({
    description: "The new password to set for the user",
    example: "NewPassword456!",
  })
  newPassword: string;

  @ApiProperty({
    description: "Confirmation of the new password",
    example: "NewPassword456!",
  })
  confirmNewPassword: string;
}
