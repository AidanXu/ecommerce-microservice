import { Module } from '@nestjs/common';
import { productsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './typeorm/entities/Products';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'nestjs_db',
      entities: [Product],
      synchronize: true,
      username: 'testuser',
      password: 'testuser123',
    }),
    productsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
