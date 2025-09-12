import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserMapper } from './mappers/user.mapper';
import { GetUserByIdResponseDto } from './dto/get-user-by-id.response.dto';
import { GetUserByIdQuery } from './cqrs/queries/implements/get-user-by-id.query';
import { UUID } from 'crypto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.commandBus.execute(UserMapper.fromCreateUserDto(createUserDto));
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: GetUserByIdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getById(
    @Param('userId') userId: UUID,
  ): Promise<GetUserByIdResponseDto> {
    return await this.queryBus.execute(new GetUserByIdQuery(userId));
  }
}
