import { User } from './../typeorm/entities/Users';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersMicroserviceController } from './users.controller';
import { Module } from "@nestjs/common";
import { Payment } from 'src/typeorm/entities/Payment';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Payment]),
        JwtModule.register({
            secret: 'xdd123', // remove this later
          }),
    ],
    controllers: [UsersMicroserviceController],
    providers: [UsersService], 
})
export class usersModule {}