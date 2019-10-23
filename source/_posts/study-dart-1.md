---
title: 初识Dart(一)
date: 2019-07-15 20:06:52
categories: Dart
tags: Dart
---
2011 年 10 月，在丹麦召开的 GOTO 大会上，Google 发布了一种新的编程语言 Dart。如同 Kotlin 和 Swift 的出现，分别是为了解决 Java 和 Objective-C 在编写应用程序的一些实际问题一样，Dart 的诞生正是要解决 JavaScript 存在的、在语言本质上无法改进的缺陷。<!--more-->

不过因为Node的出现，JavaScript得到了告诉的发展了，Dart并没有流行起来，不过因为Flutter的出现，Dart迎来了自己的第二春。

学习语言的第一件事情就是准备一个环境，在[repl](https://repl.it/languages/dart)新建一个`main.dart`文件

### 范例，hello world

```` dart
void main() {
    print('Hello World!');
}
```
点击`run`
可以看到右边打印出来内容
``` shell
Dart VM version: 2.2.0 (Unknown timestamp) on "linux_x64"
> run-project
Hello World!
```
Dart 也是用main做函数的入口的，跟Java很像。

### Dart的变量与类型
#### Dart的基本内置类型有：
* Numbers
* Strings
* Booleans
* Lists
* Sets
* Maps
* Runes
* Symbols

`Numbers`有两种子类（int 和 double）
`Strings`跟我们平常用的String没有什么区别
`Booleans`是类型安全的，意味着我们不能使用if (nonbooleanValue) or assert (nonbooleanValue) 这样的代码去判断，而应该显示的检查
`Lists`在Dart中，数组是List对象，因此大多数人只是将它们称为列表。
`Sets`无序集合
`Maps`key和value可以是任何类型
`Runes`UTF-32字符串
`Symbols`开发中基本上用不上
#### 常量
* const 表示常量在编译期能确定的值
* final 在运行时确定，一旦确定不可变更
还有一些流程控制语法，各个语言基本上大同小异，可以参考[官方文档}(https://dart.dev/guides/language),学习语言的过程比较重要的就是练习，多写，多思考，就会有进步。
