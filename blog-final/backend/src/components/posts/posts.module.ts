import { Module } from '@nestjs/common';
import { BucketAssetsModule } from '@pb-components/bucket-assets/bucket-assets.module';
import { ImpressionModule } from '@pb-components/impressions/impression.module';
import { PostsResolver } from './post.resolvers';

@Module({
  imports: [BucketAssetsModule, ImpressionModule],
  providers: [PostsResolver],
})
export class PostsModule {}
