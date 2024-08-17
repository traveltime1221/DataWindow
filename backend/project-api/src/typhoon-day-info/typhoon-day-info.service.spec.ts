import { Test, TestingModule } from '@nestjs/testing';
import { TyphoonDayInfoService } from './typhoon-day-info.service';

describe('TyphoonDayInfoService', () => {
  let service: TyphoonDayInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TyphoonDayInfoService],
    }).compile();

    service = module.get<TyphoonDayInfoService>(TyphoonDayInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
