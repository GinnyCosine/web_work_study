import json
import csv

classes = {'shen':'生', 'dan':'旦', 'jing':'淨', 'chou':'丑', 'tsa':'雜'}
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
    data = {
        'class':{
            "zh": classes[class_],
            "en": class_
        },
        "characters": characters
    }
    with open(class_+".json","w") as jsonfile:
        json.dump(data,jsonfile, ensure_ascii=False)
