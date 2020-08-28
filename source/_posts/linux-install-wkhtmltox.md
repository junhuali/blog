---
title: Linux 安装 wkhtmltopdf
date: 2020-07-28 17:02:46
categories: Linux
tag: wkhtmltox
---
最近在e签宝相关的开发，需要将html生成pdf，查找了一下常规的方案，有itext（html2pdf),wkhtmltopdf等。使用freemarker等。最后选择使用wkhtmltopdf（不需要关心字体之类的配置）。生产部署的时候需要安装在服务器。<!--more-->
```
#下载 下载页面https://wkhtmltopdf.org/downloads.html
wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6-1/wkhtmltox-0.12.6-1.centos7.x86_64.rpm
rpm -ivh wkhtmltox-0.12.6-1.centos7.x86_64.rpm
```

安装的过程中可能会提示报错，安装对应的依赖
```
#安装相关依赖(根据rpm 安装的时候的提示进行安装)
yum install -y openssl fontconfig freetype libpng libjpeg libX11 libXext libXrender xorg-x11-fonts-Type1 xorg-x11-fonts-75dpi
#再次安装
rpm -ivh wkhtmltox-0.12.6-1.centos7.x86_64.rpm
#检查安装是否成功
wkhtmltopdf -V
```
使用java开发，可以使用下面的jar，操作起来更加的方便
```
# https://github.com/jhonnymertz/java-wkhtmltopdf-wrapper
<dependency>
    <groupId>com.github.jhonnymertz</groupId>
    <artifactId>java-wkhtmltopdf-wrapper</artifactId>
    <version>1.1.12-RELEASE</version>
</dependency>
```

在后续的上线中，发现在Linux容器中，生成合同的时候会产生乱码，查询相关文档，发现还是需要添加字体。
下载[simsun字体](simsun.ttc),将文件复制到linux服务器`/usr/share/fonts/` 中。



