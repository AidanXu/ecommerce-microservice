import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController{

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

   @Post()
   createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    this.natsClient.emit('createPayment', createPaymentDto);
   }
}