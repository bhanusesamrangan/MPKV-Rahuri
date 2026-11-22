import os
import time
import ssl
import json
import urllib.request
import urllib.parse
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Load discovered routes
with open("test_direct.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
routes = set()
for a in soup.find_all("a", href=True):
    href = a["href"].strip()
    if not href or href.startswith("javascript:") or href.startswith("tel:") or href.startswith("mailto:") or href in ["#", "!#"]:
        continue
    clean = href.replace("/..", "").replace("../", "").lstrip("~")
    parsed = urllib.parse.urlparse(clean)
    if parsed.netloc and "mpkv.ac.in" not in parsed.netloc:
        continue
    p = parsed.path
    if not p or p == "/":
        p = "/Home/IndexNew"
    if any(p.lower().endswith(ext) for ext in [".pdf", ".jpg", ".png", ".gif", ".mp3", ".doc", ".docx", ".xlsx", ".zip"]):
        continue
    routes.add(p)

print(f"Total routes to probe: {len(routes)}")

success = []
failed = []

for idx, r in enumerate(sorted(routes)):
    url = urllib.parse.urljoin("https://mpkv.ac.in", r)
    t0 = time.time()
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.22.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
            content = resp.read()
            dt = time.time() - t0
            print(f"[{idx+1}/{len(routes)}] 200 OK: {r} ({len(content)} bytes, {dt:.2f}s)")
            success.append({"route": r, "url": url, "size": len(content)})
    except Exception as e:
        dt = time.time() - t0
        print(f"[{idx+1}/{len(routes)}] ERR: {r} -> {e} ({dt:.2f}s)")
        failed.append({"route": r, "url": url, "error": str(e)})

print(f"\n--- PROBE SUMMARY ---")
print(f"Success: {len(success)}, Failed: {len(failed)}")
