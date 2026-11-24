import json
from bs4 import BeautifulSoup
import os

with open("test_direct.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

with open("web/src/data/scraped/page-manifest.json", "r", encoding="utf-8") as f:
    manifest = json.load(f)

with open("web/src/data/scraped/translations.json", "r", encoding="utf-8") as f:
    translations = json.load(f)

pages_dir = "web/src/data/scraped/pages"
available_pages = set([f[:-5] for f in os.listdir(pages_dir) if f.endswith(".json")])

route_to_slug = {}
for p in manifest.get("pages", []):
    route_to_slug[p["route"].lower().strip("/")] = p["slug"]
    route_to_slug[p["slug"].lower()] = p["slug"]

# Add known aliases
route_to_slug["education/ataglance"] = "education-at-a-glance"
route_to_slug["education/eduprofile"] = "education-organizational-profile"
route_to_slug["education/eduthrustareas"] = "education-thrust-areas"
route_to_slug["education/educonstituenclg"] = "education-constituent-colleges"
route_to_slug["education/eduaffiletedclg"] = "education-affiliated-colleges"
route_to_slug["education/educoursediploma"] = "education-courses-diploma"
route_to_slug["education/educoursebachlor"] = "education-courses-bachelors"
route_to_slug["education/educoursemaster"] = "education-courses-masters"
route_to_slug["education/educoursedoctoral"] = "education-courses-doctoral"
route_to_slug["education/edufaclatyscience"] = "education-faculty-agricultural-science"
route_to_slug["education/edufaclatyengg"] = "education-faculty-agricultural-engineering"
route_to_slug["education/eduacademicregulations"] = "education-academic-regulations"
route_to_slug["education/edudiplomaschool"] = "education-diploma-schools"
route_to_slug["education/educirtificatecourse"] = "education-certificate-courses"

route_to_slug["research/researchatagalance"] = "research-at-a-glance"
route_to_slug["research/researchprofile"] = "research-organizational-profile"
route_to_slug["research/researchthrustarea"] = "research-thrust-areas"
route_to_slug["research/researchwzone"] = "research-western-ghat-zone"
route_to_slug["research/researchsmzone"] = "research-sub-montane-zone"
route_to_slug["research/researchplianzone"] = "research-plain-zone"
route_to_slug["research/researchscarcityzone"] = "research-scarcity-zone"
route_to_slug["research/researchcentralzone"] = "research-central-plateau-zone"
route_to_slug["research/researchschemicar"] = "research-icar-aicrp"
route_to_slug["research/researchschemnonplan"] = "research-non-plan-state-schemes"
route_to_slug["research/researchschemfundedproj"] = "research-externally-funded-projects"
route_to_slug["research/researchtechvariety"] = "research-varieties"
route_to_slug["research/researchtechagrorec"] = "research-recommendations"
route_to_slug["research/researchfarmimplement"] = "research-farm-implements"
route_to_slug["research/researchpatents"] = "research-patents"
route_to_slug["research/researchreviewmechanism"] = "research-review-mechanism"

route_to_slug["extension/extensionatagalance"] = "extension-at-a-glance"
route_to_slug["extension/extensionprofile"] = "extension-organizational-profile"
route_to_slug["extension/extensionthrustarea"] = "extension-thrust-areas"
route_to_slug["extension/extensionpublication"] = "extension-publications"
route_to_slug["extension/extensionkvk"] = "extension-krishi-vigyan-kendras"
route_to_slug["extension/extensioncc"] = "extension-communication-center"
route_to_slug["extension/extensionadproj"] = "extension-adhoc-projects"
route_to_slug["extension/extensionatic"] = "extension-atic"
route_to_slug["extension/extensioncenter"] = "extension-regional-centers"
route_to_slug["extension/extensioncenterdec"] = "extension-district-centers"

route_to_slug["library/about"] = "library-about"
route_to_slug["library/libcollections"] = "library-collections"
route_to_slug["library/libsections"] = "library-sections"
route_to_slug["library/libfacilities"] = "library-facilities"
route_to_slug["library/libservices"] = "library-services"
route_to_slug["library/liblinks"] = "library-links"
route_to_slug["library/libactivities"] = "library-activities"
route_to_slug["library/liboffcampus"] = "library-off-campus"
route_to_slug["library/libnewsevents"] = "library-news-events"
route_to_slug["library/libcontact"] = "library-contact"

route_to_slug["student/admissionprocedure"] = "student-admission-procedure"
route_to_slug["student/sporthome"] = "student-sports"
route_to_slug["student/studhostel"] = "student-hostels"
route_to_slug["student/studcircular"] = "student-circulars"
route_to_slug["student/internationalhome"] = "student-international-cell"
route_to_slug["student/studentform"] = "student-pgi-form"
route_to_slug["student/studentcomplaints"] = "student-complaints"

route_to_slug["farmer/farmersciforum"] = "farmer-scientist-forum"
route_to_slug["farmer/farmerkisanadhar"] = "farmer-kisan-aadhar"
route_to_slug["farmer/farmerinputes"] = "farmer-inputs"

route_to_slug["officers/officerscontacts"] = "officers-directory"
route_to_slug["officers/contacts"] = "contacts-directory"

print(f"Total mapped routes: {len(route_to_slug)}")
