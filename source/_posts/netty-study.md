---
title: Netty 学习记录
date: 2018-04-11 10:44:49
tags:
---
### Netty 核心组件
- Channel
- 回调
- Future
- 事件和ChannelHandler
#### Channel
Channel 是Java NIO 的一个基本构造，是数据的载体，可以被打开或者关闭，连接或者断开连接。
#### 回调
一个回调就是一个方法，一个指向已经被提供给另外一个方法的方法的引用。Netty 中使用回调来处理事件。
####  Future
Future 提供了另一种在操作完成时通知应用程序的方式。
#### ChannelHandler
ChannelHandler 是 Netty
