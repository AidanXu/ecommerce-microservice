import { cartModule } from './cart/cart.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './typeorm/entities/Cart';
import { CartItem } from './typeorm/entities/CartItem';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [Cart, CartItem],
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    cartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
