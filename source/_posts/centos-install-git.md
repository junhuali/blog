---
title: CentOS 安装 git
date: 2017-11-06 15:11:35
categories: Linux
tag: Git
---

### 源码安装
- 安装对应的依赖
``` bash
yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
yum install gcc perl-ExtUtils-MakeMaker
```
- 下载源码编译安装
#### 确保系统git 已经被卸载
``` bash
yum remove git(先执行本选项，确保卸载掉git)
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
# 下载最新rpm
wget https://centos7.iuscommunity.org/ius-release.rpm
# 安装依赖（可能会少包，按提示安装）
rpm -Uvh ius-release*rpm
# 安装git
yum --enablerepo=ius-archive install git2u
git --version
```
### yum 安装(安装2.x 可以yum search git 搜索到)
``` bash
yum install git2u
git --version
```
