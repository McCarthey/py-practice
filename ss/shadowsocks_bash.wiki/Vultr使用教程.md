## 1. 注册及创建服务器

没有购买 Vultr 服务器的请按照[《Vultr 新手用户注册及购买图文教程》](https://www.vultrcn.com/1.html)注册 Vultr 账户并创建一台服务器。

> 注意：教程创建的都是 CentOS 系统，故本教程也只支持 CentOS 系统，不支持 Debian 及 Ubuntu 系统！

## 2. 连接服务器

注册账户并创建服务器后，请按照[《Windows 使用 Xshell 软件连接 Vultr VPS 教程》](https://www.vultrcn.com/3.html)连接好服务器。

> 注意：连接好再继续下一步，连接不上的请按照https://www.vultrcn.com/11.html自行解决。

## 3. 搭建 Shadowsocks 服务器端

使用 Xshell 软件成功连接服务器后，按照下图提示，我们复制命令：

中文版：

`wget --no-check-certificate -O shadowsocks-libev_CN.sh https://raw.githubusercontent.com/uxh/shadowsocks_bash/master/shadowsocks-libev_CN.sh && bash shadowsocks-libev_CN.sh`

英文版：_（如果中文版执行后出现乱码，那么请使用这个）_

`wget --no-check-certificate -O shadowsocks-libev.sh https://raw.githubusercontent.com/uxh/shadowsocks_bash/master/shadowsocks-libev.sh && bash shadowsocks-libev.sh`

然后回到 Xshell 软件，鼠标右击选择粘贴，回车继续。

![](https://static.vultrcn.com/wp-content/uploads/2018/04/ss01-3.png)

回车后系统会自行下载脚本文件并运行。按照下图提示，我们输入 1 选择安装服务，回车继续。

> 注意：如果报错 Network is unreachable 请参考[《Vultr 2.5 美元机器报错 Network is unreachable 的解决办法》](https://www.vultrcn.com/12.html)自行解决。

![](https://static.vultrcn.com/wp-content/uploads/2018/04/ss02-3.png)

回车后系统会进入安装界面。按照下图提示，我们首先依次输入 SS 的各项信息，然后回车继续即可。

> 注意：如果有信息输入错误需要更改时，请按住 Ctrl 键后再按删除键，直接按删除键是不能删除的。

![](https://static.vultrcn.com/wp-content/uploads/2018/04/ss03-3.png)

安装过程耗时 2~5 分钟，完成后会来到下图界面，请把图中四行红字信息保存下来，方便以后查询使用。

![](https://static.vultrcn.com/wp-content/uploads/2018/04/ss04-3.png)

> 注意：请务必继续进行第四步，否则可能导致速度慢甚至无法连接。

## 4. 安装 TCP 加速软件

前面虽然已经搭建好了 SS，但是因为服务器位于国外，连接速度会较慢，所以我们非常必要在服务器上安装 TCP 加速软件来提速。一般大家常用的 TCP 加速软件有锐速和 Google BBR 拥塞控制算法。

> 注意：两者不能同时安装，大家根据自己的喜好选择其中一个安装即可！

1、安装锐速请使用[《CentOS6/7 专用破解版锐速一键安装脚本》](https://www.stackcc.com/2019/01/04/centos67ruisu/#h4)进行。**（推荐这个）**

2、安装 BBR 请按照[《一键安装原版 & 魔改版 Google BBR 拥塞控制算法教程》](https://www.vultrcn.com/5.html)进行。

## 5. 各平台客户端下载

各平台客户端下载

Windows 客户端：[点击下载](https://filedown.me/Gfw/Shadowsocks/shadowsocks-windows-4.1.3.1.zip)；Macbook 客户端：[点击下载](https://filedown.me/Gfw/Shadowsocks/shadowsocks-macos-1.8.2.zip)；Android 客户端：[点击下载](https://filedown.me/Gfw/Shadowsocks/shadowsocks-andriod-4.7.0.apk) / [魅族专用](https://filedown.me/Gfw/Shadowsocks/shadowsocks-andriod-4.3.3.apk)；

iPhone/iPad 客户端：在某宝购买一个 App Store 美区账户，搜索 potatso lite 下载安装。

Windows 客户端若无法运行则请先安装 NET4.6.2 软件：[点击下载](https://filedown.me/Windows/Soft/Net-Windows-4.6.2.zip)。

## 附1. 修改 Shadowsocks 的配置信息

如果你以后需要修改 Shadowsocks 的配置（比如密码、端口或者加密），可以运行下列命令：

中文版：

`bash shadowsocks-libev_CN.sh`

英文版：

`bash shadowsocks-libev.sh`

然后选择第 8 项：修改 Shadowsocks 配置即可重新设置 Shadowsocks 的密码、端口以及加密方式。

## 附2. 卸载 Shadowsocks 服务

如果你以后需要修改 Shadowsocks 的配置（比如密码、端口或者加密），可以运行下列命令：

中文版：

`bash shadowsocks-libev_CN.sh`

英文版：

`bash shadowsocks-libev.sh`

然后选择第 2 项：卸载 Shadowsocks 服务即可从服务器中卸载掉 Shadowsocks 服务。