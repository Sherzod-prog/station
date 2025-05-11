import { IsString } from 'class-validator';

export class CreateStationDto {
  @IsString({ message: 'Название обязательно' })
  name: string;

  @IsString({ message: 'Адрес обязателен' })
  address: string;
}
