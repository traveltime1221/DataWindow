from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# 網頁等待相關
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException

from utils.logger_format import setup_logger 

import warnings

def init_crawler(log_filename='logs/spider.log'):

    # 設置瀏覽器模式
    chrome_options = Options()
    chrome_options.add_argument('--headless') # 無頭模式
    # chrome_options.add_argument('--no-sandbox')  # 需要在某些環境中使用
    # chrome_options.add_argument('--disable-dev-shm-usage')  # 需要在某些環境中使用

    # 指定 ChromeDriver 路徑
    service = Service('/opt/homebrew/bin/chromedriver')  # 根據實際安裝位置調整

    # 設置日誌
    logger = setup_logger(log_filename=log_filename)

    # 啟動 Chrome 瀏覽器
    driver = webdriver.Chrome(service=service, options=chrome_options)

    return driver, logger

def wait_for_element(driver, by, value, timeout=10):
    ''' 等待單個元素出現並返回該元素 '''
    try:
        el = WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )
        return el
    except TimeoutException:
        return None

def wait_for_elements(driver, by, value, timeout=10):
    ''' 等待多個元素出現並返回這些元素 '''
    try:
        els = WebDriverWait(driver, timeout).until(
            EC.presence_of_all_elements_located((by, value))
        )
        return els
    except TimeoutException:
        return []
