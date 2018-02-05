---
title: 服务器科学上网
date: 2017-12-02 16:19:31
tags:
    - Linux
---
因为服务器使用的需要从google下载东西，但是在现在的环境下是无法下载的，所以就整理了一下下面的方法进行服务器科学上网。
### 准备
- 两台vps（一台国内，一台国外），国外的可以开阿里云按时计费的，比较方便,此文档基于centos7.4
- privoxy 包

### 开始
先用ssh 命令进行服务器socks5 连接接
``` bash
$ ssh -f -N -D bindaddress:port name@server
$ ssh -f -N -D 0.0.0.0:1080 root@45.63.61.77
```
- -f
输入密码后进入后台模式
(Requests ssh to go to background just before command execution.)
- -N
不执行远程命令,用于端口转发
( Do not execute a remote command. This is useful for just for warding ports (protocol version 2 only).)
- -D
socket5代理
(Specifies a local “dynamic” application-level port forwarding.Currently the SOCKS4 and SOCKS5 protocols are supported, and ssh will act as a SOCKS server.)
- -L
tcp转发
(Specifies that the given port on the local (client) host is to be forwarded to the given host and port on the remote side.)
- -C
使用数据压缩,网速快时会影响速度
(Compression is desirable on modem lines and other slow connections, but will only slow down things on fast networks.The compression algorithm is the same used by gzip)

bindaddress ：指定绑定ip地址
port ： 指定侦听端口
name： ssh服务器登录名
server： ssh服务器地址

运行完上面的命令就进行socks5连接了
可以执行下面的命令查看端口是否打开
``` bash
$ netstat -nltp
```
如果能看到指定的端口打开(1080端口)就说明正常连接了。

### 安装privoxy
``` bash
$ yum install privoxy  -y # 使用yum 安装比较方便，也可以使用源码安装
```
安装完成后需要进行配置，否则无法正常访问
``` bash
$ vim /etc/privoxy/config
# :783: 找到 783行，去掉前面的注释符号，端口可以随便改
$ listen-address 127.0.0.1:8118
#:1336: 找到 1336行，去掉前面的注释符号，后面的1080端口要对应ss服务里面的配置，要一致
$ forward-socks5t / 127.0.0.1:1080
```
### 修改环境变量开启代理
``` bash
vi /ect/profile
export https_proxy=http://127.0.0.1:8118
export http_proxy=http://127.0.0.1:8118
# 之后执行source /etc/profile 使配置生效
```

### 启动privoxy、测试
``` bash
$ privoxy /etc/privoxy/config  #netstat -ntlp 查看8118端口
$ wget www.google.com # 如果能下载则说明成功
```
### 后记
使用完后记得关闭代理，否则所有流量都会走代理，访问可能会变慢
注释掉`/etc/profile` 内的内容，刷新配置。
