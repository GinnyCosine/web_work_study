import json
import csv

idx = 0
items_list = []
class_list = []
class_idx = {}
with open('heads.csv', newline='') as csvfile:
    content = csv.reader(csvfile, delimiter=',')
    for row in content:
        if class_idx.get(row[1].strip()) == None:
            class_idx[row[1].strip()] = idx
            class_list.append({'class':{
                "zh": row[0].strip(),
                "en": row[1].strip()
            },'index':idx})
            items_list.append({'items':[{
                'name': row[2].strip(),
                'intro': '',
                'id': row[3].strip(),
                'image': 8
            }]})
            idx += 1
        else:
            items_list[class_idx[row[1].strip()]]['items'].append({
                'name': row[2].strip(),
                'intro': '',
                'id': row[3].strip(),
                'image': 8
            })
data = {
    'has_class': 1,
    'title': '偶頭',
    'more' : '偶頭',
    'class_list': class_list,
    'items_list': items_list
}
with open("heads.json","w") as jsonfile:
    json.dump(data,jsonfile, ensure_ascii=False)
