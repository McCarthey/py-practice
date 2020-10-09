#### 2020 年切换至 v2ray

在 windows cmder 命令行工具中配置代理，才可以在命令行中科学上网：

以 bash 模式为例

```shell
# 端口(htpp: 10809)在v2ray软件/配置中可以查看到
export http_proxy=http://127.0.0.1:10809
export https_proxy=http://127.0.0.1:10809

# 测试google 不能使用ping命令
curl http://www.google.com
```

上述设置后，在 cmder 中成为了全局代理，当想访问一些不需要被代理的资源，如内网自建 gitlab 等，则需要设置白名单：

```shell
export NO_PROXY="localhost,x.x.x.x"
```

为了不必每次启动终端都输入代理、白名单，可以将这些逻辑抽成.sh 文件，可以全局执行：

```shell
# 文件1：proxy_on.sh
export http_proxy=http://127.0.0.1:10809
export https_proxy=http://127.0.0.1:10809
export NO_PROXY="localhost,x.x.x.x"

function proxy_on() {
    export http_proxy="http://0.0.0.0:10809"
    export https_proxy=$http_proxy
    echo -e "已开启代理"
}

proxy_on
```

```shell
# 文件2：proxy_off
function proxy_off(){
    unset http_proxy
    unset https_proxy
    echo -e "已关闭代理"
}

proxy_off
```

全局执行上述脚本的方法就是为命令赋 alias 别名即可：

```shell
alias proxy_on='sh ~/bash/proxy_on.sh'
alias proxy_off='sh ~/bash/proxy_off.sh'
```
