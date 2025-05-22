import { Test, TestingModule } from '@nestjs/testing';
import { CondicionesService } from './condiciones.service';

describe('CondicionesService', () => {
  let service: CondicionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CondicionesService],
    }).compile();

    service = module.get<CondicionesService>(CondicionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
