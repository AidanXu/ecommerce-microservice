import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

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
    console.log(newOrder);
  }
}
