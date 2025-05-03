&nbsp;

## Root Access Setup

### Prerequisites

Download these required files:

- [SuperSU v2.82 SR5](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases/download/rev1/SR5-SuperSU-v2.82-SR5-20171001224502.zip)
- [TWRP Recovery 3.1.1](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases/download/rev1/twrp-3.1.1-0-seed.img)

### Installing SuperSU

1. Push SuperSU zip to device:

```bash
adb push SR5-SuperSU-v2.82-SR5-20171001224502.zip /sdcard
```

2. Boot into TWRP recovery:

```bash
adb reboot bootloader
fastboot boot twrp-3.1.1-0-seed.img
```

> [!NOTE]
> Wait for ADB to detect the device again. This may take a few moments.

3. Install SuperSU through TWRP:

```bash
adb shell
twrp install /sdcard/SR5-SuperSU-v2.82-SR5-20171001224502.zip
reboot
```

## BusyBox Installation

The default BusyBox installation lacks several commands (like `vi`). Here's how to install a complete version:

### Steps

1. Download [BusyBox APK](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases/download/rev1/busybox.apk)

2. Install the APK:

```bash
adb install busybox.apk
```

3. Launch BusyBox:
   - Follow the [View Display Guide](https://github.com/AlienWolfX/UZ801-USB_MODEM?tab=readme-ov-file#view-device-display)
   - Open BusyBox application
   - Tap "Install"
   - Grant root permissions when prompted

### Verification

To verify installation:

```bash
adb shell
busybox --help
```

## APK Modifications

### Locating the APK

First, identify and pull the correct APK:

```bash
# MifiService.apk is typically located at:
adb pull /system/priv-app/MifiService.apk
```

### Setting Up Test Keys

```bash
# Clone Android platform build tools
git clone https://android.googlesource.com/platform/build

# Navigate to security folder
cd build/target/product/security/

# Generate platform key files
openssl pkcs8 -inform DER -nocrypt -in platform.pk8 -out platform.pem
openssl pkcs12 -export -in platform.x509.pem -inkey platform.pem -out platform.p12 -password pass:android -name testkey
keytool -importkeystore -deststorepass android -destkeystore platform.keystore -srckeystore platform.p12 -srcstoretype PKCS12 -srcstorepass android

# Move keystore to working directory
mv platform.keystore {YOUR_WORK_DIR}
```

### Modifying the APK

1. Decompile:

```bash
java -jar apktool.jar d MifiService.apk -o MifiService
```

2. Make modifications in the `assets` folder

3. Recompile (use `android` as passphrase when prompted):

```bash
java -jar apktool.jar b -o unsigned.apk MifiService
```

4. Sign and align:

```bash
zipalign -v 4 unsigned.apk aligned.apk
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./platform.keystore aligned.apk testkey
```

5. Install modified APK:

```bash
adb install -r aligned.apk
```

### Pre-modified APK

I've created a [modified version](https://github.com/AlienWolfX/UZ801-USB_MODEM/releases/download/rev1/MifiService_with_cmd_shell.apk) that:

- Replaces password modification (`funcNo: 1020`) with command execution
- Returns command results directly
- Removes related HTML/JS files

## Troubleshooting

If you encounter issues:

- Ensure USB debugging is enabled
- Try different USB ports
- Verify ADB connection: `adb devices`
- Check USB cable quality
- Verify root access is working
