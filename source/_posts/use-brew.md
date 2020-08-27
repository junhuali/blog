---
title: brew 使用
date: 2020-07-08 11:21:10
categories: Shell
tags: brew
---
记录一下常用的brew 命令 <!--more-->

### brew 常用命令
``` bash
# 查看所有通过 brew 安装的包
brew list

# 查看某个包的信息
brew info (formula)

# 更新 brew
brew update

# 查看需要更新的包(需要先执行 brew update)
brew outdated

# 更新某个或全部包
brew upgrade (formula|--all)

# 查看 brew 安装的服务列表，及当前状态(是否启动)
brew services list

# 启动某个或所有服务
brew services run (formula|--all)

# 启动某个或所有服务(并注册到用户登录/开机自动启动)
brew services start (formula|--all)

# 关闭某个或所有服务
brew services stop (formula|--all)

# 重启某个或所有服务
brew services restart (formula|--all)
```

### Cakebrew

``` bash
brew cask install cakebrew
```

### LaunchRocket

而 LaunchRocket 呢，则是一个帮助管理 Homebrew 安装的服务的软件，比如你使用 Homebrew 安装的 Mysql、Redis、MongoDB，是让它自启动呢，还是手动启动，传统方式需要使用命令行的命令，而使用 LaunchRocket 则可以在图形界面中进行管理了！

``` bash
brew cask install launchrocket
```
