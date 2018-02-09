---
title: Docker 搭建Nexus 私服
date: 2017-09-30 13:46:02
categories: Linux
tag: Docker
---
### 创建数据卷
``` shell
docker volume create --name nexus-data
```
### 拉取Nexus 镜像
``` shell
docker pull sonatype/nexus3 ( 国内建议使用daocloud，centos 可以使用dao pull sonatype/nexus3)
```
### 启动镜像
``` shell
docker run --restart="always" -d -p 8081:8081 --name nexus -v nexus-data:/nexus-data sonatype/nexus3
```
### 访问网址打开(账号/密码   admin/admin123)
http://localhost:8081

参考https://hub.docker.com/r/sonatype/nexus3/
