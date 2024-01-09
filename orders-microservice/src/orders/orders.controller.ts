import { Controller, Inject } from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private jwtService: JwtService,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  @EventPattern('checkoutCart')
  async orderItemsInCart(data: any) {
    const cartInfo = data.userCartItems;
    const orderInfo = data.checkoutDto;
    const totalCost = data.totalCost;
    const newOrder = await this.ordersService.createOrder(
      cartInfo,
      orderInfo,
      totalCost,
    );

    this.natsClient.emit('newOrder', { userId: newOrder.userId });
  }

  @MessagePattern({ cmd: 'getOrders' })
  async getOrders(data: { token: string }) {
    const { token } = data;
    try {
      const clean = token.startsWith('Bearer ') ? token.slice(7) : token;
      const decode = this.jwtService.verify(clean, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decode.sub;
      const orders = await this.ordersService.getOrders(userId);
      if (orders) {
        return orders;
      } else {
        return {
          data: null,
          error: 'No Orders Found',
          code: 404,
        };
      }
    } catch (error) {
      return {
        data: null,
        error: error.message || 'Unknown error ocurred',
        code: 400,
      };
    }
  }
}
