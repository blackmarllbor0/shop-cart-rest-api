import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Product, (product) => product.id)
  products: Product[];

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column({ default: false })
  pending: boolean;

  @Column({ nullable: true })
  subTotal: number;
}
