@echo off
echo =============================
echo        Flasher Tool
echo https://github.com/AlienWolfX
echo =============================

fastboot flash fsc ../rsc/required_partitions/fsc.bin
fastboot flash fsg ../rsc/required_partitions/fsg.bin
fastboot flash modemst1 ../rsc/required_partitions/modemst1.bin
fastboot flash modemst2 ../rsc/required_partitions/modemst2.bin
echo Done.

echo Rebooting to system..
fastboot reboot

echo Done!
pause
