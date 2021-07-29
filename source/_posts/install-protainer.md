---
title: 安装protainer
date: 2021-02-26 16:57:37
tags:
---
### Portainer 介绍
Portainer是一个轻量级的管理UI，可让您轻松管理不同的Docker环境（Docker主机或Swarm集群）。 Portainer的意图是易于部署和使用。它由一个可以在任何Docker引擎上运行的容器组成（可以部署为Linux容器或Windows本机容器，也支持其他平台）。 Portainer允许您管理所有Docker资源（容器，映像，卷，网络等）！它与独立的Docker引擎和 Docker Swarm模式兼容。
### 优点
（1）支持容器管理、镜像管理(导入、导出)
（2）轻量级，消耗资源少
（3）基于docker api，安全性高，可指定docker api端口，支持TLS证书认证
（4）支持权限分配
（5）支持集群
（6）github上目前持续维护更新

### 安装
假设docker 都安装好的情况下

``` shell
#拉取镜像
docker pull portainer/portainer
#创建volume
docker volume create portainer_data
#启动镜像
docker run -d -p 9000:9000 --name=portainer --restart=always \
-v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer
```




