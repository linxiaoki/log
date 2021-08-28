- [美化](#美化)

- [挂载](#挂载)

- [工具软件](#工具软件)

- [系统备份,稳一手。](#系统重装)

- [系统假死怎么办](#安全重启)
-----

## 美化
ubuntu做了美化和升级。
主要参考：[Windows 10 太难用，如何定制你的 Ubuntu？](https://www.chainnews.com/articles/105102868075.htm)

### 配置主题，图标，背景图片
#### 安装软件
1. 安装软件
```bash
sudo apt-get install gnome-tweak-tool #优化系统配置
sudo apt-get install gnome-shell-extensions 
sudo apt install chrome-gnome-shell # 安装chrome 扩展，可以直接在网页安装
sudo apt-get autoremove --purge gnome-shell-extension-Ubuntu-dock -y # 改完配置后，再删掉；(删除ubuntu原有的dock,应该不用)，移除目录 sudo mv /usr/share/gnome-shell/extensions/ubuntu-dock@ubuntu.com   ******后面加.bk
sudo apt install fonts-wqy-microhei  #字体
```

2. 下载[主题、图标](https://www.gnome-look.org/browse/cat/)和好看的[桌面背景图片](https://wallhaven.cc/toplist)到`/usr/share/themes  ./icons ./backgrounds`目录下，使用tweaks的外观进行配置; 更改默认字体; 更改默认输入法`apt install ibus-rime`，并[配置](https://github.com/wongdean/rime-settings),更改绑定上下页快捷键为 `, .`（打开文件`default.custom.yaml`，取消注释`comma`和`period`行。


3. 浏览器安装相应(插件)[https://extensions.gnome.org/]，开启扩展[dash-to-dock](https://extensions.gnome.org/extension/307/dash-to-dock/)。

3. `focalgdm3`配置登陆界面(https://github.com/PRATAP-KUMAR/focalgdm3)

4. 顶部的流量监控
```bash
sudo apt-get install gnome-system-monitor
sudo apt-get install indicator-sysmonitor
# 设置开机自启，添加 {net}
```

5. firefox [添加主题](https://github.com/vinceliuice/WhiteSur-gtk-theme/tree/master/src/other/firefox)

6. ubuntu 需要从18 Lts 升级的 20 Lts (focalgdm3 需要 20 版本)
```bash
lsb_release -r
apt --purge autoremove
do-release-upgrade -d  #升级

# 下载后，安装升级软件，下载速度太慢，强制重启后报错,  重启选择旧的，通过recover模式
apt-get update  # 都来一遍，主要是 update-grub
apt-get upgrade
apt-get autoremove -purge
dpkg --configure -a  # 更新的时候
update-grub  # 重点
```
7. 美化grub引导界面（[下载主题](https://www.gnome-look.org/p/1009236/)）
```
mkdir /boot/grub/themes
//解压包
//执行 install.sh
```
8. 紫色背景一闪而过, [这个插件](https://extensions.gnome.org/extension/3037/good-bye-gdm-flick/)

9. 更改最小亮度：`sudo su -c "echo 24 >/sys/class/backlight/intel_backlight/brightness"`

9. 代理，系统升级慢主要是因为下载 flashplugin-installer 软件，用镜像也不行
```bash
dpkg -r flashplugin-installer  // 应该是删除了
apt install -y proxychains  # 代理
配置代理，通过 v2ray 
```
待：使用 iptable 进行代理转发。


<img style="text-align:center" src="https://tva1.sinaimg.cn/large/005zbIM7ly1gi2tgrh6yaj311y0lckcw.jpg"></img>

## 工具软件
- 下载工具 aria2, [参考,aria2的配置使用](https://www.jianshu.com/p/2f7e087f452b)
- zsh 工具下载安装后，
  - 切换：`which zsh` -> `chsh -s /zsh目录`
  - `.zshrc`文件末尾添加 `source ~/.bash_profile`,加载bash环境变量 

## 挂载
```bash
fdisk -l  #查看磁盘分区
# 新建目录 
# ntfs 是分区格式，/mnt/F是挂载目录, utf8 ， 0 代表任何用户可读写。
mount -t ntfs /dev/sda2 /mnt/F -o iocharset=utf8,umask=0  # 可以在 /.bashrc 设置一个永久别名
unmount /dev/sda2  # 取消挂载

# 管理
fuser -cu /dev/sda1  # 查看哪个进程在使用此分区

# /etc/fstab 文件末尾加上上面的 mount 命令，即可开机自动挂载
```
https://jakting.com/archives/ubuntu-rw-windows-files.html
https://zhuanlan.zhihu.com/p/91643438

## 系统重装
```bash
# 切换到 / 目录，打包目录 /media/Disk/myDisk
` # 打包 / 
tar -cvpzf /mnt/my_Disk/ubuntu_backup/ubuntu_backup@`date +%Y-%m-%d`.tar.gz --exclude=/proc --exclude=/tmp --exclude=/boot --exclude=/home --exclude=/lost+found --exclude=/media --exclude=/mnt --exclude=/run --exclude=/sys / >/tmp/tarlog
time tar -cvpzf /media/Disk/my_Disk/ubuntu_home_backup@`date +%Y-%m-%d`.tar.gz /home   # 打包 /home,可选
time tar -cvpzf /media/Disk/myDisk/ubuntu_boot_backup@`date +%Y-%m-%d`.tar.gz /boot    # 打包  /boot 重要

# 恢复时删除根目录文件，在解压到根目录下，并创建 /proc, /tmp,/lost+found,等文件夹
```
[参考:Ubuntu系统备份和还原](https://blog.csdn.net/qq_35523593/article/details/78545530)

## 虚拟机中还原ubuntu系统
1.正常安装ubuntu系统（分区最好一致)
2.虚拟机中再添加一个CD/DVD硬件（此时有两个，ubuntu的镜像文件先不要移除）。
3.添加共享文件夹，目录指向备份压缩包的目录
3.重启再次进入 try ubuntu 界面
4.使用命令查看安装ubuntu所有位置，重新挂载，解压备份文件
```bash
sudo mkdir /mnt/ubuntu
sudo fdisk -l  #查看位置
sudo mount /dev/sda2 /mnt/ubuntu #(sda2为刚安装系统的位置
sudo rm -rf /mnt/ubuntu/*   # 删除原来的文件
sudo tar -xzpvf /mnt/sdfs/ubuntu-bk.tar.gz -C /mnt/ubuntu/   #解压备份的文件，如果是多个也要多次解压

```
5.修复Grub（遇到错误 the current session is in bios-compatibility mode。需要在虚拟机设置 UEFI 模式启动）
```bash
sudo add-apt-repository ppa:yannubuntu/boot-repair
sudo apt-get update
sudo apt-get install -y boot-repair  
boot-repair
```
点击高级选项第二项：将GRUB安装在sdb上(sdb为系统安装位置）；应用，按提示操作即可。
6.修复 /etc/fstab 文件

## 安全重启
惨痛经验告诉我，系统假死一定不能强制关机。
[参考](https://blog.csdn.net/sunny_580/article/details/78996975)
1. 可以切换到其他终端时,注销桌面重新登录
```bash
sudo pkill Xorg
# 或者
sudo restart lightdm
```
2. 按啥都没反应，使用`reisub`大法
左手按住 ctrl+alt不放开，右手按 SysRq（和截屏键在一个位置），持续一秒；
然后保持左手不松开，右手依次按下r,e,i,s,u,b，每按一个按钮都要持续一秒钟左右，最后会重启。
tips:记忆窍门=>热(re)爱(i)sub.
解释：
- r : unRaw 将键盘控制从 X Server 那里抢回来
- e : tErminate 给所有进程发送 SIGTERM 信号，让它们自己解决善后
- i : kIll 给所有进程发送 SIGKILL 信号，强制他们马上关闭
- s : Sync 将所有数据同步至磁盘
- u : Unmount 将所有分区挂载为只读模式
- b : reBoot 重启

## 零零散散
打包统计压缩前大小
```
tar -tvf ubuntu_home.tar.gz |awk '{sum+=$3} END {print "SUM=",sum/1024/1024/1024}'
```

双系统win10时间早8小时，可以运行命令,[参考](https://www.jianshu.com/p/5c1db6364141)
`timedatectl set-local-rtc 1 --adjust-system-clock`


