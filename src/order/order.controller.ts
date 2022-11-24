import {
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
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Post('add')
  public async order(@Req() { user: { email } }: IUserRequest): Promise<Order> {
    return await this.orderService.order(email);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Get('get')
  public async getOrders(
    @Req() { user: { email } }: IUserRequest,
  ): Promise<Order[]> {
    return await this.orderService.getOrders(email);
  }
}
