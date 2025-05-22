import { Test, TestingModule } from '@nestjs/testing';
import { MedicosController } from './medicos.controller';
import { MedicosService } from './medicos.service';

describe('MedicosController', () => {
  let controller: MedicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicosController],
      providers: [MedicosService],
    }).compile();

    controller = module.get<MedicosController>(MedicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
