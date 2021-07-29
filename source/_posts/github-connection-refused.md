---
title: 解决访问raw.githubusercontent.com出现refused拒绝连接错误
date: 2021-01-27 14:38:28
categories: Linux
tags: Linux
---
今天升级了一台自己的服务器，使用let's encrypt 配置https，curl 安装 `acme.sh`的时候报错。<!--more-->

具体的错误信息如下：
``` shell
curl: (7) Failed to connect to raw.githubusercontent.com port 443: 拒绝连接
```
查询了一下发现是dns污染的问题，设置直连

```
vi /etc/hosts 
###增加下面的解析
199.232.68.133 raw.githubusercontent.com
199.232.68.133 user-images.githubusercontent.com
199.232.68.133 avatars2.githubusercontent.com
199.232.68.133 avatars1.githubusercontent.com
```
另外一种就是使用一个安全的dns

```
vi /etc/resolv.conf
###使用下面的dns或者其他的dns
nameserver 119.29.29.29
nameserver 182.254.116.116
```