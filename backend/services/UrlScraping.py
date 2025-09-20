import time
import re
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def extract_all_text_with_selenium(url, scroll_attempts=10, scroll_pause=1.0):
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--window-size=1920x1080")
    chrome_options.add_argument("user-agent=Mozilla/5.0")

    driver = webdriver.Chrome(options=chrome_options)

    try:
        driver.get(url)
        WebDriverWait(driver, 15).until(EC.presence_of_element_located((By.TAG_NAME, "body")))

        # Scroll progressif pour charger tout le contenu
        last_height = driver.execute_script("return document.body.scrollHeight")
        for _ in range(scroll_attempts):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(scroll_pause)
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        time.sleep(1)

        # Récupérer le titre
        title_selectors = [
            "h1.headline",
            "h1",
            ".newsheadline",
            ".profilheader",
            "title"
        ]
        title = ""
        for sel in title_selectors:
            try:
                if sel == "title":
                    title = driver.title.strip()
                else:
                    elem = WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CSS_SELECTOR, sel)))
                    title = elem.text.strip()
                if title:
                    break
            except:
                continue
        if not title:
            title = "Titre non trouvé"

        # Extraire texte depuis balises communes
        tags = ["p", "li", "h1", "h2", "h3", "span"]
        texts = []
        for tag in tags:
            elements = driver.find_elements(By.TAG_NAME, tag)
            for el in elements:
                try:
                    text = el.text.strip()
                    if len(text) > 10 and text not in texts:
                        texts.append(text)
                except:
                    continue

        texts = list(dict.fromkeys(texts))  # supprimer doublons

        content = "\n\n".join(texts)
        full_text = title + "\n\n" + content

        return full_text

    finally:
        driver.quit()
