import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util'

const execPromise = promisify(exec)

@Injectable()
export class EarthquakeWorldInfoService {

    async getSpiderData(): Promise<string> {
        try {
            console.log('== 爬取全世界地震資訊中 ==')
            const { stdout } = await execPromise(`python project-python-analyze/spider_earthquake_world.py`)
            const data = JSON.parse(stdout)
            return data
        } catch (error) {
            console.error('爬蟲異常', error);
            throw error;
        }
    }

}
