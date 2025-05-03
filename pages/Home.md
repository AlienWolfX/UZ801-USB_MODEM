# UZ801 v3.2

## Welcome to the UZ801-USB_MODEM repository Wiki!

This Wiki contains extensive information and research findings about the UZ801 v3.2 Modem. Before exploring the topics discussed in this wiki, please note that my research primarily focuses on the **UZ801 v3.2** model specifically. While some findings may be applicable to other `MSM8916`-based dongles, compatibility is not guaranteed.

## Contents

- [Overview](https://github.com/AlienWolfX/UZ801-USB_MODEM/wiki/Overview)
- [Firmware Dump and Restore](<https://github.com/AlienWolfX/UZ801-USB_MODEM/wiki/Firmware(Dump_and_Restore)>)
- [Modifications](https://github.com/AlienWolfX/UZ801-USB_MODEM/wiki/Modifications)
- [OpenWRT](https://github.com/AlienWolfX/UZ801-USB_MODEM/wiki/OpenWRT)
- [Debian](https://github.com/AlienWolfX/UZ801-USB_MODEM/wiki/Debian)
- [Troubleshooting](https://github.com/AlienWolfX/UZ801-USB_MODEM/wiki/Troubleshooting)

## Required Tools

Before proceeding with any instructions in this guide, please ensure you have the following tools:

- [edl](https://github.com/bkerler/edl)

If you are using Windows, you must install the following:

- [Universal ADB Driver](https://adb.clockworkmod.com/)
- [QDLoader 9008 Driver](https://qdloader9008.com/)
- [ADB Platform Tools](https://gist.github.com/ifiokjr/b70882d3f1182ed48ec7eefa5c93a740)
- [Zadig](https://zadig.akeo.ie/)

On Windows, If you intend to use edl you might encounter this error: `NotImplementedError: Operation not supported or unimplemented on this platform`. One way to fix this is by uninstalling the QDLoader 9008 Driver and replacing it with Zadig WinUSB[⁽¹⁾](https://github.com/bkerler/edl/issues/349#issuecomment-2060152724).

## Contributing

Contributions are welcome! If you have insights or modifications to improve this wiki, feel free to submit a pull request or open an issue.
