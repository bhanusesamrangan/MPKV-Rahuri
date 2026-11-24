import json

with open("web/src/data/scraped/navigation_menu.json", "r", encoding="utf-8") as f:
    nav = json.load(f)

# Base existing aliases
aliases = {
  "Home/ActStatute": "act-and-statute",
  "Home/IndexNew": "home",
  "ActStatute": "act-and-statute",
  "act-statute": "act-and-statute",
  "act-and-statute": "act-and-statute",
  
  # Education
  "education/at-a-glance": "education-at-a-glance",
  "education/profile": "education-organizational-profile",
  "education/thrust-areas": "education-thrust-areas",
  "education/regulations": "education-academic-regulations",
  "education/constituent-colleges": "education-constituent-colleges",
  "education/affiliated-colleges": "education-affiliated-colleges",
  "education/doctoral": "education-courses-doctoral",
  "education/masters": "education-courses-masters",
  "education/bachelors": "education-courses-bachelors",
  "education/diploma": "education-courses-diploma",
  "education/diploma-schools": "education-diploma-schools",
  "education/certificate-courses": "education-certificate-courses",
  "education/faculty-agricultural-science": "education-faculty-agricultural-science",
  "education/faculty-agricultural-engineering": "education-faculty-agricultural-engineering",

  # Original ASP.NET routes for Education
  "Education/AtaGlance": "education-at-a-glance",
  "Education/EduProfile": "education-organizational-profile",
  "Education/EduThrustAreas": "education-thrust-areas",
  "Education/EduConstituenClg": "education-constituent-colleges",
  "Education/EduAffiletedClg": "education-affiliated-colleges",
  "Education/EduCourseDiploma": "education-courses-diploma",
  "Education/EduCourseBachlor": "education-courses-bachelors",
  "Education/EduCourseMaster": "education-courses-masters",
  "Education/EduCourseDoctoral": "education-courses-doctoral",
  "Education/EduFaclatyScience": "education-faculty-agricultural-science",
  "Education/EduFaclatyEngg": "education-faculty-agricultural-engineering",
  "Education/EduAcademicRegulations": "education-academic-regulations",
  "Education/EduDiplomaSchool": "education-diploma-schools",
  "Education/EduCirtificateCourse": "education-certificate-courses",

  # Research
  "research/at-a-glance": "research-at-a-glance",
  "research/profile": "research-organizational-profile",
  "research/thrust-areas": "research-thrust-areas",
  "research/aicrp": "research-icar-aicrp",
  "research/state-schemes": "research-non-plan-state-schemes",
  "research/funded-projects": "research-externally-funded-projects",
  "research/review-mechanism": "research-review-mechanism",
  "research/western-ghat-zone": "research-western-ghat-zone",
  "research/sub-montane-zone": "research-sub-montane-zone",
  "research/plain-zone": "research-plain-zone",
  "research/scarcity-zone": "research-scarcity-zone",
  "research/central-plateau-zone": "research-central-plateau-zone",
  "research/varieties": "research-varieties",
  "research/recommendations": "research-recommendations",
  "research/implements": "research-farm-implements",
  "research/patents": "research-patents",

  # Original ASP.NET routes for Research
  "Research/ResearchAtaGalance": "research-at-a-glance",
  "Research/ResearchProfile": "research-organizational-profile",
  "Research/ResearchThrustArea": "research-thrust-areas",
  "Research/ResearchWZone": "research-western-ghat-zone",
  "Research/ResearchSMZone": "research-sub-montane-zone",
  "Research/ResearchPlianZone": "research-plain-zone",
  "Research/ResearchScarcityZone": "research-scarcity-zone",
  "Research/ResearchCentralZone": "research-central-plateau-zone",
  "Research/ResearchSchemIcar": "research-icar-aicrp",
  "Research/ResearchSchemNonPlan": "research-non-plan-state-schemes",
  "Research/ResearchSchemFundedProj": "research-externally-funded-projects",
  "Research/ResearchTechVariety": "research-varieties",
  "Research/ResearchTechAgroRec": "research-recommendations",
  "Research/ResearchFarmImplement": "research-farm-implements",
  "Research/ResearchPatents": "research-patents",
  "Research/ResearchReviewMechanism": "research-review-mechanism",

  # Extension
  "extension/at-a-glance": "extension-at-a-glance",
  "extension/profile": "extension-organizational-profile",
  "extension/thrust-areas": "extension-thrust-areas",
  "extension/publications": "extension-publications",
  "extension/krishi-vigyan-kendras": "extension-krishi-vigyan-kendras",
  "extension/kvk": "extension-krishi-vigyan-kendras",
  "extension/atic": "extension-atic",
  "extension/communication-center": "extension-communication-center",
  "extension/adhoc-projects": "extension-adhoc-projects",
  "extension/regional-centers": "extension-regional-centers",
  "extension/district-centers": "extension-district-centers",
  "communication-centre": "extension-communication-center",
  "atic-rahuri": "atic-rahuri",

  # Original ASP.NET routes for Extension
  "Extension/ExtensionAtaGalance": "extension-at-a-glance",
  "Extension/ExtensionProfile": "extension-organizational-profile",
  "Extension/ExtensionThrustArea": "extension-thrust-areas",
  "Extension/ExtensionPublication": "extension-publications",
  "Extension/ExtensionKVK": "extension-krishi-vigyan-kendras",
  "Extension/ExtensionCC": "extension-communication-center",
  "Extension/ExtensionAdProj": "extension-adhoc-projects",
  "Extension/ExtensionATIC": "extension-atic",
  "Extension/ExtensionCenter": "extension-regional-centers",
  "Extension/ExtensionCenterDEC": "extension-district-centers",

  # Library
  "central-library-rahuri": "central-library-rahuri",
  "library/about": "library-about",
  "library/collections": "library-collections",
  "library/sections": "library-sections",
  "library/facilities": "library-facilities",
  "library/services": "library-services",
  "library/links": "library-links",
  "library/activities": "library-activities",
  "library/off-campus": "library-off-campus",
  "library/news-events": "library-news-events",
  "library/contact": "library-contact",

  # Original ASP.NET routes for Library
  "Library/About": "library-about",
  "Library/LibCollections": "library-collections",
  "Library/LibSections": "library-sections",
  "Library/LibFacilities": "library-facilities",
  "Library/LibServices": "library-services",
  "Library/LibLinks": "library-links",
  "Library/LibActivities": "library-activities",
  "Library/LibOffCampus": "library-off-campus",
  "Library/LibNewsEvents": "library-news-events",
  "Library/LibContact": "library-contact",

  # Students
  "students/admission": "student-admission-procedure",
  "students/sports": "student-sports",
  "students/hostels": "student-hostels",
  "students/circulars": "student-circulars",
  "students/international": "student-international-cell",
  "students/pgi-form": "student-pgi-form",
  "students/complaints": "student-complaints",
  "students/grievance": "transparency-and-grievance",

  # Original ASP.NET routes for Students
  "Student/AdmissionProcedure": "student-admission-procedure",
  "Student/SportHome": "student-sports",
  "Student/StudHostel": "student-hostels",
  "Student/StudCircular": "student-circulars",
  "Student/InternationalHome": "student-international-cell",
  "Student/StudentForm": "student-pgi-form",
  "Student/StudentComplaints": "student-complaints",

  # Farmer
  "farmer/scientist-forum": "farmer-scientist-forum",
  "farmer/kisan-aadhar": "farmer-kisan-aadhar",
  "farmer/bio-inputs": "farmer-inputs",
  "farmer/advisories": "agro-advisories",
  "farmer/weather": "agro-advisories",
  "farmer/calendar": "krishi-calendar",
  "seeds-availability": "seeds-availability",
  "nursery-stock": "nursery-stock",
  "farm-implements": "farm-implements",

  # Original ASP.NET routes for Farmer
  "Farmer/FarmerSciForum": "farmer-scientist-forum",
  "Farmer/FarmerKisanAdhar": "farmer-kisan-aadhar",
  "Farmer/FarmerInputes": "farmer-inputs",

  # Officers & Contacts
  "officers/directory": "officers-directory",
  "Officers/OfficersContacts": "officers-directory",
  "contact-us": "contacts-directory",
  "contacts": "contacts-directory",
  "Officers/Contacts": "contacts-directory",
  
  # Administration & Governance
  "administration": "administration-profile",
  "Adminstration/AdminsProfile": "administration-profile",
  "Adminstration/AdminsRecruitment": "recruitment",
  "recruitment": "recruitment",
  "Akmu/Tender": "tenders",
  "tenders": "tenders",
  "AllCircular/Circular": "circulars",
  "circulars": "circulars",
  "Home/aboutphule": "about-mahatma-phule",
  "about-mahatma-phule": "about-mahatma-phule",
  "VC/VCDesk": "vc-desk",
  "vc-desk": "vc-desk"
}

print(f"Generated {len(aliases)} route aliases.")

# Format as TypeScript Record<string, string>
ts_content = "const ROUTE_ALIASES: Record<string, string> = {\n"
for k, v in sorted(aliases.items()):
    ts_content += f"  '{k}': '{v}',\n"
ts_content += "};\n"

with open("scripts/aliases.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Saved to scripts/aliases.ts")
