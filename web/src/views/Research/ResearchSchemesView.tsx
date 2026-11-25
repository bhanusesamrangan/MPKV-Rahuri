'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Layers,
  Search,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Filter,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ResearchBreadcrumb } from './components/ResearchBreadcrumb';
import { ResearchHero, ResearchHeroTheme } from './components/ResearchHero';

export type ResearchSchemeType = 'aicrp' | 'state-schemes' | 'funded-projects';

interface ResearchSchemesViewProps {
  pageData?: any;
  schemeType: ResearchSchemeType;
}

export const ResearchSchemesView: React.FC<ResearchSchemesViewProps> = ({ pageData, schemeType }) => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 1. All 45 ICAR-AICRP Projects from Scraped Dataset
  const aicrpProjects = [
    { sr: '1', title: 'AICRP on Pearlmillet', pdf: '/media/docs/6._AICRP_on_Pearl_millet_20250926040115.pdf', category: 'cereals' },
    { sr: '2', title: 'Comprehensive Scheme for Studying the Cost of Cultivation of Principal Crops in Maharashtra', pdf: '/media/docs/1._Comprehensive_scheme_information_27.02.2025_20250926040125.pdf', category: 'resource' },
    { sr: '3', title: 'AICRP on Groundnut', pdf: '/media/docs/2._AICRP_on_Groundnut_20250926040137.pdf', category: 'pulses_oilseeds' },
    { sr: '4', title: 'AICRP on Sesamum', pdf: '/media/docs/3._AICRP_on_Sesamum_20250926040148.pdf', category: 'pulses_oilseeds' },
    { sr: '5', title: 'AICRP on Banana', pdf: '/media/docs/4._AICRP_on_Banana_20250926040202.pdf', category: 'horticulture' },
    { sr: '6', title: 'AICRP on Fig & Custard Apple', pdf: '/media/docs/5._AICRP_on_Fig_and_Custardapple_20250926040213.pdf', category: 'horticulture' },
    { sr: '7', title: 'AICRP on Sugarcane', pdf: '/media/docs/7._AICRP_on_Sugarcane_20250926040227.pdf', category: 'cash_crops' },
    { sr: '8', title: 'AICRP on Agrometerology', pdf: '/media/docs/38._Agromet.pdf', category: 'resource' },
    { sr: '9', title: 'AICRP on Safflower', pdf: '/media/docs/9._AICRP_on_Safflower_20250926040244.pdf', category: 'pulses_oilseeds' },
    { sr: '10', title: 'AICRP on Dryland Agriculture', pdf: '/media/docs/10._AICRP_on_Dryland_Agriculture_20250926040316.pdf', category: 'resource' },
    { sr: '11', title: 'AICRP on Potato', pdf: '/media/docs/11._AICRP_on_Potato_20250926040336.pdf', category: 'horticulture' },
    { sr: '12', title: 'AICRP on Biocontrol', pdf: '/media/docs/12._AICRP_on_Biocontrol_20250926040349.pdf', category: 'protection' },
    { sr: '13', title: 'AICRP on Mushroom', pdf: '/media/docs/13._AICRP_on_Mushroom_20250926040402.pdf', category: 'horticulture' },
    { sr: '14', title: 'AICRP on Floriculture', pdf: '/media/docs/14._AICRP_on_Floriculture_20250926040414.pdf', category: 'horticulture' },
    { sr: '15', title: 'AICRP on Wheat', pdf: '/media/docs/15._AICRP_on_Wheat_20250926040426.pdf', category: 'cereals' },
    { sr: '16', title: 'AICRP on Nematodes in Agriculture', pdf: '/media/docs/16._AICRP_on_Nematodes_20250926040438.pdf', category: 'protection' },
    { sr: '17', title: 'AICRP on Chickpea', pdf: '/media/docs/17._AICRP_on_Chickpea_20250926040449.pdf', category: 'pulses_oilseeds' },
    { sr: '18', title: 'AICRP on Cotton', pdf: '/media/docs/18._AICRP_on_Cotton_20250926040502.pdf', category: 'cash_crops' },
    { sr: '19', title: 'AICRP on Agroforestry', pdf: '/media/docs/19._AICRP_on_Agroforestry_20250926040513.pdf', category: 'resource' },
    { sr: '20', title: 'AICRP on Pigeonpea', pdf: '/media/docs/20._AICRP_on_Pigeonpea_20250926040526.pdf', category: 'pulses_oilseeds' },
    { sr: '21', title: 'AICRP on Honey Bees & Pollinators', pdf: '/media/docs/21._AICRP_on_Honeybees_and_Pollinators_20250926040540.pdf', category: 'protection' },
    { sr: '22', title: 'AICRP on Forage Crops & Utilization', pdf: '/media/docs/22._AICRP_on_Forage_Crops_20250926040552.pdf', category: 'resource' },
    { sr: '23', title: 'AICRP on Soybean', pdf: '/media/docs/23._AICRP_on_Soybean_20250926040604.pdf', category: 'pulses_oilseeds' },
    { sr: '24', title: 'AICRP on Sorghum', pdf: '/media/docs/24._AICRP_on_Sorghum_20250926040616.pdf', category: 'cereals' },
    { sr: '25', title: 'AICRP on Onion & Garlic', pdf: '/media/docs/25._AICRP_on_Onion_and_Garlic_20250926040629.pdf', category: 'horticulture' },
    { sr: '26', title: 'AICRP on Micro & Secondary Nutrients', pdf: '/media/docs/26._AICRP_on_Micro_and_Secondary_Nutrients_20250926040643.pdf', category: 'resource' },
    { sr: '27', title: 'AICRP on Farm Implements & Machinery (FIM)', pdf: '/media/docs/27._AICRP_on_FIM_20250926040656.pdf', category: 'engineering' },
    { sr: '28', title: 'AICRP on Irrigation Water Management (IWM)', pdf: '/media/docs/28._AICRP_on_IWM_20250926040710.pdf', category: 'resource' },
    { sr: '29', title: 'AICRP on Post Harvest Engineering & Technology (PHET)', pdf: '/media/docs/29._AICRP_on_PHET_20250926040724.pdf', category: 'engineering' },
    { sr: '30', title: 'AICRP on Renewable Energy Sources for Agriculture & Agro-Based Industries', pdf: '/media/docs/30._AICRP_on_Renewable_Energy_Sources_20250926040737.pdf', category: 'engineering' },
    { sr: '31', title: 'AICRP on Integrated Farming Systems (IFS)', pdf: '/media/docs/31._AICRP_on_IFS_20250926040751.pdf', category: 'resource' },
    { sr: '32', title: 'AICRP on Long Term Fertilizer Experiments (LTFE)', pdf: '/media/docs/32._AICRP_on_LTFE_20250926040804.pdf', category: 'resource' },
    { sr: '33', title: 'AICRP on Vegetable Crops', pdf: '/media/docs/33._AICRP_on_Vegetable_Crops_20250926040819.pdf', category: 'horticulture' },
    { sr: '34', title: 'AICRP on Weed Management', pdf: '/media/docs/34._AICRP_on_Weed_Management_20250926040833.pdf', category: 'protection' },
    { sr: '35', title: 'AICRP on Maize', pdf: '/media/docs/35._AICRP_on_Maize_20250926040847.pdf', category: 'cereals' },
    { sr: '36', title: 'AICRP on Small Millets', pdf: '/media/docs/36._AICRP_on_Small_Millets_20250926040901.pdf', category: 'cereals' },
    { sr: '37', title: 'AICRP on Tuber Crops', pdf: '/media/docs/37._AICRP_on_Tuber_Crops_20250926040914.pdf', category: 'horticulture' },
    { sr: '38', title: 'AICRP on Rice', pdf: '/media/docs/39._AICRP_on_Rice_20250926040941.pdf', category: 'cereals' },
    { sr: '39', title: 'AICRP on Arid Zone Fruits', pdf: '/media/docs/40._AICRP_on_Arid_Zone_Fruits_20250926040954.pdf', category: 'horticulture' },
    { sr: '40', title: 'AICRP on Medicinal & Aromatic Plants', pdf: '/media/docs/41._AICRP_on_MAP_20250926041007.pdf', category: 'horticulture' },
    { sr: '41', title: 'AICRP on Papaya & Subtropical Fruits', pdf: '/media/docs/42._AICRP_on_Subtropical_Fruits_20250926041021.pdf', category: 'horticulture' },
    { sr: '42', title: 'AICRP on Oilseeds (Sunflower & Safflower Center)', pdf: '/media/docs/43._AICRP_on_Oilseeds_20250926041034.pdf', category: 'pulses_oilseeds' },
    { sr: '43', title: 'AICRP on Biological Nitrogen Fixation (BNF)', pdf: '/media/docs/44._AICRP_on_BNF_20250926041047.pdf', category: 'resource' },
    { sr: '44', title: 'AICRP on Ergonomics & Safety in Agriculture (ESA)', pdf: '/media/docs/45._AICRP_on_ESA_20250926041100.pdf', category: 'engineering' },
    { sr: '45', title: 'AICRP on Plastic Applications in Agriculture (Plasticulture)', pdf: '/media/docs/46._AICRP_on_Plasticulture_20250926041113.pdf', category: 'engineering' }
  ];

  // 2. All 54 Non-Plan State Schemes from Scraped Dataset
  const stateSchemes = [
    { sr: '1', title: 'Agricultural Research Station, Savlivihir- 03 (ARS, Cereal Research Scheme, Nucleus Seed Scheme)', pdf: '/media/docs/20260819_105811_504f25c66ff00272d697170cf3b71256.pdf', station: 'Savlivihir' },
    { sr: '2', title: 'ZARS, Igatpuri Schemes- 03 (ARS, NARP I, NARP II)', pdf: '/media/docs/20260819_091947_3e1c118e70fddf25ae4ee4613268dd8e.pdf', station: 'Igatpuri' },
    { sr: '3', title: 'Department of Agril. Economics, Scheme for Strengthening of Research in Agril. Economics', pdf: '/media/docs/2._Scheme_for_Strengthening_of_Research_Agril._Economics_Department_of_Agril._Economics_pdf_-_Copy_20250927125716.pdf', station: 'Pune' },
    { sr: '4', title: 'Fig and Custard Apple Centre, Jadhavwadi', pdf: '/media/docs/20260819_094300_33d47fd4e1237855bc4df95a846d9625.pdf', station: 'Jadhavwadi' },
    { sr: '5', title: 'Oilseeds Research Station, Jalgaon- 09 (Establ. of Oilseeds, Farm, New Cotton, Tobacco, Groundnut, Sesame, Crop Weather, Nematodes on Betelvine, Cereals)', pdf: '/media/docs/20260819_110031_9b11f7d281f42e5887624ee489ccd3ca.pdf', station: 'Jalgaon' },
    { sr: '6', title: 'Medicinal and Aromatic Plants Project, Rahuri', pdf: '/media/docs/20260819_121805_d713516d2254d1679d47f86a12b12a35.pdf', station: 'Rahuri' },
    { sr: '7', title: 'Agril. Research Station, Jeur', pdf: '/media/docs/20260819_100701_4da40671eb65999877924864314c60b0.pdf', station: 'Jeur' },
    { sr: '8', title: 'Agricultural Research Station, Vadgaon Maval', pdf: '/media/docs/20260819_092345_49245a8e84526cf8258b9a1b2c0a33a7.pdf', station: 'Vadgaon Maval' },
    { sr: '9', title: 'Strengthening of Research on Fodder Crops', pdf: '/media/docs/5._Fodder_Crops.pdf', station: 'Rahuri' },
    { sr: '10', title: 'National Agricultural Research Project, Pimpalgaon Baswant', pdf: '/media/docs/20260819_100155_530246c485a00bbc702a827e8a88e1c5.pdf', station: 'Pimpalgaon Baswant' },
    { sr: '11', title: 'Agril. Research Station Karad', pdf: '/media/docs/20260819_092324_4f31cf831bc450d4f4319de37e931def.pdf', station: 'Karad' },
    { sr: '12', title: 'G-1, Main Scheme in Agril. Economics', pdf: '/media/docs/G-1_Main_Scheme_1_.pdf', station: 'Pune' },
    { sr: '13', title: 'Modern Pesticide Testing Scheme', pdf: '/media/docs/15._Pesticide_Testing_Scheme.pdf', station: 'Pune' },
    { sr: '14', title: 'Agril. Research Station, Kasbe Digraj- 02 (NARP, Turmeric)', pdf: '/media/docs/20260819_095328_6f57a4fb303c3b98ee5438bb57d9535a.pdf', station: 'Kasbe Digraj' },
    { sr: '15', title: 'NARP, Phase-I & II Mahabaleshwar', pdf: '/media/docs/73._Mahabaleshwar.pdf', station: 'Mahabaleshwar' },
    { sr: '16', title: 'Wheat Rust Mycology Research Station, Mahabaleshwar', pdf: '/media/docs/Wheat_Rust_Mahabaleshwar.pdf', station: 'Mahabaleshwar' },
    { sr: '17', title: 'Central Sugarcane Research Station, Padegaon', pdf: '/media/docs/CSRS_Padegaon.pdf', station: 'Padegaon' },
    { sr: '18', title: 'Agril. Research Station Gadhinglaj', pdf: '/media/docs/ARS_Gadhinglaj.pdf', station: 'Gadhinglaj' },
    { sr: '19', title: 'Agril. Research Station Radhanagari', pdf: '/media/docs/ARS_Radhanagari.pdf', station: 'Radhanagari' },
    { sr: '20', title: 'Regional Sugarcane & Jaggery Research Station, Kolhapur', pdf: '/media/docs/RSJRS_Kolhapur.pdf', station: 'Kolhapur' },
    { sr: '21', title: 'NARP Sub-montane Zone, Phase-II Kolhapur', pdf: '/media/docs/NARP_II_Kolhapur.pdf', station: 'Kolhapur' },
    { sr: '22', title: 'NARP Sub-montane Zone, Phase-I Kolhapur', pdf: '/media/docs/NARP_I_Kolhapur.pdf', station: 'Kolhapur' },
    { sr: '23', title: 'NARP, Phase-II Igatpuri', pdf: '/media/docs/NARP_II_Igatpuri.pdf', station: 'Igatpuri' },
    { sr: '24', title: 'NARP, Phase-I Igatpuri', pdf: '/media/docs/NARP_I_Igatpuri.pdf', station: 'Igatpuri' },
    { sr: '25', title: 'Pomegranate Research Station, Lakhmapur', pdf: '/media/docs/PRS_Lakhmapur.pdf', station: 'Lakhmapur' },
    { sr: '26', title: 'Agril. Research Station, Niphad- 03 (NARP-I, ARS, Main Centre)', pdf: '/media/docs/ARS_Niphad.pdf', station: 'Niphad' },
    { sr: '27', title: 'Agril. Research Station, Dhule- 03 (Pulses & Oilseed, Pasture Grasses, BRS)', pdf: '/media/docs/ARS_Dhule.pdf', station: 'Dhule' },
    { sr: '28', title: 'NARP, Phase-I & II Solapur', pdf: '/media/docs/NARP_Solapur.pdf', station: 'Solapur' },
    { sr: '29', title: 'Oilseed Research Scheme, Solapur', pdf: '/media/docs/Oilseed_Solapur.pdf', station: 'Solapur' },
    { sr: '30', title: 'Extensive Research on Dryland Agriculture, Solapur', pdf: '/media/docs/Dryland_Solapur.pdf', station: 'Solapur' },
    { sr: '31', title: 'Soil Physics Improvement Scheme, Solapur', pdf: '/media/docs/Soil_Solapur.pdf', station: 'Solapur' },
    { sr: '32', title: 'Pulses & Oilseed Research Project & Training Centre, Pandharpur', pdf: '/media/docs/ARS_Pandharpur.pdf', station: 'Pandharpur' },
    { sr: '33', title: 'Agril. Research Station, Mohol', pdf: '/media/docs/ARS_Mohol.pdf', station: 'Mohol' },
    { sr: '34', title: 'Agril. Research Station Lonavala', pdf: '/media/docs/ARS_Lonavala.pdf', station: 'Lonavala' },
    { sr: '35', title: 'Zonal Agril. Research Station, Ganeshkhind, Pune- 05 (Vegetable, NARP-I, Papaya, Fruit, Mali Training)', pdf: '/media/docs/ZARS_Ganeshkhind.pdf', station: 'Pune' },
    { sr: '36', title: 'Agril. College, Pune- 05 (Fibre Crops Breeding, Botany Scheme, Ergot in Bajra, BNF)', pdf: '/media/docs/AC_Pune.pdf', station: 'Pune' },
    { sr: '37', title: 'Agril. Research Station, Chas', pdf: '/media/docs/ARS_Chas.pdf', station: 'Chas' },
    { sr: '38', title: 'Tissue Culture Scheme', pdf: '/media/docs/Tissue_Culture.pdf', station: 'Rahuri' },
    { sr: '39', title: 'Research Cum Development Project on Cattle, Rahuri', pdf: '/media/docs/Cattle_Rahuri.pdf', station: 'Rahuri' },
    { sr: '40', title: 'Cost of Cultivation Project (Major crop), Rahuri', pdf: '/media/docs/COC_Rahuri.pdf', station: 'Rahuri' },
    { sr: '41', title: 'Economics of Bunding Scheme (HOD, Economics), Rahuri', pdf: '/media/docs/Bunding_Rahuri.pdf', station: 'Rahuri' },
    { sr: '42', title: 'Recent Insecticide Project (HOD, Entomology), Rahuri', pdf: '/media/docs/Insecticide_Rahuri.pdf', station: 'Rahuri' },
    { sr: '43', title: 'Micronutrient Project (HOD, SS & AC), Rahuri', pdf: '/media/docs/Micronutrient_Rahuri.pdf', station: 'Rahuri' },
    { sr: '44', title: 'Fruits Sub Centre, Shrirampur', pdf: '/media/docs/Shrirampur_Fruits.pdf', station: 'Shrirampur' },
    { sr: '45', title: 'Transfer of post from Niphad to Vegetable project, Rahuri', pdf: '/media/docs/Vegetable_Transfer_Rahuri.pdf', station: 'Rahuri' },
    { sr: '46', title: 'Vegetable Improvement Project, Rahuri', pdf: '/media/docs/Vegetable_Rahuri.pdf', station: 'Rahuri' },
    { sr: '47', title: 'Tomato Improvement Project, Rahuri', pdf: '/media/docs/Tomato_Rahuri.pdf', station: 'Rahuri' },
    { sr: '48', title: 'Onion Storage Project (HOD, Horticulture), Rahuri', pdf: '/media/docs/Onion_Storage_Rahuri.pdf', station: 'Rahuri' },
    { sr: '49', title: 'Cotton Improvement Project, Rahuri- 02 (Rahuri, Barshinagar)', pdf: '/media/docs/Cotton_Rahuri.pdf', station: 'Rahuri' },
    { sr: '50', title: 'Grass Research Scheme, Rahuri', pdf: '/media/docs/Grass_Rahuri.pdf', station: 'Rahuri' },
    { sr: '51', title: 'NARP Scarcity Zone, Rahuri', pdf: '/media/docs/NARP_Scarcity_Rahuri.pdf', station: 'Rahuri' },
    { sr: '52', title: 'Strengthening of Sorghum Improvement Project, Rahuri', pdf: '/media/docs/Sorghum_Rahuri.pdf', station: 'Rahuri' },
    { sr: '53', title: 'Sorghum Improvement Project, R-67, Rahuri', pdf: '/media/docs/Sorghum_R67_Rahuri.pdf', station: 'Rahuri' },
    { sr: '54', title: 'NARP, Scheme No. 31, Directorate of Research, Rahuri', pdf: '/media/docs/NARP_Scheme31_Rahuri.pdf', station: 'Rahuri' }
  ];

  // 3. Externally Funded Ad-hoc Projects
  const fundedProjects = [
    { sr: '1', title: 'Ongoing Ad-hoc Projects / Network / Collaborative Research Projects', pdf: '/media/docs/Ad-hoc_Project-2025_20250822031659.pdf', authority: 'Chief Minister Agricultural Research Assistant Funds & Central Schemes' },
    { sr: '2', title: 'Chief Minister Agricultural Research Assistant Projects (13 Ongoing Schemes)', pdf: '/media/docs/Ad-hoc_Project-2025_20250822031659.pdf', authority: 'Government of Maharashtra' },
    { sr: '3', title: 'CAAST-CSAWM: Center for Advanced Agricultural Science & Technology on Climate Smart Agriculture and Water Management', pdf: '/media/docs/Ad-hoc_Project-2025_20250822031659.pdf', authority: 'World Bank & ICAR-NAHEP' }
  ];

  // Determine current active config based on route
  const metaConfig = {
    aicrp: {
      theme: 'aicrp' as ResearchHeroTheme,
      title: { en: 'ICAR-AICRP Projects — All India Coordinated Research', mr: 'अखिल भारतीय समन्वित संशोधन प्रकल्प (ICAR-AICRP)' },
      subtitle: {
        en: '45 All India Coordinated Research Projects co-funded by ICAR (75%) and Govt. of Maharashtra (25%) conducting multi-location agricultural trials.',
        mr: 'भारतीय कृषी संशोधन परिषद (७५%) व महाराष्ट्र शासन (२५%) यांच्या संयुक्त निधीतून चालणारे ४५ अखिल भारतीय समन्वित संशोधन प्रकल्प.'
      },
      badge: { en: '45 Coordinated Projects', mr: '४५ राष्ट्रीय प्रकल्प' },
      data: aicrpProjects,
      chips: [
        { label: language === 'mr' ? '४५ अखिल भारतीय प्रकल्प' : '45 AICRP Projects', icon: Layers },
        { label: language === 'mr' ? '७५% ICAR : २५% राज्य शासन' : '75% ICAR : 25% State', icon: ShieldCheck },
        { label: language === 'mr' ? 'सर्व अहवाल डाउनलोड उपलब्ध' : 'Verified PDF Records', icon: Download }
      ]
    },
    'state-schemes': {
      theme: 'state-schemes' as ResearchHeroTheme,
      title: { en: 'Non-Plan State Schemes — Government of Maharashtra', mr: 'राज्य शासन योजनेतर संशोधन योजना (Non-Plan Schemes)' },
      subtitle: {
        en: '54 core state-funded schemes supporting station infrastructure, plant breeding, farm trials, and regional agro-climatic stations.',
        mr: 'महाराष्ट्र शासनाच्या थेट अनुदानातून विद्यापीठाच्या २७ संशोधन केंद्रांवर अविरत सुरू असलेल्या ५४ योजनेतर संशोधन योजनांची माहिती.'
      },
      badge: { en: '54 State Funded Schemes', mr: '५४ राज्य शासन योजना' },
      data: stateSchemes,
      chips: [
        { label: language === 'mr' ? '५४ राज्य शासन योजना' : '54 State Schemes', icon: Layers },
        { label: language === 'mr' ? '२७ संशोधन केंद्रांवर कार्यरत' : 'Spread Across 27 Stations', icon: Building2 },
        { label: language === 'mr' ? '१००% राज्य शासन अनुदानित' : '100% State Funded', icon: ShieldCheck }
      ]
    },
    'funded-projects': {
      theme: 'funded-projects' as ResearchHeroTheme,
      title: { en: 'Externally Funded Projects — Ad-hoc & Network Grants', mr: 'बाह्य अनुदानीत प्रकल्प (Externally Funded Projects)' },
      subtitle: {
        en: 'Special research initiatives funded by Chief Minister Agricultural Research Assistant Funds, Central Ministries, World Bank, and private agri-industries.',
        mr: 'मुख्यमंत्री कृषी संशोधन निधी, केंद्र शासन, जागतिक बँक आणि नामवंत कृषी संस्थांमार्फत चालणारे विशेष संशोधन प्रकल्प.'
      },
      badge: { en: 'Competitive Grants & Ad-hoc Projects', mr: 'विशेष बाह्य अनुदानित प्रकल्प' },
      data: fundedProjects,
      chips: [
        { label: language === 'mr' ? 'मुख्यमंत्री कृषी संशोधन निधी' : 'CM Agri Research Funds', icon: Sparkles },
        { label: language === 'mr' ? 'कास्ट-सीएसएडब्लूएम जागतिक बँक' : 'World Bank NAHEP', icon: Layers },
        { label: language === 'mr' ? 'अहवाल व परिपत्रक' : 'Official Gazettes', icon: Download }
      ]
    }
  };

  const currentConfig = metaConfig[schemeType] || metaConfig.aicrp;

  // Filter schemes based on search query and category
  const filteredSchemes = useMemo(() => {
    return currentConfig.data.filter((item: any) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sr.includes(searchQuery);

      if (schemeType === 'aicrp') {
        if (selectedCategory === 'all') return matchSearch;
        return matchSearch && item.category === selectedCategory;
      }

      if (schemeType === 'state-schemes') {
        if (selectedCategory === 'all') return matchSearch;
        return matchSearch && (item.station || '').toLowerCase() === selectedCategory.toLowerCase();
      }

      return matchSearch;
    });
  }, [currentConfig.data, searchQuery, selectedCategory, schemeType]);

  return (
    <div className="w-full bg-[#fbf9f4] min-h-screen text-slate-800">
      <ResearchBreadcrumb currentPageTitle={currentConfig.title} />

      <ResearchHero
        theme={currentConfig.theme}
        badge={currentConfig.badge}
        title={currentConfig.title}
        subtitle={currentConfig.subtitle}
        quickChips={currentConfig.chips}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-8">

        {/* Navigation Tabs between Schemes */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <Link
              href="/research/aicrp"
              className={`px-4 py-2 rounded-xl transition-all ${
                schemeType === 'aicrp'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'ICAR-AICRP प्रकल्प (४५)' : 'ICAR-AICRP Projects (45)'}
            </Link>
            <Link
              href="/research/state-schemes"
              className={`px-4 py-2 rounded-xl transition-all ${
                schemeType === 'state-schemes'
                  ? 'bg-blue-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'राज्य शासन योजना (५४)' : 'State Non-Plan Schemes (54)'}
            </Link>
            <Link
              href="/research/funded-projects"
              className={`px-4 py-2 rounded-xl transition-all ${
                schemeType === 'funded-projects'
                  ? 'bg-purple-800 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'mr' ? 'बाह्य अनुदानीत प्रकल्प' : 'Externally Funded'}
            </Link>
          </div>

          <span className="text-xs font-bold text-stone-500">
            {language === 'mr'
              ? `एकूण नोंदी: ${filteredSchemes.length}`
              : `Showing: ${filteredSchemes.length} records`}
          </span>
        </div>

        {/* Live Search and Filter Bar */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'mr' ? 'योजना किंवा केंद्राचे नाव शोधा...' : 'Search by scheme title, crop or station...'}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:bg-white"
              />
            </div>

            {/* Sub-Filters for AICRP */}
            {schemeType === 'aicrp' && (
              <div className="flex flex-wrap gap-1 text-[11px] font-bold w-full sm:w-auto">
                {[
                  { id: 'all', label: language === 'mr' ? 'सर्व' : 'All' },
                  { id: 'cereals', label: language === 'mr' ? 'तृणधान्ये' : 'Cereals' },
                  { id: 'pulses_oilseeds', label: language === 'mr' ? 'कडधान्य/गळीत' : 'Pulses/Oilseeds' },
                  { id: 'horticulture', label: language === 'mr' ? 'फलोत्पादन' : 'Horticulture' },
                  { id: 'resource', label: language === 'mr' ? 'साधनसंपत्ती/मृदा' : 'Natural Resources' },
                  { id: 'engineering', label: language === 'mr' ? 'अवजारे/ऊर्जा' : 'Engineering' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-900 text-white'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Responsive Table / Card Deck of Schemes */}
        <div className="rounded-3xl bg-white border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300 bg-stone-100/90 text-stone-900">
                  <th className="py-3.5 px-4 font-bold uppercase w-16 text-center">{language === 'mr' ? 'अ.क्र.' : 'Sr.'}</th>
                  <th className="py-3.5 px-4 font-bold uppercase">{language === 'mr' ? 'प्रकल्प / योजनेचे नाव' : 'Project / Scheme Title'}</th>
                  {schemeType === 'state-schemes' && (
                    <th className="py-3.5 px-4 font-bold uppercase w-48">{language === 'mr' ? 'संशोधन केंद्र' : 'Station'}</th>
                  )}
                  <th className="py-3.5 px-4 font-bold uppercase text-right w-44">{language === 'mr' ? 'अधिकृत दस्तऐवज' : 'Download Document'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
                {filteredSchemes.length > 0 ? (
                  filteredSchemes.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-emerald-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-stone-600 text-center whitespace-nowrap">
                        {item.sr}
                      </td>
                      <td className="py-3.5 px-4 leading-relaxed font-semibold text-slate-900">
                        {item.title}
                      </td>
                      {schemeType === 'state-schemes' && (
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                            {item.station}
                          </span>
                        </td>
                      )}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <a
                          href={item.pdf.startsWith('http') ? item.pdf : (item.pdf.startsWith('/') ? item.pdf : `/media/docs/${item.pdf}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-2xs hover:shadow-xs"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{language === 'mr' ? 'PDF उघडा' : 'View PDF'}</span>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-stone-500 font-medium">
                      {language === 'mr'
                        ? 'शोध परिणामांशी जुळणारी योजना आढळली नाही.'
                        : 'No schemes match your search filter.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
