import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { UserPosts } from './types/user-posts';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}
  get(id: string): Promise<User> {
    return this.repository.get(id);
  }

  getUserPosts(id: string): Promise<UserPosts> {
    return this.repository.getUserPosts(id);
  }
}
