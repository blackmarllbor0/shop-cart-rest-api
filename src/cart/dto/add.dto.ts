import { IsNumber, IsString } from 'class-validator';

export class AddToBasketDto {
  @IsString()
  quantity: number;

  @IsNumber()
  productId: number;
}
