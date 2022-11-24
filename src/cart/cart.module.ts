import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { User } from 'src/user/user.entity';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, User, Product]), ProductModule],
  providers: [CartService, ProductService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
