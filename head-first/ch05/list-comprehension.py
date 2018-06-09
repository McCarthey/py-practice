# 使用列表推导 快速生成新列表
mins = [1, 2, 3]
secs = [m * 60 for m in mins]

text = ['I', 'don"t', 'like', 'spam']
text_upper = [t.upper() for t in text]


def sanitize(time_string):
    if ':' in time_string:
        splitter = ':'
    elif '-' in time_string:
        splitter = '-'
    else:
        return (time_string)
    (mins, secs) = time_string.split(splitter)
    return (mins + '.' + secs)


time = ['2.22', '6-56', '12:08']
time_clean = [sanitize(t) for t in time]
print(time_clean)


