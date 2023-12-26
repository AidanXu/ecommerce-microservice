import { PaymentsModule } from './payments/payments.module';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {UsersModule} from './users/user.module'

@Module({
  imports: [
    UsersModule,
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
