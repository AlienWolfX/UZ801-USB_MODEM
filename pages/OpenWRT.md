# UZ801 v3.2 OpenWRT

## Important Notes

The OpenWRT build is based on an older version of OpenWRT. While some packages and applications may have limited functionality, the build remains usable. This guide is intended for users with OpenWRT experience.

> [!WARNING]
> If you cannot get a signal after installation, please refer to the [Region Change Guide](rsc/troubleshooting.md#changing-modem-region).

## Installation Steps

### Prerequisites

- Download [`openwrt-UZ801.tar.xz`](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases) from releases
- Ensure device is in EDL mode
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

## Additional Resources

- [HandsomeYingyan](https://github.com/HandsomeYingyan) - For HandsomeMod source code
