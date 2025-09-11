import { Injectable } from '@nestjs/common';
import { User } from '../domain/user';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(user: User): Promise<UserEntity> {
    return await this.userRepository.save(
      this.userRepository.create(user)
    );
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async findById(id: UUID): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({
      id,
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

  async delete(id: UUID): Promise<void> {
    await this.userRepository.delete(id);
  }
}
