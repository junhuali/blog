---
title: 搭建RocketPool 教程
date: 2021-03-25 18:09:43
categories: Linux
tags: Linux

---
### 开始
搭建rocket-pool开始前，需要准备一台云服务器，本文使用的是阿里云香港4核16G内存500G SSD 存储，具体配置见下图,可以只买服务器（记得选网络带宽，一般10-20Mbps可以满足，建议15Mbps以上）

基本的准备就完成了，具体的操作文档参考的是[Medium](https://medium.com/rocket-pool/rocket-pool-v2-5-beta-node-operators-guide-77859891766b) ，买好服务器第一步就算完成了。<!--more-->
![](WechatIMG919.png)

### 安装
#### 工具准备
大家的电脑一般都是Windows，所以需要使用远程工具，一般使用xshell，putty之类的就可以，下载的时候注意去官方网站下载，否则可能软件中有病毒，具体使用可以自行搜索。因为服务器在香港，访问速度不是很理想，同时为了安全可以使用阿里云提供的`web shell` 工具,如下图：
![](WX20210325-182244.png)
![](WX20210325-182426.png)
![](WX20210325-182532.png)
经过上面的步骤就可以连接上云服务器了。

执行下面的命令更新一下系统，避免有漏洞
``` bash
yum update -y
#完成后执行reboot 进行重启，然后等1分钟，在页面上重新连接
```


#### 配置用户
``` bash
#创建用户 名字随意创建，比如rpl
adduser rpl
#设置密码,密码需要有特殊字符以及大小写混合，输入下面的命令以后就可以输入密码了，会提示重复输入一次，记住这个密码
passwd rpl
#从root 用户切换到 rpl用户,rocketpool 不建议使用root进行安装，root权限过大。
su rpl
```
切换到`rpl`用户后，就可以进行接下来的安装步骤了。

使用root安装会有如下提示：
>rocketpool should not be run as root. Please try again without 'sudo'.
If you want to run rocketpool as root anyway, use the '--allow-root' option to override this warning.

#### 安装rocketpool
参照官方的文档进行命令执行

#下载rocketpool客户端,赋予可可执行权限
curl -L https://github.com/rocket-pool/smartnode-install/releases/latest/download/rocketpool-cli-linux-amd64 --create-dirs -o ~/bin/rocketpool && chmod +x ~/bin/rocketpool

#激活一下环境变量，否则执行rocketpool命令的时候会找不到文件
```bash
source .bash_profile
#可以执行一下 rocketpool -v ，会出现下面的版本，说明客户端配置好了
rocketpool -v

rocketpool version 1.0.0-beta.1
```




按照官方的文档，接下来执行
```bash
#进行服务安装，看了一下脚本，其实就是按照docker，如果安装的有问题，可以使用后面的脚本就行安装
rocketpool service install

The Rocket Pool service will be installed locally --
Network: pyrmont
Version: latest

Any existing configuration will be overwritten.
Are you sure you want to continue? [y/n]

#会有上面这样的提示,输入y执行，会让你输入rpl的用户密码，输入后会有下面的提示，报错了，不用管，直接往后看
Step 1 of 7: Installing OS dependencies...
[sudo] rpl 的密码：
Could not install Rocket Pool service: Could not install OS packages.




```

```bash
#服务主要是运行在docker中，docker有些基本的命令，可以自己搜索，下面进行相关的安装

#安装docker(国内使用这个命令)，二选一
curl -sSL https://get.daocloud.io/docker | sh

#官方脚本（国外机器使用）
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun


#启动，设置开机启动
systemctl enable docker
systemctl start docker

#增加rpl docker 权限
usermod -a -G docker rpl
gpasswd -a rpl docker
#重启docker
service docker restart
#刷新docker用户组
newgrp docker
#安装docker-compose （国内） 二选一
curl -L https://get.daocloud.io/docker/compose/releases/download/1.28.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
#国外机器使用
curl -L github.com/docker/compose/releases/download/1.28.5/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

#执行文件赋权
chmod +x /usr/local/bin/docker-compose

#执行下面的命令安装就好
rocketpool service install -d

#这样就说明安装好了
Skipping steps 1 - 4 (OS dependencies & docker)
Step 5 of 7: Creating Rocket Pool user data directory...
Step 6 of 7: Downloading Rocket Pool package files...
Step 7 of 7: Copying package files to Rocket Pool user data directory...

The Rocket Pool service was successfully installed locally!

Please start a new shell session to apply updated user permissions.
(To start a new shell session, log out and back in.)

Run 'rocketpool service config' to configure the service before starting it.

```

经过上面的准备`rocketpool`的客户端已经准备好了，按照上面的提示，退出一下`web shell`,然后重新进入，下面就是对客户端进行一些基本的配置

#### rocketpool 配置
```bash
#执行下面的命令进行配置
rocketpool service config
```

> Which Eth 1.0 client would you like to run?
1: Geth 	Geth is one of the three original implementations of the
 		Ethereum protocol. It is written in Go, fully open source and
 		licensed under the GNU LGPL v3.
		https://geth.ethereum.org/
2: Infura 	Use infura.io as a light client for Eth 1.0. Not recommended
 		for use in production.
		https://infura.io/
3: Custom 	Use a custom Eth 1.0 client at a specified address (does not
 		work on localhost).

这里我们选择2 ，你需要去[infura](https://infura.io/) 创建一个账号，然后获取PROJECT ID， 开始的时候免费账号就好，后面请求次数不过可以购买会员，当然也可以搭建Geth，这个比较消耗磁盘，建议1T 磁盘起步。


输入2 以后，会提示你输入Infura的projectId。


``` bash
Please enter the Infura Project ID
(the ID of your project created in Infura)
xxxxxxxxxxxxxxxxxx

Would you like to run a random Eth 2.0 client (recommended)? [y/n]
y

Teku Eth 2.0 client selected.

Please enter the Custom Graffiti (leave blank for none)
(optional - for adding custom text to signed Eth 2.0 blocks - 16 chars max)
bitspace

Done! Run 'rocketpool service start' to apply new configuration settings.
```

后面就是启动rocketpool了

#### 启动rocketpool
```bash
#启动
rocketpool service start
```
``` bash
#docker 创建虚拟网络，拉取镜像
Creating network "rocketpool_net" with the default driver
Creating volume "rocketpool_eth1clientdata" with default driver
Creating volume "rocketpool_eth2clientdata" with default driver
Pulling eth1 (rocketpool/smartnode-pow-proxy:v1.0.0-beta.0)...
v1.0.0-beta.0: Pulling from rocketpool/smartnode-pow-proxy
Digest: sha256:730b11acebc27c0db8c92a1420dcb9b836af1bd2a58674857174f8ef0a76f1e9
Status: Downloaded newer image for rocketpool/smartnode-pow-proxy:v1.0.0-beta.0
Pulling eth2 (prysmaticlabs/prysm-beacon-chain:HEAD-d2b111-debug)...
HEAD-d2b111-debug: Pulling from prysmaticlabs/prysm-beacon-chain
Digest: sha256:1ffe43b4dcece2ebe8f422549fa4de6809d878f1242ded659cca3eef133315b2
Status: Downloaded newer image for prysmaticlabs/prysm-beacon-chain:HEAD-d2b111-debug
Pulling validator (prysmaticlabs/prysm-validator:HEAD-d2b111-debug)...
HEAD-d2b111-debug: Pulling from prysmaticlabs/prysm-validator
Digest: sha256:093dee6e94ebcfdce612db9ffe5e3e79648ea1f9446941ab3a462d982544b2a5
Status: Downloaded newer image for prysmaticlabs/prysm-validator:HEAD-d2b111-debug
Pulling api (rocketpool/smartnode:v1.0.0-beta.1)...
v1.0.0-beta.1: Pulling from rocketpool/smartnode
Digest: sha256:34ab212f274619627580ef715e2ff19865aa65f23bf6fa0e01e96f989878ed40
Status: Downloaded newer image for rocketpool/smartnode:v1.0.0-beta.1
Creating rocketpool_eth1 ...
Creating rocketpool_eth1 ... done
Creating rocketpool_eth2 ...
Creating rocketpool_api  ...
Creating rocketpool_eth2 ... done
Creating rocketpool_validator ...
Creating rocketpool_watchtower ...
Creating rocketpool_node       ...
Creating rocketpool_api        ... done
Creating rocketpool_watchtower ... done
Creating rocketpool_validator  ... done
Creating rocketpool_node       ... done

```

#### 检查启动情况
```bash
#执行下面的命令
rocketpool service version

#会看到下面的提示
Rocket Pool client version: 1.0.0-beta.1
Rocket Pool service version: 1.0.0-beta.1
Selected Eth 1.0 client: Infura (rocketpool/smartnode-pow-proxy:v1.0.0-beta.0)
Selected Eth 2.0 client: Prysm (prysmaticlabs/prysm-beacon-chain:HEAD-d2b111-debug)

#查看服务状态
rocketpool service stats
```
如下图所示
![](WX20210328-105648.png)

或者通过下面的方式查看
```bash
rocketpool service logs eth1
rocketpool service logs eth2

#使用Ctrl+C 可以退出
```

>Note: You may see your validator service restarting continually until you have an actively staking minipool. This won’t affect your node’s performance and can safely be ignored.

有一个验证服务会不断的重启，可以忽略

#### 开启端口
在阿里云安全组中打开下面的端口

>30303 (TCP & UDP)
9001 (TCP & UDP)

需要注意的是端口需要分别设置如下图
![](WX20210328-111030.png)

### 注册节点
在Rocket Pool注册之前，您需要创建一个钱包来保存您的节点帐户和验证者密钥。如果您参加了以前的测试版，请先删除旧的钱包和验证码

#### 创建钱包

``` bash
#如果之前参加过测试版请删除
sudo rm ~/.rocketpool/data/wallet
sudo rm -r ~/.rocketpool/data/validators
```
然后创建一个新钱包
```bash
rocketpool wallet init

### 输入一个自己设置的密码，然后保存好下面的助记词，把助记词输入一遍
Please enter a password to secure your wallet with:

Please confirm your password:

Your mnemonic phrase to recover your wallet is printed below. It can be used to recover your node account and validator keys if they are lost.
Record this phrase somewhere secure and private. Do not share it with anyone as it will give them control of your node account and validators.
==============================================================================================================================================

feel wink much borrow mixture pupil tooth black monster garment glory deal tuition crime cattle stable cheap faint cruel joy asthma renew recall speed

==============================================================================================================================================

#成功后会有下面的提示

The node wallet was successfully initialized.
Node account: 0xE13037Ea3F3978f401b5Cca0Ca775341a0Fc1D05

```

>You’ll be prompted for a password to secure your wallet with. Then, you’ll see your wallet’s backup mnemonic phrase. Record this somewhere secure and private, as it will restore your wallet along with all its keys (even ones created in the future) if you lose it. When you’re done, you’ll see the address of your newly created node account.
At this point, you’ll need to wait for your Eth 1.0 client to sync before you can go any further. Let the service logs run and come back later, this could take a day or two (unless you’re using Infura)!

如果使用的是Geth之类的钱包，一般需要1-2天的时间，如果使用的是Infura ，立即就可以使用了


>Once your Eth 1.0 client is synced, you’ll need some Goerli ETH and RPL to register your node with Rocket Pool and start making deposits. Find your node address with:

同步完Eth 1.0客户端后，您将需要一些Goerli ETH和RPL才能在Rocket Pool中注册您的节点并开始进行存款。使用以下命令找到您的节点地址

``` bash
#执行命令查看节点状态
rocketpool node status
#会有下面的提示
The node 0xE13037Ea3F3978f401b5Cca0Ca775341a0Fc1D05 has a balance of 0.000000 ETH, 0.000000 RPL and 0.000000 nETH.
The node is not registered with Rocket Pool.
```

可以通过下面几个地方获取测试网络的ETH 

[ethstaker Discord server](https://discord.gg/GGGmqZdCBf)
[faucet.goerli.mudit.blog](https://faucet.goerli.mudit.blog)


获取一点数量的rpl
``` bash
rocketpool faucet withdraw-rpl

Successfully withdrew 160.000000 RPL from the faucet.
```

最后就是注册节点了
```bash
rocketpool node register



Would you like to detect your timezone automatically? [y/n]
y

The detected timezone is 'Asia/Singapore', would you like to register using this timezone? [y/n]
n

Please enter a timezone to register with in the format 'Country/City':
Asia/Shanghai

You have chosen to register with the timezone 'Asia/Shanghai', is this correct? [y/n]
y

#节点注册成功
The node was successfully registered with Rocket Pool.

```

You’ll be asked for your timezone location (which is detected automatically by default) to send to the network. This is optional and not used for any KYC purposes, just to keep the Rocket Pool website network map up to date. If you’re running a remote server, use the server’s timezone location. If you want to abstain, just enter something like Hidden/Hidden

如果不想输入时区可以输入`Hidden/Hidden` 进行隐藏，现在已经加入了 Rocket Pool

### 存款

现在，让我们通过与Rocket Pool存款来使用该RPL
```bash
rocketpool node stake-rpl

he node has a balance of 160.000000 old RPL. Would you like to swap it for new RPL before staking? [y/n]

y



Successfully swapped 160.000000 old RPL for new RPL.

Please choose an amount of RPL to stake:
1: The minimum minipool stake amount (80.000000 RPL)?
2: The maximum effective minipool stake amount (1200.000000 RPL)?
3: Your entire RPL balance (160.000000 RPL)?
4: A custom amount

3

Are you sure you want to stake 160.000000 RPL? Staked RPL can only be withdrawn after a delay. [y/n]

y

Successfully staked 160.000000 RPL.
```
#### 开始抵押
``` bash
rocketpool node deposit

Please choose an amount of ETH to deposit:
1: 32 ETH (minipool begins staking immediately)
2: 16 ETH (minipool begins staking after ETH is assigned)

1

The current network node commission rate that your minipool should receive is 20.000000%.
The suggested maximum commission rate slippage for your deposit transaction is 1.000000%.
This will result in your minipool receiving a minimum possible commission rate of 19.000000%.
Do you want to use the suggested maximum commission rate slippage? [y/n]

y

Are you sure you want to deposit 32.000000 ETH to create a minipool with a minimum possible commission rate of 19.000000%? Running a minipool is a long-term commitment. [y/n]

y

The node deposit of 32.000000 ETH was made successfully.
A new minipool was created at 0xc0DCa29d45884dDdF0F7838aF81a1A12ECaA3b43.
```

抵押完成

#### 管理矿池
```bash
rocketpool minipool status

Could not get minipool status: The Eth 2.0 node is currently syncing. Please try again late
#一般需要的时间比较长，官方说的时间是10天,但是看记录只需要15个小时
```

[查看结果](https://pyrmont.beaconcha.in/validator/8c881ee3eaa8fbff3932b0039e3ab7362723aaedffb759c9c39cb09157029fe5fddf0f56e84797e48f90fe079ec8e1e9#deposits)






