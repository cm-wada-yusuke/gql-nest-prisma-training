import { PublishedPostSerializer } from 'src/components/posts/serializers/published-post.serializer';
import { UserPosts } from '../types/user-posts';
import { UserSerializer } from './user.serializer';

/**
 * extends がいいのか、改めてひとつずつ書いていくのがいいのか？
 * 安全なのはひとつずつ書いていく方式だとは思うが...
 */
export class UserPostsSerializer extends UserSerializer {
  private constructor(
    readonly posts: PublishedPostSerializer[],
    readonly id: number,
    readonly name: string,
    readonly email?: string,
  ) {
    super(id, name, email);
    this.posts = posts;
  }

  static fromModel(model: UserPosts): UserPostsSerializer {
    return new this(model.posts, model.id, model.name, model.email);
  }
}
