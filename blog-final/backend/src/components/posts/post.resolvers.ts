import { PrismaService } from './../prisma/prisma.service';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostModel } from '@pb-components/posts/interfaces/post.model';
import { GetPostsArgs } from './interfaces/get-posts-connection.args';
import { GoogleStorageRepository } from '@pb-components/bucket-assets/repositories/google-storage.repository';
import matter from 'gray-matter';
import { FindPostArgs } from './interfaces/find-post-args';
import { ImpressionService } from '@pb-components/impressions/impression.service';
import { ImpressionModel } from '@pb-components/impressions/interfaces/impression.model';

@Resolver((of) => PostModel)
export class PostsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly gcsRepository: GoogleStorageRepository,
    private impressionService: ImpressionService,
  ) {}

  @Query(() => [PostModel], { name: 'fixedPosts', nullable: true })
  async getPostsByFixedData() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }

  @Query(() => [PostModel], { name: 'prismaPosts', nullable: true })
  async getPostsByPrisma() {
    return this.prisma.post.findMany();
  }

  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts(@Args() args: GetPostsArgs) {
    return this.prisma.post.findMany({
      where: {
        type: args.type
          ? {
              in: args.type,
            }
          : undefined,
        published: true, // ついでに指定。公開ブログへ渡すデータなのでtrue固定にしちゃう
      },
      orderBy: {
        publishDate: 'desc',
      },
    });
  }

  @Query(() => PostModel, { name: 'findPost', nullable: false })
  async findPost(@Args() args: FindPostArgs) {
    return await this.prisma.post.findUnique({
      rejectOnNotFound: true,
      where: {
        id: args.id,
        contentPath: args.contentPath,
      },
    });
  }

  @ResolveField(() => String, { name: 'bodyMarkdown', nullable: false })
  async bodyMarkdown(@Parent() post: PostModel) {
    const { contentPath } = post;
    const markdown = await this.gcsRepository.download(contentPath);
    const { content } = matter(markdown);
    return content;
  }

  @ResolveField(() => [ImpressionModel], { name: 'impressions', nullable: false })
  async impressions(@Parent() post: PostModel) {
    const { id } = post;
    return this.impressionService.search({ postId: id });
  }
}
