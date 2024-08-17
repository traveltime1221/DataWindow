import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { StocksModule } from './stocks/stocks.module';
import { TyphoonDayInfoModule } from './typhoon-day-info/typhoon-day-info.module';
// 模塊用於組織代碼並將相關的控制器、服務和提供者組合在一起

@Module({
  imports: [StocksModule, TyphoonDayInfoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
