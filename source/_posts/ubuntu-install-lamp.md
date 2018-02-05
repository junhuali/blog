---
title: Ubuntu安装LAMP
date: 2017-10-28 11:32:00
tags:
    - Linux
---
### LAMP
 Linux+Apache+Mysql/MariaDB+Perl/PHP/Python一组常用来搭建动态网站或者服务器的开源软件，本身都是各自独立的程序，但是因为常被放在一起使用，拥有了越来越高的兼容度，共同组成了一个强大的Web应用程序平台。
### 环境
基于Ubuntu
### 开始

``` bash
$ apt-get update && sudo apt-get upgrade #更新软件包
```
#### 安装MySQL
```bash
$ sudo apt-get install -y mysql-server 
$ sudo apt-get install -y mysql-client 
! 记得设置默认密码
```


 ``` bash
 $ sudo netstat -tap | grep mysql #显示监听的端口即表示安装成功
 ```

#### 配置远程连接
``` bash
$ vim /etc/mysql/mysql.conf.d/mysqld.cnf
#bind-address = 127.0.0.1
```
#### 远程访问赋权
``` bash
$ mysql -u root -p
$ grant all on *.* to root@'%' identified by 'root';
$ flush privileges;  
$ exit
$ service mysql restart(or: $ /etc/init.d/mysql restart)# 重启
```
####安装Apache2

```bash
$ sudo apt-get install -y apache2 
```

``` bash
#修改apache2.conf配置
$ vi /etc/apache2/apache2.conf
$ KeepAlive Off
#修改mpm_prefork.conf配置
$ vim /etc/apache2/mods-available/mpm_prefork.conf
 <IfModule mpm_prefork_module>
   StartServers            2
   MinSpareServers         6
   MaxSpareServers         12
   MaxRequestWorkers       39
   MaxConnectionsPerChild  3000
</IfModule>

#禁用和启动模块
$ sudo a2dismod mpm_event
$ sudo a2enmod mpm_prefork
$ sudo systemctl restart apache2 #重启Apache
```
#### PHP 安装
``` bash
# 安装相关包
$ sudo apt-get install php7.0 php-pear libapache2-mod-php7.0 php7.0-mysql -y
# 安装组件支持
apt-get install php7.0-curl php7.0-json php7.0-cgi graphviz aspell php7.0-pspell php7.0-curl php7.0-gd php7.0-intl php7.0-mysql php7.0-xml php7.0-xmlrpc php7.0-ldap php7.0-zip php7.0-soap php7.0-mbstring php-gettext -y
# 重启服务
$ sudo systemctl restart apache2 

```

#### phpmyadmin 安装
``` bash

$ sudo apt-get install -y phpmyadmin
#安装对应php包（如果没有安装对应的包） 
$ sudo apt-get install -y php-mbstring 
$ sudo apt-get install -y php-gettext
#安装时选择自动配置数据库，输入数据库root账号的密码
#如果不安装以上两个php软件包，则会报错或者白屏，提示找不到/usr/share/php/php-gettext/gettext.inc之类的错误

#建立软连接
$ sudo ln -s /usr/share/phpmyadmin /var/www/html/phpmyadmin
#重启apache
$ sudo /etc/init.d/apache2 restart
#访问http://localhost:127.0.0.1/phpmyadmin 输入之前创建mysql 时候的账号密码即可
```








