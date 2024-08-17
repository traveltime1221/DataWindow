import { Test, TestingModule } from '@nestjs/testing';
import { TyphoonDayInfoController } from './typhoon-day-info.controller';

describe('TyphoonDayInfoController', () => {
  let controller: TyphoonDayInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TyphoonDayInfoController],
    }).compile();

    controller = module.get<TyphoonDayInfoController>(TyphoonDayInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
