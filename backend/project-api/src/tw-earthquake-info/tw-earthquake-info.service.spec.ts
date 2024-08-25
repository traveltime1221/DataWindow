import { Test, TestingModule } from '@nestjs/testing';
import { TwEarthquakeInfoService } from './tw-earthquake-info.service';

describe('TwEarthquakeInfoService', () => {
  let service: TwEarthquakeInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwEarthquakeInfoService],
    }).compile();

    service = module.get<TwEarthquakeInfoService>(TwEarthquakeInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
