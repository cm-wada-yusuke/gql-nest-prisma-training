import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { PresentService } from './present.service';
import { Present } from './present';

@Controller('present')
export class PresentController {
  constructor(private presentService: PresentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<Present[]> {
    return this.presentService.findAll();
  }
}
