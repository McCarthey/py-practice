with open('./rawText/james.txt') as james:
    jamesData = james.readline()
with open('./rawText/julie.txt') as julie:
    julieData = julie.readline()
with open('./rawText/mikey.txt') as mikey:
    mikeyData = mikey.readline()
with open('./rawText/sarah.txt') as sarah:
    sarahData = sarah.readline()

people = [{
    'old': jamesData,
    'new': []
},
    {
    'old': julieData,
    'new': []
},
    {
    'old': sarahData,
    'new': []
},
    {
    'old': jamesData,
    'new': []
}]

for person in people:
    data = person['old'].split(',')
    for v in data:
        person['new'].append(v.strip())

jamesList = people[0]['new']
julieList = people[1]['new']
mikeyList = people[2]['new']
sarahList = people[3]['new']

# 处理字符串中的":"和"-"


def sanitize(time_string):
    if ':' in time_string:
        splitter = ':'
    elif '-' in time_string:
        splitter = '-'
    else:
        return (time_string)
    (mins, secs) = time_string.split(splitter)
    return (mins + '.' + secs)


jamesListCleaned = []
julieListCleaned = []
mikeyListCleaned = []
sarahListCleaned = []

for item in jamesList:
    itemCleaned = sanitize(item)
    jamesListCleaned.append(itemCleaned)
for item in julieList:
    itemCleaned = sanitize(item)
    julieListCleaned.append(itemCleaned)
for item in mikeyList:
    itemCleaned = sanitize(item)
    mikeyListCleaned.append(itemCleaned)
for item in sarahList:
    itemCleaned = sanitize(item)
    sarahListCleaned.append(itemCleaned)

jamesListCleanedSorted = sorted(jamesListCleaned)
julieListCleanedSorted = sorted(julieListCleaned)
mikeyListCleanedSorted = sorted(mikeyListCleaned)
sarahListCleanedSorted = sorted(sarahListCleaned)

print(jamesListCleanedSorted)
print(julieListCleanedSorted)
print(mikeyListCleanedSorted)
print(sarahListCleanedSorted)
