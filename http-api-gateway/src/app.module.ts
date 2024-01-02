import { PaymentsModule } from './payments/payments.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from './users/user.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [UsersModule, PaymentsModule, ProductsModule, CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
