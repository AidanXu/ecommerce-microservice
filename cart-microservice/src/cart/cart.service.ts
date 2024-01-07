import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from 'src/typeorm/entities/Cart';
import { CartItem } from 'src/typeorm/entities/CartItem';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
  ) {}

  async addCart(userId: string) {
    // Create a new cart and associate it with the provided userId
    const newCart = this.cartRepository.create({ userId });

    await this.cartRepository.save(newCart);
    return newCart;
  }

  async updateTotalPrice(userId: string, newItemsPrice: number) {
    let cart = await this.cartRepository.findOne({ where: { userId: userId } });
    cart.totalCost += newItemsPrice;
    this.cartRepository.save(cart);
  }

  async addItem(productId: string, userId: string, quantity: number) {
    // Find given userId
    let cart = await this.cartRepository.findOne({ where: { userId: userId } });

    // Find products in user's cart
    let userCartItems = await this.cartItemRepository.find({
      where: {
        cart: { userId: userId },
      },
    });

    // Update cart total quantity
    cart.totalItems += quantity;
    await this.cartRepository.save(cart);

    // If already exists update quantity
    for (let cartItem of userCartItems) {
      if (cartItem.productId == productId) {
        cartItem.quantity += quantity;
        await this.cartItemRepository.save(cartItem);
        return cartItem;
      }
    }

    // Otherwise create a new cart item with the given productId and quantity
    const newItem = this.cartItemRepository.create({
      cart,
      productId,
      quantity,
    });

    // Save the new cart item to the database
    await this.cartItemRepository.save(newItem);

    return newItem;
  }

  // Update quantity of given item (+1 or -1)
  async updateQuantity(productId: string, userId: string, change: boolean) {
    // Find given userId
    let cart = await this.cartRepository.findOne({ where: { userId: userId } });

    // Find products in user's cart
    let userCartItems = await this.cartItemRepository.find({
      where: {
        cart: { userId: userId },
      },
    });

    // Update item total
    change ? cart.totalItems++ : cart.totalItems--;
    await this.cartRepository.save(cart);

    for (let cartItem of userCartItems) {
      if (cartItem.productId == productId) {
        cartItem.quantity += change ? 1 : -1;
        if (cartItem.quantity == 0) {
          await this.cartItemRepository.delete({ userId, productId });
        } else {
          await this.cartItemRepository.save(cartItem);
        }
        return cartItem;
      }
    }
  }

  // Send current cart to orders
  async getCartItems(userId: string) {
    // Find given userId
    let cart = await this.cartRepository.findOne({ where: { userId: userId } });

    // Find products in user's cart
    let userCartItems = await this.cartItemRepository.find({
      where: {
        cart: { userId: userId },
      },
    });

    return userCartItems;
  }
}
