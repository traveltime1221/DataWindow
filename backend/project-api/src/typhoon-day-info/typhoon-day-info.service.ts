import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios'
import * as cheerio from 'cheerio'
import * as puppeteer from 'puppeteer';

import { exec } from 'child_process';
import { promisify } from 'util'

const execPromise = promisify(exec);

@Injectable()
export class TyphoonDayInfoService {
    //constructor(private configService: ConfigService) {}

    async scrapeData(): Promise<string> {
        try {
            console.log('== 爬取台灣颱風放假資訊 ==')
            const { stdout } = await execPromise(`python project-python-analyze/spider_typhoon_info.py`);
            const data = JSON.parse(stdout)
            return data;
        } catch (error) {
            console.error('爬蟲異常', error);
            throw error;
        }
    }


    /*
    private readonly dgpa_url = 'https://www.dgpa.gov.tw/typh/daily/nds.html'; // 行政院颱風資訊
    private readonly cwa_url='https://www.cwa.gov.tw/V8/C/P/Typhoon/TY_WARN.html' // 交通部中央氣象署-颱風消息

    // 取得網頁資訊
    async fetchTyphoonDayInfo () {
        try {
            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            // 抓取資料
            await page.goto(this.dgpa_url)
            const dgpa_data = await page.content()

            await page.goto(this.cwa_url)
            await page.waitForSelector('.WarnContent', { timeout: 100000 });
            const cwa_data = await page.content()
            
            await browser.close()
            const content = `${dgpa_data}${cwa_data}`

            return this.parseWebpage(content)

        } catch(e) {
            console.log(e)
            throw e
        }
        
    }

    // 解析網頁
    parseWebpage(content: string) {
        const $ = cheerio.load(content)
        
        const data = {
            更新時間: $('.Content_Updata').text().trim().split('\n')[0].replace('更新時間', '').trim(),
            颱風資訊: $('.WarnContent').text().trim(),
            資訊:[]
        }

        $('tbody tr').each((index, el) => {
            if (index == 0) return
            // 需分析是否有停班停克狀態
            const city = $(el).find('td[headers="city_Name"]').text().trim()
            const info = $(el).find('td[headers="StopWorkSchool_Info"]').html()

            // 處理停班停課標轉資訊
            console.log(info)

            if (city && info) {
                data.資訊.push({
                    地區: city,
                    資訊: info
                })
            }
        })
        return data
    }*/
}
