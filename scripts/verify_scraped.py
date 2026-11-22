import json
import os

src_dir = "src/data/scraped"
pages_dir = os.path.join(src_dir, "pages")
page_files = [f for f in os.listdir(pages_dir) if f.endswith(".json")]

print(f"Per-page JSON files in src/data/scraped/pages: {len(page_files)}")

with open(os.path.join(src_dir, "page-manifest.json"), "r", encoding="utf-8") as f:
    page_manifest = json.load(f)

print(f"page-manifest.json totalPages: {page_manifest['totalPages']}")
print(f"page-manifest.json totalRecordsAcrossAllPages: {page_manifest['totalRecordsAcrossAllPages']}")

with open(os.path.join(src_dir, "by-page.json"), "r", encoding="utf-8") as f:
    by_page = json.load(f)

print(f"by-page.json total pages: {len(by_page)}")
print(f"First 10 sorted slugs in by-page.json: {list(by_page.keys())[:10]}")

with open(os.path.join(src_dir, "media-manifest.json"), "r", encoding="utf-8") as f:
    media_manifest = json.load(f)

print(f"media-manifest.json totalAssets: {media_manifest['totalAssets']}")
print(f"media-manifest.json successfulDownloads: {media_manifest['successfulDownloads']}")
sample_asset = media_manifest['assets'][0] if media_manifest['assets'] else {}
print(f"Sample asset: path={sample_asset.get('localPath')}, sha256={sample_asset.get('sha256')[:16]}...")

with open(os.path.join(src_dir, "failed-assets.json"), "r", encoding="utf-8") as f:
    failed_assets = json.load(f)

print(f"failed-assets.json totalFailed: {failed_assets['totalFailed']}")

# Show breakdown of sample pages and record counts
print("\n--- SAMPLE PAGE RECORD BREAKDOWN ---")
sample_slugs = [
    "home",
    "vc-desk",
    "recruitment",
    "tenders",
    "circulars",
    "agro-advisories",
    "seeds-availability",
    "nursery-stock",
    "farm-implements",
    "krishi-calendar",
    "audio-center",
    "post-graduate-institute-rahuri",
    "dr-as-caet-rahuri",
    "central-library-rahuri",
    "akmu-rahuri",
    "atic-rahuri",
    "officers-directory",
    "research-varieties"
]

for s in sample_slugs:
    if s in by_page:
        p = by_page[s]
        stats = p.get("stats", {})
        title_en = p.get("title", {}).get("en", s)
        title_mr = p.get("title", {}).get("mr", s)
        print(f"Page: {s}")
        print(f"  Title: {title_en} / {title_mr}")
        print(f"  Headings: {stats.get('headingCount', 0)}, Paragraphs: {stats.get('paragraphCount', 0)}, Tables: {stats.get('tableCount', 0)}, Notices/Tenders/Circ: {stats.get('noticeCount', 0)}, Cards: {stats.get('cardCount', 0)}, Media: {stats.get('mediaCount', 0)}, Total: {stats.get('totalRecords', 0)}")
