import { UsersController } from './user.controller';
import { Module } from '@nestjs/common'
import { NatsClientModule } from 'src/nats-client/nats-client.module';

@Module ({
    imports: [NatsClientModule],
    controllers: [UsersController],
    providers: [],
})
export class UsersModule {};