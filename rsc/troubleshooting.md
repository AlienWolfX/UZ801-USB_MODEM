# Troubleshooting

## Connection Refuse

If you encounter this problem simply set this on your OpenWRT dashboard

```bash
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

## No internet connection via RNDIS using Wi-Fi

`nmcli connection modify usb0 ipv4.method shared`

```bash
nmcli connection down usb0
nmcli connection up usb0
```

## Setting Band

`mmcli -m 0 --set-current-bands='{band}'`

## Fetching/Creating Messages

>[!IMPORTANT]
> This is only applicable with OpenWRT and Debian.

[Here](files/msg.py) is a simple python script I used to Add, Send, and Receive messages.

`python3 msg.py {argument}.`

## Can't use RNDIS after Openwrt Installation

>[!IMPORTANT]
> This is only applicable with OpenWRT and Debian.

Download [RNDIS Driver](https://github.com/milkv-duo/duo-files/raw/main/common/RNDIS_drivers_20231018.zip) and add it your device manager

Alternatively you can use `Microsoft USB RNDIS` driver.

## Changing modem region

First step is to extract the contents of modem.bin from your firmware dump if you use edl without `--genxml` flag you need to open the bin file with PowerISO or another software and extract the partition having type of `GPT FAT16`

Once you have the `IMAGE` folder then go to this directory `IMAGE\MODEM_PR\MCFG\CONFIGS\MCFG_SW\GENERIC\` choose the folder according to your region:

* APAC - Asia Pacific
* CHINA - China
* COMMON - (You can use this if your region is not in the folders list)
* EU - Europe
* NA - North America
* SA - South America
* SEA - South East Asia

Once you have selected your region, you'll find a group of folders typically representing Telcos in your area. Click on the appropriate one until you locate `MCFG_SW.MBN`. Once found, proceed to transfer the file to your dongle by executing `adb push MCFG_SW.MBN /lib/firmware`. After the transfer is complete, execute `adb reboot`. You can now access the internet with your modem.

> [!NOTE]
> There are instances that the modem doesn't automatically work, If you encounter this issue you need to execute `adb shell` and `mmcli -m 0 -e` to enable your modem.
