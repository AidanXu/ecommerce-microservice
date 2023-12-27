import { Controller, UnauthorizedException } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { JwtService } from '@nestjs/jwt';
import { AddProductDto } from "./dtos/AddProduct.dto";
import { ProductsService } from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(
        private productsService: ProductsService,
        private jwtService: JwtService
    ) {}

    @MessagePattern({cmd: 'addProduct'})
    async addProduct(@Payload() data: { addProductDto: AddProductDto, token: string }) {
        const { addProductDto, token } = data;

        try {
            const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
            const decoded = this.jwtService.verify(cleanedToken, {
                secret: process.env.JWT_SECRET,
            });

            const result = await this.productsService.addProduct(addProductDto);
            return { data: result, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'An error occurred' };
        }
    }

    @MessagePattern({cmd: 'getProducts'})
    async getProducts(data: {token: string}) {
        const { token } = data;
        try {
            const cleanedToken = token.startsWith('Bearer ') ? token.slice(7) : token;
            const decoded = this.jwtService.verify(cleanedToken, {
                secret: process.env.JWT_SECRET,
            });

            const result = await this.productsService.getProducts();
            return { data: result, error: null };
        } catch (error) {
            return { data: null, error: error.message || 'An error occurred' };
        }
    }
}