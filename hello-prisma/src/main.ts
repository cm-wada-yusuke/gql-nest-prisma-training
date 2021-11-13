import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Primsaがアプリケーションのシャットダウン前に `process.exit()` に反応してシャットダウンされてしまう仕様なので
  // アプリケーションのシャットダウンフックに反応するよう設定を追加する
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutDownHooks(app);

  await app.listen(3000);
}

bootstrap();
