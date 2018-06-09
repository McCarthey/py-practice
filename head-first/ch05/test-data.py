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

