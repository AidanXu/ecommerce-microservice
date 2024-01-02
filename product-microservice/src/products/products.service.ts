import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/typeorm/entities/Products';
import { AddProductDto } from './dtos/AddProduct.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  addProduct(addProductDto: AddProductDto) {
    return this.productsRepository.save(addProductDto);
  }

  getProducts() {
    return this.productsRepository.find();
  }

  getProductById(id: string) {
    return this.productsRepository.findOne({
      where: { productId: id },
    });
  }

  async getTotalPrice(productId: string, quantity: number) {
    const prod = await this.productsRepository.findOne({
      where: {
        productId: productId,
      },
    });
    return quantity * prod.price;
  }
}
