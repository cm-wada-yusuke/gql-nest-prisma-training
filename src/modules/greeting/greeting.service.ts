import { Injectable } from '@nestjs/common';
import { Greeting } from './greeting.model';

@Injectable()
export class GreetingService {
  getHello(): Greeting {
    return { hello: 'Hello World!' };
  }
}
