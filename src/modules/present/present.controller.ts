import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PresentService } from './present.service';
import { Present } from './present';
import { AsyncFiles } from '@decorators/file.decorator';
import { AsyncMultipartFiles } from '@typings/file';
import { AsyncMultipartFilesInterceptor } from '@intercepters/files.intercepter';

@Controller('present')
export class PresentController {
  constructor(private presentService: PresentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll(): Promise<Present[]> {
    return this.presentService.findAll();
  }

  @Post('uploadFile')
  @UseInterceptors(AsyncMultipartFilesInterceptor)
  async uploadFile(@AsyncFiles() files: AsyncMultipartFiles): Promise<void> {
    console.log('files', files);
    return await this.presentService.upload(files);
  }
}
