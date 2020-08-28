---
title: 第一个flutter
date: 2019-07-11 20:16:53
categories: flutter
tags: flutter
---
[Flutter](https://flutter.dev/) is Google’s portable UI toolkit for building beautiful, natively-compiled applications for mobile, web, and desktop from a single codebase.<!--more-->
>Flutter是一个由谷歌开发的开源移动应用软件开发工具包，用于为Android和iOS开发应用，同时也将是Google Fuchsia下开发应用的主要工具

最近看到很多的技术网站都在发Flutter相关的技术文章，所以自己也花时间了解了一下，写了个简单的HelloWorld体验了一下，感觉很不错。简单的记录一下。

###安装
安装环境基于MAC，Windows上也没有太大的区别。
####安装Xcode、Android Stuido
#####Xcode 安装
Xocde 的安装比较简单，直接去App Store搜索就可以了，![示例](WX20190711-203332@2x.png)之后需要打开，会自动的进行相应的配置。
#####Android Studio 安装
[Android Studio官网下载](https://developer.android.com/studio)
![示例](WX20190711-203810@2x.png)
当前版本为3.4.2
配合相关的SDK，然后增加虚拟机![示例](WX20190711-204747@2x.png)
需要注意的是，建议使用API28,28的版本flutter会报错

##### 安装flutter
Flutter在国内访问的速度不太好，访问[Flutter](https://flutter.dev/docs/get-started/install)，进行下载配置，建议使用梯子，推荐使用喵帕斯，可以联系我获取邀请码。

- 增加源站镜像环境变量(使用第三方的包的时候需要用到)

Windows
``` shell
#我的电脑->属性->高级系统设置->高级->环境变量，新建用户环境变量,增加下面两个变量
PUB_HOSTED_URL https://pub.flutter-io.cn 
FLUTTER_STORAGE_BASE_URL https://storage.flutter-io.cn
```

Mac OS
``` shell
~ cd ~/.bash_profile
#增加下面两个环境变量
export PUB_HOSTED_URL=https://pub.flutter-io.cn  
export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
#保存 ,激活生效
source ~/.bash_profile
```
将下载的安装包解压，当前的版本为`1.7`，然后配置环境变量
``` bash
~ vi ~/.bash_profile
#增加如下,根据你实际的位置进行配置
#flutter
export PATH=/Users/xxx/develop/flutter/bin:$PATH
source ~/.bash_profile
#验证
flutter --version
  ╔════════════════════════════════════════════════════════════════════════════╗
  ║ A new version of Flutter is available!                                     ║
  ║                                                                            ║
  ║ To update to the latest version, run "flutter upgrade".                    ║
  ╚════════════════════════════════════════════════════════════════════════════╝


Flutter 1.5.4-hotfix.2 • channel stable • https://github.com/flutter/flutter.git
Framework • revision 7a4c33425d (2 months ago) • 2019-04-29 11:05:24 -0700
Engine • revision 52c7a1e849
Tools • Dart 2.3.0 (build 2.3.0-dev.0.5 a1668566e5)
#提示我更新，我当时安装的是1.5.4,更新完成再次验证，更新会花点时间，使用下面的命令行走代理，或者全局也可以，根据实际情况配置
export https_proxy=http://127.0.0.1:1087;
export http_proxy=http://127.0.0.1:1087;
export all_proxy=socks5://127.0.0.1:1086
#运行doctor 检测配置，第一次安装需要安装额外的几个包，按照提示安装即可
Running flutter doctor...
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.7.8+hotfix.3, on Mac OS X 10.14.5 18F132, locale zh-Hans-CN)
[!] Android toolchain - develop for Android devices (Android SDK version 28.0.3)
    ! Some Android licenses not accepted.  To resolve this, run: flutter doctor --android-licenses
[!] Xcode - develop for iOS and macOS (Xcode 10.2.1)
    ! CocoaPods out of date (1.6.0 is recommended).
        CocoaPods is used to retrieve the iOS and macOS platform side's plugin code that responds to your plugin usage on the Dart side.
        Without CocoaPods, plugins will not work on iOS or macOS.
        For more info, see https://flutter.dev/platform-plugins
      To upgrade:
        brew upgrade cocoapods
        pod setup
[!] iOS tools - develop for iOS devices
    ✗ ios-deploy not installed. To install:
        brew install ios-deploy
[✓] Android Studio (version 3.4)
[!] IntelliJ IDEA Ultimate Edition (version 2019.1.3)
    ✗ Flutter plugin not installed; this adds Flutter specific functionality.
    ✗ Dart plugin not installed; this adds Dart specific functionality.
[!] VS Code (version 1.35.1)
    ✗ Flutter extension not installed; install from
      https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter
[!] Proxy Configuration
    ! NO_PROXY is not set
[!] Connected device
    ! No devices available

! Doctor found issues in 7 categories.

#第一次安装，需要安装下面的包，brew 的使用可用搜我之前发的文章
brew update
brew install --HEAD usbmuxd
brew link usbmuxd
brew install --HEAD libimobiledevice
brew install ideviceinstaller



```

进入flutter的目录
``` shell
~ tree -L 1 
.
├── AUTHORS
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── PATENTS
├── README.md
├── analysis_options.yaml
├── bin
├── dartdoc_options.yaml
├── dev
├── examples
├── flutter_console.bat
├── flutter_root.iml
├── packages
└── version
```
在目录中看到有个`examples-helloworld` 里面有对应的示例，使用Android Studio 打开：
![示例](WX20190711-212257@2x.png),选择对应的模拟器，Android 的和iOS 都可以，也可以使用真机，然后点击右上角运行即可
使用29的API会出现如下错误：
``` log
Error connecting to the service protocol: HttpException: Connection closed before full header was received, uri = http://127.0.0.1:53668/CCQP0ed9oCM=/ws
```
运行后的效果：
![效果](WX20190711-212915@2x.png)

demo比较简单，但是感觉非常的方便，后面有空继续深入学习。


