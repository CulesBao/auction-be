import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateMediaRequestDto {
  @ApiProperty({
    description: "The storage bucket where the media will be stored",
    example: "user-uploads",
  })
  @IsNotEmpty()
  bucket: string;

  @ApiProperty({
    description: "The name of the media file",
    example: "example.jpg",
  })
  @IsNotEmpty()
  fileName: string;
}
