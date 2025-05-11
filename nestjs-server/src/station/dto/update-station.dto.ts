import { IsString } from 'class-validator';
import { CreateStationDto } from './create-station.dro';

export class UpdateStationDto extends CreateStationDto {
  @IsString({ message: 'Описание обязательно' })
  description: string;
}
