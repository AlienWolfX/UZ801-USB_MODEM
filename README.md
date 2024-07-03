<br /> <p align="center"><a href="https://github.com/AlienWolfX/UZ801-USB_MODEM" target="_blank"><img src="img/4g_lte.png" width="200" alt="EcoSwap Logo"></a></p>

<p align="center"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Firmware Dump and Restore

<details>
<summary>Instructions</summary>

Before making any modifications to your device, such as rooting, it's crucial to first back up its firmware. You'll need this <a href="https://github.com/bkerler/edl">tool</a> to execute the commands below.

Note: To enable EDL mode on your device, execute the following command:

```
adb reboot edl
```

Alternatively, for a more hands-on approach, you can short the D+ and GND on the USB before connecting it to your computer. Once the device is in EDL mode, execute the following commands:

```
python3 edl rf {your_filename}.bin
```

To restore simply run

```
python3 edl wf {your_filename}.bin
```
</details>

## Achieving SuperSU

<details>
<summary>Instructions</summary>

To install SuperSU on the USB Dongle, you need to have these files:

- <a href="files/SR5-SuperSU-v2.82-SR5-20171001224502.zip">SuperSU</a>
- <a href="files/twrp-3.1.1-0-seed.img">TWRP</a>

After obtaining the necessary files, open a new terminal and execute the following commands:

```
adb push SR5-SuperSU-v2.82-SR5-20171001224502.zip /sdcard

adb reboot bootloader

fastboot boot twrp-3.1.1-0-seed.img
```

The device may take some time to restart adb. Please be patient. Once adb is up and running again, proceed with the following commands:

```
adb shell

twrp install /sdcard/SR5-SuperSU-v2.82-SR5-20171001224502.zip

reboot
```
</details>

## Installing OpenWrt

<details>
<summary>Instructions</summary>

To install openwrt on the device you will need

- <a href="files/openwrt-UZ801_v3.2.tar.gz">OpenWrt UZ801_V3.2</a>

* <a href='files/firmware.tar.xz'>Modem Firmware</a>

Steps

```
adb shell reboot edl

python3 edl wf {OPENWRT FILE}

python3 edl reset

adb reboot-bootloader

fastboot oem reboot-edl

python3 edl w fsc fsc.bin
python3 edl w fsg fsg.bin
python3 edl w modemst1 modemst1.bin
python3 edl w modemst2 modemst2.bin

python3 edl reset
```
</details>

## Installing Debian

Follow the Openstick Instructions

## Troubleshooting OpenWrt/Useful Commands and Tools

<details>
<summary>Instructions</summary>

### Connection Refuse 
##### If you encounter this problem simply set this on your OpenWRT dashboard

```
Name
INTERNET

Protocol
Any

Outbound zone
wan modem

Source address
any

Destination address
any

Action
MASQUERADE - Automatically rewrite to outbound interface IP
```

### Setting Band

```
mmcli -m 0 --set-current-bands='{band}'
```

### Fetching/Creating Messages
##### <a href="files/msg.py">Here</a> is a simply python script I used to Add, Send, and Recieve messages (Only works with OpenWRT)
```
python3 msg.py {argument}
```
</details>

## Firmware
Below, I've provided a stock dump of my firmware. Please note that flashing this firmware is at your own risk. The board number for this dump is FY_UZ801_V3.2.

- <a href="https://drive.google.com/file/d/18SiujpzU4W2YBRhcZdck5IQEYAyBjcZi/view?usp=sharing">UZ801_V3.2 Stock ROM</a>

#### In case you bricked your device and cannot access EDL just short the pins below

<p align="center"><a href="img/Uz801_board.jpg" target="_blank"><img src="img/Uz801_board.jpg" width="2000" alt="EDL PIN"></a></p>

## License

This repository is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

<p align="center">Copyright <b>AlienWolfX</b> 2024</p>