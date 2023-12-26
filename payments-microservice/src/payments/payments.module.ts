import { Payment } from './typeorm/entities/Payment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsMicroserviceController } from './payments.controller';
import { Module } from "@nestjs/common";
import { NatsClientModule } from 'src/nats-client/nats-client.module';
import { User } from './typeorm/entities/Users';

@Module( {
    imports: [
        TypeOrmModule.forFeature([Payment, User]),
        NatsClientModule],
    controllers: [PaymentsMicroserviceController],
    providers: [PaymentsService],
})
export class PaymentsModule {}