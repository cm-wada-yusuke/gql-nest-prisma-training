import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AsyncMultipartFilesInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const req = context.switchToHttp().getRequest() as FastifyRequest;
    const isMultipart = req.isMultipart();
    if (!isMultipart) {
      throw new BadRequestException('multipart/form-data expected.');
    }
    // 消費しなければならないのでここで配列に入れるようにはかけない？
    // for await (const part of req.parts()) {
    // console.log('async file', part);
    // req.incomingFiles.push(part);
    // }

    req.incomingFiles = req.files();
    return next.handle();
  }
}
