---
title: centos yum 安装nginx 后增加模块
date: 2017-10-01 23:30:30
tags:
    - Linux
---
### yum 和 源码安装的区别

yum 安装是在线安装，优点：安装方式简单，快捷；

源码安装是将源码进行编译，生成可执行文件，优点：方便的添加模块等

### yum安装nginx
系统版本：CentOS Linux release 7.4.1708 (Core)

#### 1.增加对应的源
``` shell
rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```
#### 2.查看nginx信息

``` shell
yum info nginx  (查看nginx 版本方便后面下载对应版本)
```
#### 3.yum安装nginx
``` shell
yum -y install nginx
```

### nginx 相关的命令
#### 1.查看安装路径
``` shell
rpm -ql nginx
```
#### 2.查看编译参数
``` shell
nginx -V
```
#### 3.nginx 启动、停止、重启
``` shell
systemctl start nginx #启动 nginx 服务
systemctl stop nginx #停止 nginx 服务
systemctl restart nginx #重启 nginx 服务
```

### 启动检查是否启动成功
``` shell 
curl -i localhost
```

#### 如下显示说明正常启动：
``` html
···
<h1>Welcome to nginx!</h1>
···
```

### 安装第三方模块
其实`yum`安装`nginx` 后想要添加第三方模块，只需对`yum`安装的`nginx`相同版本的源码进行编译后替换
#### 1.安装源码安装需要的第三方包
``` shell
yum -y install gcc gcc-c++ make libtool zlib zlib-devel openssl openssl-devel pcre pcre-devel
```
#### 2.下载对应的源码
通过`nginx -V` 可以知道yum 安装nginx 的版本为1.12.1,下载对应的源码
``` shell
cd /opt
wget http://nginx.org/download/nginx-1.12.1.tar.gz
```
#### 3.查看对应configure
``` shell
tar xf nginx-1.12.1.tar.gz
cd nginx-1.12.1
nginx -V
configure arguments:  --prefix=/etc/nginx \
            --sbin-path=/usr/sbin/nginx \
            --conf-path=/etc/nginx/nginx.conf \
            ...
```
#### 4.增加对应的模块
``` shell
./configure --prefix=/etc/nginx \
            --sbin-path=/usr/sbin/nginx \
            --conf-path=/etc/nginx/nginx.conf \
            ...
            --add-module=../headers-more-nginx-module
```
#### 5.编译
``` shell
make && make install
```
#### 6.对可执行文件进行备份替换
``` shell 
cp /usr/sbin/nginx /usr/sbin/nginx.bak #备份
cp /opt/nginx-1.12.1/objs/nginx /usr/sbin/nginx #替换
systemctl restart nginx #重启 nginx 服务
```
大功告成