import { Test, TestingModule } from '@nestjs/testing';
import { EarthquakeWorldInfoController } from './earthquake-world-info.controller';

describe('EarthquakeWorldInfoController', () => {
  let controller: EarthquakeWorldInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EarthquakeWorldInfoController],
    }).compile();

    controller = module.get<EarthquakeWorldInfoController>(EarthquakeWorldInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
