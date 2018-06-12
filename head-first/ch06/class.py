# 每个定义的类都有一个特殊的方法__init()__，来控制如何初始化对象
# 注：python中没有'new'的概念
# 类中定义的所有方法的第一个参数都需要是self，表示调用对象实例


class Athlete:
    def __init__(self, a_name, a_dob=None, a_times=[]):
        self.name = a_name
        self.dob = a_dob
        self.times = a_times
    def top3(self):
        return (sorted(set([sanitize(t) for t in self.times]))[0:3])
    def add_time(self, time):
        self.times.append(time)
    def add_times(self, time_list):
        self.times.extend(time_list)  # 数组拼接 

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
        return Athlete(res.pop(0),res.pop(0),res)
    except IOError as err:
        print('File error: ' + str(err))
        return(None)


james = get_coach_data('./rawText/james.txt')
julie = get_coach_data('./rawText/julie.txt')
mikey = get_coach_data('./rawText/mikey.txt')
sarah = get_coach_data('./rawText/sarah.txt')

vera = Athlete('Vera Vi')
vera.add_time('2.23')
vera.add_times(['2.09','2.38','2.16'])

print(james.name + " 's fastest times are: " + str(james.top3()))
print(julie.name + " 's fastest times are: " + str(julie.top3()))
print(mikey.name + " 's fastest times are: " + str(mikey.top3()))
print(sarah.name + " 's fastest times are: " + str(sarah.top3()))
print(vera.name + " 's fastest times are: " + str(vera.top3()))

