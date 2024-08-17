import { Module } from '@nestjs/common';
import { TyphoonDayInfoService } from './typhoon-day-info.service';
import { TyphoonDayInfoController } from './typhoon-day-info.controller';

@Module({
  providers: [TyphoonDayInfoService],
  controllers: [TyphoonDayInfoController]
})
export class TyphoonDayInfoModule {}
