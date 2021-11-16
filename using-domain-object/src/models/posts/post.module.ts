import { Module } from '@nestjs/common';
import { PostRepository } from './repositories/post.repository';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [PostController],
  providers: [PrismaService, PostRepository, PostService],
  exports: [PostService],
})
export class PostModule {}
