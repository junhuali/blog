---
title: CentOS7 安装Docker
date: 2019-06-25 09:42:40
categories: Linux
tags: Docker
---
Docker在越来越多的项目中使用，快捷、高效的部署，为我们提供了一个统一的环境，方便部署，当然还有其他很多的优点，就不一一列举了。安装基于[Docker官方文档](https://docs.docker.com/install/linux/docker-ce/centos/)<!-- more -->

### 准备
#### 操作系统需求
基于CentOS7发行版进行安装，需要启用`centos-extras`，默认是开启的，如果关闭了的话，需要打开
``` shell
[root@ip-172-26-13-79 centos]# yum repolist                                                                              
已加载插件：fastestmirror
Repodata is over 2 weeks old. Install yum-cron? Or run: yum makecache fast
Loading mirror speeds from cached hostfile
 * base: centos.usonyx.net
 * epel: download.nus.edu.sg
 * extras: centos.usonyx.net
 * updates: centos.usonyx.net
源标识                                     源名称                                                                  状态
!base/7/x86_64                             CentOS-7 - Base                                                         10,019
!epel/x86_64                               Extra Packages for Enterprise Linux 7 - x86_64                          13,221
!extras/7/x86_64                           CentOS-7 - Extras                                                          409
!updates/7/x86_64                          CentOS-7 - Updates                                                       1,982
repolist: 25,631
[root@ip-172-26-13-79 centos]#
```
开启的话，可以执行下面的命令,[参考](https://fedoraproject.org/wiki/EPEL)
``` shell
[root@ip-172-26-13-79 centos]# yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
# on RHEL 7 it is recommended to also enable the optional, extras, and HA repositories since EPEL packages may depend on packages from these repositorie
[root@ip-172-26-13-79 centos]# subscription-manager repos --enable "rhel-*-optional-rpms" --enable "rhel-*-extras-rpms"  --enable "rhel-ha-for-rhel-*-server-rpms"
```
建议使用`overlay2` storage driver。
#### 卸载旧的版本
``` shell
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```
如果没有提示，说明上面的包没有被安装。

### 安装
可以通过多种方式安装Docker CE：
- 大多数用户通过设置 `Dokcer's repositories` 的方式安装，方便安装和进行升级，这种方法比较推荐。
- 有些用过通过下载RPM 包的方式安装，这种方式适合没有办法连接到网络的时候使用。
- 在开发和测试环境，使用自动脚本进行Dokcer安装

#### 使用repository 进行安装
##### 设置 REPOSITORY
1.安装所需要的包，提供对应的存储支持
``` shell
$ sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```
2.使用下面推荐的稳定repository
``` shell
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo
```
##### 可选：开启nightly或test repositories
1.这些库包含在docker.repo 中，默认是关闭的，可以开启他们
``` shell
$ sudo yum-config-manager --enable docker-ce-nightly
```
2.开启test channel
``` shell
sudo yum-config-manager --enable docker-ce-test
```
3.关闭
``` shell
sudo yum-config-manager --disable docker-ce-nightly
```
[了解更多关于 nightly 和 test channels。](https://docs.docker.com/install/)

##### 安装Docker CE
安装最新版本，或者转到下一步安装特定版本
``` shell
$ sudo yum install docker-ce docker-ce-cli containerd.io
```
如果提示接受GPG key，请验证指纹是否匹配: `060A 61C5 1B55 8A7F 742B 77AA C52F EB6B 621E 9F35`
``
需要注意：如果存在多个Docker repositories 可能会导致安装最新的docker 而不是稳定版。
###### 安装特定的版本
``` shell
$ yum list docker-ce --showduplicates | sort -r

docker-ce.x86_64  3:18.09.1-3.el7                     docker-ce-stable
docker-ce.x86_64  3:18.09.0-3.el7                     docker-ce-stable
docker-ce.x86_64  18.06.1.ce-3.el7                    docker-ce-stable
docker-ce.x86_64  18.06.0.ce-3.el7                    docker-ce-stable
```
返回的列表取决于启动的repositories。安装特定的版本
- 例子，`docker-ce-18.09.1`
``` shell
sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
```
Docker 已安装未启动，`docker` 组被创建，但是没有user添加进组。
###### 启动Docker
``` shell
$ sudo systemctl start docker
```
###### 通过运行`hello-world` 验证Docker CE 安装正确
``` shell
$ sudo docker run hello-world
```
#### 通过rpm包进行安装
如果无法使用Docker's repository 安装Docker ,可以使用`.rpm`进行安装
##### 下载rpm包
可以到[https://download.docker.com/linux/centos/7/x86_64/stable/Packages/](https://download.docker.com/linux/centos/7/x86_64/stable/Packages/)下载`.rpm`文件选择版本进行安装。
>注意：如果安装nightly 或者 test包，需要把链接中的stable 换成对应的单词。

##### 安装Docker CE
切换到对应的目录进行下载和安装
``` shell
$ sudo yum install /path/to/package.rpm
```
##### 启动Docker
``` shell
$ sudo systemctl start docker
```
##### 通过运行`hello-world` 验证Docker CE 安装正确
``` shell
$ sudo docker run hello-world
```
#### 通过使用便捷脚本安装
Docker 提供了便捷脚本在[get.docker.com](https://get.docker.com/)和[test.docker.com](https://test.docker.com/),使用脚本安装可能会存在安全风险，建议不要在生产环境中使用
