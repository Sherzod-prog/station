import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StationModule } from './station/station.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SalesModule } from './sales/sales.module';
import { ReportModule } from './report/report.module';
import { EmployeeModule } from './employee/employee.module';
import { ExpensesModule } from './expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    StationModule,
    CategoryModule,
    ProductModule,
    SalesModule,
    ReportModule,
    EmployeeModule,
    ExpensesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
