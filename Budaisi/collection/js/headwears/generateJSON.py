import json
import csv

items_list = []
with open('headwears.csv', newline='') as csvfile:
    content = csv.reader(csvfile, delimiter=',')
    for row in content:
        items_list.append({
            'name': row[0].strip(),
            'intro': '',
            'id': row[1].strip(),
            'image': 8
        })
data = {
    'has_class': 0,
    'title': '頭戴',
    'items': items_list
}
with open("headwears.json","w") as jsonfile:
    json.dump(data,jsonfile, ensure_ascii=False)
