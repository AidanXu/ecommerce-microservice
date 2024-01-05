import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuantityDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsBoolean()
  @IsNotEmpty()
  change: boolean;
}
