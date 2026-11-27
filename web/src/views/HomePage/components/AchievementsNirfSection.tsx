'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  Award,
  Trophy,
  CheckCircle2,
  Star,
  ShieldCheck,
  Medal,
  Sprout,
  Droplets,
  Sparkles,
  Flame,
  X,
  FileText,
  Calendar,
  Building,
  Check,
  ChevronRight,
  ChevronDown
} from 'lucide-react';

interface RecognitionItem {
  id: string;
  year: string;
  category: 'icar' | 'ppvfra' | 'aicrp' | 'history';
  title: { en: string; mr: string };
  authority: { en: string; mr: string };
  tag: string;
  description: { en: string; mr: string };
  details?: { en: string; mr: string };
  highlights: Array<{ en: string; mr: string }>;
  icon: any;
  styles: {
    yearBg: string;
    tagBg: string;
    iconBg: string;
    cardBg: string;
    border: string;
    titleHover: string;
    glow: string;
  };
}

export const AchievementsNirfSection: React.FC = () => {
  const { language, getBilingual } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'icar' | 'ppvfra' | 'aicrp' | 'history'>('all');
  const [selectedRecognition, setSelectedRecognition] = useState<RecognitionItem | null>(null);

  // Close on Escape key & manage scroll lock
  useEffect(() => {
    if (!selectedRecognition) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedRecognition(null);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedRecognition]);

  const recognitions: RecognitionItem[] = [
    {
      id: 'icar_accreditation',
      year: language === 'mr' ? 'अद्ययावत' : 'Current',
      category: 'icar',
      title: {
        en: 'ICAR National Grade "A" Institutional Accreditation (NAEAB Certified)',
        mr: 'भारतीय कृषि अनुसंधान परिषद (ICAR) राष्ट्रीय शिक्षण मान्यता मंडळाकडून "अ" श्रेणी मान्यता'
      },
      authority: {
        en: 'National Agricultural Education Accreditation Board (ICAR, New Delhi)',
        mr: 'राष्ट्रीय कृषि शिक्षण अधिस्वीकृती मंडळ (आयसीएआर, नवी दिल्ली)'
      },
      tag: language === 'mr' ? 'सर्वोच्च मान्यता' : 'Apex Standing',
      description: {
        en: 'Conferred Grade "A" accreditation for high academic standards, ICAR-compliant curricula, advanced research infrastructure, and strong student outcomes.',
        mr: 'दर्जेदार कृषि शिक्षण, आधुनिक प्रयोगशाळा, राष्ट्रीय मानकांनुसार अभ्यासक्रम व संशोधन कार्यासाठी आयसीएआर कडून "अ" श्रेणी सन्मान.'
      },
      details: {
        en: 'The National Agricultural Education Accreditation Board (NAEAB) of the Indian Council of Agricultural Research, New Delhi, awarded MPKV Rahuri Grade "A" accreditation following an extensive institutional inspection. This certification affirms exemplary faculty caliber, state-of-the-art laboratory infrastructure, smart classroom facilities, and robust student placement credentials.',
        mr: 'भारतीय कृषि अनुसंधान परिषद (ICAR), नवी दिल्लीच्या राष्ट्रीय कृषि शिक्षण मान्यता मंडळाने विद्यापीठातील १४ घटक महाविद्यालये, प्रगत पदव्युत्तर संस्था (PGI) आणि संशोधन केंद्रांची सखोल तपासणी करून "अ" श्रेणी प्रदान केली आहे. यामुळे विद्यापीठातील पदव्यांना राष्ट्रीय व आंतरराष्ट्रीय स्तरावर सर्वोच्च अधिमान्यता प्राप्त झाली आहे.'
      },
      highlights: [
        {
          en: 'Accredits 14 constituent colleges, 4 zonal research stations, and Post Graduate Institute Rahuri.',
          mr: 'विद्यापीठाची १४ घटक महाविद्यालये, ४ विभागीय संशोधन केंद्रे व पदव्युत्तर संस्था प्रमाणित.'
        },
        {
          en: 'Adheres to ICAR 5th Deans Committee recommendations for modern agricultural curricula.',
          mr: 'भा.कृ.अनु.प. च्या ५ व्या अधिष्ठाता समितीच्या शिफारशींनुसार आधुनिक अभ्यासक्रमांचे संचलन.'
        },
        {
          en: 'Ensures national eligibility for ICAR fellowships, scholarships, and civil services.',
          mr: 'विद्यार्थ्यांना राष्ट्रीय शिष्यवृत्ती, फेलोशिप व स्पर्धा परीक्षांमध्ये विशेष पात्रता सुनिश्चित.'
        }
      ],
      icon: ShieldCheck,
      styles: {
        yearBg: 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold',
        tagBg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
        iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/50',
        border: 'border-emerald-200/90 hover:border-emerald-400',
        titleHover: 'group-hover:text-emerald-950',
        glow: 'hover:shadow-emerald-500/10'
      }
    },
    {
      id: 'state_awards',
      year: '2023',
      category: 'history',
      title: {
        en: 'Government of Maharashtra Vasantrao Naik State Awards for Farm Innovation',
        mr: 'महाराष्ट्र शासन वसंतराव नाईक स्मृती राज्य कृषी संशोधन व विस्तार पुरस्कार'
      },
      authority: {
        en: 'Govt. of Maharashtra & Vasantrao Naik Prathisthan',
        mr: 'महाराष्ट्र शासन व वसंतराव नाईक स्मृती प्रतिष्ठान'
      },
      tag: language === 'mr' ? 'राज्य पुरस्कार' : 'State Honour',
      description: {
        en: 'Bestowed upon university scientists and extension units for transformative contribution to drought mitigation and sugarcane drip automation.',
        mr: 'उसाचे सूक्ष्म सिंचन, डाळिंब तेलकट डाग रोग नियंत्रण व कोरडवाहू तंत्रज्ञानातील संशोधनासाठी राज्यस्तरीय गौरव.'
      },
      details: {
        en: 'Instituted by the Government of Maharashtra and the Vasantrao Naik Memorial Foundation, this prestigious state honour has been awarded to MPKV scientists for path-breaking research in drought mitigation, sugarcane wide-row mechanization, and biological management of bacterial blight in pomegranate orchards.',
        mr: 'महाराष्ट्र शासन व वसंतराव नाईक स्मृती प्रतिष्ठान द्वारे शेतीतील उल्लेखनीय संशोधन व तंत्रज्ञानासाठी मफुकृविच्या शास्त्रज्ञांना हा राज्य पुरस्कार प्रदान करण्यात आला आहे. उसाची पट्टा पद्धत, ठिबक सिंचन, डाळिंबावरील तेलकट डाग रोगाचे एकात्मिक नियंत्रण व कोरडवाहू शेती तंत्रज्ञानासाठी हा बहुमान प्राप्त झाला.'
      },
      highlights: [
        {
          en: 'State-level apex recognition instituted in memory of late Chief Minister Vasantrao Naik.',
          mr: 'माजी मुख्यमंत्री कै. वसंतराव नाईक यांच्या स्मृतीप्रीत्यर्थ दिला जाणारा राज्यस्तरीय सर्वोच्च पुरस्कार.'
        },
        {
          en: 'Celebrates breakthrough agronomic solutions mitigating agricultural drought in Western Maharashtra.',
          mr: 'पश्चिम महाराष्ट्रातील कोरडवाहू व दुष्काळी भागातील शेतीसाठी क्रांतिकारी उपायांची दखल.'
        },
        {
          en: 'Direct contribution to boosting state productivity in sugarcane, pomegranate, and pulses.',
          mr: 'ऊस, डाळिंब व कडधान्य पिकांच्या राज्यस्तरीय उत्पादकतेत भरीव वाढ करण्यात मोठे योगदान.'
        }
      ],
      icon: Flame,
      styles: {
        yearBg: 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-bold',
        tagBg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
        iconBg: 'bg-gradient-to-br from-emerald-500 to-amber-600 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-emerald-50/50',
        border: 'border-emerald-200/90 hover:border-emerald-400',
        titleHover: 'group-hover:text-emerald-950',
        glow: 'hover:shadow-emerald-500/10'
      }
    },
    {
      id: 'aicrp_pearlmillet',
      year: '2021',
      category: 'aicrp',
      title: {
        en: 'National Commendation for Climate-Resilient Bajra & Forage Crops Breeding',
        mr: 'अखिल भारतीय बाजरी व चारा पिके समन्वित संशोधन प्रकल्पाचे उत्कृष्ट राष्ट्रीय कार्य'
      },
      authority: {
        en: 'ICAR AICRP National Review Panel',
        mr: 'आयसीएआर राष्ट्रीय पुनरावलोकन समिती'
      },
      tag: language === 'mr' ? 'राष्ट्रीय प्रशंसा' : 'National Citation',
      description: {
        en: 'Recognized for releasing iron and zinc-rich biofortified pearl millet hybrids and multi-cut sweet fodder sorghum varieties.',
        mr: 'लोह व जस्तयुक्त पोषणसमृद्ध बाजरी संकरित वाण आणि पौष्टिक चारा पिकांच्या संशोधनासाठी राष्ट्रीय प्रशंसा.'
      },
      details: {
        en: 'The ICAR National Review Panel commended MPKV’s multi-location breeding trials in pearl millet and forage sorghum. The university released pioneering biofortified hybrids rich in micronutrients like iron and zinc to combat malnutrition, alongside multi-cut high-biomass fodder crops supporting the state’s thriving dairy industry.',
        mr: 'भा.कृ.अनु.प. च्या राष्ट्रीय परीक्षण समितीने मफुकृविच्या बाजरी व चारा पिके प्रकल्पाच्या उल्लेखनीय कार्याची प्रशंसा केली. कुपोषणावर मात करण्यासाठी लोह व जस्तयुक्त पोषणसमृद्ध बाजरी आणि दुग्ध व्यवसायाला बळ देणाऱ्या बहुवार्षिक गोड ज्वारी चारा वाणांची निर्मिती करण्यात आली.'
      },
      highlights: [
        {
          en: 'Bred high-iron and high-zinc biofortified pearl millet varieties combating rural malnutrition.',
          mr: 'ग्रामीण भागातील कुपोषणावर मात करण्यासाठी लोह व जस्तयुक्त संकरित बाजरी वाण विकसित.'
        },
        {
          en: 'Released high-yield forage crops (Phule Jaywant, Phule Gunvant) providing round-the-year green fodder.',
          mr: 'फुले जयवंत व फुले गुणवंत या बहुवार्षिक चारा वाणांमुळे पशुपालकांना वर्षभर हिरवा चारा उपलब्ध.'
        },
        {
          en: 'High digestibility and palatability enhancing milk productivity across Maharashtra dairy farms.',
          mr: 'उत्कृष्ट पचनक्षमता व पौष्टिक घटकांमुळे जनावरांच्या दूध उत्पादनात भरीव वाढ.'
        }
      ],
      icon: Award,
      styles: {
        yearBg: 'bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-bold',
        tagBg: 'bg-teal-100 text-teal-950 border-teal-300',
        iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-700 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-teal-50/50',
        border: 'border-teal-200/90 hover:border-teal-400',
        titleHover: 'group-hover:text-teal-950',
        glow: 'hover:shadow-teal-500/10'
      }
    },
    {
      id: 'ppvfra_community',
      year: '2017',
      category: 'ppvfra',
      title: {
        en: 'Plant Genome Saviour Community Recognitions & Tribal Germplasm Protection',
        mr: 'वनस्पती जनुक संरक्षक समुदाय पुरस्कार व स्थानिक शेतकरी वाण संरक्षण'
      },
      authority: {
        en: 'PPV & FRA, Ministry of Agriculture & Farmers Welfare, Govt. of India',
        mr: 'पीपीव्ही व एफआरए, भारत सरकार'
      },
      tag: language === 'mr' ? 'शेतकरी हक्क संरक्षण' : 'Farmers’ Rights',
      description: {
        en: 'Facilitated local farming communities and tribal growers in Western Ghats to gain national recognition and financial rewards for agro-biodiversity conservation.',
        mr: 'पश्चिम घाटातील पारंपारिक देशी बियाणे व जैवविविधता संवर्धनासाठी स्थानिक शेतकरी समुदायांना राष्ट्रीय सन्मान मिळवून देण्यात योगदान.'
      },
      details: {
        en: 'MPKV’s Department of Agricultural Botany systematically surveyed, documented, and registered landraces and heritage crop varieties preserved by indigenous farming communities in the Sahyadri Western Ghats. Through MPKV’s legal and scientific facilitation, tribal farmer groups won the prestigious Plant Genome Saviour Community Awards with ₹10 lakh cash felicitations.',
        mr: 'सह्याद्रीच्या पश्चिम घाट व आदिवासी पट्ट्यात शेतकऱ्यांनी शतकानुशतके जतन केलेल्या स्थानिक देशी वाणांचे विद्यापीठाच्या कृषी वनस्पतीशास्त्र विभागाने वैज्ञानिक परीक्षण व नोंदणी केली. विद्यापीठाच्या प्रयत्नांमुळे आदिवासी शेतकरी गटांना प्रत्येकी १० लाख रुपयांचा "वनस्पती जनुक संरक्षक समुदाय पुरस्कार" भारत सरकारकडून प्राप्त झाला.'
      },
      highlights: [
        {
          en: 'Empowered tribal and grassroots farming communities with legal sovereignty over indigenous seeds.',
          mr: 'आदिवासी व पारंपरिक शेतकऱ्यांना त्यांच्या पारंपरिक बियाण्यांवर कायदेशीर स्वामित्त्व मिळवून दिले.'
        },
        {
          en: 'Conserved heritage cultivars of scented rice, finger millet (Ragi), and medicinal crops.',
          mr: 'सुवासिक भात, नाचणी, वरई व दुर्मीळ औषधी वनस्पतींच्या पारंपरिक वाणांचे संवर्धन.'
        },
        {
          en: 'Direct institutional support for establishing local community seed banks in tribal talukas.',
          mr: 'आदिवासी तालुक्यांमध्ये स्थानिक शेतकरी बियाणे बँका स्थापन करण्यासाठी विद्यापीठाचे मार्गदर्शन.'
        }
      ],
      icon: Sprout,
      styles: {
        yearBg: 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold',
        tagBg: 'bg-amber-100 text-amber-950 border-amber-300',
        iconBg: 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50/50',
        border: 'border-amber-200/90 hover:border-amber-400',
        titleHover: 'group-hover:text-amber-950',
        glow: 'hover:shadow-amber-500/10'
      }
    },
    {
      id: 'ppvfra_record',
      year: '2016',
      category: 'ppvfra',
      title: {
        en: 'National Record for Maximum Extant Notified Varieties (36 Crop Varieties Registered with PPV & FRA)',
        mr: 'पीपीव्ही व एफआरए नवी दिल्ली अंतर्गत सर्वाधिक ३६ अधिसूचित पीक वाणांची राष्ट्रीय विक्रमी नोंदणी'
      },
      authority: {
        en: 'Protection of Plant Varieties & Farmers’ Rights Authority, Govt. of India',
        mr: 'पीपीव्ही व एफआरए, कृषि व शेतकरी कल्याण मंत्रालय, भारत सरकार'
      },
      tag: language === 'mr' ? 'राष्ट्रीय विक्रम' : 'National Record',
      description: {
        en: 'MPKV holds the all-India national record among all agricultural universities for legal registration and protection of 36 farmer-centric extant varieties under the PPV & FRA Act 2001.',
        mr: 'शेतकरी केंद्रित ३६ अधिसूचित वाणांची कायदेशीर नोंदणी व हक्क संरक्षण मिळवणारे महात्मा फुले कृषि विद्यापीठ हे देशातील सर्वोच्च विद्यापीठ ठरले.'
      },
      details: {
        en: 'Under the statutory provisions of the Protection of Plant Varieties & Farmers\' Rights Act, MPKV completed rigorous DUS (Distinctiveness, Uniformity and Stability) testing for 36 notified crop varieties. This landmark achievement safeguards indigenous germplasm, ensures royalty protection, and secures farmers’ legal rights across Maharashtra and India.',
        mr: 'वनस्पती वाण संरक्षण व शेतकरी हक्क कायदा २००१ च्या वैधानिक तरतुदींनुसार, मफुकृविने ३६ अधिसूचित पीक वाणांची DUS (वैशिष्ट्य, एकसारखेपणा व स्थिरता) चाचणी यशस्वीरीत्या पूर्ण केली. या ऐतिहासिक विक्रमामुळे महाराष्ट्रातील शेतकरी वाणांचे हक्क आणि जनुकीय संपदा सुरक्षित झाली आहे.'
      },
      highlights: [
        {
          en: 'All-India National Record with 36 extant notified crop varieties registered.',
          mr: '३६ अधिसूचित पीक वाणांची नोंदणी करून संपूर्ण भारतात सर्वोच्च राष्ट्रीय विक्रम प्रस्थापित.'
        },
        {
          en: 'Covers staple crops: Sorghum (Phule Yashoda), Chickpea (Phule Digvijay), Sugarcane, and Pomegranate (Phule Bhagwa).',
          mr: 'ज्वारी (फुले यशोदा), हरभरा (फुले दिग्विजय), ऊस व डाळिंब (फुले भगवा) अशा प्रमुख पिकांचा समावेश.'
        },
        {
          en: 'Ensures seed purity, legal intellectual property protection, and benefits to local growers.',
          mr: 'वाणांची शुद्धता, बौद्धिक संपदा हक्क आणि शेतकरी बंधूंना थेट लाभ मिळवून देण्याची हमी.'
        }
      ],
      icon: Medal,
      styles: {
        yearBg: 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black',
        tagBg: 'bg-amber-100 text-amber-950 border-amber-300',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50/50',
        border: 'border-amber-200/90 hover:border-amber-400',
        titleHover: 'group-hover:text-amber-950',
        glow: 'hover:shadow-amber-500/10'
      }
    },
    {
      id: 'seed_research',
      year: '2015',
      category: 'icar',
      title: {
        en: 'Centre of Excellence in Seed Research in India by ICAR, New Delhi',
        mr: 'भारतीय कृषि अनुसंधान परिषद (ICAR) द्वारे बियाणे संशोधनासाठी देशातील "सेंटर ऑफ एक्सलन्स" सन्मान'
      },
      authority: {
        en: 'Indian Council of Agricultural Research, New Delhi',
        mr: 'भारतीय कृषि अनुसंधान परिषद, नवी दिल्ली'
      },
      tag: language === 'mr' ? 'उत्कृष्टता केंद्र' : 'Centre of Excellence',
      description: {
        en: 'National benchmark for Breeder, Foundation and Certified Seed production, supplying high-purity seed to thousands of farmers annually.',
        mr: 'मूलभूत व प्रमाणित बियाणे निर्मिती, गुणवत्ता नियंत्रण व संवर्धन प्रक्रियेत देशातील अग्रगण्य संशोधन केंद्र म्हणून मान्यता.'
      },
      details: {
        en: 'ICAR New Delhi recognized MPKV Rahuri as the "Centre of Excellence in Seed Research" in India in 2015. The university operates one of the country\'s largest centralized seed production units, maintaining state-of-the-art seed conditioning lines, cold storage facilities, and certified DNA-fingerprinting purity testing laboratories.',
        mr: 'भा.कृ.अनु.प. नवी दिल्ली द्वारे २०१५ मध्ये मफुकृवि राहुरीस बियाणे संशोधनातील देशातील "सेंटर ऑफ एक्सलन्स" म्हणून घोषित करण्यात आले. राहुरी मध्यवर्ती प्रक्षेत्रात वर्षाकाठी ३० हजार क्विंटलहून अधिक उच्च शुद्धतेचे मूलभूत व प्रमाणित बियाणे तयार करून शेतकऱ्यांना थेट वितरित केले जाते.'
      },
      highlights: [
        {
          en: 'Supplies over 30,000+ quintals of Breeder, Foundation, and Certified seeds every year.',
          mr: 'दरवर्षी ३०,००० क्विंटलहून अधिक मूलभूत, पायाभूत व प्रमाणित बियाण्याचे दर्जेदार उत्पादन.'
        },
        {
          en: 'Equipped with computerized seed processing plants, gravity separators, and moisture labs.',
          mr: 'संगणकीकृत बियाणे प्रक्रिया संयंत्रे, ग्रॅव्हिटी सेपरेटर व अत्याधुनिक आर्द्रता प्रयोगशाळा.'
        },
        {
          en: 'Single-window seed distribution desk catering directly to farmers at Rahuri headquarters.',
          mr: 'राहुरी मुख्यालयात शेतकऱ्यांसाठी थेट बियाणे विक्री कक्षाची (संपर्क: ०२४२६-२४३३३८) सुविधा.'
        }
      ],
      icon: Sprout,
      styles: {
        yearBg: 'bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold',
        tagBg: 'bg-green-100 text-green-950 border-green-300',
        iconBg: 'bg-gradient-to-br from-green-500 to-emerald-700 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50/50',
        border: 'border-green-200/90 hover:border-green-400',
        titleHover: 'group-hover:text-green-950',
        glow: 'hover:shadow-green-500/10'
      }
    },
    {
      id: 'water_management',
      year: '2014',
      category: 'icar',
      title: {
        en: 'Centre of Excellence in Irrigation Water Management in India',
        mr: 'सिंचन व जलव्यवस्थापनात उत्कृष्ट कामगिरीसाठी राष्ट्रीय "सेंटर ऑफ एक्सलन्स" बहुमान'
      },
      authority: {
        en: 'ICAR & Ministry of Agriculture & Farmers Welfare, New Delhi',
        mr: 'आयसीएआर व कृषि मंत्रालय, नवी दिल्ली'
      },
      tag: language === 'mr' ? 'जलव्यवस्थापन बहुमान' : 'National Water Honour',
      description: {
        en: 'Pioneered micro-irrigation, automated drip fertigation systems, subsurface drainage for salt-affected soils, and canal automation protocols.',
        mr: 'ठिबक व तुषार सिंचन, खत-पाणी एकात्मिक व्यवस्थापन आणि पाणथळ जमिनींच्या पुनरुद्धारासाठी राष्ट्रीय स्तरावर मार्गदर्शक कार्य.'
      },
      details: {
        en: 'Conferred in 2014 by ICAR and the Ministry of Agriculture, this Centre of Excellence celebrates MPKV\'s leadership in tackling agricultural water scarcity. The university pioneered pressurized drip and sprinkler irrigation technologies, automated irrigation scheduling, and subsurface drainage systems that have reclaimed thousands of hectares of saline-sodic lands in Western Maharashtra.',
        mr: '२०१४ मध्ये मिळालेला हा राष्ट्रीय सन्मान विद्यापीठाच्या जलव्यवस्थापन क्षेत्रातील क्रांतीची साक्ष देतो. पश्चिम महाराष्ट्रातील उसाचे सूक्ष्म सिंचन, स्वयंचलित खत-पाणी तंत्रज्ञान, भूगर्भीय निचरा प्रणाली आणि कालवा स्वयंचलन प्रकल्पांद्वारे हजारो हेक्टर क्षारपड जमिनींचे यशस्वी पुनरुत्थान करण्यात आले.'
      },
      highlights: [
        {
          en: 'Pioneered drip irrigation and fertigation schedules saving 40-60% water in sugarcane and orchards.',
          mr: 'ऊस व फळबागांमध्ये ४० ते ६० टक्के पाण्याची बचत करणारी ठिबक व फर्टीगेशन तंत्रे विकसित.'
        },
        {
          en: 'Reclaimed extensive waterlogged and saline lands across Kolhapur, Sangli, and Pune belts.',
          mr: 'कोल्हापूर, सांगली व पुणे पट्ट्यातील हजारो हेक्टर क्षारपड व पाणथळ जमिनींचा यशस्वी निचरा.'
        },
        {
          en: 'Home to the World Bank funded CAAST-CSAWM precision climate-smart water research facility.',
          mr: 'जागतिक बँक अर्थसहाय्यित CAAST-CSAWM हवामान अनुकूल जलसंशोधन प्रकल्पाचे मध्यवर्ती केंद्र.'
        }
      ],
      icon: Droplets,
      styles: {
        yearBg: 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white font-bold',
        tagBg: 'bg-cyan-100 text-cyan-950 border-cyan-300',
        iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-cyan-50/50',
        border: 'border-cyan-200/90 hover:border-cyan-400',
        titleHover: 'group-hover:text-cyan-950',
        glow: 'hover:shadow-cyan-500/10'
      }
    },
    {
      id: 'safflower_aicrp',
      year: '2013',
      category: 'aicrp',
      title: {
        en: 'ICAR Award for Excellence in Safflower Research by ICAR, New Delhi',
        mr: 'करडई पीक संशोधन व कोरडवाहू उत्पादकतेत उल्लेखनीय योगदानासाठी आयसीएआर विशेष गौरव'
      },
      authority: {
        en: 'Indian Council of Agricultural Research, New Delhi',
        mr: 'आयसीएआर, नवी दिल्ली'
      },
      tag: language === 'mr' ? 'विशेष गौरव' : 'Excellence Award',
      description: {
        en: 'Conferred to AICRP Safflower (Solapur Centre / MPKV) for breakthrough spiny and non-spiny high-oil varieties suitable for drought-prone regions.',
        mr: 'सोलापूर संशोधन केंद्राने कोरडवाहू भागासाठी तेलयुक्त व रोगप्रतिकारक करडई वाण विकसित केल्याबद्दल विशेष गौरव.'
      },
      details: {
        en: 'ICAR recognized the Zonal Agricultural Research Station (ZARS), Solapur under MPKV for excellence in dryland oilseeds. The station bred breakthrough spineless varieties (such as NARI-6, SSF-708) and high-oil spiny cultivars (Phule Kusuma) that made safflower harvesting easier and significantly raised farm profitability under scarce rainfall conditions.',
        mr: 'मफुकृवि अंतर्गत कार्यरत विभागीय कृषी संशोधन केंद्र, सोलापूर केंद्रास कोरडवाहू तेलबिया संशोधनातील भरीव कामगिरीबद्दल आयसीएआर नवी दिल्ली द्वारे गौरवण्यात आले. शेतकऱ्यांना काढणीस सोप्या जाणाऱ्या बिनकाटेरी व उच्च तेलयुक्त करडई वाणांच्या निर्मितीमुळे दुष्काळी भागातील शेतकऱ्यांचे उत्पन्न वाढले.'
      },
      highlights: [
        {
          en: 'Bred farmer-friendly spineless and high-oil varieties including Phule Kusuma and SSF-708.',
          mr: 'काढणीस सुलभ व उच्च तेलयुक्त फुले कुसुमा आणि एसएसएफ-७०८ या प्रसिद्ध वाणांची निर्मिती.'
        },
        {
          en: 'Thrives in scarcity and rabi drought conditions across Solapur, Ahmednagar and Marathwada.',
          mr: 'सोलापूर, अहिल्यानगर व मराठवाड्यातील अवर्षणप्रवण कोरडवाहू भागात उत्कृष्ट उत्पादन.'
        },
        {
          en: 'Formulated integrated pest management strategies against safflower aphid outbreaks.',
          mr: 'करडईवरील मावा किडीच्या नियंत्रणासाठी प्रभावी एकात्मिक कीड व्यवस्थापन पद्धती.'
        }
      ],
      icon: Sparkles,
      styles: {
        yearBg: 'bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold',
        tagBg: 'bg-purple-100 text-purple-950 border-purple-300',
        iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-purple-50/50',
        border: 'border-purple-200/90 hover:border-purple-400',
        titleHover: 'group-hover:text-purple-950',
        glow: 'hover:shadow-purple-500/10'
      }
    },
    {
      id: 'vegetable_aicrp',
      year: '2013',
      category: 'aicrp',
      title: {
        en: 'Late Amit Singh Memorial Award for Best AICRP Centre of Vegetables in India',
        mr: 'अखिल भारतीय भाजीपाला समन्वित संशोधन प्रकल्पास देशातील "सर्वोत्कृष्ट केंद्र" पुरस्कार'
      },
      authority: {
        en: 'ICAR All India Coordinated Research Project (AICRP)',
        mr: 'आयसीएआर अखिल भारतीय समन्वित प्रकल्प'
      },
      tag: language === 'mr' ? 'देशात प्रथम' : 'Rank 1 in India',
      description: {
        en: 'Ranked 1st in India for outstanding varietal development, disease-resistant vegetables, and greenhouse cultivation technologies.',
        mr: 'भाजीपाला पिकांचे उच्च उत्पादनक्षम व रोगप्रतिकारक वाण विकसित करण्यात संपूर्ण देशात प्रथम क्रमांकाचा मान.'
      },
      details: {
        en: 'The All India Coordinated Research Project (AICRP) on Vegetable Crops at MPKV Rahuri was awarded the Late Amit Singh Memorial Award as the #1 Best Centre in India. The Rahuri vegetable scientists released iconic varieties including Phule Samarth and Phule Suvarna in Onion, Phule Pragati in Brinjal, and high-yield disease-resistant chillies.',
        mr: 'भाजीपाला पिकांच्या अखिल भारतीय समन्वित संशोधन प्रकल्पात देशातील सर्व विद्यापीठांना मागे टाकत मफुकृवि राहुरी केंद्राने देशात प्रथम क्रमांक मिळवून कै. अमित सिंग स्मृती पुरस्कार जिंकला. कांदा (फुले समर्थ, फुले सुवर्णा), वांगी, मिरची व टोमॅटो पिकांमधील दर्जेदार वाण निर्मितीचे राष्ट्रीय स्तरावर कौतुक झाले.'
      },
      highlights: [
        {
          en: 'Adjudged Rank 1 among all vegetable research centres across Indian agricultural universities.',
          mr: 'देशातील सर्व कृषी विद्यापीठांच्या भाजीपाला केंद्रांमध्ये प्रथम क्रमांकाचा राष्ट्रीय पुरस्कार.'
        },
        {
          en: 'Pioneered world-renowned red and white onion varieties suitable for export and dehydration.',
          mr: 'निर्यात व डिहायड्रेशनसाठी उपयुक्त लाल व पांढऱ्या कांद्याचे जगप्रसिद्ध वाण विकसित.'
        },
        {
          en: 'Introduced low-cost naturally ventilated polyhouses for year-round off-season vegetable farming.',
          mr: 'हंगामबाह्य भाजीपाला उत्पादनासाठी कमी खर्चाच्या पॉलिहाउस तंत्रज्ञानाचा प्रसार.'
        }
      ],
      icon: Trophy,
      styles: {
        yearBg: 'bg-gradient-to-r from-rose-600 to-pink-700 text-white font-bold',
        tagBg: 'bg-rose-100 text-rose-950 border-rose-300',
        iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-xs',
        cardBg: 'bg-white hover:bg-gradient-to-br hover:from-white hover:to-rose-50/50',
        border: 'border-rose-200/90 hover:border-rose-400',
        titleHover: 'group-hover:text-rose-950',
        glow: 'hover:shadow-rose-500/10'
      }
    }
  ];

  const openRecognitionById = (id: string) => {
    const found = recognitions.find((item) => item.id === id);
    if (found) setSelectedRecognition(found);
  };

  const filteredRecognitions = activeCategory === 'all'
    ? recognitions
    : recognitions.filter(item => item.category === activeCategory);

  return (
    <section className="w-full py-16 bg-[#f3f7f3] border-t border-stone-300 relative overflow-hidden">

      {/* Subtle ambient decorative lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[450px] h-[450px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] relative z-10 space-y-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-amber-100 to-emerald-100 border border-emerald-300/90 text-emerald-950 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>{language === 'mr' ? 'राष्ट्रीय मान्यता, आयसीएआर व पुरस्कार' : 'National Honours, ICAR & Apex Recognitions'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-emerald-900 font-bold">PPVFRA · ICAR</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-bold text-slate-900 tracking-tight">
            {language === 'mr'
              ? 'सर्वोच्च राष्ट्रीय सन्मान, आयसीएआर मानांकन व पीपीव्ही-एफआरए गौरव'
              : 'Apex National Standing, ICAR Accreditations & PPVFRA Accolades'}
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-[15px] max-w-2xl mx-auto leading-relaxed">
            {language === 'mr'
              ? 'भारतीय कृषि अनुसंधान परिषद (ICAR) कडून "अ" श्रेणी मान्यता, पीपीव्ही व एफआरए नवी दिल्ली अंतर्गत ३६ पीक वाणांची राष्ट्रीय विक्रमी नोंदणी आणि उत्कृष्ट कृषी संशोधनासाठी प्राप्त सर्वोच्‍च सन्मान.'
              : 'Accredited with Grade "A" by ICAR, National Record in PPV & FRA crop registrations, and apex accolades celebrating agricultural research, water conservation, and farmer welfare excellence.'}
          </p>
        </div>

        {/* HERO SHOWCASE: DUAL APEX PILLARS (ICAR GRADE "A" & PPVFRA NATIONAL RECORD) */}
        <div className="w-full rounded-3xl bg-gradient-to-br from-[#0c2417] via-[#123623] to-[#0a1e13] border border-emerald-700/60 shadow-xl overflow-hidden relative">

          {/* Subtle Ambient Refractive Highlights */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 lg:p-10 relative z-10">

            {/* LEFT / CENTERPIECE: 3D PHOTOREALISTIC TROPHY & PPVFRA MEDALLION */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group max-w-[360px] sm:max-w-[420px] lg:max-w-full">
                {/* Golden ambient backlight behind trophy */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/30 via-emerald-500/20 to-transparent rounded-3xl blur-2xl group-hover:blur-3xl transition-all opacity-80" />

                {/* The 3D Illustrated Trophy & Medallion */}
                <img
                  src="/media/images/icar_ppvfra_excellence_award.jpg"
                  alt="ICAR Standing & PPVFRA National Record Golden Excellence Award Sculpture"
                  className="relative z-10 w-full rounded-2xl shadow-2xl border-2 border-amber-400/40 object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Subtitle Under Image */}
                <div className="mt-3 text-center">
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{language === 'mr' ? 'राष्ट्रीय कृषी उत्कृष्टता व वाण नोंदणी विक्रम' : 'National Agricultural Excellence & Germplasm Record'}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: APEX CREDENTIALS & 4 CORE PERFORMANCE PILLARS */}
            <div className="lg:col-span-7 space-y-6 text-white">

              {/* Badges Bar */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => openRecognitionById('ppvfra_record')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105 cursor-pointer"
                >
                  <Medal className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'पीपीव्ही-एफआरए · राष्ट्रीय विक्रमी नोंदणी' : 'PPV & FRA · NATIONAL RECORD'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openRecognitionById('icar_accreditation')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'mr' ? 'आयसीएआर "अ" श्रेणी मान्यताप्राप्त' : 'ICAR Grade "A" Accredited'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => openRecognitionById('seed_research')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  <Sprout className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'mr' ? 'दुहेरी उत्कृष्टता केंद्र' : 'Dual Centre of Excellence'}</span>
                </button>
              </div>

              {/* Main Headline */}
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {language === 'mr'
                    ? 'आयसीएआर "अ" श्रेणी मानांकन व पीपीव्ही-एफआरए अंतर्गत ३६ पीक वाणांची राष्ट्रीय विक्रमी नोंदणी'
                    : 'ICAR Grade "A" Standing & All-India Record for 36 Registered Crop Varieties (PPV & FRA)'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 mt-2.5 leading-relaxed font-medium">
                  {language === 'mr'
                    ? 'महात्मा फुले कृषि विद्यापीठाने उच्चांकी कृषी संशोधन, प्रगत बियाणे तंत्रज्ञान, जलव्यवस्थापन व शेतकरी अधिकार संवर्धनात सातत्य राखत राष्ट्रीय स्तरावर अग्रगण्य स्थान सिद्ध केले आहे.'
                    : 'Mahatma Phule Krishi Vidyapeeth has distinguished itself through ground-breaking agronomic research, premier seed multiplication, irrigation breakthroughs, and statutory protection of farmer varieties.'}
                </p>
              </div>

              {/* 4 Core Pillars of Evaluation & Standing (Clickable to open Popup) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">

                {/* Pillar 1: ICAR Accreditation */}
                <button
                  type="button"
                  onClick={() => openRecognitionById('icar_accreditation')}
                  className="w-full text-left p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 hover:bg-white/20 transition-all group/p1 cursor-pointer"
                >
                  <div className="p-2 rounded-xl bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 group-hover/p1:scale-105 transition-transform shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-emerald-200 font-semibold">
                      {language === 'mr' ? 'आयसीएआर सर्वोच्च मान्यता' : 'ICAR Institutional Accreditation'}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {language === 'mr' ? 'NAEAB "अ" श्रेणी मानांकन' : 'NAEAB Grade "A" Standing'}
                    </div>
                  </div>
                </button>

                {/* Pillar 2: PPVFRA National Record */}
                <button
                  type="button"
                  onClick={() => openRecognitionById('ppvfra_record')}
                  className="w-full text-left p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 hover:bg-white/20 transition-all group/p2 cursor-pointer"
                >
                  <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 group-hover/p2:scale-105 transition-transform shrink-0">
                    <Medal className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-amber-200 font-semibold">
                      {language === 'mr' ? 'पीपीव्ही व एफआरए राष्ट्रीय विक्रम' : 'PPV & FRA National Record'}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {language === 'mr' ? '३६ अधिसूचित वाणांची नोंदणी' : '36 Crop Varieties Registered'}
                    </div>
                  </div>
                </button>

                {/* Pillar 3: Dual Centre of Excellence */}
                <button
                  type="button"
                  onClick={() => openRecognitionById('water_management')}
                  className="w-full text-left p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 hover:bg-white/20 transition-all group/p3 cursor-pointer"
                >
                  <div className="p-2 rounded-xl bg-cyan-400/20 text-cyan-300 border border-cyan-400/30 group-hover/p3:scale-105 transition-transform shrink-0">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-cyan-200 font-semibold">
                      {language === 'mr' ? 'दुहेरी राष्ट्रीय उत्कृष्टता केंद्र' : 'Dual Centres of Excellence'}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {language === 'mr' ? 'बियाणे संशोधन व जलव्यवस्थापन' : 'Seed Research & Micro-Irrigation'}
                    </div>
                  </div>
                </button>

                {/* Pillar 4: AICRP Excellence */}
                <button
                  type="button"
                  onClick={() => openRecognitionById('vegetable_aicrp')}
                  className="w-full text-left p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-start gap-3 hover:bg-white/20 transition-all group/p4 cursor-pointer"
                >
                  <div className="p-2 rounded-xl bg-rose-400/20 text-rose-300 border border-rose-400/30 group-hover/p4:scale-105 transition-transform shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-rose-200 font-semibold">
                      {language === 'mr' ? 'अखिल भारतीय समन्वित प्रकल्प' : 'AICRP Research Honours'}
                    </div>
                    <div className="text-xs sm:text-[13px] font-bold text-white mt-0.5">
                      {language === 'mr' ? 'भाजीपाला, करडई व बाजरी देशात प्रथम' : 'Vegetables, Safflower & Bajra #1'}
                    </div>
                  </div>
                </button>

              </div>

              {/* Bottom Info Bar */}
              <div className="pt-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-200/90 font-medium">
                <span>
                  {language === 'mr'
                    ? 'अधिकृत राष्ट्रीय सन्मान व अधिस्वीकृती · भा.कृ.अनु.प. (ICAR) व पीपीव्ही-एफआरए (भारत सरकार)'
                    : 'Official Accreditations & Honours · ICAR & PPV-FRA, Govt. of India'}
                </span>
                <span className="text-[11px] text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  {language === 'mr' ? 'तपशील पाहण्यासाठी कार्डवर क्लिक करा' : 'Click any card to view full details'}
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* COMPREHENSIVE RECOGNITIONS DIRECTORY: FILTERABLE BY CATEGORY (CLICK TO OPEN POPUP) */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-300">
            <div className="flex items-center gap-2.5 font-bold text-base sm:text-lg text-slate-900">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-600 via-amber-600 to-teal-600 text-white shadow-xs">
                <Award className="w-4 h-4" />
              </div>
              <span>{language === 'mr' ? 'सर्व राष्ट्रीय सन्मान, पुरस्कार व उपलब्धी' : 'All Recognitions, Awards & Standing'}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {filteredRecognitions.length}
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap bg-white/90 p-1 rounded-2xl border border-stone-200 shadow-2xs text-xs">
              {[
                { id: 'all' as const, label: { en: 'All Recognitions', mr: 'सर्व सन्मान' } },
                { id: 'icar' as const, label: { en: 'ICAR Standing', mr: 'आयसीएआर' } },
                { id: 'ppvfra' as const, label: { en: 'PPV & FRA', mr: 'पीपीव्ही-एफआरए' } },
                { id: 'aicrp' as const, label: { en: 'AICRP Research', mr: 'संशोधन पुरस्कार' } },
                { id: 'history' as const, label: { en: 'State Honours', mr: 'राज्य सन्मान' } },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${activeCategory === tab.id
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                >
                  {getBilingual(tab.label)}
                </button>
              ))}
            </div>
          </div>

          {/* Compact Horizontal 3-Column Connected Flow Chart (Latest → 2013) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-4">
            {filteredRecognitions.map((item, idx) => {
              const Icon = item.icon;
              const stepLabel = String(idx + 1).padStart(2, '0');
              const hasNextInRow = idx < filteredRecognitions.length - 1 && (idx % 3 !== 2);
              const hasNextRowWrap = idx < filteredRecognitions.length - 1 && (idx % 3 === 2);

              return (
                <div key={item.id} className="relative flex flex-col">
                  {/* Horizontal Flow Arrow to Next Node in Row (Desktop 3-col) */}
                  {hasNextInRow && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -right-7 w-7 z-20 pointer-events-none"
                    >
                      <div className="w-2.5 h-0.5 bg-emerald-400" />
                      <div className="w-5 h-5 rounded-full bg-white border border-emerald-300 shadow-2xs flex items-center justify-center text-emerald-700 shrink-0">
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    </div>
                  )}

                  {/* Row-End Downward Flow Step Connector */}
                  {hasNextRowWrap && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:flex flex-col items-center absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
                    >
                      <div className="w-4 h-4 rounded-full bg-white border border-amber-300 shadow-2xs flex items-center justify-center text-amber-700">
                        <ChevronDown className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  )}

                  {/* Compact Flowchart Node Card */}
                  <button
                    type="button"
                    onClick={() => setSelectedRecognition(item)}
                    className={`w-full h-full text-left p-3.5 rounded-2xl ${item.styles.cardBg} border ${item.styles.border} shadow-2xs hover:shadow-md ${item.styles.glow} transition-all duration-200 flex flex-col justify-between gap-2.5 group cursor-pointer`}
                  >
                    <div className="space-y-2 w-full">
                      {/* Node Header: Step + Year + Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">
                            {stepLabel}
                          </span>
                          <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black shadow-2xs ${item.styles.yearBg}`}>
                            {item.year}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.styles.tagBg}`}>
                          {item.tag}
                        </span>
                      </div>

                      {/* Node Icon + Title */}
                      <div className="flex items-start gap-2.5">
                        <div className={`p-1.5 rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform ${item.styles.iconBg}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <h4 className={`text-xs sm:text-[13px] font-bold text-slate-900 transition-colors leading-snug line-clamp-2 ${item.styles.titleHover}`}>
                          {getBilingual(item.title)}
                        </h4>
                      </div>
                    </div>

                    {/* Compact Footer: Authority + Popup Trigger */}
                    <div className="pt-2 border-t border-stone-200/70 flex items-center justify-between text-[11px] text-slate-500 w-full gap-2">
                      <span className="font-medium text-slate-600 flex items-center gap-1 min-w-0">
                        <Building className="w-3 h-3 text-stone-400 shrink-0" />
                        <span className="truncate">{getBilingual(item.authority)}</span>
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0 flex items-center gap-1 group-hover:bg-emerald-100 transition-colors">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{language === 'mr' ? 'तपशील' : 'Details'}</span>
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* POPUP MODAL: DETAILED CONTENT OF SELECTED RECOGNITION                */}
      {/* ==================================================================== */}
      {selectedRecognition && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedRecognition(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white flex items-center justify-between relative overflow-hidden">
              <div className="flex items-center gap-2.5 relative z-10">
                <span className={`px-3 py-1 rounded-xl text-xs font-black shadow-xs ${selectedRecognition.styles.yearBg}`}>
                  {selectedRecognition.year}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white/20 text-white border border-white/25">
                  {selectedRecognition.tag}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedRecognition(null)}
                aria-label="Close modal"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors relative z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">

              {/* Main Title & Icon */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl flex-shrink-0 ${selectedRecognition.styles.iconBg}`}>
                  <selectedRecognition.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                    {getBilingual(selectedRecognition.title)}
                  </h3>
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                    <Building className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{getBilingual(selectedRecognition.authority)}</span>
                  </div>
                </div>
              </div>

              {/* Comprehensive Description */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  {language === 'mr' ? 'तपशीलवार पार्श्वभूमी व महत्त्व' : 'Detailed Background & Significance'}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {getBilingual(selectedRecognition.details || selectedRecognition.description)}
                </p>
              </div>

              {/* Key Highlights / Achievements */}
              {selectedRecognition.highlights && selectedRecognition.highlights.length > 0 && (
                <div className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                    <span>{language === 'mr' ? 'प्रमुख वैशिष्ट्ये व उपलब्धी' : 'Key Highlights & Impact'}</span>
                  </div>
                  <div className="space-y-2.5">
                    {selectedRecognition.highlights.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs sm:text-[13px] text-emerald-950 font-medium"
                      >
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{getBilingual(point)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bilingual Alternate Text Note */}
              <div className="pt-3 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                <span>
                  {language === 'mr' ? 'अधिकृत विद्यापीठ सन्मान संग्रह' : 'Official University Honours Directory'}
                </span>
                <span className="font-semibold text-emerald-800">
                  {language === 'mr' ? 'मफुकृवि, राहुरी' : 'MPKV Rahuri'}
                </span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedRecognition(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                {language === 'mr' ? 'बंद करा' : 'Close'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
