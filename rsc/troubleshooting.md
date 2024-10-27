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

[Here](files/msg.py) is a simple python script I used to Add, Send, and Receive messages (Only works with OpenWRT and Debian)

`python3 msg.py {argument}.`

## Can't use RNDIS after Openwrt Installation

Download [RNDIS Driver](https://github.com/milkv-duo/duo-files/raw/main/common/RNDIS_drivers_20231018.zip)
