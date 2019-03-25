```bash
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset %Cblue <%an>' --abbrev-commit"
```
放弃修改，强制覆盖本地
```bash
git fetch --all
git reset origin --hard origin/[branchName]
git pull
```