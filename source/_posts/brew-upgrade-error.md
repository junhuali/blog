---
title: brew 升级应用错误
date: 2018-05-03 11:01:00
categories: Shell
tags: Brew
---
定期升级电脑上的应用，是个好习惯，避免在需要使用的时候，出现各种莫名其妙的问题。
### brew 升级
最近在使用`brew upgrade` 的过程中，碰到了一个问题记录一下。
``` shell
Error: An unexpected error occurred during the `brew link` step
The formula built, but is not symlinked into /usr/local
Permission denied @ dir_s_mkdir - /usr/local/Frameworks
Error: Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```
如上所示，需要创建`/usr/local/Frameworks` 目录，但是没有对应的权限

### 解决方法
``` Shell
 sudo mkdir /usr/local/Frameworks
 sudo chown $(whoami):admin /usr/local/Frameworks
```
手动创建，赋权，之后就可以愉快的` brew upgrade` 了。


最后`brew cleanup` 清理废弃的文件，释放空间。
