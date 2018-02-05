---
title: Docker安装MongoDB(Mongo3.x)
date: 2017-09-23 16:04:51
tags:
	- Linux
---

### 使用Volume(Volume 比 普通的挂载磁盘有很多优势，这里采用Volume)

#### 创建Volume 命名为mongo-data
``` Shell
docker volume create --name mongo-data
```

#### 拉取镜像
```
docker pull mongo
```

#### 运行
```
docker run --restart="always" \
          -d \
          --name mongo\
          -p 17017:27017\
          -v mongo-data:/data/db\
          -v /etc/localtime:/etc/localtime\
          mongo:latest --storageEngine wiredTiger -auth
```

` --storageEngine` MongoDB 的存储引擎，具体请查阅官方文档,此处采用wiredTiger，将数据存储到磁盘
`-auth` 设置Mongo的权限

#### 进入mongo镜像
```
docker exec -it mongo mongo admin
```

### 创建用户 user123 密码:123456
```
db.createUser({user: "user123",pwd: "123456",roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]})
```

至此，MongDB 安装完成