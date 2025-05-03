#!/system/bin/sh
# This script is a part of the MifiService apk this is located in /system/bin/initmifiservice.sh


usbcfg=`getprop persist.sys.usb.config`
usbdebug="rndis,serial_smd,diag,adb"
usbrndis="rndis"

if [ $usbcfg == $usbdebug ]; then
	echo "usbdebug"
elif [ $usbcfg == $usbrndis ]; then
	echo "rndis"
else
	setprop persist.sys.usb.config rndis
	sync
fi

insmod /system/lib/modules/xt_HL.ko
iptables -t mangle -I PREROUTING -i rmnet0 -j TTL --ttl-set 64
iptables -t mangle -A POSTROUTING  -j TTL --ttl-set 64

brctl addbr br0
ifconfig br0 192.168.100.1 up # Change this to your desired IP
brctl addif br0 rndis0

modem_at

chmod 666 /dev/smd11
