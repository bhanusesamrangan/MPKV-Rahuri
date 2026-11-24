import fs from 'fs';
import path from 'path';
import menuDataRaw from '@/data/scraped/navigation_menu.json';
import legacyPagesRaw from '@/data/scraped/rahuri_pages.json';

const ROUTE_ALIASES: Record<string, string> = {
  'ActStatute': 'act-and-statute',
  'Adminstration/AdminsProfile': 'administration-profile',
  'Adminstration/AdminsRecruitment': 'recruitment',
  'Akmu/Tender': 'tenders',
  'AllCircular/Circular': 'circulars',
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
  'Farmer/FarmerKisanAdhar': 'farmer-kisan-aadhar',
  'Farmer/FarmerSciForum': 'farmer-scientist-forum',
  'Home/ActStatute': 'act-and-statute',
  'Home/IndexNew': 'home',
  'Home/aboutphule': 'about-mahatma-phule',
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
  'Officers/OfficersContacts': 'officers-directory',
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
  'about-mahatma-phule': 'about-mahatma-phule',
  'act-and-statute': 'act-and-statute',
  'act-statute': 'act-and-statute',
  'administration': 'administration-profile',
  'atic-rahuri': 'atic-rahuri',
  'central-library-rahuri': 'central-library-rahuri',
  'circulars': 'circulars',
  'communication-centre': 'extension-communication-center',
  'contact-us': 'contacts-directory',
  'contacts': 'contacts-directory',
  'dr-as-caet-rahuri': 'dr-as-caet-rahuri',
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
  'farm-implements': 'farm-implements',
  'farmer/advisories': 'agro-advisories',
  'farmer/bio-inputs': 'farmer-inputs',
  'farmer/calendar': 'krishi-calendar',
  'farmer/kisan-aadhar': 'farmer-kisan-aadhar',
  'farmer/scientist-forum': 'farmer-scientist-forum',
  'farmer/weather': 'agro-advisories',
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
  'nursery-stock': 'nursery-stock',
  'officers/directory': 'officers-directory',
  'post-graduate-institute-rahuri': 'post-graduate-institute-rahuri',
  'recruitment': 'recruitment',
  'research/aicrp': 'research-icar-aicrp',
  'research/at-a-glance': 'research-at-a-glance',
  'research/central-plateau-zone': 'research-central-plateau-zone',
  'research/funded-projects': 'research-externally-funded-projects',
  'research/implements': 'research-farm-implements',
  'research/patents': 'research-patents',
  'research/plain-zone': 'research-plain-zone',
  'research/profile': 'research-organizational-profile',
  'research/recommendations': 'research-recommendations',
  'research/review-mechanism': 'research-review-mechanism',
  'research/scarcity-zone': 'research-scarcity-zone',
  'research/state-schemes': 'research-non-plan-state-schemes',
  'research/sub-montane-zone': 'research-sub-montane-zone',
  'research/thrust-areas': 'research-thrust-areas',
  'research/varieties': 'research-varieties',
  'research/western-ghat-zone': 'research-western-ghat-zone',
  'seeds-availability': 'seeds-availability',
  'students/admission': 'student-admission-procedure',
  'students/circulars': 'student-circulars',
  'students/complaints': 'student-complaints',
  'students/grievance': 'transparency-and-grievance',
  'students/hostels': 'student-hostels',
  'students/international': 'student-international-cell',
  'students/pgi-form': 'student-pgi-form',
  'students/sports': 'student-sports',
  'tenders': 'tenders',
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
