---
title: Docker 安装 RabbitMQ 集群
date: 2017-12-04 10:31:55
tags:
    - Linux
---
Docker 有个好处就是方便折腾，下面将使用bijukunjummen 提供的docker-rabbitmq-cluster 脚本进行安装。
### 安装docker-compose
- 检查是否安装过docker-compose
``` bash
$ docker-compose -v #出现docker-compose version 1.16.1, build 6d1ac21 类似，说明安装成功
```
- 如果没有安装docker-compose，进行安装
``` bash
#服务器安装
$ curl -L https://get.daocloud.io/docker/compose/releases/download/1.17.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
$ chmod +x /usr/local/bin/docker-compose
```
- 在windows 和 Mac 下载对应的安装包进行安装
[Windows下载地址](https://download.docker.com/win/stable/Docker%20for%20Windows%20Installer.exe)
[Mac下载地址](https://download.docker.com/mac/stable/Docker.dmg)

### 下载对应的脚本
``` bash
$ git clone https://github.com/bijukunjummen/docker-rabbitmq-cluster.git
```
### 启动
``` bash
$ cd docker-rabbitmq-cluster/cluster/
$ docker-compose up -d #启动
```
### 备注
- 登录的账号密码（可以自行在脚本里面修改）
user: myuser
password: mypass
然后访问`localhost:15672`进行访问

以上使用bijukunjummen 的脚本，可参见[github](https://github.com/bijukunjummen/docker-rabbitmq-cluster)
以及[daocloud](http://get.daocloud.io/#install-docker) docker-compose脚本
