import { IsString } from 'class-validator';

export class CategoryDto {
  @IsString({ message: 'Название обязательно' })
  title: string;
}
