import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StationService } from './station.service';
import { Auth } from '@/auth/decorators/auth.decorator';
import { CurrentUser } from '@/user/decorators/user.decorator';
import { CreateStationDto } from './dto/create-station.dro';
import { UpdateStationDto } from './dto/update-station.dto';

@Controller('stations')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Auth()
  @Get('by-id/:id')
  async getById(
    @Param('id') stationId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.stationService.getById(stationId, userId);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateStationDto,
  ) {
    return this.stationService.create(userId, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(
    @Param('id') stationId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateStationDto,
  ) {
    return this.stationService.update(stationId, userId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(
    @Param('id') stationId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.stationService.delete(stationId, userId);
  }
}
