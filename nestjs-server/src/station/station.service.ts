import { PrismaService } from '@/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dro';
import { UpdateStationDto } from './dto/update-station.dto';

@Injectable()
export class StationService {
  constructor(private readonly prisma: PrismaService) {}
  async getById(stationId: string, userId: string) {
    const station = await this.prisma.station.findUnique({
      where: { id: stationId, userId },
    });
    if (!station)
      throw new NotFoundException(
        'Магазин не найден или у вас нет доступа к нему',
      );
    return station;
  }
  async create(userId: string, dto: CreateStationDto) {
    return await this.prisma.station.create({
      data: {
        name: dto.name,
        address: dto.address,
        userId,
      },
    });
  }
  async update(stationId: string, userId: string, dto: UpdateStationDto) {
    await this.getById(stationId, userId);

    return await this.prisma.station.update({
      where: { id: stationId },
      data: {
        ...dto,
        userId,
      },
    });
  }

  async delete(stationId: string, userId: string) {
    await this.getById(stationId, userId);

    return await this.prisma.station.delete({
      where: { id: stationId },
    });
  }
}
