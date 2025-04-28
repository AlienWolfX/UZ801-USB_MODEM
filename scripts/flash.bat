@echo off
echo =============================
echo        Flasher Tool
echo https://github.com/AlienWolfX
echo =============================

fastboot flash fsc ../files/required_partitions/fsc.bin
fastboot flash fsg ../files/required_partitions/fsg.bin
fastboot flash modemst1 ../files/required_partitions/modemst1.bin
fastboot flash modemst2 ../files/required_partitions/modemst2.bin
echo Done.

echo Rebooting to system..
fastboot reboot

echo Done!
pause
