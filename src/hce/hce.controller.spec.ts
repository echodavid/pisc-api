import { Test, TestingModule } from '@nestjs/testing';
import { HceController } from './hce.controller';
import { HceService } from './hce.service';

describe('HceController', () => {
  let controller: HceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HceController],
      providers: [HceService],
    }).compile();

    controller = module.get<HceController>(HceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
