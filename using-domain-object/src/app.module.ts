import { UserModule } from './components/users/user.module';
import { Module } from '@nestjs/common';
import { PostModule } from './components/posts/post.module';

@Module({
  imports: [UserModule, PostModule],
  // controllers: [AppController],
  // providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
