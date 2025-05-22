import { Test, TestingModule } from '@nestjs/testing';
import { CondicionesController } from './condiciones.controller';
import { CondicionesService } from './condiciones.service';

describe('CondicionesController', () => {
  let controller: CondicionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CondicionesController],
      providers: [CondicionesService],
    }).compile();

    controller = module.get<CondicionesController>(CondicionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
