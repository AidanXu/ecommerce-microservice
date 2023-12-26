import { CreateUserDto } from './dtos/CreateUser.dto';
import { Body, Controller, Inject, Param, Post, Get, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { LoginUserDto } from './dtos/LoginUser.dto'

@Controller('users')
export class UsersController{

    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.natsClient.send({ cmd: 'createUser'}, createUserDto);
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        const response$ = this.natsClient.send({ cmd: 'loginUser'}, loginUserDto);
        const token = await lastValueFrom(response$);

        if (!token) {
            throw new HttpException('Invalid credentials', 401);
        }
        return { access_token: token };
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