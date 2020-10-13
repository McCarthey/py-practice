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
