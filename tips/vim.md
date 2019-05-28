# vim practice
- H - left 
- J - down
- K - up
- L - righet
- enter - next line first no empty char
- w - next word first char
- {n}w - next {n} word first char
- e - next word last char
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