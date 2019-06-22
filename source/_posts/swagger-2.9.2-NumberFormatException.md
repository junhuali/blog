---
title: swagger2.9.2的NumberFormatException
date: 2019-05-20 16:00:45
categories: Java
tags: Swagger2
---
SpringCloud、Swagger2.9.2版本,在访问swagger首页的时候，控制台报错。具体错误如下:<!-- more -->
``` java
[ WARN ] [2019-05-20 16:39:47] [http-nio-8080-exec-6] i.s.m.p.AbstractSerializableParameter [421]  - Illegal DefaultValue 0 for parameter type integer
java.lang.NumberFormatException: For input string: ""
	at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
	at java.lang.Long.parseLong(Long.java:601)
	at java.lang.Long.valueOf(Long.java:803)
	at io.swagger.models.parameters.AbstractSerializableParameter.getExample(AbstractSerializableParameter.java:412)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
  .....
```
可以看到是在`Long.parseLong()`转换的时候报错了
### 解决办法
试了网上说的增加默认值，但是在我本地没有生效
``` java
@ApiModelProperty(value = "id",example = "123")
```
第二种方法
pom中增加新的依赖
``` xml
     # 默认的配置
           <dependency>
               <groupId>io.springfox</groupId>
               <artifactId>springfox-swagger-ui</artifactId>
               <version>2.9.2</version>
           </dependency>

           <dependency>
               <groupId>io.springfox</groupId>
               <artifactId>springfox-swagger2</artifactId>
               <version>2</version>
           </dependency>
    # 增加两个配置
           <dependency>
               <groupId>io.swagger</groupId>
               <artifactId>swagger-annotations</artifactId>
               <version>1.5.22</version>
           </dependency>
           <dependency>
               <groupId>io.swagger</groupId>
               <artifactId>swagger-models</artifactId>
               <version>1.5.22</version>
           </dependency>
```
增加上面的配置后，就不再报错了。
#### 原因
1.5.20的源码，判断如下：
``` java
@JsonProperty("x-example")
   public Object getExample() {
       if (this.example == null) {
           return null;
       } else {
           try {
               if ("integer".equals(this.type)) {
                   return Long.valueOf(this.example);
               }

               if ("number".equals(this.type)) {
                   return Double.valueOf(this.example);
               }

               if ("boolean".equals(this.type) && ("true".equalsIgnoreCase(this.example) || "false".equalsIgnoreCase(this.defaultValue))) {
                   return Boolean.valueOf(this.example);
               }
           } catch (NumberFormatException var2) {
               LOGGER.warn(String.format("Illegal DefaultValue %s for parameter type %s", this.defaultValue, this.type), var2);
           }

           return this.example;
       }
   }
```
1.5.22 的源码，判断如下：
``` java
@JsonProperty("x-example")
    public Object getExample() {
        if (this.example != null && !this.example.isEmpty()) {
            try {
                if ("integer".equals(this.type)) {
                    return Long.valueOf(this.example);
                }

                if ("number".equals(this.type)) {
                    return Double.valueOf(this.example);
                }

                if ("boolean".equals(this.type) && ("true".equalsIgnoreCase(this.example) || "false".equalsIgnoreCase(this.defaultValue))) {
                    return Boolean.valueOf(this.example);
                }
            } catch (NumberFormatException var2) {
                LOGGER.warn(String.format("Illegal DefaultValue %s for parameter type %s", this.defaultValue, this.type), var2);
            }

            return this.example;
        } else {
            return this.example;
        }
    }
```
从上面的代码可以看出对example的判断是不同的，增加了当example为空的时候，直接返回example，所以不会再报错。
