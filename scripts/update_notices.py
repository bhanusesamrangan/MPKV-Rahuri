import os
import json
import urllib.request
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "src", "data", "scraped")
DOCS_DIR = os.path.join(BASE_DIR, "public", "media", "docs")

manifest_path = os.path.join(DATA_DIR, "media_manifest.json")
with open(manifest_path, "r", encoding="utf-8") as f:
    manifest_data = json.load(f)

manifest = manifest_data.get("assets", [])

def download_doc(url, filename):
    full_url = f"https://mpkv.ac.in/{url.lstrip('/')}"
    local_path = os.path.join(DOCS_DIR, filename)
    public_rel = f"/media/docs/{filename}"
    
    entry = {
        "original_url": full_url,
        "local_path": public_rel,
        "category": "docs",
        "download_time": datetime.now().isoformat(),
        "status": "PENDING",
        "file_size": 0,
        "error": None
    }
    
    try:
        req = urllib.request.Request(full_url, headers={'User-Agent': 'curl/8.22.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(local_path, "wb") as f:
                f.write(data)
            entry["status"] = "SUCCESS"
            entry["file_size"] = len(data)
            entry["content_type"] = resp.headers.get("Content-Type", "")
            print(f"[OK] Downloaded: {filename} ({len(data)} bytes)")
    except Exception as e:
        entry["status"] = "FAILED"
        entry["error"] = str(e)
        print(f"[FAILED] {full_url}: {e}")

    manifest.append(entry)
    return public_rel

# Download the recruitment PDFs
rec_doc_1 = download_doc("Uploads/AKMU/20261113_160343_37ddc2dd404570a7625383e11909fb03.pdf", "Young_Professional_II_Agril_Engg_Rahuri.pdf")
rec_doc_2 = download_doc("Uploads/AKMU/20261105_164647_28056c6380cac8a3f955fedb234db962.pdf", "Young_Professional_I_Entomology_Rahuri.pdf")
rec_doc_3 = download_doc("Uploads/AKMU/20261102_160801_6bfaffa99451f6899db9c5e43666cd6f.pdf", "SRF_DUS_Chickpea_Pulses_Project_Rahuri.pdf")

# Update home_data.json with recruitment items
home_path = os.path.join(DATA_DIR, "home_data.json")
with open(home_path, "r", encoding="utf-8") as f:
    home_data = json.load(f)

recruitment_items = [
    {
        "id": "rec_1",
        "date": "13 Nov 2026",
        "title": {
            "en": "Notification for the post of Young Professional-II (contractual basis) at Dept of Agricultural Engineering, MPKV, Rahuri.",
            "mr": "कृषि अभियांत्रिकी विभाग, मफुकृवि, राहुरी येथे तरुण व्यावसायिक-२ (कंत्राटी पद्धत) पदाची भरती अधिसूचना."
        },
        "department": "Department of Agricultural Engineering, Rahuri",
        "file_path": rec_doc_1
    },
    {
        "id": "rec_2",
        "date": "05 Nov 2026",
        "title": {
            "en": "Notification for the post of Young Professional-I, Department of Agricultural Entomology, MPKV Rahuri",
            "mr": "जाहिरात - तरुण व्यावसायिक १, कीटकशास्त्र विभाग, मफुकृवि, राहुरी"
        },
        "department": "Department of Agricultural Entomology, Rahuri",
        "file_path": rec_doc_2
    },
    {
        "id": "rec_3",
        "date": "02 Nov 2026",
        "title": {
            "en": "Notification of the posts of Senior Research Fellow (Contract Basis) in the DUS Network Mission Project on DUS Testing of Chickpea at Pulses Improvement Project, M.P.K.V. Rahuri.",
            "mr": "कडधान्य सुधार प्रकल्प, म.फु.कृ.वि. राहुरी येथील डीयुएस नेटवर्क मिशन प्रकल्पांतर्गत वरिष्ठ संशोधन फेलो (SRF) पदाची अधिसूचना."
        },
        "department": "Pulses Improvement Project, Rahuri",
        "file_path": rec_doc_3
    }
]

home_data["recruitment"] = recruitment_items

with open(home_path, "w", encoding="utf-8") as f:
    json.dump(home_data, f, ensure_ascii=False, indent=2)

# Save dedicated rahuri_notices.json
rahuri_notices = {
    "recruitment": recruitment_items,
    "tenders": home_data["tenders"],
    "news_and_advisories": home_data["news_ticker"],
    "announcements": [
        {
            "id": "ann_1",
            "date": "23 Oct 2026",
            "title": {
                "en": "Public Notice - 40th Annual Convocation Ceremony of MPKV Rahuri",
                "mr": "जाहीर निवेदन - ४० वा वार्षिक पदवी प्रदान समारंभ, मफुकृवि राहुरी"
            },
            "file_path": "/media/docs/20261023_130053_1fbfc1813c46b15f8b89ce15a8d04ca0.pdf"
        },
        {
            "id": "ann_2",
            "date": "29 Oct 2026",
            "title": {
                "en": "Life Certificate - Specimen form for Pensioners of MPKV Rahuri as of 1 November 2026",
                "mr": "हयातीचे प्रमाणपत्र - मफुकृवि निवृत्ती वेतनधारकांकडून १ नोव्हेंबर २०२६ रोजी हयात असलेले प्रमाणपत्राचा नमुना"
            },
            "file_path": "/media/docs/20261029_170823_076f9e632d377675d7eac8cfb5f5e60e.pdf"
        },
        {
            "id": "ann_3",
            "date": "17 Nov 2026",
            "title": {
                "en": "Admission Notification for Ph.D. (Doctoral) Degree Programmes Academic Year 2026-27 at Central Campus, Rahuri",
                "mr": "सन २०२६-२७ आचार्य पदवी (Ph.D.) अभ्यासक्रमाची प्रवेश सूचना - मध्यवर्ती परिसर, राहुरी"
            },
            "file_path": "/media/docs/20261117_160948_9ce404dba955b1b1cd65dbc6e3cecd3a.pdf"
        }
    ]
}

with open(os.path.join(DATA_DIR, "rahuri_notices.json"), "w", encoding="utf-8") as f:
    json.dump(rahuri_notices, f, ensure_ascii=False, indent=2)

# Resave manifest
manifest_data["total_assets"] = len(manifest)
manifest_data["successful_downloads"] = len([m for m in manifest if m["status"] == "SUCCESS"])
manifest_data["failed_downloads"] = len([m for m in manifest if m["status"] == "FAILED"])
manifest_data["assets"] = manifest

with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(manifest_data, f, ensure_ascii=False, indent=2)

print("[SUCCESS] Downloaded recruitment notices, saved rahuri_notices.json, updated manifest.")
