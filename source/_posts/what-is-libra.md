---
title: 什么是Libra(天秤座)
date: 2019-07-12 21:45:20
categories: Cryptocurrency
tags: Libra
---
什么是`Libra`,Libra是有Facebook主导发行的一种数字货币。数字货币在最近几年的时间中，因为比特币的暴涨和暴跌走入人们的视野中，饱受各种争议。有人赚钱、有人亏钱，但是我们更应该关心的是区块链技术能给人们的生活带来什么改变。<!--more-->

>Libra’s mission is to enable a simple global currency and financial infrastructure that empowers billions of people.

上面的是Libra 对自己的描述，或者理解为定位，如果全球都使用同一种货币进行交易的话，里面会有多大的想象力以及前景，虽然现在Libra面临着各种各样的法律问题和风险，但是如果能慢慢解决的话，我还是非常看好它的前景的。

`Libra` 使用Facebook开发的Move语言，接下来我们简单的来跑个demo，了解一下`Libra`，现在它只能在macOS和Linux 上运行

### Move 语言的三大用处

* 发行数字货币、Token、数字资产
* 灵活处理区块链交易
* 验证器（Validator）管理

### Clone Libra

下载代码到本地

``` shell
git clone https://github.com/libra/libra.git && cd libra
#结果
Cloning into 'libra'...
remote: Enumerating objects: 3799, done.
remote: Total 3799 (delta 0), reused 0 (delta 0), pack-reused 3799
Receiving objects: 100% (3799/3799), 3.47 MiB | 1.09 MiB/s, done.
Resolving deltas: 100% (1874/1874), done.
```

### 安装依赖

``` shell
./scripts/dev_setup.sh
#结果
Installing Rust......
info: downloading installer
info: syncing channel updates for 'stable-x86_64-apple-darwin'
info: latest update on 2019-07-04, rust version 1.36.0 (a53f9df32 2019-07-03)
info: downloading component 'rustc'
 82.2 MiB /  82.2 MiB (100 %)   8.8 MiB/s in 10s ETA:  0s
info: downloading component 'rust-std'
 55.8 MiB /  55.8 MiB (100 %)   8.6 MiB/s in  6s ETA:  0s
info: downloading component 'cargo'
info: downloading component 'rust-docs'
 11.1 MiB /  11.1 MiB (100 %)   8.6 MiB/s in  1s ETA:  0s
info: installing component 'rustc'
 82.2 MiB /  82.2 MiB (100 %)  12.6 MiB/s in  6s ETA:  0s
info: installing component 'rust-std'
 55.8 MiB /  55.8 MiB (100 %)  16.2 MiB/s in  3s ETA:  0s
info: installing component 'cargo'
info: installing component 'rust-docs'
 11.1 MiB /  11.1 MiB (100 %)   2.2 MiB/s in  5s ETA:  0s
info: default toolchain set to 'stable'

  stable installed - rustc 1.36.0 (a53f9df32 2019-07-03)


Rust is installed now. Great!

To get started you need Cargo's bin directory ($HOME/.cargo/bin) in your PATH 
environment variable. Next time you log in this will be done automatically.

To configure your current shell run source $HOME/.cargo/env
info: syncing channel updates for 'stable-x86_64-apple-darwin'
info: checking for self-updates

  stable-x86_64-apple-darwin unchanged - rustc 1.36.0 (a53f9df32 2019-07-03)

info: syncing channel updates for 'nightly-2019-07-08-x86_64-apple-darwin'
info: latest update on 2019-07-08, rust version 1.38.0-nightly (6e310f2ab 2019-07-07)
info: downloading component 'rustc'
 58.9 MiB /  58.9 MiB (100 %)   1.5 MiB/s in 57s ETA:  0s     
info: downloading component 'rust-std'
168.6 MiB / 168.6 MiB (100 %)   2.2 MiB/s in  1m  5s ETA:  0s
info: downloading component 'cargo'
  3.6 MiB /   3.6 MiB (100 %)   2.8 MiB/s in  1s ETA:  0s
info: downloading component 'rust-docs'
 11.6 MiB /  11.6 MiB (100 %)   2.3 MiB/s in  5s ETA:  0s
info: installing component 'rustc'
 58.9 MiB /  58.9 MiB (100 %)  12.7 MiB/s in  4s ETA:  0s
info: installing component 'rust-std'
168.6 MiB / 168.6 MiB (100 %)  26.8 MiB/s in  6s ETA:  0s
info: installing component 'cargo'
info: installing component 'rust-docs'
 11.6 MiB /  11.6 MiB (100 %)   2.2 MiB/s in  4s ETA:  0s
info: downloading component 'rustfmt'
  2.0 MiB /   2.0 MiB (100 %) 1005.6 KiB/s in  3s ETA:  0s
info: installing component 'rustfmt'
info: downloading component 'clippy'
  1.3 MiB /   1.3 MiB (100 %) 383.7 KiB/s in  5s ETA:  0s
info: installing component 'clippy'
Installing CMake......
Finished installing all dependencies.

You should now be able to build the project by running:
    source /Users/xxx/.cargo/env
    cargo build
#如果出现下面的错误，需要安装 protobuf
error: failed to run custom build command for `network v0.1.0
brew install protobuf
```

出现错误可以查看 [roubleshooting](https://developers.libra.org/docs/my-first-transaction#setup-libra-core) 解决
上面的过程取决与你的网速，有可能会很慢，通过上面的一系列操作，基本的环境配置好了，接下来就可以在测试网络上开始交易了（现在还是测试网络，现在还没有办法支持10亿人的交易需求，后面会慢慢转向私有的联盟链）

### 命令行运行

``` shell
./scripts/cli/start_cli_testnet.sh
#结果
xxxxxxxx
 Finished dev [unoptimized + debuginfo] target(s) in 3m 31s
     Running `target/debug/client --host ac.testnet.libra.org --port 8000 -s ./scripts/cli/trusted_peers.config.toml`
Connected to validator at: ac.testnet.libra.org:8000
usage: <command> <args>

Use the following commands:

account | a
    Account operations
query | q
    Query operations
transfer | transferb | t | tb
    <sender_account_address>|<sender_account_ref_id> <receiver_account_address>|<receiver_account_ref_id> <number_of_coins> [gas_unit_price_in_micro_libras (default=0)] [max_gas_amount_in_micro_libras (default 10000)] Suffix 'b' is for blocking.
    Transfer coins (in libra) from account to another.
submit | submitb | s | sb
    <signer_account_address>|<signer_account_ref_id> <path_to_raw_transaction> Suffix 'b' is for blocking. 
    Load a RawTransaction from file and submit to the network
help | h
    Prints this help
quit | q!
    Exit this client
Please, input commands:
```

使用上面的命令可以构建和运行客户端，并将客户端连接到`test`网络，并列出了常用的命令

### 运行你第一笔交易

#### 创建两个账户

``` shell
libra% account
usage: account <arg>

Use the following args for this command:

create | c 
	Create an account. Returns reference ID to use in other operations
list | la 
	Print all accounts that were created or loaded
recover | r <file_path>
	Recover Libra wallet from the file path
write | w <file_path>
	Save Libra wallet mnemonic recovery seed to disk
mint | mintb | m | mb <receiver_account_ref_id>|<receiver_account_address> <number_of_coins>
	Mint coins to the account. Suffix 'b' is for blocking
libra% account create
>> Creating/retrieving next account from wallet
Created/retrieved account #0 address 4be45f015f45a2968d68a2ac56ebd1bfa05a43f87fefb2f5327bea292c354ece
libra% account create
>> Creating/retrieving next account from wallet
Created/retrieved account #1 address b83ef4576f74faa787abc8233a501540dcbb9ede236ee967535051ac8c8f6fab
```

`#0`是账户索引，十六进制字符串是账号地址

#### 转账

``` shell
libra% account mint 0 110
>> Minting coins
Mint request submitted
```

* 0 是账户索引
* 110 是往账户添加的金额

第二个账户也进行相同的操作，需要注意的是，只是发出了命令进行增加，还需要确认账户中的金额

``` shell
libra% query balance 0
Balance is: 110.000000
libra% query balance 1
Balance is: 52.000000
```

可以看到对应的金额已经添加到账户

#### 提交交易

``` shell
libra% query sequence 0
>> Getting current sequence number
Sequence number is: 0
libra% query sequence 1
>> Getting current sequence number
Sequence number is: 0

libra% transfer 0 1 10
>> Transferring
Transaction submitted to validator
To query for transaction status, run: query txn_acc_seq 0 0 <fetch_events=true|false>
libra% query sequence 0
>> Getting current sequence number
Sequence number is: 1
libra% query balance 0
Balance is: 100.000000
libra% query balance 1
Balance is: 62.000000
```

* 0 是第一个账户
* 1是第二个账户
* 10是要从第一个转账到第二个账户的金额

通过查询账户，可以看到对应的金额已经变更

整个过程非常的简单，试想一下，如果全球都支持使用`Libra`进行支付，支付将会变的更加便捷，当然支付宝也可以完成类似的操作，但是背后所涉及的交易结算是非常复杂的，还需要支付额外的手续费。那`Libra`是如何维持生存呢，看了一下，靠发币是抵押的法币产生的利息支付运营成本，不过这玩意要是真的流行，那就是全球羊毛收割机了，未来谁知道呢。
