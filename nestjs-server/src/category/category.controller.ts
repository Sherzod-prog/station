import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Auth } from '@/auth/decorators/auth.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/categoty.dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categotyService: CategoryService) {}

  @Auth()
  @Get('by-stationId/:stationId')
  async getByStationId(@Param('stationId') stationId: string) {
    return this.categotyService.getByStationId(stationId);
  }

  @Auth()
  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.categotyService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':stationId')
  async create(
    @Param('stationId') stationId: string,
    @Body() dto: CategoryDto,
  ) {
    return this.categotyService.create(stationId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categotyService.update(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categotyService.delete(id);
  }
}
