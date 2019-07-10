---
title: 使用模拟时间在Docker 中进行测试
date: 2019-07-02 20:49:48
categories: Java
tag: Docker
---
在测试应用程序时，定义假系统时钟以执行使用日期和时间的代码通常很有用。虽然总是可以直接更改系统时钟，但许多人认为这种风格是不受欢迎的：
- 它会影响计算机上运行的所有程序，而不仅仅是正在测试的应用程序
- 反复更改系统时钟可能既费时又麻烦
<!--More-->
您可以为您的应用定义一个假系统时钟，而不是更改系统时钟。 在生产中，假系统时钟返回正常时间。 在测试过程中，伪造的系统时钟会在您需要有效测试覆盖时随时返回。

为此，您需要定义各种不同的时钟实现，并能够轻松交换它们。 许多人会选择使用依赖注入工具，或者使用插件机制。
为此，您必须永远不要直接引用默认系统时钟和时区，避免使用以下方法：

- System.currentTimeMillis()
- LocalDateTime.now() (或者类似的)
- Date类的默认构造函数（后者又使用System.currentTimeMillis（））

这需要一些规则，因为许多代码示例使用默认系统时钟（和时区），并且因为调用上述方法已成为习惯。
假时钟的可能行为包括：
- 跳到未来
- 回到过去
- 使用固定日期和固定时间
- 使用固定日期，但仍然让时间变化
- 每次看到时钟时都会增加一秒钟
- 通过加速或减慢某个因素来改变时间的流逝率
- 使用正常的系统时钟而无需改动

根据您的需要，您可能必须在部分或全部这些地方使用假系统时钟：

- 应用代码
- 与数据库交互的代码
- 日志输出
- 框架类

### 例子 for Java 8
java.time包的Clock类允许您创建一个假的系统时钟。 它的固定方法可以让您快速创建一个常见类型的假时钟，它只是在给定时区内返回一个固定值。 通常，您需要扩展抽象Clock类，并实现其抽象方法。
``` java
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import java.util.Objects;

/**
 Increment by 1 second each time you look at the clock.
 Starts with the default system clock's instant and time-zone.

 Example output:
  2018-05-26T14:00:12.778Z
  2018-05-26T14:00:13.778Z
  2018-05-26T14:00:14.778Z
  2018-05-26T14:00:15.778Z
  2018-05-26T14:00:16.778Z

 @since Java 8.
*/
public final class ClockTicker extends Clock {

  /** Simple demo of the behaviour of this class. */
  public static void main(String... args) {
    ClockTicker ticker = new ClockTicker();
    log(ticker.instant());
    log(ticker.instant());
    log(ticker.instant());
    log(ticker.instant());
    log(ticker.instant());
  }
  private static void log(Object msg){
    System.out.println(Objects.toString(msg));
  }

  @Override public ZoneId getZone() {
    return DEFAULT_TZONE;
  }

  @Override public Clock withZone(ZoneId zone) {
    return Clock.fixed(WHEN_STARTED, zone);
  }

  @Override public Instant instant() {
    return nextInstant();
  }

  //PRIVATE
  private final Instant WHEN_STARTED = Instant.now();
  private final ZoneId DEFAULT_TZONE = ZoneId.systemDefault();
  private long count = 0;

  private Instant nextInstant() {
    ++count;
    return WHEN_STARTED.plusSeconds(count);
  }
}

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.util.Objects;

/**
 Set the starting date-time and time-zone, but then
 let the time vary normally.

 Example output:
  2018-12-25T05:00:00Z
  Sleep for 5 seconds...
  2018-12-25T05:00:05.005Z
  Done.

 @since Java 8.
*/
public final class ClockTimeTravel extends Clock {

  /** Simple demo of the behaviour of this class. */
  public static void main(String[] args) throws InterruptedException {
    ClockTimeTravel timeTravel = new ClockTimeTravel(
      LocalDateTime.parse("2018-12-25T00:00:00"), ZoneOffset.of("-05:00")
    );
    log(timeTravel.instant());
    log("Sleep for 5 seconds...");
    Thread.currentThread().sleep(5000);
    log(timeTravel.instant());
    log("Done.");
  }

  private static void log(Object msg){
    System.out.println(Objects.toString(msg));
  }

  public ClockTimeTravel(LocalDateTime t0, ZoneOffset zoneOffset){
    this.zoneOffset = zoneOffset;
    this.t0LocalDateTime = t0;
    this.t0Instant = t0.toInstant(zoneOffset);
    this.whenObjectCreatedInstant = Instant.now();
  }

  @Override public ZoneId getZone() {
    return zoneOffset;
  }

  /** The caller needs to actually pass a ZoneOffset object here. */
  @Override public Clock withZone(ZoneId zone) {
    return new ClockTimeTravel(t0LocalDateTime, (ZoneOffset)zone);
  }

  @Override public Instant instant() {
    return nextInstant();
  }

  //PRIVATE

  /** t0 is the moment this clock object was created in Java-land. */
  private final Instant t0Instant;
  private final LocalDateTime t0LocalDateTime;

  private final ZoneOffset zoneOffset;
  private final Instant whenObjectCreatedInstant;

  /**
   Figure out how much time has elapsed between the moment this
   object was created, and the moment when this method is being called.
   Then, apply that diff to t0.
  */
  private Instant nextInstant() {
    Instant now = Instant.now();
    long diff = now.toEpochMilli() - whenObjectCreatedInstant.toEpochMilli();
    return t0Instant.plusMillis(diff);
  }
}
```

### 例子 小于 Java8
``` java
The TimeSource interface allows you to define various implementations of a fake system clock:

public interface TimeSource {

  /** Return the system time. */  
  long currentTimeMillis();

}
This implementation mimics a system clock running one day in advance:
public final class TimeSrc implements TimeSource {

  /** One day in advance of the actual time.*/
  @Override public long currentTimeMillis() {
    return System.currentTimeMillis() + ONE_DAY;
  }

  private static final long ONE_DAY = 24*60*60*1000;

}
```
使用各种TimeSource实现，您可以模拟系统时钟的任何所需行为。
配置JDK记录器以使用假系统时钟很简单。 一个简单的自定义Formatter可以使用TimeSource来改变LogRecord的时间：
``` Java
import java.util.logging.LogRecord;
import java.util.logging.SimpleFormatter;

public final class SimpleFormatterTimeSource extends SimpleFormatter {

  @Override public String format(LogRecord aLogRecord) {
    aLogRecord.setMillis(fTimeSource.currentTimeMillis());
    return super.format(aLogRecord);
  }

  private TimeSource fTimeSource = BuildImpl.forTimeSource();
}

```
上面的文章机翻[Use a fake system clock](http://www.javapractices.com/topic/TopicAction.do?Id=234)

### Docker 中修改时间
Docker 是容器技术，不同于虚拟化技术是独立的系统，Docker是通过[NameSpace上](https://coolshell.cn/articles/17010.html)、[NameSpace下](https://coolshell.cn/articles/17029.html) 和[CGroup](https://coolshell.cn/articles/17049.html)来虚拟的系统，可以参考上面的几篇文章，可以让你让你了解为什么修改时间后，Docker会崩溃了（Docker 的时间其实是使用的宿主机时间）。我们一般测试的时候，需要将时间修改成指定的时间，所以只是修改时区的话，是满足不了我们的要求的。

所以我们需要其他的解决方法。

解决方案是在容器中伪造它。 这个lib 拦截所有系统调用程序用于检索当前时间和日期。
实施很容易。根据需要为Dockerfile添加功能：
``` shell
cd WORKDIR /
git clone https://github.com/wolfcw/libfaketime.git
cd  /libfaketime/src
make install
```
请记住设置环境变量 LD_PRELOAD 在运行应用程序之前，您需要应用伪造的时间。

```
CMD ["/bin/sh", "-c", "LD_PRELOAD=/usr/local/lib/faketime/libfaketime.so.1 FAKETIME_NO_CACHE=1 python /srv/intercept/manage.py runserver 0.0.0.0:3000]
```

``` python
import os
def set_time(request):
    print(datetime.today())
    os.environ["FAKETIME"] = "2020-01-01"  # Note: time of type string must be in the format "YYYY-MM-DD hh:mm:ss" or "+15d"
    print(datetime.today())
```

> 上面的文章引用于 http://webmotociclismo.com/questions/277/ru-he-zai-dockerrong-qi-zhong-dong-tai-she-zhi-xi-tong-shi-jian

后面会再单独写一篇使用Dockerfile 的详细示例。
