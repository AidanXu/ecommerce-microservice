import { User } from './../typeorm/entities/Users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersMicroserviceController } from './users.controller';
import { Module } from "@nestjs/common";
import { Payment } from 'src/typeorm/entities/Payment';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Payment])
    ],
    controllers: [UsersMicroserviceController],
    providers: [UsersService], 
})
export class usersModule {}