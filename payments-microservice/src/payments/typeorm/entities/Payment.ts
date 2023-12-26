import { User } from './Users';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "payments"})
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('float')
    amount: number;

    @ManyToOne(() => User, (user) => user.payments)
    user: User;
}