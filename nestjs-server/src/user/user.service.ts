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
      },
    });
    return user;
  }

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        stations: true,
      },
    });
    return user;
  }

  async create(dto: AuthDto) {
    return await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password: await hash(dto.password),
      },
    });
  }
}
