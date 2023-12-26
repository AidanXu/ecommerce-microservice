import { CreateUserDto } from './dtos/CreateUser.dto'
import { Injectable } from '@nestjs/common';
import { User } from './../typeorm/entities/Users';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {}

    createUser(createUserDto: CreateUserDto) {
        const newUser = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(newUser);
    }

    getUserById(userId: string) {
        return this.usersRepository.findOne({
            where: {id: userId},
            relations: ['payments'],
            
        });
    }
}