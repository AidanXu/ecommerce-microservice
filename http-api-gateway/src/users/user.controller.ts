import { CreateUserDto } from './dtos/CreateUser.dto';
import { Body, Controller, Inject, Param, Post, Get, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController{

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    @Post()
    createrUser(@Body() createUserDto: CreateUserDto) {
        return this.natsClient.send({ cmd: 'createUser'}, createUserDto);
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        const user = await lastValueFrom(this.natsClient.send({ cmd: 'getUserById'}, {userId: id}));
        if (user) {
            return user;
        }
        else {
            throw new HttpException('User Not Found', 404);
        }
    }
}