# UZ801 Analysis

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

<details>

<summary>Table of Contents</summary>

- [Introduction](#introduction)
- [Initial](#initial)
- [Firmware Dump and Restore](#firmware-dump-and-restore)
- [Getting Root](#getting-root)
- [View Device Display](#view-device-display)
- [Modifying Web UI](#modifying-web-ui)
- [Modifying IP](#changing-default-ip-address)
- [Installing OpenWrt](#installing-openwrt)
- [Installing Debian (6.7)](#installing-debian-based-on-67-msm8916-mainline)
- [Troubleshooting](rsc/troubleshooting.md)
- [Device Recovery](#device-recovery)
- [IMEI Recovery](#imei-recovery)
- [References](#references)
- [License](#license)

</details>

## Introduction

A couple of months ago, I purchased this 4G LTE USB dongle from Shopee for around 300+ PHP. Out of curiosity, I searched the internet to see if there was a way to modify the horrible web UI of the device. Here are some images of the device along with the board and its chips.

| ![front](https://i.ibb.co/55fNj7D/front.jpg "front")    | ![back](https://i.ibb.co/2s72SLL/back.jpg "back")       |
| ------------------------------------------------------- | ------------------------------------------------------- |
| ![board1](https://i.ibb.co/5vZXKMQ/board1.jpg "board1") | ![board2](https://i.ibb.co/1Z8WZq0/board2.jpg "board2") |
| ![front](https://i.ibb.co/sbChyH9/cpu.jpg "front")      | ![back](https://i.ibb.co/Z8mh33d/storage.jpg "back")    |
| ![board1](https://i.ibb.co/jTwXYQ8/soc1.jpg "board1")   | ![board2](https://i.ibb.co/GWfPq4M/soc2.jpg "board2")   |
| ![front](https://i.ibb.co/dQ82vyz/soc3.jpg "front")     |                                                         |

The heart of the dongle is an MSM8916, running a stripped-down version of Android 4.4.4 KitKat. Interestingly, **the setup restricts the use of the additional two CPU cores, likely to prevent the device from overheating**.

The web UI is so poorly designed that you can bypass it entirely by simply changing the URL and calling **_main.html_** to access the main page.

![WTF?](https://i.ibb.co/NYnHgC1/horrible_authentication.gif)

## Device Specs

**Supported Bands** (According to `mmcli`):

<details>

| Band Type | Band Number | Frequency (MHz) |
| --------- | ----------- | --------------- |
| UTRAN     | 1           | 2100            |
| UTRAN     | 8           | 900             |
| EUTRAN    | 1           | 2100            |
| EUTRAN    | 3           | 1800            |
| EUTRAN    | 5           | 850             |
| EUTRAN    | 7           | 2600            |
| EUTRAN    | 8           | 900             |
| EUTRAN    | 20          | 800             |
| EUTRAN    | 38          | 2600 TDD        |
| EUTRAN    | 40          | 2300 TDD        |
| EUTRAN    | 41          | 2500 TDD        |

</details>

**CPUINFO**

<details>

```bash
processor       : 0
model name      : ARMv7 Processor rev 0 (v7l)
BogoMIPS        : 38.40
Features        : swp half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xd03
CPU revision    : 0

processor       : 1
model name      : ARMv7 Processor rev 0 (v7l)
BogoMIPS        : 38.40
Features        : swp half thumb fastmult vfp edsp neon vfpv3 tls vfpv4 idiva idivt
CPU implementer : 0x41
CPU architecture: 7
CPU variant     : 0x0
CPU part        : 0xd03
CPU revision    : 0

Hardware        : Qualcomm Technologies, Inc MSM8916
Revision        : 0000
Serial          : 0000000000000000
Processor       : ARMv7 Processor rev 0 (v7l)
```

</details>

**MEMINFO**

<details>

```bash
MemTotal:         397824 kB
MemFree:           53692 kB
Buffers:            1720 kB
Cached:            68792 kB
SwapCached:         3156 kB
Active:            92836 kB
Inactive:         106204 kB
Active(anon):      62516 kB
Inactive(anon):    67424 kB
Active(file):      30320 kB
Inactive(file):    38780 kB
Unevictable:        1136 kB
Mlocked:               0 kB
SwapTotal:        196604 kB
SwapFree:         180944 kB
Dirty:                28 kB
Writeback:             0 kB
AnonPages:        126840 kB
Mapped:            36980 kB
Shmem:               276 kB
Slab:              31164 kB
SReclaimable:       9572 kB
SUnreclaim:        21592 kB
KernelStack:        5040 kB
PageTables:         5428 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:      395516 kB
Committed_AS:    4596648 kB
VmallocTotal:     499712 kB
VmallocUsed:       49008 kB
VmallocChunk:     309276 kB
```

</details>

## Initial

> [!WARNING]
> I want to clarify that I'm not responsible if something goes wrong and the device gets bricked. Please proceed at your own risk and make sure to back up your data before attempting any modifications.

> [!CAUTION]
> Using Miko tools for firmware dumping, whether via XML or full eMMC block, often results in a corrupted dump (based on my testing). Therefore, I advise you to take multiple dumps, not just with Miko tools but also with EDL.

> [!IMPORTANT]  
> Before doing anything to your USB dongle, you must first enable ADB (if it's not already enabled) by accessing this URL: [http://192.168.100.1/usbdebug.html](http://192.168.100.1/usbdebug.html).

You need to have:

- [edl](https://github.com/bkerler/edl)

If you are using Windows, you must install the following:

- [Universal ADB Driver](https://adb.clockworkmod.com/)
- [QDLoader 9008 Driver](https://qdloader9008.com/)
- [ADB Platform Tools](https://gist.github.com/ifiokjr/b70882d3f1182ed48ec7eefa5c93a740)
- [Zadig](https://zadig.akeo.ie/)

On Windows, If you intend to use edl you might encounter this error: `NotImplementedError: Operation not supported or unimplemented on this platform`. One way to fix this is by uninstalling the QDLoader 9008 Driver and replacing it with Zadig WinUSB[⁽¹⁾](https://github.com/bkerler/edl/issues/349#issuecomment-2060152724).

---

> [!CAUTION]
> Skipping this step may leave you searching the internet for solutions to fix lost IMEI and unknown network issues (which is nearly non-existent). So please be a good potato and create a complete firmware dump before modifying anything.

## Firmware Dump and Restore

<details>
To enable EDL mode on your device, execute the following command:

`adb reboot edl`

Alternatively, for a more hands-on approach, you can short the D+ and GND on the USB or the 2 pads on the board before connecting it to your computer. Once the device is in EDL mode, execute the following commands to create a full backup:

`python3 edl rf {your_filename}.bin`

To restore simply run:

`python3 edl wf {your_filename}.bin`

for individual backup:

`python3 edl rl {your_foldername} --genxml`

You can then use tools such as PowerISO to view the different partitions of the dump.

</details>

## Getting Root

> [!IMPORTANT]  
> Some devices have root access out of the box. Please check if yours does before proceeding.

<details>
To gain root access, you need to install SuperSU on the USB dongle. Ensure you have the following files:

- [SuperSU](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases/download/rev1/SR5-SuperSU-v2.82-SR5-20171001224502.zip)
- [TWRP](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases/download/rev1/twrp-3.1.1-0-seed.img)

After obtaining the necessary files, open a new terminal and execute the following commands:

```bash
adb push SR5-SuperSU-v2.82-SR5-20171001224502.zip /sdcard

adb reboot bootloader

fastboot boot twrp-3.1.1-0-seed.img
```

The device may take some time to restart adb. Please be patient. Once adb is up and running again, proceed with the following commands:

```bash
adb shell

twrp install /sdcard/SR5-SuperSU-v2.82-SR5-20171001224502.zip

reboot
```

</details>

## View Device Display

> [!TIP]
> You need to modify the config.properties file accordingly  
> `adbCommand = {LOCATION_OF_ADB_EXE}` > `localImageFilePath = {LOCATION_ON_YOUR_HOST_MACHINE}`

<details>
We can use adbcontrol to see what's happening with the device.

- [adbcontrol](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases/download/rev1/adbcontrol.zip)

By default, there is a screen timeout which results in a black screen when no activity is present. To bypass this, we need to run:

```bash
adb shell settings put system screen_off_timeout 2147483647

adb shell input keyevent 26
```

Steps:

```bash
extract adbcontrol.zip

cd adbcontrol

java -jar adbcontrol.jar
```

</details>

## Modifying Web UI

> [!TIP]  
> Don't forget to change the `versionCode` and `versionName` in the apktool.yml

<details>
First and foremost, we need to identify the correct APK file. Some versions of this dongle come with Jetty2m.apk and MifiService.apk. In my case, the MifiService.apk was located in **/system/priv-app/MifiService.apk**. I then pulled the APK using the command `adb pull /system/priv-app/MifiService.apk`

Fetch test-keys:

```bash
git clone https://android.googlesource.com/platform/build

cd build/target/product/security/

openssl pkcs8 -inform DER -nocrypt -in platform.pk8 -out platform.pem

openssl pkcs12 -export -in platform.x509.pem -inkey platform.pem -out platform.p12 -password pass:android -name testkey

keytool -importkeystore -deststorepass android -destkeystore platform.keystore -srckeystore platform.p12 -srcstoretype PKCS12 -srcstorepass android

mv platform.keystore {YOUR_WORK_DIR}
```

Decompile apk:

`java -jar apktool.jar d {APP_NAME}.apk -o {APP_NAME}`

You can then start to customization under the assets folder

Recompile apk(If asked for a passphrase type `android`):

`java -jar apktool.jar b -o unsigned.apk {APP_NAME}`

Zipalign:

```bash
zipalign -v 4 unsigned.apk aligned.apk

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./platform.keystore  aligned.apk testkey
```

Install apk:

`adb install -r aligned.apk`

</details>

## Changing Default IP Address

<details>
<summary>1. Modify MifiService APK</summary>

```bash
# Download WebUI from Device
adb pull /system/priv-app/MifiService.apk

# Decompile APK
java -jar apktool.jar d MifiService.apk -o MifiService

# Edit IP addresses in decompiled files
# Replace all instances of '192.168.100.' with your desired IP

# Recompile (passphrase: android)
java -jar apktool.jar b -o unsigned.apk MifiService

# Sign and align
zipalign -v 4 unsigned.apk aligned.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./platform.keystore aligned.apk testkey

# Install modified APK
adb install -r aligned.apk
```

</details>

<details>
<summary>2. Modify Init Service Script</summary>

```bash
# Mount system as writable
adb shell mount -o rw,remount,rw /system

# Edit init script
adb shell busybox vi /system/bin/initmifiservice.sh

# Replace all instances of '192.168.100.' with your desired IP
```

</details>

<details>
<summary>3. Modify System Services</summary>

```bash
# Pull services.jar
adb pull /system/framework/services.jar

# Decompile JAR
java -jar apktool.jar d -o services services.jar

# Edit IP addresses in decompiled files
# Replace all instances of '192.168.100.' with your desired IP

# Recompile JAR
java -jar apktool.jar b -c -f -o services.jar services

# Push modified JAR
adb push services.jar /system/framework/

# Remount system as read-only
adb shell mount -o ro,remount,ro /system

# Reboot device
adb reboot
```

</details>

> [!TIP]
>
> - Use VS Code's search and replace feature (Ctrl+H) to modify IP addresses
> - Make sure to keep track of all modified files
> - Create a backup before starting
> - Test network connectivity after each step

Credit: Originally documented by [tarokeitaro](https://github.com/AlienWolfX/UZ801-USB_MODEM/issues/11#issuecomment-2473418269)

## Installing OpenWRT

> [!IMPORTANT]
> If you can't get a signal with yours, kindly refer to [Changing Region](rsc/troubleshooting.md#changing-modem-region).

1. Download `openwrt-UZ801.tar.xz` from releases
2. Extract the compressed file with `tar xf openwrt-UZ801.tar.xz`.
3. cd OpenWRT-UZ801.
4. For Linux, run `./flash.sh`; for Windows, run `./flash.bat`.
5. If all goes well you can now see a constant blinking red and blue light.

## Installing Debian (Based on 6.7 msm8916 mainline)

1. Download the file using: `wget https://download.wvthoog.nl/openstick-uz801-v3.0.zip`.
2. Extract the zip file.
3. Execute `adb reboot-bootloader`
4. For Linux, run `./flash.sh`; for Windows, run `./flash.bat`.
5. Wait for the script to execute.
6. If all goes well All basic functions should now work. Configure the device for your chosen use case.

For more information visit [Wim van 't Hoog](https://wvthoog.nl/openstick/) blog

## Device Recovery

In case you brick your device and cannot access EDL, just short the pins below and follow the [restore guide](#firmware-dump-and-restore).

![alt text](https://wiki.postmarketos.org/images/0/00/Uz801_board.jpg "UZ801 Board")

### IMEI Recovery

While the IMEI can be recovered using `modem_at AT+WRIMEI="{YOUR_IMEI}"`, the device's ability to connect to a network may be lost. This can be resolved by flashing the `modemst1` and `modemst2` partitions with firmware dumps from a working device in your region.

## References

This project references the following resources:

- [Wim van 't Hoog](https://wvthoog.nl/openstick/) - For Debian build and instructions.

- [ddscentral](https://github.com/ddscentral) - For Debian build and instructions.

- [postmarketOS](<https://wiki.postmarketos.org/wiki/Zhihe_series_LTE_dongles_(generic-zhihe)>) - Information and Board pinout image

- [edl](https://github.com/bkerler/edl) - Primary tool for dumping the Original firmware

- [adrian-bl](https://github.com/adrian-bl) - Instruction for modifying Web UI

- [HandsomeYingyan](https://github.com/HandsomeYingyan) - For HandsomeMod source code

These resources have been instrumental in the creation of this documentation.

## License

This repository is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

<p align="center">Copyright <b>AlienWolfX</b> 2025</p>
