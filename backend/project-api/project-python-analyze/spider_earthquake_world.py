from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

from dotenv import load_dotenv

from utils.crawler_setup import init_crawler
from utils.response_format import response

import os
import json

driver, logger = init_crawler(log_filename='project-python-analyze/logs/spider_earthquake_world.log')

try:
    urls=['https://scweb.cwa.gov.tw/zh-tw/earthquake/world/']

    data = []

    def earthquake_parse_page (url):
        # 開啟網頁
        driver.get(url)

        # 等待頁面加載
        driver.implicitly_wait(3)
        
        # 等待表格載入完畢
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'table'))
        )

        table = driver.find_element(By.ID, 'table')
        rows = table.find_elements(By.TAG_NAME, 'tr')

        for row in rows[1:]:
            cols = row.find_elements(By.TAG_NAME, 'td')
            # print("經度:", cols[1].get_attribute('outerHTML'))
            obj = {
                "地震時間": cols[0].text.strip(),
                "經度":  cols[1].get_attribute('innerText').strip(),
                "緯度":  cols[2].get_attribute('innerText').strip(),
                "深度(公里)": cols[3].text.strip(),
                "規模": cols[4].text.strip(),
                "地震位置": cols[5].text.strip()
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
