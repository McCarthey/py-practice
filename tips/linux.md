# Linux相关
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
