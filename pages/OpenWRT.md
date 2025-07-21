&nbsp;

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
