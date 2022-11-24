import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from 'src/user/user.entity';
import { UserCreateDto } from 'src/user/dto/user-create.dto';
import { ServerExeption } from 'src/exeption/server-error.filter';
import { PostgresErrorCode } from 'src/database/postgres.error-code';
import { AuthExeption } from 'src/exeption/auth.filter';
import { IPayload } from './interfaces/payload.interfae';
import { JwtService } from '@nestjs/jwt';
import { ILogin } from './interfaces/login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(dto: UserCreateDto): Promise<User> {
    const salt = await genSalt();
    const hashPass = await hash(dto.password, salt);
    try {
      const user = await this.userService.create({
        ...dto,
        password: hashPass,
      });
      return { ...user, password: undefined };
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with what email already exist');
      }
      throw new ServerExeption();
    }
  }

  public login({ email, id, role }: User): ILogin {
    const payload: IPayload = { username: email, sub: id, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async getAuthenticateUser(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await this.userService.getByEmail(email);
      await this.validatePassword(password, user.password);
      return user;
    } catch (error) {
      throw new AuthExeption();
    }
  }

  private async validatePassword(
    textPass: string,
    hashPass: string,
  ): Promise<void> {
    const isPasswordMatched = await compare(textPass, hashPass);
    if (!isPasswordMatched) {
      throw new AuthExeption();
    }
  }
}
