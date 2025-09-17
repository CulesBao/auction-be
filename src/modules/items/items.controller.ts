import { Controller, Post, Body } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsMapper } from './mapper/items.mapper';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiResponse({
    status: 201,
    description: 'The item has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.commandBus.execute(
      ItemsMapper.fromCreateItemDto(createItemDto),
    );
  }
}
