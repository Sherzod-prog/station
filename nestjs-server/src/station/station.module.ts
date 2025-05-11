import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { PrismaService } from '@/prisma.service';

@Module({
  imports: [],
  controllers: [StationController],
  providers: [StationService, PrismaService],
})
export class StationModule {}
