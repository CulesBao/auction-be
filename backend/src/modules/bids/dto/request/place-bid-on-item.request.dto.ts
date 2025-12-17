import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { Uuid } from "common/types";

export class PlaceBidOnItemRequestDto {
  @ApiProperty({
    description: "The ID of the item to bid on",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  @IsNotEmpty()
  @IsUUID()
  itemId: Uuid;

  @ApiProperty({
    description: "The bid price",
    example: 150.0,
  })
  @IsNotEmpty()
  price: number;
}
