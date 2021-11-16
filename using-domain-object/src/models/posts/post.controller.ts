import { Controller, Get, Param } from '@nestjs/common';
import { FindPostDto } from './dto/find-post.dto';
import { PublishedPostSerializer } from './serializers/published-post.serializer';
import { PostService } from './post.service';
import { PostID } from './entities/post.entity';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async getPost(
    @Param() findPostDto: FindPostDto,
  ): Promise<PublishedPostSerializer> {
    const entity = await this.postService.findPost(
      PostID.fromFindDto(findPostDto),
    );
    return PublishedPostSerializer.fromEntity(entity);
  }
}
