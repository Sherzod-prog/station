import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StationModule } from './station/station.module';
import { CategoryModule } from './category/category.module';
import { StatisticsModule } from './statistics/statistics.module';
import { ProductModule } from './product/product.module';
import { ExpensesModule } from './expenses/expenses.module';
import { SalesModule } from './sales/sales.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    StationModule,
    CategoryModule,
    StatisticsModule,
    ProductModule,
    ExpensesModule,
    SalesModule,
    EmployeeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
