import { AuthDto } from '@/auth/dto/auth.dto';
import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        stations: true,
        favorites: true,
        orders: true,
      },
    });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        stations: true,
        favorites: true,
        orders: true,
      },
    });
    return user;
  }

  async toggleFavorite(userId: string, productId: string) {
    const user = await this.getById(userId);

    const isExists = user.favorites.some((product) => product.id === productId);
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        favorites: { [isExists ? 'disconnect' : 'connect']: { id: productId } },
      },
    });
    return true;
  }

  async create(dto: AuthDto) {
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
    });
  }
}
