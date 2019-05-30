## 禁止root远程登录
每天都有很多人在尝试root全程登录你的服务器，为安全起见，[参考](https://www.cnblogs.com/jianz/p/7979250.html)文章，新建用户登录，然后禁止root远程登录。
## Linux相关
- unzip解压

- rz模块

- locate搜索定位

- wget

- tail

- solarized改变终端和vim配色

- ssh-keygen -t rsa -C "mccarthey123@outlook.com"

- clip < ~/.ssh/id_rsa.pub # copy public key to clipboard

- ssh -T git@github.com # test connecting to github 
- git config --list

- git config --global user.name "McCarthey"

- git config --global user.email mccarthey123@outlook.com

- git config --global alias.st status

(或者将一下配置复制粘贴到 ~/.gitconfig 文件中)

- [alias]
st = status -sb
co = checkout
br = branch
mg = merge
ci = commit
ds = diff --staged
dt = difftool
mt = mergetool
last = log -1 HEAD
latest = for-each-ref --sort=-committerdate --format=\"%(committername)@%(refname:short) [%(committerdate:short)] %(contents)\"
ls = log --pretty=format:\"%C(yellow)%h %C(blue)%ad %C(red)%d %C(reset)%s %C(green)[%cn]\" --decorate --date=short
hist = log --pretty=format:\"%C(yellow)%h %C(red)%d %C(reset)%s %C(green)[%an] %C(blue)%ad\" --topo-order --graph --date=short
type = cat-file -t
dump = cat-file -p
lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
[core]
autocrlf = true
[push]
dfault = simple

## Linux权限
以为例 drwxr-xr-x 

第一个字符表示文件的类型：
- d：目录
- -：文件
- l：连接文件
- b：表示设备文件里面的可供存储的接口设备
- c：表示设备文件里面的串行端口设备，例如键盘、鼠标

接下来的字符串中，每三个为一组，均为rwx-
- r：代表可读
- w：代表可写
- x：代表可执行
- -：无权限

第一组为“文件所有者的权限”

第二组为“同用户组的权限”

第三组为“其他非本用户组的权限”

## Linux文件权限修改

- chgrp：改变文件所属用户组。
- chown：改变文件所有者。（也可以修改文件所属用户组）
- chmod：改变文件的权限。

比如，当你要复制一个文件时，cp命令会复制执行者的属性和权限，因此可以通过 chown user:group filename 命令来修改新文件的权限

修改权限命令：chomd [-R] xyz filename/dirname

其中xyz代表三组rwx的加权和

- r：4
- w: 2
- x: 1


