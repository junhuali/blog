---
title: Nginx 负载均衡策略
date: 2017-10-12 17:12:01
categories: Linux
tag: Nginx
---
Nginx 作为高性能web服务器，负载均衡是其基本功能之一。 `注：负载均衡至少需要两台机器`
### 负载均衡
负载均衡可以将请求前端的请求分担到后端多个节点上，提升系统的响应和处理能力。

### 负载均衡策略
负载均衡的策略可以大致分为两大类：`内置策略` 和`扩展策略`
内置策略：一般会直接编译进Nginx内核，常用的有、轮询、ip hash、最少连接
扩展策略：fair、url hash等
#### 内置策略
- 轮询策略（轮询加权/round-robin）</br>
`到应用服务器的请求以round-robin/轮询的方式被分发`</br>
`配置`
``` bash
http {
    # ... 省略其它配置
    upstream tomcats {
        server 192.168.0.100:8080 weight=1 fail_timeout=20s;
        server 192.168.0.101:8080 weight=2 fail_timeout=20s;
    }
    server {
        server_name www.searchinfogo.com
        listen 80;
        location / {
            proxy_pass http://tomcats;
        }
    }
    # ... 省略其它配置
}
```

- ip hash </br>
`使用hash算法来决定下一个请求要选择哪个服务器(基于客户端IP地址)`</br>
`配置`
``` bash
http {
    # ... 省略其它配置
    upstream tomcats {
        server 192.168.0.100:8080;
        server 192.168.0.101:8080;
        ip_hash;
    }
    server {
        server_name www.searchinfogo.com
        listen 80;
        location / {
            proxy_pass http://tomcats;
        }
    }
    # ... 省略其它配置
}
```

- 最少连接（least_conn) </br>
`下一个请求将被分派到活动连接数量最少的服务器`</br>
`配置`
``` bash
http {
    # ... 省略其它配置
    upstream tomcats {
        server 192.168.0.100:8080;
        server 192.168.0.101:8080;
        least_conn;
    }
    server {
        server_name www.searchinfogo.com
        listen 80;
        location / {
            proxy_pass http://tomcats;
        }
    }
    # ... 省略其它配置
}
```

#### 扩展策略
- fair</br>
`配置`
``` bash
http {
    # ... 省略其它配置
    upstream tomcats {
        server 192.168.0.100:8080;
        server 192.168.0.101:8080;
        fair;
    }
    server {
        server_name www.searchinfogo.com
        listen 80;
        location / {
            proxy_pass http://tomcats;
        }
    }
    # ... 省略其它配置
}
```

- url hash</br>
`配置`
``` bash
http {
    # ... 省略其它配置
    upstream tomcats {
        server 192.168.0.100:8080;
        server 192.168.0.101:8080;
        hash $request_uri;
        hash_method crc32;
    }
    server {
        server_name www.searchinfogo.com
        listen 80;
        location / {
            proxy_pass http://tomcats;
        }
    }
    # ... 省略其它配置
}
```


weight=1; (weight 默认为1.weight越大，负载的权重就越大)
down; (down 表示单前的server暂时不参与负载)
backup; (其它所有的非backup机器down或者忙的时候，请求backup机器)
max_fails ：允许请求失败的次数默认为1.当超过最大次数时，返回proxy_next_upstream 模块定义的错误
fail_timeout:max_fails次失败后，暂停的时间

### 最后
``` bash
nginx -s reload #重启nginx
```
