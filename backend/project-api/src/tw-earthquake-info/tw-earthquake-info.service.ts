import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util'

const execPromise = promisify(exec)

@Injectable()
export class TwEarthquakeInfoService {
    async getSpiderData (): Promise<string> {
        try {
            console.log('== 爬取台灣地震資訊中 ==')
            /*
              撈取回來後存在server
              比對檔案時間點 1小時候 撈取一次
              與當下時間對比
            */
            const { stdout } = await execPromise(`python project-python-analyze/spider_earthquake_info_tw.py`)
            const data = JSON.parse(stdout)
            console.log('== 爬取 台灣地震資訊 完畢==')
            return data
        } catch (error) {
            console.error('撈取 台灣地震資訊 異常')
            throw error;
        }
    }
}
