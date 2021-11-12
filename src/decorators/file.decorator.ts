import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AsyncMultipartFiles } from '@typings/file';

export const AsyncFiles = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AsyncMultipartFiles => {
    const req = ctx.switchToHttp().getRequest() as FastifyRequest;
    return req.incomingFiles;
  },
);
