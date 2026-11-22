import os
import re
from bs4 import BeautifulSoup
import urllib.parse

BASE_URL = "https://mpkv.ac.in"
HTML_FILE = "test_direct.html"

with open(HTML_FILE, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
discovered = {}

# 1. Search all <a> tags
for a in soup.find_all("a", href=True):
    href = a["href"].strip()
    text = a.get_text(separator=" ", strip=True)
    key = a.get("key", "")
    
    if not href or href.startswith("javascript:") or href.startswith("tel:") or href.startswith("mailto:"):
        continue
    if href in ["#", "!#"]:
        continue
    
    # Normalize path
    clean_href = href
    if clean_href.startswith("~"):
        clean_href = clean_href.lstrip("~")
    if clean_href.startswith("/.."):
        clean_href = clean_href.replace("/..", "")
    if clean_href.startswith("../"):
        clean_href = clean_href.replace("../", "")
    
    parsed = urllib.parse.urlparse(clean_href)
    if parsed.netloc and "mpkv.ac.in" not in parsed.netloc:
        continue # external link
    
    path = parsed.path
    if not path or path == "/":
        path = "/Home/IndexNew"
        
    if path.endswith(".pdf") or path.endswith(".jpg") or path.endswith(".png") or path.endswith(".mp3"):
        continue # file asset
        
    full_url = urllib.parse.urljoin(BASE_URL, path)
    if full_url not in discovered:
        discovered[full_url] = {
            "url": full_url,
            "path": path,
            "text": text,
            "key": key
        }

print(f"Total discovered internal HTML page routes: {len(discovered)}")
for url, info in sorted(discovered.items()):
    print(f"{info['path']} -> {info['text']} (key: {info['key']})")
