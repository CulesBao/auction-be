import { ApiProperty } from "@nestjs/swagger";
import { Uuid } from "common/types";
import { ItemEntity } from "../../entities/item.entity";

export class GetItemsByFilterResponseDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The unique identifier of the item",
  })
  readonly id: string;

  @ApiProperty({
    example: "Vintage Clock",
    description: "The name of the item",
  })
  readonly name: string;

  @ApiProperty({
    example: "A beautiful vintage clock from the 19th century.",
    description: "The description of the item",
  })
  readonly description: string;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The unique identifier of the owner",
  })
  readonly ownerId: Uuid;

  @ApiProperty({
    example: "Bao",
    description: "The owner name of the item",
  })
  readonly ownerName: string;

  @ApiProperty({
    example: 100.0,
    description: "The starting price of the item",
  })
  readonly startingPrice: number;

  @ApiProperty({
    example: "2023-10-01T10:00:00Z",
    description: "The start date and time of the auction",
  })
  readonly startTime: Date;

  @ApiProperty({
    example: "2023-10-07T10:00:00Z",
    description: "The end date and time of the auction",
  })
  readonly endTime: Date;

  @ApiProperty({
    example: 250.0,
    description: "The final price of the item after auction ends",
    nullable: true,
  })
  readonly finalPrice: number | null;

  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The unique identifier of the winner",
    nullable: true,
  })
  readonly winnerId: Uuid | null;

  @ApiProperty({
    example: "Bao",
    description: "The winner name of the item",
    nullable: true,
  })
  readonly winnerName: string | null;

  @ApiProperty({
    example: "2023-10-01T10:00:00Z",
    description: "The date and time when the item was created",
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: "2023-10-01T10:00:00Z",
    description: "The date and time when the item was last updated",
  })
  readonly updatedAt: Date;

  static fromEntity(entity: ItemEntity): GetItemsByFilterResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      ownerId: entity.ownerId,
      ownerName: entity.owner.firstName + " " + entity.owner.lastName,
      startingPrice: entity.startingPrice,
      startTime: entity.startTime,
      endTime: entity.endTime,
      finalPrice: entity.finalPrice,
      winnerId: entity.winnerId,
      winnerName: entity.winner
        ? entity.winner.firstName + " " + entity.winner.lastName
        : null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static fromEntities(entities: ItemEntity[]): GetItemsByFilterResponseDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}
