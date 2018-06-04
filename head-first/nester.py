""" 为print_lol增加第四个参数，用来标识将把数据写入哪个位置。
    需要为这个参数提供一个缺省值sys.stdout（称为标准输出，默认将数据输出到屏幕上）
"""
import sys


def print_lol(the_list, indent=False, level=0, out_file=sys.stdout):
    for each_item in the_list:
        if isinstance(each_item, list):
            print_lol(each_item, indent, level+1, out_file)
        else:
            if indent:
                for tab in range(level):
                    print('\t', end='', file=out_file)
            print(each_item, file=out_file)
