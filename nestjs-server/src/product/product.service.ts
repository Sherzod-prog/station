import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from '@/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(searchTerm?: string) {
    if (searchTerm) return this.getSearchTermFilter(searchTerm);
    return this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
  }
  private async getSearchTermFilter(searchTerm: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }
  async getByStationId(stationId: string) {
    return this.prisma.product.findMany({
      where: {
        stationId,
      },
      include: {
        category: true,
      },
    });
  }
  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Товар не найден');

    return product;
  }

  async create(stationId: string, dto: ProductDto) {
    return await this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        stationId,
      },
    });
  }
  async update(id: string, dto: ProductDto) {
    await this.getById(id);

    return await this.prisma.product.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return await this.prisma.product.delete({
      where: { id },
    });
  }
}
