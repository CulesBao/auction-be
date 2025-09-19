import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'The new password of the user',
  })
  password?: string;
}
