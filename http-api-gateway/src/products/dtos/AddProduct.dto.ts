import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class AddProductDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(32)
    name: string;

    @IsString()
    @IsOptional()
    description?:string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsOptional()
    @IsString()
    image?: string;
}