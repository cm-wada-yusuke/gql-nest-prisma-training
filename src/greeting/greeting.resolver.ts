import { Query, Resolver } from '@nestjs/graphql';
import { Greeting } from './greeting.model';
import { GreetingService } from './greeting.service';

@Resolver((of) => Greeting)
export class GreetingResolver {
  constructor(private readonly appService: GreetingService) {}

  @Query((returns) => Greeting)
  getHello(): Greeting {
    return this.appService.getHello();
  }
}
