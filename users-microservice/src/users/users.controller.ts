import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
@Controller() 

export class UsersMicroserviceController {

    constructor(private usersService: UsersService) {
    }

    @MessagePattern({cmd: 'createUser'})
    createUser(@Payload() data: CreateUserDto) {
        return this.usersService.createUser(data);
    }

    @MessagePattern({cmd: 'getUserById'})
    getUserById(@Payload() data) {
        const {userId} = data;
        return this.usersService.getUserById(userId);
    }

    @EventPattern('paymentCreated')
    paymentCreated(@Payload() data: any) {
        console.log(data);
    }
}
