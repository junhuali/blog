---
title: 使用kubeadm安装kubernetes集群(待续)
date: 2017-12-02 16:57:06
categories: Linux
---
因为国内服务器无法访问google，所以服务器需要科学上网
可以看我之前的文章，服务器科学上网
### 安装docker
建议使用daocloud提供的脚本进行安装，速度很快
``` bash
$ curl -sSL https://get.daocloud.io/docker | sh #适用于Ubuntu，Debian,Centos等大部分Linux，会3小时同步一次Docker官方资源
$ systemctl enable docker && systemctl start docker #设置开机启动，启动docker
```
### 安装kubeadm, kubelet and kubectl
``` bash
$ cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
$ setenforce 0 #关闭SELinux
$ yum install -y kubelet kubeadm kubectl
$ systemctl enable kubelet && systemctl start kubelet # 设置开机启动，启动
```
安装的过程有失败，提示执行yum --enablerepo=kubernetes clean metadata
``` bash
$ yum --enablerepo=kubernetes clean metadata # 如果还是不行，需要先清理缓存
$ yum clean metadata
$ yum clean all
$ rm -rf /var/cache/yum
```
### 使用 kubeadm 创建集群
``` bash
$ kubeadm init #初始化
```
待续。。。
