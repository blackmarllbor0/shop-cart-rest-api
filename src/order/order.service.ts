import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartService } from 'src/cart/cart.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cartService: CartService,
  ) {}

  public async order(userEmail: string): Promise<Order> {
    const usersOrder = await this.orderRepository.find({ relations: ['user'] });
    const userOrder = usersOrder.filter(
      ({ pending, user }) => user?.email === userEmail && pending === false,
    );

    const cartItems = await this.cartService.getItemInCard(userEmail);
    const subTotal = cartItems.length
      ? cartItems.map(({ total }) => total).reduce((prev, next) => prev + next)
      : cartItems[0]?.total;

    const authUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    const cart = cartItems.map(({ products }) => products);

    if (!userOrder.length) {
      return await this.orderRepository.save({
        products: cart,
        user: authUser,
        subTotal,
      });
    } else {
      const existingOrder = userOrder.map((item) => item);
      await this.orderRepository.update(existingOrder[0].id, {
        subTotal: existingOrder[0].subTotal + cart[0].price,
      });
    }
  }

  public async getOrders(userEmail: string): Promise<Order[]> {
    const orders = await this.orderRepository.find({ relations: ['user'] });
    return orders.filter(({ user }) => user?.email === userEmail);
  }
}
