from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

from dotenv import load_dotenv
from datetime import datetime
from utils.crawler_setup import init_crawler
from utils.response_format import response

import os
import json

driver, logger = init_crawler(log_filename='project-python-analyze/logs/spider_earthquake_info_tw.log')

try:
    urls=['https://scweb.cwa.gov.tw/zh-tw/earthquake/data/']

    data = []

    def earthquake_parse_page (url):
        # 開啟網頁
        driver.get(url)

        # 等待頁面加載
        driver.implicitly_wait(3)
        
        # 等待表格載入完畢
        WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.ID, 'table'))
        )

        table = driver.find_element(By.CLASS_NAME, 'dataTables_scrollBody')
        tbody = table.find_element(By.TAG_NAME, 'tbody')
        rows = tbody.find_elements(By.TAG_NAME, 'tr')

        for row in rows[0:3]:
            tr_id = row.get_attribute('id').split('tr_')[1]
            cols = row.find_elements(By.TAG_NAME, 'td')

            # 點選該頁面取得資料
            row.click()

            # 等待該頁面載入並切換窗口
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CLASS_NAME, 'eqResultBoxRight'))
            )
            
            # 於此頁面取得相關資料
            ul = driver.find_element(By.CLASS_NAME, 'eqResultBoxRight')
            li_group = ul.find_elements(By.TAG_NAME, 'li')
            time = li_group[1].find_element(By.CLASS_NAME, 'text').text.strip()
            position = li_group[2].find_element(By.CLASS_NAME, 'text').text
            longitude = position.split('北緯')[1].split('°')[0].strip()
            latitude = position.split('東經')[1].split('°')[0].strip()
            link_element = li_group[6].find_element(By.TAG_NAME, 'a')

            # 返回原頁面
            driver.back()
            
            now = datetime.now().strftime('%Y%m')
            obj = {
                "id": tr_id,
                "地震時間": time,
                "經度":  longitude,
                "緯度":  latitude,
                "深度(公里)": cols[4].text.strip(),
                "規模": cols[3].text.strip(),
                "地震位置": cols[5].text.strip(),
                "圖片":f'https://scweb.cwa.gov.tw/webdata/OLDEQ/{now}/{tr_id}.gif',
            }

            data.append(obj)
        return data

    try:
        earthquake_parse_page(urls[0])
        response = response('1', data)
    except Exception as e:
        response = response('0', '撈取異常')
    
    print(json.dumps(response, ensure_ascii=False, indent=4))

except Exception as e:
    logger.error(f'引用失敗')
finally:
    driver.quit()
