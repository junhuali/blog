---
title: Node 项目问题总结
date: 2018-06-02 14:52:15
categories: Node
tags: rabbitmq
---
最近在写一个Node的项目，项目中碰到了不少问题，做一个记录。
### RabbitMQ virtual hosts 问题
项目中使用了RabbitMQ，按照官方demo编写，本地调试的时候没有问题（有种bug叫做本地是好的:-D,但是在链接公司的MQ的时候报错
``` error
rabbitmq typeerror cannot read property 'create channel' of undefined
```
会碰到上面类似的错误，创建channel的报错。
最开始的时候怀疑是自己代码有问题，毕竟第一次用Node(Node 菜鸡一个)；因为多环境，最开始的时候使用开发环境账号进行连接，后面
在尝试使用管理员账号登录的时候，发现可以正常连接，还以为是运维把权限配置的有问题（错的其实永远是别人，其实是自己的锅）。
最后发现是因为`virtual hosts`的原因
``` Javascript
   amqp.connect('amqp://admin:123456@localhost', function (err, conn) { ......
```
默认的配置如上图所示，其实这个配置会使用默认的`virtual hosts` `/`,但是如果配置了其他的`virtual hosts`，你没有配置就会导致你
无法正常的连接。
如果你配置的有其他的`virtual hosts`，那么配置如下
``` Javascript
 amqp.connect('amqp://admin:123456@localhost/virtual_hosts_name', function (err, conn) { ......
```
这个问题耗费了半天的时间找原因，Java中spring 做了封装，只用配置`virtual hosts`的name就可以了。

### RabbitMQ message 信息消费问题
项目采用node获取信息（主要是消息采集的库采用node开发，暂时还没有Java 的客），传入MQ，Java 服务端进行消费。
Java端的同事告诉我得到的都是数字(字节数组)，最后经过查找发现,如下代码
``` JavaScript
 ch.sendToQueue(q, new Buffer.from(JSON.stringify(orders)), {persistent: true});
```
发送到队列的时候会转为Buffer，所以Java 代码获取的时候，不能直接获取字符串，应该用byte[] 去接收
``` Java
Byte[] body = null;
String message = new String(body, "UTF-8");
```
这样就能正常解析从node 传输过来的数据。
