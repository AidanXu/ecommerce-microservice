import { PaymentsModule } from './payments/payments.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {UsersModule} from './users/user.module'
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    UsersModule,
    PaymentsModule,
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
