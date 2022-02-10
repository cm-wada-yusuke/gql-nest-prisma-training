import { Module } from '@nestjs/common';
import { PostsResolver } from './post.resolvers';

@Module({
  providers: [PostsResolver],
})
export class PostsModule {}
