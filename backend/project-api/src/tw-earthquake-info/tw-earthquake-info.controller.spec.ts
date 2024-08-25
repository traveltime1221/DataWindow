import { Test, TestingModule } from '@nestjs/testing';
import { TwEarthquakeInfoController } from './tw-earthquake-info.controller';

describe('TwEarthquakeInfoController', () => {
  let controller: TwEarthquakeInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwEarthquakeInfoController],
    }).compile();

    controller = module.get<TwEarthquakeInfoController>(TwEarthquakeInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
