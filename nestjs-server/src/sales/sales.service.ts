import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async getSales() {
    return this.prisma.sale.findMany({
      include: {
        product: true,
        customer: true,
      },
    });
  }
  async getSaleById(id: number) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: {
        product: true,
        customer: true,
      },
    });
  }
  async create(data: any) {
    return this.prisma.sale.create({ data });
  }
}
