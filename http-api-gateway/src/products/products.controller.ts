import {
  Body,
  Controller,
  Inject,
  Post,
  Req,
  HttpStatus,
  HttpException,
  Get,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AddProductDto } from './dtos/AddProduct.dto';
import { lastValueFrom } from 'rxjs';

@Controller('products')
export class ProductsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  async addProduct(@Req() request, @Body() addProductDto: AddProductDto) {
    const token = request.headers.authorization;

    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'addProduct' }, { addProductDto, token }),
    );

    if (response.error) {
      throw new HttpException(response.error, HttpStatus.BAD_REQUEST);
    }

    return response.data;
  }

  @Get()
  async viewProducts(@Req() request) {
    const token = request.headers.authorization;

    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'getProducts' }, { token }),
    );

    if (response.error) {
      throw new HttpException(response.error, HttpStatus.BAD_REQUEST);
    }

    return response.data;
  }

  @Get(':id')
  async getProductById(@Req() request, @Param('id') id: string) {
    const token = request.headers.authorization;

    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'getProductById' }, { id, token }),
    );

    if (response.error) {
      throw new HttpException(response.error, response.code);
    }

    return response.data;
  }
}
