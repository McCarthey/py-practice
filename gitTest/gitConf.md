```bash
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset %Cblue <%an>' --abbrev-commit"
```
放弃修改，强制覆盖本地
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