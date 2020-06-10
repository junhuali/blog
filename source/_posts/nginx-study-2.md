---
title: Nginx学习日志 2
date: 2020-06-10 10:25:38
categories: Linux
tags: Nginx
---
### Nginx 配置语法

- 配置文件由指令与指令块组成
- 每条指令以 ; 结尾，指令与参数以空格符号分隔
- 指令块以{} 大括号将多条指令组合在一起
- include 语句允许组合多个配置文件以提升可维护性
- 使用#符号添加注释，提高可读性
- 使用$符变量
- 部分指令的参数支持正则表达式


``` bash
# nginx.conf
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
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

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
```

http配置指令块主要包含下面4个部分
  - http
  - server
  - location
  - upstream

### Nginx命令行
- 格式 nginx -s reload
- 帮助 -? -h
- 使用指定的配置文件 -c
- 指定配置文件指定 -g
- 指定运行目录 -p
- 发送信号 -s(立刻停止 stop 优雅退出 quit 重载配置文件 reload 重新开始记录日志文件reopen)
- 测试配置文件是否有语法错误 -t -T
- 打印Nginx的版本信息、编译信息等 -v -V


### Nginx 热部署
#### 备份
cp nginx nginx.old
用新编译好的nginx 替换
#### 部署切换
```ps -ef | grep nginx
#进程会平滑切换
kill -USR2 pid

#优雅退出
kill -WNCH pid
```

### 日志切割
移动日志 mv xxx.log xxx.bak 重新开始记录日志文件,更好的方式是通过脚本进行
./nginx -s reopen 
