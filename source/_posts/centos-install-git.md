---
title: CentOS 安装 git
date: 2017-11-06 15:11:35
categories: Linux
tag: Git
---
CentOS 7 上安装git 的几种方法。 <!-- more -->
### 源码安装
- 安装对应的依赖
``` bash
yum install -y curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum install -y gcc perl-ExtUtils-MakeMaker
```
- 下载源码编译安装
#### 确保系统git 已经被卸载
``` bash
yum remove -y git(先执行本选项，确保卸载掉git)
```

``` bash
cd /usr/src
wget https://www.kernel.org/pub/software/scm/git/git-2.9.3.tar.gz
tar xzf git-2.9.3.tar.gz
cd git-2.9.3
make prefix=/usr/bin/git all
make prefix=/usr/bin/git install
echo "export PATH=$PATH:/usr/bin/git/bin" >> /etc/bashrc
source /etc/bashrc
git --version (查看是否安装完成)
```
### rpm 安装（基于CentOS7）
``` bash
yum install -y epel-release （#error: Failed dependencies:epel-release = 7 is needed by ius-release-1.0-15.ius.centos7.noarch）
rpm -Uvh https://centos7.iuscommunity.org/ius-release.rpm
yum install git2u
git --version
```
