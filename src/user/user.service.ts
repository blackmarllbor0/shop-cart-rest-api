import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundById } from 'src/exeption/not-found-id.filter';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(dto: UserCreateDto): Promise<User> {
    return await this.userRepository.save(dto);
  }

  public async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) return user;
    throw new NotFoundById();
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) return user;
    throw new NotFoundException('Could not find a user with this email');
  }
}
