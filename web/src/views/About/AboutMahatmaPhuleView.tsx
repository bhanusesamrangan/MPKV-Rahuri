'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Flame,
  GraduationCap,
  Heart,
  Home,
  Info,
  Layers,
  MapPin,
  Printer,
  Quote,
  Scroll,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Users,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface AboutMahatmaPhuleViewProps {
  pageData?: any;
}

export const AboutMahatmaPhuleView: React.FC<AboutMahatmaPhuleViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const { isSpeaking, speakContent, stopSpeech } = useAccessibility();
  const [activeTab, setActiveTab] = useState<'all' | 'life' | 'education' | 'social' | 'agriculture' | 'literature'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleSpeech = () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      const speechText = language === 'mr'
        ? 'क्रांतीसूर्य महात्मा जोतीराव फुले. शेतकऱ्यांचे कैवारी, स्त्री शिक्षणाचे आद्य प्रणेते आणि सत्यशोधक समाजाचे संस्थापक. महात्मा फुले कृषी विद्यापीठ राहुरी.'
        : 'About Mahatma Jyotirao Phule. Champion of Indian farmers, pioneer of women\'s education, and founder of Satyashodhak Samaj. Mahatma Phule Krishi Vidyapeeth Rahuri.';
      speakContent(speechText);
    }
  };

  // Structured thematic sections representing all 13 scraped lists and historical archival records
  const biographicalThemes = [
    {
      id: 'life',
      title: {
        en: '1. Life, Lineage & The Bestowal of "Mahatma" Title',
        mr: '१. जीवन, घराणे व "महात्मा" पदवीचा गौरव',
      },
      tag: { en: 'Early Life & Title', mr: 'जीवनपट व पदवी' },
      icon: Award,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      points: [
        {
          en: 'Long before Mahatma Gandhi was given the title of Mahatma, there was another visionary social reformer on whom the title of Mahatma was bestowed.',
          mr: 'महात्मा गांधींना "महात्मा" ही पदवी मिळण्यापूर्वी कित्येक वर्षे आधी महाराष्ट्रातील क्रांतीसूर्य जोतीराव फुले यांना जनतेने "महात्मा" पदवीने गौरविले होते.',
        },
        {
          en: 'Jyotirao Govindrao Phule was born in 1827 in Katgun, Satara district of Maharashtra to Govindrao and Chimnabai.',
          mr: 'जोतीराव गोविंदराव फुले यांचा जन्म सन १८२७ मध्ये सातारा जिल्ह्यातील कटगुण येथे गोविंदराव आणि चिमणाबाई यांच्या पोटी झाला.',
        },
        {
          en: 'The family belonged to the \'Mali\' community and their ancestral surname was \'Gorhay\'. As his father and uncles served as successful florists, the family became popularly known as \'Phule\'.',
          mr: 'त्यांचे मूळ घराणे \'गोरहे\' आडनावाचे होते. त्यांचे वडील व चुलते फुलांचा व्यवसाय करत असल्याने त्यांना \'फुले\' हे नाव पडले.',
        },
        {
          en: 'He was married at the age of 13 to Savitribai (daughter of Khandoji Nevse Patil of Naigaon), who became his revolutionary partner in every sphere of social transformation.',
          mr: 'वयाच्या १३ व्या वर्षी त्यांचा विवाह नायगावच्या खंडोजी नेवसे पाटील यांच्या कन्या सावित्रीबाई यांच्याशी झाला, ज्या त्यांच्या सर्व सामाजिक क्रांतीत अखंड सोबती राहिल्या.',
        },
        {
          en: 'Completed his English schooling from the Scottish Mission High School in Pune in 1847, where he befriended Sadashiv Ballal Govande, a lifelong associate.',
          mr: 'पुण्यातील स्कॉटिश मिशन हायस्कूलमधून त्यांनी १८४७ मध्ये इंग्रजी शिक्षण पूर्ण केले; तेथे त्यांचे सदाशिव बल्लाळ गोवंडे यांच्याशी आयुष्यभराचे दृढ मैत्र जुळले.',
        },
        {
          en: 'Apart from being a philosopher and activist, Phule was an enterprising contractor and cultivator. He was nominated Municipal Commissioner of Poona Municipality in 1876 and served diligently until 1883.',
          mr: 'तत्वज्ञ व समाजसुधारक असण्यासोबतच ते निष्णात कंत्राटदार व प्रगत शेतकरी होते. १८७६ ते १८८३ या काळात त्यांनी पुणे नगरपालिकेचे नियुक्त सदस्य (म्युनिसिपल कमिशनर) म्हणून जनहितैषी कार्य केले.',
        },
        {
          en: 'On May 11, 1888, at a mammoth public convention in Mandvi, Mumbai, renowned social reformer Rao Bahadur Vithalrao Krishnaji Vandekar formally conferred upon him the title of "Mahatma" on behalf of the public.',
          mr: '११ मे १८८८ रोजी मुंबईतील मांडवी कोळीवाडा येथे आयोजित विराट सभेत रावबहादूर विठ्ठलराव कृष्णाजी वंडेकर यांनी जनतेच्या वतीने जोतीरावांना "महात्मा" ही पदवी सन्मानपूर्वक बहाल केली.',
        },
      ],
    },
    {
      id: 'education',
      title: {
        en: '2. Pioneer of Women’s Education & The First Native Girls’ School',
        mr: '२. स्त्री शिक्षणाची गंगोत्री व देशातील पहिली मुलींची शाळा',
      },
      tag: { en: 'Girls\' Education', mr: 'स्त्री शिक्षण' },
      icon: GraduationCap,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      points: [
        {
          en: 'Mahatma Phule firmly recognized that lower castes and women were the most deprived sections of Indian society, and education was the sole weapon for their emancipation.',
          mr: 'शूद्र, अतिशूद्र आणि स्त्रिया या समाजातील सर्वाधिक वंचित घटकांचे कल्याण केवळ आणि केवळ शिक्षणानेच होऊ शकते, हा दृढ सिद्धांत त्यांनी मांडला.',
        },
        {
          en: 'Against severe orthodox societal opposition, Jyotirao first educated his wife Savitribai at home, empowering her to become India’s very first woman teacher and headmistress.',
          mr: 'सनातनी व्यवस्थेचा प्रचंड विरोध पत्करून जोतीरावांनी प्रथम आपल्या पत्नी सावित्रीबाईंना घरात शिक्षित केले आणि त्यांना देशातील पहिल्या महिला शिक्षिका व मुख्याध्यापिका बनवले.',
        },
        {
          en: 'In August 1848, the couple established India’s very first indigenously-run school for girls at Bhide Wada in Budhwar Peth, Pune.',
          mr: 'ऑगस्ट १८४८ मध्ये या दांपत्याने पुण्यातील बुधवार पेठ येथील भिडे वाड्यात देशी भारतीयांद्वारे चालवली जाणारी देशातील पहिली मुलींची शाळा स्थापन केली.',
        },
        {
          en: 'Together with associates like Fatima Begum Sheikh (India’s first Muslim woman teacher), they expanded educational centers across Pune, opening 18 schools for girls and depressed classes.',
          mr: 'देशातील पहिल्या मुस्लिम शिक्षिका फातिमा शेख यांच्या सहकार्याने त्यांनी पुण्यात मुली व वंचित घटकांसाठी एकूण १८ शाळा यशस्वीरीत्या सुरू केल्या.',
        },
        {
          en: 'Opened dedicated night schools for adult working-class laborers and agricultural cultivators in 1855 so that daily wage earners could achieve literacy.',
          mr: 'दिवसभर शेतात व मजुरीवर राबणाऱ्या कष्टकरी शेतकरी-कामगारांसाठी १८५५ मध्ये देशातील पहिली \'रात्रशाळा\' सुरू केली.',
        },
        {
          en: 'Savitribai published iconic poetic treatises "Kavya Phule" (1854) and "Bavan Kashi Subodh Ratnakar" (1892), featuring the celebrated call "Go, Get Education!".',
          mr: 'सावित्रीबाईंनी "काव्यफुले" (१८५४) व "बावनकशी सुबोध रत्नाकर" (१८९२) हे काव्यसंग्रह प्रसिद्ध केले, ज्यातील "शिका, संघटित व्हा" हा संदेश क्रांतीची हाक ठरला.',
        },
      ],
    },
    {
      id: 'social',
      title: {
        en: '3. Satyashodhak Samaj & The Crusade Against Untouchability',
        mr: '३. सत्यशोधक समाज व सामाजिक समतेचा लढा',
      },
      tag: { en: 'Satyashodhak Movement', mr: 'सत्यशोधक चळवळ' },
      icon: Users,
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      points: [
        {
          en: 'On September 24, 1873, Mahatma Phule founded the historic "Satyashodhak Samaj" (Society of Seekers of Truth) to liberate oppressed classes from Brahminical dogmatism and promote rationalist humanism.',
          mr: '२४ सप्टेंबर १८७३ रोजी महात्मा फुले यांनी सामाजिक गुलामगिरी, अंधश्रद्धा व वर्णव्यवस्थेला आव्हान देत "सत्यशोधक समाजा"ची ऐतिहासिक स्थापना केली.',
        },
        {
          en: 'Savitribai Phule was elected Head of the Women’s Wing of the Satyashodhak Samaj, steering women-led anti-caste conventions.',
          mr: 'क्रांतीज्योती सावित्रीबाई फुले यांनी सत्यशोधक समाजाच्या महिला विभागाचे नेतृत्व करत स्त्रियांच्या हक्कांसाठी मोहीम राबवली.',
        },
        {
          en: 'In 1863, Phule founded the "Balhatya Pratibandhak Griha" (Infanticide Prohibition Home)—the first indigenous orphanage in India safeguarding pregnant widows and their infants.',
          mr: '१८६३ मध्ये त्यांनी "बालहत्या प्रतिबंधक गृह" स्थापन केले; विधवा स्त्रियांच्या सुरक्षित बाळंतपणाची सोय करून बालहत्या रोखणारे हे देशातील पहिले केंद्र ठरले.',
        },
        {
          en: 'Savitribai and Jyotirao adopted Yashwantrao, a child born to a Brahmin widow Kashibai, raising and educating him to become a dedicated doctor.',
          mr: 'काशीबाई या ब्राह्मण विधवेच्या यशवंत नावाच्या अर्भकाला त्यांनी दत्तक घेऊन वैद्यकीय शिक्षण दिले आणि त्याला डॉक्टर बनवले.',
        },
        {
          en: 'In 1868, Phule opened his private domestic water reservoir (Haud) to untouchables, striking a historic blow against ritual water untouchability decades before Mahad Satyagraha.',
          mr: '१८६८ मध्ये त्यांनी आपल्या स्वतःच्या घरातील पाण्याचा हौद अस्पृश्यांसाठी खुला करून देशात जलसमतेचा पाया घातला.',
        },
        {
          en: 'Pioneered priest-less simplified wedding rituals ("Satyashodhak Vivah") affirming equal pledges between bride and groom, which was later upheld as lawful by the Bombay High Court.',
          mr: 'मध्यस्थ पुरोहितांशिवाय सत्यशोधक विवाह पद्धत सुरू केली, ज्यास पुढे मुंबई उच्च न्यायालयानेही कायदेशीर मान्यता दिली.',
        },
        {
          en: 'Coined and introduced the Marathi term "Dalit" (meaning broken, crushed, or ground down) to define the legally oppressed classes—a term later globally recognized.',
          mr: 'शोषित-वंचित बांधवांच्या स्थितीचे वर्णन करण्यासाठी सर्वप्रथम "दलित" हा शब्द त्यांनी वापरात आणला, ज्याने पुढे जागतिक पातळीवर स्थान मिळवले.',
        },
      ],
    },
    {
      id: 'agriculture',
      title: {
        en: '4. Agrarian Economics & "Shetkaryacha Asud" (Cultivator’s Whipcord)',
        mr: '४. कृषी अर्थशास्त्र व "शेतकऱ्यांचा आसूड" मधील शेती विचार',
      },
      tag: { en: 'Agrarian Vision', mr: 'कृषी विचार' },
      icon: Sprout,
      badgeColor: 'bg-green-100 text-green-900 border-green-300',
      points: [
        {
          en: 'Mahatma Phule is revered as the foremost Pioneer of Indian Agrarian Economics. In his monumental 1881 treatise "Shetkaryacha Asud" (The Cultivator’s Whipcord), he systematically unmasked rural exploitation.',
          mr: 'महात्मा जोतीराव फुले हे आधुनिक भारताच्या कृषी अर्थशास्त्राचे आद्य प्रणेते मानले जातात. १८८१ च्या "शेतकऱ्यांचा आसूड" या ग्रंथात त्यांनी शेतकरी शोषणाची कारणे स्पष्ट केली.',
        },
        {
          en: 'Propounded the iconic cause-and-effect principle: "विद्येविना मती गेली, मतीविना नीती गेली, नीतीविना गती गेली, गतीविना वित्त गेले, वित्ताविना शूद्र खचले, इतके अनर्थ एका अविद्येने केले!"',
          mr: '"विद्येविना मती गेली, मतीविना नीती गेली, नीतीविना गती गेली, गतीविना वित्त गेले, वित्ताविना शूद्र खचले, इतके अनर्थ एका अविद्येने केले!" हे अजरामर सूत्र मांडले.',
        },
        {
          en: 'Demanded state-funded canal networks, catchment dams, bunding for rainwater harvesting, check-dams, and subsidized tube wells long before modern irrigation projects.',
          mr: 'नद्यांवर धरणे, पाझर तलाव, कालवे, शेतात चर खोदणे आणि शेतीसाठी मुबलक पाणीसाठ्याची वैधानिक मागणी त्यांनी ब्रिटिश सरकारकडे लावून धरली.',
        },
        {
          en: 'Advocated scientific agricultural colleges, experimental research farms, modern farm machinery, hybrid livestock breeding, and direct farmer-friendly extension education.',
          mr: 'शेतकऱ्यांच्या मुलांना कृषी शिक्षणासाठी महाविद्यालये, संशोधन प्रक्षेत्रे, सुधारित बी-बियाणे, शेती अवजारे व जातिवंत जनावरांच्या संगोपनाचा आग्रह धरला.',
        },
        {
          en: 'His relentless mobilization of Western Maharashtra peasantry compelled the British Raj to enact the Deccan Agriculturists’ Relief Act (Agriculture Act) protecting farmers from predatory moneylenders.',
          mr: 'त्यांच्या शेतकरी आंदोलनांमुळेच ब्रिटिश शासनाला \'डेक्कन ॲग्रिकल्चरिस्ट्स रिलीफ ॲक्ट\' (कृषी कायदा) संमत करून शेतकऱ्यांना सावकारी पाशातून दिलासा द्यावा लागला.',
        },
        {
          en: 'The newspaper "Deenbandhu" (edited by Krishnarao Bhalekar and Narayan Meghaji Lokhande) served as the vocal champion for peasants\' and industrial laborers\' welfare.',
          mr: '\'दीनबंधू\' या सत्यशोधक मुखपत्राच्या माध्यमातून त्यांनी शेतकरी व गिरणी कामगारांच्या हक्कांना प्रभावी व्यासपीठ मिळवून दिले.',
        },
      ],
    },
    {
      id: 'literature',
      title: {
        en: '5. Literary Masterpieces, Intellectual Philosophy & Eternal Legacy',
        mr: '५. साहित्य संपदा, वैचारिक वारसा व अमर गौरव',
      },
      tag: { en: 'Literary Works & Legacy', mr: 'साहित्य व वारसा' },
      icon: BookOpen,
      badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      points: [
        {
          en: 'Authored more than 16 seminal literary books, plays, and poetics including Tritiya Ratna (1855), Brahmananche Kasab (1869), Gulamgiri (1873), Shetkaryacha Asud (1881), Satsar (1885), and Sarvajanik Satya Dharma Pustak (1889).',
          mr: 'तृतीयरत्न (१८५५), ब्राह्मणांचे कसब (१८६९), गुलामगिरी (१८७३), शेतकऱ्यांचा आसूड (१८८१), सत्सार (१८८५), इशारा (१८८५) आणि सार्वजनिक सत्यधर्म पुस्तक (१८८९) हे क्रांतिकारक ग्रंथ लिहिले.',
        },
        {
          en: 'Dedicated his celebrated work "Gulamgiri" (Slavery, 1873) to the people of the United States of America for abolishing Negro slavery, forging global solidarity among oppressed classes.',
          mr: '"गुलामगिरी" हा प्रसिद्ध ग्रंथ अमेरिकेतील निग्रो गुलामी नष्ट करणाऱ्या कृष्णवर्णीय मुक्तीसैनिकांना समर्पित करून जागतिक मानवी हक्कांना जोड दिली.',
        },
        {
          en: 'He was deeply inspired by Thomas Paine\'s classic "Rights of Man", formulating a philosophy rooted in universal human rights, liberty, gender equality, and rational inquiry.',
          mr: 'थॉमस पेन यांच्या \'राईट्स ऑफ मॅन\' या ग्रंथाने प्रभावित होऊन स्वातंत्र्य, समता, बंधुता आणि विवेकवादावर आधारित नवी मानवकेंद्री जीवनदृष्टी निर्माण केली.',
        },
        {
          en: 'Directly influenced and inspired Bharat Ratna Dr. B.R. Ambedkar, who hailed Mahatma Phule as his greatest Guru, and Mahatma Mohandas K. Gandhi.',
          mr: 'भारतरत्न डॉ. बाबासाहेब आंबेडकर यांनी महात्मा फुलेंना आपले \'परम गुरू\' मानले, तसेच महात्मा गांधींवरही त्यांच्या विचारांचा खोल प्रभाव राहिला.',
        },
        {
          en: 'On November 28, 1890, Mahatma Jyotirao Phule breathed his last at Pune at the age of 63, leaving behind an immortal legacy that continues to illuminate modern India.',
          mr: '२८ नोव्हेंबर १८९० रोजी वयाच्या ६३ व्या वर्षी पुण्यात त्यांचे महानिर्वाण झाले; परंतु त्यांनी पेटवलेली ज्ञान व समतेची ज्योत अखंड तेवत राहिली.',
        },
        {
          en: 'In profound reverence to his eternal agricultural vision, the Government of Maharashtra named this premier institution as "Mahatma Phule Krishi Vidyapeeth, Rahuri" in 1969.',
          mr: 'त्यांच्या कृषिविषयक व समाजपरिवर्तक विचारांचा सन्मान करण्यासाठी महाराष्ट्र शासनाने या सर्वोच्च कृषी विद्यापीठास \'महात्मा फुले कृषि विद्यापीठ, राहुरी\' हे नाव प्रदान केले.',
        },
      ],
    },
  ];

  const filteredThemes = activeTab === 'all'
    ? biographicalThemes
    : biographicalThemes.filter((t) => t.id === activeTab);

  const searchedThemes = searchQuery.trim() === ''
    ? filteredThemes
    : filteredThemes.map((theme) => ({
      ...theme,
      points: theme.points.filter((pt) =>
        pt.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pt.mr.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    })).filter((theme) => theme.points.length > 0);

  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen text-slate-800">

      {/* ==================================================================== */}
      {/* 1. HERO HEADER: REGAL HERITAGE BANNER WITH ORIGINAL ARCHIVAL IMAGE    */}
      {/* ==================================================================== */}
      <section className="w-full bg-gradient-to-br from-[#123623] via-[#1c4d32] to-[#0a1e13] text-white relative overflow-hidden border-b-4 border-amber-400">

        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Decorative Watermark Grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23f59e0b' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 relative z-10 space-y-8">

          {/* Breadcrumb Navigation & Accessibility Tools */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
            <nav className="flex items-center gap-2 text-xs text-emerald-200">
              <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium">
                <Home className="w-3.5 h-3.5 text-amber-400" />
                <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
              </Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-emerald-100 font-medium">
                {language === 'mr' ? 'विद्यापीठ परिचय' : 'About University'}
              </span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-amber-300 font-bold">
                {language === 'mr' ? 'महात्मा जोतीराव फुले' : 'Mahatma Jyotirao Phule'}
              </span>
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleSpeech}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/15"
                title={language === 'mr' ? 'मजकूर ऐका' : 'Listen to page'}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400" />}
                <span>{language === 'mr' ? 'वाचन' : 'Audio'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-white/15"
                title={language === 'mr' ? 'पृष्ठ मुद्रित करा' : 'Print this page'}
              >
                <Printer className="w-3.5 h-3.5 text-emerald-300" />
                <span>{language === 'mr' ? 'प्रिंट' : 'Print'}</span>
              </button>
            </div>
          </div>

          {/* Main Hero Grid: Authentic Scraped Original Image + Revered Title */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Hero Title & Core Ideological Credentials */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>{language === 'mr' ? 'क्रांतीसूर्य · सत्यशोधक · शेतकरी कैवारी' : 'Visionary Reformer · Satyashodhak · Farmer Champion'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-tight">
                {language === 'mr'
                  ? 'क्रांतीसूर्य महात्मा जोतीराव गोविंदराव फुले'
                  : 'Mahatma Jyotirao Govindrao Phule'}
              </h1>

              <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl font-medium">
                {language === 'mr'
                  ? 'अखंड समाजक्रांतीचे जनक, स्त्री शिक्षणाचे आद्य प्रणेते, कृषी अर्थशास्त्राचे द्रष्टे आणि सत्यशोधक समाजाचे संस्थापक. ज्यांच्या पावन विचारांवर महात्मा फुले कृषि विद्यापीठाची मुहूर्तमेढ रोवली गेली.'
                  : 'Pioneer of women\'s education in India, emancipator of the oppressed, prophet of agrarian economics, and founder of Satyashodhak Samaj. The eternal guiding light behind MPKV Rahuri.'}
              </p>

              {/* Quick Key Facts Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-[10px] text-emerald-300 uppercase font-semibold">
                    {language === 'mr' ? 'जन्म' : 'Born'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    1827 · {language === 'mr' ? 'कटगुण, सातारा' : 'Katgun, Satara'}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-[10px] text-amber-300 uppercase font-semibold">
                    {language === 'mr' ? '"महात्मा" पदवी' : '"Mahatma" Title'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    11 May 1888 · {language === 'mr' ? 'मुंबई' : 'Mumbai'}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-[10px] text-emerald-300 uppercase font-semibold">
                    {language === 'mr' ? 'मुलींची पहिली शाळा' : 'First Girls\' School'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    Aug 1848 · {language === 'mr' ? 'भिडे वाडा, पुणे' : 'Bhide Wada, Pune'}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="text-[10px] text-amber-300 uppercase font-semibold">
                    {language === 'mr' ? 'सत्यशोधक समाज' : 'Satyashodhak Samaj'}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                    24 Sept 1873
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: ORIGINAL SCRAPED ARCHIVAL IMAGE DISPLAY (1-3-640x336.png) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative group w-full max-w-[480px]">
                {/* Glowing Aura Behind Image */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-500 rounded-3xl blur-xl opacity-60 group-hover:opacity-85 transition duration-700 pointer-events-none" />

                {/* The Original Image Frame */}
                <div className="relative rounded-3xl overflow-hidden bg-white shadow-2xl border-4 border-amber-400">
                  <img
                    src="/media/images/1-3-640x336.png"
                    alt="Authentic Original Image of Mahatma Jyotirao Phule"
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    onError={(e) => {
                      // Graceful fallback to secondary statue if primary graphic fails
                      (e.target as HTMLImageElement).src = '/media/images/putula.png';
                    }}
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. FAMOUS CHARTER: SHETKARYACHA ASUD PHILOSOPHICAL BANNER            */}
      {/* ==================================================================== */}
      <section className="w-full bg-[#f6eee0] border-b border-amber-200/80 py-8 relative overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] relative z-10">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-amber-300 shadow-md flex flex-col md:flex-row items-center gap-6">
            <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 shrink-0 shadow-sm">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <div className="space-y-2 flex-1 text-center md:text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'mr' ? 'शेतकऱ्यांचा आसूड · अमर तत्त्वप्रणाली' : 'The Cultivator’s Whipcord (1881) · Core Principle'}</span>
              </div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-slate-900 leading-snug font-serif italic">
                {language === 'mr'
                  ? '“विद्येविना मती गेली, मतीविना नीती गेली, नीतीविना गती गेली, गतीविना वित्त गेले, वित्ताविना शूद्र खचले, इतके अनर्थ एका अविद्येने केले!”'
                  : '“For lack of knowledge, wisdom was lost; for lack of wisdom, morals slipped; for lack of morals, progress stopped; for lack of progress, wealth evaporated; for lack of wealth, the oppressed were shattered: so much catastrophe was wrought by lack of education!”'}
              </p>
              <div className="text-xs text-slate-600 font-semibold pt-1">
                — {language === 'mr' ? 'क्रांतीसूर्य महात्मा जोतीराव फुले' : 'Mahatma Jyotirao Phule'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. INTERACTIVE THEMATIC DIRECTORY: SEARCH & FILTER ALL 13 LISTS       */}
      {/* ==================================================================== */}
      <section className="w-full py-12 sm:py-16">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] space-y-8">

          {/* Section Heading & Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Scroll className="w-5 h-5 text-emerald-800" />
                <span>{language === 'mr' ? 'सविस्तर जीवनपट, तत्त्वज्ञान व उपलब्धी' : 'Comprehensive Biography, Ideology & Impact'}</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {language === 'mr'
                  ? 'अधिकृत विद्यापीठ पोर्टलवरील सर्व १३ विषयांचे सविस्तर प्रमाणबद्ध संकलन'
                  : 'All historical sections and biographical milestones archived from the official university portal'}
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'माहिती शोधा (उदा. सत्यशोधक, शाळा)...' : 'Search milestones, books, reforms...'}
                className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-stone-300 text-xs text-slate-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-2xs"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all' as const, label: { en: 'All Themes', mr: 'सर्व जीवनपट' } },
              { id: 'life' as const, label: { en: 'Early Life & Title', mr: 'जीवनपट व पदवी' } },
              { id: 'education' as const, label: { en: 'Girls\' Education', mr: 'स्त्री शिक्षण' } },
              { id: 'social' as const, label: { en: 'Satyashodhak Movement', mr: 'सत्यशोधक चळवळ' } },
              { id: 'agriculture' as const, label: { en: 'Agrarian Vision', mr: 'शेती विचार' } },
              { id: 'literature' as const, label: { en: 'Books & Legacy', mr: 'साहित्य व वारसा' } },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                {getBilingual(tab.label)}
              </button>
            ))}
          </div>

          {/* Detailed Thematic Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {searchedThemes.map((theme) => {
              const Icon = theme.icon;
              return (
                <div
                  key={theme.id}
                  className="rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header */}
                    <div className="p-6 bg-gradient-to-r from-stone-50 via-amber-50/40 to-stone-50 border-b border-stone-200/80 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2.5 rounded-2xl bg-emerald-800 text-white shrink-0 mt-0.5 shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md border ${theme.badgeColor} uppercase tracking-wider`}>
                            {getBilingual(theme.tag)}
                          </span>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1.5 leading-snug">
                            {getBilingual(theme.title)}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Card Body: Verified Points from Scraped Data */}
                    <div className="p-6 space-y-3.5">
                      {theme.points.map((pt, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{getBilingual(pt)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{language === 'mr' ? 'अधिकृत संशोधन व दस्तऐवज' : 'Official Historical Archive'}</span>
                    <span className="font-semibold text-emerald-800">
                      {theme.points.length} {language === 'mr' ? 'नोंदी' : 'Key Records'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty search state */}
          {searchedThemes.length === 0 && (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200 space-y-3">
              <Info className="w-8 h-8 text-amber-600 mx-auto" />
              <div className="text-base font-bold text-slate-800">
                {language === 'mr' ? 'कोणतीही नोंद सापडली नाही' : 'No records found'}
              </div>
              <p className="text-xs text-stone-500">
                {language === 'mr'
                  ? 'कृपया वेगळा शब्द शोधून पहा किंवा फिल्टर रीसेट करा.'
                  : 'Please try searching for different keywords or reset your filter.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-semibold"
              >
                {language === 'mr' ? 'सर्व नोंदी दाखवा' : 'Show All Records'}
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. UNIVERSITY LEGACY CONNECT: WHY MPKV IS NAMED AFTER HIM            */}
      {/* ==================================================================== */}
      <section className="w-full py-12 bg-gradient-to-br from-[#0c2417] via-[#123623] to-[#0a1e13] text-white border-t border-emerald-700">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                <span>{language === 'mr' ? 'विद्यापीठाचा अभिमान' : 'University Pride'}</span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {language === 'mr'
                  ? 'महात्मा फुले कृषि विद्यापीठ नामकरणाचा ऐतिहासिक संकल्प'
                  : 'The Historical Charter Naming MPKV Rahuri'}
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'सन १९६८ मध्ये संपूर्ण महाराष्ट्रासाठी स्थापन झालेल्या राज्य कृषी विद्यापीठाचे पुढे चार विद्यापीठांत पुनर्गठन झाले. पश्चिम महाराष्ट्रातील १० जिल्ह्यांचे कार्यक्षेत्र लाभलेल्या राहुरी मुख्यालयातील विद्यापीठास क्रांतिसूर्य महात्मा जोतीराव फुले यांच्या कृषिविषयक विचारांचा अखंड वारसा पुढे नेण्यासाठी त्यांचे पावन नाव देण्यात आले.'
                  : 'Originally established in 1968 under the Maharashtra Agricultural University Act, the university jurisdiction covers 10 districts of Western Maharashtra. In tribute to Mahatma Jyotirao Phule\'s revolutionary agrarian insights, the State named this premier institution after him in 1969.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/mpkv-at-a-glance"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-md hover:scale-105 inline-flex items-center gap-2"
                >
                  <span>{language === 'mr' ? 'दृष्टीक्षेपात म.फु.कृ.वि' : 'MPKV at a Glance'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/"
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20 inline-flex items-center gap-2"
                >
                  <Home className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'mr' ? 'मुख्यपृष्ठावर परत जा' : 'Return to Home'}</span>
                </Link>
              </div>
            </div>

            {/* Bronze Statue Frame */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative group max-w-[280px]">
                <div className="rounded-2xl overflow-hidden border-2 border-amber-400 bg-white shadow-xl">
                  <img
                    src="/media/images/putula.png"
                    alt="Statue of Mahatma Jyotirao Phule at Rahuri Campus"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-3 bg-slate-900 text-center text-white">
                    <div className="text-xs font-bold text-amber-300">
                      {language === 'mr' ? 'राहुरी मध्यवर्ती प्रक्षेत्रावरील पुतळा' : 'Campus Statue, Rahuri'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
