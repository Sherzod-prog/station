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
        color: true,
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
        color: true,
        reviews: true,
      },
    });
    if (!product) throw new NotFoundException('Товар не найден');

    return product;
  }

  async getByCategory(categoryId: string) {
    const product = await this.prisma.product.findMany({
      where: {
        category: {
          id: categoryId,
        },
      },
      include: {
        category: true,
      },
    });
    if (!product) throw new NotFoundException('Товар не найден');

    return product;
  }

  async getMostPopular() {
    const getMostPopularProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });
    const productIds = getMostPopularProducts.map(
      (item: { productId: string }) => item.productId,
    );
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  async getSimilar(id: string) {
    const currentProduct = await this.getById(id);
    if (!currentProduct) throw new NotFoundException('Товар не найден');
    const products = await this.prisma.product.findMany({
      where: {
        category: { title: currentProduct.category.title },
        NOT: {
          id: currentProduct.id,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        category: true,
      },
    });
    return products;
  }

  async create(stationId: string, dto: ProductDto) {
    return await this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        image: dto.images,
        categoryId: dto.categoryId,
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
