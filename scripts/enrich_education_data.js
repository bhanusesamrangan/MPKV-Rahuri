const fs = require('fs');
const path = require('path');

// 1. Data for education-at-a-glance
const glanceData = {
  slug: 'education-at-a-glance',
  url: 'https://mpkv.ac.in/Education/AtaGlance',
  route: '/education/at-a-glance',
  sourcePage: 'Education/AtaGlance',
  scrapedAt: new Date().toISOString(),
  title: {
    en: 'Education at a Glance',
    mr: 'दृष्टीक्षेपात शिक्षण'
  },
  menuId: 'menu_education',
  parentMenu: {
    id: 'menu_education',
    title: { en: 'Education', mr: 'शिक्षण' }
  },
  submenuGroup: {
    en: 'Overview & Profile',
    mr: 'संस्थेची माहिती व रूपरेषा'
  },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Overview & Profile', mr: 'संस्थेची माहिती व रूपरेषा' }, href: '/education/at-a-glance' },
    { title: { en: 'Education at a Glance', mr: 'दृष्टीक्षेपात शिक्षण' }, href: '/education/at-a-glance' }
  ],
  hero: {
    title: {
      en: 'Higher Agricultural Education at MPKV',
      mr: 'महात्मा फुले कृषि विद्यापीठातील उच्च कृषि शिक्षण'
    },
    subtitle: {
      en: 'Maharashtra\'s first state agricultural university, pioneering world-class education, ICAR-accredited degree programmes, and hands-on agricultural innovation since 1968.',
      mr: 'महाराष्ट्रातील पहिले राज्य कृषि विद्यापीठ — १९६८ पासून दर्जेदार शिक्षण, आयसीएआर अधिस्वीकृती आणि प्रयोगशील संशोधनातून कृषिक्षेत्राचे नेतृत्व.'
    },
    badge: {
      en: 'NAEAB / ICAR Accredited ‘A’ Grade (Score 3.12 / 4.0)',
      mr: 'NAEAB / भा.कृ.अनु.प. मान्यताप्राप्त ‘अ’ श्रेणी (गुण ३.१२ / ४.०)'
    }
  },
  statsCounters: [
    {
      value: '1,00,000+',
      label: { en: 'Agricultural Graduates', mr: 'पदवीधर कृषि मनुष्यबळ' },
      description: { en: 'Produced since inception serving globally', mr: 'स्थापनेपासून विविध क्षेत्रांत कार्यरत' },
      icon: 'GraduationCap'
    },
    {
      value: '14',
      label: { en: 'Constituent Colleges', mr: 'घटक महाविद्यालये' },
      description: { en: 'Spread across Western Maharashtra', mr: 'पश्चिम महाराष्ट्रातील १० जिल्ह्यांत' },
      icon: 'Building2'
    },
    {
      value: 'NAEAB \'A\'',
      label: { en: 'ICAR Accreditation', mr: 'भा.कृ.अनु.प. मानांकन' },
      description: { en: 'Secured 3.12 / 4.0 for 2023–2028', mr: '५ वर्षांसाठी ‘अ’ श्रेणी मानांकन' },
      icon: 'Award'
    },
    {
      value: '4,560',
      label: { en: 'Annual Diploma Intake', mr: 'वार्षिक पदविका प्रवेश क्षमता' },
      description: { en: 'Across 82 polytechnics and tech schools', mr: '८२ तंत्र विद्यालये व तंत्रनिकेतनांमध्ये' },
      icon: 'Users'
    }
  ],
  mandate: {
    en: 'The prime mandate of the University is to provide Diploma, Graduate, Post-graduate and Doctorate level quality education in agriculture and allied sciences, fostering skill development, entrepreneurship, and producing competent human resources to lead sustainable agriculture.',
    mr: 'कृषि व संलग्न विद्याशाखांमध्ये पदविका, पदवी, पदव्युत्तर व आचार्य पदवी स्तरावर उच्च दर्जाचे शिक्षण देणे, कौशल्य विकास व उद्योजकतेला प्रोत्साहन देणे आणि शाश्वत शेतीसाठी सक्षम व तंत्रकुशल मनुष्यबळ निर्माण करणे हा विद्यापीठाचा मुख्य उद्देश आहे.'
  },
  nep2020: {
    title: {
      en: 'National Education Policy (NEP-2020) Implementation',
      mr: 'राष्ट्रीय शैक्षणिक धोरण (NEP-2020) अंमलबजावणी'
    },
    description: {
      en: 'In line with the VI Deans Committee recommendations of ICAR, MPKV Rahuri has successfully implemented the NEP-2020 framework from academic year 2024-25, and NCG recommendations for Post-Graduate programmes from 2022-23.',
      mr: 'भा.कृ.अनु.प. (ICAR) च्या ६ व्या अधिष्ठाता समितीच्या शिफारशींनुसार मफुकृवि राहुरीने शैक्षणिक वर्ष २०२४-२५ पासून पदवी अभ्यासक्रमात आणि २०२२-२३ पासून पदव्युत्तर अभ्यासक्रमात राष्ट्रीय शैक्षणिक धोरणाची प्रभावी अंमलबजावणी केली आहे.'
    },
    features: [
      {
        title: { en: 'Choice-Based Credit System (CBCS)', mr: 'निवड आधारित श्रेयांक पद्धती (CBCS)' },
        desc: { en: 'Multidisciplinary flexibility allowing students to choose elective skill tracks and interdisciplinary credits.', mr: 'विद्यार्थ्यांना त्यांच्या आवडीनुसार ऐच्छिक कौशल्य अभ्यासक्रम व आंतरविद्याशाखीय विषय निवडण्याची मुभा.' }
      },
      {
        title: { en: 'Multiple Entry & Exit Options', mr: 'एकाधिक प्रवेश व निर्गमन पर्याय' },
        desc: { en: 'Academic bank of credits enabling flexible educational pathways with recognized certificates and diplomas.', mr: 'शैक्षणिक श्रेयांक बँकेच्या (ABC) माध्यमातून लवचिक शिक्षण व प्रमाणपत्र/पदविका प्राप्त करण्याचे पर्याय.' }
      },
      {
        title: { en: 'Student READY & RAWE Programme', mr: 'स्टुडन्ट रेडी व ग्रामीण कृषि कार्यानुभव (RAWE)' },
        desc: { en: 'Hands-on semester-long rural agricultural attachment, industrial internships, and experiential learning modules.', mr: 'सहा महिन्यांचा प्रत्यक्ष ग्रामीण शेती कार्यानुभव, कृषोद्योग प्रशिक्षण व प्रात्यक्षिक उद्योजकता शिक्षण.' }
      },
      {
        title: { en: 'Skill Enhancement & Experiential Learning', mr: 'कौशल्य विकास व प्रायोगिक अध्ययन' },
        desc: { en: 'Commercial production units in bio-inputs, greenhouse farming, tissue culture, and seed processing.', mr: 'जैविक निविष्ठा, हरितगृह शेती, उती संवर्धन व प्रक्रिया उद्योगांमधील व्यावसायिक प्रात्यक्षिक युनिट्स.' }
      }
    ]
  },
  degreeLevels: [
    {
      level: 'Diploma',
      levelName: { en: 'Diploma Programmes', mr: 'पदविका अभ्यासक्रम' },
      duration: { en: '2 to 3 Years', mr: '२ ते ३ वर्षे' },
      eligibility: { en: '10th (SSC) Pass', mr: '१० वी उत्तीर्ण' },
      count: '82 Schools',
      description: {
        en: 'Agricultural Technology Schools (2-year Marathi medium) and Polytechnic Schools (3-year English medium) with 4,560 seats.',
        mr: '१० घटक व ७२ विनाअनुदानित कृषि तंत्र विद्यालये व तंत्रनिकेतनांतून ४,५६० प्रवेश क्षमतेसह पदविका शिक्षण.'
      },
      link: '/education/diploma'
    },
    {
      level: 'Bachelors',
      levelName: { en: 'Undergraduate (UG) Degrees', mr: 'पदवी अभ्यासक्रम (UG)' },
      duration: { en: '4 Years (8 Semesters)', mr: '४ वर्षे (८ सत्रावधी)' },
      eligibility: { en: '12th (HSC) Science with CET / NEET', mr: '१२ वी विज्ञान (CET / NEET)' },
      count: '6 Professional Degrees',
      description: {
        en: 'B.Sc. (Hons) Agriculture, Horticulture, B.Tech. (Agril. Engg), Biotechnology, Food Technology, and B.Sc. (Hons) Agri Business Management.',
        mr: 'कृषि, उद्यानविद्या, कृषि अभियांत्रिकी, जैवतंत्रज्ञान, अन्नतंत्रज्ञान आणि कृषि व्यवसाय व्यवस्थापन या ६ पदव्या.'
      },
      link: '/education/bachelors'
    },
    {
      level: 'Masters',
      levelName: { en: 'Post-Graduate (PG) Degrees', mr: 'पदव्युत्तर अभ्यासक्रम (PG)' },
      duration: { en: '2 Years (4 Semesters)', mr: '२ वर्षे (४ सत्रावधी)' },
      eligibility: { en: 'Relevant Bachelor\'s Degree with MCAER-CET', mr: 'संबंधित पदवी व MCAER-CET' },
      count: 'M.Sc. / M.Tech. / MBA',
      description: {
        en: 'Master’s programmes across 11 agricultural disciplines, 5 engineering streams, and specialized M.B.A. (Agri) at Pune.',
        mr: '११ कृषि शाखा, ५ कृषि अभियांत्रिकी विभाग आणि कृषि महाविद्यालय पुणे येथे एम.बी.ए. (कृषि) पदव्युत्तर शिक्षण.'
      },
      link: '/education/masters-doctoral'
    },
    {
      level: 'Doctoral',
      levelName: { en: 'Doctoral (Ph.D.) Research', mr: 'आचार्य पदवी (Ph.D.)' },
      duration: { en: '3 Years (6 Semesters)', mr: '३ वर्षे (६ सत्रावधी)' },
      eligibility: { en: 'Relevant Master\'s Degree with ICAR-JRF/SRF', mr: 'संबंधित पदव्युत्तर पदवी' },
      count: 'Ph.D. in 15+ Disciplines',
      description: {
        en: 'Advanced research degrees at Post Graduate Institute (PGI) Rahuri, Dr. ASCAET Rahuri, and Ph.D. in Agril. Meteorology at Pune.',
        mr: 'पदव्युत्तर संस्था राहुरी, डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय आणि पुणे येथे संशोधन पदवी.'
      },
      link: '/education/masters-doctoral'
    }
  ],
  infrastructure: [
    {
      title: { en: 'Hi-Tech Floriculture & Protected Cultivation Project', mr: 'हाय-टेक पुष्पशेती व संरक्षित शेती प्रकल्प' },
      location: { en: 'College of Agriculture, Pune', mr: 'कृषि महाविद्यालय, पुणे' },
      desc: { en: 'State-of-the-art climate-controlled polyhouses, gerbera, rose cultivation, and automation training facility.', mr: 'अत्याधुनिक हवामान नियंत्रित हरितगृहे, शेडनेट हाऊस व संरक्षित शेती प्रात्यक्षिक केंद्र.' },
      icon: 'Sprout'
    },
    {
      title: { en: 'Radioisotope & Nuclear Agricultural Laboratory', mr: 'रेडिओआयसोटोप व अणुऊर्जा कृषि प्रयोगशाळा' },
      location: { en: 'Central Campus, Rahuri', mr: 'मध्यवर्ती संकुल, राहुरी' },
      desc: { en: 'Advanced tracer studies, mutation breeding, and soil nutrient kinetics research.', mr: 'अणुऊर्जा संशोधन, किरणोत्सारी समस्थानिक व पोषकद्रव्य गतिशीलता अभ्यास सुविधा.' },
      icon: 'Atom'
    },
    {
      title: { en: 'Molecular Biology & Tissue Culture Center', mr: 'आण्विक जैवतंत्रज्ञान व उती संवर्धन केंद्र' },
      location: { en: 'Rahuri & Kashti Campuses', mr: 'राहुरी व काष्टी संकुल' },
      desc: { en: 'Commercial micropropagation of banana, sugarcane, and pomegranate rootstocks with virus indexing.', mr: 'केळी, डाळिंब व ऊस पिकांचे रोगमुक्त व दर्जेदार रोपे निर्मिती उती संवर्धन केंद्र.' },
      icon: 'Dna'
    },
    {
      title: { en: 'Post-Harvest Technology & Cold Chain Processing', mr: 'काढणीपश्चात तंत्रज्ञान व शीतगृह केंद्र' },
      location: { en: 'Central Campus, Rahuri', mr: 'मध्यवर्ती संकुल, राहुरी' },
      desc: { en: 'Pilot processing plants for fruits, vegetables, grains, value addition, and cold-chain storage.', mr: 'फळे व भाजीपाला प्रक्रिया प्रात्यक्षिक प्रकल्प, मूल्यवर्धन व गुणवत्ता नियंत्रण प्रयोगशाळा.' },
      icon: 'Warehouse'
    }
  ],
  leadership: {
    role: { en: 'Director of Instruction and Dean', mr: 'शिक्षण संचालक तथा अधिष्ठाता' },
    name: { en: 'Office of the Director of Instruction', mr: 'शिक्षण संचालक कार्यालय' },
    university: { en: 'Mahatma Phule Krishi Vidyapeeth, Rahuri', mr: 'महात्मा फुले कृषि विद्यापीठ, राहुरी' },
    message: {
      en: 'The Directorate of Instruction shoulders the crucial responsibility of academic leadership, curricula development, accreditation maintenance, and educational coordination across all constituent and affiliated colleges. Our goal is to empower young minds with scientific inquiry and technical expertise for sustainable agriculture.',
      mr: 'शिक्षण संचालनालय विद्यापीठाच्या सर्व घटक व संलग्न महाविद्यालये आणि तंत्र विद्यालयांमधील अभ्यासक्रम रचना, शैक्षणिक गुणवत्ता, अधिस्वीकृती आणि समन्वयाची जबाबदारी सांभाळते. कृषि क्षेत्राच्या शाश्वत विकासासाठी युवा पिढीला आधुनिक ज्ञान आणि कौशल्याने सुसज्ज करणे हे आमचे ध्येय आहे.'
    }
  },
  paragraphs: [
    {
      text: {
        en: 'Mahatma Phule Krishi Vidyapeeth, Rahuri is the first State Agriculture University in Maharashtra established in 1969 having its jurisdiction in 10 districts of Western Maharashtra. Director of Instruction shoulders the responsibility of leading the education of the University.',
        mr: 'महात्मा फुले कृषि विद्यापीठ, राहुरी हे महाराष्ट्रातील पहिले राज्य कृषि विद्यापीठ असून त्याची स्थापना २९ मार्च १९६८ रोजी झाली. विद्यापीठाचे कार्यक्षेत्र पश्चिम महाराष्ट्रातील १० जिल्ह्यांमध्ये पसरलेले असून शिक्षण संचालक विद्यापीठाच्या शैक्षणिक उपक्रमांचे नेतृत्व करतात.'
      },
      order: 1
    },
    {
      text: {
        en: 'The mandate is to provide Diploma, Graduate, Post-graduate and Doctorate level quality education in agriculture and allied fields for skill development and producing the competent human resource.',
        mr: 'कृषि व संलग्न विद्याशाखांमध्ये पदविका, पदवी, पदव्युत्तर व आचार्य पदवी स्तरावर उच्च दर्जाचे शिक्षण देणे, कौशल्य विकास साधणे आणि देशासाठी सक्षम कृषि मनुष्यबळ निर्माण करणे हा विद्यापीठाचा मुख्य उद्देश आहे.'
      },
      order: 2
    },
    {
      text: {
        en: 'The University offers various educational programmes viz., Under graduate [B.Sc. (Hons) Agriculture, B.Sc. (Hons) Horticulture, B. Tech. (Agricultural Engineering), B.Tech. (Biotechnology), B. Tech. (Food Technology) and B.Sc. (Hons) Agri. Business Management], Post-graduate (M.Sc. (Agri.) and Ph.D.), and Diploma in Agriculture.',
        mr: 'विद्यापीठामार्फत पदवी स्तरावर बी.एस्सी. (कृषि), बी.एस्सी. (उद्यानविद्या), बी.टेक. (कृषि अभियांत्रिकी), बी.टेक. (जैवतंत्रज्ञान), बी.टेक. (अन्नतंत्रज्ञान) व बी.एस्सी. (कृषि व्यवसाय व्यवस्थापन), पदव्युत्तर स्तरावर एम.एस्सी., एम.टेक., एम.बी.ए. आणि आचार्य पदवी (पीएच.डी.) चे शिक्षण दिले जाते.'
      },
      order: 3
    },
    {
      text: {
        en: 'The University has fourteen under-graduate constituent colleges out of which eight colleges of agriculture sciences located at Pune, Kolhapur, Dhule, Nandurbar, Karad, Muktainagar, Halgaon and Kashti, Malegaon; two agricultural engineering colleges at Rahuri and Kashti, Malegaon; two colleges for horticulture at Pune and Kashti; and one each agriculture business management and food technology college at Kashti, Malegaon.',
        mr: 'विद्यापीठाची १४ घटक महाविद्यालये असून यामध्ये पुणे, कोल्हापूर, धुळे, नंदुरबार, कराड, मुक्ताईनगर, हळगाव आणि काष्टी (मालेगाव) येथील ८ कृषि महाविद्यालये, राहुरी व काष्टी येथील २ कृषि अभियांत्रिकी महाविद्यालये, पुणे व काष्टी येथील २ उद्यानविद्या महाविद्यालये आणि काष्टी येथील अन्नतंत्रज्ञान व कृषि व्यवसाय व्यवस्थापन महाविद्यालयांचा समावेश आहे.'
      },
      order: 4
    },
    {
      text: {
        en: 'National Agricultural Education Accreditation Board (NAEAB) has granted accreditation to MPKV, Rahuri and its constituent colleges for five years (2023-24 to 2027-28) with an ‘A’ grade and score of 3.12 out of 4.0.',
        mr: 'राष्ट्रीय कृषि शिक्षण अधिस्वीकृती मंडळ (NAEAB - भा.कृ.अनु.प.) द्वारे मफुकृवि राहुरी आणि तिच्या घटक महाविद्यालयांना २०२३-२४ ते २०२७-२८ या ५ वर्षांच्या कालावधीसाठी ४ पैकी ३.१२ गुणांसह ‘अ’ (A) श्रेणी अधिस्वीकृती प्रदान करण्यात आली आहे.'
      },
      order: 5
    },
    {
      text: {
        en: 'Since inception, the University has produced more than one lakh skilled human resource engaged in various public, private, administrative, and research agricultural sectors globally.',
        mr: 'स्थापनेपासून आतापर्यंत विद्यापीठाने १ लाखांपेक्षा अधिक पदवीधर व तंत्रकुशल मनुष्यबळ घडविले असून ते शासकीय, प्रशासकीय, संशोधन, बँकिंग आणि कॉर्पोरेट कृषी क्षेत्रात राष्ट्रीय व आंतरराष्ट्रीय स्तरावर उल्लेखनीय योगदान देत आहेत.'
      },
      order: 6
    }
  ]
};

// 2. Data for education-organizational-profile
const profileData = {
  slug: 'education-organizational-profile',
  url: 'https://mpkv.ac.in/Education/EduProfile',
  route: '/education/profile',
  sourcePage: 'Education/EduProfile',
  scrapedAt: new Date().toISOString(),
  title: {
    en: 'Organizational Profile',
    mr: 'संस्थात्मक संरचना व प्रशासन'
  },
  menuId: 'menu_education',
  parentMenu: {
    id: 'menu_education',
    title: { en: 'Education', mr: 'शिक्षण' }
  },
  submenuGroup: {
    en: 'Overview & Profile',
    mr: 'संस्थेची माहिती व रूपरेषा'
  },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Overview & Profile', mr: 'संस्थेची माहिती व रूपरेषा' }, href: '/education/at-a-glance' },
    { title: { en: 'Organizational Profile', mr: 'संस्थात्मक संरचना' }, href: '/education/profile' }
  ],
  hero: {
    title: {
      en: 'Academic Leadership & Governance Framework',
      mr: 'शैक्षणिक प्रशासन व संस्थात्मक संरचना'
    },
    subtitle: {
      en: 'Structured academic governance under the Directorate of Instruction, Board of Studies, Academic Council, and Faculty Deans.',
      mr: 'शिक्षण संचालनालय, विद्या परिषद, अभ्यास मंडळे आणि अधिष्ठाता यांच्या समन्वयातून चालणारी विद्यापीठाची शैक्षणिक प्रशासन व्यवस्था.'
    },
    badge: {
      en: 'Directorate of Instruction & Faculty Deans',
      mr: 'शिक्षण संचालनालय व विद्याशाखा प्रशासन'
    }
  },
  leadershipProfile: {
    designation: { en: 'Director of Instruction and Dean (Agriculture)', mr: 'शिक्षण संचालक तथा अधिष्ठाता (कृषि)' },
    office: { en: 'Directorate of Instruction, MPKV Rahuri, Dist. Ahilyanagar - 413722', mr: 'शिक्षण संचालनालय, मफुकृवि राहुरी, जि. अहिल्यानगर - ४१३७२२' },
    email: 'dean.mpkv@nic.in',
    phone: '02426-243208',
    roles: [
      {
        en: 'Formulating academic policies, regulations, and curricula for all constituent and affiliated colleges.',
        mr: 'सर्व घटक व संलग्न महाविद्यालयांसाठी शैक्षणिक धोरणे, नियमावली व अभ्यासक्रम तयार करणे.'
      },
      {
        en: 'Coordinating undergraduate, post-graduate, doctoral, and diploma programmes in line with ICAR standards.',
        mr: 'भा.कृ.अनु.प. च्या मानकांनुसार पदवी, पदव्युत्तर, आचार्य पदवी व पदविका अभ्यासक्रमांचे संचलन.'
      },
      {
        en: 'Convening the Academic Council, Board of Studies, and overseeing semester examination systems.',
        mr: 'विद्या परिषद व अभ्यास मंडळांच्या बैठकांचे आयोजन आणि सत्रांत परीक्षा प्रणालीवर देखरेख.'
      },
      {
        en: 'Monitoring quality assurance, NAEAB accreditation, and faculty development training programmes.',
        mr: 'शैक्षणिक गुणवत्ता हमी, नॅक/आयसीएआर अधिस्वीकृती आणि प्राध्यापक प्रशिक्षण उपक्रमांचे सनियंत्रण.'
      }
    ]
  },
  governanceBodies: [
    {
      title: { en: 'Academic Council (विद्या परिषद)', mr: 'विद्या परिषद (Academic Council)' },
      desc: { en: 'Supreme academic authority responsible for prescribing courses, academic regulations, admissions, and awarding degrees.', mr: 'विद्यापीठाची सर्वोच्च शैक्षणिक संस्था — अभ्यासक्रम, नियम, प्रवेश व पदवी वितरणाचे सर्व निर्णय घेणारी अधिकृत परिषद.' },
      members: { en: 'Vice-Chancellor (Chairman), Director of Instruction, Deans, Associate Deans, Professors, and ICAR Nominees', mr: 'मा. कुलगुरू (अध्यक्ष), शिक्षण संचालक, सर्व अधिष्ठाता, सहयोगी अधिष्ठाता व प्राध्यापक प्रतिनिधी' }
    },
    {
      title: { en: 'Board of Studies (अभ्यास मंडळ)', mr: 'अभ्यास मंडळे (Board of Studies)' },
      desc: { en: 'Subject-specific bodies drafting syllabi, course credits, laboratory manuals, and examination standards.', mr: 'प्रत्येक विषयानुसार अभ्यासक्रम, श्रेयांक, प्रात्यक्षिक नियमावली व परीक्षा पद्धती तयार करणारी तज्ज्ञ मंडळे.' },
      members: { en: 'Head of Departments, Senior Professors, and External Academic Experts', mr: 'संबंधित विभागप्रमुख, ज्येष्ठ प्राध्यापक व बाह्य तज्ज्ञ' }
    },
    {
      title: { en: 'Faculty of Agriculture (कृषि विद्याशाखा)', mr: 'कृषि विद्याशाखा (Faculty of Agriculture)' },
      desc: { en: 'Coordinates 11 academic departments, 8 constituent agriculture colleges, and PG Institute research.', mr: '११ शैक्षणिक विभाग, ८ घटक कृषि महाविद्यालये व पदव्युत्तर संशोधन केंद्रांचे शैक्षणिक समन्वय.' },
      members: { en: 'Dean (Faculty of Agriculture), Heads of Departments, and Academic Staff', mr: 'अधिष्ठाता (कृषि), सर्व विभागप्रमुख व प्राध्यापकवृंद' }
    },
    {
      title: { en: 'Faculty of Agricultural Engineering (अभियांत्रिकी विद्याशाखा)', mr: 'कृषि अभियांत्रिकी विद्याशाखा' },
      desc: { en: 'Directs engineering education across Dr. ASCAET Rahuri and Kashti colleges in 5 specialized branches.', mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी महाविद्यालय राहुरी व काष्टी येथील ५ अभियांत्रिकी शाखांचे समन्वय.' },
      members: { en: 'Associate Dean (Dr. ASCAET) and Division Heads', mr: 'सहयोगी अधिष्ठाता व सर्व अभियांत्रिकी विभागप्रमुख' }
    }
  ]
};

// 3. Data for education-thrust-areas
const thrustData = {
  slug: 'education-thrust-areas',
  url: 'https://mpkv.ac.in/Education/EduThrustAreas',
  route: '/education/thrust-areas',
  sourcePage: 'Education/EduThrustAreas',
  scrapedAt: new Date().toISOString(),
  title: {
    en: 'Educational Thrust Areas',
    mr: 'शैक्षणिक प्राधान्यक्रम'
  },
  menuId: 'menu_education',
  parentMenu: {
    id: 'menu_education',
    title: { en: 'Education', mr: 'शिक्षण' }
  },
  submenuGroup: {
    en: 'Overview & Profile',
    mr: 'संस्थेची माहिती व रूपरेषा'
  },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Overview & Profile', mr: 'संस्थेची माहिती व रूपरेषा' }, href: '/education/at-a-glance' },
    { title: { en: 'Thrust Areas', mr: 'शैक्षणिक प्राधान्यक्रम' }, href: '/education/thrust-areas' }
  ],
  hero: {
    title: {
      en: 'Strategic Educational Thrust Areas & Priorities',
      mr: 'उच्च कृषि शिक्षणातील धोरणात्मक प्राधान्यक्रम'
    },
    subtitle: {
      en: 'Core strategic pillars driving quality, global competence, digital education, and entrepreneurship across all MPKV colleges.',
      mr: 'गुणवत्ता, जागतिक स्पर्धाक्षमता, डिजिटल शिक्षण आणि कृषोद्योजकतेला गती देणारे विद्यापीठाचे मुख्य प्राधान्यक्रम.'
    },
    badge: {
      en: '16 Key Strategic Pillars for Quality Agriculture Education',
      mr: 'गुणवत्तापूर्ण कृषि शिक्षणासाठी १६ मुख्य प्राधान्य क्षेत्रे'
    }
  },
  thrustPillars: [
    {
      id: '01',
      title: { en: 'Quality Assurance & Curricula Modernization', mr: 'गुणवत्ता हमी व अभ्यासक्रम आधुनिकीकरण' },
      desc: { en: 'Periodic curriculum revision as per ICAR Deans Committee recommendations and NAEAB accreditation standards.', mr: 'भा.कृ.अनु.प. च्या शिफारशींनुसार अभ्यासक्रमांची वेळोवेळी पुनर्रचना आणि नॅक/आयसीएआर मानांकन राखणे.' },
      icon: 'ShieldCheck'
    },
    {
      id: '02',
      title: { en: 'National & Global Academic Linkages', mr: 'राष्ट्रीय व आंतरराष्ट्रीय शैक्षणिक सहकार्य' },
      desc: { en: 'Collaborations with premier global universities for dual-degree programmes, student and faculty exchange.', mr: 'विद्यार्थी व प्राध्यापक देवाणघेवाण, दुहेरी पदवी आणि संयुक्त संशोधनासाठी नामांकित संस्थांशी सामंजस्य करार.' },
      icon: 'Globe'
    },
    {
      id: '03',
      title: { en: 'Digital Agriculture & ICT in Education', mr: 'डिजिटल शेती व माहिती तंत्रज्ञानाचा वापर' },
      desc: { en: 'Smart digital classrooms, virtual laboratories, AI in crop diagnostics, and computer-based examination systems.', mr: 'स्मार्ट वर्गखोल्या, आभासी प्रयोगशाळा, कृत्रिम बुद्धिमत्ता (AI) आधारित शिक्षण आणि संगणकीय परीक्षा पद्धती.' },
      icon: 'Laptop'
    },
    {
      id: '04',
      title: { en: 'Student READY & Industrial Interface', mr: 'स्टुडन्ट रेडी व कृषोद्योग सहकार्य' },
      desc: { en: 'Experiential learning modules and rural agricultural work experience bridging academia with agri-business.', mr: 'ग्रामीण कृषि कार्यानुभव आणि प्रत्यक्ष कृषोद्योग इंटर्नशिपच्या माध्यमातून विद्यार्थ्यांमध्ये उद्योजकता रुजविणे.' },
      icon: 'Briefcase'
    },
    {
      id: '05',
      title: { en: 'Modernization of University Instructional Farms', mr: 'विद्यापीठ शैक्षणिक प्रक्षेत्रांचे आधुनिकीकरण' },
      desc: { en: 'Automated drip fertigation, precision agriculture implements, and sensor-based polyhouse training units.', mr: 'स्वयंचलित ठिबक सिंचन, आधुनिक अवजारे आणि सेन्सर-आधारित हरितगृहांद्वारे प्रात्यक्षिक प्रक्षेत्र आधुनिकीकरण.' },
      icon: 'Sprout'
    },
    {
      id: '06',
      title: { en: 'Gender Mainstreaming & Student Welfare', mr: 'स्त्री-समानता व विद्यार्थी कल्याण' },
      desc: { en: 'Modern girls’ hostels, gymnasiums, sports complexes, and comprehensive healthcare amenities on all campuses.', mr: 'सर्व संकुलांमध्ये सुसज्ज मुलींची वसतिगृहे, क्रीडा संकुले, व्यायामशाळा आणि आरोग्य सुविधांची निर्मिती.' },
      icon: 'HeartHandshake'
    },
    {
      id: '07',
      title: { en: 'Faculty Competence & Pedagogical Excellence', mr: 'प्राध्यापक सक्षमीकरण व अध्यापन उत्कृष्टता' },
      desc: { en: 'Summer/Winter schools, refresher courses, Centre of Advanced Studies (CAS), and National Best Teacher awards.', mr: 'प्रगत अभ्यास केंद्र (CAS), उन्हाळी/हिवाळी शाळा, पुनश्चर्या वर्ग आणि उत्कृष्ट प्राध्यापक पुरस्कार प्रोत्साहन.' },
      icon: 'Award'
    },
    {
      id: '08',
      title: { en: 'Digital Library Strengthening & CeRA Access', mr: 'डिजिटल ग्रंथालय सक्षमीकरण व CeRA उपलब्धता' },
      desc: { en: '24x7 digital e-resources, RFID automation, and institutional access to Consortium for e-Resources in Agriculture.', mr: '२४x७ डिजिटल ई-पुस्तके, आरएफआयडी ग्रंथालय व्यवस्थापन आणि आंतरराष्ट्रीय शोधपत्रिकांची उपलब्धता.' },
      icon: 'BookOpen'
    }
  ]
};

// 4. Data for education-academic-regulations
const regData = {
  slug: 'education-academic-regulations',
  url: 'https://mpkv.ac.in/Education/EduAcademicRegulations',
  route: '/education/regulations',
  sourcePage: 'Education/EduAcademicRegulations',
  scrapedAt: new Date().toISOString(),
  title: {
    en: 'Academic Regulations & Rules',
    mr: 'शैक्षणिक नियमावली व परीक्षा पद्धती'
  },
  menuId: 'menu_education',
  parentMenu: {
    id: 'menu_education',
    title: { en: 'Education', mr: 'शिक्षण' }
  },
  submenuGroup: {
    en: 'Overview & Profile',
    mr: 'संस्थेची माहिती व रूपरेषा'
  },
  breadcrumb: [
    { title: { en: 'Home', mr: 'मुख्यपृष्ठ' }, href: '/' },
    { title: { en: 'Education', mr: 'शिक्षण' }, href: '/education/at-a-glance' },
    { title: { en: 'Overview & Profile', mr: 'संस्थेची माहिती व रूपरेषा' }, href: '/education/at-a-glance' },
    { title: { en: 'Academic Regulations', mr: 'शैक्षणिक नियमावली' }, href: '/education/regulations' }
  ],
  hero: {
    title: {
      en: 'Comprehensive Academic Guidelines & Examination Rules',
      mr: 'सर्वसमावेशक शैक्षणिक नियमावली व परीक्षा नियम'
    },
    subtitle: {
      en: 'Official rules governing admissions, credit systems, grading scales, attendance, examinations, and student discipline.',
      mr: 'प्रवेश, श्रेयांक पद्धती, परीक्षा मूल्यमापन, हजेरी नियम आणि शिस्तविषयक अधिकृत नियमावली.'
    },
    badge: {
      en: 'Approved by the Academic Council & ICAR Guidelines',
      mr: 'विद्या परिषद व भा.कृ.अनु.प. मान्यताप्राप्त नियमावली'
    }
  },
  regulationModules: [
    {
      id: 'credits',
      title: { en: 'Credit Hours & Semester System', mr: 'श्रेयांक पद्धती व सत्रावधी' },
      icon: 'BookOpen',
      points: [
        {
          en: 'Academic Year is divided into two semesters, each comprising a minimum of 110 working days.',
          mr: 'शैक्षणिक वर्ष दोन सत्रांमध्ये विभागलेले असून प्रत्येक सत्रात किमान ११० कामकाजाचे दिवस अनिवार्य असतात.'
        },
        {
          en: 'One Credit represents one hour of theory lecture or 2 hours of laboratory/practical fieldwork per week.',
          mr: '१ श्रेयांक (Credit) म्हणजे दर आठवड्याला १ तास व्याख्यान किंवा २ तास प्रयोगशाळा/शेत प्रात्यक्षिक.'
        },
        {
          en: 'UG students must complete the prescribed credit load (approx. 160–180 credits) across 8 semesters.',
          mr: 'पदवी विद्यार्थ्यांसाठी ८ सत्रांतर्गत सुमारे १६० ते १८० श्रेयांक यशस्वीरीत्या पूर्ण करणे बंधनकारक आहे.'
        }
      ]
    },
    {
      id: 'attendance',
      title: { en: 'Attendance & Examination Eligibility', mr: 'हजेरी व परीक्षा पात्रता' },
      icon: 'UserCheck',
      points: [
        {
          en: 'Minimum 80% attendance in both theory and practicals separately is mandatory to appear for semester end examinations.',
          mr: 'सत्रांत परीक्षेसाठी प्रत्येक विषयाच्या लेखी व प्रात्यक्षिक वर्गात स्वतंत्रपणे किमान ८०% हजेरी असणे अनिवार्य आहे.'
        },
        {
          en: 'In genuine medical illness or official university sports/NSS deputation, a condolence up to 10% may be granted by Dean.',
          mr: 'वैद्यकीय कारणे किंवा अधिकृत क्रीडा/रासेयो सहभागासाठी अधिष्ठात्यांच्या मान्यतेने कमाल १०% सवलत दिली जाऊ शकते.'
        },
        {
          en: 'Students falling below 70% attendance are treated as deregistered and must re-register the course when offered.',
          mr: '७०% पेक्षा कमी हजेरी असणाऱ्या विद्यार्थ्यांना त्या विषयातून वगळले जाते व त्यांना तो विषय पुन्हा लावावा लागतो.'
        }
      ]
    },
    {
      id: 'grading',
      title: { en: 'Grading Scale & CGPA Calculation', mr: 'गुणदान पद्धती व CGPA सूत्र' },
      icon: 'Award',
      points: [
        {
          en: '10-point scale grading system: Grade Point = Marks obtained out of 100 divided by 10.',
          mr: '१०-गुणी मूल्यमापन पद्धती: १०० पैकी मिळालेल्या गुणांना १० ने भागून ग्रेड पॉईंट निश्चित केला जातो.'
        },
        {
          en: 'Minimum Grade Point required to pass a course is 5.00 out of 10.00 for UG and 6.50 for PG/Ph.D.',
          mr: 'विषय उत्तीर्ण होण्यासाठी पदवी स्तरावर किमान ५.०० ग्रेड पॉईंट आणि पदव्युत्तर/पीएच.डी. स्तरावर ६.५० गुण आवश्यक आहेत.'
        },
        {
          en: 'Overall Grade Point Average (OGPA) of 6.00 and above qualifies for Second Class; 7.00+ for First Class; 8.00+ for Distinction.',
          mr: 'OGPA ६.०० वर द्वितीय श्रेणी, ७.०० वर प्रथम श्रेणी आणि ८.०० पेक्षा जास्त गुणांवर विशेष प्रावीण्य (Distinction) दिले जाते.'
        }
      ]
    },
    {
      id: 'conduct',
      title: { en: 'Student Code of Conduct & Anti-Ragging', mr: 'विद्यार्थी आचारसंहिता व रॅगिंग प्रतिबंध' },
      icon: 'ShieldCheck',
      points: [
        {
          en: 'Zero tolerance for ragging under Maharashtra Prohibition of Ragging Act, 1999 with immediate police reporting & expulsion.',
          mr: 'महाराष्ट्र रॅगिंग प्रतिबंधक कायदा १९९९ नुसार रॅगिंगला पूर्णतः बंदी असून गुन्हा सिद्ध झाल्यास तात्काळ निष्कासन व पोलीस कारवाई होते.'
        },
        {
          en: 'Mandatory anti-ragging affidavit submission on UGC/ICAR portal during admission registration.',
          mr: 'प्रवेशाच्या वेळी प्रत्येक विद्यार्थ्याने व पालकांनी यूजीसी/आयसीएआर पोर्टलवर रॅगिंगविरोधी प्रतिज्ञापत्र देणे सक्तीचे आहे.'
        },
        {
          en: 'College Anti-Ragging Squad conducts 24x7 surprise checks in hostels, messes, and campus premises.',
          mr: 'महाविद्यालयीन अँटी-रॅगिंग पथकामार्फत वसतिगृहे, मेस व संकुलात २४x७ नियमित व आकस्मिक तपासणी केली जाते.'
        }
      ]
    }
  ]
};

// Write files to web and src directories
const writeTargets = [
  path.join(__dirname, '../web/src/data/scraped/pages'),
  path.join(__dirname, '../src/data/scraped/pages')
];

writeTargets.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  fs.writeFileSync(path.join(dir, 'education-at-a-glance.json'), JSON.stringify(glanceData, null, 2), 'utf8');
  fs.writeFileSync(path.join(dir, 'education-organizational-profile.json'), JSON.stringify(profileData, null, 2), 'utf8');
  fs.writeFileSync(path.join(dir, 'education-thrust-areas.json'), JSON.stringify(thrustData, null, 2), 'utf8');
  fs.writeFileSync(path.join(dir, 'education-academic-regulations.json'), JSON.stringify(regData, null, 2), 'utf8');
  console.log(`Successfully enriched Education data in ${dir}`);
});

console.log('All Education page data enriched successfully!');
