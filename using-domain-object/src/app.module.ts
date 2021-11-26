import { Module } from '@nestjs/common';
import { PostModule } from './components/posts/post.module';

@Module({
  imports: [PostModule],
  // controllers: [AppController],
  // providers: [AppService, PrismaService, UserService],
})
export class AppModule {}
