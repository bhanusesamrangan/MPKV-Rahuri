import json
import os
import ast

with open("web/src/data/scraped/navigation_menu.json", "r", encoding="utf-8") as f:
    nav = json.load(f)

with open("scripts/aliases.ts", "r", encoding="utf-8") as f:
    text = f.read()

lines = text.splitlines()[1:-1]
dict_str = "{" + "".join(lines) + "}"
ROUTE_ALIASES = ast.literal_eval(dict_str)

pages_dir = "web/src/data/scraped/pages"

results = {"found": 0, "external": 0, "missing": []}

def test_deep(it):
    href = it.get("href", "")
    if href.startswith("http"):
        results["external"] += 1
    elif href and href != "#" and href != "/":
        clean = href.strip("/")
        target = ROUTE_ALIASES.get(clean)
        if not target:
            target = clean.replace("/", "-").lower()
        
        fp = os.path.join(pages_dir, f"{target}.json")
        if os.path.exists(fp):
            results["found"] += 1
            # print(f"OK: {href} -> {target}.json")
        else:
            results["missing"].append((href, clean, target, it.get("title", {}).get("en")))
    
    for ch in it.get("children", []):
        test_deep(ch)

for top in nav:
    test_deep(top)

print(f"Results: {results['found']} internal pages resolved, {results['external']} external alumni links.")
if results["missing"]:
    print(f"MISSING ({len(results['missing'])}):")
    for m in results["missing"]:
        print(f"  {m[0]} -> {m[2]} ({m[3]})")
else:
    print("ALL 100% OF NAV ROUTES RESOLVE PERFECTLY TO EXISTING SCRAPED PAGES!")
