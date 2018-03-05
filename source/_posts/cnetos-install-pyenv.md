---
title: Centos7 安装 pyenv
date: 2018-02-27 11:38:38
categories: Linux
tags: Python
---
> 人生苦短，我用Python

Python 短小精悍，在很多小地方使用Python，能提升效率，产生更大的价值。一般我们更多的是在本地使用，或者一个人使用，但是在服务器上，可能存在多人使用的情况，所以需要不同版本的Python，手动安装很容易冲突，所以采用环境管理来进行管理。

### 安装Pyenv
``` bash
sudo yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel  #安装所需的包
```


``` bash
#创建目录、安装
mkdir ~/.pyenv
git clone git://github.com/yyuu/pyenv.git ~/.pyenv  
#配置环境变量
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc  
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc  
echo 'eval "$(pyenv init -)"' >> ~/.bashrc  
exec $SHELL -l
```
```

``` bash
#列出所有版本
pyenv install --list

#安装python 3.5.2
pyenv install 3.5.2

#全局使用
pyenv global 3.5.2

#检查版本
python --version
```

通过环境管理，一台服务器上可以存在多个环境，方便部署。
