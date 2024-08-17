from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# 網頁等待相關
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

from dotenv import load_dotenv
from utils.response_format import response
from utils.logger_format import setup_logger 

import os
import json

logger = setup_logger(log_filename='project-python-analyze/logs/spider_typhoon_info.log')

# 設置瀏覽器模式
chrome_options = Options()
chrome_options.add_argument('--headless') # 無頭模式
# chrome_options.add_argument('--no-sandbox')  # 需要在某些環境中使用
# chrome_options.add_argument('--disable-dev-shm-usage')  # 需要在某些環境中使用

# 指定 ChromeDriver 路徑
service = Service('/opt/homebrew/bin/chromedriver')  # 根據實際安裝位置調整

# 啟動 Chrome 瀏覽器
driver = webdriver.Chrome(service=service, options=chrome_options)

dgpa_url = os.getenv('DGPA_URL')
cwa_url = os.getenv('CWA_URL')

logger.info(dgpa_url)

# 抓取數據
urls = [
    'https://www.dgpa.gov.tw/typh/daily/nds.html',
    'https://www.cwa.gov.tw/V8/C/P/Typhoon/TY_WARN.html'
]

data = {
    "更新時間":"",
    "颱風名稱":"",
    "資訊":[]
}

def dgpa_parse_page (url):

    # 開啟網頁
    driver.get(url)

    # 等待頁面加載
    driver.implicitly_wait(3)

    try:
        #rows = driver.find_elements(By.CSS_SELECTOR, 'tbody.Table_Body tr')
        rows = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'tbody.Table_Body tr'))
        )

        data["更新時間"] = driver.find_element(By.CSS_SELECTOR, '.Content_Updata h4').text.split('更新時間：')[1].split('\n')[0]

        for row in rows:
            try:
                city_name = row.find_element(By.CSS_SELECTOR, 'td[headers="city_Name"] font').text
                stop_work_school_info = [el.text for el in row.find_elements(By.CSS_SELECTOR, 'td[headers="StopWorkSchool_Info"] font')]

                if city_name and stop_work_school_info:
                    data["資訊"].append({
                        "地區": city_name,
                        "資訊": stop_work_school_info
                    })
                    logger.info(data)
            except NoSuchElementException:
                logger.error("無法找到某些元素, 跳過該行")

    except TimeoutException as e:
        logger.error(f"元素超時, 可能網頁未完全加載或選擇器不正確: {e}")

def cwa_parse_page(url):
    driver.get(url)

    try:
        # 等待元素加載並抓取文本內容
        warn_content = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '.WarnContent'))
        )
        
        # 獲取文本並直接賦值給 data['颱風名稱']
        data['颱風名稱'] = warn_content.text

    except TimeoutException as e:
        logger.error(f'超時, 或加載不正確: {e}')

try: 
    dgpa_parse_page(urls[0])
    cwa_parse_page(urls[1])
    response = response('1', data)
except Exception as e:
    response = response('0', '撈取異常')

print(json.dumps(response, ensure_ascii=False, indent=4))

# 關閉連線
driver.quit()
