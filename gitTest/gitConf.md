多 git 密钥管理: 多个 key 存在时，在生成 ssh-key 之后，还需要配置 config，以便让 ssh 找到相应的 key

```bash
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset %Cblue <%an>' --abbrev-commit"
```

放弃修改，覆盖本地

```
git fetch --all
git reset origin --hard origin/[branchName]
git pull
```

清空 git add .

```sh
git reset
```

设置 git 源地址,实现 https/ssh 的切换

```sh
git remote set-url origin XXXXXXX
```

git 提交设置日期：

```
git commit --date="月 日 时间 年 +0800" -am "提交信息"
eg: "May 10 11:21:50 2020 +0800"
```

github 搜索 star 数量最多：stars:>1000

github ssh_exchange_identification 报错，可能被运营商劫持，导致无法连接 github 22 端口，可在 hosts 里添加

```
192.30.253.112 gitHub.com
```

即可

git 开启大小写敏感

```sh
git config core.ignorecase false
```

git 获取当前分支/Hash

分支

```
git rev-parse --abbrev-ref HEAD
```

```
git rev-parse --short HEAD
```
