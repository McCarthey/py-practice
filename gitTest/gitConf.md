```bash
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset %Cblue <%an>' --abbrev-commit"
```
放弃修改，覆盖本地
```bash
git fetch --all
git reset origin --hard origin/[branchName]
git pull
```

清空git add .
```bash
git reset 
```

设置git源地址,实现https/ssh的切换
```bash
git remote set-url origin XXXXXXX
```

github搜索star数量最多：stars:>1000 

github ssh_exchange_identification 报错，可能被运营商劫持，导致无法连接github 22端口，可在hosts里添加
```
192.30.253.112 gitHub.com
```
即可