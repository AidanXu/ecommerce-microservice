import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CartService } from './cart.service';
import { JwtService } from '@nestjs/jwt';
import { AddItemDto } from './dtos/AddItem.dto';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private jwtService: JwtService,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  @EventPattern('newUser')
  createCart(@Payload() data: any) {
    return this.cartService.addCart(data.id);
  }

  @MessagePattern({ cmd: 'addItem' })
  async addItem(@Payload() data: { addItemDto: AddItemDto; token: string }) {
    const { addItemDto, token } = data;
    try {
      const clean = token.startsWith('Bearer ') ? token.slice(7) : token;
      const decode = this.jwtService.verify(clean, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decode.sub;
      const newItem = await this.cartService.addItem(
        addItemDto.productId,
        userId,
        addItemDto.quantity,
      );
      this.natsClient.emit('newItemInCart', {
        productId: addItemDto.productId,
        quantity: addItemDto.quantity,
        userId: userId,
      });
      return newItem;
    } catch (error) {
      return {
        data: null,
        error: error.message || 'Unknown error occurred',
        code: 400,
      };
    }
  }

  @MessagePattern({ cmd: 'updateQuantity' })
  async updateQuantity(data: { updateQuantityDto: any; token: string }) {
    const { updateQuantityDto, token } = data;
    try {
      const clean = token.startsWith('Bearer ') ? token.slice(7) : token;
      const decode = this.jwtService.verify(clean, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decode.sub;
      const newQuantity = await this.cartService.updateQuantity(
        updateQuantityDto.productId,
        userId,
        updateQuantityDto.change,
      );
      this.natsClient.emit('newItemInCart', {
        productId: updateQuantityDto.productId,
        quantity: updateQuantityDto.change ? 1 : -1,
        userId: userId,
      });
      return newQuantity;
    } catch (error) {
      return {
        data: null,
        error: error.message || 'Unknown error ocurred',
        code: 400,
      };
    }
  }

  @EventPattern('itemPriceFound')
  async updateTotalPrice(data: any) {
    await this.cartService.updateUnitPrice(
      data.userId,
      data.unitPrice,
      data.productId,
    );
    await this.cartService.updateTotalPrice(data.userId, data.totalPrice);
  }

  @MessagePattern({ cmd: 'checkout' })
  async checkout(data: { token: string; checkoutDto: any }) {
    const { token, checkoutDto } = data;
    const clean = token.startsWith('Bearer ') ? token.slice(7) : token;
    const decode = this.jwtService.verify(clean, {
      secret: process.env.JWT_SECRET,
    });
    const userId = decode.sub;
    const userCartItems = await this.cartService.getCartItems(userId);
    this.natsClient.emit('checkoutCart', {
      userCartItems: userCartItems.userCartItems,
      totalCost: userCartItems.totalCost,
      checkoutDto: checkoutDto,
    });
    if (userCartItems) return userCartItems;
    else {
      return {
        data: null,
        error: 'Cart Empty',
        code: 404,
      };
    }
  }
}
