import fs from 'fs';
import path from 'path';
import menuDataRaw from '@/data/scraped/navigation_menu.json';
import legacyPagesRaw from '@/data/scraped/rahuri_pages.json';

const ROUTE_ALIASES: Record<string, string> = {
  'Home/ActStatute': 'act-and-statute',
  'Home/IndexNew': 'home',
  'ActStatute': 'act-and-statute',
  'act-statute': 'act-and-statute',
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
          en: 'Central Campus, Mahatma Phule Krishi Vidyapeeth, Rahuri, Dist. Ahilyanagar',
          mr: 'मध्यवर्ती परिसर, महात्मा फुले कृषि विद्यापीठ, राहुरी, जि. अहिल्यानगर'
        },
        badge: {
          en: 'Rahuri Central Campus',
          mr: 'राहुरी मध्यवर्ती परिसर'
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
