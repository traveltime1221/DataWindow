import { Test, TestingModule } from '@nestjs/testing';
import { EarthquakeWorldInfoService } from './earthquake-world-info.service';

describe('EarthquakeWorldInfoService', () => {
  let service: EarthquakeWorldInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EarthquakeWorldInfoService],
    }).compile();

    service = module.get<EarthquakeWorldInfoService>(EarthquakeWorldInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
