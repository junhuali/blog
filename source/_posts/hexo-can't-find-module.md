---
title: Cannot find module './build/Release/DTraceProviderBindings'
date: 2017-09-30 18:03:00
categories: Linux
tag: hexo
---
有时候安装完hexo后， 执行命令的时候总是报错，但是不影响程序运行，但是。。。会逼死处女座，O(∩_∩)O哈哈~_) <!-- more -->
报错如下：
``` log
{ Error: Cannot find module './build/Release/DTraceProviderBindings'
    at Function.Module._resolveFilename (module.js:527:15)
    at Function.Module._load (module.js:476:23)
    at Module.require (module.js:568:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/Users/xxx/Dropbox/hexo/node_modules/dtrace-provider/dtrace-provider.js:18:23)
    at Module._compile (module.js:624:30)
    at Object.Module._extensions..js (module.js:635:10)
    at Module.load (module.js:545:32)
    at tryModuleLoad (module.js:508:12)
    at Function.Module._load (module.js:500:3)
    at Module.require (module.js:568:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/Users/xxx/Dropbox/hexo/node_modules/bunyan/lib/bunyan.js:79:18)
    at Module._compile (module.js:624:30)
    at Object.Module._extensions..js (module.js:635:10)
    at Module.load (module.js:545:32)
    at tryModuleLoad (module.js:508:12)
    at Function.Module._load (module.js:500:3)
    at Module.require (module.js:568:17)
    at require (internal/module.js:11:18)
    at Object.<anonymous> (/Users/xxx/Dropbox/hexo/node_modules/hexo-log/lib/log.js:3:14)
    at Module._compile (module.js:624:30) code: 'MODULE_NOT_FOUND' }
INFO  Deleted database.
```
上面的错误看的非常的影响心情有木有？

找了网上的很多方法，最后选择了一种比较粗暴的方法
删除hexo目录下的`node_modules`目录，之后执行以下命令：
``` shell
npm install --registry=https://registry.npm.taobao.org
```
然后执行hexo server，就会惊喜的发现错误没有了 O(∩_∩)O~~_)
