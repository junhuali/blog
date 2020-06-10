---
title: Nginx 学习日志 1
date: 2020-06-05 15:36:53
categories: Linux
tags: Nginx
---

### 回顾
之前的时候写过`Centos yum 安装nginx 后增加模块`,源码安装的时候一笔带过，最近在学习Nginx其中的一些知识点，所以记录一下手动安装的过程，以及相关的配置。<!--more-->
### 安装
Nginx 一般可以去官网下载，[Nginx](https://www.nginx.org),Nginx也有对应的商业版本[Nginx Plus](https://www.nginx.com/), 还有一些其他的基于Nginx开发的版本，[Tengine](https://tengine.taobao.org/)和[OpenResty](http://openresty.org/)都是比较有名的。
#### 下载
[Nginx下载](https://nginx.org/en/download.html),如下图，进入到下载页面，使用`stable version`稳定版。
![nginx](WX20200605-151113@2x.png)
``` bash
#下载
wget https://nginx.org/download/nginx-1.18.0.tar.gz

```
#### 解压
``` bash
#解压
tar -xzf nginx-1.18.0.tar.gz
```
### 目录说明
``` bash

cd nginx-1.18.0/

tree -L 1 (查看1层目录，如果没有tree 命令 yum -y install tree 进行安装 )

.
├── auto         # 编译、lib库、操作系统判断
├── CHANGES      # feature、版本变更、bugfix
├── CHANGES.ru   # 俄语changes
├── conf         # 示例文件
├── configure    # 生成中间文件
├── contrib      # vim等相关配置
├── html         # 标准文件页面50
├── LICENSE      # LICENSE
├── man          # 帮助文件
├── README       #
└── src          # 源码


# 复制vim 配置，可以让nginx配置显示颜色，更加方便的配置
cp -r contrib/vim/* ~/.vim/

```

#### 编译

``` bash
#查看编译配置
./configure --help | cat
  --help                             print this message

  --prefix=PATH                      set installation prefix
  --sbin-path=PATH                   set nginx binary pathname
  --modules-path=PATH                set modules path
  --conf-path=PATH                   set nginx.conf pathname
  --error-log-path=PATH              set error log pathname
  --pid-path=PATH                    set nginx.pid pathname
  --lock-path=PATH                   set nginx.lock pathname

  --user=USER                        set non-privileged user for
                                     worker processes
  --group=GROUP                      set non-privileged group for
                                     worker processes

  --build=NAME                       set build name
  --builddir=DIR                     set build directory

  --with-select_module               enable select module
  --without-select_module            disable select module
  --with-poll_module                 enable poll module
  --without-poll_module              disable poll module

  --with-threads                     enable thread pool support

  --with-file-aio                    enable file AIO support

  --with-http_ssl_module             enable ngx_http_ssl_module
  --with-http_v2_module              enable ngx_http_v2_module
  --with-http_realip_module          enable ngx_http_realip_module
  --with-http_addition_module        enable ngx_http_addition_module
  --with-http_xslt_module            enable ngx_http_xslt_module
  --with-http_xslt_module=dynamic    enable dynamic ngx_http_xslt_module
  --with-http_image_filter_module    enable ngx_http_image_filter_module
  --with-http_image_filter_module=dynamic
                                     enable dynamic ngx_http_image_filter_module
  --with-http_geoip_module           enable ngx_http_geoip_module
  --with-http_geoip_module=dynamic   enable dynamic ngx_http_geoip_module
  --with-http_sub_module             enable ngx_http_sub_module
  --with-http_dav_module             enable ngx_http_dav_module
  --with-http_flv_module             enable ngx_http_flv_module
  --with-http_mp4_module             enable ngx_http_mp4_module
  --with-http_gunzip_module          enable ngx_http_gunzip_module
  --with-http_gzip_static_module     enable ngx_http_gzip_static_module
  --with-http_auth_request_module    enable ngx_http_auth_request_module
  --with-http_random_index_module    enable ngx_http_random_index_module
  --with-http_secure_link_module     enable ngx_http_secure_link_module
  --with-http_degradation_module     enable ngx_http_degradation_module
  --with-http_slice_module           enable ngx_http_slice_module
  --with-http_stub_status_module     enable ngx_http_stub_status_module

  --without-http_charset_module      disable ngx_http_charset_module
  --without-http_gzip_module         disable ngx_http_gzip_module
  --without-http_ssi_module          disable ngx_http_ssi_module
  --without-http_userid_module       disable ngx_http_userid_module
  --without-http_access_module       disable ngx_http_access_module
  --without-http_auth_basic_module   disable ngx_http_auth_basic_module
  --without-http_mirror_module       disable ngx_http_mirror_module
  --without-http_autoindex_module    disable ngx_http_autoindex_module
  --without-http_geo_module          disable ngx_http_geo_module
  --without-http_map_module          disable ngx_http_map_module
  --without-http_split_clients_module disable ngx_http_split_clients_module
  --without-http_referer_module      disable ngx_http_referer_module
  --without-http_rewrite_module      disable ngx_http_rewrite_module
  --without-http_proxy_module        disable ngx_http_proxy_module
  --without-http_fastcgi_module      disable ngx_http_fastcgi_module
  --without-http_uwsgi_module        disable ngx_http_uwsgi_module
  --without-http_scgi_module         disable ngx_http_scgi_module
  --without-http_grpc_module         disable ngx_http_grpc_module
  --without-http_memcached_module    disable ngx_http_memcached_module
  --without-http_limit_conn_module   disable ngx_http_limit_conn_module
  --without-http_limit_req_module    disable ngx_http_limit_req_module
  --without-http_empty_gif_module    disable ngx_http_empty_gif_module
  --without-http_browser_module      disable ngx_http_browser_module
  --without-http_upstream_hash_module
                                     disable ngx_http_upstream_hash_module
  --without-http_upstream_ip_hash_module
                                     disable ngx_http_upstream_ip_hash_module
  --without-http_upstream_least_conn_module
                                     disable ngx_http_upstream_least_conn_module
  --without-http_upstream_random_module
                                     disable ngx_http_upstream_random_module
  --without-http_upstream_keepalive_module
                                     disable ngx_http_upstream_keepalive_module
  --without-http_upstream_zone_module
                                     disable ngx_http_upstream_zone_module

  --with-http_perl_module            enable ngx_http_perl_module
  --with-http_perl_module=dynamic    enable dynamic ngx_http_perl_module
  --with-perl_modules_path=PATH      set Perl modules path
  --with-perl=PATH                   set perl binary pathname

  --http-log-path=PATH               set http access log pathname
  --http-client-body-temp-path=PATH  set path to store
                                     http client request body temporary files
  --http-proxy-temp-path=PATH        set path to store
                                     http proxy temporary files
  --http-fastcgi-temp-path=PATH      set path to store
                                     http fastcgi temporary files
  --http-uwsgi-temp-path=PATH        set path to store
                                     http uwsgi temporary files
  --http-scgi-temp-path=PATH         set path to store
                                     http scgi temporary files

  --without-http                     disable HTTP server
  --without-http-cache               disable HTTP cache

  --with-mail                        enable POP3/IMAP4/SMTP proxy module
  --with-mail=dynamic                enable dynamic POP3/IMAP4/SMTP proxy module
  --with-mail_ssl_module             enable ngx_mail_ssl_module
  --without-mail_pop3_module         disable ngx_mail_pop3_module
  --without-mail_imap_module         disable ngx_mail_imap_module
  --without-mail_smtp_module         disable ngx_mail_smtp_module

  --with-stream                      enable TCP/UDP proxy module
  --with-stream=dynamic              enable dynamic TCP/UDP proxy module
  --with-stream_ssl_module           enable ngx_stream_ssl_module
  --with-stream_realip_module        enable ngx_stream_realip_module
  --with-stream_geoip_module         enable ngx_stream_geoip_module
  --with-stream_geoip_module=dynamic enable dynamic ngx_stream_geoip_module
  --with-stream_ssl_preread_module   enable ngx_stream_ssl_preread_module
  --without-stream_limit_conn_module disable ngx_stream_limit_conn_module
  --without-stream_access_module     disable ngx_stream_access_module
  --without-stream_geo_module        disable ngx_stream_geo_module
  --without-stream_map_module        disable ngx_stream_map_module
  --without-stream_split_clients_module
                                     disable ngx_stream_split_clients_module
  --without-stream_return_module     disable ngx_stream_return_module
  --without-stream_upstream_hash_module
                                     disable ngx_stream_upstream_hash_module
  --without-stream_upstream_least_conn_module
                                     disable ngx_stream_upstream_least_conn_module
  --without-stream_upstream_random_module
                                     disable ngx_stream_upstream_random_module
  --without-stream_upstream_zone_module
                                     disable ngx_stream_upstream_zone_module

  --with-google_perftools_module     enable ngx_google_perftools_module
  --with-cpp_test_module             enable ngx_cpp_test_module

  --add-module=PATH                  enable external module
  --add-dynamic-module=PATH          enable dynamic external module

  --with-compat                      dynamic modules compatibility

  --with-cc=PATH                     set C compiler pathname
  --with-cpp=PATH                    set C preprocessor pathname
  --with-cc-opt=OPTIONS              set additional C compiler options
  --with-ld-opt=OPTIONS              set additional linker options
  --with-cpu-opt=CPU                 build for the specified CPU, valid values:
                                     pentium, pentiumpro, pentium3, pentium4,
                                     athlon, opteron, sparc32, sparc64, ppc64

  --without-pcre                     disable PCRE library usage
  --with-pcre                        force PCRE library usage
  --with-pcre=DIR                    set path to PCRE library sources
  --with-pcre-opt=OPTIONS            set additional build options for PCRE
  --with-pcre-jit                    build PCRE with JIT compilation support

  --with-zlib=DIR                    set path to zlib library sources
  --with-zlib-opt=OPTIONS            set additional build options for zlib
  --with-zlib-asm=CPU                use zlib assembler sources optimized
                                     for the specified CPU, valid values:
                                     pentium, pentiumpro

  --with-libatomic                   force libatomic_ops library usage
  --with-libatomic=DIR               set path to libatomic_ops library sources

  --with-openssl=DIR                 set path to OpenSSL library sources
  --with-openssl-opt=OPTIONS         set additional build options for OpenSSL

  --with-debug                       enable debug logging

```
从上面的帮助可以看到，主要的编译配置分为3类
- 配置文件位置指定
- 指定使用和不使用的模块with（增加编译）、without（移除编译）
- 优化参数、第三方模块，日志位置等

``` bash
#编译,指定位置
./configure --prefix=/home/nginx
```
可能会出现报错
``` bash
./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.
```
根据提示，可以安装对应的库，或者在编译的时候选择移除对应的模块，或者选择从源码编译
``` bash
#安装 pcre library
yum -y install pcre-devel
```

再次编译提示缺少 zlib
``` bash
./configure: error: the HTTP gzip module requires the zlib library.
You can either disable the module by using --without-http_gzip_module
option, or install the zlib library into the system, or build the zlib library
statically from the source with nginx by using --with-zlib=<path> option.
```

``` bash
# 安装zlib library
yum -y install zlib-devel
```

再次编译以后，提示编译成功,以及nginx 相关的路径、模块等目录
``` bash
Configuration summary
  + using system PCRE library
  + OpenSSL library is not used
  + using system zlib library

  nginx path prefix: "/home/nginx"
  nginx binary file: "/home/nginx/sbin/nginx"
  nginx modules path: "/home/nginx/modules"
  nginx configuration prefix: "/home/nginx/conf"
  nginx configuration file: "/home/nginx/conf/nginx.conf"
  nginx pid file: "/home/nginx/logs/nginx.pid"
  nginx error log file: "/home/nginx/logs/error.log"
  nginx http access log file: "/home/nginx/logs/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"
```
编译生成了中间文件 `objs`,通过查看`ngx_modules.c`,可以知道nginx编译了哪些模块
执行`make`编译`make install` 安装
安装完成进入 `/home/nginx/`启动nginx以后
``` bash
.
├── client_body_temp
├── conf
├── fastcgi_temp
├── html
├── logs
├── proxy_temp
├── sbin
├── scgi_temp
└── uwsgi_temp
```
就可以看到所有的目录以及文件了。

在生产环境中，要根据实际的情况增加第三方模块











