import { Injectable } from "@nestjs/common";
import { IUserRepository } from "./iuser.repository";
import { User } from "../domain/user";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    async create(user: User): Promise<User> {
        const userEntity = this.userRepository.create(user);
        await this.userRepository.save(userEntity);
        return userEntity;
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findById(id: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async update(user: User): Promise<User> {
        await this.userRepository.save(user);
        return user;
    }
    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}