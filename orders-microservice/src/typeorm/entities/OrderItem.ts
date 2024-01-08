import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Orders } from './OrderInfo';

@Entity()
export class OrderItem {
  // Primary key is composite of (orderId, productId)
  @PrimaryColumn()
  orderId: number;

  @PrimaryColumn()
  productId: string;

  @Column()
  quantity: number;

  @Column({ type: 'float' })
  unitPrice: number; // Price of the product per unit

  @ManyToOne(() => Orders, (orders) => orders.orderItems)
  @JoinColumn({ name: 'orderId' })
  order: Orders; // Relation back to the Order entity
}
