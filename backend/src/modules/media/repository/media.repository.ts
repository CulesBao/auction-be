import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MediaEntity } from "../entities/media.entity";
import { Repository } from "typeorm";

@Injectable()
export class MediaRepository {
  constructor(
    @InjectRepository(MediaEntity)
    private readonly mediaRepository: Repository<MediaEntity>,
  ) {}

  async create(media: Partial<MediaEntity>): Promise<MediaEntity> {
    return this.mediaRepository.save(this.mediaRepository.create(media));
  }
}
