import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../implements/get-user-by-id.query';
import { UserRepository } from 'src/modules/users/repository/user.repository';
import { UUID } from 'crypto';
import { Inject, NotFoundException } from '@nestjs/common';
import { GetUserByIdResponseDto } from 'src/modules/users/dto/get-user-by-id.response.dto';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async execute(query: GetUserByIdQuery): Promise<any> {
    const user = await this.userRepository.findById(query.id as UUID);

    if (!user) {
      throw new NotFoundException(`User with ID ${query.id} not found`);
    }

    return GetUserByIdResponseDto.fromEntity(user);
  }
}
