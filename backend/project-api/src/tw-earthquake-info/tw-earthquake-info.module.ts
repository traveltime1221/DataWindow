import { Module } from '@nestjs/common';
import { TwEarthquakeInfoService } from './tw-earthquake-info.service';
import { TwEarthquakeInfoController } from './tw-earthquake-info.controller';

@Module({
  providers: [TwEarthquakeInfoService],
  controllers: [TwEarthquakeInfoController]
})
export class TwEarthquakeInfoModule {}
