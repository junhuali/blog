---
title: okhttp3-proxy-auth (okhttp3 http 代理鉴权)
date: 2018-08-30 19:17:14
categories: Java
tag: okhttp
---
因为种种原因，没有按时写博客，最近准备把博客重新拾起来。
最近在写一个项目，使用到了okhttp的代理，因为使用的代理是付费的，所以需要鉴权。在使用的过程中碰到了一些问题所以记录一下<!-- more -->

默认的okhttp代理鉴权如下：
``` Java
import okhttp3.*;

import java.io.IOException;
import java.net.Authenticator;
import java.net.InetSocketAddress;
import java.net.PasswordAuthentication;
import java.net.Proxy;
import java.util.concurrent.TimeUnit;

public class ProxyTest {
    public static void main(String[] args) {
        String url = "https://www.baidu.com";
        //设置socks代理服务器ip端口
        Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 1086));
        Authenticator.setDefault(new Authenticator()
        {
            private PasswordAuthentication authentication = new PasswordAuthentication("username", "password".toCharArray());
            @Override
            protected PasswordAuthentication getPasswordAuthentication()
            {
                return authentication;
            }
        });


        OkHttpClient client = new OkHttpClient().newBuilder().
                connectTimeout(120, TimeUnit.SECONDS).readTimeout(120, TimeUnit.SECONDS).proxy(proxy)
                // 解决内存溢出问题
                .connectionPool(new ConnectionPool(5, 1, TimeUnit.SECONDS)).build();
        Request build = new Request.Builder()
                .url(url)
                .build();

        Response response = null;

        client.newCall(build).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) {
                    throw new IOException("服务器端错误: " + response);
                }
                System.out.println(response.body().string());
            }
        });
    }
}
```
但是试了一下发现会报错,代理鉴权失败
``` log
java.io.IOException: Failed to authenticate with proxy
	at okhttp3.internal.connection.RealConnection.createTunnel(RealConnection.java:401)
	at okhttp3.internal.connection.RealConnection.connectTunnel(RealConnection.java:218)
	at okhttp3.internal.connection.RealConnection.connect(RealConnection.java:159)
	at okhttp3.internal.connection.StreamAllocation.findConnection(StreamAllocation.java:257)
	at okhttp3.internal.connection.StreamAllocation.findHealthyConnection(StreamAllocation.java:135)
	at okhttp3.internal.connection.StreamAllocation.newStream(StreamAllocation.java:114)
	at okhttp3.internal.connection.ConnectInterceptor.intercept(ConnectInterceptor.java:42)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
	at okhttp3.internal.cache.CacheInterceptor.intercept(CacheInterceptor.java:93)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
	at okhttp3.internal.http.BridgeInterceptor.intercept(BridgeInterceptor.java:93)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
	at okhttp3.internal.http.RetryAndFollowUpInterceptor.intercept(RetryAndFollowUpInterceptor.java:126)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:147)
	at okhttp3.internal.http.RealInterceptorChain.proceed(RealInterceptorChain.java:121)
	at okhttp3.RealCall.getResponseWithInterceptorChain(RealCall.java:200)
	at okhttp3.RealCall$AsyncCall.execute(RealCall.java:147)
	at okhttp3.internal.NamedRunnable.run(NamedRunnable.java:32)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)
	at java.lang.Thread.run(Thread.java:748)
```
于是采用另外一种方式
``` Java
import okhttp3.*;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.util.concurrent.TimeUnit;

public class ProxyTest {
    public static void main(String[] args) {

        String url = "https://www.baidu.com";
        final String username = "username";
        final String password = "password";

        Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", 1086));

        Authenticator proxyAuthenticator = new Authenticator() {
            @Override
            public Request authenticate(Route route, Response response) throws IOException {
                String credential = Credentials.basic(username, password);
                return response.request().newBuilder()
                        .header("Proxy-Authorization", credential)
                        .build();
            }
        };


        OkHttpClient client = new OkHttpClient().newBuilder().
                connectTimeout(120, TimeUnit.SECONDS).readTimeout(120, TimeUnit.SECONDS).proxy(proxy)
                .proxyAuthenticator(proxyAuthenticator)
                // 解决内存溢出问题
                .connectionPool(new ConnectionPool(5, 1, TimeUnit.SECONDS)).build();
        Request build = new Request.Builder()
                .url(url)
                .build();

        Response response = null;

        client.newCall(build).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (!response.isSuccessful()) {
                    throw new IOException("服务器端错误: " + response);
                }
                System.out.println(response.body().string());
            }
        });
    }
}
```

通过将用户名和密码增加到header中的这种方式解决,不过通过引入的包，还是能够看出第一种用的是java.net 包中的鉴权方式，应该是跟okhttp的鉴权方式有区别导致的
