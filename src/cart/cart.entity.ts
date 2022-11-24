import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  products: Product;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;
}
