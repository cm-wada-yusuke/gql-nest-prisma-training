import { PostEntity } from '../entities/post.entity';

export class PublishedPostSerializer {
  id: number;
  title: string;
  content?: string;
  published?: boolean;
  authorId?: number;

  static fromEntity(entity: PostEntity): PublishedPostSerializer {
    const serializer = new PublishedPostSerializer();
    serializer.id = entity.id;
    serializer.title = entity.title;
    serializer.published = entity.published;
    serializer.content = entity.content;
    serializer.authorId = entity.authorId;
    return serializer;
  }
}
