import { Module } from '@nestjs/common';
import { ImpressionService } from './impression.service';
import { ImpressionResolver } from './impressions.resolver';

@Module({
  imports: [],
  providers: [ImpressionResolver, ImpressionService],
  exports: [ImpressionService],
})
export class ImpressionModule {}
