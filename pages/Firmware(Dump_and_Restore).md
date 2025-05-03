&nbsp;

## Entering EDL Mode

There are two methods to enable Emergency Download (EDL) mode:

### Method 1: Using ADB

For Stock firmware:

```bash
adb reboot edl
```

For OpenWRT:

```bash
adb reboot bootloader

fastboot oem reboot edl
```

### Method 2: Hardware Method

1. Locate either:
   - The D+ and GND pins on the USB connector
   - The two dedicated EDL pads on the board
2. Short these points together
3. Connect the device to your computer while maintaining the short

## Firmware Operations

### Creating a Full Backup

```bash
python3 edl rf backup_filename.bin
```

### Restoring Full Firmware

```bash
python3 edl wf backup_filename.bin
```

## Analyzing the Firmware

You can examine the partition structure of your backup using these tools:

- PowerISO
- 7-Zip
- HxD (Hex Editor)

> [!NOTE]
>
> - Always keep a backup of your original firmware
> - Ensure stable USB connection during operations
> - Do not interrupt the dump/restore process
> - Use a high-quality USB cable
> - Keep device cool during operations

## Troubleshooting

If the device is not detected in EDL mode:

1. Check USB drivers
2. Try different USB ports
3. Verify cable connection
4. Ensure proper EDL mode entry
