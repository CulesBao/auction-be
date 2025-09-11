import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './cqrs/commands/handlers/create-user.command.handler';
import { UserMapper } from './mappers/user.mapper';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<void> {
    await this.commandBus.execute(
      UserMapper.fromCreateUserDto(createUserDto),
    );
  }
}
