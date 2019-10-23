---
title: 学习Elastic Stack（二）
date: 2019-06-27 09:01:53
categories: Linux
tags: Docker、Elastic
#visible: hide
---
Elastic官方提供了Elastic Stack 和 相关产品的[文档](https://www.elastic.co/guide/index.html)，而且提供了中文的文档，[`《Elasticsearch 权威指南》中文版`](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index.html),不过这边书是基于Elasticsearch 2.x版本的，可能有些过时。Elasticsearch需要先了解基本概念一些常规操作`CRUD`。 <!--more-->

### 基本概念
Elasticsearch的主要用途是搜索和分析。

Elasticsearch是Elastic Stack核心的分布式搜索和分析引擎。Logstash和Beats有助于收集，聚合和丰富您的数据并将其存储在Elasticsearch中。Kibana使您能够以交互方式探索，可视化和分享数据洞察，并管理和监控堆栈。

Elasticsearch为所有类型的数据提供实时搜索和分析。无论是结构化文档还是非结构化文本，数字数据或地理空间数据，Elasticsearch都可以以支持快速搜索的方式有效地存储和索引它。远远超出简单的数据检索和聚合信息，以发现数据中的趋势和模式。随着数据和查询量的增长，Elasticsearch的分布式特性使你部署能够与其一起无缝地增长。
### 数据输入：文档和索引
Elasticsearch是一个分布式文档存储。Elasticsearch不是将信息存储为列数据行，而是存储已经序列化为JSON文档的复杂数据结构。当群集中有多个Elasticsearch节点时，存储的文档将分布在群集中，并且可以从任何节点立即访问。

存储文档时，它会在1秒内实时索引并完全可搜索。Elasticsearch使用称为倒排索引的数据结构，支持非常快速的全文搜索。倒排索引列出任何文档中出现的每个唯一单词，并标识每个单词出现的所有文档。

索引可以被视为优化的文档集合，每个文档都是字段的集合，这些字段是包含数据的键值对。默认情况下，Elasticsearch会为每个字段中的所有数据编制索引，并且每个索引字段都具有专用的优化数据结构。例如，文本字段存储在反向索引中，数字和地理字段存储在BKD树中。使用每个字段的数据结构来汇编和返回搜索结果的能力使Elasticsearch如此之快。

Elasticsearch还具有无模式的能力，这意味着可以索引文档而无需显式指定如何处理文档中可能出现的每个不同字段。启用动态映射后，Elasticsearch会自动检测并向索引添加新字段。这种默认行为使您可以轻松索引和浏览数据 - 只需开始索引文档，Elasticsearch将检测并将布尔值，浮点和整数值，日期和字符串映射到相应的Elasticsearch数据类型。

但是，最终，您比Elasticsearch更了解您的数据以及您希望如何使用它。您可以定义规则来控制动态映射并显式定义映射，以完全控制字段的存储和索引方式。

定义自己的映射使您能够：

区分全文字符串字段和精确值字符串字段
执行特定于语言的文本分析
优化字段以进行部分匹配
使用自定义日期格式
使用诸如geo_point和geo_shape无法自动检测的数据类型
为不同目的以不同方式索引相同字段通常很有用。例如，您可能希望将字符串字段索引为全文搜索的文本字段和用于排序或聚合数据的关键字字段。或者，您可以选择使用多个语言分析器来处理包含用户输入的字符串字段的内容。

在索引期间应用于全文字段的分析链也在搜索时使用。查询全文字段时，查询文本在索引中查找术语之前会进行相同的分析。
