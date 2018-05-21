---
title: npm 更换源
date: 2018-05-03 10:17:09
categories: Linux
tags: Node
---
由于npm的源在国外，所以有时候使用起来，会碰到速度极慢的情况，好在一些公司做了源的同步，可以使用这些源来达到加速下载，减少等待时间。

### 换源
- 临时使用
``` bash
npm --registry https://registry.npm.taobao.org install express --save
```
- 持久使用
``` bash
npm config set registry https://registry.npm.taobao.org
```
- 验证
``` bash
npm config get registry
```
- 官方源
``` bash
npm config set registry https://registry.npmjs.org/
```

### 通过 nrm 更换源
最近在工作的时候，发现淘宝的源，无法正常下载，于是需要换其他的源，在网上找源的过程中，发现了`nrm -- NPM registry manager`，它可以帮你快速的帮你在不同的源之间切换，现在包括`npm`、`cnpm`、`taobao`、`nj(nodejitsu)`、`rednpm`，还可以加入你自己的私有源。

- 安装
``` shell
npm install -g nrm
```
- 例子
``` bash
$ nrm ls
* npm -----  https://registry.npmjs.org/
  cnpm ----  http://r.cnpmjs.org/
  taobao --  https://registry.npm.taobao.org/
  nj ------  https://registry.nodejitsu.com/
  rednpm -- http://registry.mirror.cqupt.edu.cn
  skimdb -- https://skimdb.npmjs.com/registry
# 使用
$ nrm use cnpm  #switch registry to cnpm Registry has been set to: http://r.cnpmjs.org/
```

通过nrm换源，体验一下就提升了很多，工作更有效率了。
