import { Test, TestingModule } from '@nestjs/testing';
import { GreetingResolver } from './modules/greeting/greeting.resolver';
import { GreetingService } from './modules/greeting/greeting.service';

describe('AppController', () => {
  let appController: GreetingResolver;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GreetingResolver],
      providers: [GreetingService],
    }).compile();

    appController = app.get<GreetingResolver>(GreetingResolver);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
