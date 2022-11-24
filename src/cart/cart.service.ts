import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundById } from 'src/exeption/not-found-id.filter';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Cart } from './cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly productService: ProductService,
  ) {}

  public async addToCart(
    productId: number,
    userEmail: string,
    quantity: number,
  ): Promise<Cart | UpdateResult> {
    const cartItems = await this.cartRepository.find({
      relations: ['user', 'products'],
    });
    const product = await this.productService.getById(productId);
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (product) {
      const cart = cartItems.filter(
        ({ products, user: { email } }) =>
          products.id === productId && email === user.email,
      );

      if (!cart.length) {
        return await this.cartRepository.save({
          total: product.price * quantity,
          quantity,
          user,
          products: product,
        });
      } else {
        return await this.cartRepository.update(cart[0].id, {
          quantity: (cart[0].quantity += 1),
          total: cart[0].total * quantity,
        });
      }
    }
    throw new NotFoundById();
  }

  public async getItemInCard(userEmail: string): Promise<Cart[]> {
    const cart = await this.cartRepository.find({
      relations: ['products', 'user'],
    });
    return cart.filter(({ user }) => user.email === userEmail);
  }
}
