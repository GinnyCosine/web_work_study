import json
import csv

classes = {'shen':'生', 'dan':'旦', 'jing':'淨', 'chou':'丑', 'tsa':'雜'}
# classes_ = {'shen':'161a0004', 'dan':'1620308', 'jing':'1630401', 'chou':'164a0002', 'tsa':'166a004'}
list_cl = []
tmp = []
idx = 0
for class_ in classes.keys():
    characters = []
    with open(class_+'.csv', newline='') as csvfile:
        content = csv.reader(csvfile, delimiter=',')
        for row in content:
            characters.append({
                'name': row[0].strip(),
                'intro': row[1].strip(),
                'id': row[2].strip(),
                'image': 8,
                'size': '', # row[3].strip(),
                'material': '' # row[4].strip()
            })
    each = {
        "items": characters
    }
    list_cl.append({'class':{
            "zh": classes[class_],
            "en": class_
        },'index':idx})
    idx += 1
    tmp.append(each)
data = {
    'has_class': 1,
    'title': '戲偶',
    'more' : '角',
    'class_list':list_cl,
    'items_list': tmp
}
with open("characters.json","w") as jsonfile:
    json.dump(data,jsonfile, ensure_ascii=False)
