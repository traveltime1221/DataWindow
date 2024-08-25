import { Controller, Get } from '@nestjs/common';
import { TwEarthquakeInfoService } from './tw-earthquake-info.service';

@Controller('tw-earthquake-info')
export class TwEarthquakeInfoController {
    constructor(private readonly TwEarthquakeInfoService: TwEarthquakeInfoService) {}

    @Get('data')
    async getTwEarthquakeInfo () {
        return await this.TwEarthquakeInfoService.getSpiderData()
    }
}
