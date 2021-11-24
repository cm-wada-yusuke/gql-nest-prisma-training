import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Post, Prisma } from '@prisma/client';
import { PostEntity, PostID } from './entities/post.entity';
import { PostRepository } from './repositories/post.repository';
import { FindPostDto } from './dto/find-post.dto';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly prisma: PrismaService,
  ) {}

  // Dtoにする場合。DTOがいいとおもう。ドメインオブジェクトレベルまで求めるのは少し酷？
  async findPost(dto: FindPostDto): Promise<PostEntity> {
    // validated DTO => domain object
    const postID = PostID.fromFindDto(dto);
    return this.postRepository.findOne(postID);
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
