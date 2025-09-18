import { ApiProperty } from '@nestjs/swagger';

export class GetUserByIdResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'The date and time when the user was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'The date and time when the user was last updated',
  })
  updatedAt: Date;
}
