import urllib.request
import ssl
from bs4 import BeautifulSoup

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def inspect_page(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.22.0'})
    with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
        soup = BeautifulSoup(resp.read().decode('utf-8', errors='ignore'), 'html.parser')
    tables = soup.find_all('table')
    headings = [h.get_text(strip=True) for h in soup.find_all(['h1','h2','h3','h4','h5','h6'])]
    pdf_links = [a['href'] for a in soup.find_all('a', href=True) if a['href'].lower().endswith('.pdf')]
    print(f"=== {url} ===")
    print(f"  Tables: {len(tables)}, Headings: {len(headings)}, PDF links: {len(pdf_links)}")
    if tables:
        print(f"  First table rows: {len(tables[0].find_all('tr'))}")
        # print header and first row
        first_rows = tables[0].find_all('tr')[:2]
        for r in first_rows:
            cells = [c.get_text(strip=True) for c in r.find_all(['th', 'td'])]
            print(f"    Sample row: {cells[:5]}")
    print(f"  Sample headings: {headings[-5:]}")

for u in [
    'https://mpkv.ac.in/Adminstration/AdminsRecruitment',
    'https://mpkv.ac.in/Akmu/Tender',
    'https://mpkv.ac.in/AllCircular/Circular',
    'https://mpkv.ac.in/Research/ResearchTechVariety',
    'https://mpkv.ac.in/Research/ResearchFarmImplement',
    'https://mpkv.ac.in/Education/EduConstituenClg',
    'https://mpkv.ac.in/Home/AgroAdd'
]:
    inspect_page(u)
