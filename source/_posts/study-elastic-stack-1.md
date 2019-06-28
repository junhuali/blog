---
title: 学习Elastic Stack（一）
date: 2019-06-26 13:35:14
categories: Linux
tags: Docker、Elastic
---
前两天在`极客时间`买了`Elasticsearch核心技术与实战`的视频课程，希望加深对Elastic Stack的了解，提升自己的能力。实际的工作中也用到了 ELK进行生产环境的日志查询与分析，只是简单的使用，了解一些基本的原理，但是更高阶的内容并不了解。学习一个东西最后的方法就是去实践，同时做一些记录进行输出。<!--more-->

![Elastic Stack](elk-stack-elkb-diagram.png)


### Elastic Stack概念
首先需要了解一下，什么是`ELK`，`为什么是Elastic Stack`，[What is the ELK Stack? Why, it’s the Elastic Stack.](https://www.elastic.co/cn/elk-stack)
> So, what is the ELK Stack? "ELK" is the acronym for three open source projects: Elasticsearch, Logstash, and Kibana. Elasticsearch is a search and analytics engine. Logstash is a server‑side data processing pipeline that ingests data from multiple sources simultaneously, transforms it, and then sends it to a "stash" like Elasticsearch. Kibana lets users visualize data with charts and graphs in Elasticsearch.
The Elastic Stack is the next evolution of the ELK Stack.

### 安装环境
因为是为了方便学习，所以使用docker进行环境的搭建，使用docker-compose 进行搭建，Elastic官方也提供了对应的[脚本](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)，极客时间上的是基于7.1版本ES的，不过区别不是很大(增加了cerebro监控和kibana，可以自行添加)。
#### 运行 docker-compose 命令
`docker-compose.yml` 文件内容如下
``` shell
version: '2.2'
services:
  es01:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.2.0
    container_name: es01
    environment:
      - node.name=es01
      - discovery.seed_hosts=es02
      - cluster.initial_master_nodes=es01,es02
      - cluster.name=docker-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata01:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - esnet
  es02:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.2.0
    container_name: es02
    environment:
      - node.name=es02
      - discovery.seed_hosts=es01
      - cluster.initial_master_nodes=es01,es02
      - cluster.name=docker-cluster
      - bootstrap.memory_lock=true
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - esdata02:/usr/share/elasticsearch/data
    networks:
      - esnet

volumes:
  esdata01:
    driver: local
  esdata02:
    driver: local

networks:
  esnet:
```
启动、停止、销毁
```shell
#启动
docker-compose up
#停止
docker-compose down
#销毁
docker-compose down -v
```
#### 检查集群状态
``` shell
curl http://127.0.0.1:9200/_cat/health
#表示没有正常运行
curl: (52) Empty reply from server
#正常运行如下
1561531623 06:47:03 docker-cluster green 2 2 4 2 0 0 0 0 - 100.0%
```
#### Elasticsearch Docker 配置修改
Elasticsearch 从`/usr/share/elasticsearch/config/` 加载配置，这些配置包括 配置Elasticsearch和设置JVM选项。

更多的配置可以自行查看Elastic的官网，有更详细的介绍，上面的工作就可以完成最基本的配置了
