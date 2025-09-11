import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<UserEntity> {
    const userEntity = this.userRepository.create(user);
    await this.userRepository.save(userEntity);
    return userEntity;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({
      id: new UUID(id),
    });
  }

  async existBy(email: string): Promise<boolean> {
    return this.userRepository.existsBy({
      email,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ email });
  }

  async update(user: User): Promise<void> {
    await this.userRepository.save(user);
  }
  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
