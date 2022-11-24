import { IsNumberString } from 'class-validator';

export class FindOneById {
  @IsNumberString()
  id: number;
}
