---
title: Java 常量字符串过长
date: 2019-04-29 20:44:56
categories: Java
tag: String
---
### 问题出现
  在IDEA中，字符串长度超过65535，进行打印，IDEA会提示`java: 常量字符串过长`。使用javac 进行编译也会有类似的提示
### 解决办法
#### 使用StringBuilder
``` Java
StringBuilder sb = new StringBuilder();
sb.append(文本的一半);
sb.append(文本剩下的一半);
String str = sb.toString();
String[] parts = str.split(",");
System.out.println(parts.length);
```
创建了一个对象，会根据实际的存储的内容分配内存，不会受到String在常量池中最大长度的限制

``` Java
StringBuilder sb = new StringBuilder(100000); //容量初始化的时候可以写大一点，减少扩容次数
sb.append(文本的一半);
sb.append(文本剩下的一半);
String str = sb.toString();
String[] parts = str.split(",");
System.out.println(parts.length);
```

使用StringBuilder解析大文本和大JSON的时候回非常有用
