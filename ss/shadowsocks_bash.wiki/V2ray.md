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
