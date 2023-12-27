import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/typeorm/entities/Products";
import { ProductsService } from "./products.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([Product]),
    JwtModule.register({
        secret: process.env.JWT_SECRET, // defined in docker-compose
    }),
],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class productsModule {}