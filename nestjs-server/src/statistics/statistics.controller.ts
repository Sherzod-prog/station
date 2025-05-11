import { Controller, Get, Param } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { Auth } from '@/auth/decorators/auth.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Auth()
  @Get('main/:stationId')
  async getMainStatistics(@Param('stationId') stationId: string) {
    return this.statisticsService.getMainStatistics(stationId);
  }

  @Auth()
  @Get('middle/:stationId')
  async getMiddleStatistics(@Param('stationId') stationId: string) {
    return this.statisticsService.getMiddleStatistics(stationId);
  }
}
