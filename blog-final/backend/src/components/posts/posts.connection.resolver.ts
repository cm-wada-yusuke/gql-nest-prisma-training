import { PrismaService } from '@pb-components/prisma/prisma.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ConnectionService } from '@pb-components/connection/connection.service';
import { GetPostsConnectionArgs } from './interfaces/get-posts-connection.args';
import { PostsConnection } from './interfaces/post.model';

@Resolver((of) => PostsConnection)
export class PostsConnectionResolver {
  constructor(
    private prisma: PrismaService,
    private connection: ConnectionService,
  ) {}

  @Query(() => PostsConnection, { name: 'postsConnection', nullable: true })
  async getPostsConnection(@Args() args: GetPostsConnectionArgs) {
    // 進むの場合は先を、戻るの場合は前を取得する。Prisma、これできるのすごいね
    // 先が指定されている場合はそれを優先する
    const firstOrLast: number = (() => {
      if (!args.first && !args.last) {
        throw new Error('firstかlastいずれかが必要です');
      }
      return args.first || -args.last;
    })();
    const posts = await this.prisma.post.findMany({
      where: {
        type: args.type
          ? {
              in: args.type,
            }
          : undefined,
        published: true,
      },
      orderBy: {
        publishDate: 'desc',
      },
      cursor: args.cursor
        ? {
            id: args.cursor,
          }
        : undefined,
      take: firstOrLast,
      skip: args.cursor ? 1 : undefined, // カーソルが指定された場合、自身をスキップする必要あり
    });
    const pageInfo = this.connection.pageInfo(args, posts);
    return {
      pageInfo,
      nodes: posts,
    };
  }
}
