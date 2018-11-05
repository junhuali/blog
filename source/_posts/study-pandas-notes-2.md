---
title: pandas学习笔记-2
date: 2018-09-25 23:10:01
categories: Python
tags: pandas
---

#### 3.为什么pandas命令以括号结尾，其他的命令不呢？([源码见demo3.py](https://github.com/junhuali/study-pandas/blob/master/demo3.py))
``` python 
#!/usr/bin/env python
# encoding: utf-8

import pandas as pd

movies = pd.read_csv('https://blog.searchinfogo.com/download/data/data/imdb_1000.csv')
head = movies.head()
print(head)

describe = movies.describe()
print(describe)

shape = movies.shape
print(shape)

dtypes = movies.dtypes
print(dtypes)

print(type(movies))

movies.describe(include=['object'])
```

#### 4. 在pandas DataFrame 中重命名列名([源码见demo4.py](https://github.com/junhuali/study-pandas/blob/master/demo4.py))
``` python
#!/usr/bin/env python
# encoding: utf-8

import pandas as pd

ufo = pd.read_csv('https://blog.searchinfogo.com/download/data/data/ufo.csv')

head = ufo.head()

print(head)

print(ufo.columns)

ufo.rename(columns={'Colors Reported': 'Colors_Reported', 'Shape Reported': 'Shape_Reported'}, inplace=True)

print(ufo.columns)

ufo_cols = {'city', 'colors reported', 'shape reported', 'state', 'time'}

ufo.columns = ufo_cols

print(ufo.head())

ufo = pd.read_csv('https://blog.searchinfogo.com/download/data/data/ufo.csv', names=ufo_cols, header=0)
print(ufo.head())

print(ufo.columns)

ufo.columns = ufo.columns.str.replace(' ', '_')
print(ufo.columns)

```
#### 5.在pandas DataFrame 中移除指定的行和列([源码见demo5.py](https://github.com/junhuali/study-pandas/blob/master/demo5.py))
``` python
#!/usr/bin/env python
# encoding: utf-8
import pandas as pd

ufo = pd.read_csv('https://blog.searchinfogo.com/download/data/data/ufo.csv')
print(ufo.head())
print(ufo.shape)

# axis=0 按行 axi=1 按列
ufo.drop('Colors Reported', axis=1, inplace=True)
print(ufo.head())

ufo.drop(['City', 'State'], axis=1, inplace=True)
print(ufo.head())

ufo.drop([0, 1], axis=0, inplace=True)
print(ufo.head())
print(ufo.shape)
```

视频p4
讲解了怎么通过使用ipython notebook ，调出对应pandas的方法或者函数的说明，在使用的时候可以通过点击对应方法，然后加上`shift+tab`键，
查看对应的说明。
视频p5
讲解了通过几种方法修改数据的列名
视频p6
讲解了通过drop 方法，移除对应的行列，通过这个方法，可以将数据中不需要的部分或者是无效数据进行清洗
