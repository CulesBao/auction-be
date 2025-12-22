import { AbstractEntity } from "common/abstract.entity";
import { FileType } from "utils/file-type.enum";
import { Column, Entity } from "typeorm";
import { Uuid } from "common/types";

@Entity("medias")
export class MediaEntity extends AbstractEntity {
  @Column({
    type: "enum",
    enum: FileType,
  })
  readonly fileType: FileType;

  @Column()
  readonly userId: Uuid;

  @Column()
  readonly fileName: string;

  @Column()
  readonly fileUrl: string;
}
