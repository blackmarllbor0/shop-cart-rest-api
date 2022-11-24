import { Cart } from 'src/cart/cart.entity';
import { Order } from 'src/order/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fio: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column()
  role: string;

  @OneToMany(() => Cart, (cart) => cart.id)
  @JoinColumn()
  cart: Cart[];

  @OneToOne(() => Order, (order) => order.id)
  @JoinColumn()
  order: Order;
}
