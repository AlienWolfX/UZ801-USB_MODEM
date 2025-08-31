import subprocess
import sys
import re
from time import sleep

def run_adb_command(command):
    """Execute an ADB shell command and return the output."""
    try:
        process = subprocess.run(['adb', 'shell', command],
                               stdout=subprocess.PIPE,
                               stderr=subprocess.PIPE,
                               text=True,
                               check=True)
        return process.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}", file=sys.stderr)
        return None

def restart_fastboot():
    """Restart the device in fastboot mode."""
    try:
        subprocess.run(['adb', 'reboot', 'bootloader'], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}", file=sys.stderr)

def validate_imei(imei):
    """Validate IMEI number format."""
    if not re.match(r'^\d{15}$', imei):
        print("Error: IMEI must be exactly 15 digits")
        return False
    return True

def check_device_connection(mode='adb'):
    """Check if device is connected in ADB or fastboot mode."""
    try:
        cmd = [mode, 'devices']
        output = subprocess.check_output(cmd, text=True)
        devices = output.strip().split('\n')[1:]
        return len([d for d in devices if d.strip()]) > 0
    except subprocess.CalledProcessError:
        return False

def main():
    if not check_device_connection('adb'):
        print("No device connected in ADB mode")
        return

    imei = input("Enter IMEI number: ")
    if not validate_imei(imei):
        return

    result = run_adb_command(f'modem_at AT+WRIMEI="{imei}"')
    if result:
        print("IMEI written successfully")
        print("Rebooting to bootloader...")
        sleep(5)

        subprocess.run(['flash.bat'])
    else:
        print("Failed to write IMEI")
        return

if __name__ == '__main__':
    main()