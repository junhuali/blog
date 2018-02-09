---
title: CentOS 安装 node 
date: 2018-02-09 13:05:14
categories: Linux
tags: Node
---
### 下载node
``` bash
wget https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.xz
```
### 解压&配置
``` bash
tar xvJf node-v8.9.4-linux-x64.tar.xz
mv node-v8.9.4-linux-x64 /opt
```
``` bash
vim /etc/profile
```
``` bash
#设置node 环境变量
export NODE_HOME=/opt/node-v8.9.4-linux-x64
export PATH=$NODE_HOME/bin:$PATH
source /etc/profile
```
### 测试是否成功
``` bash
node -v
```
或者安装nvm
``` bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
vim /etc/profile
#加入下面的内容
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm、
source /etc/profile
```
### 检查是否安装成功
``` shell
 nvm --version
```
