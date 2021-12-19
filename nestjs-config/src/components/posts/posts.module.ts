import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { PostsResolver } from './posts.resolver';

@Module({
  imports: [],
  providers: [PostsResolver],
})
export class PostsModule {}
