---
title: MacOS git clone 错误
date: 2021-03-01 13:54:45
categories: Shell
tags: MacOS
---
### 起因
使用`git clone`的时候，提示`xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun` 错误<!--more-->

### 解决办法
重装xcode command line
``` bash
xcode-select --install
```


