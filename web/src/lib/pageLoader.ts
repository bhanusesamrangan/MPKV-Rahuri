import fs from 'fs';
import path from 'path';
import menuDataRaw from '@/data/scraped/navigation_menu.json';
import legacyPagesRaw from '@/data/scraped/rahuri_pages.json';

const ROUTE_ALIASES: Record<string, string> = {
  'ActStatute': 'act-and-statute',
  'Adminstration/AdminsProfile': 'administration-profile',
  'adminstration/adminsprofile': 'administration-profile',
  'Adminstration/AdminsSiniorList': 'administration-profile',
  'adminstration/adminssiniorlist': 'administration-profile',
  'Adminstration/AdminsHuman': 'administration-profile',
  'adminstration/adminshuman': 'administration-profile',
  'Adminstration/AdminsVacantPos': 'administration-profile',
  'adminstration/adminsvacantpos': 'administration-profile',
  'Adminstration/AdminsOrder': 'administration-profile',
  'adminstration/adminsorder': 'administration-profile',
  'Adminstration/AdminsRecruitment': 'administration-profile',
  'adminstration/adminsrecruitment': 'administration-profile',
  'Adminstration/AdminsUR': 'administration-profile',
  'adminstration/adminsur': 'administration-profile',
  'Adminstration/AdminsCircular': 'administration-profile',
  'adminstration/adminscircular': 'administration-profile',
  'Adminstration/AdminsPension': 'administration-profile',
  'adminstration/adminspension': 'administration-profile',
  'Adminstration/AdminsContact': 'administration-profile',
  'adminstration/adminscontact': 'administration-profile',
  'Akmu/Tender': 'tenders',
  'Akmu/Traning': 'akmu-training',
  'Akmu/Training': 'akmu-training',
  'akmu/traning': 'akmu-training',
  'akmu/training': 'akmu-training',
  'trainings': 'akmu-training',
  'workshops': 'akmu-training',
  'AllCircular/Circular': 'circulars',
  'allcircular/circular': 'circulars',
  'allcircular': 'circulars',
  'all-circular/circular': 'circulars',
  'all-circular': 'circulars',
  'circular': 'circulars',
  'Education/AtaGlance': 'education-at-a-glance',
  'Education/EduAcademicRegulations': 'education-academic-regulations',
  'Education/EduAffiletedClg': 'education-affiliated-colleges',
  'Education/EduCirtificateCourse': 'education-certificate-courses',
  'Education/EduConstituenClg': 'education-constituent-colleges',
  'Education/EduCourseBachlor': 'education-courses-bachelors',
  'Education/EduCourseDiploma': 'education-courses-diploma',
  'Education/EduCourseDoctoral': 'education-courses-doctoral',
  'Education/EduCourseMaster': 'education-courses-masters',
  'Education/EduDiplomaSchool': 'education-diploma-schools',
  'Education/EduFaclatyEngg': 'education-faculty-agricultural-engineering',
  'Education/EduFaclatyScience': 'education-faculty-agricultural-science',
  'Education/EduProfile': 'education-organizational-profile',
  'Education/EduThrustAreas': 'education-thrust-areas',
  'Extension/ExtensionATIC': 'extension-atic',
  'Extension/ExtensionAdProj': 'extension-adhoc-projects',
  'Extension/ExtensionAtaGalance': 'extension-at-a-glance',
  'Extension/ExtensionCC': 'extension-communication-center',
  'Extension/ExtensionCenter': 'extension-regional-centers',
  'Extension/ExtensionCenterDEC': 'extension-district-centers',
  'Extension/ExtensionKVK': 'extension-krishi-vigyan-kendras',
  'Extension/ExtensionProfile': 'extension-organizational-profile',
  'Extension/ExtensionPublication': 'extension-publications',
  'Extension/ExtensionThrustArea': 'extension-thrust-areas',
  'Farmer/FarmerInputes': 'farmer-inputs',
  'Farmer/FarmerKisanAdhar': 'events-convocation',
  'farmer/farmerkisanadhar': 'events-convocation',
  'PeriodicalEvent/KisanAadhar': 'events-convocation',
  'periodicalevent/kisanaadhar': 'events-convocation',
  'kisan-aadhar': 'events-convocation',
  'kisan-aadhar-sammelan': 'events-convocation',
  'kisanaadhar': 'events-convocation',
  'Farmer/FarmerSciForum': 'farmer-scientist-forum',
  'Finance/AboutFinance': 'finance',
  'Finance/FinanceProfile': 'finance',
  'Finance/FinanceDelegation': 'finance',
  'Finance/FinanceAcountDoc': 'finance',
  'Finance/FinanceGR': 'finance',
  'Finance/FinanceCircular': 'finance',
  'Finance/FinanceBudget': 'finance',
  'Finance/FinanceConatct': 'finance',
  'finance/aboutfinance': 'finance',
  'finance/financeprofile': 'finance',
  'finance/financedelegation': 'finance',
  'finance/financeacountdoc': 'finance',
  'finance/financegr': 'finance',
  'finance/financecircular': 'finance',
  'finance/financebudget': 'finance',
  'finance/financeconatct': 'finance',
  'finance': 'finance',
  'comptroller': 'finance',
  'finance-and-accounts': 'finance',
  'Home/ActStatute': 'act-and-statute',
  'Home/factDada': 'faculty-directory',
  'Home/factData': 'faculty-directory',
  'home/factdada': 'faculty-directory',
  'home/factdata': 'faculty-directory',
  'factdada': 'faculty-directory',
  'factdata': 'faculty-directory',
  'Home/MpkvAtaGlance': 'mpkv-at-a-glance',
  'home/mpkvataglance': 'mpkv-at-a-glance',
  'mpkv-at-a-glance': 'mpkv-at-a-glance',
  'mpkvataglance': 'mpkv-at-a-glance',
  'Home/IndexNew': 'home',
  'Home/empCorner': 'employee-corner',
  'home/empcorner': 'employee-corner',
  'Home/empcorner': 'employee-corner',
  'home/empCorner': 'employee-corner',
  'empCorner': 'employee-corner',
  'empcorner': 'employee-corner',
  'emp-corner': 'employee-corner',
  'employee-corner': 'employee-corner',
  'employees': 'employee-corner',
  'Home/aboutphule': 'about-mahatma-phule',
  'Home/AboutPhule': 'about-mahatma-phule',
  'home/aboutphule': 'about-mahatma-phule',
  'aboutphule': 'about-mahatma-phule',
  'Library/About': 'library-about',
  'Library/LibActivities': 'library-activities',
  'Library/LibCollections': 'library-collections',
  'Library/LibContact': 'library-contact',
  'Library/LibFacilities': 'library-facilities',
  'Library/LibLinks': 'library-links',
  'Library/LibNewsEvents': 'library-news-events',
  'Library/LibOffCampus': 'library-off-campus',
  'Library/LibSections': 'library-sections',
  'Library/LibServices': 'library-services',
  'Officers/Contacts': 'contacts-directory',
  'Officers/ExConcil': 'executive-council',
  'Officers/OfficersContacts': 'officers-directory',
  'Akmu/Introduction': 'akmu-introduction',
  'akmu/introduction': 'akmu-introduction',
  'Akmu/Activity': 'akmu-introduction',
  'akmu/activity': 'akmu-introduction',
  'Akmu/TrainingsConducted': 'akmu-introduction',
  'akmu/trainingsconducted': 'akmu-introduction',
  'Akmu/Publication': 'akmu-introduction',
  'akmu/publication': 'akmu-introduction',
  'Akmu/Contact': 'akmu-introduction',
  'akmu/contact': 'akmu-introduction',
  'Akmu/networkComplaints': 'akmu-introduction',
  'akmu/networkcomplaints': 'akmu-introduction',
  'akmu-introduction': 'akmu-introduction',
  'akmu-rahuri': 'akmu-introduction',
  'akmu': 'akmu-introduction',
  'PmeAndNodel/NodelGuidelines': 'nodal-cell',
  'PmeAndNodel/PmeIntroduction': 'pme-cell',
  'Home/Iqac': 'iqac',
  'Home/AgriUniversities': 'agricultural-universities',
  'PeriodicalEvent/Convocation': 'events-convocation',
  'periodicalevent/convocation': 'events-convocation',
  'convocation': 'events-convocation',
  'PeriodicalEvent/JointAGRESCO': 'events-joint-agresco',
  'periodicalevent/jointagresco': 'events-joint-agresco',
  'joint-agresco': 'events-joint-agresco',
  'agresco': 'events-joint-agresco',
  'PeriodicalEvent/Vanmahostav': 'events-vanmohotsav',
  'periodicalevent/vanmahostav': 'events-vanmohotsav',
  'vanmahostav': 'events-vanmohotsav',
  'vanmohotsav': 'events-vanmohotsav',
  'PeriodicalEvent/UniFDay': 'events-convocation',
  'periodicalevent/unifday': 'events-convocation',
  'foundation-day': 'events-convocation',
  'PeriodicalEvent/Retrospection': 'events-convocation',
  'periodicalevent/retrospection': 'events-convocation',
  'retrospection': 'events-convocation',
  'magova': 'events-convocation',
  'periodic-events': 'events-convocation',
  'periodical-events': 'events-convocation',
  'Research/ResearchAtaGalance': 'research-at-a-glance',
  'Research/ResearchCentralZone': 'research-central-plateau-zone',
  'Research/ResearchFarmImplement': 'research-farm-implements',
  'Research/ResearchPatents': 'research-patents',
  'Research/ResearchPlianZone': 'research-plain-zone',
  'Research/ResearchProfile': 'research-organizational-profile',
  'Research/ResearchReviewMechanism': 'research-review-mechanism',
  'Research/ResearchSMZone': 'research-sub-montane-zone',
  'Research/ResearchScarcityZone': 'research-scarcity-zone',
  'Research/ResearchSchemFundedProj': 'research-externally-funded-projects',
  'Research/ResearchSchemIcar': 'research-icar-aicrp',
  'Research/ResearchSchemNonPlan': 'research-non-plan-state-schemes',
  'Research/ResearchTechAgroRec': 'research-recommendations',
  'Research/ResearchTechRecomm': 'research-recommendations',
  'Research/ResearchTechPatents': 'research-patents',
  'Research/ResearchTechVariety': 'research-varieties',
  'Research/ResearchThrustArea': 'research-thrust-areas',
  'Research/ResearchWZone': 'research-western-ghat-zone',
  'Student/AdmissionProcedure': 'student-admission-procedure',
  'Student/InternationalHome': 'student-international-cell',
  'Student/SportHome': 'student-sports',
  'Student/StudCircular': 'student-circulars',
  'Student/StudHostel': 'student-hostels',
  'Student/StudentComplaints': 'student-complaints',
  'Student/StudentForm': 'student-pgi-form',
  'VC/VCDesk': 'vc-desk',
  'Work/AtaGlance': 'university-engineer-works',
  'Work/WorkProfile': 'university-engineer-works',
  'Work/WorkDuties': 'university-engineer-works',
  'Work/WorkActivities': 'university-engineer-works',
  'Work/WorkContact': 'university-engineer-works',
  'work/ataglance': 'university-engineer-works',
  'work/workprofile': 'university-engineer-works',
  'work/workduties': 'university-engineer-works',
  'work/workactivities': 'university-engineer-works',
  'work/workcontact': 'university-engineer-works',
  'work': 'university-engineer-works',
  'about-mahatma-phule': 'about-mahatma-phule',
  'act-and-statute': 'act-and-statute',
  'act-statute': 'act-and-statute',
  'administration': 'administration-profile',
  'alumni': 'alumni',
  'atic-rahuri': 'atic-rahuri',
  'central-library-rahuri': 'central-library-rahuri',
  'circulars': 'circulars',
  'colleges': 'education-constituent-colleges',
  'communication-centre': 'extension-communication-center',
  'contact-us': 'contacts-directory',
  'contacts': 'contacts-directory',
  'dr-as-caet-rahuri': 'dr-as-caet-rahuri',
  'education': 'education-at-a-glance',
  'education/affiliated-colleges': 'education-affiliated-colleges',
  'education/at-a-glance': 'education-at-a-glance',
  'education/bachelors': 'education-courses-bachelors',
  'education/certificate-courses': 'education-certificate-courses',
  'education/constituent-colleges': 'education-constituent-colleges',
  'education/diploma': 'education-courses-diploma',
  'education/diploma-schools': 'education-diploma-schools',
  'education/doctoral': 'education-courses-doctoral',
  'education/faculty-agricultural-engineering': 'education-faculty-agricultural-engineering',
  'education/faculty-agricultural-science': 'education-faculty-agricultural-science',
  'education/masters': 'education-courses-masters',
  'education/masters-doctoral': 'education-courses-masters',
  'education/master-doctoral': 'education-courses-masters',
  'education/profile': 'education-organizational-profile',
  'education/regulations': 'education-academic-regulations',
  'education/thrust-areas': 'education-thrust-areas',
  'extension/adhoc-projects': 'extension-adhoc-projects',
  'extension/at-a-glance': 'extension-at-a-glance',
  'extension/atic': 'extension-atic',
  'extension/communication-center': 'extension-communication-center',
  'extension/district-centers': 'extension-district-centers',
  'extension/krishi-vigyan-kendras': 'extension-krishi-vigyan-kendras',
  'extension/kvk': 'extension-krishi-vigyan-kendras',
  'extension/profile': 'extension-organizational-profile',
  'extension/publications': 'extension-publications',
  'extension/regional-centers': 'extension-regional-centers',
  'extension/thrust-areas': 'extension-thrust-areas',
  'faculty-directory': 'faculty-directory',
  'education/faculty-directory': 'faculty-directory',
  'faculty': 'faculty-directory',
  'farm-implements': 'farm-implements',
  'farmer/advisories': 'agro-advisories',
  'farmer/bio-fertilizers': 'farmer-inputs',
  'farmer/bio-inputs': 'farmer-inputs',
  'farmer/bio-pesticides': 'farmer-inputs',
  'farmer/calendar': 'krishi-calendar',
  'farmer/implements': 'farm-implements',
  'farmer/kisan-aadhar': 'farmer-kisan-aadhar',
  'farmer/phule-micrograde': 'farmer-inputs',
  'farmer/planting-materials': 'nursery-stock',
  'farmer/publications': 'extension-publications',
  'farmer/scientist-forum': 'farmer-scientist-forum',
  'farmer/seeds': 'seeds-availability',
  'farmer/services': 'farmer-services',
  'farmer/success-stories': 'farmer-success-stories',
  'farmer/weather': 'agro-advisories',
  'guest-house': 'guest-house',
  'guest-house-booking': 'guest-house',
  'library/about': 'library-about',
  'library/activities': 'library-activities',
  'library/collections': 'library-collections',
  'library/contact': 'library-contact',
  'library/facilities': 'library-facilities',
  'library/links': 'library-links',
  'library/news-events': 'library-news-events',
  'library/off-campus': 'library-off-campus',
  'library/sections': 'library-sections',
  'library/services': 'library-services',
  'news': 'news',
  'news-archive': 'news',
  'news-and-advisories': 'news',
  'nursery-stock': 'nursery-stock',
  'officers/directory': 'officers-directory',
  'post-graduate-institute-rahuri': 'post-graduate-institute-rahuri',
  'recruitment': 'recruitment',
  'recruitment-archive': 'recruitment',
  'research/aicrp': 'research-icar-aicrp',
  'research/at-a-glance': 'research-at-a-glance',
  'research/central-plateau-zone': 'research-central-plateau-zone',
  'research/directorates': 'research-organizational-profile',
  'research/funded-projects': 'research-externally-funded-projects',
  'research/farm-implements': 'research-farm-implements',
  'research/implements': 'research-farm-implements',
  'research/organizational-profile': 'research-organizational-profile',
  'research/patents': 'research-patents',
  'research/plain-zone': 'research-plain-zone',
  'research/profile': 'research-organizational-profile',
  'research/recommendations': 'research-recommendations',
  'research/review-mechanism': 'research-review-mechanism',
  'research/scarcity-zone': 'research-scarcity-zone',
  'research/schemes': 'research-icar-aicrp',
  'research/state-schemes': 'research-non-plan-state-schemes',
  'research/stations': 'research-western-ghat-zone',
  'research/sub-montane-zone': 'research-sub-montane-zone',
  'research/technology': 'research-varieties',
  'research/thrust-areas': 'research-thrust-areas',
  'research/varieties': 'research-varieties',
  'research/western-ghat-zone': 'research-western-ghat-zone',
  'seeds-availability': 'seeds-availability',
  'students': 'students',
  'students/corner': 'students',
  'students/admission': 'student-admission-procedure',
  'students/circulars': 'student-circulars',
  'students/complaints': 'student-complaints',
  'students/grievance': 'transparency-and-grievance',
  'students/hostels': 'student-hostels',
  'students/international': 'student-international-cell',
  'students/pgi-form': 'student-pgi-form',
  'students/sports': 'student-sports',
  'tenders': 'tenders',
  'tenders-archive': 'tenders',
  'transparency': 'transparency-and-grievance',
  'transparency-rti': 'transparency-and-grievance',
  'transparency-and-grievance': 'transparency-and-grievance',
  'grievance-redressal': 'transparency-and-grievance',
  'home/grievanceredressalsystem': 'transparency-and-grievance',
  'officers/grivence': 'transparency-and-grievance',
  'university-engineer': 'university-engineer-works',
  'university-engineer-works': 'university-engineer-works',
  'vc-desk': 'vc-desk',
};

export function getPageData(slugInput: string | string[]): any | null {
  const fullPath = Array.isArray(slugInput) ? slugInput.join('/') : String(slugInput);
  const cleanPath = fullPath.replace(/^\/+|\/+$/g, '');

  if (!cleanPath) return null;

  // 1. Check direct aliases
  let targetSlug = ROUTE_ALIASES[cleanPath];

  // 2. Try hyphenated path
  if (!targetSlug) {
    targetSlug = cleanPath.replace(/\//g, '-').toLowerCase();
  }

  let pagesDir = path.join(process.cwd(), 'src/data/scraped/pages');
  if (!fs.existsSync(pagesDir)) {
    pagesDir = path.join(process.cwd(), 'web/src/data/scraped/pages');
  }

  // Check if targetSlug.json exists
  let filePath = path.join(pagesDir, `${targetSlug}.json`);
  if (!fs.existsSync(filePath)) {
    // Try last segment of the path
    const lastSeg = cleanPath.split('/').pop()?.toLowerCase();
    if (lastSeg) {
      const altPath = path.join(pagesDir, `${lastSeg}.json`);
      if (fs.existsSync(altPath)) {
        filePath = altPath;
        targetSlug = lastSeg;
      }
    }
  }

  // 3. If file exists, read and return
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error(`Error reading page file: ${filePath}`, err);
    }
  }

  // 4. Fallback to legacy pages if present
  const legacyPages = legacyPagesRaw as Record<string, any>;
  if (legacyPages[targetSlug]) {
    return legacyPages[targetSlug];
  }
  const lastKey = cleanPath.split('/').pop();
  if (lastKey && legacyPages[lastKey]) {
    return legacyPages[lastKey];
  }

  // 5. Fallback synthesize from menu if title exists
  const findInMenu = (items: any[]): any => {
    for (const item of items) {
      if (item.href === `/${cleanPath}` || item.href === cleanPath) {
        return item.title;
      }
      if (item.children) {
        const res = findInMenu(item.children);
        if (res) return res;
      }
    }
    return null;
  };

  const navItemTitle = findInMenu(menuDataRaw as any[]);
  if (navItemTitle) {
    return {
      slug: targetSlug,
      title: navItemTitle,
      hero: {
        title: navItemTitle,
        subtitle: {
          en: 'Mahatma Phule Krishi Vidyapeeth, Rahuri, Dist. Ahilyanagar',
          mr: 'महात्मा फुले कृषि विद्यापीठ, राहुरी, जि. अहिल्यानगर'
        },
        badge: {
          en: 'MPKV Rahuri',
          mr: 'मफुकृवि राहुरी'
        }
      },
      content: {
        p1: {
          en: 'This section pertains to the central university headquarters at Rahuri, Post Graduate Institute (PGI) Rahuri, Dr. A.S. College of Agricultural Engineering and Technology Rahuri, and central university schemes. All academic, research, and extension activities are administered from the central Rahuri campus under ICAR guidelines.',
          mr: 'हा विभाग महात्मा फुले कृषि विद्यापीठाचे मध्यवर्ती मुख्यालय राहुरी, पदव्युत्तर महाविद्यालय (PGI) राहुरी, डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय राहुरी आणि विद्यापीठ प्रक्षेत्राशी संबंधित आहे. येथील सर्व शैक्षणिक, संशोधन व विस्तार उपक्रम भा.कृ.अनु.प. (ICAR) च्या मानकांनुसार राहुरी मध्यवर्ती संकुलातून संचलित केले जातात.'
        }
      }
    };
  }

  return null;
}
