import urllib.request, ssl, time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    'https://mpkv.ac.in/Home/MpkvAtaGlance',
    'https://mpkv.ac.in/Home/aboutphule',
    'https://mpkv.ac.in/VC/VCDesk',
    'https://mpkv.ac.in/Education/AtaGlance',
    'https://mpkv.ac.in/Education/EduConstituenClg',
    'https://mpkv.ac.in/Research/ResearchTechVariety',
    'https://mpkv.ac.in/Akmu/Introduction',
    'https://mpkv.ac.in/Officers/OfficersContacts',
    'https://mpkv.ac.in/Adminstration/AdminsRecruitment',
    'https://mpkv.ac.in/Akmu/Tender',
    'https://mpkv.ac.in/AllCircular/Circular'
]

for u in urls:
    time.sleep(0.3)
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'curl/8.22.0'})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            data = resp.read()
            print(f"200 OK: {u} ({len(data)} bytes)")
    except Exception as e:
        print(f"ERR: {u} -> {e}")
