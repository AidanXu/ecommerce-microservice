import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/typeorm/entities/OrderInfo';
import { OrderItem } from 'src/typeorm/entities/OrderItem';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderItem]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
