import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

export class UpdateItemRequestDto {
  @ApiProperty({
    example: 'item name',
    description: 'Name of the item',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'item description',
    description: 'Description of the item',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'UUID of the owner',
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  ownerId: UUID;

  @ApiProperty({
    example: 100,
    description: 'Starting price of the item',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  startingPrice: number;

  @ApiProperty({
    example: '2026-10-01T10:00:00Z',
    description: 'Start time of the auction',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    example: '2026-10-07T10:00:00Z',
    description: 'End time of the auction',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  endTime: Date;
}
