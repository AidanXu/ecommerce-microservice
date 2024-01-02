import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AddItemDto } from './dtos/AddItem.dto';

@Controller('cart')
export class CartController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post('/addItem')
  async addItemToCart(@Req() request, @Body() addItemDto: AddItemDto) {
    const token = request.headers.authorization;
    const response = await lastValueFrom(
      this.natsClient.send({ cmd: 'addItem' }, { addItemDto, token }),
    );

    if (response.error) {
      throw new HttpException(response.error, HttpStatus.BAD_REQUEST);
    }

    return response;
  }
}
