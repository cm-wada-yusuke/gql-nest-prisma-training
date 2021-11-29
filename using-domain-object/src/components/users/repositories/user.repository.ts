import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserPosts } from '../types/user-posts';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async get(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async getUserPosts(id: string): Promise<UserPosts> {
    return this.prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        posts: true,
      },
    });
  }
}
