---
title: lightsail使用root用户登录
categories: Linux
tag: Linux
---
在使用AWS云的时候，使用私钥登录，但是登录的用户权限是普通用户，个人使用的时候有很多的不变，通过下面的方法可以修改为root权限登录。<!--more-->
在创建服务器的时候，选择增加脚本：
``` shell
#!/bin/bash
echo root:123456 |sudo chpasswd root
sudo sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/g' /etc/ssh/sshd_config;
sudo sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/g' /etc/ssh/sshd_config;
sudo reboot
```
需要注意的：
   root: 后面的部分需要修改为你自己的密码，如果你的服务器已经创建，可以建一个`login.sh`文件，将上面的脚本粘贴进去，然后执行`chmod +x login.sh`
   ,`sh login`,之后服务器会重启，然后就可以尝试使用密码登录了，之前使用普通用户ssh 登录，也可以将用户名改为root进行登录。
