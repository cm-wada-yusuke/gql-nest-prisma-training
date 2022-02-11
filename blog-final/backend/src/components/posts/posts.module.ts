import { ConnectionModule } from './../connection/connection.module';
import { Module } from '@nestjs/common';
import { BucketAssetsModule } from '@pb-components/bucket-assets/bucket-assets.module';
import { ImpressionModule } from '@pb-components/impressions/impression.module';
import { PostsResolver } from './post.resolvers';
import { PostsConnectionResolver } from './posts.connection.resolver';

@Module({
  imports: [BucketAssetsModule, ImpressionModule, ConnectionModule],
  providers: [PostsResolver, PostsConnectionResolver],
})
export class PostsModule {}
