import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [PrismaService],
  controllers: [PostController],
  providers: [PrismaService, PostRepository, PostService],
  exports: [PostService],
})
export class PostModule {}
