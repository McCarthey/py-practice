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
        return(data.strip().split(','))
    except IOError as err:
        print('File error: ' + str(err))
        return(None)


sarah = [t.strip() for t in get_coach_data('./rawText/sarah.txt')]

sarah_dict = {}
sarah_dict['name'] = sarah.pop(0)
sarah_dict['birthday'] = sarah.pop(0)
sarah_dict['times'] = sarah

print(sarah_dict['name'] + " 's fastest times are:" + str(sorted(set([sanitize(t) for t in sarah_dict['times']]))[0:3]))
