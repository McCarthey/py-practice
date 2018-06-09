def sanitize(time_string):
    if '-' in time_string:
        splitter = '-'
    elif ':' in time_string:
        splitter = ':'
    else:
        return time_string
    (mins, secs) = time_string.split(splitter)
    return (mins + '.' + secs)


def get_coach_data(filename):
    try:
        with open(filename) as f:
            data = f.readline()
        res = data.strip().split(',')
        res = [t.strip() for t in res]
        return ({
			'name': res.pop(0),
			'birthday': res.pop(0),
			'times': res,
			'fastestTimes': sorted(set([sanitize(t) for t in res]))[0:3]
		})
    except IOError as err:
        print('File error: ' + str(err))
        return(None)
		
james = get_coach_data('./rawText/james.txt')
julie = get_coach_data('./rawText/julie.txt')
mikey = get_coach_data('./rawText/mikey.txt')
sarah = get_coach_data('./rawText/sarah.txt')

print(james['name'] + " 's fastest times are: " + str(james['fastestTimes']))
print(julie['name'] + " 's fastest times are: " + str(julie['fastestTimes']))
print(mikey['name'] + " 's fastest times are: " + str(mikey['fastestTimes']))
print(sarah['name'] + " 's fastest times are: " + str(sarah['fastestTimes']))
