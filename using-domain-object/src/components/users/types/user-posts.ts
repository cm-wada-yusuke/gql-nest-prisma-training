import { Post, User } from '@prisma/client';

export type UserPosts = User & {
  posts: Post[];
};
