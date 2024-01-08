import { Controller, Inject, UnauthorizedException } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AddProductDto } from './dtos/AddProduct.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private productsService: ProductsService,
    private jwtService: JwtService,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'addProduct' })
  async addProduct(
    @Payload() data: { addProductDto: AddProductDto; token: string },
  ) {
    const { addProductDto, token } = data;

    try {
      const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      const decoded = this.jwtService.verify(cleanedToken, {
        secret: process.env.JWT_SECRET,
      });

      const result = await this.productsService.addProduct(addProductDto);
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred' };
    }
  }

  @MessagePattern({ cmd: 'getProducts' })
  async getProducts(data: { token: string }) {
    const { token } = data;
    try {
      const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
      const decoded = this.jwtService.verify(cleanedToken, {
        secret: process.env.JWT_SECRET,
      });

      const result = await this.productsService.getProducts();
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error.message || 'An error occurred' };
    }
  }

  @MessagePattern({ cmd: 'getProductById' })
  async getProductById(data: { id: string; token: string }) {
    const { id, token } = data;
    try {
      const clean = token.startsWith('Bearer ') ? token.slice(7) : token;
      const decode = this.jwtService.verify(clean, {
        secret: process.env.JWT_SECRET,
      });

      const res = await this.productsService.getProductById(id);
      if (res) return { data: res, error: null };
      else return { data: null, error: 'Not Found', code: 404 };
    } catch (error) {
      return {
        data: null,
        error: error.message || 'Unknown error occurred',
        code: 400,
      };
    }
  }

  @EventPattern('newItemInCart')
  async getProductPricing(data: any) {
    const { totalPrice, unitPrice } = await this.productsService.getTotalPrice(
      data.productId,
      data.quantity,
    );
    this.natsClient.emit('itemPriceFound', {
      totalPrice: totalPrice,
      unitPrice: unitPrice,
      productId: data.productId,
      userId: data.userId,
    });
  }
}
