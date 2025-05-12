import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Auth } from '@/auth/decorators/auth.decorator';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get()
  async getAll() {
    return this.salesService.getAll();
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Get(':id')
  async getById(id: string) {
    return this.salesService.getById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(dto: CreateSaleDto, userId) {
    return this.salesService.create(dto, userId);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(id: string, dto: UpdateSaleDto, userId) {
    return this.salesService.update(id, dto, userId);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(id: string) {
    return this.salesService.delete(id);
  }
}
