import { Test, TestingModule } from '@nestjs/testing';
import { PresentService } from './present.service';

describe('PresentService', () => {
  let service: PresentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresentService],
    }).compile();

    service = module.get<PresentService>(PresentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
