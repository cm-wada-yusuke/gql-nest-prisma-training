import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Post, Prisma } from '@prisma/client';
import { PostEntity, PostID } from '../entities/post.entity';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  // 特定するためのドメインオブジェクト => エンティティ
  async findOne(id: PostID): Promise<PostEntity | null> {
    // あえて冗長に。 PostWhereUniqueInputへ変換
    const postWhereUniqueInput: Prisma.PostWhereUniqueInput = { id: id.id };
    const model: Post = await this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    });
    return model ? PostEntity.fromModel(model) : null;
  }
}
