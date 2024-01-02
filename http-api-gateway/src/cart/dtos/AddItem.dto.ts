import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
