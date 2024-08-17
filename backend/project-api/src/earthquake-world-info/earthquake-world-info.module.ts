import { Module } from '@nestjs/common';
import { EarthquakeWorldInfoService } from './earthquake-world-info.service';
import { EarthquakeWorldInfoController } from './earthquake-world-info.controller';

@Module({
  providers: [EarthquakeWorldInfoService],
  controllers: [EarthquakeWorldInfoController]
})
export class EarthquakeWorldInfoModule {}
