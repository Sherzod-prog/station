import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { PrismaService } from '@/prisma.service';

dayjs.locale('ru');
const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

@Injectable()
export class StatisticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMainStatistics(stationId: string) {
    const totalRevenue = await this.calculateTotalRevenue(stationId);
    const productCount = await this.countProducts(stationId);
    const categoryCount = await this.countCategories(stationId);
    const averageRating = await this.calculateAverageRating(stationId);
    return [
      { id: 1, name: 'Выручка', value: totalRevenue },
      { id: 2, name: 'Товары', value: productCount },
      { id: 3, name: 'Категории', value: categoryCount },
      { id: 4, name: 'Средний рейтинг', value: averageRating || 0 },
    ];
  }
  async getMiddleStatistics(stationId: string) {
    const monthSales = await this.calculateMonthlySales(stationId);

    const lastUsers = await this.getLastUsers(stationId);
    return { monthSales, lastUsers };
  }
  private async calculateTotalRevenue(stationId: string) {
    const orders = await this.prisma.order.findMany({
      where: {
        items: {
          some: { station: { id: stationId } },
        },
      },
      include: {
        items: {
          where: {
            stationId,
          },
        },
      },
    });
    const totalRevenue = orders.reduce((acc, order) => {
      const orderTotal = order.items.reduce((sum, item) => sum + item.price, 0);
      return acc + orderTotal;
    }, 0);
    return totalRevenue;
  }

  private async countProducts(stationId: string) {
    const products = await this.prisma.product.count({
      where: { stationId },
    });
    return products;
  }
  private async countCategories(stationId: string) {
    const categoriesCount = await this.prisma.category.count({
      where: { stationId },
    });
    return categoriesCount;
  }

  private async calculateAverageRating(stationId: string) {
    const averageRating = await this.prisma.review.aggregate({
      where: { stationId },
      _avg: { rating: true },
    });

    return averageRating._avg.rating;
  }

  private async calculateMonthlySales(stationId: string) {
    const startDate = dayjs().subtract(30, 'days').startOf('day').toDate();
    const endDate = dayjs().endOf('day').toDate();
    const salesRaw = await this.prisma.order.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
        items: {
          some: { stationId },
        },
      },
      include: {
        items: true,
      },
    });
    const formatDate = (date: Date): string => {
      return `${date.getDate()} ${monthNames[date.getMonth()]}`;
    };
    const salesByDate = new Map<string, number>();
    salesRaw.forEach((order) => {
      const formattedDate = formatDate(new Date(order.createdAt));
      const total = order.items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      if (salesByDate.has(formattedDate)) {
        salesByDate.set(formattedDate, salesByDate.get(formattedDate) + total);
      } else {
        salesByDate.set(formattedDate, total);
      }
    });
    const monthlySales = Array.from(salesByDate.entries()).map(
      ([date, total]) => ({
        date,
        total,
      }),
    );
    return monthlySales;
  }

  private async getLastUsers(stationId: string) {
    const lastUsers = await this.prisma.user.findMany({
      where: { orders: { some: { items: { some: { stationId } } } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        orders: {
          where: { items: { some: { stationId } } },
          include: { items: { where: { stationId }, select: { price: true } } },
        },
      },
    });
    return lastUsers.map((user) => {
      const lastOrder = user.orders[user.orders.length - 1];

      const total = lastOrder.items.reduce((total, item) => {
        return total + item.price;
      }, 0);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        pucture: user.picture,
        total,
      };
    });
  }
}
