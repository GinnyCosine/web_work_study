from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.support.ui import Select
import pandas as pd
import numpy as np
import json
import csv
import requests
import time

driver = webdriver.Chrome()
url = 'https://www.twse.com.tw/zh/page/trading/exchange/BWIBBU_d.html'
driver.get(url)
select = Select(driver.find_element_by_name("report-table_length"))
select.select_by_value("-1")
page = driver.page_source
soup = BeautifulSoup(page, 'html.parser')
table = soup.tbody
ids = []
names = []
yields = []
PEs = []
PBs = []
for s in table:
    row = s.find_all('td')
    idx = 0
    for td in row:
        if idx == 0:
            ids.append(td.text)
        elif idx == 1:
            names.append(td.text)
        elif idx == 2:
            yields.append(td.text)
        elif idx == 4:
            PEs.append(td.text)
        elif idx == 5:
            PBs.append(td.text)
        idx += 1

driver.close()

# driver.get('https://mops.twse.com.tw/mops/web/t05st09_2')
# select = Select(driver.find_element_by_name("isnew"))
# select.select_by_value("false")
# year1_input = driver.find_element_by_name("date1")
# year1_input.send_keys('104')
# year2_input = driver.find_element_by_name("date2")
# year2_input.send_keys('109')
dividend = {
    '104': [],
    '105': [],
    '106': [],
    '107': [],
    '108': [],
    '109': []
}
date = {
    '104': [],
    '105': [],
    '106': [],
    '107': [],
    '108': [],
    '109': []
}
price = []

# idx_ = 1
# for id in ids:
#     # id_input = driver.find_element_by_id('co_id')
#     # id_input.clear()
#     # id_input.send_keys(id)
#     # btn = driver.find_element_by_css_selector("input[value=' 查詢 ']")
#     # btn.click()
#     # sleep(1)  
#     # table = driver.find_element_by_css_selector("#table01 .hasBorder")
#     driver.get('https://tw.stock.yahoo.com/d/s/dividend_'+str(id)+'.html')
#     table = driver.find_element_by_css_selector("table[cellspacing='1']")
#     idx = 0
#     flag = 0
#     for tr in table.find_elements_by_tag_name('tr'):
#         if idx > 0:
#             ii = 0
#             status = 0
#             year = ''
#             d = ''
#             total = 0
#             for td in tr.find_elements_by_tag_name('td'):
#                 if ii == 0:
#                     year = td.text[:3]
#                     if dividend.get(year) == None:
#                         flag = 1
#                         break
#                     if td.text[-1] == '季':
#                         status = td.text[-2]
#                 elif ii == 1:
#                     d = td.text
#                 elif ii == 2:
#                     total += float(td.text)
#                 elif ii == 3:
#                     total += float(td.text)
#                 elif ii == 4:
#                     total += float(td.text)
#                 elif ii == 5:
#                     total += float(td.text)
#                 ii += 1
#             if flag == 1:
#                 break
#             if status == 0:
#                 if (len(dividend[year]) < idx_):
#                     dividend[year].append(str(total))
#                     date[year].append(d)
#             elif len(dividend[year]) < idx_:
#                 dividend[year].append('('+  str(status) +') '+ str(total))
#                 date[year].append('('+ str(status)+') '+ d)
#             else:
#                 dividend[year][-1] = '('+  str(status) +') '+ str(total) + ' ' + dividend[year][-1]
#                 date[year][-1] = '('+ str(status)+') '+ d + ' ' + date[year][-1]
#         idx += 1
#     for key in dividend.keys():
#         if len(dividend[key]) < idx_:
#             dividend[key].append('-')
#         if len(date[key]) < idx_:
#             date[key].append('-')
#     idx_ += 1
#     print(idx_)
      
idx_ = 1
header = {'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'}
for id in ids[800:]:
    if idx_ % 5 == 0:
        time.sleep(2)
    resp = requests.get('https://tw.stock.yahoo.com/d/s/dividend_'+str(id)+'.html', headers=header)
    soup = BeautifulSoup(resp.text, 'html.parser')
    table = soup.select("table[cellspacing='1']")
    idx = 0
    flag = 0
    if len(table) == 0:
        print(len(table))
        print(resp.text)
    for tr in table[0].select('tr'):
        if idx > 0:
            ii = 0
            status = 0
            year = ''
            d = ''
            total = ''
            for td in tr.select('td'):
                if ii == 0:
                    year = td.text[:3]
                    if dividend.get(year) == None:
                        flag = 1
                        break
                    if td.text[-1] == '季':
                        status = td.text[-2]
                elif ii == 1:
                    d = td.text
                # elif ii == 2:
                #     total += float(td.text)
                # elif ii == 4:
                #     total += float(td.text)
                elif ii == 6:
                    total = td.text
                ii += 1
            if flag == 1:
                break
            if status == 0:
                if (len(dividend[year]) < idx_):
                    dividend[year].append(str(total))
                    date[year].append(d)
            elif len(dividend[year]) < idx_:
                dividend[year].append('('+  str(status) +') '+ str(total))
                date[year].append('('+ str(status)+') '+ d)
            else:
                dividend[year][-1] = '('+  str(status) +') '+ str(total) + ' ' + dividend[year][-1]
                date[year][-1] = '('+ str(status)+') '+ d + ' ' + date[year][-1]
        idx += 1
    for key in dividend.keys():
        if len(dividend[key]) < idx_:
            dividend[key].append('-')
        if len(date[key]) < idx_:
            date[key].append('-')
    resp2 = requests.get('https://tw.stock.yahoo.com/q/q?s='+str(id), headers=header)
    soup = BeautifulSoup(resp2.text, 'html.parser')
    table2 = soup.select("table[border='2']")[0].find_all('td')
    price.append(table2[7].text)
    idx_ += 1
    print(idx_)
    # break
data = {
    '證券編號': ids[800:],
    '證券名稱': names[800:],
    '收盤價': price,
    '殖利率(%)': yields[800:],
    '本益比': PEs[800:],
    '股價淨值比': PBs[800:],
    '104股利': dividend['104'],
    '105股利': dividend['105'],
    '106股利': dividend['106'],
    '107股利': dividend['107'],
    '108股利': dividend['108'],
    '109股利': dividend['109']
}
df = pd.DataFrame(data)
df.to_excel('excel_output.xlsx', index=False)
# with open('busRoute.csv', 'w', newline='') as csvfile:
#     writer = csv.writer(csvfile)
#     writer.writerow(['RouteUID', 'City', 'RouteName', 'DepartureStopName','DestinationStopName'])