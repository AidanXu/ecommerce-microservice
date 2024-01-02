import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn('uuid')
  productId: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: true })
  image?: string;
}
