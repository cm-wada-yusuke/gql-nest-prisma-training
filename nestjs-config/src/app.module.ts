import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PbEnvModule } from '@pb-config/environments/pb-env.module';
import { PbEnv } from '@pb-config/environments/pb-env.service';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './components/posts/posts.module';
import { PostsResolver } from './components/posts/posts.resolver';
import { PrismaModule } from './components/prisma/prisma.module';

@Module({
  imports: [
    // 環境変数モジュール。PrismaやGraphQLは環境（dev,stg,prd）ごとに
    // セットアップ値がかわるはずなので各モジュールの初期化にこれを使う。
    PbEnvModule,
    GraphQLModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    }),
    WinstonModule.forRootAsync({
      inject: [PbEnv],
      useFactory: (env: PbEnv) => env.WinstonModuleOptionsFactory,
    }),
    PrismaModule.forRootAsync({
      imports: [WinstonModule],
      inject: [PbEnv],
      isGlobal: true,
      useFactory: (env: PbEnv) => ({
        prismaOptions: env.PrismaOptionsFactory,
      }),
    }),
  ],
  providers: [PbEnv],
})
export class CrossoverModule {}

@Module({
  imports: [
    // 環境変数モジュール。PrismaやGraphQLは環境（dev,stg,prd）ごとに
    // セットアップ値がかわるはずなので各モジュールの初期化にこれを使う。
    // PbEnvModule,
    // GraphQLModule.forRootAsync({
    //   inject: [PbEnv],
    //   useFactory: (env: PbEnv) => env.GqlModuleOptionsFactory,
    // }),
    // WinstonModule.forRootAsync({
    //   inject: [PbEnv],
    //   useFactory: (env: PbEnv) => env.WinstonModuleOptionsFactory,
    // }),
    // PrismaModule.forRootAsync({
    //   imports: [WinstonModule],
    //   inject: [PbEnv],
    //   isGlobal: true,
    //   useFactory: (env: PbEnv) => ({
    //     prismaOptions: env.PrismaOptionsFactory,
    //   }),
    // }),
    CrossoverModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostsResolver],
})
export class AppModule {}
