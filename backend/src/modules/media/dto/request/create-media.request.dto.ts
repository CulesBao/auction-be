import { ApiProperty } from "@nestjs/swagger";

export class CreateMediaRequestDto {
  @ApiProperty({
    description: "The storage bucket where the media will be stored",
    example: "user-uploads",
  })
  bucket: string;

  @ApiProperty({
    description: "The name of the media file",
    example: "example.jpg",
  })
  fileName: string;
}
