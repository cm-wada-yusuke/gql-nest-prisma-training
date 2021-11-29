import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Prisma } from '@prisma/client';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // バリデーションPipeを追加
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Primsaがアプリケーションのシャットダウン前に `process.exit()` に反応してシャットダウンされてしまう仕様なので
  // アプリケーションのシャットダウンフックに反応するよう設定を追加する
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutDownHooks(app);
  prismaService.$on<any>('query', (event: Prisma.QueryEvent) => {
    console.log('Query: ' + event.query);
    console.log('Duration: ' + event.duration + 'ms');
  });

  await app.listen(3001);
}

bootstrap();
