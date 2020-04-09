---
title: SpringCloud 引入链路跟踪Sleuth及Zipkin
date: 2020-03-19 11:28:09
categories: Linux
tags: 调用链监控
---

Zipkin是一种分布式跟踪系统，它有助于收集解决微服务架构中得延迟问题所需的时序数据，它管理这些数据的收集和查找。<!--More-->

### 下载 官方推荐直接下载打包好的应用，建议使用docker镜像或者jar
使用官方一键脚本
``` shell
curl -sSL https://zipkin.io/quickstart.sh | bash -s
java -jar zipkin.jar
```
docker
``` shell
docker run -d -p 9411:9411 openzipkin/zipkin
```
访问
任一方式启动后，访问 http://localhost:9411/zipkin/ ，如下图
![zipkin](WX20200319-113846.png)

### 项目集成

2.pom.xml 配置

增加如下依赖
``` xml
<dependency>
 <groupId>org.springframework.cloud</groupId>
 <artifactId>spring-cloud-starter-zipkin</artifactId>
 <version>2.0.3.RELEASE</version>
</dependency>
```

如果项目中包含  aspectjweaver 这个jar ，需要指定jar包版本为1.8.10，否则项目启动会出错
```xml
<dependency>
 <groupId>org.aspectj</groupId>
 <artifactId>aspectjweaver</artifactId>
 <version>1.8.10</version>
</dependency>
```

### 配置采样等参数
``` yml
#zipkin配置 # 指定了 Zipkin 服务器的地址
spring.zipkin.base-url = http://localhost:9411/ 
#采样率 1.0表示全部采样
spring.sleuth.sampler.probability = 1.0
```
服务调用以后，就可以看到具体的调用请求时间，但是在这个过程中也碰到了一些问题
- 如果屏蔽一些接口记录，例如 健康检查会产生大量的无用数据，影响查询
- 如果使用mysql查询会有一定的影响，官方也不建议使用
- 使用官方的jar后，无法进行改造，满足不了一些额外的需求
- 存储数据安全规范等问题

### 如果使用ES进行存储（建议使用）
``` shell
# STORAGE_TYPE 指定存储类型 ES_HOSTS es ip 通过逗号隔开，可以使用多个，ES_USERNAME ES用户名 ES_PASSWORD ES密码 ES_INDEX 自定义存储索引
STORAGE_TYPE=elasticsearch ES_HOSTS=172.16.28.56:9200,172.16.28.57:9200  ES_USERNAME=admin ES_PASSWORD=123456 ES_INDEX=zipkin-trace  java -jar /zipkin.jar
```





