import { Test, TestingModule } from '@nestjs/testing';
import { CrossoverModule } from '@pb-app.module';
import { PostsModule } from './posts.module';
import { PostsResolver } from './posts.resolver';

describe('PostsResolver', () => {
  let resolver: PostsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // https://stackoverflow.com/questions/57771616/how-to-use-jest-to-mock-winston-logger-instance-encapsulated-in-service-class
      imports: [PostsModule, CrossoverModule],
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
