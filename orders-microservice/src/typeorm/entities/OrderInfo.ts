import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';

@Entity()
export class Orders {
  // Primary key is generated uuid
  @PrimaryGeneratedColumn('uuid')
  orderId: number;

  @Column()
  userId: string;

  @Column()
  totalItems: number;

  @Column()
  totalCost: number;

  @Column()
  orderStatus: string;

  @Column()
  paymentStatus: string;

  @Column()
  shippingAddress: string;

  // One order to many orderItems
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
