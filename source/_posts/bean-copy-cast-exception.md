---
title: BeanUtils.copyProperties() 造成的  java.lang.classcastexception 记录
date: 2020-10-20 14:28:45
tags: JDK
categories: JAVA
---
平常开发的时候，经常会使用BeanUtils.copyProperties()进行对象的拷贝，今天在项目中使用的时候出现了`java.lang.classcastexception`,发现是因为对象中的泛型导致的，只能进行基本类型的拷贝。<!--more-->

### 代码示例
```java
@Data
public class A {
    private String name;
}

@Data
public class B {
    private String name;
}

@Data
public class BeanA {
    List<A> a;
}

@Data
public class BeanB {
    List<B> a;
}

 public static void main(String[] args) {
        BeanA beanA = new BeanA();
        List<A> aList = new ArrayList<>();
        A a = new A();
        a.setName("测试名称");
        aList.add(a);
        beanA.setA(aList);
        BeanB beanB = new BeanB();
        BeanUtils.copyProperties(beanA, beanB);
        log.info(beanB.getA().get(0).getName());
    }
```

当进行`beanB.getA().get(0).getName()` 调用的时候，会报错：
``` java
Exception in thread "main" java.lang.ClassCastException: com.example.demo.A cannot be cast to com.example.demo.B
	at com.example.demo.Test.main(Test.java:28)
```

### 解决方法
解决上面的方法有两种，一种是将对象取出后，然后重新set封装进行复制，这样一般适合参数较少的时候。另外一种就是使用fastjson进行转换。

```
//使用fastjson进行转换
public static void main(String[] args) {
        BeanA beanA = new BeanA();
        List<A> aList = new ArrayList<>();
        A a = new A();
        a.setName("测试名称");
        aList.add(a);
        beanA.setA(aList);
        String jsonStr = JSON.toJSONString(beanA);
        BeanB beanB = JSON.parseObject(jsonStr,BeanB.class);
        log.info(beanB.getA().get(0).getName());
    }
```

通过上面的方法就能避免java.lang.classcastexception的错误了。