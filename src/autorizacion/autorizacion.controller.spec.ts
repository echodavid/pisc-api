import { Test, TestingModule } from '@nestjs/testing';
import { AutorizacionController } from './autorizacion.controller';
import { AutorizacionService } from './autorizacion.service';

describe('AutorizacionController', () => {
  let controller: AutorizacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutorizacionController],
      providers: [AutorizacionService],
    }).compile();

    controller = module.get<AutorizacionController>(AutorizacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
