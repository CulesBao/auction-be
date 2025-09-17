import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemsMapper } from './mapper/items.mapper';
import { GetItemByIdResponseDto } from './dto/get-item-by-id.response.dto';
import { UUID } from 'crypto';
import { GetItemByIdQuery } from './cqrs/queries/implements/get-item-by-id.query';

@Controller('items')
@ApiTags('items')
export class ItemsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Get(':id')
  @ApiOperation({ summary: 'Get item by ID' })
  @ApiResponse({
    status: 200,
    description: 'The item has been successfully retrieved.',
    type: GetItemByIdResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  getItemById(@Param('id') id: UUID) {
    return this.queryBus.execute(new GetItemByIdQuery(id));
  }
}
