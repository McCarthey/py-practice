# vim practice
- H - left 
- J - down
- K - up
- L - righet
- enter - next line first no empty char
- W w - next word first char
- {n}w - next {n} word first char
- E e - next word last char
- B b - last word first char
- {n}e - next {n} word last char
- G - last line this document
- x,X - del the following letter
- {n}x - del next {n} following letters
- dd - del current line
- {n}dd - del next {n} lines
- 0 - go to the front of this line
- $ - go to the end of this line 

# v - 进入可视模式，执行字符的选中，剪切，复制，粘贴
- d - 剪切
- y - 复制
- p - 粘贴

# a, i - 进入插入模式，a将光标放在后面，i将光标放在前面，shift + a光标移动到该行末尾，shift + i光标移动到该行开头
# 快速选中、删除、复制引号或括号中的内容
- 更改：ci' ci" ci( ci[ ci{ ci<
- 删除：di' di" di( di[ di{ di<
- 复制：yi[*]
- 选中：vi[*]

# undo撤销/重做
- u
- ctrl + R

# 快速复制/粘贴(不必进入可视模式)
- yy/ny
- p

# 查找和替换
- 查找：按下 / 进入查找模式，输入要查找的字符按下回车，按 n 查找下一个，按 N 查找上一个
- 替换：

    - 在选中的区域内查找：在Visual模式下选中段落后按 : 然后输入s/{目标}/{替换}/{替换标志}。如：:'<,'>s/:/?:/g
    - 当前行：:s/foo/bar/g
    - 全文: :%s/foo/bar/

# 滚动屏幕

- Ctrl + F 向下滚动一屏
- Ctrl + B 向上滚动一屏
- Ctrl + E 向下滚动一行
- Ctrl + Y 向上滚动一行
- Ctrl + D 向下滚动半屏
- Ctrl + U 向上滚动半屏

# 单词的大小写转换

将光标放在单词首字母上，

guw：大写->小写
gUw：小写->大写