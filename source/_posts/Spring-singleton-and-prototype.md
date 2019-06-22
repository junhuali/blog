---
title: Spring单例和多例
date: 2019-03-25 11:10:00
categories: Java
tags: Spring
---
在面试的时候经常被问到Spring的单例、多例之类的问题，实际上是Bean的作用域问题。当在Spring中声明一个bean时，需要声明bean的作用域。默认是`singleton`。这篇文章主要讨论Spring 单例和多例。
### Spring bean 的作用域(Spring Bean scopes)
作用域 | 描述
:----: | :---:
singleton | 根据Spring IoC容器将单个bean定义范围限定为单个对象实例。
prototype |  将单个bean定义范围限定为任意数量的对象实例。
request |  将单个bean定义范围限定为单个HTTP请求的生命周期;也就是说，每个HTTP请求都有自己的bean实例，它是在单个bean定义的后面创建的。仅在Web-aware的 Spring ApplicationContext的上下文中有效。
session | 将单个bean定义范围限定为HTTP会话的生命周期。仅在Web-aware的Spring ApplicationContext的上下文中有效。
global-session | 将单个bean定义范围限定为全局HTTP会话的生命周期。通常仅在portlet上下文中使用时有效。仅在Web-aware 的Spring ApplicationContext的上下文中有效。
`>` 具体可以查看Spring官方文档 [Spring Doc](https://docs.spring.io/spring/docs/3.0.0.RC2/spring-framework-reference/html/ch03s05.html),有更详细的说明。
####The singleton scope(单例作用域)
默认作用域是始终是 singleton，但是当仅仅需要 bean 的一个实例时，你可以在 bean 的配置文件中设置作用域的属性。
```Java
import lombok.Data;

@Data
public class TestBean {

    private String name;

    public TestBean(String name) {
        this.name = name;
    }
}


```
可以在Application中进行注入
``` Java

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);

    }

   @Bean
   public TestBean getBean() {
       return new TestBean("Hello,singleton!");
   }

}

```
测试
``` Java
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTest {

    @Autowired
    private TestBean testBean;

    @Test
    public void getBean() throws Exception {
        System.out.println(testBean.getName());
    }
}
```
还可以使用 `@Component` 的方式，可以自行实践。

#### The prototype scope(多例作用域)
>The non-singleton, prototype scope of bean deployment results in the creation of a new bean instance every time a request for that specific bean is made. That is, the bean is injected into another bean or you request it through a getBean() method call on the container. As a rule, use the prototype scope for all stateful beans and the singleton scope for stateless beans.

描述了什么时候使用单例、什么时候使用多例。
`@Resource`和`@Autowired`都是做bean的注入时使用，其实@Resource并不是Spring的注解，它的包是javax.annotation.Resource，需要导入，但是Spring支持该注解的注入。

`@Autowired`为Spring提供的注解，需要导入包org.springframework.beans.factory.annotation.Autowired;只按照byType注入。

`@Resource`默认按照ByName自动注入，由J2EE提供，需要导入包javax.annotation.Resource。`@Resource`有两个重要的属性：name和type，而Spring将`@Resource`注解的name属性解析为bean的名字，而type属性则解析为bean的类型。所以，如果使用name属性，则使用byName的自动注入策略，而使用type属性时则使用byType自动注入策略。如果既不制定name也不制定type属性，这时将通过反射机制使用byName自动注入策略。

最常用的是一个接口有多个实现。
``` Java
public interface IPrintService {

    /**
     * 打印字符串
     *
     * @return
     */
    void print();
}

```
打印数字
``` Java
import org.springframework.stereotype.Service;

@Service
public class NumberPrintServiceImpl implements IPrintService {

    @Override
    public void print() {
        System.out.println(1);

    }
}
```
打印字符串
``` Java
import org.springframework.stereotype.Service;

@Service
public class StringPrintServiceImpl implements IPrintService {

    @Override
    public void print() {
        System.out.println("String");

    }
}
```
测试
``` Java
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

    @Test
    public void contextLoads() {
    }

    @Resource(name = "numberPrintServiceImpl")
    private IPrintService numPrintService;

    @Resource(name = "stringPrintServiceImpl")
    private IPrintService strPrintService;


    @Test
    public void print() throws Exception {
        numPrintService.print();
        strPrintService.print();
    }

}
```
通过name来区分`IPrintService`,进行注入。
面试的时候还会考察单例模式的实现，最常见的是懒汉式式、饿汉模式和双重锁等。
