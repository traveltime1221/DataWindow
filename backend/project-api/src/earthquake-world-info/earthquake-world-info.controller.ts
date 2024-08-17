import { Controller, Get } from '@nestjs/common';
import { EarthquakeWorldInfoService } from './earthquake-world-info.service';

@Controller('earthquake-world-info')
export class EarthquakeWorldInfoController {
    constructor(private readonly earthquakeService: EarthquakeWorldInfoService) {}

    @Get('data')
    async getEarthquakeWorldInfoData () {
        return await this.earthquakeService.getSpiderData()
    }
}
