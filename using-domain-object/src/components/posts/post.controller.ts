import { Controller, Get, Param } from '@nestjs/common';
import { Roles } from '../basic-auth-not-implemented/roles.decorator';
import { FindPostDto } from './dto/find-post.dto';
import { PostService } from './post.service';
import { PublishedPostSerializer } from './serializers/published-post.serializer';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id/user')
  @Roles('user')
  // @UseGuards(BasicAuthGuard)
  // @UseGuards(RolesGuard)
  async getPostUser(
    @Param() findPostDto: FindPostDto,
  ): Promise<PublishedPostSerializer> {
    const entity = await this.postService.findPost(findPostDto);
    return PublishedPostSerializer.fromEntity(entity);
  }

  @Get(':id/admin')
  async getPostAdmin(
    @Param() findPostDto: FindPostDto,
  ): Promise<PublishedPostSerializer> {
    const entity = await this.postService.findPost(findPostDto);
    return PublishedPostSerializer.fromEntity(entity);
  }
}
