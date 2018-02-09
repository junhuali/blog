---
title: Docker 常用命令(待完善)
date: 2017-11-30 15:32:29
categories: Linux
tag: Docker
---
#### 列出所有并删除已停止容器
``` bash
$ docker rm -v $(docker ps -aq -f status=exited)
$ docker volume rm $(docker volume ls -qf dangling=true)
```
#### 创建数据卷
``` bash
$ docker volume create --name data
```
