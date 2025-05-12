import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.sale.findMany({
      include: {
        products: true,
      },
    });
  }
  async getById(id: string) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        products: true,
      },
    });
  }

  async create(dto: CreateSaleDto, userId: string) {
    return this.prisma.sale.create({ data: { ...dto, userId } });
  }
  async update(id: string, dto: UpdateSaleDto, userId: string) {
    return this.prisma.sale.update({ where: { id }, data: { ...dto, userId } });
  }
  async delete(id: string) {
    return this.prisma.sale.delete({ where: { id } });
  }
}
