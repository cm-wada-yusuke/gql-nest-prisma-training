import { Module } from '@nestjs/common';
import { GreetingService } from './greeting.service';
import { GreetingResolver } from './greeting.resolver';

@Module({
  providers: [GreetingResolver, GreetingService],
})
export class GreetingModule {}
