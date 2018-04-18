---
title: python通过使用requirements.txt文件记录管理依赖包
date: 2018-03-07 11:38:55
categories: Python
tags: Python
---
python在本地使用的时候，不需要关心使用的依赖的问题，但是将代码上传到服务器以后，服务器上可能没有对应的包，这个时候程序运行就会报错，所以为了程序能够正常启动，就需要使用requirements.txt来记录版本依赖，有点类似Java中的Maven,管理Jar包。

### 使用
``` shell
# 进入项目目录创建requirements.txt文件
touch requirements.txt
# 将项目中使用的包冻结（freeze）到requirements.txt文件中
pip freeze >requirements.txt
```
当把项目上传到服务器以后可以执行下面的命令安装对应的包
``` shell
#通过requirements.txt 文件中的记录安装依赖
pip install -r requirements.txt
```
通过上面的方法就能将本地的包安装在服务器上了，保证了两个环境中的依赖一致，一般情况是在虚拟环境中使用，保证环境的干净，避免发生冲突。
