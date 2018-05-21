---
title: 使用frp微信本地调试
date: 2018-05-07 14:50:36
categories: Linux
tag: frp
---
### frp 原理
frp 是一个可用于内网穿透的高性能的反向代理应用，支持 tcp, udp, http, https 协议。
### 本地调试微信
微信开发需要调试不少东西，本地都是没有办法进行的，需要有固定的ip才能进行正常调试，如果把代码发布到远程进行调试，效率很低，所以需要本地有个固定的ip。
早期的时候我是使用ngrok进行内网穿透,因为各种原因，到后期基本没法使用了，然后我就切换到frp上，frp的部署要比ngrok 简单很多。ngrok 需要编译很多东西。
### frp 服务端部署
下载对应的包，客户端和服务端在一个包里面。系统centos7
- 下载安装包
``` bash
# 使用64位的包
wget https://github.com/fatedier/frp/releases/download/v0.18.0/frp_0.18.0_linux_amd64.tar.gz
```

- 域名解析
需要进行泛域名解析
`A   *.frp.frpss.top  xx.xx.xx.xx`

- 配置配置文件
``` bash
#修改服务端配置，frps_full.ini里面有所有的示例配置和说明
#这里使用泛域名解析，这样可以多用户同时使用
[common]
bind_port = 7000
vhost_http_port = 8089
subdomain_host=frp.frpss.top
dashboard_port = 7500
```
为了方便，可以使用nginx 进行代理，这样使用的时候就不需要配置端口号了

### frp 客户端配置
``` bash
[common]
#服务端配置
server_addr = 118.24.62.41
server_port = 7000

#需要自己起别名，注意不要和其他人重复
[server]
type = http

#端口
local_port = 4000
#泛解析域名，自己定义 如：test,解析后为test.frp.frpss.top
subdomain = test
```
### 启动

``` bash
# Mac 启动
./frpc -c ./frpc.ini
#Windows
./frpc.exe -c ./frpc.ini
```

### 本地调试
上面的端口配置的是`4000`根据自己的项目配置端口，然后使用`test.frp.frpss.top`进行访问



安装包可以去github下载，也可以在http://share.frpss.top 下载
