---
title: Docker安装Oracle12C
date: 2021-07-29 13:59:28
categories: Linux
tag: Docker
---
在linux安装oracle测试，如果直接安装在宿主机，不使用后删除就会比较困难，所以采用docker的方式进行安装。<!--more-->

### 环境和准备
Linux: Centos7.x
Docker: Docker version 20.10.7, build f0df350
Oralce: Oracle12 12.2.0.1
国内可以访问的 sock5 代理（国内镜像进行加速使用）
### 安装
[安装docker环境](https://blog.searchinfogo.com/2019/06/25/centos7-docker-install-tutorial/)，可以参考这边文章。还需要配置一下docker 的socks5，这个镜像需要登陆dockerhub 账号
#### 配置Docker socks5 proxy
安装好docker后，进行下面的配置，配置好代理
```bash
#创建docker服务插件目录
sudo mkdir -p /etc/systemd/system/docker.service.d
#创建一个名为http-proxy.conf的文件,并编辑
sudo vi /etc/systemd/system/docker.service.d/http-proxy.conf 
#编辑内容如下
#如果socks5需要认证 "HTTP_PROXY=socks5://andy:123456@127.0.0.1:1080/",可以这么配置
[Service]
Environment="HTTP_PROXY=socks5://代理ip:代理端口/"
#重新加载服务程序的配置文件
sudo systemctl daemon-reload
#重启docker
sudo systemctl restart docker
```
#### 配置docker-compose 文件
先创建数据映射的本地目录，否则数据库重启后会丢失
```bash
#创建目录，并赋权
mkdir /opt/oracle/data && chmod 777 /opt/oracle/data
#创建,编辑 docker-compose.yml 文件
vi /opt/oracle/docker-compose.yml
#添加如下内容
version: '2'
services:
  oracle:
    image: store/oracle/database-enterprise:12.2.0.1
    container_name: oracle12
    privileged: true
    restart: always
    ports:
      - "1521:1521"
      - "8080:8080"
    volumes:
       - ./data:/opt/oracle/oradata
       - /etc/localtime:/etc/localtime:ro
# 上面的端口映射可以根据自己需求更改,更多的参数可以查询
```

#### 启动 
首先需要登陆，先登陆 [Dockerhub](https://hub.docker.com/)，然后搜索 `Oracle Database Enterprise Edition`,点击右侧的`Proceed to Checkout` ,输入一下信息（不需要完全真实），之后就能在右侧看到 `docker pull store/oracle/database-enterprise:12.2.0.1` ，这样就可以了，更多的配置说明也在这个页面上

在服务器上输入
```bash

docker login

Login with your Docker ID to push and pull images from Docker Hub. If you don't have a Docker ID, head over to https://hub.docker.com to create one.
Username: 
Password:
# 分别输入账号和密码,出现下面的，就说明登陆成功了
Login Succeeded

#启动
docker-compose up -d 

#查询镜像id
docker ps 

#查看启动日志
docker logs -f image_id
```
安装需要一些时间，具体要看服务器配置。

安装好了以后就可以进行登陆

```bash
oracle管理员
host:x.x.x.x
username:system
password:Oradoc_db1
port：1521
SID：ORCLCDB
```
通过上面的信息进行连接

### 后记
Oracle12 引入了CDB和PDB 的概念，有时候需要创建c## 开头的用户， 直接创建会报错失败，一般创建需要分别在CDB  和 PDB 分别 创建库

```
create tablespace test1 datafile '/opt/oracle/oradata/cdb/test1.dbf' size 512M autoextend on next 64m maxsize unlimited;
ALTER SESSION SET CONTAINER = ORCLPDB1;
create tablespace test2 datafile '/opt/oracle/oradata/pdb/test2.dbf' size 512M autoextend on next 64m maxsize unlimited;
alter session set container=CDB$ROOT;  
#再进行用户创建

```
简单记录一下Docker 安装 oracle 的安装和使用中遇到的小问题。








