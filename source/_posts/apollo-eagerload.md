---
title: apollo 配置提前加载
date: 2019-05-18 10:00:11
categories: Java
tag: Apollo、Feign
---
#### 碰到的问题
项目基于SpringCloud+Apollo配置中心，在开发阶段，Feign远程调用的时候url是写死的，但是提测后，需要进行灵活配置，所以使用了占位符，发现`${}`没有生效。
导致请求调用的时候出错。
#### 解决过程
首先是检查配置是否正确，请求的代码示例如下：
``` Java
@FeignClient(name = "xxx", url = "${xxx}")
public interface FeignClientService {
    /**
     * 获取实体列表
     *
     * @param xxx xxx
     * @return
     * @throws Exception
     */
    @GetMapping("/xxx/xxx/xxx")
    FeignResp<EntityListVO> getEntityList(@RequestParam(value = "xxx") String xxx) throws Exception;
```
当url使用固定时，可以正常的解析出请求的url，使用`${}`没有生效。
这个时候查询了Apollo的文档[Java客户端使用指南3.2.1.3SpringBoot集成方式]("https://github.com/ctripcorp/apollo/wiki/Java%E5%AE%A2%E6%88%B7%E7%AB%AF%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97#3213-spring-boot%E9%9B%86%E6%88%90%E6%96%B9%E5%BC%8F%E6%8E%A8%E8%8D%90")

>Spring Boot除了支持上述两种集成方式以外，还支持通过application.properties/bootstrap.properties来配置，该方式能使配置在更早的阶段注入，比如使用@ConditionalOnProperty的场景或者是有一些spring-boot-starter在启动阶段就需要读取配置做一些事情（如dubbo-spring-boot-project），所以对于Spring Boot环境建议通过以下方式来接入Apollo(需要0.10.0及以上版本）。
从1.2.0版本开始，如果希望把日志相关的配置（如logging.level.root=info或logback-spring.xml中的参数）也放在Apollo管理，那么可以额外配置apollo.bootstrap.eagerLoad.enabled=true来使Apollo的加载顺序放到日志系统加载之前，不过这会导致Apollo的启动过程无法通过日志的方式输出(因为执行Apollo加载的时候，日志系统压根没有准备好呢！所以在Apollo代码中使用Slf4j的日志输出便没有任何内容)，更多信息可以参考PR 1614。参考配置示例如下：
     # will inject 'application' namespace in bootstrap phase
     apollo.bootstrap.enabled = true
     # put apollo initialization before logging system initialization
     apollo.bootstrap.eagerLoad.enabled=true

增加了如上的配置后，发现仍然没有作用，然后检查了Apollo的版本，发现版本的`1.1.0`，这个时候内心是崩溃的，因为配置中心是公司统一使用的，所以没有办法随便升级，只能自己想办法了。
#### 解决方式
没办法在Springboot启动前加载，可以尝试手动加载。
``` Java
import com.ctrip.framework.apollo.ConfigService;

public class ClientUrlConfig {
    public void init() {
        this.initSet("此处写你需要提前初始化的key");
    }
    private void initSet(String... keys) {
        for (String key : keys) {
            String val = ConfigService.getAppConfig().getProperty(key, null);
            System.setProperty(key, val);
        }
    }
}
```

然后在`SpringApplication.run()` 之前加载
``` java
public static void main(String[] args) {
       new ClientUrlConfig().init();
       SpringApplication.run(Application.class, args);
   }
```
通过在启动前将配置注入，`${}` 就可以获取到正确的链接了。
