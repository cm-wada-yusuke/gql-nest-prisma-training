import { Metadata } from '@google-cloud/logging-winston/build/src/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GoogleStorageRepository } from '@pb-components/bucket-assets/repositories/google-storage.repository';
import { ImpressionService } from '@pb-components/impressions/impression.service';
import { ImpressionModel } from '@pb-components/impressions/interfaces/impression.model';
import { PostModel } from '@pb-components/posts/interfaces/post.model';
import { Post, Prisma } from '@prisma/client';
import { zonedTimeToUtc } from 'date-fns-tz';
import matter from 'gray-matter';
import { PrismaService } from './../prisma/prisma.service';
import { FindPostArgs } from './interfaces/find-post-args';
import { GetPostsArgs } from './interfaces/get-posts-connection.args';

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

  @ResolveField(() => [ImpressionModel], {
    name: 'impressions',
    nullable: false,
  })
  async impressions(@Parent() post: PostModel) {
    const { id } = post;
    return this.impressionService.search({ postId: id });
  }

  @Mutation(() => String)
  async upsertPostsFromStorage(
    @Args({ name: 'force', nullable: true, type: () => Boolean })
    force?: boolean,
  ): Promise<string> {
    let pathsNumber = 0;
    let updateNumber = 0;
    for await (const gcsFilePaths of this.gcsRepository.getAllMarkdownPaths()) {
      pathsNumber += gcsFilePaths.length;
      for (const gcsFilePath of gcsFilePaths) {
        updateNumber += await this.upsertPost(gcsFilePath, force);
      }
    }
    return `${pathsNumber} GCS Paths, ${updateNumber} updated.`;
  }

  private async upsertPost(
    gcsFilePath: string,
    force?: boolean,
  ): Promise<number> {
    // gcsで管理されているファイルのメタデータを取得
    const metadata = await this.gcsRepository.getFileMetadata(gcsFilePath);

    // パスとmd5 hash が一致する場合は何もしない
    // そうでない場合はupsert
    // ほんとうはConditional Updateした
    // https://github.com/prisma/prisma/issues/5108
    const persisted = await this.prisma.post.findUnique({
      where: {
        contentPath: gcsFilePath,
      },
      rejectOnNotFound: false,
    });

    // 続行是非の判定
    const proceed = (persisted: Post, metadata: Metadata): boolean => {
      if (force === true) {
        // 強制実行の場合は続行
        return true;
      }
      if (!persisted) {
        // まだ作られていなければ続行
        return true;
      }
      return persisted.md5Hash !== metadata.md5Hash; // md5Hash が異なる場合は続行
    };

    console.log('proceed', proceed(persisted, metadata));

    if (!proceed(persisted, metadata)) {
      return 0;
    }
    // upsertする場合
    const file = await this.gcsRepository.download(gcsFilePath);

    // Markdown コンテンツから matter を抽出
    const input = this.matterData(file, gcsFilePath, metadata.md5Hash);

    await this.prisma.post.upsert({
      where: {
        contentPath: gcsFilePath,
      },
      create: input,
      update: input,
    });
    return 1;
  }

  private matterData(
    markdown: string,
    contentPath: string,
    md5Hash: string,
  ): Prisma.PostCreateInput {
    const { data } = matter(markdown);

    return {
      title: data.title,
      emoji: data.emoji,
      type: data.type,
      contentPath,
      md5Hash,
      thumbNailUrl: data?.thumbNailUrl,
      excerpt: data?.excerpt,
      published: data?.published,
      publishDate: data?.publishDate
        ? zonedTimeToUtc(data.publishDate, 'Asia/Tokyo')
        : undefined,
    };
  }
}
