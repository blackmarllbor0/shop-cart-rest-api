import { Cart } from 'src/cart/cart.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: number;

  @OneToMany(() => Cart, (cart) => cart.id)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart[];
}
