import { InternalServerErrorException } from '@nestjs/common';

export class ServerExeption extends InternalServerErrorException {
  constructor() {
    super('Something went wrong');
  }
}
