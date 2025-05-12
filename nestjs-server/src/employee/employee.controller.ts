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
import { EmployeeService } from './employee.service';
import { Auth } from '@/auth/decorators/auth.decorator';
import { CurrentUser } from '@/user/decorators/user.decorator';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employeis')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Auth()
  @Get('by-id/:id')
  async getById(
    @Param('id') employeeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.employeeService.getById(employeeId);
  }
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateEmployeeDto,
  ) {
    return this.employeeService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(
    @Param('id') employeeId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(employeeId, dto);
  }

  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(@Param('id') employeeId: string) {
    return this.employeeService.delete(employeeId);
  }
}
