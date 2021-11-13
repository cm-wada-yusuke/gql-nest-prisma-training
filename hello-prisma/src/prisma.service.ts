import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  /**
   * https://docs.nestjs.com/recipes/prisma#prisma
   * onModuleInitはオプションです。
   * 省略した場合、Prismaはデータベースへの最初の呼び出しで遅延接続します。
   * Prismaには接続を破棄する独自のシャットダウンフックがあるので、
   * onModuleDestroyは使いません。
   */
  async onModuleInit(): Promise<any> {
    await this.$connect();
  }

  async enableShutDownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
