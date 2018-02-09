---
title: 正则表达式基础知识总结
date: 2017-12-07 15:48:36
categories: Regular
tag: Regular
---
最近项目需要爬取一些网站的数据，于是我开始了爬虫生涯。以前只是简单的玩过一些爬虫，了解过nutch
（分布式爬虫），Python下的scrapy等爬虫项目。因为公司的技术栈都是基于Java的，所以我简单的看了下
GitHub，选择了[code4craft](https://github.com/code4craft)的[webmagic](https://github.com/code4craft/webmagic)
作为项目的基础组件。

对于爬虫来说，数据的获取是基本，获取到数据后需要进行数据清洗之后入库，XPath、正则表达式就是获取
这些数据的利器，所以我们只要掌握这些技能就能很好的获取到我们需要的数据。

[0-9]这种形式的正则表达式称作字符组、字符集。
\d 字符组简写。
(.) 匹配任意字符，通配符，一般不匹配行起始符。
