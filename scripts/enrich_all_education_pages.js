const fs = require('fs');
const path = require('path');

const webPagesDir = path.join(__dirname, '../web/src/data/scraped/pages');
const srcPagesDir = path.join(__dirname, '../src/data/scraped/pages');

// 5. Data for Constituent Colleges
const constituentCollegesData = {
  slug: 'education-constituent-colleges',
  url: 'https://mpkv.ac.in/Education/EduConstituenClg',
  route: '/education/constituent-colleges',
  sourcePage: 'Education/EduConstituenClg',
  scrapedAt: new Date().toISOString(),
  title: {
    en: 'Constituent Colleges',
    mr: 'घटक महाविद्यालये'
  },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Colleges', mr: 'महाविद्यालये' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Colleges', mr: 'महाविद्यालये' }, href: '/education/constituent-colleges' },
    { title: { en: 'Constituent Colleges', mr: 'घटक महाविद्यालये' }, href: '/education/constituent-colleges' }
  ],
  hero: {
    title: {
      en: 'Constituent Colleges of MPKV',
      mr: 'महात्मा फुले कृषि विद्यापीठाची घटक महाविद्यालये'
    },
    subtitle: {
      en: '14 premier government agricultural and engineering colleges across 10 districts of Western Maharashtra delivering ICAR-accredited education.',
      mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांमध्ये विस्तारलेली १४ नामांकित शासकीय घटक महाविद्यालये — आयसीएआर अधिस्वीकृती व आधुनिक शैक्षणिक सुविधांसह.'
    },
    badge: {
      en: '14 Constituent Colleges | 6 Professional Disciplines',
      mr: '१४ घटक महाविद्यालये | ६ व्यावसायिक विद्याशाखा'
    }
  },
  colleges: [
    {
      id: 'co-agri-pune',
      name: { en: 'College of Agriculture, Pune', mr: 'कृषि महाविद्यालय, पुणे' },
      established: 1907,
      district: { en: 'Pune', mr: 'पुणे' },
      discipline: 'Agriculture',
      disciplineLabel: { en: 'Agriculture', mr: 'कृषि' },
      image: '/media/images/Administration_Building_only_20200102043951.jpg',
      intake: 190,
      pgIntake: '60 (M.Sc.) + 6 (Hort.) + 30 (MBA) + 2 (Ph.D.)',
      website: 'http://acpune.co.in/',
      description: {
        en: 'One of the oldest premier agricultural colleges in India, established in 1907. Sprawling heritage campus featuring high-tech floriculture and biotechnology infrastructure.',
        mr: 'भारतातील सर्वात जुन्या अग्रगण्य कृषि महाविद्यालयांपैकी एक (स्थापना १९०७). ऐतिहासिक वारसा संकुल, हाय-टेक पुष्पशेती आणि अत्याधुनिक प्रयोगशाळा.'
      },
      degrees: ['B.Sc. (Hons) Agriculture', 'M.Sc. (Agri)', 'M.Sc. (Hort)', 'M.B.A. (Agri)', 'Ph.D. (Agril. Meteorology)']
    },
    {
      id: 'co-agri-dhule',
      name: { en: 'College of Agriculture, Dhule', mr: 'कृषि महाविद्यालय, धुळे' },
      established: 1960,
      district: { en: 'Dhule', mr: 'धुळे' },
      discipline: 'Agriculture',
      disciplineLabel: { en: 'Agriculture', mr: 'कृषि' },
      image: '/media/images/3d_metric_stations.jpg',
      intake: 128,
      pgIntake: '24 (M.Sc.) + 4 (Hort.)',
      website: 'http://www.acdhule.edu.in/',
      description: {
        en: 'Premier agriculture campus catering to Khandesh region with extensive dryland and pulses research farm.',
        mr: 'खान्देश विभागातील प्रमुख कृषि शिक्षण केंद्र, कोरडवाहू शेती व कडधान्य संशोधन प्रक्षेत्रासह समृद्ध.'
      },
      degrees: ['B.Sc. (Hons) Agriculture', 'M.Sc. (Agri)', 'M.Sc. (Hort)']
    },
    {
      id: 'co-agri-kolhapur',
      name: { en: 'Rajarshee Chhatrapati Shahu Maharaj College of Agriculture, Kolhapur', mr: 'राजर्षी छत्रपती शाहू महाराज कृषि महाविद्यालय, कोल्हापूर' },
      established: 1963,
      district: { en: 'Kolhapur', mr: 'कोल्हापूर' },
      discipline: 'Agriculture',
      disciplineLabel: { en: 'Agriculture', mr: 'कृषि' },
      image: '/media/images/3d_metric_legacy.jpg',
      intake: 190,
      pgIntake: '48 (M.Sc.) + 6 (Hort.)',
      website: 'http://www.ackolhapur.edu.in/',
      description: {
        en: 'Named after the visionary Rajarshee Chhatrapati Shahu Maharaj, located in Kasaba Bawada with excellence in sugarcane and subtropical horticulture.',
        mr: 'लोकराजे राजर्षी छत्रपती शाहू महाराजांच्या नावाने स्थापन, ऊस शेती व उपोष्णकटिबंधीय फलोत्पादनात अग्रेसर.'
      },
      degrees: ['B.Sc. (Hons) Agriculture', 'M.Sc. (Agri)', 'M.Sc. (Hort)']
    },
    {
      id: 'co-agri-nandurbar',
      name: { en: 'College of Agriculture, Nandurbar', mr: 'कृषि महाविद्यालय, नंदुरबार' },
      established: 2013,
      district: { en: 'Nandurbar', mr: 'नंदुरबार' },
      discipline: 'Agriculture',
      disciplineLabel: { en: 'Agriculture', mr: 'कृषि' },
      image: '/media/images/3d_metric_students.jpg',
      intake: 60,
      pgIntake: '-',
      website: 'http://www.acnandurbar.edu.in',
      description: {
        en: 'Empowering tribal youth of Northern Maharashtra with modern agricultural technologies and livelihood farming.',
        mr: 'उत्तर महाराष्ट्रातील आदिवासी भागातील विद्यार्थ्यांना आधुनिक शेती तंत्रज्ञानाचे दर्जेदार शिक्षण देणारे केंद्र.'
      },
      degrees: ['B.Sc. (Hons) Agriculture']
    },
    {
      id: 'co-agri-karad',
      name: { en: 'Yashwantrao Chavan College of Agriculture, Karad', mr: 'यशवंतराव चव्हाण कृषि महाविद्यालय, कराड' },
      established: 2013,
      district: { en: 'Satara', mr: 'सातारा' },
      discipline: 'Agriculture',
      disciplineLabel: { en: 'Agriculture', mr: 'कृषि' },
      image: '/media/images/3d_metric_projects.jpg',
      intake: 60,
      pgIntake: '-',
      website: '',
      description: {
        en: 'Established in the sugar-belt region of Satara, focusing on cash crops, agro-forestry, and dairy farming.',
        mr: 'सातारा जिल्ह्यातील ऊस पट्ट्यात स्थित, नगदी पिके व दुग्ध व्यवसाय शिक्षणावर विशेष भर.'
      },
      degrees: ['B.Sc. (Hons) Agriculture']
    },
    {
      id: 'co-agri-muktainagar',
      name: { en: 'College of Agriculture, Muktainagar', mr: 'कृषि महाविद्यालय, मुक्ताईनगर' },
      established: 2013,
      district: { en: 'Jalgaon', mr: 'जळगाव' },
      discipline: 'Agriculture',
      disciplineLabel: { en: 'Agriculture', mr: 'कृषि' },
      image: '/media/images/3d_metric_stations.jpg',
      intake: 60,
      pgIntake: '-',
      website: '',
      description: {
        en: 'Located in Jalgaon district with specialized instructional farms for banana, cotton, and oilseed cultivation.',
        mr: 'जळगाव जिल्ह्यातील मुक्ताईनगर येथे केळी, कापूस व गळीतधान्य पिकांवर केंद्रित आधुनिक प्रक्षेत्र.'
      },
      degrees: ['B.Sc. (Hons) Agriculture']
    },
    {
      id: 'co-agri-halgaon',
      name: { en: 'Punyashlok Ahilyadevi Holkar College of Agriculture, Halgaon', mr: 'पुण्यश्लोक अहिल्यादेवी होळकर कृषि महाविद्यालय, हळगाव' },
      established: 2018,
      district: { en: 'Ahilyanagar', mr: 'अहिल्यानगर' },
      discipline: 'Agriculture',
      disciplineLabel: { en: 'Agriculture', mr: 'कृषि' },
      image: '/media/images/3d_metric_students.jpg',
      intake: 60,
      pgIntake: '-',
      website: 'https://www.achalgaon.in/',
      description: {
        en: 'Modern campus in Jamkhed taluka dedicated to dryland farming technologies, water harvesting, and millets.',
        mr: 'जामखेड तालुक्यातील दुष्काळी पट्ट्यात आधुनिक कोरडवाहू शेती, जलसंधारण व भरडधान्य संशोधनावर आधारित.'
      },
      degrees: ['B.Sc. (Hons) Agriculture']
    },
    {
      id: 'co-agri-kashti',
      name: { en: 'College of Agriculture, Kashti (Malegaon)', mr: 'कृषि महाविद्यालय, काष्टी (मालेगाव)' },
      established: 2021,
      district: { en: 'Nashik', mr: 'नाशिक' },
      discipline: 'Agriculture',
      disciplineLabel: { en: 'Agriculture', mr: 'कृषि' },
      image: '/media/images/InterNational_Hostel_20200109041929.jpg',
      intake: 60,
      pgIntake: '-',
      website: 'https://kvskashti.ac.in/CollegeAgri',
      description: {
        en: 'Part of the ultra-modern Krishi Vigyan Sankul at Kashti, Malegaon featuring precision farming models.',
        mr: 'काष्टी (मालेगाव) येथील भव्य कृषि विज्ञान संकुलाचा भाग, अत्याधुनिक प्रयोगशाळा व प्रक्षेत्रासह.'
      },
      degrees: ['B.Sc. (Hons) Agriculture']
    },
    {
      id: 'co-hort-pune',
      name: { en: 'College of Horticulture, Pune', mr: 'उद्यानविद्या महाविद्यालय, पुणे' },
      established: 2003,
      district: { en: 'Pune', mr: 'पुणे' },
      discipline: 'Horticulture',
      disciplineLabel: { en: 'Horticulture', mr: 'उद्यानविद्या' },
      image: '/media/images/3d_metric_projects.jpg',
      intake: 40,
      pgIntake: 'Post Graduate at CoA Pune',
      website: 'http://www.cohpune.in/',
      description: {
        en: 'Leading constituent college for protected cultivation, commercial floriculture, and landscape architecture in Maharashtra.',
        mr: 'संरक्षित शेती, व्यावसायिक पुष्पशेती व निसर्गरम्य लँडस्केपिंग क्षेत्रातील महाराष्ट्रातील अग्रगण्य घटक महाविद्यालय.'
      },
      degrees: ['B.Sc. (Hons) Horticulture']
    },
    {
      id: 'co-hort-kashti',
      name: { en: 'College of Horticulture, Kashti (Malegaon)', mr: 'उद्यानविद्या महाविद्यालय, काष्टी (मालेगाव)' },
      established: 2021,
      district: { en: 'Nashik', mr: 'नाशिक' },
      discipline: 'Horticulture',
      disciplineLabel: { en: 'Horticulture', mr: 'उद्यानविद्या' },
      image: '/media/images/3d_metric_students.jpg',
      intake: 40,
      pgIntake: '-',
      website: 'https://kvskashti.ac.in/CollegeHorti',
      description: {
        en: 'Focused on pomegranate, onion, table grapes, and vegetable seed production technology in North Maharashtra.',
        mr: 'डाळिंब, कांदा, द्राक्षे व भाजीपाला बीजोत्पादन तंत्रज्ञानाचे उत्कृष्ट केंद्र.'
      },
      degrees: ['B.Sc. (Hons) Horticulture']
    },
    {
      id: 'co-engg-rahuri',
      name: { en: 'Dr. Annasaheb Shinde College of Agril. Engineering & Technology, Rahuri', mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय, राहुरी' },
      established: 1969,
      district: { en: 'Ahilyanagar', mr: 'अहिल्यानगर' },
      discipline: 'Engineering',
      disciplineLabel: { en: 'Agril. Engineering', mr: 'कृषि अभियांत्रिकी' },
      image: '/media/images/A_02_NCC_Engineering_20260130024914_20260612123909.jpg',
      intake: 64,
      pgIntake: '30 (M.Tech.) + 12 (Ph.D.)',
      website: 'https://ascaet.ac.in/',
      description: {
        en: 'Pioneer agricultural engineering college in Maharashtra with national tractor testing center, GIS lab, and drip irrigation hydraulics research.',
        mr: 'महाराष्ट्रातील पहिले कृषि अभियांत्रिकी महाविद्यालय — राष्ट्रीय ट्रॅक्टर चाचणी केंद्र, जीआयएस लॅब व सूक्ष्म सिंचन संशोधन केंद्र.'
      },
      degrees: ['B.Tech. (Agril. Engg)', 'M.Tech. (5 Streams)', 'Ph.D. (Agril. Engg)']
    },
    {
      id: 'co-engg-kashti',
      name: { en: 'College of Agricultural Engineering & Technology, Kashti', mr: 'कृषि अभियांत्रिकी महाविद्यालय, काष्टी (मालेगाव)' },
      established: 2021,
      district: { en: 'Nashik', mr: 'नाशिक' },
      discipline: 'Engineering',
      disciplineLabel: { en: 'Agril. Engineering', mr: 'कृषि अभियांत्रिकी' },
      image: '/media/images/3d_metric_patents.jpg',
      intake: 40,
      pgIntake: '-',
      website: 'https://kvskashti.ac.in/CollegeAgriEngg',
      description: {
        en: 'Advanced farm automation, renewable energy, and drone-based precision spraying laboratory facility.',
        mr: 'शेती यांत्रिकीकरण, नवीकरणीय ऊर्जा व ड्रोन फवारणी तंत्रज्ञान प्रयोगशाळांनी सज्ज.'
      },
      degrees: ['B.Tech. (Agril. Engg)']
    },
    {
      id: 'co-abm-kashti',
      name: { en: 'College of Agriculture Business Management, Kashti', mr: 'कृषि व्यवसाय व्यवस्थापन महाविद्यालय, काष्टी (मालेगाव)' },
      established: 2021,
      district: { en: 'Nashik', mr: 'नाशिक' },
      discipline: 'Management',
      disciplineLabel: { en: 'Agri Business', mr: 'कृषि व्यवसाय व्यवस्थापन' },
      image: '/media/images/3d_metric_faculty.jpg',
      intake: 60,
      pgIntake: '-',
      website: 'https://kvskashti.ac.in/CollegeABM',
      description: {
        en: 'Dedicated to training agri-entrepreneurs, supply chain managers, FPO executives, and agro-marketing specialists.',
        mr: 'कृषोद्योजक, पुरवठा साखळी व्यवस्थापक आणि शेतकरी उत्पादक कंपन्यांचे (FPO) नेतृत्व घडविणारे महाविद्यालय.'
      },
      degrees: ['B.Sc. (Hons) Agri Business Management']
    },
    {
      id: 'co-food-kashti',
      name: { en: 'College of Food Technology, Kashti', mr: 'अन्नतंत्रज्ञान महाविद्यालय, काष्टी (मालेगाव)' },
      established: 2021,
      district: { en: 'Nashik', mr: 'नाशिक' },
      discipline: 'FoodTech',
      disciplineLabel: { en: 'Food Technology', mr: 'अन्नतंत्रज्ञान' },
      image: '/media/images/3d_metric_projects.jpg',
      intake: 40,
      pgIntake: '-',
      website: 'https://kvskashti.ac.in/CollegeFT',
      description: {
        en: 'Focusing on fruit and vegetable processing, dairy technology, grain milling, food safety, and quality assurance.',
        mr: 'फळ-भाजीपाला प्रक्रिया, दुग्ध तंत्रज्ञान, अन्न सुरक्षा व गुणवत्ता नियंत्रण क्षेत्रातील पदवी शिक्षण.'
      },
      degrees: ['B.Tech. (Food Technology)']
    },
    {
      id: 'pgi-rahuri',
      name: { en: 'Post Graduate Institute (PGI), Rahuri', mr: 'पदव्युत्तर संस्था (PGI), राहुरी' },
      established: 1972,
      district: { en: 'Ahilyanagar', mr: 'अहिल्यानगर' },
      discipline: 'PGInstitute',
      disciplineLabel: { en: 'Post Graduate & Ph.D.', mr: 'पदव्युत्तर व आचार्य पदवी' },
      image: '/media/images/Administration_Building_only_20200102043951.jpg',
      intake: 146,
      pgIntake: '146 (M.Sc.) + 48 (Ph.D.)',
      website: '',
      description: {
        en: 'Apex institute of MPKV for postgraduate teaching, basic and applied doctoral research across 15+ agricultural disciplines.',
        mr: 'मफुकृवि ची सर्वोच्च पदव्युत्तर संस्था — १५ हून अधिक कृषि विषयांमध्ये उच्च संशोधन व आचार्य पदवीचे नेतृत्व.'
      },
      degrees: ['M.Sc. (Agri) - 15 Disciplines', 'Ph.D. - 15 Disciplines']
    }
  ]
};

// 6. Data for Affiliated Colleges
// Parse raw tables from existing file
const existingAff = JSON.parse(fs.readFileSync(path.join(webPagesDir, 'education-affiliated-colleges.json'), 'utf8'));

const affiliatedCollegesData = {
  ...existingAff,
  slug: 'education-affiliated-colleges',
  url: 'https://mpkv.ac.in/Education/EduAffiletedClg',
  route: '/education/affiliated-colleges',
  sourcePage: 'Education/EduAffiletedClg',
  title: { en: 'Affiliated Colleges', mr: 'संलग्न महाविद्यालये' },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Colleges', mr: 'महाविद्यालये' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Colleges', mr: 'महाविद्यालये' }, href: '/education/constituent-colleges' },
    { title: { en: 'Affiliated Colleges', mr: 'संलग्न महाविद्यालये' }, href: '/education/affiliated-colleges' }
  ],
  hero: {
    title: {
      en: 'Affiliated Colleges Directory',
      mr: 'संलग्न महाविद्यालयांची सर्वसमावेशक माहिती'
    },
    subtitle: {
      en: '64 non-grant affiliated agricultural colleges across Western Maharashtra offering Bachelor’s degree programmes under MPKV academic regulation.',
      mr: 'मफुकृवि च्या शैक्षणिक नियमावलीनुसार पदवी अभ्यासक्रम चालविणारी पश्चिम महाराष्ट्रातील ६४ विनाअनुदानित संलग्न महाविद्यालये.'
    },
    badge: {
      en: '64 Non-Grant Affiliated Colleges | 6 Degree Streams',
      mr: '६४ विनाअनुदानित संलग्न महाविद्यालये | ६ पदवी शाखा'
    }
  }
};

// 7-11. Data for Courses & Curricula
const diplomaData = {
  slug: 'education-courses-diploma',
  url: 'https://mpkv.ac.in/Education/EduCourseDiploma',
  route: '/education/diploma',
  sourcePage: 'Education/EduCourseDiploma',
  title: { en: 'Diploma Programmes', mr: 'पदविका अभ्यासक्रम' },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' }, href: '/education/diploma' },
    { title: { en: 'Diploma', mr: 'पदविका' }, href: '/education/diploma' }
  ],
  hero: {
    title: {
      en: 'Agricultural Diploma Programmes',
      mr: 'कृषि पदविका अभ्यासक्रम'
    },
    subtitle: {
      en: 'Hands-on practical diploma courses equipping rural youth with modern agricultural technologies, machinery handling, and farm management skills.',
      mr: 'ग्रामीण तरुणांना आधुनिक शेती, अवजारे हाताळणी आणि प्रक्षेत्र व्यवस्थापनाचे व्यावहारिक प्रशिक्षण देणारे पदविका अभ्यासक्रम.'
    },
    badge: {
      en: '2 & 3 Year Practical Diplomas | 80+ Schools & Polytechnics',
      mr: '२ व ३ वर्षांचे पदविका अभ्यासक्रम | ८० हून अधिक तंत्र विद्यालये'
    }
  },
  courses: [
    {
      title: { en: 'Diploma in Agricultural Technology', mr: 'कृषि तंत्रज्ञान पदविका' },
      duration: { en: '2 Years (4 Semesters)', mr: '२ वर्षे (४ सत्रावधी)' },
      medium: { en: 'Marathi', mr: 'मराठी' },
      eligibility: { en: '10th (SSC) Passed with Science & Math', mr: '१० वी (एसएससी) उत्तीर्ण' },
      curriculaPdf: '/StaticPdf/Diploma Course Curriculum.pdf',
      description: {
        en: 'Conducted across 10 constituent and 72 non-grant Agricultural Technology Schools. Intensive practical training on crops, agronomy, plant protection, and horticulture.',
        mr: '१० घटक व ७२ विनाअनुदानित कृषि तंत्र विद्यालयांतून चालविला जाणारा अभ्यासक्रम. पिके, कीड नियंत्रण व फलोत्पादनाचे प्रत्यक्ष प्रात्यक्षिक शिक्षण.'
      }
    },
    {
      title: { en: 'Diploma in Agricultural Polytechnic', mr: 'कृषि तंत्रनिकेतन पदविका' },
      duration: { en: '3 Years (6 Semesters)', mr: '३ वर्षे (६ सत्रावधी)' },
      medium: { en: 'English', mr: 'इंग्रजी' },
      eligibility: { en: '10th (SSC) Passed with English, Science & Math', mr: '१० वी (एसएससी) उत्तीर्ण' },
      curriculaPdf: '/StaticPdf/Agriculture Polytechic.pdf',
      description: {
        en: 'Advanced three-year polytechnic course with English medium instruction preparing students for higher studies or technical positions in agro-industries.',
        mr: 'कृषोद्योगातील तांत्रिक पदे किंवा उच्च शिक्षणासाठी इंग्रजी माध्यमातून ३ वर्षांचे प्रगत तंत्रनिकेतन शिक्षण.'
      }
    }
  ]
};

const bachelorsData = {
  slug: 'education-courses-bachelors',
  url: 'https://mpkv.ac.in/Education/EduCourseBachlor',
  route: '/education/bachelors',
  sourcePage: 'Education/EduCourseBachlor',
  title: { en: 'Undergraduate (UG) Degrees', mr: 'पदवी अभ्यासक्रम' },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' }, href: '/education/bachelors' },
    { title: { en: 'Bachelors', mr: 'पदवी अभ्यासक्रम' }, href: '/education/bachelors' }
  ],
  hero: {
    title: {
      en: 'Four-Year Professional Undergraduate Degree Programmes',
      mr: '४-वर्षीय व्यावसायिक पदवी अभ्यासक्रम (UG)'
    },
    subtitle: {
      en: 'ICAR VI Deans Committee NEP-2020 aligned four-year degree programmes integrating CBCS, Student READY, and rural agricultural work experience.',
      mr: 'भा.कृ.अनु.प. च्या ६ व्या अधिष्ठाता समिती व राष्ट्रीय शैक्षणिक धोरणावर (NEP-2020) आधारित ४-वर्षीय व्यावसायिक पदव्या.'
    },
    badge: {
      en: '6 Professional Degrees | 8 Semesters | Student READY & RAWE',
      mr: '६ व्यावसायिक पदव्या | ८ सत्रावधी | स्टुडन्ट रेडी व ग्रामीण कार्यानुभव'
    }
  },
  degrees: [
    {
      code: 'BScAgri',
      name: { en: 'B.Sc. (Hons) Agriculture', mr: 'बी.एस्सी. (ऑनर्स) कृषि' },
      duration: { en: '4 Years (8 Semesters)', mr: '४ वर्षे (८ सत्रावधी)' },
      eligibility: { en: '12th Science (PCB/PCMB) with MHT-CET / NEET', mr: '१२ वी विज्ञान (PCB/PCMB) सह MHT-CET / NEET' },
      totalCredits: '180 Credits',
      collegesCount: '8 Constituent + 38 Affiliated',
      pdf: '~/../../Uploads/Education/20260825_170313_77595b76d576b165192241803cdc3efb.pdf',
      description: {
        en: 'Comprehensive education covering Agronomy, Soil Science, Genetics, Plant Pathology, Entomology, and Agricultural Economics, with full 7th semester RAWE attachment.',
        mr: 'सेंद्रिय शेती, पीक उत्पादन, मृद शास्त्र, कीटकशास्त्र व कृषि अर्थशास्त्राचा सखोल अभ्यास आणि ७ व्या सत्रात संपूर्ण ग्रामीण कृषि कार्यानुभव.'
      }
    },
    {
      code: 'BScHorti',
      name: { en: 'B.Sc. (Hons) Horticulture', mr: 'बी.एस्सी. (ऑनर्स) उद्यानविद्या' },
      duration: { en: '4 Years (8 Semesters)', mr: '४ वर्षे (८ सत्रावधी)' },
      eligibility: { en: '12th Science (PCB/PCMB) with MHT-CET / NEET', mr: '१२ वी विज्ञान (PCB/PCMB) सह MHT-CET / NEET' },
      totalCredits: '182 Credits',
      collegesCount: '2 Constituent + 5 Affiliated',
      pdf: '~/../../Uploads/Education/20260825_170334_ca84fb9cd42d7b597b71ff00800dacae.pdf',
      description: {
        en: 'Specialized focus on fruit crops, vegetable science, commercial floriculture, spices, plantation crops, and post-harvest technology.',
        mr: 'फळपिके, भाजीपाला उत्पादन, हरितगृह पुष्पशेती, मसाले पिके व काढणीपश्चात तंत्रज्ञानावर विशेष भर.'
      }
    },
    {
      code: 'BTechEngg',
      name: { en: 'B.Tech. (Agricultural Engineering)', mr: 'बी.टेक. (कृषि अभियांत्रिकी)' },
      duration: { en: '4 Years (8 Semesters)', mr: '४ वर्षे (८ सत्रावधी)' },
      eligibility: { en: '12th Science (PCM/PCMB) with MHT-CET / JEE', mr: '१२ वी विज्ञान (PCM/PCMB) सह MHT-CET / JEE' },
      totalCredits: '183 Credits',
      collegesCount: '2 Constituent + 5 Affiliated',
      pdf: '~/../../Uploads/Education/20260825_170413_5f7e98afe50a4c93609844f752891616.pdf',
      description: {
        en: 'Engineering principles applied to agriculture: tractors, farm machinery, irrigation hydraulics, soil conservation, and renewable energy.',
        mr: 'ट्रॅक्टर व आधुनिक यंत्रसामग्री, सूक्ष्म सिंचन, जलसंधारण अभियांत्रिकी व सौर ऊर्जा प्रणालींचे सखोल प्रशिक्षण.'
      }
    },
    {
      code: 'BTechFood',
      name: { en: 'B.Tech. (Food Technology)', mr: 'बी.टेक. (अन्नतंत्रज्ञान)' },
      duration: { en: '4 Years (8 Semesters)', mr: '४ वर्षे (८ सत्रावधी)' },
      eligibility: { en: '12th Science (PCM/PCMB) with MHT-CET / NEET / JEE', mr: '१२ वी विज्ञान सह CET / NEET / JEE' },
      totalCredits: '180 Credits',
      collegesCount: '1 Constituent + 6 Affiliated',
      pdf: '~/../../Uploads/Education/20260825_170428_d0e4713e570ff2c4931616388183a81f.pdf',
      description: {
        en: 'Food microbiology, processing machinery, packaging, quality assurance (FSSAI/HACCP), and commercial plant operations.',
        mr: 'अन्न प्रक्रिया, पॅकेजिंग, अन्न सुरक्षा कायदे (FSSAI) व औद्योगिक प्रक्रिया प्रकल्पांचे संचालन.'
      }
    },
    {
      code: 'BTechBio',
      name: { en: 'B.Tech. (Biotechnology)', mr: 'बी.टेक. (जैवतंत्रज्ञान)' },
      duration: { en: '4 Years (8 Semesters)', mr: '४ वर्षे (८ सत्रावधी)' },
      eligibility: { en: '12th Science (PCB/PCMB) with MHT-CET / NEET', mr: '१२ वी विज्ञान सह MHT-CET / NEET' },
      totalCredits: '184 Credits',
      collegesCount: '3 Affiliated Colleges',
      pdf: '~/../../Uploads/Education/20260825_170444_db432593f5a75056a6074e5c1f40e780.pdf',
      description: {
        en: 'Plant genetic engineering, molecular breeding, plant tissue culture, bioinformatics, and immunology.',
        mr: 'वनस्पती जनुकीय अभियांत्रिकी, उती संवर्धन, आण्विक प्रजनन आणि बायोइन्फॉर्मेटिक्सचे उच्च शिक्षण.'
      }
    },
    {
      code: 'BScABM',
      name: { en: 'B.Sc. (Hons) Agri Business Management', mr: 'बी.एस्सी. (ऑनर्स) कृषि व्यवसाय व्यवस्थापन' },
      duration: { en: '4 Years (8 Semesters)', mr: '४ वर्षे (८ सत्रावधी)' },
      eligibility: { en: '12th Science (PCB/PCM/PCMB) with MHT-CET / NEET', mr: '१२ वी विज्ञान सह MHT-CET / NEET' },
      totalCredits: '180 Credits',
      collegesCount: '1 Constituent + 7 Affiliated',
      pdf: '~/../../Uploads/Education/20260825_170354_635caeef7880a47250fe28d2fb82b51b.pdf',
      description: {
        en: 'Agri-input marketing, commodity trading, supply chain management, banking finance, and enterprise incubation.',
        mr: 'कृषि निविष्ठा विपणन, शेतमाल व्यापार, पुरवठा साखळी आणि कृषि बँकिंग क्षेत्रातील व्यावसायिक व्यवस्थापन पदवी.'
      }
    }
  ]
};

const mastersDoctoralData = {
  slug: 'education-courses-masters-doctoral',
  url: 'https://mpkv.ac.in/Education/EduCourseMaster',
  route: '/education/masters-doctoral',
  sourcePage: 'Education/EduCourseMaster',
  title: { en: 'Master’s & Doctoral Degrees', mr: 'पदव्युत्तर व आचार्य पदवी अभ्यासक्रम' },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' }, href: '/education/masters-doctoral' },
    { title: { en: 'Master’s & Doctoral', mr: 'पदव्युत्तर व आचार्य पदवी' }, href: '/education/masters-doctoral' }
  ],
  hero: {
    title: {
      en: 'Post-Graduate (M.Sc./M.Tech./MBA) and Doctoral (Ph.D.) Programmes',
      mr: 'पदव्युत्तर व आचार्य पदवी (Ph.D.) संशोधन अभ्यासक्रम'
    },
    subtitle: {
      en: 'Premier research programmes conducted at Post Graduate Institute (PGI) Rahuri, Dr. ASCAET Rahuri, and College of Agriculture Pune under ICAR-NCG guidelines.',
      mr: 'पदव्युत्तर संस्था राहुरी, डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय व पुणे कृषि महाविद्यालयातून चालविले जाणारे उच्च संशोधन अभ्यासक्रम.'
    },
    badge: {
      en: '15+ Master’s Disciplines | 12+ Ph.D. Streams | ICAR NCG-BSMA Aligned',
      mr: '१५ हून अधिक पदव्युत्तर शाखा | १२ हून अधिक आचार्य पदवी शाखा'
    }
  },
  pgDisciplines: [
    { name: { en: 'Agronomy', mr: 'कृषिविद्या (Agronomy)' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '32 (M.Sc.) + 8 (Ph.D.)' },
    { name: { en: 'Soil Science & Agril. Chemistry', mr: 'मृद विज्ञान व कृषि रसायनशास्त्र' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '28 (M.Sc.) + 6 (Ph.D.)' },
    { name: { en: 'Genetics & Plant Breeding', mr: 'वनस्पती प्रजनन व जनुकशास्त्र' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '30 (M.Sc.) + 6 (Ph.D.)' },
    { name: { en: 'Agricultural Entomology', mr: 'कृषि कीटकशास्त्र' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '26 (M.Sc.) + 6 (Ph.D.)' },
    { name: { en: 'Plant Pathology', mr: 'वनस्पती रोगशास्त्र' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '26 (M.Sc.) + 6 (Ph.D.)' },
    { name: { en: 'Horticulture (Fruit & Veg Science)', mr: 'उद्यानविद्या (फलोत्पादन व भाजीपाला)' }, degree: 'M.Sc. (Hort) & Ph.D.', seats: '28 (M.Sc.) + 6 (Ph.D.)' },
    { name: { en: 'Agricultural Economics', mr: 'कृषि अर्थशास्त्र' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '20 (M.Sc.) + 4 (Ph.D.)' },
    { name: { en: 'Agricultural Extension Education', mr: 'कृषि विस्तार शिक्षण' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '20 (M.Sc.) + 4 (Ph.D.)' },
    { name: { en: 'Animal Husbandry & Dairy Science', mr: 'पशुसंवर्धन व दुग्धशास्त्र' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '20 (M.Sc.) + 4 (Ph.D.)' },
    { name: { en: 'Agricultural Meteorology (Pune)', mr: 'कृषि हवामानशास्त्र (पुणे)' }, degree: 'M.Sc. (Agri) & Ph.D.', seats: '6 (M.Sc.) + 2 (Ph.D.)' },
    { name: { en: 'Farm Machinery & Power Engineering', mr: 'कृषि यंत्रसामग्री व ऊर्जा अभियांत्रिकी' }, degree: 'M.Tech. & Ph.D.', seats: '10 (M.Tech.) + 4 (Ph.D.)' },
    { name: { en: 'Irrigation & Drainage Engineering', mr: 'सिंचन व निचरा अभियांत्रिकी' }, degree: 'M.Tech. & Ph.D.', seats: '10 (M.Tech.) + 4 (Ph.D.)' },
    { name: { en: 'Soil & Water Conservation Engineering', mr: 'मृद व जलसंधारण अभियांत्रिकी' }, degree: 'M.Tech. & Ph.D.', seats: '10 (M.Tech.) + 4 (Ph.D.)' },
    { name: { en: 'Agricultural Process Engineering', mr: 'कृषि प्रक्रिया अभियांत्रिकी' }, degree: 'M.Tech. & Ph.D.', seats: '8 (M.Tech.) + 2 (Ph.D.)' },
    { name: { en: 'Renewable Energy Engineering', mr: 'नवीकरणीय ऊर्जा अभियांत्रिकी' }, degree: 'M.Tech.', seats: '6 (M.Tech.)' },
    { name: { en: 'Master of Business Administration (Agri) - Pune', mr: 'एम.बी.ए. (कृषि व्यवसाय) - पुणे' }, degree: 'M.B.A. (Agri)', seats: '30 Seats' }
  ]
};

const diplomaSchoolsData = {
  slug: 'education-diploma-schools',
  url: 'https://mpkv.ac.in/Education/EduDiplomaSchool',
  route: '/education/diploma-schools',
  sourcePage: 'Education/EduDiplomaSchool',
  title: { en: 'Diploma (Agril. Tech. Schools)', mr: 'कृषि तंत्र विद्यालये (पदविका)' },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' }, href: '/education/diploma-schools' },
    { title: { en: 'Agril. Tech. Schools', mr: 'कृषि तंत्र विद्यालये' }, href: '/education/diploma-schools' }
  ],
  hero: {
    title: {
      en: 'Agricultural Technology Schools (ATS)',
      mr: 'कृषि तंत्र विद्यालये व तंत्रनिकेतने'
    },
    subtitle: {
      en: 'Pioneering lower agricultural education in Maharashtra since pre-independence, training generations of farmers’ children across 82 technology schools.',
      mr: 'स्वातंत्र्यपूर्व काळापासून महाराष्ट्रात कनिष्ठ कृषि शिक्षणाची समृद्ध परंपरा — ८२ तंत्र विद्यालयांतून शेतकऱ्यांच्या पाल्यांना आधुनिक शेतीचे धडे.'
    },
    badge: {
      en: '10 Constituent Schools | 72 Non-Grant Schools | 4,560 Annual Capacity',
      mr: '१० घटक विद्यालये | ७२ विनाअनुदानित विद्यालये | ४,५६० वार्षिक क्षमता'
    }
  },
  constituentSchools: [
    { sr: 1, name: { en: 'Agricultural Technology School, Rahuri, Dist. Ahilyanagar', mr: 'कृषि तंत्र विद्यालय, राहुरी, जि. अहिल्यानगर' }, intake: 60, phone: '02426-243224' },
    { sr: 2, name: { en: 'Agricultural Technology School, Pune (CoA Pune Campus)', mr: 'कृषि तंत्र विद्यालय, पुणे' }, intake: 60, phone: '020-25537033' },
    { sr: 3, name: { en: 'Agricultural Technology School, Kolhapur (Bawada Campus)', mr: 'कृषि तंत्र विद्यालय, कोल्हापूर' }, intake: 60, phone: '0231-2605851' },
    { sr: 4, name: { en: 'Agricultural Technology School, Dhule', mr: 'कृषि तंत्र विद्यालय, धुळे' }, intake: 60, phone: '02562-220042' },
    { sr: 5, name: { en: 'Agricultural Technology School, Manjri, Dist. Pune', mr: 'कृषि तंत्र विद्यालय, मांजरी, जि. पुणे' }, intake: 60, phone: '020-26999234' },
    { sr: 6, name: { en: 'Agricultural Technology School, Borgaon, Dist. Satara', mr: 'कृषि तंत्र विद्यालय, बोरगाव, जि. सातारा' }, intake: 60, phone: '02162-262035' },
    { sr: 7, name: { en: 'Agricultural Technology School, Chas, Dist. Ahilyanagar', mr: 'कृषि तंत्र विद्यालय, चास, जि. अहिल्यानगर' }, intake: 60, phone: '02426-243300' },
    { sr: 8, name: { en: 'Agricultural Technology School, Digraj, Dist. Sangli', mr: 'कृषि तंत्र विद्यालय, डिग्रज, जि. सांगली' }, intake: 60, phone: '0233-2460222' },
    { sr: 9, name: { en: 'Agricultural Technology School, Jalgaon', mr: 'कृषि तंत्र विद्यालय, जळगाव' }, intake: 60, phone: '0257-2250123' },
    { sr: 10, name: { en: 'Agricultural Technology School, Solapur', mr: 'कृषि तंत्र विद्यालय, सोलापूर' }, intake: 60, phone: '0217-2373209' }
  ]
};

const certificateCoursesData = {
  slug: 'education-certificate-courses',
  url: 'https://mpkv.ac.in/Education/EduCirtificateCourse',
  route: '/education/certificate-courses',
  sourcePage: 'Education/EduCirtificateCourse',
  title: { en: 'Certificate Courses', mr: 'प्रमाणपत्र अभ्यासक्रम' },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Courses & Curriculum', mr: 'अभ्यासक्रम व पदव्या' }, href: '/education/certificate-courses' },
    { title: { en: 'Certificate Courses', mr: 'प्रमाणपत्र अभ्यासक्रम' }, href: '/education/certificate-courses' }
  ],
  hero: {
    title: {
      en: 'Short-Term Vocational & Certificate Courses',
      mr: 'अल्पमुदतीचे व्यावसायिक व प्रमाणपत्र अभ्यासक्रम'
    },
    subtitle: {
      en: 'Job-oriented skill development certificates in Mali (Gardening), Nursery Management, Fruit Preservation, and Organic Input Production.',
      mr: 'माळी काम, रोपवाटिका व्यवस्थापन, फळ प्रक्रिया व सेंद्रिय शेती निविष्ठा उत्पादनातील रोजगारक्षम प्रमाणपत्र अभ्यासक्रम.'
    },
    badge: {
      en: 'Vocational Certificates | 6-Month & 1-Year Courses',
      mr: 'कौशल्याधारित प्रमाणपत्रे | ६ महिने व १ वर्ष कालावधी'
    }
  },
  courses: [
    {
      title: { en: 'Mali Training Certificate Course (माळी प्रशिक्षण वर्ग)', mr: 'माळी प्रशिक्षण प्रमाणपत्र वर्ग' },
      duration: { en: '1 Year (Annual Examination)', mr: '१ वर्ष (वार्षिक परीक्षा)' },
      eligibility: { en: '8th or 10th Standard Passed', mr: '८ वी किंवा १० वी उत्तीर्ण' },
      description: {
        en: 'Conducted at Pune, Rahuri, Kolhapur, and Dhule campuses. Practical training in grafting, budding, bonsai, landscape design, greenhouse nursery management, and pest control.',
        mr: 'पुणे, राहुरी, कोल्हापूर व धुळे संकुलात चालविला जाणारा लोकप्रिय अभ्यासक्रम. कलम करणे, गुटी कलम, बोन्साय, हरितगृह रोपे व बागकाम प्रात्यक्षिके.'
      },
      intake: '30 to 50 Seats per Center'
    },
    {
      title: { en: 'Fruit & Vegetable Processing Certificate', mr: 'फळ व भाजीपाला प्रक्रिया प्रमाणपत्र' },
      duration: { en: '6 Months', mr: '६ महिने' },
      eligibility: { en: '10th Standard Passed', mr: '१० वी उत्तीर्ण' },
      description: {
        en: 'Conducted at Central Campus Rahuri and Kashti Food Tech College. Practical hands-on training in jams, jellies, juices, pickles, drying, and packaging.',
        mr: 'जॅम, जेली, सरबते, लोणची, निर्जलीकरण व पॅकेजिंग तंत्रज्ञानाचे प्रत्यक्ष व्यावसायिक प्रशिक्षण.'
      },
      intake: '25 Seats'
    },
    {
      title: { en: 'Bio-Fertilizer & Bio-Pesticide Production', mr: 'जैविक खते व जैविक कीटकनाशक उत्पादन' },
      duration: { en: '3 to 6 Months', mr: '३ ते ६ महिने' },
      eligibility: { en: '10th/12th Science', mr: '१० वी / १२ वी विज्ञान' },
      description: {
        en: 'Hands-on microbial laboratory training for producing Rhizobium, Azotobacter, PSB, Trichoderma, and Pseudomonas for rural youth enterprise.',
        mr: 'रायझोबियम, अझोटोबॅक्टर, पीएसबी, ट्रायकोडर्मा जीवाणू संवर्धन व व्यावसायिक उत्पादन युनिट उभारणी प्रशिक्षण.'
      },
      intake: '30 Seats'
    }
  ]
};

// 12. Data for Faculty of Agricultural Science
const facScienceData = {
  slug: 'education-faculty-agricultural-science',
  url: 'https://mpkv.ac.in/Education/EduFaclatyScience',
  route: '/education/faculty-agricultural-science',
  sourcePage: 'Education/EduFaclatyScience',
  title: { en: 'Agricultural Science Faculty', mr: 'कृषि विज्ञान शाखा' },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Faculty Branches', mr: 'विद्याशाखा' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Faculty Branches', mr: 'विद्याशाखा' }, href: '/education/faculty-agricultural-science' },
    { title: { en: 'Agricultural Science', mr: 'कृषि विज्ञान शाखा' }, href: '/education/faculty-agricultural-science' }
  ],
  hero: {
    title: {
      en: 'Faculty of Agricultural Science',
      mr: 'कृषि विज्ञान विद्याशाखा'
    },
    subtitle: {
      en: 'The foundation pillar of MPKV coordinating 11 academic departments, 8 constituent colleges, postgraduate institute research, and extension activities.',
      mr: 'मफुकृवि चा मुख्य आधारस्तंभ — ११ शैक्षणिक विभाग, ८ घटक महाविद्यालये आणि पदव्युत्तर संशोधन संस्थांचा शैक्षणिक समन्वय.'
    },
    badge: {
      en: '11 Academic Departments | 14 Constituent Campuses | 100+ Professors',
      mr: '११ शैक्षणिक विभाग | १४ घटक संकुले | १०० हून अधिक प्राध्यापक'
    }
  },
  departments: [
    { id: 'agronomy', name: { en: 'Department of Agronomy', mr: 'कृषिविद्या विभाग' }, mandate: { en: 'Crop production technologies, weed management, water scheduling, and organic farming.', mr: 'पीक उत्पादन तंत्रज्ञान, तण व्यवस्थापन, जल नियोजन आणि सेंद्रिय शेती.' }, icon: 'Wheat' },
    { id: 'soil', name: { en: 'Department of Soil Science & Agril. Chemistry', mr: 'मृद विज्ञान व कृषि रसायनशास्त्र विभाग' }, mandate: { en: 'Soil fertility testing, nutrient management, soil health card, and isotope tracer research.', mr: 'माती परीक्षण, पोषकद्रव्य व्यवस्थापन, सॉईल हेल्थ कार्ड व समस्थानिक संशोधन.' }, icon: 'Sprout' },
    { id: 'botany', name: { en: 'Department of Agricultural Botany', mr: 'कृषि वनस्पतीशास्त्र विभाग' }, mandate: { en: 'Crop breeding, cytogenetics, seed technology, and tissue culture propagation.', mr: 'पीक सुधारणा, जनुकशास्त्र, संकरित वाण निर्मिती व बीजोत्पादन तंत्रज्ञान.' }, icon: 'Dna' },
    { id: 'pathology', name: { en: 'Department of Plant Pathology', mr: 'वनस्पती रोगशास्त्र विभाग' }, mandate: { en: 'Fungal, bacterial, viral diagnostics, mushroom cultivation, and biological control.', mr: 'पीक रोग निदान, बुरशी-जिवाणू व्यवस्थापन, अळंबी उत्पादन व जैविक नियंत्रण.' }, icon: 'Bug' },
    { id: 'entomology', name: { en: 'Department of Agricultural Entomology', mr: 'कृषि कीटकशास्त्र विभाग' }, mandate: { en: 'Integrated pest management (IPM), apiculture (beekeeping), and pesticide residue monitoring.', mr: 'एकात्मिक कीड व्यवस्थापन (IPM), मधमाशी पालन व कीटकनाशक अंश विश्लेषण.' }, icon: 'ShieldCheck' },
    { id: 'horticulture', name: { en: 'Department of Horticulture', mr: 'उद्यानविद्या विभाग' }, mandate: { en: 'High-density fruit orchards, protected greenhouse vegetable cultivation, and post-harvest handling.', mr: 'फळबागा लागवड, संरक्षित भाजीपाला शेती, पुष्पशेती व काढणीपश्चात हाताळणी.' }, icon: 'Apple' },
    { id: 'economics', name: { en: 'Department of Agricultural Economics', mr: 'कृषि अर्थशास्त्र विभाग' }, mandate: { en: 'Farm costing, market intelligence, agricultural credit, and policy analysis.', mr: 'उत्पादन खर्च निश्चिती, बाजारभाव विश्लेषण, कृषि पतपुरवठा व धोरणात्मक अभ्यास.' }, icon: 'TrendingUp' },
    { id: 'extension', name: { en: 'Department of Agricultural Extension Education', mr: 'कृषि विस्तार शिक्षण विभाग' }, mandate: { en: 'Transfer of technology, rural sociology, ICT tools, and farmer capacity building.', mr: 'तंत्रज्ञान प्रसार, ग्रामीण समाजशास्त्र, डिजिटल विस्तार माध्यमे व शेतकरी प्रशिक्षण.' }, icon: 'Users' },
    { id: 'dairy', name: { en: 'Department of Animal Husbandry & Dairy Science', mr: 'पशुसंवर्धन व दुग्धशास्त्र विभाग' }, mandate: { en: 'Indigenous cattle breeding, crossbred dairy herd management, and milk processing.', mr: 'देशी गोवंश संवर्धन, संकरित गायींचे व्यवस्थापन व दुग्ध पदार्थ निर्मिती.' }, icon: 'Beef' },
    { id: 'engineering', name: { en: 'Department of Agricultural Engineering', mr: 'कृषि अभियांत्रिकी विभाग (कृषि शाखा)' }, mandate: { en: 'Farm power implements, micro-irrigation systems, and surveying for agriculture students.', mr: 'कृषि विद्यार्थ्यांसाठी शेती अवजारे, सूक्ष्म सिंचन व भूमापन प्रात्यक्षिके.' }, icon: 'Cpu' },
    { id: 'statistics', name: { en: 'Department of Statistics & Mathematics', mr: 'संख्याशास्त्र व गणित विभाग' }, mandate: { en: 'Experimental design, biostatistics, statistical modeling, and data analytics.', mr: 'संशोधन चाचण्यांचे नियोजन, बायोस्टॅटिस्टिक्स आणि सांख्यिकी विश्लेषण.' }, icon: 'BarChart3' }
  ]
};

// 13. Data for Faculty of Agricultural Engineering
const facEnggData = {
  slug: 'education-faculty-agricultural-engineering',
  url: 'https://mpkv.ac.in/Education/EduFaclatyEngg',
  route: '/education/faculty-agricultural-engineering',
  sourcePage: 'Education/EduFaclatyEngg',
  title: { en: 'Agricultural Engineering Faculty', mr: 'कृषि अभियांत्रिकी शाखा' },
  menuId: 'menu_education',
  parentMenu: { id: 'menu_education', title: { en: 'Education', mr: 'शिक्षण' } },
  submenuGroup: { en: 'Faculty Branches', mr: 'विद्याशाखा' },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Faculty Branches', mr: 'विद्याशाखा' }, href: '/education/faculty-agricultural-engineering' },
    { title: { en: 'Agricultural Engineering', mr: 'कृषि अभियांत्रिकी शाखा' }, href: '/education/faculty-agricultural-engineering' }
  ],
  hero: {
    title: {
      en: 'Faculty of Agricultural Engineering & Technology',
      mr: 'कृषि अभियांत्रिकी व तंत्रज्ञान विद्याशाखा'
    },
    subtitle: {
      en: 'Spearheading agricultural mechanization, smart irrigation, renewable energy, and post-harvest engineering through Dr. ASCAET Rahuri and Kashti colleges.',
      mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय राहुरी व काष्टी द्वारे शेती यांत्रिकीकरण, सिंचन व प्रक्रिया अभियांत्रिकीचे नेतृत्व.'
    },
    badge: {
      en: 'Dr. ASCAET Rahuri (Est. 1969) | 5 Engineering Departments | National Testing Center',
      mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय (स्था. १९६९) | ५ अभियांत्रिकी विभाग'
    }
  },
  departments: [
    {
      id: 'fmpe',
      name: { en: 'Department of Farm Machinery & Power Engineering (FMPE)', mr: 'कृषि यंत्रे व शक्ती अभियांत्रिकी विभाग' },
      mandate: {
        en: 'Design, development, and testing of tractor-drawn implements, automated planters, harvesters, and Government-authorized testing center.',
        mr: 'ट्रॅक्टरचलित अवजारे, स्वयंचलित पेरणी यंत्रे, काढणी यंत्रे यांचे संशोधन व शासनमान्य चाचणी केंद्र.'
      },
      icon: 'Tractor'
    },
    {
      id: 'ide',
      name: { en: 'Department of Irrigation & Drainage Engineering (IDE)', mr: 'सिंचन व निचरा अभियांत्रिकी विभाग' },
      mandate: {
        en: 'Automated drip and sprinkler systems, hydraulics lab, sub-surface drainage in waterlogged soils, and precision fertigation models.',
        mr: 'स्वयंचलित ठिबक व तुषार सिंचन, सिंचन जलशास्त्र प्रयोगशाळा, पाणथळ जमिनीतील निचरा प्रणाली व विद्राव्य खत तंत्रज्ञान.'
      },
      icon: 'Droplets'
    },
    {
      id: 'swce',
      name: { en: 'Department of Soil & Water Conservation Engineering (SWCE)', mr: 'मृद व जलसंधारण अभियांत्रिकी विभाग' },
      mandate: {
        en: 'Watershed hydrology, soil erosion control structures, GIS and remote sensing modeling, rainwater harvesting dams.',
        mr: 'पाणलोट क्षेत्र विकास, धूप नियंत्रण बंधारे, जीआयएस व रिमोट सेन्सिंग मॉडेलिंग आणि शेततळे तंत्रज्ञान.'
      },
      icon: 'Mountain'
    },
    {
      id: 'ape',
      name: { en: 'Department of Agricultural Process Engineering (APE)', mr: 'कृषि प्रक्रिया अभियांत्रिकी विभाग' },
      mandate: {
        en: 'Grain cleaning, grading, drying, dal mills, fruit waxing, cold storage structures, and value-added packaging machines.',
        mr: 'धान्य स्वच्छता, प्रतवारी, डाळ मिल, फळे मेण लावणे, शीतगृह रचना आणि मूल्यवर्धन प्रक्रिया यंत्रसामग्री.'
      },
      icon: 'Cog'
    },
    {
      id: 'ree',
      name: { en: 'Department of Renewable Energy Engineering (REE)', mr: 'नवीकरणीय ऊर्जा अभियांत्रिकी विभाग' },
      mandate: {
        en: 'Solar photovoltaic water pumping, solar dryers for agro-produce, biomass gasifiers, and biogas plant design.',
        mr: 'सौर कृषिपंप प्रणाली, सौर सुकवणी संयंत्रे, बायोमास गॅसिफायर आणि बायोगॅस संयंत्र आराखडे.'
      },
      icon: 'Sun'
    }
  ]
};

// Write files
const filesToWrite = [
  { name: 'education-constituent-colleges.json', data: constituentCollegesData },
  { name: 'education-affiliated-colleges.json', data: affiliatedCollegesData },
  { name: 'education-courses-diploma.json', data: diplomaData },
  { name: 'education-courses-bachelors.json', data: bachelorsData },
  { name: 'education-courses-masters.json', data: mastersDoctoralData },
  { name: 'education-courses-doctoral.json', data: mastersDoctoralData },
  { name: 'education-diploma-schools.json', data: diplomaSchoolsData },
  { name: 'education-certificate-courses.json', data: certificateCoursesData },
  { name: 'education-faculty-agricultural-science.json', data: facScienceData },
  { name: 'education-faculty-agricultural-engineering.json', data: facEnggData }
];

[webPagesDir, srcPagesDir].forEach(targetDir => {
  if (!fs.existsSync(targetDir)) return;
  filesToWrite.forEach(f => {
    const fullPath = path.join(targetDir, f.name);
    fs.writeFileSync(fullPath, JSON.stringify(f.data, null, 2), 'utf8');
    console.log(`Saved ${f.name} in ${targetDir}`);
  });
});

console.log('All 13 Education Pages Data successfully written!');
