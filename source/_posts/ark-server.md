---
title: 方舟服务器搭建 Ark-Server-Build
date: 2020-04-14 21:28:48
tags: Ark
categories: Game
---
最近被朋友拉着入了`方舟:进化生存`的坑，但是朋友家的网络有点炸裂，导致我疯狂掉线，所以查了一下教程，搭建一个非专用服务器，并做一下记录。<!-- more -->
### 搭建准备
因为玩的人不是很多，所以服务器选的是阿里云4C16G,200Mbps带宽按流量付费(根据这几天玩下来，流量一般稳定在100kb/s左右)，弹性ip，系统选择的是CentOS7.8 64 bit，基于LinuxGSM 方案，阿里云入网是不收费的，200Mbps 带宽有利于下载游戏。
### 配置服务器
#### 增加Hosts
因为国内的关系，服务器访问github拉取代码容易出现失败的情况，所以需要修改一下hosts。
``` shell
vi /etc/hosts
#增加下面的配置，保存 这样可以避免脚本下载的时候失败
199.232.4.133 raw.githubusercontent.com
```

#### 设置安全组
游戏需要用到几个端口，默认的阿里云服务器只开了80，443 ，打开服务器的安全组配置
``` shell
# 打开对应的UDP端口, 0.0.0.0/0
7777
27015
```
#### 安装依赖

``` shell
# root 权限下执行,还可能会缺少，但是后面脚本会自行安装
yum install epel-release -y
yum install mailx postfix curl wget tar bzip2 gzip unzip python3 binutils bc jq tmux glibc.i686 libstdc++ libstdc++.i686 -y
```
#### 增加用户
创建非root用户
``` shell
# 增加用户
adduser arkserver
# 设置密码，可以根据自己的需求设置
passwd 1234546
```
#### 安装脚本

``` shell
# 切换用户、安装
su - arkserver
cd ~
# 下载linuxgsm.sh 脚本
wget -O linuxgsm.sh https://linuxgsm.sh && chmod +x linuxgsm.sh && bash linuxgsm.sh arkserver
# 安装、如果下载失败，多执行几次
./arkserver install
```

#### 常用命令
``` shell
# 可以通过键入找到命令的完整列表。
./arkserver
# 启动
./arkserver start
# 停止
./arkserver stop
# 重启
./arkserver restart
# 更新
./arkserver update
# 强制更新
./arkserver force-update
```


##### [参考LinuxGSM](https://linuxgsm.com/lgsm/arkserver/)





