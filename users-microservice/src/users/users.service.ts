import { CreateUserDto } from './dtos/CreateUser.dto';
import { Injectable } from '@nestjs/common';
import { User } from './../typeorm/entities/Users';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        const { password, ...userDetails } = createUserDto;

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = this.usersRepository.create({
            ...userDetails,
            password: hashedPassword,
        });

        return this.usersRepository.save(newUser);
    }

    async loginUser(email: string, plainTextPassword: string) {
        const user = await this.usersRepository.findOne({ where: { email } });
    
        if (!user) return null;
    
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, user.password);
        if (!isPasswordMatching) return null;
    
        // Generate JWT token
        const payload = { email: user.email, sub: user.id };
        return this.jwtService.sign(payload); // Return only the JWT token
    }

    getUserById(userId: string) {
        return this.usersRepository.findOne({
            where: {id: userId},
            //relations: ['payments'],
        });
    }
}
