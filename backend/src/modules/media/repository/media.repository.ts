import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MediaEntity } from "../entities/media.entity";
import { In, Repository } from "typeorm";
import { Uuid } from "common/types";

@Injectable()
export class MediaRepository {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
  ) {}

  async create(media: Partial<MediaEntity>): Promise<MediaEntity> {
    return this.mediaRepository.save(this.mediaRepository.create(media));
  }

  async findByIdOrThrow(id: Uuid): Promise<MediaEntity> {
    const mediaEntity = await this.mediaRepository.findOneBy({ id });

    if (!mediaEntity) {
      throw new NotFoundException({
        description: `Media with id ${id} not found`,
      });
    }

    return mediaEntity;
  }

  async findByIds(ids: Uuid[]): Promise<MediaEntity[]> {
    return this.mediaRepository.findBy({
      id: In(ids),
    });
  }
}
