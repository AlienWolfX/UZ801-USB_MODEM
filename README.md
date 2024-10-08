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
- [Installing OpenWrt](#installing-openwrt)
- [Installing Debian](#installing-debian)
- [Troubleshooting OpenWrt/Useful Commands and Tools](rsc/troubleshooting.md)
- [Firmware](#firmware)
- [Recovery](#recovery)
- [References](#references)
- [License](#license)

</details>

## Introduction

A couple of months ago, I purchased this 4G LTE USB Dongle from Shopee for around 300+ PHP. Out of curiosity, I searched the internet to see if there was a way to modify the horrible web UI of the device. Here are some images of the device along with the board and it's chips.

| ![front](img/front.jpg "front")    | ![back](img/back.jpg "back")       |
| ---------------------------------- | ---------------------------------- |
| ![board1](img/board1.jpg "board1") | ![board2](img/board2.jpg "board2") |
| ![front](img/cpu.jpg "front")      | ![back](img/storage.jpg "back")    |
| ![board1](img/soc1.jpg "board1")   | ![board2](img/soc2.jpg "board2")   |
| ![front](img/soc3.jpg "front")     |                                    |

The device heart of the dongle is a MSM8916 which is running a stripped-down version of Android 4.4.4 KitKat, the android setup restricts the use of the additional two CPU cores. I believe this is to prevent the device from overheating.

The web UI is so poorly designed that simply changing the URL and calling `main.html` will take you to the main page:

![WTF?](img/horrible_authentication.gif)


## Initial

Before doing anything to your USB dongle, you must first enable ADB (if it's not already enabled) by accessing this URL: [http://192.168.100.1/usbdebug.html](http://192.168.100.1/usbdebug.html).

You need to have:

- [edl](https://github.com/bkerler/edl)

If you are using Windows, you must install the following:

- [Universal ADB Driver](https://adb.clockworkmod.com/)
- [QDLoader 9008 Driver](https://qdloader9008.com/)
- [ADB Platform Tools](https://gist.github.com/ifiokjr/b70882d3f1182ed48ec7eefa5c93a740)
- [Zadig](https://zadig.akeo.ie/)

On Windows, you might encounter this error: `NotImplementedError: Operation not supported or unimplemented on this platform`. One way to fix this is by uninstalling the QDLoader 9008 Driver and replacing it with Zadig WinUSB[⁽¹⁾](https://github.com/bkerler/edl/issues/349#issuecomment-2060152724).

## Firmware Dump and Restore

To enable EDL mode on your device, execute the following command:

`adb reboot edl`

Alternatively, for a more hands-on approach, you can short the D+ and GND on the USB before connecting it to your computer. Once the device is in EDL mode, execute the following commands to create a backup:

`python3 edl rf {your_filename}.bin`

To restore simply run:

`python3 edl wf {your_filename}.bin`

You can then use tools such as PowerISO to view the different partitions of the image.

## Getting Root

To gain root access, you need to install SuperSU on the USB dongle. Ensure you have the following files:

- [SuperSU](files/SR5-SuperSU-v2.82-SR5-20171001224502.zip)
- [TWRP](files/twrp-3.1.1-0-seed.img)

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

## View Device Display

As the device is running Android, we can see the display as if it has a screen using a tool named adbcontrol.

- [adbcontrol](files/adbcontrol.zip)

Steps:

```bash
extract adbcontrol.zip
cd adbcontrol
modify config.properties by pointing to the appropriate directories
java -jar adbcontrol.jar
```

Note:

```bash
adbCommand = {LOCATION_OF_ADB_EXE}
localImageFilePath = {LOCATION_ON_YOUR_HOST_MACHINE}
```

## Modifying Web UI

Thanks to this wonderful and well written guide from [here](https://www.blinkenlights.ch/ccms/posts/aliexpress-lte-2/) we can now modify the web ui

First and foremost we need to identify the correct apk file some version of this dongle comes with the Jetty2m.apk and MifiService.apk in my case I have the MifiService.apk which was located in `/system/priv-app/MifiService.apk` I then pull the packed using `adb pull /system/priv-app/MifiService.apk` to get the apk package here are some of the steps from the instructions above:

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

> [!NOTE]  
> Don't forget to change the `versionCode` and `versionName` in the apktool.yml

Recompile apkn(If asked for a passphrase type `android`):

`java -jar apktool.jar b -o unsigned.apk {APP_NAME}`

Zipalign:

```bash
zipalign -v 4 unsigned.apk aligned.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./platform.keystore  aligned.apk testkey
```

Install apk:

`adb install -r aligned.apk `

## Installing OpenWrt

To install openwrt on the device you will need

- [OpenWRT UZ801_v3.2](files/openwrt-UZ801_v3.2.tar.gz)

- fsc.bin, fsg.bin modemst1.bin, modemst2.bin from your backup

Steps

```bash
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

## Installing Debian

1. Download the file using: `wget https://download.wvthoog.nlopenstick-uz801-v3.0.zip`.
2. Extract the zip file.
3. For Linux, run `./flash.sh`; for Windows, run `./flash.bat`.
4. Wait for the script to execute.
5. Done, All basic functions should now work. Configure the device for your chosen use case.

For more information visit [Wim van 't Hoog](https://wvthoog.nl/openstick/) blog

## Firmware

Below, I’ve provided a stock dump of my firmware (Philippines version). Please note that flashing this firmware is at your own risk. The board number for this dump is FY_UZ801_V3.2. You might also need to replace the modem firmware with yours for it to work in your region.

- [UZ801_V3.2 Stock ROM](https://drive.google.com/file/d/18SiujpzU4W2YBRhcZdck5IQEYAyBjcZi/view?usp=sharing)

## Recovery

In case you bricked your device and cannot access EDL just short the pins below

![alt text](img/Uz801_board.jpg "UZ801 Board")

## References

This project references the following resources:

- [Wim van 't Hoog](https://wvthoog.nl/openstick/) - For Debian Kernel build and instructions.

- [ddscentral](https://github.com/ddscentral) - For Debian build and instructions.

- [postmarketOS](<https://wiki.postmarketos.org/wiki/Zhihe_series_LTE_dongles_(generic-zhihe)>) - Instructions and Board pinout image

- [edl](https://github.com/bkerler/edl) - Primary tool for dumping the Original firmware

- [adrian-bl](https://github.com/adrian-bl) - Instruction for modifying Web UI

These resources have been instrumental in the creation of this project.

## License

This repository is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

<p align="center">Copyright <b>AlienWolfX</b> 2024</p>
