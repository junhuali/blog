---
title: CentOS7搭建socks5 服务
date: 2018-01-15 10:06:00
categories: Linux
tags: Socks5
---

### 环境
基于centsOS 7
ss5-3.8.9-8
### 下载源文件
``` shell
wget https://nchc.dl.sourceforge.net/project/ss5/ss5/3.8.9-8/ss5-3.8.9-8.tar.gz

#配置编译环境及安装编译SS5依赖组件
yum -y install gcc automake make
yum install gcc openldap-devel pam-devel openssl-devel
```
### 安装
``` shell
tar xf ss5-3.8.9-8.tar.gz
mv ss5-3.8.9-8 ss5
cd  ss5
./configure
make && make install
```
### 启动脚本加执行权限
``` shell
chmod +x /etc/init.d/ss5
```
### 进行配置并启动
``` shell
vi /etc/sysconfig/ss5  
SS5_OPTS=" -u root -b 0.0.0.0:18080" #绑定端口为18080
systemctl start ss5 #启动服务

#增加用户登录权限
vi /etc/opt/ss5/ss5.conf  
auth 0.0.0.0/0 - u  
permit u 0.0.0.0/0 - 0.0.0.0/0 - - - - -

#设置用户名和密码，一个用户和密码一行，用空格间隔
vi /etc/opt/ss5/ss5.passwd  
user1 123456
user2 123456

```
