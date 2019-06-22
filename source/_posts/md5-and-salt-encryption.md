---
title: MD5、SALT加密浅析
date: 2018-11-06 11:35:06
categories: Linux
tag: 加密
---
密码的保存是开发的过程中必不可少的一部分，通常我们一般使用MD5加密，来对密码安全进行简单的加强，但是只是使用MD5进行加密，如果密码相同，MD5值就会一样，
通过一些在线的MD5解析网站的解析，密码大概率就会被解析出来，使用相同密码的人，也会受到影响。通过“加盐” ，可以提高密码被破解的难度。<!-- more -->

### 什么是`Salt`盐
> 盐（Salt），在密码学中，是指在散列之前将散列内容（例如：密码）的任意固定位置插入特定的字符串。这个在散列中加入字符串的方式称为“加盐”。其作用是让加盐后的散列结果和没有加盐的结果不相同，在不同的应用情景中，这个处理可以增加额外的安全性。

>在大部分情况，盐是不需要保密的。盐可以是随机产生的字符串，其插入的位置可以也是随意而定。如果这个散列结果在将来需要进行验证（例如：验证用户输入的密码），则需要将已使用的盐记录下来。

### Java 实现MD5加密
``` Java
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class JavaImplMD5 {
    public static void main(String[] args) {
        String numStr = "123456";
        String result = getMD5(numStr);
        System.out.println(result);
    }


    public final static String getMD5(String str) {
        try {
            //创建具有指定算法名称的摘要
            MessageDigest md = MessageDigest.getInstance("MD5");
            //使用指定的字节数组更新摘要
            md.update(str.getBytes());
            //进行哈希计算并返回一个字节数组
            byte mdBytes[] = md.digest();
            String hash = "";
            //循环字节数组
            for (int i = 0; i < mdBytes.length; i++) {
                int temp;
                //如果有小于0的字节,则转换为正数
                if (mdBytes[i] < 0)
                    temp = 256 + mdBytes[i];
                else
                    temp = mdBytes[i];
                if (temp < 16)
                    hash += "0";
                //将字节转换为16进制后，转换为字符串
                hash += Integer.toString(temp, 16);
            }
            return hash;
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```
结果如下：
``` shell
e10adc3949ba59abbe56e057f20f883e
```
去MD5解码网站，很容易得到加密的内容是`123456`

### Guava 实现MD5加密
Guava 工程包含了若干被Google的 Java项目广泛依赖 的核心库，包含了一些常用工具类的实现。
导入maven 包
``` xml
     <dependency>
        <groupId>com.google.guava</groupId>
        <artifactId>guava</artifactId>
        <version>27.0-jre</version>
        <type>bundle</type>
     </dependency>
```
``` Java
import com.google.common.hash.HashCode;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;

import java.nio.charset.Charset;

public class GuavaImplMD5 {
    public static void main(String[] args) {
        String numStr = "123456";
        HashFunction hf = Hashing.md5();
        HashCode hc = hf.newHasher().putString(numStr, Charset.defaultCharset()).hash();
        System.out.println(hc);
    }
}
```
结果跟上面相同，但是`md5()` 的这个方法代码中标记弃用了。推荐使用新的方法
代码的量少了很多，不需要自己做过多的处理。

###  加盐处理

``` Java
import com.google.common.hash.HashCode;
import com.google.common.hash.HashFunction;
import com.google.common.hash.Hashing;

import java.nio.charset.Charset;

public class GuavaImplMD5 {

    private static final String SALT = "0fdfa5e5a88bedae440a9d8ae7c84708";

    public static void main(String[] args) {
        String numStr = "123456";
        System.out.println(getMD5WithSalt(numStr));
    }

    public static String getMD5(String numStr) {
        HashFunction hf = Hashing.md5();
        HashCode hc = hf.newHasher().putString(numStr, Charset.defaultCharset()).hash();
        return hc.toString();
    }

    public static String getMD5WithSalt(String numStr) {
        return getMD5(getMD5(numStr) + SALT);
    }
}

```

这样就会得到不一样的MD5值，不太容易破解密码，但是使用了同样的salt，还是会出现一样的MD5结果，所以最好每个人都能有不同的salt，提高安全性。
