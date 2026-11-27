'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  CloudRain,
  Mountain,
  Thermometer,
  Building2,
  Calendar,
  User,
  Phone,
  Mail,
  Wheat,
  FolderGit2,
  Search,
  ExternalLink,
  ChevronRight,
  Compass,
  FileText,
  Sparkles,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero } from './components/ResearchHero';

export type ZoneSlug =
  | 'western-ghat-zone'
  | 'sub-montane-zone'
  | 'plain-zone'
  | 'scarcity-zone'
  | 'central-plateau-zone';

interface StationRecord {
  id: string;
  name: { en: string; mr: string };
  district: { en: string; mr: string };
  establishment: string;
  incharge: { en: string; mr: string };
  contact: string;
  email: string;
  crops: { en: string; mr: string };
  schemes: { en: string; mr: string };
  image: string;
}

interface ZoneDetails {
  id: ZoneSlug;
  titleEn: string;
  titleMr: string;
  badgeEn: string;
  badgeMr: string;
  rainfall: string;
  elevation: string;
  temperature: string;
  soil: { en: string; mr: string };
  districts: { en: string; mr: string };
  mandateEn: string;
  mandateMr: string;
  stations: StationRecord[];
}

interface ResearchAgroClimaticZonesViewProps {
  pageData?: any;
  currentZone: ZoneSlug;
}

export const ResearchAgroClimaticZonesView: React.FC<ResearchAgroClimaticZonesViewProps> = ({
  pageData,
  currentZone
}) => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeZoneKey, setActiveZoneKey] = useState<ZoneSlug>(currentZone);

  // Keep activeZoneKey synced with currentZone prop
  React.useEffect(() => {
    setActiveZoneKey(currentZone);
  }, [currentZone]);

  const zonesData: Record<ZoneSlug, ZoneDetails> = {
    'western-ghat-zone': {
      id: 'western-ghat-zone',
      titleEn: 'Western Ghat Zone',
      titleMr: 'पश्चिम घाट विभाग',
      badgeEn: 'High Rainfall & Hill Agro-Ecology',
      badgeMr: 'अति पर्जन्य व सह्याद्री घाटमाथा विभाग',
      rainfall: '>3,000 to 5,000 mm',
      elevation: '600 – 1,400 m MSL',
      temperature: '12°C – 32°C',
      soil: {
        en: 'Lateritic, reddish-brown, acidic hill soils with high organic matter and rapid drainage.',
        mr: 'जांभी, तांबूस तपकिरी, आम्लधर्मीय डोंगर उताराची सेंद्रिय कर्बयुक्त व जलद निचऱ्याची जमीन.'
      },
      districts: {
        en: 'Western crests and ghats of Satara, Kolhapur, Pune, and Nashik/Ahmednagar districts.',
        mr: 'सातारा, कोल्हापूर, पुणे आणि नाशिक/अहमदनगर जिल्ह्यांचे पश्चिमेकडील सह्याद्री घाटमाथा क्षेत्र.'
      },
      mandateEn: 'National wheat rust pathotype screening, temperate and subtropical fruits (strawberry, raspberry), hill millets (finger millet/ragi, varai), aromatic rice varieties, and watershed ecology in high precipitation tracts.',
      mandateMr: 'गव्हावरील तांबेरा रोगाचे राष्ट्रीय पातळीवरील रोगनिदान चाचणी केंद्र, स्ट्रॉबेरी व थंड हवेतील फळे, नाचणी, वरई व डोंगराळ भागातील भात शेतीचे संशोधन.',
      stations: [
        {
          id: 'zars-igatpuri',
          name: {
            en: 'Zonal Agricultural Research Station, Igatpuri Dist. Nashik',
            mr: 'विभागीय कृषी संशोधन केंद्र, इगतपुरी जि. नाशिक'
          },
          district: { en: 'Nashik', mr: 'नाशिक' },
          establishment: '1941',
          incharge: {
            en: 'Dr. Avinash K. Kolage',
            mr: 'डॉ. अविनाश के. कोळगे'
          },
          contact: '7588520483, 9881329539',
          email: 'adrigatpuri@gmail.com',
          crops: {
            en: 'Paddy, Minor millets, Niger',
            mr: 'भात, पोषक तृणधान्ये (नाचणी, वरई), कारळे'
          },
          schemes: {
            en: 'ARS on Rice Research & Extension Work Centre, NARP Phase I, NARP Phase II, AICRP on Niger.',
            mr: 'भात संशोधन व विस्तार केंद्र, एनएआरपी टप्पा १ व २, अखिल भारतीय समन्वित कारळे संशोधन प्रकल्प (AICRP on Niger).'
          },
          image: '/media/images/research-stations/igatpuri.JPG'
        },
        {
          id: 'ars-lonavala',
          name: {
            en: 'Agricultural Research Station, Lonavala Dist. Pune',
            mr: 'कृषी संशोधन केंद्र, लोणावळा जि. पुणे'
          },
          district: { en: 'Pune', mr: 'पुणे' },
          establishment: '20 June, 1958',
          incharge: {
            en: 'Dr. Anilkumar M. Tirmali',
            mr: 'डॉ. अनिलकुमार एम. तिरमली'
          },
          contact: '8788406162',
          email: 'ars_lonawala@rediffmail.com',
          crops: {
            en: 'Paddy, Hill horticulture',
            mr: 'भात, डोंगराळ भागातील फलोत्पादन'
          },
          schemes: {
            en: 'Agricultural Research Station (ARS) State Scheme.',
            mr: 'कृषी संशोधन केंद्र (ARS) राज्य योजना.'
          },
          image: '/media/images/research-stations/ARS_Lonavala_Final.jpg'
        },
        {
          id: 'ars-radhanagari',
          name: {
            en: 'Agricultural Research Station, Radhanagari, Dist. Kolhapur',
            mr: 'कृषी संशोधन केंद्र, राधानगरी जि. कोल्हापूर'
          },
          district: { en: 'Kolhapur', mr: 'कोल्हापूर' },
          establishment: '1948',
          incharge: {
            en: 'Dr. Shailesh Kumbhar',
            mr: 'डॉ. शैलेश कुंभार'
          },
          contact: '9420431582',
          email: 'ars_radhanagari@rediffmail.com',
          crops: {
            en: 'Paddy, Hill Millets',
            mr: 'भात, नाचणी व डोंगर उतारावरील पिके'
          },
          schemes: {
            en: 'Agricultural Research Station (ARS) State Scheme.',
            mr: 'कृषी संशोधन केंद्र (ARS) राज्य योजना.'
          },
          image: '/media/images/research-stations/Radhanagari.jpg'
        },
        {
          id: 'rwrrsm-mahabaleshwar',
          name: {
            en: 'Regional Wheat Rust Research Station, Mahabaleshwar, Dist. Satara',
            mr: 'प्रादेशिक गहू तांबेरा संशोधन केंद्र, महाबळेश्वर जि. सातारा'
          },
          district: { en: 'Satara', mr: 'सातारा' },
          establishment: '18 March, 1941',
          incharge: {
            en: 'Dr. Darshan Kadam',
            mr: 'डॉ. दर्शन कदम'
          },
          contact: '9405956795',
          email: 'rwrrsm@rediffmail.com',
          crops: {
            en: 'Wheat, Strawberry, Raspberry',
            mr: 'गहू, स्ट्रॉबेरी, रासबेरी'
          },
          schemes: {
            en: 'ARS on Wheat, Rust Mycology Research Station, NARP Phase I, NARP Phase II, AICRP on Wheat Rust.',
            mr: 'गहू संशोधन केंद्र, तांबेरा कवकशास्त्र संशोधन केंद्र, एनएआरपी टप्पा १ व २, अखिल भारतीय समन्वित गहू तांबेरा संशोधन प्रकल्प.'
          },
          image: '/media/images/research-stations/Mahabaleshwar.JPG'
        }
      ]
    },
    'sub-montane-zone': {
      id: 'sub-montane-zone',
      titleEn: 'Sub-Montane Zone',
      titleMr: 'उप-पर्वतीय विभाग',
      badgeEn: 'Transition Agrarian Tract',
      badgeMr: 'संक्रमण व उच्च कृषी उत्पादकता पट्टा',
      rainfall: '1,250 – 3,000 mm',
      elevation: '500 – 800 m MSL',
      temperature: '15°C – 36°C',
      soil: {
        en: 'Reddish-brown to medium black, fertile loam soils with excellent moisture retention and drainage.',
        mr: 'तांबूस तपकिरी ते मध्यम काळी, उत्तम निचऱ्याची अत्यंत सुपीक गाळाची जमीन.'
      },
      districts: {
        en: 'Kolhapur, western parts of Sangli, Satara, and Pune districts.',
        mr: 'कोल्हापूर जिल्हा, तसेच सांगली, सातारा व पुणे जिल्ह्यांचा पश्चिमेकडील संक्रमण पट्टा.'
      },
      mandateEn: 'Sugarcane and jaggery technology, turmeric improvement, soybean-groundnut cropping systems, kharif paddy, and quality seed production of oilseeds and pulses.',
      mandateMr: 'ऊस व सेंद्रिय गूळ उत्पादन तंत्रज्ञान, हळद संशोधन, सोयाबीन व भुईमूग पीक पद्धती, खरीप भात आणि दर्जेदार बियाणे निर्मिती.',
      stations: [
        {
          id: 'zars-kolhapur',
          name: {
            en: 'Zonal Agricultural Research Station, Shenda Park, Kolhapur',
            mr: 'विभागीय कृषी संशोधन केंद्र, शेंडा पार्क, कोल्हापूर'
          },
          district: { en: 'Kolhapur', mr: 'कोल्हापूर' },
          establishment: '1985',
          incharge: {
            en: 'Dr. S.R. Karad',
            mr: 'डॉ. एस. आर. कराड'
          },
          contact: '9420330036, 7620572683',
          email: 'adrkolhapur@rediffmail.com',
          crops: {
            en: 'Sugarcane, Maize, Minor Millets, Groundnut',
            mr: 'ऊस, मका, पोषक तृणधान्ये (नाचणी, वरई), भुईमूग'
          },
          schemes: {
            en: 'NARP Phase I, NARP Phase II, AICRP on Maize, AICRP on Small Millets.',
            mr: 'एनएआरपी टप्पा १ व २, अखिल भारतीय मका संशोधन प्रकल्प (AICRP on Maize), अखिल भारतीय लहान तृणधान्य प्रकल्प.'
          },
          image: '/media/images/research-stations/ZARS_Kolhapur.JPG'
        },
        {
          id: 'rsjrs-kolhapur',
          name: {
            en: 'Regional Sugarcane and Jaggery Research Station, Kolhapur',
            mr: 'प्रादेशिक ऊस व गूळ संशोधन केंद्र, कोल्हापूर'
          },
          district: { en: 'Kolhapur', mr: 'कोल्हापूर' },
          establishment: '1957',
          incharge: {
            en: 'Dr. Vidyasagar Gedam',
            mr: 'डॉ. विद्यासागर गेडाम'
          },
          contact: '9689003422',
          email: 'rsjrs_kpr@rediffmail.com',
          crops: {
            en: 'Sugarcane, Jaggery Technology',
            mr: 'ऊस, सेंद्रिय गूळ तंत्रज्ञान'
          },
          schemes: {
            en: 'State Research Scheme on Sugarcane, AICRP on Sugarcane, AICRP on PHET (Post-Harvest Engineering & Tech).',
            mr: 'ऊस राज्य संशोधन योजना, अखिल भारतीय समन्वित ऊस प्रकल्प, कापणी पश्चात अभियांत्रिकी व तंत्रज्ञान प्रकल्प (PHET).'
          },
          image: '/media/images/research-stations/RSJRS.JPG'
        },
        {
          id: 'ars-karad',
          name: {
            en: 'Agricultural Research Station, Karad, Dist. Satara',
            mr: 'कृषी संशोधन केंद्र, कराड जि. सातारा'
          },
          district: { en: 'Satara', mr: 'सातारा' },
          establishment: '1948',
          incharge: {
            en: 'Dr. H.S. Sonawane',
            mr: 'डॉ. एच. एस. सोनावणे'
          },
          contact: '9765826544',
          email: 'arskarad@rediffmail.com',
          crops: {
            en: 'Kharif / Rabi cereals, oilseeds and pulses (Soybean, Groundnut)',
            mr: 'खरीप/रब्बी तृणधान्ये, गळीतधान्य व कडधान्ये (सोयाबीन, भुईमूग)'
          },
          schemes: {
            en: 'Agricultural Research Station (ARS) Scheme.',
            mr: 'कृषी संशोधन केंद्र योजना.'
          },
          image: '/media/images/research-stations/Karad.jpg'
        },
        {
          id: 'ars-vadgaon-maval',
          name: {
            en: 'Agricultural Research Station, Vadgaon Maval, Dist. Pune',
            mr: 'कृषी संशोधन केंद्र, वडगाव मावळ जि. पुणे'
          },
          district: { en: 'Pune', mr: 'पुणे' },
          establishment: '1948',
          incharge: {
            en: 'Dr. T.J. Bhor',
            mr: 'डॉ. टी. जे. भोर'
          },
          contact: '9422560142, 9405938125',
          email: 'ars_vadgaonmaval@rediffmail.com',
          crops: {
            en: 'Aromatic & Fine Rice (Indrayani, Phule Samruddhi, Bhogavati)',
            mr: 'सुवासिक व तलम भात (इंद्रायणी, फुले समृद्धी, भोगावती)'
          },
          schemes: {
            en: 'Agricultural Research Station Rice Breeding Scheme.',
            mr: 'कृषी संशोधन केंद्र भात पैदास योजना.'
          },
          image: '/media/images/research-stations/V._Maval_-_Edited.JPG'
        },
        {
          id: 'ars-gadhinglaj',
          name: {
            en: 'Agricultural Research Station, Gadhinglaj, Dist. Kolhapur',
            mr: 'कृषी संशोधन केंद्र, गडहिंग्लज जि. कोल्हापूर'
          },
          district: { en: 'Kolhapur', mr: 'कोल्हापूर' },
          establishment: '1957',
          incharge: {
            en: 'Dr. Nitin Dalal',
            mr: 'डॉ. नितीन दलाल'
          },
          contact: '02321-234041, 9922450990',
          email: 'ars_gadhinglaj@rediffmail.com',
          crops: {
            en: 'Soybean, Chilli, Tobacco, Pulses',
            mr: 'सोयाबीन, मिरची, तंबाखू, कडधान्ये'
          },
          schemes: {
            en: 'Agricultural Research Station Scheme.',
            mr: 'कृषी संशोधन केंद्र योजना.'
          },
          image: '/media/images/research-stations/Gadhinglaj.JPG'
        }
      ]
    },
    'plain-zone': {
      id: 'plain-zone',
      titleEn: 'Plain Zone',
      titleMr: 'मैदानी विभाग',
      badgeEn: 'Intensive Canal & Agricultural Core',
      badgeMr: 'कालवा सिंचन व विद्यापीठाचा मुख्य केंद्रभाग',
      rainfall: '700 – 1,250 mm',
      elevation: '450 – 650 m MSL',
      temperature: '14°C – 42°C',
      soil: {
        en: 'Deep black vertisols (regur), high clay content with rich moisture retention capacity.',
        mr: 'खोल काळी कसदार रेगूर जमीन, उत्तम ओलावा टिकवून ठेवणारी सुपीक गाळाची मृदा.'
      },
      districts: {
        en: 'Ahmednagar, Pune plains, Dhule, Jalgaon, and parts of Satara/Solapur canal tracts.',
        mr: 'अहमदनगर, पुणे मैदानी भाग, धुळे, जळगाव आणि कालवा लाभक्षेत्र.'
      },
      mandateEn: 'Sugarcane varietal breeding, wheat and maize improvements, cotton biotechnology, oilseeds research (groundnut, sesame, sunflower), hi-tech horticulture, and precision tractor machinery.',
      mandateMr: 'ऊस पैदास, गहू व मका संशोधन, कापूस जैवतंत्रज्ञान, गळीतधान्ये (भुईमूग, तीळ, सूर्यफूल), संरक्षित फलोत्पादन व आधुनिक शेती यंत्रे.',
      stations: [
        {
          id: 'zars-ganeshkhind',
          name: {
            en: 'Zonal Agricultural Research Station, Ganeshkhind, Pune',
            mr: 'विभागीय कृषी संशोधन केंद्र, गणेशखिंड, पुणे'
          },
          district: { en: 'Pune', mr: 'पुणे' },
          establishment: '28 April, 1921',
          incharge: {
            en: 'Dr. D.B. Lad',
            mr: 'डॉ. डी. बी. लाड'
          },
          contact: '020-25693750, 25898734, 9604503076, 9422519610',
          email: 'zars_gkpune@rediffmail.com',
          crops: {
            en: 'Fruits (Papaya, Guava L-49), Vegetables, Flowers',
            mr: 'फळे (पपई, सरदार पेरू), भाजीपाला, फुलशेती'
          },
          schemes: {
            en: 'NARP Phase I & II, Fruit Research Station, Vegetable Improvement Scheme, Papaya Breeding Scheme, AICRP on Potato, AICRP on Floriculture.',
            mr: 'एनएआरपी टप्पा १ व २, फळ संशोधन केंद्र, भाजीपाला सुधारणा योजना, पपई पैदास योजना, बटाटा व फुलशेती अखिल भारतीय समन्वित प्रकल्प.'
          },
          image: '/media/images/research-stations/Ganeshkhind_Pune.jpg'
        },
        {
          id: 'ars-niphad',
          name: {
            en: 'Agriculture Research Station Niphad, Dist. Nashik',
            mr: 'कृषी संशोधन केंद्र, निफाड जि. नाशिक'
          },
          district: { en: 'Nashik', mr: 'नाशिक' },
          establishment: '20 October, 1932',
          incharge: {
            en: 'Dr. B.M. Mhaske',
            mr: 'डॉ. बी. एम. म्हस्के'
          },
          contact: '02550-241023, 9850243426, 9420364447',
          email: 'arsniphad@yahoo.co.in',
          crops: {
            en: 'Wheat (Bread wheat, Durum/Bansi wheat)',
            mr: 'गहू (चपाती गहू, बन्सी गहू)'
          },
          schemes: {
            en: 'ARS, Main Scheme ARS, NARP, AICRP on Wheat & Barley.',
            mr: 'कृषी संशोधन केंद्र, मुख्य योजना, एनएआरपी, अखिल भारतीय गहू व बार्ली संशोधन प्रकल्प.'
          },
          image: '/media/images/research-stations/Niphad.jpg'
        },
        {
          id: 'ars-kasbe-digraj',
          name: {
            en: 'Agriculture Research Station Kasbe Digraj, Dist. Sangli',
            mr: 'कृषी संशोधन केंद्र, कसबे डिग्रज जि. सांगली'
          },
          district: { en: 'Sangli', mr: 'सांगली' },
          establishment: '1958',
          incharge: {
            en: 'Dr. A.B. Rajguru',
            mr: 'डॉ. ए. बी. राजगुरू'
          },
          contact: '0233-2437275, 9423335631',
          email: 'arskdigraj@rediffmail.com',
          crops: {
            en: 'Soybean, Turmeric (Phule Swaroop), Sugarcane, Salt affected soils',
            mr: 'सोयाबीन, हळद (फुले स्वरूप), ऊस, क्षारपड जमीन सुधारणा'
          },
          schemes: {
            en: 'NARP, Turmeric Research Scheme.',
            mr: 'एनएआरपी, हळद संशोधन योजना.'
          },
          image: '/media/images/research-stations/K._Digraj.JPG'
        },
        {
          id: 'ars-pimpalgaon-baswant',
          name: {
            en: 'Agriculture Research Station, Pimpalgaon Baswant, Dist. Nashik',
            mr: 'कृषी संशोधन केंद्र, पिंपळगाव बसवंत जि. नाशिक'
          },
          district: { en: 'Nashik', mr: 'नाशिक' },
          establishment: '1959',
          incharge: {
            en: 'Dr. R.V. Patil',
            mr: 'डॉ. आर. व्ही. पाटील'
          },
          contact: '02550 - 250305, 9404112597',
          email: 'ogrs_pb@rediffmail.com',
          crops: {
            en: 'Onion, Garlic, Grape',
            mr: 'कांदा, लसूण, द्राक्ष'
          },
          schemes: {
            en: 'Onion Research Scheme, Grape Research Scheme.',
            mr: 'कांदा संशोधन योजना, द्राक्ष संशोधन योजना.'
          },
          image: '/media/images/research-stations/Pimpalgaon_Baswant.jpg'
        },
        {
          id: 'ac-pune-research',
          name: {
            en: 'Agriculture College Research Complex, Pune',
            mr: 'कृषी महाविद्यालय संशोधन संकुल, पुणे'
          },
          district: { en: 'Pune', mr: 'पुणे' },
          establishment: '1960',
          incharge: {
            en: 'Dr. S.G. Bhalekar',
            mr: 'डॉ. एस. जी. भालेकर'
          },
          contact: '020-25537033, 25538489, 9405854606',
          email: 'mushroompune@rediffmail.com, dsp_bio@rediffmail.com',
          crops: {
            en: 'Mushroom, Biofertilizers, Biological Control, Fiber Crops',
            mr: 'अळंबी (मशरूम), जैविक खते, जैविक कीड नियंत्रण, तंतूवर्गीय पिके'
          },
          schemes: {
            en: 'AICRP on Mushroom, BNF Research Project, AICRP on Biocontrol, Control of Ergot in Bajra, Agril. Botany Economy Development Project, Fiber Crops Breeding and Development Project, Maharashtra State Cereal Pulses Oil Seed and Tobacco Project.',
            mr: 'अखिल भारतीय अळंबी प्रकल्प, जैविक नत्र स्थिरीकरण (BNF), जैविक कीड नियंत्रण प्रकल्प, बाजरी अर्गट नियंत्रण, तंतूवर्गीय पिके पैदास प्रकल्प.'
          },
          image: '/media/images/research-stations/Pune_Old_20200109043638_20200110103047.jpg'
        }
      ]
    },
    'scarcity-zone': {
      id: 'scarcity-zone',
      titleEn: 'Scarcity Zone',
      titleMr: 'अवर्षणग्रस्त विभाग',
      badgeEn: 'Drought Prone Dryland Hub',
      badgeMr: 'कोरडवाहू शेती व अवर्षण व्यवस्थापन केंद्र',
      rainfall: '<700 mm (Erratic & Uncertain)',
      elevation: '400 – 600 m MSL',
      temperature: '16°C – 44°C',
      soil: {
        en: 'Shallow to medium black soils with varying depth, vulnerable to severe moisture deficit.',
        mr: 'उथळ ते मध्यम काळी जमीन, हलकी खडकाळ मृदा, तीव्र पाणी टंचाई व भेगा पडणारी माती.'
      },
      districts: {
        en: 'Solapur, eastern Ahmednagar, eastern Pune, eastern Satara, and parts of Sangli.',
        mr: 'सोलापूर जिल्हा, पूर्व अहमदनगर, पूर्व पुणे, पूर्व सातारा आणि पूर्व सांगलीचा अवर्षण पट्टा.'
      },
      mandateEn: 'National leadership in dryland farming technologies, watershed management, rabi sorghum drought physiology, chickpea wilt breeding, pomegranate orchard management, and minor millets.',
      mandateMr: 'कोरडवाहू शेती तंत्रज्ञान, रब्बी ज्वारीचे अवर्षण सहनशील वाण, हरभरा मर रोग नियंत्रण, डाळिंब बागांचे काटेकोर पाणी व्यवस्थापन व चारा पिके.',
      stations: [
        {
          id: 'zars-solapur',
          name: {
            en: 'Zonal Agriculture Research Station, Solapur',
            mr: 'विभागीय कृषी संशोधन केंद्र, सोलापूर'
          },
          district: { en: 'Solapur', mr: 'सोलापूर' },
          establishment: '13 June, 1933',
          incharge: {
            en: 'Dr. N.J. Ranshur',
            mr: 'डॉ. एन. जे. रणशूर'
          },
          contact: '0217-2373047, 0217-2373209, 7875317673',
          email: 'zarssolapur@rediffmail.com',
          crops: {
            en: 'Dryland crops (Rabi Sorghum, Chickpea, Safflower)',
            mr: 'कोरडवाहू पिके (रब्बी ज्वारी, हरभरा, करडई)'
          },
          schemes: {
            en: 'AICRP on Agrometeorology, AICRP on Dryland Agriculture, AICRP on Safflower, Extensive Research on Dryland Agriculture, NARP Phase-I & II, Oilseed Research Scheme, Soil Physics Improvement Scheme.',
            mr: 'अखिल भारतीय कृषी हवामानशास्त्र प्रकल्प, कोरडवाहू शेती प्रकल्प, करडई संशोधन प्रकल्प, एनएआरपी टप्पा १ व २, मृदा भौतिकी सुधारणा योजना.'
          },
          image: '/media/images/research-stations/ZARS_Solapur.JPG'
        },
        {
          id: 'csrs-padegaon',
          name: {
            en: 'Central Sugarcane Research Station, Padegaon, Dist. Satara',
            mr: 'मध्यवर्ती ऊस संशोधन केंद्र, पाडेगाव जि. सातारा'
          },
          district: { en: 'Satara', mr: 'सातारा' },
          establishment: '28 April, 1932',
          incharge: {
            en: 'Dr. R.L. Bhilare',
            mr: 'डॉ. आर. एल. भिलारे'
          },
          contact: '02169-265334, 02169-365333, 8275473191',
          email: 'csrspadegaon@rediffmail.com',
          crops: {
            en: 'Sugarcane (Co-86032, CoM-0265, Phule 10001)',
            mr: 'ऊस (को-८६०३२, कोएम-०२६५, फुले १०००१)'
          },
          schemes: {
            en: 'AICRP on Sugarcane, Central Sugarcane Research Scheme.',
            mr: 'अखिल भारतीय समन्वित ऊस प्रकल्प, मध्यवर्ती ऊस संशोधन योजना.'
          },
          image: '/media/images/research-stations/Padegaon.jpg'
        },
        {
          id: 'ars-mohol',
          name: {
            en: 'Agriculture Research Station, Mohol, Dist. Solapur',
            mr: 'कृषी संशोधन केंद्र, मोहोळ जि. सोलापूर'
          },
          district: { en: 'Solapur', mr: 'सोलापूर' },
          establishment: '5 June, 1918',
          incharge: {
            en: 'Dr. Hitendra Rajput',
            mr: 'डॉ. हितेंद्र राजपूत'
          },
          contact: '02189-232244, 9284215256, 9850117536',
          email: 'kadam_d1958@rediffmail.com',
          crops: {
            en: 'Dryland crops (Rabi Sorghum Maldandi M-35-1, Vasudha, Revati)',
            mr: 'कोरडवाहू पिके (रब्बी ज्वारी मालदांडी ३५-१, वसुधा, रेवती)'
          },
          schemes: {
            en: 'AICRP on Sorghum, Rabi Sorghum Research Station.',
            mr: 'अखिल भारतीय ज्वारी संशोधन प्रकल्प, रब्बी ज्वारी संशोधन केंद्र.'
          },
          image: '/media/images/research-stations/Mohol.jpg'
        },
        {
          id: 'portc-pandharpur',
          name: {
            en: 'Pulse and Oilseed Research and Training Center, Pandharpur, Dist. Solapur',
            mr: 'कडधान्य व गळीतधान्य संशोधन व प्रशिक्षण केंद्र, पंढरपूर जि. सोलापूर'
          },
          district: { en: 'Solapur', mr: 'सोलापूर' },
          establishment: '10 June, 1981',
          incharge: {
            en: 'Dr. Ramesh Bhadane',
            mr: 'डॉ. रमेश भदाणे'
          },
          contact: '02186-223622, 7588813054, 9890915480',
          email: 'sitambe1961@gmail.com',
          crops: {
            en: 'Dryland oilseeds and pulses (Safflower, Chickpea, Pigeonpea)',
            mr: 'कोरडवाहू गळीतधान्य व कडधान्ये (करडई, हरभरा, तूर)'
          },
          schemes: {
            en: 'Pulse & Oilseed Research & Training Scheme.',
            mr: 'कडधान्य व गळीतधान्य संशोधन व प्रशिक्षण योजना.'
          },
          image: '/media/images/research-stations/pandharpur.jpg'
        },
        {
          id: 'ars-jeur',
          name: {
            en: 'Agriculture Research Station, Jeur, Dist. Solapur',
            mr: 'कृषी संशोधन केंद्र, जेऊर जि. सोलापूर'
          },
          district: { en: 'Solapur', mr: 'सोलापूर' },
          establishment: '31 May, 1941',
          incharge: {
            en: 'Dr. Shahaji Navale',
            mr: 'डॉ. शहाजी नवले'
          },
          contact: '02182-202018, 8788257891',
          email: 'ars_jeur@rediffmail.com',
          crops: {
            en: 'Dryland crops (Chickpea, Safflower, Rabi Sorghum)',
            mr: 'कोरडवाहू पिके (हरभरा, करडई, रब्बी ज्वारी)'
          },
          schemes: {
            en: 'Agricultural Research Station (ARS) Scheme.',
            mr: 'कृषी संशोधन केंद्र योजना.'
          },
          image: '/media/images/research-stations/Jeur.JPG'
        },
        {
          id: 'ars-savalvihir',
          name: {
            en: 'Agriculture Research Station, Savalvihir, Dist. Ahmednagar',
            mr: 'कृषी संशोधन केंद्र, सावळीविहीर जि. अहमदनगर'
          },
          district: { en: 'Ahmednagar', mr: 'अहमदनगर' },
          establishment: '1915',
          incharge: {
            en: 'Dr. P.S. Belhekar',
            mr: 'डॉ. पी. एस. बेल्हेकर'
          },
          contact: '9423004379',
          email: 'arssv1915@gmail.com',
          crops: {
            en: 'Dryland crops (Cereals, Pulses, Foundation & Breeder Seed)',
            mr: 'कोरडवाहू पिके (तृणधान्य, कडधान्य, पायाभूत व पैदासकार बियाणे)'
          },
          schemes: {
            en: 'Agricultural Research Station Scheme.',
            mr: 'कृषी संशोधन केंद्र योजना.'
          },
          image: '/media/images/research-stations/S._Vihir.JPG'
        },
        {
          id: 'ars-chas',
          name: {
            en: 'Agriculture Research Station, Chas, Dist. Ahmednagar',
            mr: 'कृषी संशोधन केंद्र, चास जि. अहमदनगर'
          },
          district: { en: 'Ahmednagar', mr: 'अहमदनगर' },
          establishment: '17 December, 1941',
          incharge: {
            en: 'Shri. Kashinath Gawari',
            mr: 'श्री. काशिनाथ गावारी'
          },
          contact: '0241-2570025, 8888697428, 9423864512',
          email: 'arschs@gmail.com',
          crops: {
            en: 'Dryland crops (Pearl millet, Minor millets, Agroforestry)',
            mr: 'कोरडवाहू पिके (बाजरी, नाचणी, वरई, कृषी वनशेती)'
          },
          schemes: {
            en: 'Agricultural Research Station (Non-plan) Scheme.',
            mr: 'कृषी संशोधन केंद्र (अ-योजना) योजना.'
          },
          image: '/media/images/research-stations/Chas-2.jpg'
        },
        {
          id: 'ars-dhule',
          name: {
            en: 'Agriculture Research Station, Dhule',
            mr: 'कृषी संशोधन केंद्र, धुळे'
          },
          district: { en: 'Dhule', mr: 'धुळे' },
          establishment: '1968',
          incharge: {
            en: 'Dr. K.K. Barate',
            mr: 'डॉ. के. के. बराटे'
          },
          contact: '02562-230368, 7588592110',
          email: 'ars.dhule@gmail.com',
          crops: {
            en: 'Pearlmillet, Cotton, Pulses, Pasture grass',
            mr: 'बाजरी, कापूस, कडधान्ये, कुरण गवत'
          },
          schemes: {
            en: 'NARP Scarcity Phase-I, Pasture Grasses, Oilseed & Pulses Improvement Project.',
            mr: 'एनएआरपी अवर्षण टप्पा १, कुरण गवत, गळीतधान्य व कडधान्य सुधारणा प्रकल्प.'
          },
          image: '/media/images/research-stations/Dhule_20200109044006_20200110102743.jpg'
        },
        {
          id: 'prttc-lakhmapur',
          name: {
            en: 'Pomegranate Research and Technology Transfer Centre, Lakhmapur, Dist. Nashik',
            mr: 'डाळिंब संशोधन व तंत्रज्ञान प्रसार केंद्र, लखमापूर जि. नाशिक'
          },
          district: { en: 'Nashik', mr: 'नाशिक' },
          establishment: '2012',
          incharge: {
            en: 'Dr. Sachin Hire',
            mr: 'डॉ. सचिन हिरे'
          },
          contact: '02555-235444, 7698536873',
          email: 'prttclakhmapur@gmail.com',
          crops: {
            en: 'Pomegranate (Bhagwa, Super Bhagwa, Bacterial Blight Management)',
            mr: 'डाळिंब (भगवा, सुपर भगवा, तेल्या रोग नियंत्रण तंत्रज्ञान)'
          },
          schemes: {
            en: 'Pomegranate Research and Technology Transfer Centre.',
            mr: 'डाळिंब संशोधन व तंत्रज्ञान प्रसार केंद्र.'
          },
          image: '/media/images/research-stations/Lakhmapur.JPG'
        }
      ]
    },
    'central-plateau-zone': {
      id: 'central-plateau-zone',
      titleEn: 'Central Plateau Zone',
      titleMr: 'मध्य पठार विभाग',
      badgeEn: 'Specialty Cash Crops & Horticulture Valley',
      badgeMr: 'विशेष नगदी पिके, केळी व गळीतधान्य पट्टा',
      rainfall: '700 – 900 mm',
      elevation: '550 – 750 m MSL',
      temperature: '10°C – 38°C',
      soil: {
        en: 'Medium to heavy well-drained alluvial black soils, ideal for banana, oilseeds, cotton, onion, and pulses.',
        mr: 'मध्यम ते खोल उत्तम निचऱ्याची तांबूस-काळी गाळाची मृदा, केळी, गळीतधान्ये, कापूस व कांदा पिकासाठी अत्यंत अनुकूल.'
      },
      districts: {
        en: 'Jalgaon, parts of Dhule, northern Nashik, and upper Tapi river basin.',
        mr: 'जळगाव जिल्हा, धुळे जिल्ह्याचा काही भाग व तापी खोऱ्याचा पठारी प्रदेश.'
      },
      mandateEn: 'National leadership in Banana micro-propagation and export protocols, Khandesh oilseeds (groundnut, sesame), Deshi cotton breeding, onion storage technology, and pulses cropping systems.',
      mandateMr: 'केळी उती संवर्धन व निर्यात तंत्रज्ञान, खान्देश गळीतधान्ये (भुईमूग, तीळ), देशी कापूस पैदास, सुधारित कांदा चाळ व कडधान्य पीक पद्धती.',
      stations: [
        {
          id: 'ors-jalgaon',
          name: {
            en: 'Oil Seed Research Station, Jalgaon',
            mr: 'गळीतधान्य संशोधन केंद्र, जळगाव'
          },
          district: { en: 'Jalgaon', mr: 'जळगाव' },
          establishment: '26 August, 1913',
          incharge: {
            en: 'Dr. D. V. Dahat',
            mr: 'डॉ. डी. व्ही. डहाट'
          },
          contact: '0257-2250888, 9763339573',
          email: 'orsjalgaon@gmail.com',
          crops: {
            en: 'Oil Seeds (Groundnut JL-24, Sesamum Tapi/Padma), Deshi cotton, Green gram',
            mr: 'गळीतधान्य (भुईमूग जेएल-२४, तीळ तापी/पद्मा), देशी कापूस, मूग'
          },
          schemes: {
            en: 'NARP Scarcity Phase-I, Oilseed Research Station, Experimental Farm, New Deshi Cotton & Tobacco Project, Nematode studies on Betel vine Project, Cereal, Pulses & Oilseed Development Project, Crop Meteorological Station, AICRP on Groundnut, AICRP on Sesamum.',
            mr: 'एनएआरपी अवर्षण टप्पा १, गळीतधान्य संशोधन केंद्र, देशी कापूस व तंबाखू प्रकल्प, विड्याच्या पानांवरील सूत्रकृमी अभ्यास प्रकल्प, अखिल भारतीय भुईमूग व तीळ संशोधन प्रकल्प.'
          },
          image: '/media/images/research-stations/Jalgaon.jpg'
        },
        {
          id: 'brs-jalgaon',
          name: {
            en: 'Banana Research Station, Jalgaon',
            mr: 'केळी संशोधन केंद्र, जळगाव'
          },
          district: { en: 'Jalgaon', mr: 'जळगाव' },
          establishment: '20 October, 1949',
          incharge: {
            en: 'Dr. Arun Bhosale',
            mr: 'डॉ. अरुण भोसले'
          },
          contact: '0257-2250986, 9405685005',
          email: 'brjjalgaon@gmail.com',
          crops: {
            en: 'Banana (Grand Naine, Basrai, Shrimanti, Tissue Culture Multiplication)',
            mr: 'केळी (ग्रँड नैन, बसराई, श्रीमंती, उती संवर्धित रोपे)'
          },
          schemes: {
            en: 'AICRP on Banana (All India Coordinated Research Project on Fruits).',
            mr: 'अखिल भारतीय समन्वित केळी संशोधन प्रकल्प (AICRP on Banana).'
          },
          image: '/media/images/research-stations/BRS_Jalgaon.jpg'
        }
      ]
    }
  };

  const zone = zonesData[activeZoneKey] || zonesData['western-ghat-zone'];

  // Filter stations based on search query
  const filteredStations = useMemo(() => {
    if (!searchTerm.trim()) return zone.stations;
    const term = searchTerm.toLowerCase();
    return zone.stations.filter((s) => {
      const matchName = s.name.en.toLowerCase().includes(term) || s.name.mr.toLowerCase().includes(term);
      const matchIncharge = s.incharge.en.toLowerCase().includes(term) || s.incharge.mr.toLowerCase().includes(term);
      const matchCrops = s.crops.en.toLowerCase().includes(term) || s.crops.mr.toLowerCase().includes(term);
      const matchSchemes = s.schemes.en.toLowerCase().includes(term) || s.schemes.mr.toLowerCase().includes(term);
      const matchDistrict = s.district.en.toLowerCase().includes(term) || s.district.mr.toLowerCase().includes(term);
      return matchName || matchIncharge || matchCrops || matchSchemes || matchDistrict;
    });
  }, [zone.stations, searchTerm]);

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={{ en: zone.titleEn, mr: zone.titleMr }} />

      <ResearchHero
        theme="zones"
        badge={{ en: zone.badgeEn, mr: zone.badgeMr }}
        title={{
          en: `${zone.titleEn} — Agro-Climatic Research Stations`,
          mr: `${zone.titleMr} — कृषी हवामान संशोधन केंद्रे`
        }}
        subtitle={{
          en: zone.mandateEn,
          mr: zone.mandateMr
        }}
        quickChips={[
          { label: zone.rainfall, icon: CloudRain },
          { label: zone.elevation, icon: Mountain },
          { label: zone.temperature, icon: Thermometer },
          { label: `${zone.stations.length} Research Stations`, icon: Building2 }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-5 sm:py-7 space-y-7">

        {/* 1. Zone Switcher Navigation Bar */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl border border-stone-200/90 shadow-2xs">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100 flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-emerald-700" />
              <span>{language === 'mr' ? '५ कृषी हवामान विभाग निवडा' : 'Select Agro-Climatic Zone (5 Zones)'}</span>
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {language === 'mr' ? 'एकूण २५ संशोधन केंद्रे' : 'Total 25 Research Stations'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'western-ghat-zone' as ZoneSlug, labelEn: 'Western Ghat Zone', labelMr: 'पश्चिम घाट विभाग', count: 4 },
              { id: 'sub-montane-zone' as ZoneSlug, labelEn: 'Sub-Montane Zone', labelMr: 'उप-पर्वतीय विभाग', count: 5 },
              { id: 'plain-zone' as ZoneSlug, labelEn: 'Plain Zone', labelMr: 'मैदानी विभाग', count: 5 },
              { id: 'scarcity-zone' as ZoneSlug, labelEn: 'Scarcity Zone', labelMr: 'अवर्षणग्रस्त विभाग', count: 9 },
              { id: 'central-plateau-zone' as ZoneSlug, labelEn: 'Central Plateau Zone', labelMr: 'मध्य पठार विभाग', count: 2 }
            ].map((z) => {
              const isActive = activeZoneKey === z.id;
              return (
                <Link
                  key={z.id}
                  href={`/research/${z.id}`}
                  onClick={() => {
                    setActiveZoneKey(z.id);
                    setSearchTerm('');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-2xs ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-800 to-green-700 text-white shadow-md ring-2 ring-emerald-600/30'
                      : 'bg-stone-50 text-stone-700 hover:bg-emerald-50 hover:text-emerald-900 border border-stone-200/80'
                  }`}
                >
                  <span>{language === 'mr' ? z.labelMr : z.labelEn}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-stone-700'
                    }`}
                  >
                    {z.count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* 2. Zone Agro-Ecological Profile Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-blue-300 transition-all">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider">
              <CloudRain className="w-4 h-4 text-blue-600" />
              <span>{language === 'mr' ? 'वार्षिक पर्जन्यमान' : 'Annual Rainfall'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-serif">
              {zone.rainfall}
            </div>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              {language === 'mr' ? 'विभागातील सरासरी पर्जन्य' : 'Zonal Average Precipitation'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-emerald-300 transition-all">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider">
              <Mountain className="w-4 h-4 text-emerald-600" />
              <span>{language === 'mr' ? 'समुद्रसपाटीपासून उंची' : 'Elevation (Altitude)'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-serif">
              {zone.elevation}
            </div>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              {language === 'mr' ? 'उंची श्रेणी (MSL)' : 'Meters above sea level'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-amber-300 transition-all">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider">
              <Thermometer className="w-4 h-4 text-amber-600" />
              <span>{language === 'mr' ? 'तापमान श्रेणी' : 'Temperature'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-serif">
              {zone.temperature}
            </div>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              {language === 'mr' ? 'किमान ते कमाल तापमान' : 'Thermal Regime'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-purple-300 transition-all">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>{language === 'mr' ? 'संशोधन केंद्रे' : 'Research Stations'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-serif">
              {zone.stations.length} {language === 'mr' ? 'केंद्रे' : 'Stations'}
            </div>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              {language === 'mr' ? 'कार्यरत संशोधन केंद्रे' : 'Active Operational Centers'}
            </p>
          </div>
        </div>

        {/* 3. Soil & District Coverage Card */}
        <section className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-stone-100 pb-4 md:pb-0 md:pr-6">
              <span className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1.5 tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'मृदा गुणधर्म व रचना' : 'Soil Profile & Characteristics'}</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {language === 'mr' ? zone.soil.mr : zone.soil.en}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1.5 tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'जिल्हा कार्यक्षेत्र' : 'District Jurisdiction'}</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {language === 'mr' ? zone.districts.mr : zone.districts.en}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Official Live Site Style Section Header & Real Station Cards */}
        <section className="space-y-6 pt-2">

          {/* Official Green Banner matching Live Website Reference (Curved Right Edge + Red Accent) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative inline-block">
              {/* Green curved header banner */}
              <div className="inline-flex items-center px-6 sm:px-10 py-2.5 sm:py-3 bg-[#1e824c] text-white font-black text-lg sm:text-2xl rounded-r-full shadow-md border-b-4 border-red-600">
                <span>{language === 'mr' ? zone.titleMr : zone.titleEn}</span>
              </div>
            </div>

            {/* Real-time search filter */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'mr' ? 'केंद्रे, पिके, शास्त्रज्ञ शोधा...' : 'Search stations, crops, scientists...'}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all shadow-2xs font-medium"
              />
            </div>
          </div>

          {/* Stations List */}
          {filteredStations.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-stone-200">
              <Building2 className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-600 text-sm font-semibold">
                {language === 'mr' ? 'कोणतेही संशोधन केंद्र सापडले नाही.' : 'No research station matched your search.'}
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-3 px-4 py-1.5 rounded-xl bg-stone-100 text-stone-800 text-xs font-bold hover:bg-stone-200 transition-colors"
              >
                {language === 'mr' ? 'शोध साफ करा' : 'Clear Search'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredStations.map((station, idx) => (
                <div
                  key={station.id || idx}
                  className="bg-white rounded-2xl border border-stone-200 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
                >
                  {/* Left Column: Authentic Station Building Image */}
                  <div className="w-full md:w-[280px] lg:w-[320px] shrink-0 bg-stone-100 relative min-h-[220px] md:min-h-auto flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-stone-200">
                    <img
                      src={station.image}
                      alt={station.name.en}
                      className="w-full h-full object-cover max-h-[300px] md:max-h-none hover:scale-105 transition-transform duration-500"
                      onError={(e: any) => {
                        // Fallback placeholder if image load fails
                        e.target.onerror = null;
                        e.target.src = '/media/images/mpkv_icon.png';
                        e.target.className = 'w-24 h-24 object-contain opacity-50 p-4';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-black/70 text-white backdrop-blur-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{language === 'mr' ? station.district.mr : station.district.en}</span>
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Exact Live Site Format & Verified Real Fields */}
                  <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-3.5 text-xs sm:text-[13px] text-slate-800 leading-relaxed font-normal">

                    {/* Field 1: Name */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <span className="font-bold text-slate-900 shrink-0 text-sm sm:text-base">
                        {language === 'mr' ? 'नाव' : 'Name'} -
                      </span>
                      <span className="font-bold text-slate-900 text-sm sm:text-base font-serif">
                        {language === 'mr' ? station.name.mr : station.name.en}
                      </span>
                    </div>

                    {/* Field 2: Establishment */}
                    <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                      <span className="font-bold text-slate-900 shrink-0">
                        {language === 'mr' ? 'स्थापना' : 'Establishment'} -
                      </span>
                      <span className="text-stone-700 font-semibold bg-stone-100 px-2.5 py-0.5 rounded-md border border-stone-200 inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-500" />
                        {station.establishment}
                      </span>
                    </div>

                    {/* Field 3: Name of Incharge */}
                    <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                      <span className="font-bold text-slate-900 shrink-0">
                        {language === 'mr' ? 'प्रभारी अधिकारी' : 'Name of Incharge'} -
                      </span>
                      <span className="text-emerald-950 font-bold inline-flex items-center gap-1">
                        <User className="w-3 h-3 text-emerald-700" />
                        {language === 'mr' ? station.incharge.mr : station.incharge.en}
                      </span>
                    </div>

                    {/* Field 4: Contact */}
                    {station.contact && (
                      <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                        <span className="font-bold text-slate-900 shrink-0">
                          {language === 'mr' ? 'संपर्क' : 'Contact'} -
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {station.contact.split(',').map((phone, pIdx) => {
                            const trimmed = phone.trim();
                            const cleanNum = trimmed.replace(/[^0-9]/g, '');
                            return (
                              <a
                                key={pIdx}
                                href={`tel:${cleanNum}`}
                                className="text-blue-700 hover:text-blue-900 hover:underline font-semibold inline-flex items-center gap-1 bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-200 transition-colors"
                              >
                                <Phone className="w-2.5 h-2.5 text-blue-600" />
                                <span>{trimmed}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Field 5: Email */}
                    {station.email && (
                      <div className="flex flex-wrap items-baseline gap-1 sm:gap-2">
                        <span className="font-bold text-slate-900 shrink-0">
                          {language === 'mr' ? 'ईमेल' : 'Email'} -
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {station.email.split(',').map((em, eIdx) => {
                            const trimmedEm = em.trim();
                            return (
                              <a
                                key={eIdx}
                                href={`mailto:${trimmedEm}`}
                                className="text-emerald-700 hover:text-emerald-900 hover:underline font-semibold inline-flex items-center gap-1 bg-emerald-50/80 px-2 py-0.5 rounded-md border border-emerald-200 transition-colors"
                              >
                                <Mail className="w-2.5 h-2.5 text-emerald-600" />
                                <span>{trimmedEm}</span>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Field 6: Crops */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 pt-1 border-t border-stone-100">
                      <span className="font-bold text-slate-900 shrink-0">
                        {language === 'mr' ? 'प्रमुख पिके' : 'Crops'} -
                      </span>
                      <span className="text-stone-800 font-medium leading-relaxed">
                        {language === 'mr' ? station.crops.mr : station.crops.en}
                      </span>
                    </div>

                    {/* Field 7: Research Schemes */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                      <span className="font-bold text-slate-900 shrink-0">
                        {language === 'mr' ? 'संशोधन योजना' : 'Research Schemes'} -
                      </span>
                      <span className="text-stone-700 leading-relaxed font-medium">
                        {language === 'mr' ? station.schemes.mr : station.schemes.en}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}

        </section>

      </div>
    </div>
  );
};
