---
title: Feign表单提交
date: 2019-06-12 16:29:26
categories: Java
tags: Feign
---
### Feign 表单提交
Feign在正常调用的时候，一般都是基于`application/json`的方式进行传输数据的，但是有时候我们内部调用的服务是基于`表单提交`的，默认使用的`JSON`提交。所以就需要对请求进行改造。

#### 默认JSON 提交
``` java
@FeignClient(name = "xxx", url = "xxx")
public interface FeignClient {

    /**
     * xxx
     *
     * @param xxx
     * @return
     * @throws Exception
     */
    @PostMapping(value ="xxx")
    Object getXxxInfo(@RequestBody xxxReq xxxReq) throws Exception;
}


```
上面的就是默认的方式
#### 表单提交
使用表单的情况下，需要引入两个jar，使用maven 进行添加
``` xml
        <dependency>
            <groupId>io.github.openfeign.form</groupId>
            <artifactId>feign-form</artifactId>
            <version>3.3.0</version>
        </dependency>
        <dependency>
            <groupId>io.github.openfeign.form</groupId>
            <artifactId>feign-form-spring</artifactId>
            <version>3.3.0</version>
        </dependency>
```
定义表单解码器
``` java


import feign.Logger;
import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 * @author
 * @date 2019-06-11 15:48
 */
@Component
public class FormSupportConfig {
    @Autowired
    private ObjectFactory<HttpMessageConverters> messageConverters;

    /**
     * new一个form编码器，实现支持form表单提交
     *
     * @return
     */
    @Bean
    public Encoder feignFormEncoder() {
        return new SpringFormEncoder(new SpringEncoder(messageConverters));
    }


    /**
     * 开启Feign的日志
     *
     * @return
     */
    @Bean
    public Logger.Level logger() {
        return Logger.Level.FULL;
    }
}
```
使用
``` java
import feign.Response;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

/**
 * @author xxx
 * @date 2019-05-25 19:35
 */

@FeignClient(name = "ucd", url = "${xxx}", configuration = FormSupportConfig.class)
public interface PayClient {


    /**
     * xxx
     *
     * @param queryParam
     * @return
     * @throws Exception
     */
    @PostMapping(value = "/xxx/xxx", consumes = {MediaType.APPLICATION_FORM_URLENCODED_VALUE}, produces = {MediaType.ALL_VALUE})
    @ResponseBody
    Response payRequest(Map<String, ?> queryParam) throws Exception;


}
```
上面定义的接收使用Response，有时候我们需要验证签名的时候，sign一般在header中，如果直接使用对象接收，就没有办法进行签名验证，使用Response进行接收,通过`response.body().asReader() `方法取出body中的内容再进行处理。
