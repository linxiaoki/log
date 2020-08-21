[美化](#美化)

[挂载](#挂载)


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
sudo apt-get autoremove --purge gnome-shell-extension-Ubuntu-dock -y # 删除自带的dock ，不然会有冲突
sudo apt install fonts-wqy-microhei  #字体

```
2. 下载[主题、图标](https://www.gnome-look.org/browse/cat/)和好看的[桌面背景图片](https://wallhaven.cc/toplist)到`/usr/share/themes  ./icons ./backgrounds`目录下，使用tweaks的外观进行配置；配置字体

3. 浏览器安装相应(插件)[https://extensions.gnome.org/]，开启扩展[dash-to-dock](https://extensions.gnome.org/extension/307/dash-to-dock/)

3. `focalgdm3`配置登陆界面(https://github.com/PRATAP-KUMAR/focalgdm3)

4. firefox [添加主题](https://github.com/vinceliuice/WhiteSur-gtk-theme/tree/master/src/other/firefox)

5. ubuntu 需要从18 Lts 升级的 20 Lts (focalgdm3 需要 20 版本)
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
ubuntu 升级

6. 代理，系统升级慢主要是因为下载 flashplugin-installer 软件，用镜像也不行
```bash
apt install -y proxychain  # 代理
配置代理，通过 v2ray 
```

待更改：
- 顶部的流量条样式
- dock重复
- 图标样式

效果图


### 挂载

https://jakting.com/archives/ubuntu-rw-windows-files.html
https://zhuanlan.zhihu.com/p/91643438


