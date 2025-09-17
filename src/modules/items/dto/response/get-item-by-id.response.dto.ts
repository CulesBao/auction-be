import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { ItemEntity } from '../../entities/item.entity';

export class GetItemByIdResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the item',
  })
  readonly id: string;

  @ApiProperty({
    example: 'Vintage Clock',
    description: 'The name of the item',
  })
  readonly name: string;

  @ApiProperty({
    example: 'A beautiful vintage clock from the 19th century.',
    description: 'The description of the item',
  })
  readonly description: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the owner',
  })
  readonly ownerId: UUID;

  @ApiProperty({
    example: 100.0,
    description: 'The starting price of the item',
  })
  readonly startingPrice: number;

  @ApiProperty({
    example: '2023-10-01T10:00:00Z',
    description: 'The start date and time of the auction',
  })
  readonly startTime: Date;

  @ApiProperty({
    example: '2023-10-07T10:00:00Z',
    description: 'The end date and time of the auction',
  })
  readonly endTime: Date;

  @ApiProperty({
    example: 250.0,
    description: 'The current price of the item',
    nullable: true,
  })
  readonly currentPrice: number | null;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'The unique identifier of the current bidder',
    nullable: true,
  })
  readonly currentBidderId: UUID | null;

  @ApiProperty({
    example: '2023-10-01T10:00:00Z',
    description: 'The date and time when the item was created',
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: '2023-10-01T10:00:00Z',
    description: 'The date and time when the item was last updated',
  })
  readonly updatedAt: Date;

  static fromEntity(entity: ItemEntity): GetItemByIdResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      ownerId: entity.ownerId,
      startingPrice: entity.startingPrice,
      startTime: entity.startTime,
      endTime: entity.endTime,
      currentPrice: entity.currentPrice,
      currentBidderId: entity.currentBidderId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
