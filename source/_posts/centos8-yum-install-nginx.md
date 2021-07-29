---
title: CentOS8 rpm 安装nginx
date: 2020-12-14 11:43:31
categories: Linux
tags: centos
---
最近有台服务器升级到了centos8 ，发现之前centos7 rpm 安装nginx的方式无法使用了，记录一下新的安装方式。<!--more-->

### 准备
``` bash
yum install yum-utils
```


### 配置nginx源
``` shell
cat >> /etc/yum.repos.d/nginx.repo << -'EOF'
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
-EOF
```

### 安装
``` shell
#安装
yum install nginx -y
#设置开机启动
systemctl enable nginx
#启动
systemctl start nginx 
```