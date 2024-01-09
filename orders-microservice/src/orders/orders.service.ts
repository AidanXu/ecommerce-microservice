import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/typeorm/entities/OrderInfo';
import { OrderItem } from 'src/typeorm/entities/OrderItem';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
  ) {}

  async createOrder(cartItems: any, orderInfo: any, totalCost: number) {
    const userId = cartItems[0].userId;

    // Create new order
    const newOrder = this.orderRepository.create({
      userId: userId,
      totalCost: totalCost,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      shippingAddress: orderInfo.shippingAddress,
    });

    // Save new order
    await this.orderRepository.save(newOrder);

    // Add order items to repo
    for (let item of cartItems) {
      const newItem = this.orderItemRepository.create({
        orderId: newOrder.orderId,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      });
      await this.orderItemRepository.save(newItem);
    }

    return newOrder;
  }

  async getOrders(userId: string) {
    const orders = await this.orderRepository.find({
      where: { userId: userId },
      relations: ['orderItems'],
    });

    // Remove orderId from each orderItem
    orders.forEach((order) => {
      order.orderItems = order.orderItems.map((item) => {
        delete item.orderId;
        return item;
      });
    });

    return orders;
  }
}
