import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# URL of the website
url = "https://www.inthestyle.com/"

# Create folder to save images
folder = "images"
os.makedirs(folder, exist_ok=True)

# Fetch the webpage
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

# Find all image tags
img_tags = soup.find_all("img")

# Download each image
for img in img_tags:
    img_url = urljoin(url, img["src"])
    img_name = os.path.join(folder, img_url.split("/")[-1])
    
    with open(img_name, "wb") as f:
        f.write(requests.get(img_url).content)

print("All images downloaded successfully!")

https://img-va.myshopline.com/image/store/2005064183/1681718798653/logo.png?w=459&h=61
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/DOWNLOAD-APP-DESKTOP7-1-1.jpeg?w=1900&h=61
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/DOWNLOAD-APP-MOB-QR.jpeg?w=1900&h=315
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/21-2-25-RACES-BANNER-DESKTOP-1-(2).jpeg?w=1900&h=690
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/21-2-25-RACES-BANNER-MOB-1-(1).jpeg?w=1000&h=1500
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/SPRING-WAREHOUSE-THIN-DESKTOP.jpeg?w=1900&h=95
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/SPRING-WAREHOUSE-THIN-APP.jpeg?w=1900&h=315
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/BW-(1).jpeg?w=1000&h=1000
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/NSG-(1).jpeg?w=1000&h=1000
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/HOL-(1).jpeg?w=1000&h=1000
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/Denim-9-(1).jpeg?w=1000&h=1000
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/13-2-25-SPRING-STAPLES-BANNER-DESKTOP-(1).jpeg?w=1900&h=690
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/13-2-25-SPRING-STAPLES-BANNER-MOB-(1).jpeg?w=1000&h=1500
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBOUBLZ7860-01.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBOUBLZ7860-04-(LEAD).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOTST6221-02.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOTST6221-05-(LEAD).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOSWE6217-02-(2).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOSWE6217-04-(LEAD)-(2).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOSWE6219-01.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOSWE6219-03-(LEAD).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOSHB5986-01.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOSHB5986-03-(LEAD).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOTST6223-01.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOTST6223-03-(LEAD).jpeg?w=800&h=1200
8VM41315:2 
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBBOTRO7862-03.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBBOTRO7862-01-(LEAD).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBBOSKI7285-03.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBBOSKI7285-01-(LEAD).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBBOLEG7446-03.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBBOLEG7446-02-(LEAD).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBOUSHK5947-01.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBOUSHK5947-03-(LEAD).jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOSHB7560-01.jpeg?w=800&h=1200
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/OBTOSHB7560-06-(LEAD).jpeg?w=800&h=1200
10VM41315:2 
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/Ladies-Day-outfit-ideas.jpeg?w=1000&h=1000
VM41315:2 
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/Wedding-Guest-Outfit-Ideas.jpeg?w=1000&h=1000
VM41315:2 
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/Spring-Outfit-Ideas.jpeg?w=1000&h=1000
5VM41315:2 
VM41315:2 https://img-va.myshopline.com/image/store/1681718798653/c12d9c1c10c44eb2ad5c49307659c269.png
11VM41315:2 
VM41315:2 https://d3k81ch9hvuctc.cloudfront.net/company/Rye5Vt/images/059d68f2-2998-4221-8a58-cab75e7e0df7.jpeg
VM41315:2 https://bat.bing.net/action/0?ti=211050179&tm=gtm002&Ver=2&mid=41c63921-1741-4972-901a-4dcadc74e946&bo=2&uach=pv%3D10.0.0&pi=918639831&lg=en-US&sw=1366&sh=768&sc=24&tl=In%20The%20Style%20%7C%20Women%27s%20Clothes%20%26%20Fashion&p=https%3A%2F%2Fwww.inthestyle.com%2F&r=https%3A%2F%2Fwww.inthestyle.com%2F&lt=25290&evt=pageLoad&sv=1&asc=D&cdb=AQIT&rn=607421
undefined