---
title: 搭建一个简单的app分发平台
date: 2019-03-01 13:39:58
categories: Linux
tag: app 分发
---
#### 需求
   app开发的时候需要进行测试，每次频繁的拷贝发送；iOS 的企业包上传到分发平台无法通过，有限制等等，这个时候就需要我们自己有自己的分发平台。Android的apk
比较好解决，比较麻烦的是iOS的分发(主要针对企业包，或者加了uuid的测试包)。第三方分发平台也有第三方的好处，但是自己搭建的更自由。
#### 准备
   - 企业签名过后的ipa包、apk
   - 一个域名
   - 一台服务器
   - 一个https证书
#### 搭建环境
### 搭建一个nginx web 环境
    首先使用nignx搭建一个web环境，web的页面可以自己写，或者抓取第三方的(页面的内容其实简单，主要包括判断是否在微信，如果在微信，提示使用浏览器打开)。
大家一般都是使用微信的扫一扫
### 获取apk、ipa、plist、iOS app icon文件公网地址
    配置好域名解析、对应的nginx文件配置后，得到apk、ipa、plist、icon四个文件的下载地址。
    `https://xxxx.xxxx.com/xxx.apk`
    `https://xxxx.xxxx.com/xxx.ipa`
    `https://xxxx.xxxx.com/xxx.plist`
    `https://xxxx.xxxx.com/xxx.png`

### 配置plist文件的内容
``` plist 文件
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>items</key>
  <array>
    <dict>
      <key>assets</key>
      <array>
        <dict>
          <key>kind</key>
          <string>software-package</string>
          <key>url</key>
          <string>https://xxx.xxx.com/download/xxx.ipa</string>
        </dict>
        <dict>
          <key>kind</key>
          <string>display-image</string>
          <key>needs-shine</key>
          <true/>
          <key>url</key>
          <string>https://xxx.xxx.com/img/xxx.png</string>
        </dict>
      </array>
      <key>metadata</key>
      <dict>
        <key>bundle-identifier</key>
        <string>io.xxx.xxx</string>
        <key>bundle-version</key>
        <string>1.0</string>
        <key>kind</key>
        <string>software</string>
        <key>subtitle</key>
        <string>xxx</string>
        <key>title</key>
        <string>xxx</string>
      </dict>
    </dict>
  </array>
</dict>
</plist>

```
需要修改`software-package`、`display-image` 、`subtitle`、`title`
`software-package` 使用 `https://xxxx.xxxx.com/xxx.ipa` 的地址
### 配置地址
在下载页面配置`apk`下载地址以及`plist`地址，这里需要注意，由于iOS 的安全机制，plist文件需要使用https地址，否则会导致ipa 文件无法正常安装。
### 总结
主要配置的其实就是iOS 的下载所需的plist文件，以及https访问，如果这两个地方出错，会导致ipa 下载正常，确无法正常安装。
