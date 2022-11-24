import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { IUserRequest } from 'src/auth/interfaces/user-req.interface';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UpdateResult } from 'typeorm';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { AddToBasketDto } from './dto/add.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('addToBasket')
  public async addToCart(
    @Body() { productId, quantity }: AddToBasketDto,
    @Req() { user: { email } }: IUserRequest,
  ): Promise<Cart | UpdateResult> {
    return await this.cartService.addToCart(productId, email, quantity);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('getCartItems')
  public async getItemInCard(
    @Req() { user: { email } }: IUserRequest,
  ): Promise<Cart[]> {
    return await this.cartService.getItemInCard(email);
  }
}
