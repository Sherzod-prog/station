import { IsString } from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends CreateEmployeeDto {
  @IsString({ message: 'ID обязательно' })
  description?: string;
}
