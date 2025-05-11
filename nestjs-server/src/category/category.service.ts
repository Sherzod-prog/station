import { PrismaService } from '@/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryDto } from './dto/categoty.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getByStationId(stationId: string) {
    return this.prisma.category.findMany({
      where: {
        stationId,
      },
    });
  }
  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) throw new NotFoundException('Категория не найден');

    return category;
  }
  async create(stationId: string, dto: CategoryDto) {
    return await this.prisma.category.create({
      data: {
        title: dto.title,
        description: dto.description,
        stationId,
      },
    });
  }
  async update(id: string, dto: CategoryDto) {
    await this.getById(id);

    return await this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    await this.getById(id);

    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
