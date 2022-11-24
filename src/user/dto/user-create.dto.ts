import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsString()
  @MinLength(6)
  fio: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
