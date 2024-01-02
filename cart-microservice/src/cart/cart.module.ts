import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/typeorm/entities/Cart';
import { CartItem } from 'src/typeorm/entities/CartItem';
import { CartService } from './cart.service';
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    NatsClientModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class cartModule {}
