import time
from bs4 import BeautifulSoup
import requests

start_time = time.time()
scans = 0
skips = 0
na = 0

url = "https://astra-honda.com"
headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"}

products = []
data = []

if __name__ != "__main__":
    pass
else:  
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        print(response.status_code)
        
        execution_time = time.time() - start_time
        
        print("Scraping complete!")
        print(f"Time taken: {execution_time:.2f} seconds")
        print("scans: ", scans)
        print("skips: ", skips)
        print("na: ", na)
    else:
        print(f"Failed to retrieve the webpage, Status Code: {response.status_code}")
