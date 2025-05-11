import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString({ message: 'Дата обязательна' })
  date: string;

  @IsNumber({}, { message: 'Цена обязательна' })
  price: number;

  @IsString({ message: 'Описание обязательно' })
  description: string;
}
