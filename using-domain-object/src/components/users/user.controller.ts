import { Controller, Get, Param } from '@nestjs/common';
import { UserSerializer } from './serializers/user.serializer';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private service: UserService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserSerializer> {
    const user = await this.service.get(id);
    return UserSerializer.fromModel(user);
  }
}
