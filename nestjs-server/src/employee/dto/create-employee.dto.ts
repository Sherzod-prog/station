import { IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString({ message: 'Название обязательно' })
  name: string;

  @IsString({ message: 'Должность обязательна' })
  position: 'MANAGER' | 'OPERATOR' | 'WORKER';

  @IsString({ message: 'Номер телефона обязательен' })
  phone: string;
}
