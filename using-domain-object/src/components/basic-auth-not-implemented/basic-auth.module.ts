import { Module } from '@nestjs/common';
import { BasicAuthGuard } from './basic-auth.guard';

@Module({
  providers: [BasicAuthGuard],
  exports: [BasicAuthGuard],
})
export class BasicAuthModule {}
