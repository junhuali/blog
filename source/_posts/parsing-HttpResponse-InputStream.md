---
title: 解析HttpResponse InputStream 乱码问题
date: 2020-09-29 15:09:52
categories: Java
tag: http
---
### 问题
最近在进行系统迁移，从Rancher迁移到Kubernets,前端使用了swagger-vue进行代码生成，后端的有个服务代理服务进行适配和转发，结果迁移后访问乱码。<!-- more -->
### 排查

```java
    @Override
    public Object run() {
    RequestContext context = getCurrentContext();
    final String requestURI = context.getRequest().getRequestURI();
    InputStream stream = context.getResponseDataStream();
    String body = null;
    try {
        body = StreamUtils.copyToString(stream, Charset.forName("UTF-8"));
        log.info("response-body:{}", body);

        ......

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

```
body中的内容乱码，因为服务经过了ingress的转发，怀疑ingress做了额外的操作导致的。
经过定位发现是开启了gzip导致的
### 增加gzip 解码 以及压缩

```java
 //判断是否进行gzip
 if (context.getResponseGZipped()) {
                GZIPInputStream gzipInputStream = new GZIPInputStream(stream);
                body = StreamUtils.copyToString(gzipInputStream, Charset.forName("UTF-8"));
    } else {
                body = StreamUtils.copyToString(stream, Charset.forName("UTF-8"));
            }
 //如果进行了压缩，返回的时候也需要进行压缩，否则会抛出异常           
if (context.getResponseGZipped()) {
    ByteArrayOutputStream bos = new ByteArrayOutputStream(body.length());
    GZIPOutputStream gzip = new GZIPOutputStream(bos);
    gzip.write(body.getBytes("UTF-8"));
    gzip.close();
    byte[] compressed = bos.toByteArray();
    bos.close();
    context.setResponseDataStream(new ByteArrayInputStream(compressed));
}else{
    ontext.setResponseBody(body);
}

```
### 总结
通过上面的方式，对直接请求做了兼容，也支持gzip压缩，提升了程序的稳定性。




