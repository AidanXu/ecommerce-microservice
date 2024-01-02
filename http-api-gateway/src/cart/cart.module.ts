import { Module } from '@nestjs/common';
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { CartController } from './cart.controler';

@Module({
  imports: [NatsClientModule],
  controllers: [CartController],
  providers: [],
})
export class CartModule {}
