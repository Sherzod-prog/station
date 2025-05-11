import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}
  async getAll() {
    return this.prisma.employee.findMany();
  }
  async getById(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
    });
  }
  async create(dto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: { ...dto },
    });
  }
  async update(id: string, dto: CreateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: { ...dto },
    });
  }
  async delete(id: string) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
