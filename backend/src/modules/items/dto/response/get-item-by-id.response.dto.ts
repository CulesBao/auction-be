import { ApiProperty } from "@nestjs/swagger";
import { Uuid } from "common/types";
import { ItemEntity } from "../../entities/item.entity";
import { BidEntity } from "modules/bids/entities/bid.entity";
import { MediaEntity } from "modules/media/entities/media.entity";

class BidHistoryDto {
  @ApiProperty({
    example: "bbbb2222-cccc-3333-dddd-4444eeee5555",
    description: "The unique identifier of the bid",
  })
  readonly id: Uuid;

  @ApiProperty({
    example: 150.0,
    description: "The price of the bid",
  })
  readonly price: number;

  @ApiProperty({
    example: "2023-10-02T12:00:00Z",
    description: "The date and time when the bid was created",
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: "cccc3333-dddd-4444-eeee-5555ffff6666",
    description: "The unique identifier of the user who placed the bid",
  })
  readonly userId: Uuid;

  @ApiProperty({
    example: "Le Thi B",
    description: "The name of the user who placed the bid",
  })
  readonly userName: string;

  static fromEntity(entity: BidEntity): BidHistoryDto {
    return {
      id: entity.id,
      price: entity.price,
      createdAt: entity.createdAt,
      userId: entity.userId,
      userName: entity.user.firstName + " " + entity.user.lastName,
    };
  }

  static fromEntities(entities: BidEntity[]): BidHistoryDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}

export class MediaDto {
  @ApiProperty({
    example: "550e8400-e29b-41d4-a716-446655440000",
    description: "The unique identifier of the media",
  })
  id: Uuid;

  @ApiProperty({
    example: "image12345.png",
    description: "The file name of the media",
  })
  fileName: string;

  @ApiProperty({
    example: "https://bucket-name.s3.amazonaws.com/image12345.png",
    description: "The URL of the media file",
  })
  fileUrl: string;

  static fromEntity(entity: MediaEntity): MediaDto {
    return {
      id: entity.id,
      fileName: entity.fileName,
      fileUrl: entity.fileUrl,
    };
  }

  static fromEntities(entities: MediaEntity[]): MediaDto[] {
    return entities.map((entity) => this.fromEntity(entity));
  }
}

export class GetItemByIdResponseDto {
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
    example: [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        fileName: "image12345.png",
        fileUrl: "https://bucket-name.s3.amazonaws.com/image12345.png",
      },
    ],
    description: "The media files associated with the item",
  })
  readonly medias: MediaDto[];

  @ApiProperty({
    example: "Bao Duong",
    description: "The name of the owner",
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
    example: "aaaa1111-bbbb-2222-cccc-3333dddd4444",
    description: "The unique identifier of the winner",
  })
  readonly winnerId: Uuid | null;

  @ApiProperty({
    example: "Nguyen Van A",
    description: "The name of the winner",
  })
  readonly winnerName: string | null;

  @ApiProperty({
    example: 250.0,
    description: "The final price of the item",
  })
  readonly finalPrice: number | null;

  @ApiProperty({
    example: [],
    description: "The bid history of the item",
  })
  readonly bidHistory: BidHistoryDto[];

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

  static fromEntity(entity: ItemEntity): GetItemByIdResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      ownerId: entity.ownerId,
      medias: MediaDto.fromEntities(entity.medias),
      ownerName: entity.owner.firstName + " " + entity.owner.lastName,
      startingPrice: entity.startingPrice,
      startTime: entity.startTime,
      endTime: entity.endTime,
      winnerId: entity.winnerId,
      winnerName: entity.winner
        ? entity.winner.firstName + " " + entity.winner.lastName
        : null,
      finalPrice: entity.finalPrice,
      bidHistory: BidHistoryDto.fromEntities(entity.bids),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
