import { Test, TestingModule } from '@nestjs/testing';
import { HceService } from './hce.service';

describe('HceService', () => {
  let service: HceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HceService],
    }).compile();

    service = module.get<HceService>(HceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
