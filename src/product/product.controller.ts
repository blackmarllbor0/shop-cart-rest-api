import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { FindOneById } from 'src/utils/find-by-id.param';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { IUserRequest } from 'src/auth/interfaces/user-req.interface';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteResult } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.OK)
  @Get('getAll')
  public async getAll(): Promise<Product[]> {
    return await this.productService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('getById/:id')
  public async getById(@Param() { id }: FindOneById): Promise<Product> {
    return await this.productService.getById(id);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  public async create(
    @Body() dto: CreateProductDto,
    @Req() { user }: IUserRequest,
  ): Promise<Product> {
    return await this.productService.create(dto, user);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Put('updateById/:id')
  public async update(
    @Param() { id }: FindOneById,
    @Body() dto: UpdateProductDto,
    @Req() { user }: IUserRequest,
  ): Promise<Product> {
    return await this.productService.update(id, dto, user);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('deleteById/:id')
  public async delete(
    @Param() { id }: FindOneById,
    @Req() { user }: IUserRequest,
  ): Promise<DeleteResult> {
    return await this.productService.delete(id, user);
  }
}
