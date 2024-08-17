import { Controller, Get } from '@nestjs/common';
import { TyphoonDayInfoService } from './typhoon-day-info.service';

// api 路徑
@Controller('typhoon-day-info')
export class TyphoonDayInfoController {
    constructor(private readonly typhoonService: TyphoonDayInfoService) {}

    @Get('data')
    async getTyphonnDayInfoData() {
        // 呼叫資訊
        return await this.typhoonService.scrapeData()
    }
}
