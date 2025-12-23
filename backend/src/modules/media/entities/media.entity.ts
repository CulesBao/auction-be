import { AbstractEntity } from "common/abstract.entity";
import { FileType } from "utils/file-type.enum";
import { Column, Entity } from "typeorm";

@Entity("medias")
export class MediaEntity extends AbstractEntity {
  @Column({
    type: "enum",
    enum: FileType,
  })
  readonly fileType: FileType;

  @Column()
  readonly bucket: string;

  @Column()
  readonly fileName: string;

  @Column()
  readonly fileUrl: string;
}
