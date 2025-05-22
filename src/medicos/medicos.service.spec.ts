import { Test, TestingModule } from '@nestjs/testing';
import { MedicosService } from './medicos.service';

describe('MedicosService', () => {
  let service: MedicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicosService],
    }).compile();

    service = module.get<MedicosService>(MedicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
