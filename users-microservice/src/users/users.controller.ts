import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { LoginUserDto } from './dtos/LoginUser.dto';

@Controller()
export class UsersMicroserviceController {
  constructor(
    private usersService: UsersService,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(@Payload() data: CreateUserDto) {
    const newUser = await this.usersService.createUser(data);
    if (newUser) {
      this.natsClient.emit('newUser', newUser);
    }
    return newUser;
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Payload() data) {
    const { userId } = data;
    return this.usersService.getUserById(userId);
  }

  @MessagePattern({ cmd: 'loginUser' })
  loginUser(@Payload() data: LoginUserDto) {
    return this.usersService.loginUser(data.email, data.password);
  }

  @EventPattern('paymentCreated')
  paymentCreated(@Payload() data: any) {
    console.log(data);
  }
}
