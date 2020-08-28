---
title: 使用Let‘s Encrypt创建免费SSL证书（官方文档自动获取泛域名证书还不完善）
date: 2018-03-17 17:38:33
categories: Shell
tag: Domain
---
网络安全越来越重要，很多的网站都开始使用https来增加网站的安全性，Let’s Encrypt 最近支持了泛域名SSL
证书，这样一个域名只需要一个SSL证书就搞定了，之前阿里云等云服务商提供了免费的SSL证书，但是只支持一个子域名一个证书，最多20个（一般人其实够用了），但是申请多个证书还是比较麻烦，而且很重要的一个原因，云服务商提供的通配符证书价格很贵，使用Let's Encrypt费用就可以省了，唯一需要做的就是要进行证书续期。<!-- more -->

### 申请域名
为了演示，需要申请一个免费域名,我是在freenom申请的，freenom自带的有免费的DNS解析，但是在国内的体验不是很好所以为了更好的体验，使用dnspod。

免费的域名和DNS服务商有很多，大家可以自己去选择，上面只是举个例子。

我申请的域名是`rubys.ml`,可以免费使用一年，续费的话不到10刀/年。

### 配置Let's Encrypt 单域名
首先访问[Let's Cncrypt官网](https://letsencrypt.org/)，`Get Started`，然后会提供两种方式，`With Shell Access`和`Without Shell Access`，

- With Shell Access(官方推荐通过shell进行部署)
使用`Certbot ACME`客户端进行部署，它可以自动执行证书颁发和安装，而不用停机，它很容易使用，适用于多种操作系统，并且具有出色的文档。
![certbot](WX20180318-120435@2x.png)
访问[certbot](https://certbot.eff.org/),选择自己使用的服务器和操作系统。有自动化和高级两种模式可以选择。这里选择自动化。
- 安装系统扩展包
``` bash
wget http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
rpm -ivh epel-release-latest-7.noarch.rpm
yum -y install yum-utils
yum-config-manager --enable rhui-REGION-rhel-server-extras rhui-REGION-rhel-server-optional
```
- 安装certbot
``` bash
sudo yum install certbot-nginx
```
- 运行certbot插件生成证书
``` bash
sudo certbot --nginx
```
![certbot](WX20180318-122540@2x.png)

- 重启nginx
``` bash
systemctl restart nginx
```
访问[www.rubys.ml](www.rubys.ml),发现链接自动定向到https://www.rubys.ml

增加自动续期
``` bash
crontab -e
0 0,12 * * * python -c 'import random; import time; time.sleep(random.random() * 3600)' && certbot renew
```

上面的方法是单域名证书的创建
### 配置Let's Encrypt 泛域名
如果配置泛域名，还需要安装一个 `Certbot's DNS plugins` 插件
目前的代码还不够完善，目前根据文档，可以看到只支持，通过Docker 安装，可以一次性获取下面的服务商的支持
- certbot-dns-cloudflare
- certbot-dns-cloudxns
- certbot-dns-digitalocean
- certbot-dns-dnsimple
- certbot-dns-dnsmadeeasy
- certbot-dns-google
- certbot-dns-luadns
- certbot-dns-nsone
- certbot-dns-rfc2136
- certbot-dns-route53

目前支持的云服务商还不多
阿里云的话可以使用如下脚本
https://github.com/Neilpang/acme.sh
从云服务商那里获取对应的APIKey，APISecret，填入脚本,具体参考上面地址中的文档。

未完待续。。。
