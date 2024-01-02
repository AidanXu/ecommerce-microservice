import { User } from './typeorm/entities/Users';
import { usersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './typeorm/entities/Payment';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [User, Payment],
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    usersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
