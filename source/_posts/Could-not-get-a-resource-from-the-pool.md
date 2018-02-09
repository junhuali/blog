---
title: Redis连接池连接没有正常释放报错
date: 2017-09-23 15:56:45
categories: Java
tag: Redis
---


``` log
 Caused by: redis.clients.jedis.exceptions.JedisException: Could not get a resource from the pool
	at redis.clients.util.Pool.getResource(Pool.java:51)
	at redis.clients.jedis.JedisPool.getResource(JedisPool.java:226)
	at redis.clients.jedis.JedisPool.getResource(JedisPool.java:16)
	at org.springframework.data.redis.connection.jedis.JedisConnectionFactory.fetchJedisConnector(JedisConnectionFactory.java:194)
	... 71 common frames omitted


```

前几天在线上碰到了一个奇怪的问题，jedis 突然无法从连接池取到资源，经过排查发现是因为使用分布式锁的时候,没有释放资源

### redisTemplate 和 jedis 不同

redisTemplate 自己实现了资源的释放，不需要像jedis一样手动释放

``` Java
public boolean setNX(final String key, final String value) throws RedisException {
        return redisTemplate.execute(new RedisCallback<Boolean>() {
            @Override
            public Boolean doInRedis(RedisConnection redisConnection) throws DataAccessException {
                return redisConnection.setNX(key.getBytes(), value.getBytes());
            }
        });
    }

```
所以实现分布式锁的时候需要调用`redisTemplate.execute` 让 `redisTemplate` 帮我们释放资源，具体的可以看redisTemplate 的源码。
