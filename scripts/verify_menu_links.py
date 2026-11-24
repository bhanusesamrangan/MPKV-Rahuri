import json
import os

with open("web/src/data/scraped/navigation_menu.json", "r", encoding="utf-8") as f:
    nav = json.load(f)

pages_dir = "web/src/data/scraped/pages"
available = set([f[:-5] for f in os.listdir(pages_dir) if f.endswith(".json")])

# Custom alias map to mirror pageLoader.ts
ALIASES = {
    "education-at-a-glance": "education-at-a-glance",
    "education-profile": "education-organizational-profile",
    "education-thrust-areas": "education-thrust-areas",
    "education-regulations": "education-academic-regulations",
    "education-doctoral": "education-courses-doctoral",
    "education-masters": "education-courses-masters",
    "education-bachelors": "education-courses-bachelors",
    "education-diploma": "education-courses-diploma",
    "research-at-a-glance": "research-at-a-glance",
    "research-profile": "research-organizational-profile",
    "research-thrust-areas": "research-thrust-areas",
    "research-aicrp": "research-icar-aicrp",
    "research-state-schemes": "research-non-plan-state-schemes",
    "research-funded-projects": "research-externally-funded-projects",
    "research-review-mechanism": "research-review-mechanism",
    "extension-at-a-glance": "extension-at-a-glance",
    "extension-profile": "extension-organizational-profile",
    "extension-thrust-areas": "extension-thrust-areas",
    "farmer-scientist-forum": "farmer-scientist-forum",
    "farmer-kisan-aadhar": "farmer-kisan-aadhar",
    "farmer-bio-inputs": "farmer-inputs",
    "farmer-advisories": "agro-advisories",
    "farmer-calendar": "krishi-calendar",
    "officers-directory": "officers-directory",
    "contact-us": "contacts-directory",
    "contacts": "contacts-directory",
    "students-circulars": "student-circulars",
    "students-pgi-form": "student-pgi-form",
    "students-complaints": "student-complaints",
    "students-admission": "student-admission-procedure",
    "students-sports": "student-sports",
    "students-hostels": "student-hostels",
    "students-international": "student-international-cell"
}

missing = []

def check(items):
    for it in items:
        h = it.get("href")
        if h and not h.startswith("#") and not h.startswith("http") and h != "/":
            norm = h.strip("/").replace("/", "-").lower()
            target = ALIASES.get(norm, norm)
            if target not in available:
                missing.append((h, norm, target, it.get("title", {}).get("en")))
        if "children" in it:
            check(it["children"])

check(nav)
print(f"Total checked. Missing: {len(missing)}")
for m in missing:
    print(f"  HREF: {m[0]} -> target: {m[2]} (title: {m[3]})")
