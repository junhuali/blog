---
title: centos安装redis5.x
date: 2018-12-14 10:35:35
categories: Linux
tags: Redis
---
### Redis
>Redis是一个使用ANSI C编写的开源、支持网络、基于内存、可选持久性的键值对存储数据库。从2015年6月开始，Redis的开发由Redis Labs赞助，而2013年5月至2015年6月期间，其开发由Pivotal赞助。[3]在2013年5月之前，其开发由VMware赞助。[4根据月度排行网站DB-Engines.com的数据显示，Redis是最流行的键值对存储数据库。

我们在项目的开发中很多地方都会用到reids，用户信息缓存、分布式锁、定时器、简单的队列等等，要想使用Redis，
第一件事就是安装Redis。

#### 安装Redis（默认CentOS 7）
- 下载Redis
``` shell
wget http://download.redis.io/releases/redis-5.0.3.tar.gz
```
- 解压编译
```
tar xzf redis-5.0.3.tar.gz
cd redis-5.0.3
make install
#安装redis-server（默认配置）
sh ./utils/install_server.sh

Welcome to the redis service installer
This script will help you easily set up a running redis server

Please select the redis port for this instance: [6379]
Selecting default: 6379
Please select the redis config file name [/etc/redis/6379.conf]
Selected default - /etc/redis/6379.conf
Please select the redis log file name [/var/log/redis_6379.log]
Selected default - /var/log/redis_6379.log
Please select the data directory for this instance [/var/lib/redis/6379]
Selected default - /var/lib/redis/6379
Please select the redis executable path [/usr/local/bin/redis-server]
Selected config:
Port           : 6379
Config file    : /etc/redis/6379.conf
Log file       : /var/log/redis_6379.log
Data dir       : /var/lib/redis/6379
Executable     : /usr/local/bin/redis-server
Cli Executable : /usr/local/bin/redis-cli
Is this ok? Then press ENTER to go on or Ctrl-C to abort.
Copied /tmp/6379.conf => /etc/init.d/redis_6379
Installing service...
Successfully added to chkconfig!
Successfully added to runlevels 345!
Starting Redis server...
Installation successful!
```
#### 修改配置文件
``` shell
vim /etc/redis/6379.config
#设置后台启动
daemonize yes
#设置数据持久化
appendonly yes
#设置ip 默认最好不修改
#bind 127.0.0.1
#设置密码
#requirepass 123456
```
#### 创建服务脚本
```
#启动
systemctl start /etc/init.d/redis_6379
```
