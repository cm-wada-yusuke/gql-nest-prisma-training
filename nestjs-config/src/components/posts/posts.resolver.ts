import { PbEnv } from '@pb-config/environments/pb-env.service';
import { ConfigService } from '@nestjs/config';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from '@pb-components/prisma/prisma.service';
import { Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Resolver()
export class PostsResolver {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private pbEnv: PbEnv,
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: LoggerService,
  ) {}
  @Query(() => Number)
  hello(): string {
    return this.configService.get<string>('PORT');
  }
  @Query(() => String)
  helloEnv(): string {
    return this.pbEnv.DatabaseUrl;
  }
  @Query(() => String)
  async helloPrisma(): Promise<string> {
    const post = await this.prisma.post.findUnique({
      where: {
        id: '550e8400-e29b-41d4-a716-446655440000',
      },
    });
    this.logger.debug('PostsResolver: 550e8400-e29b-41d4-a716-446655440000');
    return JSON.stringify(post);
  }
}
