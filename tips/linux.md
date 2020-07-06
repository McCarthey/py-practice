## 禁止 root 远程登录

每天都有很多人在尝试 root 远程登录你的服务器，为安全起见，[参考](https://www.cnblogs.com/jianz/p/7979250.html)文章，新建用户登录，然后禁止 root 远程登录。

## Linux 相关

- unzip 解压

- rz 模块

- locate 搜索定位

- wget

- tail

- solarized 改变终端和 vim 配色

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

## Linux 权限

以为例 drwxr-xr-x

第一个字符表示文件的类型：

- d：目录
- -：文件
- l：连接文件
- b：表示设备文件里面的可供存储的接口设备
- c：表示设备文件里面的串行端口设备，例如键盘、鼠标

接下来的字符串中，每三个为一组，均为 rwx-

- r：代表可读
- w：代表可写
- x：代表可执行
- -：无权限

第一组为“文件所有者的权限”

第二组为“同用户组的权限”

第三组为“其他非本用户组的权限”

## Linux 文件权限修改

- chgrp：改变文件所属用户组。
- chown：改变文件所有者。（也可以修改文件所属用户组）
- chmod：改变文件的权限。

比如，当你要复制一个文件时，cp 命令会复制执行者的属性和权限，因此可以通过 chown user:group filename 命令来修改新文件的权限

修改权限命令：chomd [-R] xyz filename/dirname

其中 xyz 代表三组 rwx 的加权和

- r：4
- w: 2
- x: 1

常见误区：

- 只有具有 x 权限才可以切换至该目录，与 r 权限无关，r 权限只能让你看到该目录下的文件，而无法切换、无法执行该目录下的任何命令
- 目录的 w 权限很强大，可以删除已经存在的文件与目录（不论该文件的权限为何，如可以删除该目录下权限为-rw------- 所有者为 root 的文件）

* ab
  Apache 的测试工具，可以在 win10 上的 linux 子系统上安装使用

```bash
ab -c 10 -n 100 www.baidu.com
```

-n: 请求数量
-c: 并发数

- swap

space 是磁盘上的一块区域，可以是一个分区，也可以是一个文件，或者是他们的组合。简单点说，当系统物理内存吃紧时，Linux 会将内存中不常访问的数据保存到 swap 上，这样系统就有更多的物理内存为各个进程服务，而当系统需要访问 swap 上存储的内容时，再将 swap 上的数据加载到内存中，这就是我们常说的 swap out 和 swap in。

- 文件大小

du -sh [filename]

- 解压后撤销

解压后发现目录搞错了？没关系 撤销就完事儿了

```bash
zipinfo -1 [filepath].zip | xargs rm -rf
```

- grep

  查找文件中出现的字符串

  ```bash
  $ grep "string" [选项] file
  ```

  例如

  ```bash
  $ grep "React" DetailLayout.tsx
  ```

  输出

  ```
  import React, { useState, useEffect } from 'react';
  const Layout: React.FC = (props: any) => {
  ```

## 如果服务器登录时间过长

查看一下 /var/log/btmp 文件是否过大，该文件记录错误登录的日志，极有可能是别人扫描你的服务器不停尝试登录导致（间接得说明了[禁止 root 登录的重要性](https://www.cnblogs.com/jianz/p/7979250.html)）。删除后，秒登。

## MongoDB

- mongodb 守护进程启动

  ```s
  ./mongod --dbpath /data/db --port 27017 --logpath /var/log/mongod --logappend --fork
  ```
