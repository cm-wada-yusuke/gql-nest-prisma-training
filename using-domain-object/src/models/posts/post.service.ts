import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Post, Prisma } from '@prisma/client';
import { PostEntity, PostID } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly prisma: PrismaService,
  ) {}

  // 入力パラメータをどうするか => 再利用を考慮するとDTOよりもドメインオブジェクト（Entity）が良い
  // 入力パラメータをどうpostWhereUniqueInputに変換するか=>Repositoryに任せるでいいと思う
  async findPost(id: PostID): Promise<PostEntity> {
    // validated DTO => domain object
    return this.postRepository.findOne(id);
  }

  async posts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithAggregationInput;
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    });
  }

  async updatePost(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({
      data,
      where,
    });
  }

  async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    });
  }
}
