import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Get('/')
  async getOrders(@Req() request) {
    const token = request.headers.authorization;
    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'getOrders' }, { token }),
    );

    if (response.error) {
      throw new HttpException(response.error, HttpStatus.BAD_REQUEST);
    }

    return response;
  }
}
