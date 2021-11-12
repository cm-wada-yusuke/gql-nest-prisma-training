import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class UploadGuard implements CanActivate {
  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest;
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
    return true;
  }
}
