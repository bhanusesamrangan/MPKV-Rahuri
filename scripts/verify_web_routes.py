import json, os

pages_dir = 'web/src/data/scraped/pages'
all_files = set(f.replace('.json', '') for f in os.listdir(pages_dir) if f.endswith('.json'))
menu = json.load(open('web/src/data/scraped/navigation_menu.json', encoding='utf-8'))

aliases = {
    'Home/ActStatute': 'act-and-statute',
    'ActStatute': 'act-and-statute',
    'act-and-statute': 'act-and-statute',
    'education/at-a-glance': 'education-at-a-glance',
    'education/profile': 'education-organizational-profile',
    'education/thrust-areas': 'education-thrust-areas',
    'education/regulations': 'education-academic-regulations',
    'education/doctoral': 'education-courses-doctoral',
    'education/masters': 'education-courses-masters',
    'education/bachelors': 'education-courses-bachelors',
    'education/diploma': 'education-diploma-schools',
    'research/at-a-glance': 'research-at-a-glance',
    'research/varieties': 'research-varieties',
    'research/recommendations': 'research-recommendations',
    'research/implements': 'research-farm-implements',
    'research/patents': 'research-patents',
    'research/aicrp': 'research-icar-aicrp',
    'research/state-schemes': 'research-non-plan-state-schemes',
    'research/funded-projects': 'research-externally-funded-projects',
    'research/review-mechanism': 'research-review-mechanism',
    'communication-centre': 'extension-communication-center',
    'extension/publications': 'extension-publications',
    'students/admission': 'student-admission-procedure',
    'students/hostels': 'student-hostels',
    'students/sports': 'student-sports',
    'students/international': 'student-international-cell',
    'students/grievance': 'transparency-and-grievance',
    'farmer/bio-inputs': 'farmer-inputs',
    'farmer/advisories': 'agro-advisories',
    'farmer/weather': 'agro-advisories',
    'farmer/calendar': 'krishi-calendar',
    'officers/directory': 'officers-directory',
    'contact-us': 'contacts-directory',
    'contacts': 'contacts-directory',
}

def resolve(path):
    p = path.strip('/')
    if not p or p == '#': return 'SKIP'
    if p in aliases: return aliases[p]
    p_dashed = p.replace('/', '-')
    if p_dashed in all_files: return p_dashed
    last = p.split('/')[-1]
    if last in all_files: return last
    for f in all_files:
        if last in f or p_dashed in f: return f
    return None

def check_menu(items):
    for it in items:
        if 'href' in it and it['href'] not in ('#', '/'):
            r = resolve(it['href'])
            print(f"{it['href']:35} -> {r}")
        if 'children' in it:
            check_menu(it['children'])

check_menu(menu)
print(f"Total available page files in pages/: {len(all_files)}")
