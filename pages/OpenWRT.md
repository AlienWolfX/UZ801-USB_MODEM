## UZ801 v3.2 OpenWRT

## Important Notes

The OpenWRT build is based on an older version of OpenWRT. While some packages and applications may have limited functionality, the build remains usable. This guide is intended for users with OpenWRT experience.

## Installation Steps

### Prerequisites

- Download [`openwrt-UZ801.tar.xz`](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases) from releases
- Ensure device is in fastboot mode
- Backup your current firmware (recommended)

### Installation Process

1. Extract the archive:

```bash
tar xf openwrt-UZ801.tar.xz
cd OpenWRT-UZ801
```

2. Run the appropriate flash script:

- **Windows**:

```batch
flash.bat
```

- **Linux**:

```bash
chmod +x flash.sh
./flash.sh
```

### Verification

After successful installation, you should see:

- Alternating red and blue LED blinks
- Device appears in network connections
- Web interface accessible at 192.168.1.1

## Troubleshooting

- If flashing fails, retry in EDL mode
- For signal issues, check region settings
- Web interface issues may require cache clear

### Can't use modem

Kindly refer to [Changing Region](https://github.com/AlienWolfX/UZ801-USB_MODEM/wiki/Troubleshooting#changing-modem-region)

### Connection Refuse

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

### Can't use RNDIS after Installation

Download [RNDIS Driver](https://github.com/milkv-duo/duo-files/raw/main/common/RNDIS_drivers_20231018.zip) and add it your device manager

Alternatively you can use `Microsoft USB RNDIS` driver.
