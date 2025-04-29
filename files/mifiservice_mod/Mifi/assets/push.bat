REM filepath: c:\Users\cruiz\OneDrive\Documents\Github\UZ801-USB_MODEM\files\mifiservice_mod\Mifi\assets\push.bat
@echo off
echo Pushing jetty2 files...
adb push "jetty2" "/data/data/com.mifiservice.hello/files/jetty2/"
if %errorlevel% equ 0 (
    echo Files pushed successfully
) else (
    echo Failed to push files
    pause
    exit /b 1
)
pause