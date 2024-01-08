import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './typeorm/entities/OrderInfo';
import { OrderItem } from './typeorm/entities/OrderItem';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [Orders, OrderItem],
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
