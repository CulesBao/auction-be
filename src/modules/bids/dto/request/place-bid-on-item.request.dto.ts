import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class PlaceBidOnItemRequestDto {
  @ApiProperty({
    description: 'The ID of the item to bid on',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  itemId: UUID;

  @ApiProperty({
    description: 'The ID of the user placing the bid',
    example: '660e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: UUID;

  @ApiProperty({
    description: 'The bid price',
    example: 150.0,
  })
  @IsNotEmpty()
  price: number;
}
