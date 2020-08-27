---
title: Nginx学习日志 3
date: 2020-06-18 10:29:38
categories: Linux
tags: Nginx
---
Nginx是异步框架的网页服务器，也可以用作反向代理、负载平衡器和HTTP缓存。<!--More-->

### 静态资源web服务器搭建

``` bash
server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            alias   html;
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
     }
```

主要配置server，location 指定对应的文件目录，建议使用alias，使用root，会将文件路径混入到文件路径中，开启gizp，可以减少传输文件大小

``` bash
gip on; # 开启gizp
gipz_min_length 1; #最小文件
gipz_comp_level 2; #压缩级别
gizp_types text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png #压缩文件类型，有些文件类型没有必要再进行压缩 .rar等
```
### 静态文件服务器

``` bash
server{

    ...
    alias   html;
    #开启文件目录
    autoindex on;
    #限制文件传输速度1k
    set $limit_rate 1k;
    ...
}
```

### access日志格式

``` bash
#日志格式化
#log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
#                  '$status $body_bytes_sent "$http_referer" '
#                  '"$http_user_agent" "$http_x_forwarded_for"';
#access_log  logs/access.log  main;
```

### 反向代理服务器
``` bash
server {
    server_name  localhost;
    listen       80

    location / {
                proxy_pass  http://127.0.0.1:8080;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header   Cookie $http_cookie;
                }

}
```

### 缓存服务器
``` bash
proxy_cache_path /tmp/nginxcache levels=1:2 keys_zone=my_cache:10m max_size=10g
                 inactive=60m user_temp_path=off


server {
    server_name  localhost;
    listen       80

    location / {
                proxy_pass  http://127.0.0.1:8080;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header   Cookie $http_cookie;

                proxy_cache my_cache;
                proxy_cache_key $host$uri$is_args$args;
                proxy_cache_valid 200 304 302 1d;
                }

}
```






