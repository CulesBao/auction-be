import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dto/request/create-user.request.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserMapper } from './mappers/user.mapper';
import { GetUserByIdResponseDto } from './dto/response/get-user-by-id.response.dto';
import { GetUserByIdQuery } from './cqrs/queries/implements/get-user-by-id.query';
import { UUID } from 'crypto';
import { UpdateUserRequestDto } from './dto/request/update-user.request.dto';

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
  async create(
    @Body() createUserRequestDto: CreateUserRequestDto,
  ): Promise<void> {
    await this.commandBus.execute(
      UserMapper.fromCreateUserRequestDto(createUserRequestDto),
    );
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

  @Put(':userId')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. New password must be different from the old one.',
  })
  async update(
    @Param('userId', ParseUUIDPipe) userId: UUID,
    @Body() updateUserRequestDto: UpdateUserRequestDto,
  ): Promise<void> {
    await this.commandBus.execute(
      UserMapper.fromUpdateUserRequestDto(userId, updateUserRequestDto),
    );
  }
}
