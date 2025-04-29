import requests
import json
from time import sleep

BASE_URL = "http://192.168.100.1/ajax"
HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}

def test_function(func_no):
    """Test a specific function number by sending POST request."""
    try:
        data = {"funcNo": func_no}
        response = requests.post(BASE_URL, 
                               json=data,
                               headers=HEADERS,
                               timeout=5)
        
        if response.status_code == 200:
            result = response.json()
            print(f"\nFunction {func_no}:")
            print(json.dumps(result, indent=2))
            return result
        else:
            print(f"Error {response.status_code} testing function {func_no}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Request failed for function {func_no}: {e}")
        return None

if __name__ == "__main__":
    functions_to_test = [1021, 1030, 1031]
    
    print("Starting API function tests...")
    for func_no in functions_to_test:
        test_function(func_no)
        sleep(0.5)
    
    print("\nTesting complete")