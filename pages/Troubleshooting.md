# Troubleshooting

## Changing modem region

First step is to extract the contents of modem.bin from your firmware dump if you use edl without `--genxml` flag you need to open the bin file with PowerISO or another software and extract the partition having type of `GPT FAT16`

Once you have the `IMAGE` folder then go to this directory `IMAGE\MODEM_PR\MCFG\CONFIGS\MCFG_SW\GENERIC\` choose the folder according to your region:

- APAC - Asia Pacific
- CHINA - China
- COMMON - (You can use this if your region is not in the folders list)
- EU - Europe
- NA - North America
- SA - South America
- SEA - South East Asia

Once you have selected your region, you'll find a group of folders typically representing Telcos in your area. Click on the appropriate one until you locate `MCFG_SW.MBN`. Once found, proceed to transfer the file to your dongle by executing `adb push MCFG_SW.MBN /lib/firmware`. After the transfer is complete, execute `adb reboot`. You can now access the internet with your modem.

> [!NOTE]
> There are instances that the modem doesn't automatically work, If you encounter this issue you need to execute `adb shell` and `mmcli -m 0 -e` to enable your modem.
