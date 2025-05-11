import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/updeta-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(userId: string, dto: CreateExpenseDto) {
    return this.prisma.expense.create({
      data: { ...dto, userId },
    });
  }
  async update(expenseId: string, userId: string, dto: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id: expenseId },
      data: { ...dto, userId },
    });
  }
  async delete(id: string) {
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
