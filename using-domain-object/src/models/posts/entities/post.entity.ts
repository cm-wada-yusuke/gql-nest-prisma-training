import { Post as PostModel } from '@prisma/client';
import { FindPostDto } from '../dto/find-post.dto';

export class PostID {
  id: number;

  static fromFindDto(dto: FindPostDto): PostID {
    const vo = new PostID();
    vo.id = Number(dto.id);
    return vo;
  }
}

// Post 本体
export class PostEntity {
  id: number;
  title: string;
  content?: string;
  published?: boolean;
  authorId?: number;

  // Prismaモデル => Entity ここでいいのか？
  static fromModel(model: PostModel): PostEntity {
    const entity = new PostEntity();
    entity.id = model.id;
    entity.title = model.title;
    entity.content = model.content;
    entity.published = model.published;
    entity.authorId = model.authorId;
    return entity;
  }
}
