import { Entity, PrimaryColumn, OneToMany, Column, AfterLoad } from 'typeorm';
import { CartItem } from './CartItem';

@Entity()
export class Cart {
  @PrimaryColumn()
  userId: string; // Primary key, also a reference to the User entity's ID

  @Column({ default: 0 })
  totalItems: number;

  @Column({ type: 'float', default: 0.0 })
  totalCost: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}
