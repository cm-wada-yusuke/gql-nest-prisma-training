import { Module } from '@nestjs/common';
import { BucketAssetsModule } from '@pb-components/bucket-assets/bucket-assets.module';
import { PostsResolver } from './post.resolvers';

@Module({
  imports: [BucketAssetsModule],
  providers: [PostsResolver],
})
export class PostsModule {}
