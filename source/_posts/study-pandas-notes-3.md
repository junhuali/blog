---
title: pandas学习笔记-3
date: 2018-09-26 16:19:09
categories: Python
tags: pandas
---

#### 6.pandas数据排序([源码见demo6.py](https://github.com/junhuali/study-pandas/blob/master/demo6.py))
``` python
#!/usr/bin/env python
# encoding: utf-8
import pandas as pd

movies = pd.read_csv('https://blog.searchinfogo.com/download/data/data/imdb_1000.csv')
print(movies.head())

print(movies['title'].sort_values(ascending=False))

print(movies['title'])

print(movies.sort_values('title'))

print(movies.sort_values('duration', ascending=False))

print(movies.head())

print(movies.sort_values(['content_rating', 'duration']))

```
#### 7.pandas通过列名过滤行数据([源码见demo7.py](https://github.com/junhuali/study-pandas/blob/master/demo7.py))
``` python
#!/usr/bin/env python
# encoding: utf-8

import pandas as pd

movies = pd.read_csv('https://blog.searchinfogo.com/download/data/data/imdb_1000.csv')
print(movies.head())
print(movies.shape)

print(type(True))

booleans = []
for length in movies.duration:
    if length >= 20:
        booleans.append(True)
    else:
        booleans.append(False)

booleans[0:5]

len(booleans)

is_long = pd.Series(booleans)
is_long.head()

is_long = movies.duration >= 200
is_long.head()
movies['genre']

movies[movies.duration >= 200]['genre']
movies[is_long]
```

p7
讲解了使用sort_values() 方法对数据进行排序
p8
讲解了通过指定的条件对数据进行筛选