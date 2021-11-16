import { Module } from '@nestjs/common';
import { PostModule } from './models/posts/post.module';

@Module({
  imports: [PostModule],
  // controllers: [AppController],
  // providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
