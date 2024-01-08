import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Cart } from './Cart';

@Entity()
export class CartItem {
  @PrimaryColumn()
  productId: string;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => Cart)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  cart: Cart;

  @Column()
  quantity: number;

  @Column('float')
  unitPrice: number;
}
