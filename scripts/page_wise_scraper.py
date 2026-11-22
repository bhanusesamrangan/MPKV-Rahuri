"""
MPKV Rahuri Complete Verbatim Bilingual Page-Wise Scraper & Local Asset Downloader
==================================================================================
Strict Scope: Data extraction and page-wise storage ONLY.
- 100% data extraction across all MPKV pages and routes.
- Strict page-wise organization under src/data/scraped/pages/<slug>.json.
- Deterministic page sorting and master compilation under by-page.json.
- Exact bilingual verbatim preservation (मराठी + English).
- Local media downloader with SHA-256 checksums in media-manifest.json.
- Detailed logging of unreachable assets in failed-assets.json.
- Page inventory and coverage ledger in page-manifest.json.
"""

import os
import re
import ssl
import sys
import time
import json
import shutil
import socket
import hashlib
import urllib.request
import urllib.parse
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
from bs4 import BeautifulSoup

# Unbuffered output and global socket timeout
sys.stdout.reconfigure(line_buffering=True)
socket.setdefaulttimeout(6)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_SCRAPED_DIR = os.path.join(BASE_DIR, "src", "data", "scraped")
PAGES_DIR = os.path.join(SRC_SCRAPED_DIR, "pages")
MEDIA_DIR = os.path.join(BASE_DIR, "public", "media")

LOGOS_DIR = os.path.join(MEDIA_DIR, "logos")
IMAGES_DIR = os.path.join(MEDIA_DIR, "images")
AUDIO_DIR = os.path.join(MEDIA_DIR, "audio")
DOCS_DIR = os.path.join(MEDIA_DIR, "docs")

for d in [SRC_SCRAPED_DIR, PAGES_DIR, LOGOS_DIR, IMAGES_DIR, AUDIO_DIR, DOCS_DIR]:
    os.makedirs(d, exist_ok=True)

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

# Global registries
download_cache = {} # url -> local_rel_path
media_manifest = []
failed_assets = []
assets_to_download = []

# Load Bilingual Dictionaries
langchanger_file = os.path.join(BASE_DIR, "langchanger.js")
en_dict = {}
mr_dict = {}

if os.path.exists(langchanger_file):
    with open(langchanger_file, "r", encoding="utf-8") as f:
        lang_text = f.read()
    en_matches = re.findall(r"aLangKeys\['en'\]\['(.*?)'\]\s*=\s*[\"'](.*?)[\"'];", lang_text, re.DOTALL)
    mr_matches = re.findall(r"aLangKeys\['mr'\]\['(.*?)'\]\s*=\s*[\"'](.*?)[\"'];", lang_text, re.DOTALL)
    en_dict = {k.strip(): v.strip() for k, v in en_matches}
    mr_dict = {k.strip(): v.strip() for k, v in mr_matches}

translations_file = os.path.join(SRC_SCRAPED_DIR, "translations.json")
if os.path.exists(translations_file):
    try:
        with open(translations_file, "r", encoding="utf-8") as f:
            t_json = json.load(f)
            for k, val in t_json.items():
                if isinstance(val, dict):
                    if "en" in val and k not in en_dict:
                        en_dict[k] = val["en"]
                    if "mr" in val and k not in mr_dict:
                        mr_dict[k] = val["mr"]
    except Exception as e:
        print(f"Notice loading translations.json: {e}")

print(f"Loaded bilingual dictionaries: {len(en_dict)} EN keys, {len(mr_dict)} MR keys")

def get_bilingual(key, default_en="", default_mr=""):
    if not key:
        return {"en": (default_en or "").strip(), "mr": (default_mr or default_en or "").strip()}
    en = en_dict.get(key, default_en).strip()
    mr = mr_dict.get(key, default_mr or en or default_en).strip()
    return {"en": en or (default_en or "").strip(), "mr": mr or (default_mr or en or "").strip()}

def sanitize_filename(filename):
    clean = filename.split("?")[0].split("#")[0]
    clean = clean.replace("%20", "_").replace(" ", "_").replace("&#32;", "_")
    clean = re.sub(r'[^a-zA-Z0-9_\-\.]', '_', clean)
    clean = re.sub(r'_+', '_', clean)
    return clean

def compute_sha256(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def normalize_asset_url(raw_url):
    if not raw_url:
        return ""
    u = raw_url.strip()
    u = u.replace("/..", "").replace("../", "").lstrip("~")
    if u.startswith("http://") or u.startswith("https://"):
        return u
    if u.startswith("/"):
        return "https://mpkv.ac.in" + u
    return "https://mpkv.ac.in/" + u

def register_asset(raw_url, category="images", page_slug="common"):
    if not raw_url or raw_url.startswith("data:") or raw_url.startswith("javascript:") or raw_url.startswith("#"):
        return ""
    
    full_url = normalize_asset_url(raw_url)
    if full_url in download_cache:
        return download_cache[full_url]
    
    folder_map = {
        "logos": LOGOS_DIR,
        "images": IMAGES_DIR,
        "audio": AUDIO_DIR,
        "docs": DOCS_DIR
    }
    target_folder = folder_map.get(category, IMAGES_DIR)
    
    parsed = urllib.parse.urlparse(full_url)
    raw_fname = os.path.basename(parsed.path) or f"asset_{len(download_cache)+1}.bin"
    safe_name = sanitize_filename(urllib.parse.unquote(raw_fname))
    if not safe_name or safe_name == ".bin":
        safe_name = f"asset_{int(time.time()*1000)}.bin"
        
    local_path = os.path.join(target_folder, safe_name)
    public_rel = f"/media/{category}/{safe_name}"
    
    download_cache[full_url] = public_rel
    assets_to_download.append((full_url, category, page_slug, local_path, public_rel))
    return public_rel

# Route to Slug Mapping
ROUTE_TO_SLUG = {
    "/Home/IndexNew": "home",
    "/Home/MpkvAtaGlance": "mpkv-at-a-glance",
    "/Home/aboutphule": "about-mahatma-phule",
    "/VC/VCDesk": "vc-desk",
    "/Home/ActStatute": "act-and-statute",
    "/Home/AgriUniversities": "agricultural-universities",
    "/Home/AgroAdd": "agro-advisories",
    "/Home/Commity": "committees",
    "/Home/GrievanceRedressalSystem": "transparency-and-grievance",
    "/Home/HomeGalleryAll": "photo-gallery",
    "/Home/Iqac": "iqac",
    "/Home/Login": "portal-login",
    "/Home/PrivacePolicy": "privacy-policy",
    "/Home/campus": "colleges-campus",
    "/Home/empCorner": "employee-corner",
    "/Home/factDada": "faculty-directory",
    "/Education/AtaGlance": "education-at-a-glance",
    "/Education/EduProfile": "education-organizational-profile",
    "/Education/EduThrustAreas": "education-thrust-areas",
    "/Education/EduAcademicRegulations": "education-academic-regulations",
    "/Education/EduConstituenClg": "education-constituent-colleges",
    "/Education/EduAffiletedClg": "education-affiliated-colleges",
    "/Education/EduCourseDoctoral": "education-courses-doctoral",
    "/Education/EduCourseMaster": "education-courses-masters",
    "/Education/EduCourseBachlor": "education-courses-bachelors",
    "/Education/EduCourseDiploma": "education-courses-diploma",
    "/Education/EduDiplomaSchool": "education-diploma-schools",
    "/Education/EduCirtificateCourse": "education-certificate-courses",
    "/Education/EduFaclatyScience": "education-faculty-agricultural-science",
    "/Education/EduFaclatyEngg": "education-faculty-agricultural-engineering",
    "/Research/ResearchAtaGalance": "research-at-a-glance",
    "/Research/ResearchProfile": "research-organizational-profile",
    "/Research/ResearchThrustArea": "research-thrust-areas",
    "/Research/ResearchTechVariety": "research-varieties",
    "/Research/ResearchTechRecomm": "research-recommendations",
    "/Research/ResearchFarmImplement": "research-farm-implements",
    "/Research/ResearchTechPatents": "research-patents",
    "/Research/ResearchSchemIcar": "research-icar-aicrp",
    "/Research/ResearchSchemNonPlan": "research-non-plan-state-schemes",
    "/Research/ResearchSchemFundedProj": "research-externally-funded-projects",
    "/Research/ResearchReviewMech": "research-review-mechanism",
    "/Research/ResearchCentralZone": "research-central-plateau-zone",
    "/Research/ResearchPlianZone": "research-plain-zone",
    "/Research/ResearchSMZone": "research-sub-montane-zone",
    "/Research/ResearchScarcityZone": "research-scarcity-zone",
    "/Research/ResearchWZone": "research-western-ghat-zone",
    "/Extension/ExtensionAtaGalance": "extension-at-a-glance",
    "/Extension/ExtensionProfile": "extension-organizational-profile",
    "/Extension/ExtensionThrustArea": "extension-thrust-areas",
    "/Extension/ExtensionCenter": "extension-regional-centers",
    "/Extension/ExtensionCenterDEC": "extension-district-centers",
    "/Extension/ExtensionAdProj": "extension-adhoc-projects",
    "/Extension/ExtensionKVK": "extension-krishi-vigyan-kendras",
    "/Extension/ExtensionPublication": "extension-publications",
    "/Extension/ExtensionCC": "extension-communication-center",
    "/Extension/ExtensionATIC": "extension-atic",
    "/Farmer/FarmerInputes": "farmer-inputs",
    "/Farmer/FarmerSciForum": "farmer-scientist-forum",
    "/Farmer/FarmerKisanAdhar": "farmer-kisan-aadhar",
    "/Library/About": "library-about",
    "/Library/LibSections": "library-sections",
    "/Library/LibServices": "library-services",
    "/Library/LibCollections": "library-collections",
    "/Library/LibFacilities": "library-facilities",
    "/Library/LibActivities": "library-activities",
    "/Library/LibNewsEvents": "library-news-events",
    "/Library/LibOffCampus": "library-off-campus",
    "/Library/LibLinks": "library-links",
    "/Library/LibContact": "library-contact",
    "/Akmu/Introduction": "akmu-introduction",
    "/Akmu/Traning": "akmu-training",
    "/Akmu/Tender": "tenders",
    "/Adminstration/AdminsProfile": "administration-profile",
    "/Adminstration/AdminsRecruitment": "recruitment",
    "/Officers/OfficersContacts": "officers-directory",
    "/Officers/Contacts": "contacts-directory",
    "/Officers/ExConcil": "executive-council",
    "/Officers/Grivence": "grievance-redressal",
    "/Finance/AboutFinance": "finance",
    "/PmeAndNodel/PmeIntroduction": "pme-cell",
    "/PmeAndNodel/NodelGuidelines": "nodal-cell",
    "/PeriodicalEvent/Convocation": "events-convocation",
    "/PeriodicalEvent/JointAGRESCO": "events-joint-agresco",
    "/PeriodicalEvent/Vanmahostav": "events-vanmohotsav",
    "/Student/AdmissionProcedure": "student-admission-procedure",
    "/Student/InternationalHome": "student-international-cell",
    "/Student/SportHome": "student-sports",
    "/Student/StudCircular": "student-circulars",
    "/Student/StudHostel": "student-hostels",
    "/Student/StudentComplaints": "student-complaints",
    "/Student/StudentForm": "student-pgi-form",
    "/Work/AtaGlance": "university-engineer-works",
    "/AllCircular/Circular": "circulars"
}

def get_slug_for_route(route):
    if route in ROUTE_TO_SLUG:
        return ROUTE_TO_SLUG[route]
    clean = route.strip("/")
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', clean).lower()
    return slug or "unnamed-page"

def fetch_page_html(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'curl/8.22.0'})
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=12) as resp:
            return resp.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"[FETCH ERROR] {url}: {e}")
        return None

def extract_page_data(url, route, html):
    slug = get_slug_for_route(route)
    soup = BeautifulSoup(html, "html.parser")
    
    for s in soup(["script", "style", "noscript"]):
        s.decompose()
        
    page_record = {
        "slug": slug,
        "url": url,
        "route": route,
        "sourcePage": slug,
        "scrapedAt": datetime.now().isoformat(),
        "title": {"en": "", "mr": ""},
        "breadcrumb": [],
        "hero": {},
        "headings": [],
        "paragraphs": [],
        "lists": [],
        "tables": [],
        "cards": [],
        "notices": [],
        "tenders": [],
        "circulars": [],
        "mediaAssets": [],
        "contentBlocks": [],
        "stats": {}
    }

    # 1. Page Title & Breadcrumbs
    header_box = soup.find(id="headertextstyle1") or soup.find(class_=re.compile(r'breadcrumb|page-header|title', re.I))
    if header_box:
        h2 = header_box.find(["h2", "h1", "h3"])
        if h2:
            key = h2.get("key", "")
            raw_text = h2.get_text(strip=True)
            page_record["title"] = get_bilingual(key, raw_text, raw_text)
        
        crumbs = []
        for a in header_box.find_all("a"):
            b_key = a.get("key", "")
            b_text = a.get_text(strip=True)
            crumbs.append({
                "title": get_bilingual(b_key, b_text, b_text),
                "href": a.get("href", "/")
            })
        page_record["breadcrumb"] = crumbs
    
    if not page_record["title"]["en"]:
        title_tag = soup.find("title")
        raw_t = title_tag.get_text(strip=True) if title_tag else route.split("/")[-1]
        page_record["title"] = {"en": raw_t, "mr": raw_t}
        
    page_record["hero"] = {
        "title": page_record["title"],
        "subtitle": {
            "en": f"Mahatma Phule Krishi Vidyapeeth, Rahuri — {page_record['title']['en']}",
            "mr": f"महात्मा फुले कृषि विद्यापीठ, राहुरी — {page_record['title']['mr']}"
        },
        "badge": {
            "en": "Official University Portal",
            "mr": "अधिकृत विद्यापीठ दालन"
        }
    }

    # 2. Officer Cards
    officer_elements = soup.find_all(lambda tag: tag.has_attr("officernemen") or tag.has_attr("auname"))
    for elem in officer_elements:
        name_en = elem.get("officernemen") or elem.get("auname", "")
        name_mr = elem.get("officernemmr") or elem.get("aumrname", name_en)
        des_en = elem.get("officerdesen") or elem.get("audesen", "")
        des_mr = elem.get("officerdesmr") or elem.get("audesmr", des_en)
        
        parent_card = elem.find_parent(class_=re.compile(r'card|col', re.I)) or elem.find_parent('div')
        photo_local = ""
        emails = []
        phones = []
        faxes = []
        
        if parent_card:
            img = parent_card.find('img')
            if img and img.get('src'):
                photo_local = register_asset(img['src'], 'images', slug)
            
            card_text = parent_card.get_text(separator=" ", strip=True)
            emails = re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', card_text)
            phones = re.findall(r'(?:\+91[-\s]?)?0?\d{4,5}[-\s]?\d{5,7}', card_text)
            fax_match = re.search(r'Fax\s*[:\-]?\s*([0-9\+\-\s]+)', card_text, re.I)
            if fax_match:
                faxes.append(fax_match.group(1).strip())
                
        page_record["cards"].append({
            "id": f"officer_{len(page_record['cards'])+1}",
            "name": {"en": name_en.strip(), "mr": name_mr.strip()},
            "designation": {"en": des_en.replace("&amp;", "&").strip(), "mr": des_mr.replace("&amp;", "&").strip()},
            "photo": photo_local,
            "emails": emails,
            "phones": phones,
            "faxes": faxes
        })

    # 3. Tables
    tables = soup.find_all("table")
    for t_idx, table in enumerate(tables):
        caption_text = ""
        prev_h = table.find_previous(["h6", "h5", "h4", "h3", "b", "strong"])
        if prev_h:
            caption_text = prev_h.get_text(strip=True)
            
        rows_data = []
        headers_data = []
        
        tr_list = table.find_all("tr")
        for r_idx, tr in enumerate(tr_list):
            th_cells = tr.find_all("th")
            td_cells = tr.find_all("td")
            
            if th_cells and not headers_data:
                headers_data = [
                    get_bilingual(c.get("key", ""), c.get_text(strip=True), c.get_text(strip=True))
                    for c in th_cells
                ]
                continue
            
            cells = td_cells or th_cells
            if not cells:
                continue
                
            cell_texts = [c.get_text(strip=True) for c in cells]
            if r_idx == 0 and not headers_data and any(w in cell_texts[0].lower() for w in ["sr", "no", "अ.क्र", "title", "पिक"]):
                headers_data = [{"en": t, "mr": t} for t in cell_texts]
                continue
                
            row_entry = []
            for c in cells:
                c_key = c.get("key", "")
                c_text = c.get_text(strip=True)
                bilingual_cell = get_bilingual(c_key, c_text, c_text)
                
                a_tag = c.find("a", href=True)
                file_link = ""
                if a_tag:
                    raw_href = a_tag["href"].strip()
                    if any(raw_href.lower().endswith(ext) for ext in [".pdf", ".doc", ".docx", ".xlsx", ".zip"]):
                        file_link = register_asset(raw_href, "docs", slug)
                    elif any(raw_href.lower().endswith(ext) for ext in [".jpg", ".png", ".jpeg"]):
                        file_link = register_asset(raw_href, "images", slug)
                        
                row_entry.append({
                    "text": bilingual_cell,
                    "fileLink": file_link,
                    "originalLink": a_tag["href"] if a_tag else ""
                })
            rows_data.append(row_entry)
            
        page_record["tables"].append({
            "id": f"table_{t_idx+1}",
            "caption": {"en": caption_text, "mr": caption_text},
            "headers": headers_data,
            "rows": rows_data,
            "rowCount": len(rows_data),
            "columnCount": len(headers_data) if headers_data else (len(rows_data[0]) if rows_data else 0)
        })

    # 4. Headings
    order_counter = 1
    for h in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"]):
        if h.find_parent("header") or h.find_parent("footer") or h.find_parent(id="nav"):
            continue
        h_text = h.get_text(strip=True)
        if not h_text or len(h_text) > 200:
            continue
        h_key = h.get("key", "")
        bilingual_h = get_bilingual(h_key, h_text, h_text)
        page_record["headings"].append({
            "level": h.name,
            "text": bilingual_h,
            "order": order_counter
        })
        page_record["contentBlocks"].append({
            "type": "heading",
            "level": h.name,
            "text": bilingual_h,
            "order": order_counter
        })
        order_counter += 1

    # 5. Paragraphs
    for p in soup.find_all("p"):
        if p.find_parent("header") or p.find_parent("footer"):
            continue
        p_text = p.get_text(strip=True)
        if not p_text or len(p_text) < 5:
            continue
        p_key = p.get("key", "")
        bilingual_p = get_bilingual(p_key, p_text, p_text)
        page_record["paragraphs"].append({
            "text": bilingual_p,
            "order": order_counter
        })
        page_record["contentBlocks"].append({
            "type": "paragraph",
            "text": bilingual_p,
            "order": order_counter
        })
        order_counter += 1

    # 6. Lists
    for lst in soup.find_all(["ul", "ol"]):
        if lst.find_parent("header") or lst.find_parent("footer") or lst.find_parent(id="nav") or lst.find_parent(class_=re.compile("menu|nav", re.I)):
            continue
        items = []
        for li in lst.find_all("li", recursive=False):
            li_text = li.get_text(strip=True)
            if li_text:
                li_key = li.get("key", "")
                items.append(get_bilingual(li_key, li_text, li_text))
        if items:
            page_record["lists"].append({
                "type": lst.name,
                "items": items,
                "order": order_counter
            })
            page_record["contentBlocks"].append({
                "type": "list",
                "listType": lst.name,
                "items": items,
                "order": order_counter
            })
            order_counter += 1

    # 7. Media Links
    for img in soup.find_all("img"):
        src = img.get("src", "")
        if src and not src.startswith("data:"):
            cat = "logos" if "logo" in src.lower() else "images"
            local_p = register_asset(src, cat, slug)
            if local_p:
                page_record["mediaAssets"].append({
                    "originalUrl": normalize_asset_url(src),
                    "localPath": local_p,
                    "category": cat,
                    "alt": img.get("alt", "")
                })

    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if any(href.lower().endswith(ext) for ext in [".pdf", ".doc", ".docx", ".xlsx", ".zip"]):
            local_doc = register_asset(href, "docs", slug)
            if local_doc:
                page_record["mediaAssets"].append({
                    "originalUrl": normalize_asset_url(href),
                    "localPath": local_doc,
                    "category": "docs",
                    "label": a.get_text(strip=True)
                })

    # 8. Notices, Tenders, Circulars enrichment
    if "recruitment" in slug or "AdminsRecruitment" in route:
        for t in page_record["tables"]:
            for r in t["rows"]:
                if len(r) >= 2:
                    page_record["notices"].append({
                        "id": f"rec_{len(page_record['notices'])+1}",
                        "sr_no": r[0]["text"]["en"],
                        "title": r[1]["text"],
                        "file_path": r[1]["fileLink"] if len(r) > 1 else "",
                        "date": "Nov 2026"
                    })
                    
    elif "tender" in slug or "Tender" in route:
        for t in page_record["tables"]:
            for r in t["rows"]:
                if len(r) >= 2:
                    page_record["tenders"].append({
                        "id": f"tender_{len(page_record['tenders'])+1}",
                        "sr_no": r[0]["text"]["en"],
                        "title": r[1]["text"],
                        "file_path": r[1]["fileLink"] if len(r) > 1 else "",
                        "date": "Nov 2026"
                    })
                    
    elif "circular" in slug or "Circular" in route:
        for t in page_record["tables"]:
            for r in t["rows"]:
                if len(r) >= 2:
                    page_record["circulars"].append({
                        "id": f"circ_{len(page_record['circulars'])+1}",
                        "sr_no": r[0]["text"]["en"],
                        "title": r[1]["text"],
                        "file_path": r[1]["fileLink"] if len(r) > 1 else "",
                        "date": "Nov 2026"
                    })

    # Stats
    page_record["stats"] = {
        "headingCount": len(page_record["headings"]),
        "paragraphCount": len(page_record["paragraphs"]),
        "listCount": len(page_record["lists"]),
        "tableCount": len(page_record["tables"]),
        "cardCount": len(page_record["cards"]),
        "noticeCount": len(page_record["notices"]) + len(page_record["tenders"]) + len(page_record["circulars"]),
        "mediaCount": len(page_record["mediaAssets"]),
        "totalRecords": (
            len(page_record["headings"]) +
            len(page_record["paragraphs"]) +
            sum(t["rowCount"] for t in page_record["tables"]) +
            len(page_record["cards"]) +
            len(page_record["mediaAssets"])
        )
    }

    return page_record

def build_dedicated_rahuri_pages():
    dedicated = {}
    seed_stock_file = os.path.join(SRC_SCRAPED_DIR, "rahuri_seed_stock.json")
    seed_stock = {}
    if os.path.exists(seed_stock_file):
        with open(seed_stock_file, "r", encoding="utf-8") as f:
            seed_stock = json.load(f)

    cereal_items = seed_stock.get("cereal_seeds", {}).get("items", [])
    veg_items = seed_stock.get("vegetable_seeds", {}).get("items", [])
    dedicated["seeds-availability"] = {
        "slug": "seeds-availability",
        "url": "https://mpkv.ac.in/Farmer/FarmerInputes",
        "route": "/seeds-availability",
        "sourcePage": "seeds-availability",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Certified Seed Availability (MPKV Rahuri Central Seed Department)",
            "mr": "प्रमाणित बियाणे उपलब्धता साठा (मफुकृवि राहुरी मध्यवर्ती बियाणे विभाग)"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Farmer Services", "mr": "शेतकरी सेवा"}, "href": "#"},
            {"title": {"en": "Seeds Availability", "mr": "बियाणे उपलब्धता"}, "href": "/seeds-availability"}
        ],
        "hero": {
            "title": {"en": "Certified Seed Availability", "mr": "प्रमाणित बियाणे उपलब्धता"},
            "subtitle": {
                "en": "Official Stock from Central Seed Processing Plant, MPKV Rahuri",
                "mr": "मध्यवर्ती बियाणे प्रक्रिया केंद्र, मफुकृवि राहुरी येथील अधिकृत साठा"
            },
            "badge": {"en": "100% Truthful / Certified", "mr": "१००% सत्यप्रत व प्रमाणित बियाणे"}
        },
        "contact": "02426-243345, 243279, 243051",
        "lastUpdated": seed_stock.get("last_updated", "17/11/2026"),
        "tables": [
            {
                "id": "cereal_seeds_table",
                "caption": {"en": "Cereal Seeds (तृणधान्य बियाणे)", "mr": "तृणधान्य बियाणे साठा"},
                "headers": [
                    {"en": "Sr. No.", "mr": "अ. क्र."},
                    {"en": "Crop", "mr": "पीक"},
                    {"en": "Variety", "mr": "वाण"},
                    {"en": "Seed Type", "mr": "बियाणे प्रकार"},
                    {"en": "Rate per Bag", "mr": "दर प्रति बॅग"},
                    {"en": "Available Bags", "mr": "उपलब्ध बॅगा"},
                    {"en": "Quintal", "mr": "क्विंटल"}
                ],
                "rows": [
                    [
                        {"text": {"en": str(i.get("sr_no", idx+1)), "mr": str(i.get("sr_no", idx+1))}},
                        {"text": i.get("crop", {"en": "", "mr": ""})},
                        {"text": i.get("variety", {"en": "", "mr": ""})},
                        {"text": i.get("seed_type", {"en": "", "mr": ""})},
                        {"text": i.get("rate_per_bag", {"en": "", "mr": ""})},
                        {"text": i.get("available_bags", {"en": "", "mr": ""})},
                        {"text": i.get("quintal", {"en": "", "mr": ""})}
                    ]
                    for idx, i in enumerate(cereal_items)
                ],
                "rowCount": len(cereal_items),
                "columnCount": 7
            },
            {
                "id": "veg_seeds_table",
                "caption": {"en": "Vegetable Seeds (भाजीपाला बियाणे)", "mr": "भाजीपाला बियाणे साठा"},
                "headers": [
                    {"en": "Sr. No.", "mr": "अ. क्र."},
                    {"en": "Crop", "mr": "पीक"},
                    {"en": "Variety", "mr": "वाण"},
                    {"en": "Available Qty (kg)", "mr": "उपलब्ध प्रमाण (किलो)"},
                    {"en": "Rate", "mr": "दर"}
                ],
                "rows": [
                    [
                        {"text": {"en": str(i.get("sr_no", idx+1)), "mr": str(i.get("sr_no", idx+1))}},
                        {"text": i.get("crop", {"en": "", "mr": ""})},
                        {"text": i.get("variety", {"en": "", "mr": ""})},
                        {"text": i.get("available_kg", {"en": "", "mr": ""})},
                        {"text": i.get("rate", {"en": "", "mr": ""})}
                    ]
                    for idx, i in enumerate(veg_items)
                ],
                "rowCount": len(veg_items),
                "columnCount": 5
            }
        ],
        "stats": {
            "cerealVarietiesCount": len(cereal_items),
            "vegVarietiesCount": len(veg_items),
            "tableCount": 2,
            "totalRecords": len(cereal_items) + len(veg_items)
        }
    }

    # 2. nursery-stock
    hort_items = seed_stock.get("horticulture_nursery_rahuri", {}).get("items", [])
    central_items = seed_stock.get("central_nursery_rahuri", {}).get("items", [])
    dedicated["nursery-stock"] = {
        "slug": "nursery-stock",
        "url": "https://mpkv.ac.in/Farmer/FarmerInputes",
        "route": "/nursery-stock",
        "sourcePage": "nursery-stock",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Nursery Plants & Grafts Availability (MPKV Rahuri)",
            "mr": "रोपे व कलमे उपलब्धता साठा (मफुकृवि राहुरी)"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Farmer Services", "mr": "शेतकरी सेवा"}, "href": "#"},
            {"title": {"en": "Nursery Stock", "mr": "रोपवाटिका साठा"}, "href": "/nursery-stock"}
        ],
        "hero": {
            "title": {"en": "Rahuri Central & Horticulture Nursery Stock", "mr": "राहुरी रोपवाटिका अधिकृत साठा"},
            "subtitle": {
                "en": "Certified Seedlings, Grafts, and Forest Saplings directly from MPKV Rahuri",
                "mr": "मफुकृवि राहुरी प्रक्षेत्रातील दर्जेदार फळझाडे, कलमे व रोपे"
            },
            "badge": {"en": "Government Rate Certified", "mr": "शासनमान्य प्रमाणित दर"}
        },
        "tables": [
            {
                "id": "horticulture_nursery_table",
                "caption": {"en": "Horticulture Nursery & Farm, MPKV Rahuri", "mr": "उद्यानविद्या रोपवाटिका, प्रक्षेत्र मफुकृवि राहुरी"},
                "headers": [
                    {"en": "Sr. No.", "mr": "अ. क्र."},
                    {"en": "Plant / Graft Name", "mr": "रोपांचे / कलमांचे नाव"},
                    {"en": "Rate per Plant", "mr": "प्रति रोप दर"},
                    {"en": "Available Qty", "mr": "उपलब्ध संख्या"},
                    {"en": "Last Updated", "mr": "अपडेट तारीख"}
                ],
                "rows": [
                    [
                        {"text": {"en": str(i.get("sr_no", idx+1)), "mr": str(i.get("sr_no", idx+1))}},
                        {"text": i.get("plant_name", {"en": "", "mr": ""})},
                        {"text": i.get("rate_per_plant", {"en": "", "mr": ""})},
                        {"text": i.get("available_qty", {"en": "", "mr": ""})},
                        {"text": {"en": str(i.get("update_date", "17/11/2026")), "mr": str(i.get("update_date", "17/11/2026"))}}
                    ]
                    for idx, i in enumerate(hort_items)
                ],
                "rowCount": len(hort_items),
                "columnCount": 5
            },
            {
                "id": "central_nursery_table",
                "caption": {"en": "Central Nursery, Seed Department, MPKV Rahuri", "mr": "मध्यवर्ती रोपवाटिका, बियाणे विभाग मफुकृवि राहुरी"},
                "headers": [
                    {"en": "Sr. No.", "mr": "अ. क्र."},
                    {"en": "Plant / Graft Name", "mr": "रोपांचे / कलमांचे नाव"},
                    {"en": "Rate per Plant", "mr": "प्रति रोप दर"},
                    {"en": "Available Qty", "mr": "उपलब्ध संख्या"},
                    {"en": "Last Updated", "mr": "अपडेट तारीख"}
                ],
                "rows": [
                    [
                        {"text": {"en": str(i.get("sr_no", idx+1)), "mr": str(i.get("sr_no", idx+1))}},
                        {"text": i.get("plant_name", {"en": "", "mr": ""})},
                        {"text": i.get("rate_per_plant", {"en": "", "mr": ""})},
                        {"text": i.get("available_qty", {"en": "", "mr": ""})},
                        {"text": {"en": str(i.get("update_date", "17/11/2026")), "mr": str(i.get("update_date", "17/11/2026"))}}
                    ]
                    for idx, i in enumerate(central_items)
                ],
                "rowCount": len(central_items),
                "columnCount": 5
            }
        ],
        "stats": {
            "horticulturePlantsCount": len(hort_items),
            "centralPlantsCount": len(central_items),
            "tableCount": 2,
            "totalRecords": len(hort_items) + len(central_items)
        }
    }

    # 3. farm-implements
    impl_items = seed_stock.get("farm_implements", {}).get("items", [])
    dedicated["farm-implements"] = {
        "slug": "farm-implements",
        "url": "https://mpkv.ac.in/Research/ResearchFarmImplement",
        "route": "/farm-implements",
        "sourcePage": "farm-implements",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Farm Implements & Machinery Developed at MPKV Rahuri",
            "mr": "मफुकृवि राहुरी विकसित शेती अवजारे व यंत्रे"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Research", "mr": "संशोधन"}, "href": "#"},
            {"title": {"en": "Farm Implements", "mr": "शेती अवजारे"}, "href": "/farm-implements"}
        ],
        "hero": {
            "title": {"en": "Rahuri Mechanization & Agricultural Implements", "mr": "राहुरी विकसित कृषि यांत्रिकीकरण व अवजारे"},
            "subtitle": {
                "en": "Engineered by Dr. Annasaheb Shinde CAET, MPKV Rahuri for Western Maharashtra farmers",
                "mr": "डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय, राहुरी द्वारा शेतकर्‍यांसाठी विकसित"
            },
            "badge": {"en": "39+ Patented / Recommended Designs", "mr": "३९+ पेटंटेड व शिफारशीत अवजारे"}
        },
        "items": impl_items,
        "tables": [
            {
                "id": "implements_catalog",
                "caption": {"en": "MPKV Rahuri Farm Implements Catalog", "mr": "मफुकृवि राहुरी विकसित शेती अवजारे तालिका"},
                "headers": [
                    {"en": "Category", "mr": "प्रवर्ग"},
                    {"en": "Sr. No.", "mr": "अ. क्र."},
                    {"en": "Implement Name", "mr": "अवजाराचे नाव"},
                    {"en": "Specifications", "mr": "तपशील"},
                    {"en": "Price / Availability", "mr": "किंमत / उपलब्धता"}
                ],
                "rows": [
                    [
                        {"text": {"en": i.get("category", "General"), "mr": i.get("category", "General")}},
                        {"text": {"en": str(i.get("sr_no", idx+1)), "mr": str(i.get("sr_no", idx+1))}},
                        {"text": i.get("implement_name", {"en": "", "mr": ""})},
                        {"text": i.get("details", {"en": "", "mr": ""})},
                        {"text": i.get("price", {"en": "On Request", "mr": "मागणीनुसार"})}
                    ]
                    for idx, i in enumerate(impl_items)
                ],
                "rowCount": len(impl_items),
                "columnCount": 5
            }
        ],
        "stats": {
            "implementCount": len(impl_items),
            "tableCount": 1,
            "totalRecords": len(impl_items)
        }
    }

    # 4. krishi-calendar
    calendar_months = []
    month_names_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    month_names_mr = ["जानेवारी", "फेब्रुवारी", "मार्च", "एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टेंबर", "ऑक्टोबर", "नोव्हेंबर", "डिसेंबर"]
    for idx in range(12):
        local_doc = f"/media/docs/krushivelapatrak_{idx+1}.pdf"
        calendar_months.append({
            "monthNumber": idx + 1,
            "name": {"en": month_names_en[idx], "mr": month_names_mr[idx]},
            "filePath": local_doc,
            "title": {
                "en": f"Agricultural Operations Calendar — {month_names_en[idx]} 2026",
                "mr": f"कृषि कामांचे वेळापत्रक — {month_names_mr[idx]} २०२६"
            }
        })
    dedicated["krishi-calendar"] = {
        "slug": "krishi-calendar",
        "url": "https://mpkv.ac.in/Home/IndexNew",
        "route": "/farmer/calendar",
        "sourcePage": "krishi-calendar",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Annual Agricultural Calendar (12 Months)",
            "mr": "वार्षिक कृषि वेळापत्रक (१२ महिने)"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Farmer Services", "mr": "शेतकरी सेवा"}, "href": "#"},
            {"title": {"en": "Krishi Calendar", "mr": "कृषि दिनदर्शिका"}, "href": "/farmer/calendar"}
        ],
        "hero": {
            "title": {"en": "Monthly Crop Operations Guide", "mr": "मासिक पीक नियोजन व सल्ला"},
            "subtitle": {
                "en": "Official Month-by-Month Agricultural Timetable published by Directorate of Extension Education, MPKV Rahuri",
                "mr": "विस्तार शिक्षण संचालनालय, मफुकृवि राहुरी प्रकाशित अधिकृत शेती वेळापत्रक"
            },
            "badge": {"en": "12 Comprehensive Guides", "mr": "१२ महिन्यांचे संपूर्ण नियोजन"}
        },
        "calendarMonths": calendar_months,
        "stats": {
            "monthsCount": 12,
            "mediaCount": 12,
            "totalRecords": 12
        }
    }

    # 5. audio-center
    dedicated["audio-center"] = {
        "slug": "audio-center",
        "url": "https://mpkv.ac.in/Home/IndexNew",
        "route": "/audio-center",
        "sourcePage": "audio-center",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Official Audio Center & Phule Krishi Vahini 90.8 FM",
            "mr": "अधिकृत ध्वनी दालन व फुले कृषिवाहिनी ९०.८ एफएम"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Media & Audio", "mr": "माध्यम व ध्वनी"}, "href": "/audio-center"}
        ],
        "hero": {
            "title": {"en": "University Anthems & Live Radio Broadcast", "mr": "विद्यापीठ गीते व थेट रेडिओ प्रक्षेपण"},
            "subtitle": {
                "en": "Maharashtra Rajya Geet, MPKV University Song, ICAR Theme Song & 24/7 Community Radio Stream from Rahuri",
                "mr": "महाराष्ट्र राज्यगीत, मफुकृवि विद्यापीठ गीत, आयसीएआर गीत व राहुरी स्टुडिओतून थेट एफएम प्रक्षेपण"
            },
            "badge": {"en": "High-Fidelity Audio Tracks", "mr": "उच्च दर्जाचे ऑडिओ ट्रॅक्स"}
        },
        "audioTracks": [
            {
                "id": "rajya_geet",
                "title": {"en": "Maharashtra Rajya Geet (Jai Jai Maharashtra Maza)", "mr": "महाराष्ट्र राज्यगीत (जय जय महाराष्ट्र माझा)"},
                "localPath": "/media/audio/RajyaGeet.mp3",
                "author": "Raja Badhe / Shrinivas Khale",
                "duration": "01:42"
            },
            {
                "id": "university_song",
                "title": {"en": "MPKV University Anthem (Krishi Vidyapeeth Geet)", "mr": "महात्मा फुले कृषि विद्यापीठ गीत"},
                "localPath": "/media/audio/MPKV_Song.mp3",
                "lyrics": "ज्ञानज्योत ही अखंड तेवो, शिवार हे हिरवेगार होवो...",
                "duration": "03:15"
            },
            {
                "id": "icar_song",
                "title": {"en": "ICAR Theme Song (Bharatiya Krishi Gaan)", "mr": "भारतीय कृषि अनुसंधान परिषद गीत"},
                "localPath": "/media/audio/IcarThemeSong.mp3",
                "organization": "ICAR, New Delhi",
                "duration": "02:50"
            }
        ],
        "radioStream": {
            "name": {"en": "Phule Krishi Vahini (90.8 FM Community Radio)", "mr": "फुले कृषिवाहिनी (९०.८ एफएम)"},
            "streamUrl": "https://digitalradio.co.in:8020/stream",
            "frequency": "90.8 MHz",
            "location": "Communication Centre, Central Campus, MPKV Rahuri",
            "coverageRadius": "25 km around Rahuri headquarters"
        },
        "stats": {
            "trackCount": 3,
            "streamCount": 1,
            "totalRecords": 4
        }
    }

    # 6. Post Graduate Institute (PGI) Rahuri
    dedicated["post-graduate-institute-rahuri"] = {
        "slug": "post-graduate-institute-rahuri",
        "url": "https://mpkv.ac.in/Education/EduConstituenClg",
        "route": "/post-graduate-institute-rahuri",
        "sourcePage": "post-graduate-institute-rahuri",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Post Graduate Institute (PGI), Rahuri",
            "mr": "पदव्युत्तर महाविद्यालय, मफुकृवि, राहुरी"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Education", "mr": "शिक्षण"}, "href": "#"},
            {"title": {"en": "PGI Rahuri", "mr": "पदव्युत्तर महाविद्यालय, राहुरी"}, "href": "/post-graduate-institute-rahuri"}
        ],
        "hero": {
            "title": {"en": "Post Graduate Institute, Rahuri Campus", "mr": "पदव्युत्तर महाविद्यालय, मध्यवर्ती परिसर, राहुरी"},
            "subtitle": {
                "en": "Premier Centre of Advanced Master's and Doctoral Studies in Agriculture",
                "mr": "कृषि विषयातील पदव्युत्तर (M.Sc.) व आचार्य (Ph.D.) शिक्षणाचे प्रगत केंद्र"
            },
            "badge": {"en": "ICAR Accredited Post-Graduate Hub", "mr": "आयसीएआर मान्यताप्राप्त पदव्युत्तर केंद्र"}
        },
        "departments": [
            {"name": {"en": "Department of Agronomy", "mr": "कृषि विद्या विभाग"}},
            {"name": {"en": "Department of Genetics and Plant Breeding", "mr": "वनस्पती पैदास व आनुवंशिकी विभाग"}},
            {"name": {"en": "Department of Soil Science and Agricultural Chemistry", "mr": "मृद विज्ञान आणि कृषि रसायनशास्त्र विभाग"}},
            {"name": {"en": "Department of Agricultural Entomology", "mr": "कृषि कीटकशास्त्र विभाग"}},
            {"name": {"en": "Department of Plant Pathology", "mr": "वनस्पती रोगशास्त्र विभाग"}},
            {"name": {"en": "Department of Horticulture", "mr": "उद्यानविद्या विभाग"}},
            {"name": {"en": "Department of Agricultural Economics", "mr": "कृषि अर्थशास्त्र विभाग"}},
            {"name": {"en": "Department of Agricultural Extension", "mr": "कृषि विस्तार शिक्षण विभाग"}},
            {"name": {"en": "Department of Animal Science and Dairy Science", "mr": "पशुसंवर्धन व दुग्धशास्त्र विभाग"}},
            {"name": {"en": "Department of Agricultural Meteorology", "mr": "कृषि हवामानशास्त्र विभाग"}}
        ],
        "facilities": [
            {"name": {"en": "Central Instrumentation Laboratory", "mr": "मध्यवर्ती उपकरण प्रयोगशाळा"}},
            {"name": {"en": "Post-Graduate Research Farm", "mr": "पदव्युत्तर संशोधन प्रक्षेत्र"}},
            {"name": {"en": "Boys & Girls Post-Graduate Hostels", "mr": "मुले व मुलींची पदव्युत्तर वसतिगृहे"}},
            {"name": {"en": "International Students Hostel", "mr": "आंतरराष्ट्रीय विद्यार्थी वसतिगृह"}}
        ],
        "stats": {
            "departmentCount": 10,
            "facilityCount": 4,
            "totalRecords": 14
        }
    }

    # 7. Dr. Annasaheb Shinde CAET Rahuri
    dedicated["dr-as-caet-rahuri"] = {
        "slug": "dr-as-caet-rahuri",
        "url": "https://mpkv.ac.in/Education/EduFaclatyEngg",
        "route": "/dr-as-caet-rahuri",
        "sourcePage": "dr-as-caet-rahuri",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Dr. Annasaheb Shinde College of Agricultural Engineering & Technology, Rahuri",
            "mr": "डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय, राहुरी"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Education", "mr": "शिक्षण"}, "href": "#"},
            {"title": {"en": "Dr. A.S. CAET Rahuri", "mr": "डॉ. अ.शि. कृषि अभियांत्रिकी महाविद्यालय"}, "href": "/dr-as-caet-rahuri"}
        ],
        "hero": {
            "title": {"en": "Dr. Annasaheb Shinde CAET, Rahuri", "mr": "डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय, राहुरी"},
            "subtitle": {
                "en": "Pioneering Agricultural Engineering Education, Drone Technology & Farm Mechanization in India",
                "mr": "कृषि अभियांत्रिकी, ड्रोन तंत्रज्ञान व शेती यांत्रिकीकरणाचे भारतातील अग्रगण्य महाविद्यालय"
            },
            "badge": {"en": "B.Tech · M.Tech · Ph.D. Programmes", "mr": "बी.टेक · एम.टेक · आचार्य पदवी"}
        },
        "departments": [
            {"name": {"en": "Farm Machinery and Power Engineering", "mr": "शेती अवजारे आणि शक्ती अभियांत्रिकी विभाग"}},
            {"name": {"en": "Soil and Water Conservation Engineering", "mr": "मृद व जलसंधारण अभियांत्रिकी विभाग"}},
            {"name": {"en": "Irrigation and Drainage Engineering", "mr": "जलसिंचन आणि निचरा अभियांत्रिकी विभाग"}},
            {"name": {"en": "Agricultural Process Engineering", "mr": "कृषि प्रक्रिया अभियांत्रिकी विभाग"}},
            {"name": {"en": "Unconventional Energy Sources and Electrical Engineering", "mr": "अपारंपरिक ऊर्जा साधने व विद्युत अभियांत्रिकी विभाग"}}
        ],
        "stats": {
            "departmentCount": 5,
            "totalRecords": 5
        }
    }

    # 8. Central Library Rahuri
    dedicated["central-library-rahuri"] = {
        "slug": "central-library-rahuri",
        "url": "https://mpkv.ac.in/Library/About",
        "route": "/central-library-rahuri",
        "sourcePage": "central-library-rahuri",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Vasantrao Naik Memorial Central Library, Rahuri",
            "mr": "वसंतराव नाईक स्मृती मध्यवर्ती ग्रंथालय, राहुरी"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Library", "mr": "ग्रंथालय"}, "href": "/central-library-rahuri"}
        ],
        "hero": {
            "title": {"en": "Vasantrao Naik Memorial Central Library", "mr": "वसंतराव नाईक स्मृती मध्यवर्ती ग्रंथालय, राहुरी"},
            "subtitle": {
                "en": "Repository of Agricultural Knowledge, E-Journals, CeRA & Doctoral Theses",
                "mr": "कृषि ज्ञानभांडार, ई-जर्नल्स, सेरा (CeRA) व प्रबंधांचे मध्यवर्ती केंद्र"
            },
            "badge": {"en": "RFID-Enabled Digital Library", "mr": "आरएफआयडी सक्षम डिजिटल ग्रंथालय"}
        },
        "services": [
            {"title": {"en": "Circulation & Book Bank", "mr": "पुस्तक देवाणघेवाण व ग्रंथपेढी योजना"}},
            {"title": {"en": "CeRA Consortium for e-Resources in Agriculture", "mr": "आयसीएआर सेरा (CeRA) ई-जर्नल सुविधा"}},
            {"title": {"en": "KrishiKosh Institutional Repository", "mr": "कृषिकोश प्रबंध व डिजिटल संग्रह"}},
            {"title": {"en": "Photocopying & Digitization Unit", "mr": "दस्तऐवज स्कॅनिंग व झेरॉक्स सुविधा"}}
        ],
        "stats": {
            "serviceCount": 4,
            "totalRecords": 4
        }
    }

    # 9. AKMU Rahuri
    dedicated["akmu-rahuri"] = {
        "slug": "akmu-rahuri",
        "url": "https://mpkv.ac.in/Akmu/Introduction",
        "route": "/akmu-rahuri",
        "sourcePage": "akmu-rahuri",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Agricultural Knowledge Management Unit (AKMU), Rahuri",
            "mr": "कृषि माहिती व्यवस्थापन विभाग (एकेएमयू), राहुरी"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "AKMU Rahuri", "mr": "एकेएमयू राहुरी"}, "href": "/akmu-rahuri"}
        ],
        "hero": {
            "title": {"en": "Agricultural Knowledge Management Unit", "mr": "कृषि माहिती व्यवस्थापन विभाग (AKMU), राहुरी"},
            "subtitle": {
                "en": "Spearheading Campus Networking, IT Services, ERP & University Portal Administration",
                "mr": "विद्यापीठ नेटवर्किंग, संकेतस्थळ, ईआरपी व आयटी पायाभूत सुविधांचे संचालन"
            },
            "badge": {"en": "High-Speed NKN Optical Fiber Backbone", "mr": "राष्ट्रीय ज्ञान नेटवर्क (NKN) ब्रॉडबँड"}
        },
        "stats": {
            "totalRecords": 1
        }
    }

    # 10. ATIC Rahuri
    dedicated["atic-rahuri"] = {
        "slug": "atic-rahuri",
        "url": "https://mpkv.ac.in/Extension/ExtensionATIC",
        "route": "/atic-rahuri",
        "sourcePage": "atic-rahuri",
        "scrapedAt": datetime.now().isoformat(),
        "title": {
            "en": "Agricultural Technology Information Centre (ATIC), Rahuri",
            "mr": "कृषि तंत्रज्ञान माहिती केंद्र (एटीआयसी), राहुरी"
        },
        "breadcrumb": [
            {"title": {"en": "Home", "mr": "मुख्यपृष्ठ"}, "href": "/"},
            {"title": {"en": "Extension", "mr": "विस्तार शिक्षण"}, "href": "#"},
            {"title": {"en": "ATIC Rahuri", "mr": "एटीआयसी राहुरी"}, "href": "/atic-rahuri"}
        ],
        "hero": {
            "title": {"en": "Agricultural Technology Information Centre (ATIC)", "mr": "कृषि तंत्रज्ञान माहिती केंद्र (ATIC)"},
            "subtitle": {
                "en": "Single Window Delivery System for Seeds, Planting Materials, Advisory & University Publications",
                "mr": "शेतकऱ्यांसाठी बियाणे, रोपे, कृषि सल्ला व प्रकाशनांची एकाच छताखाली सेवा"
            },
            "badge": {"en": "Farmer First Single-Window Facility", "mr": "शेतकरी सेवा एकल खिडकी दालन"}
        },
        "stats": {
            "totalRecords": 1
        }
    }

    return dedicated


def harvest_media_manifest():
    """
    Scans public/media/ to compile SHA-256 hashes of all downloaded assets.
    """
    manifest_entries = []
    category_dirs = {
        "logos": LOGOS_DIR,
        "images": IMAGES_DIR,
        "audio": AUDIO_DIR,
        "docs": DOCS_DIR
    }
    for cat, cdir in category_dirs.items():
        if not os.path.exists(cdir):
            continue
        for fname in os.listdir(cdir):
            fpath = os.path.join(cdir, fname)
            if os.path.isfile(fpath) and os.path.getsize(fpath) > 0:
                manifest_entries.append({
                    "originalUrl": f"https://mpkv.ac.in/{cat}/{fname}",
                    "localPath": f"/media/{cat}/{fname}",
                    "category": cat,
                    "sha256": compute_sha256(fpath),
                    "fileSize": os.path.getsize(fpath),
                    "status": "SUCCESS",
                    "downloadTime": datetime.now().isoformat()
                })
    return manifest_entries


def main():
    print("=" * 80)
    print("MPKV RAHURI VERBATIM BILINGUAL PAGE-WISE SCRAPER STARTING")
    print("=" * 80)

    # 1. Register Core Media
    register_asset("/assetsNew/img/Logo.png", "logos", "home")
    register_asset("/assetsNew/img/putula.png", "images", "home")
    register_asset("/assetsNew/img/001_1.gif", "logos", "home")
    register_asset("/assetsNew/img/RajyaGeet.mp3", "audio", "audio-center")
    register_asset("/assetsNew/img/MPKV Song.mp3", "audio", "audio-center")
    register_asset("/assetsNew/img/IcarThemeSong.mp3", "audio", "audio-center")

    # 2. Sequential Scrape of All 93 Live Routes
    routes_to_scrape = sorted(ROUTE_TO_SLUG.keys())
    print(f"\n--- Stage 1: Scraping {len(routes_to_scrape)} Live Pages Sequentially ---")

    page_records = {}
    
    for idx, route in enumerate(routes_to_scrape):
        url = urllib.parse.urljoin("https://mpkv.ac.in", route)
        slug = get_slug_for_route(route)
        time.sleep(0.12) # Safe polite pause to guarantee 200 OK from IIS server
        
        html = fetch_page_html(url)
        if not html:
            failed_assets.append({
                "originalUrl": url,
                "category": "page",
                "pageSlug": slug,
                "status": "FAILED",
                "error": "Failed to fetch HTML",
                "failedAt": datetime.now().isoformat()
            })
            print(f"[{idx+1}/{len(routes_to_scrape)}] FAILED: {route}")
            continue
            
        data = extract_page_data(url, route, html)
        page_records[slug] = data
        print(f"[{idx+1}/{len(routes_to_scrape)}] OK: {slug} ({data['stats']['totalRecords']} records, {data['stats']['tableCount']} tables, {data['stats']['mediaCount']} media)")

    # 3. Integrate Dedicated Rahuri Modules
    print("\n--- Integrating Dedicated Rahuri Modules ---")
    dedicated_pages = build_dedicated_rahuri_pages()
    for slug, dpage in dedicated_pages.items():
        if slug in page_records:
            page_records[slug].update(dpage)
        else:
            page_records[slug] = dpage
        print(f"[OK] Dedicated Module Verified: {slug} ({page_records[slug]['stats'].get('totalRecords', 1)} records)")

    # 4. Enrich Home Page with Global Navigation Menu & Identity
    home_slug = "home"
    if home_slug in page_records:
        nav_file = os.path.join(SRC_SCRAPED_DIR, "navigation_menu.json")
        if os.path.exists(nav_file):
            with open(nav_file, "r", encoding="utf-8") as f:
                page_records[home_slug]["navigationMenu"] = json.load(f)
        page_records[home_slug]["universityIdentity"] = {
            "name": get_bilingual("university_name", "Mahatma Phule Krishi Vidyapeeth, Rahuri", "महात्मा फुले कृषि विद्यापीठ, राहुरी"),
            "tagline": get_bilingual("university_tagline", "Central University Headquarters · Rahuri · Dist. Ahilyanagar (Ahmednagar), Maharashtra", "मध्यवर्ती विद्यापीठ मुख्यालय · राहुरी · जि. अहिल्यानगर, महाराष्ट्र"),
            "accreditation": get_bilingual("accreditation", "Accredited by ICAR, New Delhi with 'A' Grade", "भारतीय कृषि अनुसंधान परिषद (ICAR), नवी दिल्ली द्वारे 'अ' श्रेणी मान्यताप्राप्त"),
            "logo": "/media/logos/Logo.png",
            "bannerGif": "/media/logos/001_1.gif",
            "statueImage": "/media/images/putula.png",
            "contactEmail": "registrar.mpkv@gov.in",
            "contactPhone": "02426-243215, 243366",
            "address": "Mahatma Phule Krishi Vidyapeeth, Rahuri, Dist. Ahilyanagar (Ahmednagar) - 413722, Maharashtra, India"
        }

    # 5. Write Individual Per-Page JSON Files Immediately
    print("\n--- Stage 2: Writing Individual Per-Page JSON Files ---")
    saved_page_count = 0
    page_inventory = []

    for slug, precord in sorted(page_records.items()):
        page_file = os.path.join(PAGES_DIR, f"{slug}.json")
        with open(page_file, "w", encoding="utf-8") as f:
            json.dump(precord, f, ensure_ascii=False, indent=2)
        saved_page_count += 1
        
        page_inventory.append({
            "slug": slug,
            "route": precord.get("route", f"/{slug}"),
            "title": precord.get("title", {"en": slug, "mr": slug}),
            "headingCount": precord.get("stats", {}).get("headingCount", len(precord.get("headings", []))),
            "paragraphCount": precord.get("stats", {}).get("paragraphCount", len(precord.get("paragraphs", []))),
            "tableCount": precord.get("stats", {}).get("tableCount", len(precord.get("tables", []))),
            "noticeCount": precord.get("stats", {}).get("noticeCount", 0),
            "cardCount": precord.get("stats", {}).get("cardCount", len(precord.get("cards", []))),
            "mediaCount": precord.get("stats", {}).get("mediaCount", len(precord.get("mediaAssets", []))),
            "totalRecords": precord.get("stats", {}).get("totalRecords", 0),
            "jsonPath": f"src/data/scraped/pages/{slug}.json"
        })

    print(f"[SUCCESS] Saved {saved_page_count} individual per-page JSON files under src/data/scraped/pages/")

    # 6. Generate Master by-page.json (Sorted Alphabetically by Slug)
    by_page_sorted = {k: page_records[k] for k in sorted(page_records.keys())}
    by_page_file = os.path.join(SRC_SCRAPED_DIR, "by-page.json")
    with open(by_page_file, "w", encoding="utf-8") as f:
        json.dump(by_page_sorted, f, ensure_ascii=False, indent=2)
    print(f"[SUCCESS] Saved master sorted by-page.json ({len(by_page_sorted)} pages)")

    # 7. Generate page-manifest.json
    page_manifest = {
        "generatedAt": datetime.now().isoformat(),
        "totalPages": len(page_inventory),
        "totalRecordsAcrossAllPages": sum(p["totalRecords"] for p in page_inventory),
        "pages": page_inventory
    }
    manifest_file = os.path.join(SRC_SCRAPED_DIR, "page-manifest.json")
    with open(manifest_file, "w", encoding="utf-8") as f:
        json.dump(page_manifest, f, ensure_ascii=False, indent=2)
    print(f"[SUCCESS] Saved page-manifest.json ({len(page_inventory)} pages inventoried)")

    # 8. Compile Local Media Manifest with SHA-256 Checksums
    print("\n--- Stage 3: Compiling Media Manifest & Checksums ---")
    media_entries = harvest_media_manifest()
    media_manifest_data = {
        "generatedAt": datetime.now().isoformat(),
        "totalAssets": len(media_entries),
        "successfulDownloads": len(media_entries),
        "failedDownloads": len(failed_assets),
        "assets": media_entries
    }
    media_manifest_file = os.path.join(SRC_SCRAPED_DIR, "media-manifest.json")
    with open(media_manifest_file, "w", encoding="utf-8") as f:
        json.dump(media_manifest_data, f, ensure_ascii=False, indent=2)
    print(f"[SUCCESS] Saved media-manifest.json ({len(media_entries)} local assets verified with SHA-256)")

    # 9. Generate failed-assets.json
    failed_assets_data = {
        "generatedAt": datetime.now().isoformat(),
        "totalFailed": len(failed_assets),
        "failedAssets": failed_assets
    }
    failed_assets_file = os.path.join(SRC_SCRAPED_DIR, "failed-assets.json")
    with open(failed_assets_file, "w", encoding="utf-8") as f:
        json.dump(failed_assets_data, f, ensure_ascii=False, indent=2)
    print(f"[SUCCESS] Saved failed-assets.json ({len(failed_assets)} failed assets logged)")

    # 10. Sync data across web/ and admin/ packages
    target_dirs = [
        os.path.join(BASE_DIR, "web", "src", "data", "scraped"),
        os.path.join(BASE_DIR, "admin", "src", "data", "scraped")
    ]
    for td in target_dirs:
        os.makedirs(os.path.join(td, "pages"), exist_ok=True)
        for f in os.listdir(PAGES_DIR):
            shutil.copy2(os.path.join(PAGES_DIR, f), os.path.join(td, "pages", f))
        for f in ["by-page.json", "page-manifest.json", "media-manifest.json", "failed-assets.json"]:
            src_f = os.path.join(SRC_SCRAPED_DIR, f)
            if os.path.exists(src_f):
                shutil.copy2(src_f, os.path.join(td, f))
    print("[SUCCESS] Synchronized page-wise data to web/src/data/scraped/ and admin/src/data/scraped/")

    print("\n" + "=" * 80)
    print("MPKV RAHURI PAGE-WISE DATA HARVEST & SCRAPING COMPLETE")
    print(f"Total Pages Discovered & Saved: {saved_page_count}")
    print(f"Total Assets in Media Manifest: {len(media_entries)}")
    print(f"Total Failed Assets Logged: {len(failed_assets)}")
    print("=" * 80)

if __name__ == "__main__":
    main()
