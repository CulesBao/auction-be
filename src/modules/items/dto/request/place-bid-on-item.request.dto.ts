import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class PlaceBidOnItemRequestDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the bidder',
  })
  @IsNotEmpty()
  @IsUUID()
  readonly bidderId: UUID;

  @ApiProperty({
    example: 300.0,
    description: 'The bid price offered by the bidder',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly bidPrice: number;
}
