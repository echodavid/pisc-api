import { Test, TestingModule } from '@nestjs/testing';
import { AutorizacionService } from './autorizacion.service';

describe('AutorizacionService', () => {
  let service: AutorizacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutorizacionService],
    }).compile();

    service = module.get<AutorizacionService>(AutorizacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
