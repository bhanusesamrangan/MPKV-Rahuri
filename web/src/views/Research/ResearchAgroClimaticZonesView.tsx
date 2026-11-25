'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  CloudRain,
  Mountain,
  Thermometer,
  Sprout,
  Compass,
  Download,
  Building2,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Layers,
  Sparkles
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

interface ResearchAgroClimaticZonesViewProps {
  pageData?: any;
  currentZone: ZoneSlug;
}

export const ResearchAgroClimaticZonesView: React.FC<ResearchAgroClimaticZonesViewProps> = ({ pageData, currentZone }) => {
  const { language } = useLanguage();

  const zonesData: Record<ZoneSlug, any> = {
    'western-ghat-zone': {
      id: 'western-ghat-zone',
      titleEn: 'Western Ghat Zone (घाट विभाग)',
      titleMr: 'पश्चिम घाट विभाग (घाट व अति पर्जन्य विभाग)',
      badgeEn: 'High Rainfall & Hill Ecology',
      badgeMr: 'अति पर्जन्य व डोंगराळ विभाग',
      rainfall: '>3,000 to 5,000 mm',
      elevation: '600 – 1,400 m MSL',
      temperature: '12°C – 32°C',
      soil: {
        en: 'Lateritic, reddish-brown, acidic hill soils with high organic matter.',
        mr: 'जांभी, तांबूस तपकिरी, आम्लधर्मीय डोंगर उताराची सेंद्रिय कर्बयुक्त जमीन.'
      },
      districts: {
        en: 'Western crests of Satara, Kolhapur, Pune, and Ahmednagar districts.',
        mr: 'सातारा, कोल्हापूर, पुणे आणि अहमदनगर जिल्ह्यांचे पश्चिमेकडील सह्याद्री घाटमाथा क्षेत्र.'
      },
      mandateEn: 'National wheat rust pathotype screening, temperate and subtropical fruits (strawberry, raspberry), hill millets (finger millet/ragi, varai), aromatic rice varieties, and watershed ecology in high precipitation tracts.',
      mandateMr: 'गव्हावरील तांबेरा रोगाचे राष्ट्रीय पातळीवरील रोगनिदान चाचणी केंद्र, स्ट्रॉबेरी व थंड हवेतील फळे, नाचणी, वरई व डोंगराळ भागातील भात शेतीचे संशोधन.',
      stations: [
        {
          name: { en: 'Wheat Rust Mycology Research Station, Mahabaleshwar', mr: 'गहू तांबेरा संशोधन केंद्र, महाबळेश्वर' },
          est: '1941',
          focus: { en: 'National epicenter for screening all-India wheat genotypes against black, brown, and yellow rust races; strawberry clonal selection.', mr: 'भारतातील सर्व गहू वाणांचे तांबेरा रोगाविरुद्ध चाचणी घेणारे राष्ट्रीय केंद्र; स्ट्रॉबेरी सुधारणा.' },
          pdf: '/media/docs/73._Mahabaleshwar.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Radhanagari', mr: 'कृषी संशोधन केंद्र, राधानगरी' },
          est: '1962',
          focus: { en: 'High-rainfall paddy germplasm, hill millets, bamboo cultivation, and soil erosion control in fragile catchment areas.', mr: 'अतिवृष्टीतील भात वाण, नाचणी, बांबू लागवड व पाणलोट क्षेत्र मृद संवर्धन.' },
          pdf: '/media/docs/ARS_Radhanagari.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Lonavala', mr: 'कृषी संशोधन केंद्र, लोणावळा' },
          est: '1958',
          focus: { en: 'Off-season vegetable nursery, hill horticultural trials, and bio-resource conservation.', mr: 'हंगामपूर्व भाजीपाला रोपवाटिका, फलोत्पादन चाचण्या व जैवविविधता संवर्धन.' },
          pdf: '/media/docs/ARS_Lonavala.pdf'
        }
      ]
    },
    'sub-montane-zone': {
      id: 'sub-montane-zone',
      titleEn: 'Sub-Montane Zone (उप-पर्वतीय विभाग)',
      titleMr: 'उप-पर्वतीय विभाग (संक्रमण विभाग)',
      badgeEn: 'Transition Agrarian Tract',
      badgeMr: 'संक्रमण व उच्च कृषी उत्पादकता',
      rainfall: '1,250 – 3,000 mm',
      elevation: '500 – 800 m MSL',
      temperature: '15°C – 36°C',
      soil: {
        en: 'Reddish-brown to medium black, fertile loam soils with good drainage.',
        mr: 'तांबूस तपकिरी ते मध्यम काळी, उत्तम निचऱ्याची अत्यंत सुपीक गाळाची जमीन.'
      },
      districts: {
        en: 'Kolhapur, western parts of Sangli, Satara, and Pune districts.',
        mr: 'कोल्हापूर जिल्हा, तसेच सांगली, सातारा व पुणे जिल्ह्यांचा पश्चिमेकडील संक्रमण पट्टा.'
      },
      mandateEn: 'Sugarcane and jaggery technology, turmeric improvement, soybean-groundnut cropping systems, kharif paddy, and seed production of oilseeds and pulses.',
      mandateMr: 'ऊस व सेंद्रिय गूळ उत्पादन तंत्रज्ञान, हळद संशोधन, सोयाबीन व भुईमूग पीक पद्धती, खरीप भात आणि दर्जेदार बियाणे निर्मिती.',
      stations: [
        {
          name: { en: 'Zonal Agricultural Research Station (ZARS), Shenda Park, Kolhapur', mr: 'विभागीय कृषी संशोधन केंद्र (ZARS), शेंडा पार्क, कोल्हापूर' },
          est: '1981',
          focus: { en: 'Apex research headquarters for Sub-Montane zone; NARP Phase I & II schemes; cropping systems and livestock.', mr: 'उप-पर्वतीय विभागाचे मुख्य संशोधन केंद्र; एनएआरपी टप्पा १ व २; पीक पद्धती व जनावरांचे पोषण.' },
          pdf: '/media/docs/NARP_II_Kolhapur.pdf'
        },
        {
          name: { en: 'Regional Sugarcane & Jaggery Research Station, Kolhapur', mr: 'प्रादेशिक ऊस व गूळ संशोधन केंद्र, कोल्हापूर' },
          est: '1957',
          focus: { en: 'Premier jaggery research center in India; developed chemical-free crystalline jaggery and Kolhapur cane cultivars.', mr: 'भारतातील अग्रगण्य गूळ संशोधन केंद्र; रासायनिक अवशेषमुक्त सेंद्रिय गूळ तंत्रज्ञान व कोल्हापूर गूळ ब्रँड.' },
          pdf: '/media/docs/RSJRS_Kolhapur.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Kasbe Digraj (Sangli)', mr: 'कृषी संशोधन केंद्र, कसबे डिग्रज (सांगली)' },
          est: '1960',
          focus: { en: 'Lead center for Turmeric improvement (Phule Swaroop), betelvine disease control, and Krishna river canal agronomy.', mr: 'हळद संशोधनाचे प्रमुख केंद्र (फुले स्वरूप वाण), पानवेल रोग नियंत्रण व कृष्णा कालवा सिंचन शेती.' },
          pdf: '/media/docs/20260819_095328_6f57a4fb303c3b98ee5438bb57d9535a.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Karad', mr: 'कृषी संशोधन केंद्र, कराड' },
          est: '1958',
          focus: { en: 'Soybean (Phule Sangam, Phule Kimaya), groundnut (Phule Unnati), and multi-tier intercropping models.', mr: 'सोयाबीन (फुले संगम, फुले किमया) व भुईमूग संशोधन केंद्र; आंतरपीक पद्धतीचे प्रमाणीकरण.' },
          pdf: '/media/docs/20260819_092324_4f31cf831bc450d4f4319de37e931def.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Vadgaon Maval', mr: 'कृषी संशोधन केंद्र, वडगाव मावळ' },
          est: '1940',
          focus: { en: 'Aromatic fine rice (Indrayani, Phule Samruddhi, Bhogavati) and scented hill paddy breeding.', mr: 'सुवासिक व तलम भात वाण (इंद्रायणी, फुले समृद्धी, भोगावती) यांचे आद्य जनक केंद्र.' },
          pdf: '/media/docs/20260819_092345_49245a8e84526cf8258b9a1b2c0a33a7.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Gadhinglaj', mr: 'कृषी संशोधन केंद्र, गडहिंग्लज' },
          est: '1970',
          focus: { en: 'Minor millets, niger, pulses, and border-region agro-climatic testing.', mr: 'पोषक तृणधान्ये, कारळे, कडधान्ये व सीमावर्ती शेती चाचण्या.' },
          pdf: '/media/docs/ARS_Gadhinglaj.pdf'
        }
      ]
    },
    'plain-zone': {
      id: 'plain-zone',
      titleEn: 'Plain Zone (मैदानी विभाग)',
      titleMr: 'मैदानी विभाग (कॅनॉल सिंचन व प्रगत शेती)',
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
        en: 'Ahmednagar, Pune plains, Dhule, Jalgaon, and parts of Satara/Solapur canals.',
        mr: 'अहमदनगर, पुणे मैदानी भाग, धुळे, जळगाव आणि कालवा लाभक्षेत्र.'
      },
      mandateEn: 'Sugarcane varietal breeding, wheat and maize improvements, cotton biotechnology, oilseeds research (groundnut, sesame, sunflower), hi-tech horticulture, and precision tractor machinery.',
      mandateMr: 'ऊस पैदास, गहू व मका संशोधन, कापूस जैवतंत्रज्ञान, गळीतधान्ये (भुईमूग, तीळ, सूर्यफूल), संरक्षित फलोत्पादन व आधुनिक शेती यंत्रे.',
      stations: [
        {
          name: { en: 'Central Campus Agricultural Research Complex, MPKV Rahuri', mr: 'मध्यवर्ती कृषी संशोधन संकुल, म.फु.कृ.वि. राहुरी' },
          est: '1968',
          focus: { en: 'Apex research headquarters; Sorghum, Pulses, Cotton, Cattle Breeding, Medicinal Plants, Tissue Culture, and PGI labs.', mr: 'विद्यापीठाचे सर्वोच्च संशोधन केंद्र; ज्वारी, कडधान्ये, कापूस, गोवंश सुधारणा, औषधी वनस्पती व पदव्युत्तर प्रयोगशाळा.' },
          pdf: '/media/docs/Sorghum_Rahuri.pdf'
        },
        {
          name: { en: 'Central Sugarcane Research Station (CSRS), Padegaon', mr: 'मध्यवर्ती ऊस संशोधन केंद्र, पाडेगाव' },
          est: '1932',
          focus: { en: 'Historic sugarcane research center in India; created legendary varieties Co-86032, CoM-0265, Phule 10001.', mr: 'भारतातील ऐतिहासिक ऊस संशोधन केंद्र; को-८६०३२, कोएम-०२६५ व फुले १०००१ या क्रांतीकारी वाणांचे जनक.' },
          pdf: '/media/docs/CSRS_Padegaon.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Niphad', mr: 'कृषी संशोधन केंद्र, निफाड' },
          est: '1932',
          focus: { en: 'Premier wheat specialist center; developed rust-resistant bread and durum wheats (Phule Samadhan, Trimbak, Godawari).', mr: 'महाराष्ट्रातील प्रमुख गहू संशोधन केंद्र; फुले समाधान, त्र्यंबक, गोदावरी या चपाती व बन्सी गहू वाणांची निर्मिती.' },
          pdf: '/media/docs/ARS_Niphad.pdf'
        },
        {
          name: { en: 'Oilseeds Research Station, Jalgaon', mr: 'गळीतधान्य संशोधन केंद्र, जळगाव' },
          est: '1932',
          focus: { en: 'Pioneered Khandesh groundnut (JL-24 Phule Pragati, JL-501), sesame (Tapi, Padma), and cotton cropping schemes.', mr: 'खान्देशातील विख्यात केंद्र; जेएल-२४ (फुले प्रगती) भुईमूग, तापी व पद्मा तीळ आणि कापूस संशोधन.' },
          pdf: '/media/docs/20260819_110031_9b11f7d281f42e5887624ee489ccd3ca.pdf'
        },
        {
          name: { en: 'Zonal Agricultural Research Station (ZARS), Ganeshkhind, Pune', mr: 'विभागीय कृषी संशोधन केंद्र, गणेशखिंड, पुणे' },
          est: '1873',
          focus: { en: 'One of the oldest botanical stations in India; high-tech vegetable breeding, papaya, guava (Sardar L-49), and flower crops.', mr: 'भारतातील आद्य संशोधन केंद्रांपैकी एक; भाजीपाला संकर, पपई, सरदार पेरू आणि फुलशेती संशोधन.' },
          pdf: '/media/docs/ZARS_Ganeshkhind.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Savlivihir', mr: 'कृषी संशोधन केंद्र, सावळीविहीर' },
          est: '1965',
          focus: { en: 'Cereal research, nucleus and breeder seed production, and canal-command water audit.', mr: 'तृणधान्य संशोधन, पायाभूत व पैदासकार बियाणे निर्मिती आणि कालवा पाणी व्यवस्थापन.' },
          pdf: '/media/docs/20260819_105811_504f25c66ff00272d697170cf3b71256.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Dhule', mr: 'कृषी संशोधन केंद्र, धुळे' },
          est: '1923',
          focus: { en: 'Pulses, oilseeds, pasture grasses, and Khandesh dryland agriculture.', mr: 'कडधान्य, गळीतधान्य, कुरण गवत व खान्देश शेती पद्धती संशोधन.' },
          pdf: '/media/docs/ARS_Dhule.pdf'
        }
      ]
    },
    'scarcity-zone': {
      id: 'scarcity-zone',
      titleEn: 'Scarcity Zone (अवर्षणग्रस्त विभाग)',
      titleMr: 'अवर्षणग्रस्त विभाग (कोरडवाहू व अवर्षण प्रवण शेती)',
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
          name: { en: 'Zonal Agricultural Research Station (ZARS), Solapur', mr: 'विभागीय कृषी संशोधन केंद्र (ZARS), सोलापूर' },
          est: '1933',
          focus: { en: 'National center of excellence for dryland agriculture; developed compartment bunding, soil physics improvement, and drought indices.', mr: 'भारतातील कोरडवाहू शेतीचे अग्रणी केंद्र; ढाळीचे बांध, मटका सिंचन व अवर्षण निर्देशांक संशोधन.' },
          pdf: '/media/docs/Dryland_Solapur.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Mohol (Solapur)', mr: 'कृषी संशोधन केंद्र, मोहोळ (सोलापूर)' },
          est: '1928',
          focus: { en: 'Cradle of Rabi Sorghum (Phule Vasudha, Phule Chitra, Phule Revati, M-35-1 Maldandi refinement); drought physiological screening.', mr: 'रब्बी ज्वारीचे आद्य माहेरघर; फुले वसुधा, फुले चित्रा, फुले रेवती व मालदांडी-३५-१ चे सुधारित क्लोन्स.' },
          pdf: '/media/docs/ARS_Mohol.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Jeur', mr: 'कृषी संशोधन केंद्र, जेऊर' },
          est: '1959',
          focus: { en: 'Dryland pulse breeding, safflower oilseed trials, and moisture stress alleviation.', mr: 'कोरडवाहू हरभरा, करडई गळीतधान्य आणि ओलावा संवर्धन पद्धती.' },
          pdf: '/media/docs/20260819_100701_4da40671eb65999877924864314c60b0.pdf'
        },
        {
          name: { en: 'Agricultural Research Station, Chas (Ahmednagar)', mr: 'कृषी संशोधन केंद्र, चास (अहमदनगर)' },
          est: '1962',
          focus: { en: 'Scarcity zone pearl millet (Shraddha, Saburi), minor millets, and dryland agroforestry.', mr: 'अवर्षणग्रस्त बाजरी (श्रद्धा, सबुरी), नाचणी व कोरडवाहू कृषी वनशेती.' },
          pdf: '/media/docs/ARS_Chas.pdf'
        },
        {
          name: { en: 'Pulses & Oilseed Research Project, Pandharpur', mr: 'कडधान्य व गळीतधान्य संशोधन प्रकल्प, पंढरपूर' },
          est: '1975',
          focus: { en: 'Short-duration pulses, safflower breeding, and canal-periphery dryland farming.', mr: 'कमी कालावधीत येणारे कडधान्य, करडई आणि भीमा नदी लाभक्षेत्रातील शेती.' },
          pdf: '/media/docs/ARS_Pandharpur.pdf'
        }
      ]
    },
    'central-plateau-zone': {
      id: 'central-plateau-zone',
      titleEn: 'Central Plateau Zone (मध्य पठार विभाग)',
      titleMr: 'मध्य पठार विभाग (द्राक्षे, कांदा व सुवासिक भात विभाग)',
      badgeEn: 'Specialty Horticulture & Paddy Valley',
      badgeMr: 'विशेष फलोत्पादन, द्राक्ष, कांदा व भात पट्टा',
      rainfall: '700 – 900 mm',
      elevation: '550 – 750 m MSL',
      temperature: '10°C – 38°C',
      soil: {
        en: 'Medium to heavy well-drained soils, excellent for wine grapes, table grapes, onion, and garlic.',
        mr: 'मध्यम ते खोल उत्तम निचऱ्याची तांबूस-काळी मृदा, द्राक्ष बागा व कांदा पिकासाठी अत्यंत अनुकूल.'
      },
      districts: {
        en: 'Nashik district, northern Ahmednagar, and upper Godavari valley.',
        mr: 'नाशिक जिल्हा, उत्तर अहमदनगर व गोदावरी खोऱ्याचा पठारी प्रदेश.'
      },
      mandateEn: 'Export grape production protocols, commercial onion and garlic breeding (storage shelf-life), aromatic and glutinous rice breeding in tribal zones, and arid fruit trees (fig and custard apple).',
      mandateMr: 'निर्यातक्षम द्राक्ष उत्पादन, कांदा व लसूण दीर्घ टिकवणक्षमता वाण, आदिवासी क्षेत्रातील सुवासिक भात आणि अंजीर-सीताफळ संशोधन.',
      stations: [
        {
          name: { en: 'Zonal Agricultural Research Station (ZARS), Igatpuri (Nashik)', mr: 'विभागीय कृषी संशोधन केंद्र (ZARS), इगतपुरी (नाशिक)' },
          est: '1940',
          focus: { en: 'Premier Hill and Tribal Paddy Research Station; created scented rice varieties (Phule Radha, Phule Samruddhi) and tribal farming models.', mr: 'डोंगर व आदिवासी क्षेत्रातील भात संशोधन केंद्र; सुवासिक भात वाण (फुले राधा, समृद्धी) व एनएआरपी योजना.' },
          pdf: '/media/docs/NARP_II_Igatpuri.pdf'
        },
        {
          name: { en: 'National Agricultural Research Project (NARP), Pimpalgaon Baswant', mr: 'राष्ट्रीय कृषी संशोधन प्रकल्प, पिंपळगाव बसवंत' },
          est: '1982',
          focus: { en: 'Export table grapes management, post-harvest onion storage structures (Phule Kanda Chawl), and garlic breeding.', mr: 'निर्यातक्षम द्राक्ष व्यवस्थापन, सुधारित कांदा चाळ तंत्रज्ञान व लसूण संशोधन.' },
          pdf: '/media/docs/20260819_100155_530246c485a00bbc702a827e8a88e1c5.pdf'
        },
        {
          name: { en: 'Pomegranate Research Station, Lakhmapur (Nashik)', mr: 'डाळिंब संशोधन केंद्र, लखमापूर (नाशिक)' },
          est: '1995',
          focus: { en: 'Bacterial blight (Telya) management, precision micro-irrigation in pomegranate, and export residue checks.', mr: 'डाळिंबावरील तेल्या रोग व्यवस्थापन, सूक्ष्म सिंचन व निर्यात दर्जा तपासणी.' },
          pdf: '/media/docs/PRS_Lakhmapur.pdf'
        },
        {
          name: { en: 'Fig & Custard Apple Research Centre, Jadhavwadi (Pune)', mr: 'अंजीर व सीताफळ संशोधन केंद्र, जाधववाडी (पुणे)' },
          est: '1978',
          focus: { en: 'National leader in Fig (Poona Fig, Dinkar) and Custard Apple (Phule Purandar, Balanagar); fruit processing protocols.', mr: 'अंजीर (पुणे अंजीर, दिनकर) आणि सीताफळ (फुले पुरंदर) संशोधनाचे देशातील अग्रगण्य केंद्र.' },
          pdf: '/media/docs/20260819_094300_33d47fd4e1237855bc4df95a846d9625.pdf'
        }
      ]
    }
  };

  const zone = zonesData[currentZone] || zonesData['western-ghat-zone'];

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

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-10 sm:py-14 space-y-12">

        {/* 1. Zone Switcher Navigation Bar */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-4">
          {[
            { id: 'western-ghat-zone', labelEn: 'Western Ghat Zone', labelMr: 'पश्चिम घाट विभाग' },
            { id: 'sub-montane-zone', labelEn: 'Sub-Montane Zone', labelMr: 'उप-पर्वतीय विभाग' },
            { id: 'plain-zone', labelEn: 'Plain Zone', labelMr: 'मैदानी विभाग' },
            { id: 'scarcity-zone', labelEn: 'Scarcity Zone', labelMr: 'अवर्षणग्रस्त विभाग' },
            { id: 'central-plateau-zone', labelEn: 'Central Plateau Zone', labelMr: 'मध्य पठार विभाग' }
          ].map((z) => (
            <Link
              key={z.id}
              href={`/research/${z.id}`}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                currentZone === z.id
                  ? 'bg-amber-950 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? z.labelMr : z.labelEn}
            </Link>
          ))}
        </div>

        {/* 2. Zone Agro-Ecological Profile Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase">
              <CloudRain className="w-4 h-4 text-blue-600" />
              <span>{language === 'mr' ? 'वार्षिक पर्जन्यमान' : 'Annual Rainfall'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-serif">
              {zone.rainfall}
            </div>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              {language === 'mr' ? 'सरासरी पर्जन्य' : 'Zonal Average Precipitation'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase">
              <Mountain className="w-4 h-4 text-emerald-600" />
              <span>{language === 'mr' ? 'समुद्रसपाटीपासून उंची' : 'Elevation (Altitude)'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-serif">
              {zone.elevation}
            </div>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              {language === 'mr' ? 'उंची श्रेणी' : 'Meters above sea level'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase">
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

          <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>{language === 'mr' ? 'संशोधन केंद्रे' : 'Research Stations'}</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 mt-2 font-serif">
              {zone.stations.length} {language === 'mr' ? 'केंद्रे' : 'Centers'}
            </div>
            <p className="text-xs text-stone-600 mt-1 font-medium">
              {language === 'mr' ? 'सक्रिय संशोधन केंद्रे' : 'Active Regional Stations'}
            </p>
          </div>
        </div>

        {/* 3. Soil & District Coverage Card */}
        <section className="p-6 rounded-3xl bg-white border border-amber-200/90 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-amber-800 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'मृदा गुणधर्म व रचना' : 'Soil Profile & Characteristics'}</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {language === 'mr' ? zone.soil.mr : zone.soil.en}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase text-amber-800 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'जिल्हा कार्यक्षेत्र' : 'District Jurisdiction'}</span>
              </span>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                {language === 'mr' ? zone.districts.mr : zone.districts.en}
              </p>
            </div>
          </div>
        </section>

        {/* 4. Active Regional Research Stations Cards */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>{language === 'mr' ? 'विभागातील संशोधन केंद्रे' : 'Active Research Stations'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'mr' ? 'केंद्रांची माहिती व तांत्रिक कार्यक्रम' : 'Regional Stations, Focus Crops & Official Documents'}
              </h2>
            </div>

            <span className="text-xs font-bold text-stone-500">
              {zone.stations.length} {language === 'mr' ? 'संशोधन केंद्रे कार्यरत' : 'Operational Centers'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {zone.stations.map((st: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      Est. {st.est}
                    </span>
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{zone.titleEn.split('(')[0].trim()}</span>
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                    {language === 'mr' ? st.name.mr : st.name.en}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-medium">
                    {language === 'mr' ? st.focus.mr : st.focus.en}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-stone-500">
                    MPKV Research Center
                  </span>

                  <a
                    href={st.pdf.startsWith('http') ? st.pdf : (st.pdf.startsWith('/') ? st.pdf : `/media/docs/${st.pdf}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-2xs hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'योजना तपशील PDF' : 'Scheme PDF'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
