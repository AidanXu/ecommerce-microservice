import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    NatsClientModule,
  ],
  controllers: [],
  providers: [],
})
export class OrdersModule {}
