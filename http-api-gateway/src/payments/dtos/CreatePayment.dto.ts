import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    userId: string;
}