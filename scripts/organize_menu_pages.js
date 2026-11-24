const fs = require('fs');
const path = require('path');

// Load menu navigation tree
const menuPath = path.join(__dirname, '../web/src/data/scraped/navigation_menu.json');
const menuData = JSON.parse(fs.readFileSync(menuPath, 'utf8'));

// Load aliases from pageLoader.ts
const pageLoaderPath = path.join(__dirname, '../web/src/lib/pageLoader.ts');
const pageLoaderCode = fs.readFileSync(pageLoaderPath, 'utf8');
const aliasMatch = pageLoaderCode.match(/const ROUTE_ALIASES: Record<string, string> = {([\s\S]*?)};/);
const aliases = {};
if (aliasMatch) {
  aliasMatch[1].split('\n').forEach(line => {
    const m = line.match(/'([^']+)':\s*'([^']+)'/);
    if (m) aliases[m[1]] = m[2];
  });
}

// Extra mappings for university administration & special pages
const EXTRA_PAGE_MAPPINGS = {
  'about-mahatma-phule': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'About University', mr: 'विद्यापीठ परिचय' },
    cleanTitle: { en: 'About Mahatma Jyotirao Phule', mr: 'क्रांतीसूर्य महात्मा जोतीराव फुले परिचय' },
    route: '/Home/aboutphule'
  },
  'mpkv-at-a-glance': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'About University', mr: 'विद्यापीठ परिचय' },
    cleanTitle: { en: 'MPKV at a Glance', mr: 'दृष्टीक्षेपात म.फु.कृ.वि.' },
    route: '/mpkv-at-a-glance'
  },
  'home': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: null,
    cleanTitle: { en: 'Official University Portal', mr: 'विद्यापीठ अधिकृत पोर्टल' },
    route: '/'
  },
  'colleges-campus': {
    menuId: 'menu_education',
    menuTitle: { en: 'Education', mr: 'शिक्षण' },
    groupTitle: { en: 'Colleges', mr: 'महाविद्यालये' },
    cleanTitle: { en: 'Colleges & Campuses', mr: 'महाविद्यालये व संकुले' },
    route: '/colleges-campus'
  },
  'dr-as-caet-rahuri': {
    menuId: 'menu_education',
    menuTitle: { en: 'Education', mr: 'शिक्षण' },
    groupTitle: { en: 'Colleges', mr: 'महाविद्यालये' },
    cleanTitle: { en: 'Dr. A.S. College of Agricultural Engineering & Technology', mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय' },
    route: '/dr-as-caet-rahuri'
  },
  'post-graduate-institute-rahuri': {
    menuId: 'menu_education',
    menuTitle: { en: 'Education', mr: 'शिक्षण' },
    groupTitle: { en: 'Colleges', mr: 'महाविद्यालये' },
    cleanTitle: { en: 'Post Graduate Institute (PGI), Rahuri', mr: 'पदव्युत्तर संस्था (PGI), राहुरी' },
    route: '/post-graduate-institute-rahuri'
  },
  'faculty-directory': {
    menuId: 'menu_education',
    menuTitle: { en: 'Education', mr: 'शिक्षण' },
    groupTitle: { en: 'Faculty Branches', mr: 'विद्याशाखा' },
    cleanTitle: { en: 'Faculty Directory', mr: 'प्राध्यापक निर्देशिका' },
    route: '/faculty-directory'
  },
  'iqac': {
    menuId: 'menu_education',
    menuTitle: { en: 'Education', mr: 'शिक्षण' },
    groupTitle: { en: 'Academic Quality', mr: 'शैक्षणिक गुणवत्ता' },
    cleanTitle: { en: 'Internal Quality Assurance Cell (IQAC)', mr: 'अंतर्गत गुणवत्ता हमी कक्ष (IQAC)' },
    route: '/iqac'
  },
  'nodal-cell': {
    menuId: 'menu_education',
    menuTitle: { en: 'Education', mr: 'शिक्षण' },
    groupTitle: { en: 'ICAR Affairs', mr: 'भा.कृ.अनु.प. समन्वय' },
    cleanTitle: { en: 'ICAR Nodal Cell', mr: 'भा.कृ.अनु.प. नोडल सेल' },
    route: '/nodal-cell'
  },
  'research-farm-implements': {
    menuId: 'menu_research',
    menuTitle: { en: 'Research', mr: 'संशोधन' },
    groupTitle: { en: 'Technology & Releases', mr: 'प्रगत तंत्रज्ञान व वाण' },
    cleanTitle: { en: 'Farm Implements & Machinery', mr: 'शेती अवजारे व यंत्रे' },
    route: '/farm-implements'
  },
  'events-joint-agresco': {
    menuId: 'menu_research',
    menuTitle: { en: 'Research', mr: 'संशोधन' },
    groupTitle: { en: 'Research Review Mechanism', mr: 'संशोधन पुनरावलोकन' },
    cleanTitle: { en: 'Joint Agresco Research Meet', mr: 'संयुक्त अग्रेस्को संशोधन बैठक' },
    route: '/events-joint-agresco'
  },
  'pme-cell': {
    menuId: 'menu_research',
    menuTitle: { en: 'Research', mr: 'संशोधन' },
    groupTitle: { en: 'Overview & Schemes', mr: 'संशोधन आढावा व योजना' },
    cleanTitle: { en: 'Priority Setting, Monitoring & Evaluation (PME) Cell', mr: 'प्राधान्यक्रम निर्धारण, सनियंत्रण व मूल्यमापन कक्ष (PME)' },
    route: '/pme-cell'
  },
  'extension-atic': {
    menuId: 'menu_extension',
    menuTitle: { en: 'Extension', mr: 'विस्तार' },
    groupTitle: { en: 'Extension Overview & Centers', mr: 'विस्तार आढावा व केंद्रे' },
    cleanTitle: { en: 'Agricultural Technology Information Centre (ATIC)', mr: 'कृषि तंत्रज्ञान माहिती केंद्र (ATIC)' },
    route: '/atic-rahuri'
  },
  'audio-center': {
    menuId: 'menu_extension',
    menuTitle: { en: 'Extension', mr: 'विस्तार' },
    groupTitle: { en: 'Extension Overview & Centers', mr: 'विस्तार आढावा व केंद्रे' },
    cleanTitle: { en: 'Audio Visual Center & Krishi Radio 90.8 FM', mr: 'श्राव्य-दृश्य केंद्र व कृषि वाहिनी ९०.८ एफएम' },
    route: '/audio-center'
  },
  'central-library-rahuri': {
    menuId: 'menu_library',
    menuTitle: { en: 'Library', mr: 'ग्रंथालय' },
    groupTitle: { en: 'About & Collections', mr: 'ग्रंथालय माहिती व संग्रह' },
    cleanTitle: { en: 'Central Library, Rahuri', mr: 'मध्यवर्ती ग्रंथालय, राहुरी' },
    route: '/central-library-rahuri'
  },
  'vc-desk': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Leadership', mr: 'कुलगुरू कार्यालय' },
    cleanTitle: { en: "Vice Chancellor's Desk", mr: 'मा. कुलगुरू कार्यालय' },
    route: '/vc-desk'
  },
  'administration-profile': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Administration', mr: 'प्रशासन' },
    cleanTitle: { en: 'Administrative Structure & Profile', mr: 'प्रशासकीय संरचना व माहिती' },
    route: '/administration'
  },
  'executive-council': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Governance', mr: 'शासन व मंडळ' },
    cleanTitle: { en: 'Executive Council', mr: 'कार्यकारी परिषद' },
    route: '/executive-council'
  },
  'committees': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Governance', mr: 'शासन व मंडळ' },
    cleanTitle: { en: 'Statutory University Committees', mr: 'वैधानिक समित्या' },
    route: '/committees'
  },
  'act-and-statute': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Governance', mr: 'शासन व मंडळ' },
    cleanTitle: { en: 'Maharashtra Agricultural Universities Act & Statutes', mr: 'महाराष्ट्र कृषि विद्यापीठे कायदा व परिनियम' },
    route: '/act-and-statute'
  },
  'finance': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Comptroller', mr: 'वित्त व लेखा' },
    cleanTitle: { en: 'Finance & Accounts Division', mr: 'वित्त व लेखा विभाग' },
    route: '/finance'
  },
  'university-engineer-works': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Works & Infrastructure', mr: 'विद्यापीठ अभियंता कार्यालय' },
    cleanTitle: { en: 'University Engineer & Works Division', mr: 'विद्यापीठ अभियंता व बांधकाम विभाग' },
    route: '/university-engineer-works'
  },
  'recruitment': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Careers & Recruitment', mr: 'भरती व जाहिराती' },
    cleanTitle: { en: 'Recruitment & Job Vacancies', mr: 'नोकरभरती व जाहिराती' },
    route: '/recruitment'
  },
  'circulars': {
    menuId: 'menu_students',
    menuTitle: { en: 'Students', mr: 'विद्यार्थी' },
    groupTitle: { en: 'Notices & Circulars', mr: 'परिपत्रके व सूचना' },
    cleanTitle: { en: 'Official University Circulars', mr: 'विद्यापीठ अधिकृत परिपत्रके' },
    route: '/circulars'
  },
  'tenders': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Procurement', mr: 'निविदा व लिलाव' },
    cleanTitle: { en: 'Tenders & e-Procurement', mr: 'ई-निविदा व खरेदी' },
    route: '/tenders'
  },
  'grievance-redressal': {
    menuId: 'menu_farmer',
    menuTitle: { en: 'Farmer Services', mr: 'शेतकरी सेवा' },
    groupTitle: { en: 'Public Services', mr: 'लोकसेवा हक्क व तक्रार निवारण' },
    cleanTitle: { en: 'Grievance Redressal Portal', mr: 'तक्रार निवारण कक्ष' },
    route: '/transparency-and-grievance'
  },
  'akmu-introduction': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'University Facilities', mr: 'विद्यापीठ सुविधा' },
    cleanTitle: { en: 'Agriculture Knowledge Management Unit (AKMU)', mr: 'कृषि ज्ञान व्यवस्थापन केंद्र (AKMU)' },
    route: '/akmu-introduction'
  },
  'akmu-rahuri': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'University Facilities', mr: 'विद्यापीठ सुविधा' },
    cleanTitle: { en: 'AKMU Cyber Operations Rahuri', mr: 'एकेएमयू सायबर संकुल राहुरी' },
    route: '/akmu-rahuri'
  },
  'akmu-training': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'University Facilities', mr: 'विद्यापीठ सुविधा' },
    cleanTitle: { en: 'AKMU Training Programs', mr: 'एकेएमयू प्रशिक्षण उपक्रम' },
    route: '/akmu-training'
  },
  'agricultural-universities': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'About University', mr: 'विद्यापीठ परिचय' },
    cleanTitle: { en: 'Agricultural Universities in Maharashtra', mr: 'महाराष्ट्रातील चारही कृषि विद्यापीठे' },
    route: '/agricultural-universities'
  },
  'employee-corner': {
    menuId: 'menu_officers',
    menuTitle: { en: 'Officers', mr: 'अधिकारी' },
    groupTitle: { en: 'Staff Services', mr: 'कर्मचारी कक्ष' },
    cleanTitle: { en: 'Employee Corner & Pension Desk', mr: 'कर्मचारी कक्ष व सेवानिवृत्ती मंच' },
    route: '/employee-corner'
  },
  'events-convocation': {
    menuId: 'menu_education',
    menuTitle: { en: 'Education', mr: 'शिक्षण' },
    groupTitle: { en: 'Academic Events', mr: 'शैक्षणिक सोहळे' },
    cleanTitle: { en: 'Annual Convocation Ceremony', mr: 'वार्षिक पदवीदान समारंभ' },
    route: '/events-convocation'
  },
  'events-vanmohotsav': {
    menuId: 'menu_extension',
    menuTitle: { en: 'Extension', mr: 'विस्तार' },
    groupTitle: { en: 'Community Events', mr: 'पर्यावरण व सामाजिक उपक्रम' },
    cleanTitle: { en: 'Vanmohotsav & Tree Plantation', mr: 'वनमहोत्सव व वृक्षारोपण मोहीम' },
    route: '/events-vanmohotsav'
  },
  'photo-gallery': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'Media', mr: 'माध्यम' },
    cleanTitle: { en: 'Photo & Media Gallery', mr: 'छायाचित्रे व माध्यम दालन' },
    route: '/photo-gallery'
  },
  'portal-login': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'University Portals', mr: 'विद्यापीठ पोर्टल्स' },
    cleanTitle: { en: 'Employee & Student Portal Login', mr: 'कर्मचारी व विद्यार्थी पोर्टल प्रवेश' },
    route: '/portal-login'
  },
  'privacy-policy': {
    menuId: 'menu_home',
    menuTitle: { en: 'Home', mr: 'मुख्यपृष्ठ' },
    groupTitle: { en: 'Policies', mr: 'धोरणे' },
    cleanTitle: { en: 'Website Policies & Terms', mr: 'वेबसाइट वापर नियमावली व धोरण' },
    route: '/privacy-policy'
  }
};

// Helper to strip redundant university suffix from titles
function cleanStringTitle(str) {
  if (!str || typeof str !== 'string') return str;
  return str
    .replace(/\s*-\s*Mahatma Phule Krishi Vidyapeeth.*$/i, '')
    .replace(/\s*-\s*MPKV.*$/i, '')
    .trim();
}

function cleanBilingualTitle(titleObj) {
  if (!titleObj) return { en: 'MPKV Rahuri', mr: 'मफुकृवि राहुरी' };
  if (typeof titleObj === 'string') {
    const c = cleanStringTitle(titleObj);
    return { en: c, mr: c };
  }
  return {
    en: cleanStringTitle(titleObj.en || titleObj.mr || ''),
    mr: cleanStringTitle(titleObj.mr || titleObj.en || '')
  };
}

// Function to find hierarchy for any page slug
function getPageHierarchy(slug, existingPageData) {
  const cleanSlug = slug.toLowerCase();

  // 1. Direct menu matching
  for (const top of menuData) {
    if (top.children) {
      for (const grp of top.children) {
        const leaves = grp.children || [grp];
        for (const leaf of leaves) {
          if (leaf.href && leaf.href !== '#') {
            const lHref = leaf.href.replace(/^\/+|\/+$/g, '').toLowerCase();
            const leafSlug = aliases[lHref] || lHref.replace(/\//g, '-');
            if (cleanSlug === leafSlug || cleanSlug === lHref || lHref.endsWith(cleanSlug)) {
              return {
                menuId: top.id,
                menuTitle: top.title,
                groupTitle: grp.is_group ? grp.title : null,
                leafTitle: leaf.title,
                route: leaf.href
              };
            }
          }
        }
      }
    } else if (top.href && top.href !== '#') {
      const tHref = top.href.replace(/^\/+|\/+$/g, '').toLowerCase();
      const topSlug = aliases[tHref] || tHref.replace(/\//g, '-');
      if (cleanSlug === topSlug || cleanSlug === tHref) {
        return {
          menuId: top.id,
          menuTitle: top.title,
          groupTitle: null,
          leafTitle: top.title,
          route: top.href
        };
      }
    }
  }

  // 2. Extra page mapping lookup
  if (EXTRA_PAGE_MAPPINGS[cleanSlug]) {
    const ext = EXTRA_PAGE_MAPPINGS[cleanSlug];
    return {
      menuId: ext.menuId,
      menuTitle: ext.menuTitle,
      groupTitle: ext.groupTitle,
      leafTitle: ext.cleanTitle,
      route: ext.route
    };
  }

  // 3. Fallback based on slug prefix
  let defaultMenu = { id: 'menu_home', title: { en: 'Home', mr: 'मुख्यपृष्ठ' } };
  let defaultGroup = { en: 'University', mr: 'विद्यापीठ' };

  if (cleanSlug.startsWith('education') || cleanSlug.includes('college')) {
    defaultMenu = { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } };
    defaultGroup = { en: 'Colleges & Curriculum', mr: 'महाविद्यालये व अभ्यासक्रम' };
  } else if (cleanSlug.startsWith('research')) {
    defaultMenu = { id: 'menu_research', title: { en: 'Research', mr: 'संशोधन' } };
    defaultGroup = { en: 'Research Stations & Technology', mr: 'संशोधन केंद्रे व तंत्रज्ञान' };
  } else if (cleanSlug.startsWith('extension')) {
    defaultMenu = { id: 'menu_extension', title: { en: 'Extension', mr: 'विस्तार' } };
    defaultGroup = { en: 'Extension Activities', mr: 'विस्तार उपक्रम' };
  } else if (cleanSlug.startsWith('library')) {
    defaultMenu = { id: 'menu_library', title: { en: 'Library', mr: 'ग्रंथालय' } };
    defaultGroup = { en: 'Library Services', mr: 'ग्रंथालय सेवा' };
  } else if (cleanSlug.startsWith('student')) {
    defaultMenu = { id: 'menu_students', title: { en: 'Students', mr: 'विद्यार्थी' } };
    defaultGroup = { en: 'Student Affairs', mr: 'विद्यार्थी कल्याण' };
  } else if (cleanSlug.startsWith('farmer') || cleanSlug.includes('seed')) {
    defaultMenu = { id: 'menu_farmer', title: { en: 'Farmer Services', mr: 'शेतकरी सेवा' } };
    defaultGroup = { en: 'Agricultural Services', mr: 'कृषि सेवा' };
  } else if (cleanSlug.startsWith('officer')) {
    defaultMenu = { id: 'menu_officers', title: { en: 'Officers', mr: 'अधिकारी' } };
    defaultGroup = { en: 'Administration', mr: 'प्रशासन' };
  }

  return {
    menuId: defaultMenu.id,
    menuTitle: defaultMenu.title,
    groupTitle: defaultGroup,
    leafTitle: cleanBilingualTitle(existingPageData?.title || cleanSlug),
    route: `/${slug}`
  };
}

// Target directories to process
const targetDirs = [
  path.join(__dirname, '../web/src/data/scraped'),
  path.join(__dirname, '../src/data/scraped')
];

targetDirs.forEach(baseDir => {
  if (!fs.existsSync(baseDir)) return;
  const pagesDir = path.join(baseDir, 'pages');
  if (!fs.existsSync(pagesDir)) return;

  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'));
  console.log(`Processing ${files.length} pages in ${pagesDir}...`);

  const updatedPagesMap = {};

  files.forEach(file => {
    const filePath = path.join(pagesDir, file);
    const slug = file.replace('.json', '');
    const pageData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const hierarchy = getPageHierarchy(slug, pageData);

    // Build the clean, accurate breadcrumb hierarchy:
    // 1. Home
    // 2. Main Menu
    // 3. Submenu Group (if exists)
    // 4. Selected Submenu Page
    const breadcrumb = [
      {
        title: { en: 'Home', mr: 'मुख्यपृष्ठ' },
        href: '/'
      },
      {
        title: hierarchy.menuTitle,
        href: hierarchy.route.startsWith('/education') ? '/education/at-a-glance' :
              hierarchy.route.startsWith('/research') ? '/research/at-a-glance' :
              hierarchy.route.startsWith('/extension') ? '/extension/at-a-glance' :
              hierarchy.route.startsWith('/library') ? '/library/about' :
              hierarchy.route.startsWith('/students') ? '/students/admission' :
              hierarchy.route.startsWith('/farmer') || hierarchy.route.includes('seed') ? '/seeds-availability' :
              hierarchy.route.startsWith('/officers') ? '/officers/directory' :
              hierarchy.route
      }
    ];

    if (hierarchy.groupTitle) {
      breadcrumb.push({
        title: hierarchy.groupTitle,
        href: hierarchy.route
      });
    }

    const cleanTitle = cleanBilingualTitle(hierarchy.leafTitle || pageData.title);
    breadcrumb.push({
      title: cleanTitle,
      href: hierarchy.route
    });

    // Clean page object
    pageData.title = cleanTitle;
    pageData.breadcrumb = breadcrumb;
    pageData.menuId = hierarchy.menuId;
    pageData.parentMenu = {
      id: hierarchy.menuId,
      title: hierarchy.menuTitle
    };
    if (hierarchy.groupTitle) {
      pageData.submenuGroup = hierarchy.groupTitle;
    }
    if (pageData.hero) {
      pageData.hero.title = cleanBilingualTitle(pageData.hero.title || cleanTitle);
    }

    // Save updated page
    fs.writeFileSync(filePath, JSON.stringify(pageData, null, 2), 'utf8');
    updatedPagesMap[slug] = pageData;
  });

  // Update by-page.json
  const byPagePath = path.join(baseDir, 'by-page.json');
  if (fs.existsSync(byPagePath)) {
    fs.writeFileSync(byPagePath, JSON.stringify(updatedPagesMap, null, 2), 'utf8');
    console.log(`Updated ${byPagePath}`);
  }

  // Generate sorted menu_page_tree.json
  const treePath = path.join(baseDir, 'menu_page_tree.json');
  const menuTree = menuData.map((top, idx) => {
    const topItem = {
      id: top.id,
      order: idx + 1,
      title: top.title,
      href: top.href,
      icon: top.icon,
      groups: []
    };

    if (top.children && top.children.length > 0) {
      top.children.forEach((grp, gIdx) => {
        const leaves = grp.children || [grp];
        const groupObj = {
          id: grp.id || `${top.id}_grp_${gIdx}`,
          title: grp.title,
          is_group: !!grp.is_group,
          pages: leaves.map(leaf => {
            const cleanHref = leaf.href.replace(/^\/+|\/+$/g, '').toLowerCase();
            const leafSlug = aliases[cleanHref] || cleanHref.replace(/\//g, '-');
            return {
              title: leaf.title,
              href: leaf.href,
              slug: leafSlug,
              is_external: !!leaf.is_external
            };
          })
        };
        topItem.groups.push(groupObj);
      });
    }

    return topItem;
  });

  fs.writeFileSync(treePath, JSON.stringify(menuTree, null, 2), 'utf8');
  console.log(`Generated ${treePath}`);

  // Update page-manifest.json
  const manifestPath = path.join(baseDir, 'page-manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const sortedPages = Object.keys(updatedPagesMap).map(slug => {
      const p = updatedPagesMap[slug];
      return {
        slug,
        menuId: p.menuId,
        parentMenu: p.parentMenu?.title?.en,
        submenuGroup: p.submenuGroup?.en,
        title: p.title,
        route: p.route || `/${slug}`,
        breadcrumb: p.breadcrumb,
        tableCount: (p.tables || []).length,
        noticeCount: (p.notices || []).length,
        mediaCount: (p.mediaAssets || []).length
      };
    });

    manifest.totalPages = sortedPages.length;
    manifest.pages = sortedPages;
    manifest.updatedAt = new Date().toISOString();
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log(`Updated ${manifestPath}`);
  }
});

console.log('Successfully organized menu tree and all pages!');
