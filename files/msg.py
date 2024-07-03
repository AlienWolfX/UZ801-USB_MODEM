#!python3
import os
import re
import sys
from prettytable import PrettyTable

unknown = []
sent = []
recv = []

def get_msg_num(line):
    return int(line.rstrip(' (sent)\n').rstrip(' (received)\n').rstrip(' (unknown)\n')[::-1].split('/',1)[0])

def send_msg(num):
    os.system("sudo mmcli -s "+str(num)+" --send")

def del_msg(num):
    os.system("sudo mmcli -m 0 --messaging-delete-sms="+str(num))

def scan_local_msg():
    p=os.popen('mmcli -m 0 --messaging-list-sms') 
    for line in p.readlines():
        if line.endswith(' (unknown)\n'):
            num = get_msg_num(line)
            unknown.append(num)
        if line.endswith(' (sent)\n'):
            num = get_msg_num(line)
            sent.append(num)
        if line.endswith(' (received)\n'):
            num = get_msg_num(line)
            recv.append(num)    
    print('Not sent:', unknown, 'Sent:', sent, 'Received:', recv)

def add_msg(number,text):
    os.system("sudo mmcli -m 0 --messaging-create-sms=\"text=\'"+text+"\',number=\'+"+number+"\'\"")

def clean_sent():
    for i in sent:
        del_msg(i)
        
def clean_unknown():
    for i in unknown:
        del_msg(i)
        
def clean_recv():
    for i in recv:
        del_msg(i)

def send_all():
    for i in unknown:
        send_msg(i)

def forward_msg():
    for i in recv:
        p=os.popen('mmcli -m 0 -s '+str(i))
        res = smtp.mail(p.read())
        if res:
            print('Success:',i)
        else:
            print('Failed:',i)
            
def view_msg():
    p = os.popen('mmcli -m 0 --messaging-list-sms')
    output = p.read()
    sms_numbers = re.findall(r'/SMS/(\d+)', output)
    
    table = PrettyTable(['Number', 'Text', 'Timestamp'])
    
    for i in sms_numbers:
        p = os.popen('mmcli --modem 0 --sms '+i)
        sms_content = p.read()
        number = re.search(r'number: (\+\d+)', sms_content)
        text = re.search(r'text: (.*)', sms_content)
        timestamp = re.search(r'timestamp: (.*)', sms_content)
        if number and text and timestamp:
            # Add the data to the table
            table.add_row([number.group(1), text.group(1), timestamp.group(1)])
    
    # Print the table
    print(table)

cmd = sys.argv
cmd_len = len(cmd)

if len(cmd) > 1:
    if cmd[1] == 'add':
        if len(cmd) > 3:
            add_msg(cmd[2],cmd[3])
        else:
            print('Error! add requires 2 arguments.')
            print('Hint: python3 msg.py [number] [message].')
    elif cmd[1] == 'send':
        scan_local_msg()
        send_all()
    elif cmd[1] == 'view':
        view_msg()
    elif cmd[1] == 'clean':
        scan_local_msg()
        clean_sent()
        clean_unknown()
        clean_recv()
    elif cmd[1] == 'forward':
        scan_local_msg()
        forward_msg()
    elif cmd[1] == 'version':
        print('UZ801 SMS Tool v1.2.0')
        print('Developed by AlienWolfX')
else:
    print('Usage: python3 msg.py [command]')
    print('Available Commands')
    print(' *add\n *send\n *view\n *clean\n *forward')