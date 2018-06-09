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
    'old': mikeyData,
    'new': []
},
    {
    'old': sarahData,
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


jamesListCleanedSortedUnique = sorted(set([sanitize(t) for t in jamesList]))  # sorted会将集合自动转成列表并排序
julieListCleanedSortedUnique = sorted(set([sanitize(t) for t in julieList]))
mikeyListCleanedSortedUnique = sorted(set([sanitize(t) for t in mikeyList]))
sarahListCleanedSortedUnique = sorted(set([sanitize(t) for t in sarahList]))


# 使用集合去重复
# python提供了集合数据结构，特点是无序、不允许重复

print(jamesListCleanedSortedUnique[0:3])
print(julieListCleanedSortedUnique[0:3]) 
print(mikeyListCleanedSortedUnique[0:3])
print(sarahListCleanedSortedUnique[0:3])
