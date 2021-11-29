import { Controller, Get, Param } from '@nestjs/common';
import { UserPostsSerializer } from './serializers/user-posts.serializer';
import { UserService } from './user.service';

@Controller('users/:id')
export class UserContentController {
  constructor(private service: UserService) {}

  @Get('posts')
  async getUserPosts(@Param('id') id: string): Promise<UserPostsSerializer> {
    const model = await this.service.getUserPosts(id);
    return UserPostsSerializer.fromModel(model);
  }
}
