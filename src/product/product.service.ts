import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundById } from 'src/exeption/not-found-id.filter';
import { User } from 'src/user/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { AuthExeption } from 'src/exeption/auth.filter';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async getById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (product) return product;
    throw new NotFoundById();
  }

  public async create(dto: CreateProductDto, { role }: User): Promise<Product> {
    if (role === 'admin') {
      return await this.productRepository.save(dto);
    }
    throw new AuthExeption();
  }

  public async update(
    id: number,
    dto: UpdateProductDto,
    { role }: User,
  ): Promise<Product> {
    if (role === 'admin') {
      await this.productRepository.update(id, { ...dto });
      const product = await this.productRepository.findOne({ where: { id } });
      if (product) return product;
      throw new NotFoundById();
    }
    throw new AuthExeption();
  }

  public async delete(id: number, { role }: User): Promise<DeleteResult> {
    if (role === 'admin') {
      const product = await this.productRepository.findOne({ where: { id } });
      if (product) {
        return await this.productRepository.delete(id);
      }
      throw new NotFoundById();
    }
    throw new AuthExeption();
  }
}
