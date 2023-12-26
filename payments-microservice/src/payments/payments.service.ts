
import { Repository } from 'typeorm';
import { Payment } from './typeorm/entities/Payment';
import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreatePaymentDto } from './dtos/CreatePayment.dto';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { User } from './typeorm/entities/Users';

@Injectable()
export class PaymentsService {
    constructor(@InjectRepository(Payment) private paymentsRespository: Repository<Payment>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
    ) {}

    async createPayment({userId, ... createPaymentDto}: CreatePaymentDto) {
        const user = await lastValueFrom<User>(this.natsClient.send({ cmd: 'getUserById'}, {userId}));
        console.log(user);
        if (user) {
            const newPayment = this.paymentsRespository.create({
                ...createPaymentDto,
                user,
            });
            console.log(newPayment);
            return this.paymentsRespository.save(newPayment);
        }
        return null;
    }
}