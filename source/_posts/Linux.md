---
title: Nginx 504 Gateway Time-out
date: 2017-09-22 20:49:29
categories: Linux
tag: Nginx

---


今天碰到了一个问题，生产环境用户报错，后台看日志都是正常的，最后经过debug 发现是nginx 设置
``` Java
	proxy_connect_timeout = 3;
```
时间过小导致的，最好用默认参数
