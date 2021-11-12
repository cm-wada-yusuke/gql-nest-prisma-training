import { Module } from '@nestjs/common';
import { PresentController } from './present.controller';
import { PresentService } from './present.service';

@Module({
  controllers: [PresentController],
  providers: [PresentService],
})
export class PresentModule {}
