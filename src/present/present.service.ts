import { Injectable } from '@nestjs/common';
import { Present } from './present';

@Injectable()
export class PresentService {
  private readonly presents: Present[] = [];

  findAll(): Present[] {
    this.presents.push({
      name: 'happy_birthday_pack',
      prize: 1,
    });
    this.presents.push({
      name: 'good',
      prize: 2,
    });
    return this.presents;
  }
}
