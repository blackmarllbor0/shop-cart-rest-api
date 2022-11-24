import { NotFoundException } from '@nestjs/common';

export class NotFoundById extends NotFoundException {
  constructor() {
    super('Nothing was found for this id');
  }
}
