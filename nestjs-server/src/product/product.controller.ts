import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from '@/auth/decorators/auth.decorator';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  async getAll(@Query('searchTerm') searchTerm: string) {
    return this.productService.getAll(searchTerm);
  }

  @Auth()
  @Get('by-stationId/:stationId')
  async getByStationId(@Param('stationId') stationId: string) {
    return this.productService.getByStationId(stationId);
  }

  @Get('by-id/:id')
  async getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':stationId')
  async create(@Param('stationId') stationId: string, @Body() dto: ProductDto) {
    return this.productService.create(stationId, dto);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post(':id')
  async update(@Param('id') id: string, @Body() dto: ProductDto) {
    return this.productService.update(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Post(':id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
