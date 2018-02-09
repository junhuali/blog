---
title: Docker 创建MySQL
date: 2018-01-17 13:24:31
categories: Linux
tags: Docker
---
### 不要在生产环境中使用，在开发和测试阶段使用比较方便

### 拉取镜像
``` shell
docker pull mysql
```
### 创建volume （比较方便，用完方便删除）
``` shell
docker volume create --name mysql-data
```
### 启动镜像
``` shell
docker run --restart="always" -d \
  -v mysql-data:/var/lib/mysql \
  -v /etc/localtime:/etc/localtime \
  -p 0.0.0.0:3306:3306 --name mysql \
  -e MYSQL_ROOT_PASSWORD=xxx mysql:latest \
  --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
`restart="always"` docker 重启后自动启动
` /etc/localtime:/etc/localtime` 解决mysql 时区问题
`MYSQL_ROOT_PASSWORD` 设置你自己的密码，默认用户名root
`--character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci` 设置字符集，默认需要修改，根据官方文档，可以在创建的时候指定
