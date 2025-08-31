
## OpenWRT Issues

### No Network/Modem Stuck at Searching

First, extract the contents of `modem.bin` from your firmware dump. If you used `edl` without the `--genxml` flag, you need to open the bin file with PowerISO or another software and extract the partition with type `GPT FAT16`.

Once you have the `IMAGE` folder, navigate to this directory: `IMAGE\MODEM_PR\MCFG\CONFIGS\MCFG_SW\GENERIC\` and choose the folder according to your region:

- **APAC** - Asia Pacific
- **CHINA** - China
- **COMMON** - Use this if your region is not listed
- **EU** - Europe
- **NA** - North America
- **SA** - South America
- **SEA** - South East Asia

Once you have selected your region, you'll find folders typically representing Telcos in your area. Navigate through the appropriate folder until you locate `MCFG_SW.MBN`.

**To apply the fix:**

1. Transfer the file to your dongle: `adb push MCFG_SW.MBN /lib/firmware`
2. Reboot the device: `adb reboot`
3. Your modem should now have internet access

> [!NOTE]
> If the modem doesn't automatically work, you may need to execute:
>
> ```bash
> adb shell
> mmcli -m 0 -e
> ```
>
> This will manually enable your modem.

### Connection Refused

If you encounter this problem, configure the following settings in your OpenWRT dashboard:

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

### Can't Use RNDIS After Installation

Download the [RNDIS Driver](https://github.com/milkv-duo/duo-files/raw/main/common/RNDIS_drivers_20231018.zip) and add it to your device manager.

Alternatively you can use `Microsoft USB RNDIS` driver.

## Android (Stock)

### Missing IMEI

1. adb connect to the device
2. execute `modem_at AT+WRIMEI={YOUR_IMEI}`
3. reboot

## Debian

### No internet connection via RNDIS using Wi-Fi

`nmcli connection modify usb0 ipv4.method shared`

```bash
nmcli connection down usb0
nmcli connection up usb0
```
