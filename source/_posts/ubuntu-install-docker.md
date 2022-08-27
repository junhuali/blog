---
title: Ubuntu 安装Docker 
date: 2022-08-23 11:02:02
categories: Linux
tags: Docker
---
### 前言
随着CentOS7系统停止更新，后续的CentOS8 慢慢转向 CentOS Stream，选择一个合适的发行版势在必行。因为工作中使用容器较多，所以就选择了Ubuntu进行使用。记录一下在Ubuntu22.04上安装Docker的过程。<!--more-->
### 安装Docker
推荐使用官方的脚本进行安装，当然也可以手动安装。切换到root用户
```shell
#国内建议使用daocloud进行加速
curl -sSL https://get.daocloud.io/docker | sh
#官方脚本
curl -sSL https://get.docker.com/ | sh
```
### 设置开机启动

```shell
systemctl start docker
systemctl enable docker
```
### 配置加速镜像
```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://xxx.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

#registry-mirrors 可以根据自己的实际需求进行替换

```

```bash
#安装好后有提示
To run Docker as a non-privileged user, consider setting up the
Docker daemon in rootless mode for your user:

    dockerd-rootless-setuptool.sh install

Visit https://docs.docker.com/go/rootless/ to learn about rootless mode.


To run the Docker daemon as a fully privileged service, but granting non-root
users access, refer to https://docs.docker.com/go/daemon-access/

WARNING: Access to the remote API on a privileged Docker daemon is equivalent
         to root access on the host. Refer to the 'Docker daemon attack surface'
         documentation for details: https://docs.docker.com/go/attack-surface/


#按照提示进行安装，切换到对应用户安装会报错
[ERROR] Missing system requirements. Run the following commands to
[ERROR] install the requirements and run this tool again.

########## BEGIN ##########
sudo sh -eux <<EOF
# Install newuidmap & newgidmap binaries
apt-get install -y uidmap
EOF
########## END ##########
#再次只想
apt-get install -y uidmap
dockerd-rootless-setuptool.sh install

```



### 配置docker-compose

```shell
#安装docker-compose （国内） 二选一
curl -L https://get.daocloud.io/docker/compose/releases/download/v2.10.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
#国外机器使用
curl -L https://github.com/docker/compose/releases/download/v2.10.0/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
#执行文件赋权
chmod +x /usr/local/bin/docker-compose
```
### 配置对应用户权限，不使用sudo运行docker
```shell
#切换到对应的sudo用户，xxx 代表将要切换的用户，根据实际情况进行切换
su xxx
#$USER是保存您当前用户名的环境变量，newgrp命令使usermod命令更改在当前终端中生效。
sudo usermod -aG docker $USER
newgrp docker
#验证
docker version
```

### 总结
通过将用户追加到docker组中，就可以直接使用docker命令



