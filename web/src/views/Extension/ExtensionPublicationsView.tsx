'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Download,
  Search,
  Calendar,
  FileText,
  Sparkles,
  CheckCircle2,
  Filter,
  Layers,
  ArrowRight,
  ExternalLink,
  BookMarked
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { ExtensionBreadcrumb } from './components/ExtensionBreadcrumb';
import { ExtensionHero } from './components/ExtensionHero';

interface PublicationItem {
  id: string;
  category: 'krishidarshani' | 'sugi' | 'bulletins' | 'evarta' | 'annual';
  titleEn: string;
  titleMr: string;
  year?: string;
  pdf: string;
}

interface ExtensionPublicationsViewProps {
  pageData?: any;
}

export const ExtensionPublicationsView: React.FC<ExtensionPublicationsViewProps> = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const publications: PublicationItem[] = [
    {
        "id": "kd-2026",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2026",
        "titleMr": "कृषिदर्शनी २०२६",
        "year": "2026",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/20260725_120158_8d696de12b98586f94302f37cb1884b2.pdf"
    },
    {
        "id": "kd-2025",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2025",
        "titleMr": "कृषिदर्शनी २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%BF%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%B6%E0%A4%A8%E0%A5%80%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%AB_20250507105845.pdf"
    },
    {
        "id": "kd-2024",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2024",
        "titleMr": "कृषिदर्शनी २०२४",
        "year": "2024",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%BF%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%B6%E0%A4%A8%E0%A5%80%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%AA_20240709043918.pdf"
    },
    {
        "id": "kd-2023",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2023",
        "titleMr": "कृषिदर्शनी २०२३",
        "year": "2023",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Krishi%20Darshani%20%202023_20230607043125.pdf"
    },
    {
        "id": "kd-2022",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2022",
        "titleMr": "कृषिदर्शनी २०२२",
        "year": "2022",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Krushidarshani%202022%20All%20Pages%20%2076.91%20MB_compressed%20(1)_20220725085436.pdf"
    },
    {
        "id": "kd-2021",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2021",
        "titleMr": "कृषिदर्शनी २०२१",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Krishi%20Darshani%202021_20210331030029.pdf"
    },
    {
        "id": "kd-2020",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2020",
        "titleMr": "कृषिदर्शनी २०२०",
        "year": "2020",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Krishi%20Darshani%202020_20200624112750.pdf"
    },
    {
        "id": "kd-2019",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2019",
        "titleMr": "कृषिदर्शनी २०१९",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Krishi%20Darshani-2019_20191118041137.pdf"
    },
    {
        "id": "kd-2018",
        "category": "krishidarshani",
        "titleEn": "Krishidarshani 2018",
        "titleMr": "कृषिदर्शनी २०१८",
        "year": "2018",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Krishi%20Darshani%202018_20191118041121.pdf"
    },
    {
        "id": "sugi-0",
        "category": "sugi",
        "titleEn": "Shree Sugi Rabi 2026",
        "titleMr": "श्री सुगी रब्बी २०२६",
        "year": "2026",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/20261029_102946_6ae28c88e5b0e92e5976e4cedfba6c90.pdf"
    },
    {
        "id": "sugi-1",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2026",
        "titleMr": "श्री सुगी खरीप २०२६",
        "year": "2026",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/20260911_110128_3448f0e1adcd60f2c8a4c34d1fa0b9f4.pdf"
    },
    {
        "id": "sugi-2",
        "category": "sugi",
        "titleEn": "Shree Sugi Summer 2026",
        "titleMr": "श्री सुगी उन्हाळी २०२६",
        "year": "2026",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%89%E0%A4%A8%E0%A5%8D%E0%A4%B9%E0%A4%BE%E0%A4%B3%E0%A5%80%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%AC_20260625045520.pdf"
    },
    {
        "id": "sugi-3",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2025",
        "titleMr": "श्री सुगी खरीप २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%96%E0%A4%B0%E0%A5%80%E0%A4%AA%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%AB_20260625044940.pdf"
    },
    {
        "id": "sugi-4",
        "category": "sugi",
        "titleEn": "Shree Sugi Summer 2025",
        "titleMr": "श्री सुगी उन्हाळी २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%89%E0%A4%A8%E0%A5%8D%E0%A4%B9%E0%A4%BE%E0%A4%B3%E0%A5%80%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%AB_20250917044616.pdf"
    },
    {
        "id": "sugi-5",
        "category": "sugi",
        "titleEn": "Shree Sugi Rabi 2024",
        "titleMr": "श्री सुगी रब्बी  - २०२४",
        "year": "2024",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%B0%E0%A4%AC%E0%A5%8D%E0%A4%AC%E0%A5%80%20%20-%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%AA_20250131053603.pdf"
    },
    {
        "id": "sugi-6",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2024",
        "titleMr": "श्री सुगी खरीप - २०२४",
        "year": "2024",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%96%E0%A4%B0%E0%A5%80%E0%A4%AA%20-%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%AA_20240701103936.pdf"
    },
    {
        "id": "sugi-7",
        "category": "sugi",
        "titleEn": "Shree Sugi Summer 2024",
        "titleMr": "श्री सुगी उन्हाळी २०२४",
        "year": "2024",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%89%E0%A4%A8%E0%A5%8D%E0%A4%B9%E0%A4%BE%E0%A4%B3%E0%A5%80%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%AA_20240206115306.pdf"
    },
    {
        "id": "sugi-8",
        "category": "sugi",
        "titleEn": "Shree Sugi Rabi 2023",
        "titleMr": "श्री सुगी रब्बी  - २०२3",
        "year": "2023",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%B0%E0%A4%AC%E0%A5%8D%E0%A4%AC%E0%A5%80%20%20-%20%E0%A5%A8%E0%A5%A6%E0%A5%A83_20231012063946.pdf"
    },
    {
        "id": "sugi-9",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2023",
        "titleMr": "श्री सुगी खरीप - २०२3",
        "year": "2023",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%96%E0%A4%B0%E0%A5%80%E0%A4%AA%20-%20%E0%A5%A8%E0%A5%A6%E0%A5%A83_20230614063501.pdf"
    },
    {
        "id": "sugi-10",
        "category": "sugi",
        "titleEn": "Shree Sugi Summer 2023",
        "titleMr": "श्री सुगी उन्हाळी - २०२३",
        "year": "2023",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20Sugi%20summer%202023_20230220051301.pdf"
    },
    {
        "id": "sugi-11",
        "category": "sugi",
        "titleEn": "Shree Sugi Rabi 2022",
        "titleMr": "श्री सुगी रब्बी - २०२२",
        "year": "2022",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%B0%E0%A4%AC%E0%A5%8D%E0%A4%AC%E0%A5%80%20-%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%A8_20221019121436.pdf"
    },
    {
        "id": "sugi-12",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2022",
        "titleMr": "श्री सुगी खरीप - २०२२",
        "year": "2022",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%96%E0%A4%B0%E0%A5%80%E0%A4%AA%20-%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%A8_20220614120322.pdf"
    },
    {
        "id": "sugi-13",
        "category": "sugi",
        "titleEn": "Shree Sugi Rabi 2021",
        "titleMr": "श्री सुगी रब्बी - २०२१",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%B0%E0%A4%AC%E0%A5%8D%E0%A4%AC%E0%A5%80%20-%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%A7_20211127103521.pdf"
    },
    {
        "id": "sugi-14",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2021",
        "titleMr": "श्री सुगी खरीप - २०२१",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%97%E0%A5%80%20%E0%A4%96%E0%A4%B0%E0%A5%80%E0%A4%AA%20-%20%E0%A5%A8%E0%A5%A6%E0%A5%A8%E0%A5%A7_20210617044155.pdf"
    },
    {
        "id": "sugi-15",
        "category": "sugi",
        "titleEn": "Shree Sugi Summer 2021",
        "titleMr": "Shri Sugi summer 2021",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20Sugi%20summer-2021_20210331030840.pdf"
    },
    {
        "id": "sugi-16",
        "category": "sugi",
        "titleEn": "Shree Sugi Rabi 2020",
        "titleMr": "Shri Sugi Rabbi 2020",
        "year": "2020",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20Sugi%20Rabbi-2020_20201021100224.pdf"
    },
    {
        "id": "sugi-17",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2020",
        "titleMr": "Shri Sugi Kharif 2020",
        "year": "2020",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20%20Sugi%20Kharip%202020_20200714094901.pdf"
    },
    {
        "id": "sugi-18",
        "category": "sugi",
        "titleEn": "Shree Sugi Summer 2020",
        "titleMr": "Shri Sugi Summer 2020",
        "year": "2020",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20Sugi%20Summer%202020_20200714094829.pdf"
    },
    {
        "id": "sugi-19",
        "category": "sugi",
        "titleEn": "Shree Sugi Rabi 2019",
        "titleMr": "Shri Sugi Rabbi 2019",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20Sugi%20Rabbi-2019_20200611031556.pdf"
    },
    {
        "id": "sugi-20",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2019",
        "titleMr": "Shri Sugi Kharif 2019",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20Sugi%20Kharif-2019_20200611031525.pdf"
    },
    {
        "id": "sugi-21",
        "category": "sugi",
        "titleEn": "Shree Sugi Summer 2019",
        "titleMr": "Shri Sugi Summer 2019",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20Sugi%20Summer%20-2019_20200611025944.pdf"
    },
    {
        "id": "sugi-22",
        "category": "sugi",
        "titleEn": "Shree Sugi Rabi 2018",
        "titleMr": "Shri Sugi - Rabi & Summer-2018-19",
        "year": "2018",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Shri%20Sugi%20Rabi%20and%20Summer%20-%202018%20-19_20191118041309.pdf"
    },
    {
        "id": "sugi-23",
        "category": "sugi",
        "titleEn": "Shree Sugi Kharif 2018",
        "titleMr": "Shri Sugi-Kharif 2018",
        "year": "2018",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/sugikharip2018_20191118041228.pdf"
    },
    {
        "id": "bul-0",
        "category": "bulletins",
        "titleEn": "Climate-resilient Crop Management for Western Ghat Zone",
        "titleMr": "पश्चिम घाट विभागासाठी हवामान आधारित पीक व्यवस्थापन",
        "year": "2020",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AA%E0%A4%B6%E0%A5%8D%E0%A4%9A%E0%A4%BF%E0%A4%AE%20%E0%A4%98%E0%A4%BE%E0%A4%9F%20%E0%A4%B5%E0%A4%BF%E0%A4%AD%E0%A4%BE%E0%A4%97%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%B9%E0%A4%B5%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%A8%20%E0%A4%86%E0%A4%A7%E0%A4%BE%E0%A4%B0%E0%A4%BF%E0%A4%A4%20%E0%A4%AA%E0%A5%80%E0%A4%95%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%B5%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BE%E0%A4%AA%E0%A4%A8%20(%E0%A4%87%E0%A4%97%E0%A4%A4%E0%A4%AA%E0%A5%81%E0%A4%B0%E0%A5%80)%20Res%20Pub%202020_20210713045531.pdf"
    },
    {
        "id": "bul-1",
        "category": "bulletins",
        "titleEn": "AICRP on Farm Implements & Machinery at a Glance",
        "titleMr": "AICRP on Farm Implements and Machinery At a Glamce",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/AICRP%20on%20Farm%20Implements%20and%20Machinery%20At%20a%20Glamce_20210616040033.pdf"
    },
    {
        "id": "bul-2",
        "category": "bulletins",
        "titleEn": "Improved Agricultural Implements Developed by MPKV",
        "titleMr": "Improve Agril Implements developed by MPKV",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Improve%20Agril%20Implements%20developed%20by%20MPKV_20210616040012.pdf"
    },
    {
        "id": "bul-3",
        "category": "bulletins",
        "titleEn": "Improved Implements and Machinery for Sugarcane Farming",
        "titleMr": "ऊस शेतीसाठी सुधारित औजारे व यंत्रे",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%8A%E0%A4%B8%20%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A5%80%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%B8%E0%A5%81%E0%A4%A7%E0%A4%BE%E0%A4%B0%E0%A4%BF%E0%A4%A4%20%E0%A4%94%E0%A4%9C%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%B5%20%E0%A4%AF%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%87_20210616035950.jpg"
    },
    {
        "id": "bul-4",
        "category": "bulletins",
        "titleEn": "Agricultural Implements for Dryland Farming",
        "titleMr": "कोरड्वाहु शेती साठी कृषि औजारे",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%95%E0%A5%8B%E0%A4%B0%E0%A4%A1%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%B9%E0%A5%81%20%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A5%80%20%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%BF%20%E0%A4%94%E0%A4%9C%E0%A4%BE%E0%A4%B0%E0%A5%87_20210616035919.pdf"
    },
    {
        "id": "bul-5",
        "category": "bulletins",
        "titleEn": "Human-operated Farm Implements & Tools",
        "titleMr": "मनुष्य चलित कृषि औजारे",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AE%E0%A4%A8%E0%A5%81%E0%A4%B7%E0%A5%8D%E0%A4%AF%20%E0%A4%9A%E0%A4%B2%E0%A4%BF%E0%A4%A4%20%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%BF%20%E0%A4%94%E0%A4%9C%E0%A4%BE%E0%A4%B0%E0%A5%87_20210616035902.pdf"
    },
    {
        "id": "bul-6",
        "category": "bulletins",
        "titleEn": "MPKV Developed Farm Implements & Machinery Compendium",
        "titleMr": "महात्मा फुले कृषि विद्यापीठ विकसित कृषि औजारे व यंत्रे",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BE%20%E0%A4%AB%E0%A5%81%E0%A4%B2%E0%A5%87%20%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%BF%20%E0%A4%B5%E0%A4%BF%E0%A4%A6%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AA%E0%A5%80%E0%A4%A0%20%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A4%B8%E0%A4%BF%E0%A4%A4%20%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%BF%20%E0%A4%94%E0%A4%9C%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%B5%20%E0%A4%AF%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%87_20210616035845.jpg"
    },
    {
        "id": "bul-7",
        "category": "bulletins",
        "titleEn": "Drudgery Reducing Women-friendly Farm Implements",
        "titleMr": "महिलांचे श्रम कमी करणारे मनुष्यचलित कृषि औजारे",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AE%E0%A4%B9%E0%A4%BF%E0%A4%B2%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A4%AE%20%E0%A4%95%E0%A4%AE%E0%A5%80%20%E0%A4%95%E0%A4%B0%E0%A4%A3%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%AE%E0%A4%A8%E0%A5%81%E0%A4%B7%E0%A5%8D%E0%A4%AF%E0%A4%9A%E0%A4%B2%E0%A4%BF%E0%A4%A4%20%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%BF%20%E0%A4%94%E0%A4%9C%E0%A4%BE%E0%A4%B0%E0%A5%87_20210616035824.jpg"
    },
    {
        "id": "bul-8",
        "category": "bulletins",
        "titleEn": "ICAR - Farmer FIRST Project Accomplishments",
        "titleMr": "भा. कृ. अ. प.-शेतकरी प्रथम प्रकल्प",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AD%E0%A4%BE.%20%E0%A4%95%E0%A5%83.%20%E0%A4%85.%20%E0%A4%AA.-%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A4%95%E0%A4%B0%E0%A5%80%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A5%E0%A4%AE%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%95%E0%A4%B2%E0%A5%8D%E0%A4%AA_20210616034025.pdf"
    },
    {
        "id": "bul-9",
        "category": "bulletins",
        "titleEn": "Nutritional Value & Production Technology of Pearl Millet (Bajra)",
        "titleMr": "बाजरीचे आहारातील महत्व आणि बाजरी उत्पादन तंत्रज्ञान",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A4%B0%E0%A5%80%E0%A4%9A%E0%A5%87%20%E0%A4%86%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%AE%E0%A4%B9%E0%A4%A4%E0%A5%8D%E0%A4%B5%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A4%B0%E0%A5%80%20%E0%A4%89%E0%A4%A4%E0%A5%8D%E0%A4%AA%E0%A4%BE%E0%A4%A6%E0%A4%A8%20%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8_20210616034005.pdf"
    },
    {
        "id": "bul-10",
        "category": "bulletins",
        "titleEn": "Backyard Poultry Farming Scientific Guide",
        "titleMr": "परसबागेतील कुक्कुटपालन",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AA%E0%A4%B0%E0%A4%B8%E0%A4%AC%E0%A4%BE%E0%A4%97%E0%A5%87%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%95%E0%A5%81%E0%A4%95%E0%A5%8D%E0%A4%95%E0%A5%81%E0%A4%9F%E0%A4%AA%E0%A4%BE%E0%A4%B2%E0%A4%A8_20210616033946.pdf"
    },
    {
        "id": "bul-11",
        "category": "bulletins",
        "titleEn": "Silage Making Technology for Continuous Green Fodder",
        "titleMr": "नियमित हिरव्या चाऱ्यासाठी मुरघास",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%A8%E0%A4%BF%E0%A4%AF%E0%A4%AE%E0%A4%BF%E0%A4%A4%20%E0%A4%B9%E0%A4%BF%E0%A4%B0%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%BE%20%E0%A4%9A%E0%A4%BE%E0%A4%B1%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%AE%E0%A5%81%E0%A4%B0%E0%A4%98%E0%A4%BE%E0%A4%B8_20210616033916.pdf"
    },
    {
        "id": "bul-12",
        "category": "bulletins",
        "titleEn": "Pigeonpea (Tur) Production Technology",
        "titleMr": "तूर लागवड तंत्रज्ञान",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%A4%E0%A5%82%E0%A4%B0%20%E0%A4%B2%E0%A4%BE%E0%A4%97%E0%A4%B5%E0%A4%A1%20%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8_20210616033850.pdf"
    },
    {
        "id": "bul-13",
        "category": "bulletins",
        "titleEn": "Pomegranate Management & Disease Control Technology",
        "titleMr": "डाळिंब व्यवस्थापन तंत्रज्ञान",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%A1%E0%A4%BE%E0%A4%B3%E0%A4%BF%E0%A4%82%E0%A4%AC%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%B5%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BE%E0%A4%AA%E0%A4%A8%20%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8_20210616033822.pdf"
    },
    {
        "id": "bul-14",
        "category": "bulletins",
        "titleEn": "Integrated Farming System (IFS) Model for Smallholders",
        "titleMr": "अल्पभूधारक शेतकऱ्यानसाठी एकात्मिक शेती पद्धतीचे मॉडेल",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%85%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%AD%E0%A5%82%E0%A4%A7%E0%A4%BE%E0%A4%B0%E0%A4%95%20%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A4%95%E0%A4%B1%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A8%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%8F%E0%A4%95%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95%20%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A5%80%20%E0%A4%AA%E0%A4%A6%E0%A5%8D%E0%A4%A7%E0%A4%A4%E0%A5%80%E0%A4%9A%E0%A5%87%20%E0%A4%AE%E0%A5%89%E0%A4%A1%E0%A5%87%E0%A4%B2_20210616033745.pdf"
    },
    {
        "id": "bul-15",
        "category": "bulletins",
        "titleEn": "MPKV Rahuri Agricultural Calendar",
        "titleMr": "MPKV Rahuri Calender 2021",
        "year": "2021",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%20Rahuri%20Calender%202021_20210202024011.pdf"
    },
    {
        "id": "bul-16",
        "category": "bulletins",
        "titleEn": "Integrated Farming System (IFS) Model for Smallholders",
        "titleMr": "अल्पभूधारक शेतकऱ्यानसाठी एकात्मिक शेती पद्धतीचे मॉडेल",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%85%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%AD%E0%A5%82%E0%A4%A7%E0%A4%BE%E0%A4%B0%E0%A4%95%20%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A4%95%E0%A4%B1%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A8%E0%A4%B8%E0%A4%BE%E0%A4%A0%E0%A5%80%20%E0%A4%8F%E0%A4%95%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%95%20%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A5%80%20%E0%A4%AA%E0%A4%A6%E0%A5%8D%E0%A4%A7%E0%A4%A4%E0%A5%80%E0%A4%9A%E0%A5%87%20%E0%A4%AE%E0%A5%89%E0%A4%A1%E0%A5%87%E0%A4%B2_20191118041827.pdf"
    },
    {
        "id": "bul-17",
        "category": "bulletins",
        "titleEn": "Pomegranate Management & Disease Control Technology",
        "titleMr": "डाळिंब व्यवस्थापन तंत्रज्ञान",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%A1%E0%A4%BE%E0%A4%B3%E0%A4%BF%E0%A4%82%E0%A4%AC%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%B5%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BE%E0%A4%AA%E0%A4%A8%20%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8_20191118041809.pdf"
    },
    {
        "id": "bul-18",
        "category": "bulletins",
        "titleEn": "Soil Sampling Methodology and Importance of Soil Testing",
        "titleMr": "माती नमुना घेण्याची पद्धत आणि माती परीक्षणाचे महत्व",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AE%E0%A4%BE%E0%A4%A4%E0%A5%80%20%E0%A4%A8%E0%A4%AE%E0%A5%81%E0%A4%A8%E0%A4%BE%20%E0%A4%98%E0%A5%87%E0%A4%A3%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%9A%E0%A5%80%20%E0%A4%AA%E0%A4%A6%E0%A5%8D%E0%A4%A7%E0%A4%A4%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%AE%E0%A4%BE%E0%A4%A4%E0%A5%80%20%E0%A4%AA%E0%A4%B0%E0%A5%80%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%A3%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%AE%E0%A4%B9%E0%A4%A4%E0%A5%8D%E0%A4%B5_20191118041738.pdf"
    },
    {
        "id": "bul-19",
        "category": "bulletins",
        "titleEn": "Five Golden Principles of Successful Goat Farming",
        "titleMr": "यशस्वी शेळी पालनाची पंचसूत्री",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AF%E0%A4%B6%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A5%80%20%E0%A4%B6%E0%A5%87%E0%A4%B3%E0%A5%80%20%E0%A4%AA%E0%A4%BE%E0%A4%B2%E0%A4%A8%E0%A4%BE%E0%A4%9A%E0%A5%80%20%E0%A4%AA%E0%A4%82%E0%A4%9A%E0%A4%B8%E0%A5%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80_20191118041717.pdf"
    },
    {
        "id": "bul-20",
        "category": "bulletins",
        "titleEn": "Rabi Sorghum Production Five-Point Technology",
        "titleMr": "रब्बी ज्वारी पंचसूत्री तंत्रज्ञान",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B0%E0%A4%AC%E0%A5%8D%E0%A4%AC%E0%A5%80%20%E0%A4%9C%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%AA%E0%A4%82%E0%A4%9A%E0%A4%B8%E0%A5%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8_20191118041657.pdf"
    },
    {
        "id": "bul-21",
        "category": "bulletins",
        "titleEn": "शेती कामात महिलांचे कष्ट कमी करणारे औजारे",
        "titleMr": "शेती कामात महिलांचे कष्ट कमी करणारे औजारे",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A5%80%20%E0%A4%95%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%A4%20%E0%A4%AE%E0%A4%B9%E0%A4%BF%E0%A4%B2%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A5%87%20%E0%A4%95%E0%A4%B7%E0%A5%8D%E0%A4%9F%20%E0%A4%95%E0%A4%AE%E0%A5%80%20%E0%A4%95%E0%A4%B0%E0%A4%A3%E0%A4%BE%E0%A4%B0%E0%A5%87%20%E0%A4%94%E0%A4%9C%E0%A4%BE%E0%A4%B0%E0%A5%87_20191118041633.pdf"
    },
    {
        "id": "bul-22",
        "category": "bulletins",
        "titleEn": "Chickpea (Gram) Scientific Cultivation Guide",
        "titleMr": "हरभरा लागवड तंत्रज्ञान",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B9%E0%A4%B0%E0%A4%AD%E0%A4%B0%E0%A4%BE%20%E0%A4%B2%E0%A4%BE%E0%A4%97%E0%A4%B5%E0%A4%A1%20%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8_20191118041612.pdf"
    },
    {
        "id": "bul-23",
        "category": "bulletins",
        "titleEn": "Fish Farming in Farm Ponds (Shet-tale)",
        "titleMr": "शेततळ्यातील मत्स्य पालन",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%B6%E0%A5%87%E0%A4%A4%E0%A4%A4%E0%A4%B3%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%AE%E0%A4%A4%E0%A5%8D%E0%A4%B8%E0%A5%8D%E0%A4%AF%20%E0%A4%AA%E0%A4%BE%E0%A4%B2%E0%A4%A8_20191118041551.pdf"
    },
    {
        "id": "bul-24",
        "category": "bulletins",
        "titleEn": "Loose Housing Dairy Management System",
        "titleMr": "मुक्त गोठा पद्धत",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AE%E0%A5%81%E0%A4%95%E0%A5%8D%E0%A4%A4%20%E0%A4%97%E0%A5%8B%E0%A4%A0%E0%A4%BE%20%E0%A4%AA%E0%A4%A6%E0%A5%8D%E0%A4%A7%E0%A4%A4_20191118041522.pdf"
    },
    {
        "id": "bul-25",
        "category": "bulletins",
        "titleEn": "Mini Dal Mill Enterprise & Agro-Processing Guide",
        "titleMr": "मिनी दाळ मिल -लघुउद्योग",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%AE%E0%A4%BF%E0%A4%A8%E0%A5%80%20%E0%A4%A6%E0%A4%BE%E0%A4%B3%20%E0%A4%AE%E0%A4%BF%E0%A4%B2%20-%E0%A4%B2%E0%A4%98%E0%A5%81%E0%A4%89%E0%A4%A6%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%97_20191118041446.pdf"
    },
    {
        "id": "bul-26",
        "category": "bulletins",
        "titleEn": "Year-round Forage and Fodder Crops Planning",
        "titleMr": "चारा पिकाचे नियोजन",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/%E0%A4%9A%E0%A4%BE%E0%A4%B0%E0%A4%BE%20%E0%A4%AA%E0%A4%BF%E0%A4%95%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%A8%E0%A4%BF%E0%A4%AF%E0%A5%8B%E0%A4%9C%E0%A4%A8_20191118041414.pdf"
    },
    {
        "id": "ext-bul-3-0",
        "category": "bulletins",
        "titleEn": "Accomplishments 2019",
        "titleMr": "Accomplishments 2019",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Accomplishments%202019_20200116103645.pdf"
    },
    {
        "id": "ext-bul-3-1",
        "category": "bulletins",
        "titleEn": "Accomplishments-2017",
        "titleMr": "Accomplishments-2017",
        "year": "2017",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Accomplishment-2017_20191118042117.pdf"
    },
    {
        "id": "ext-bul-3-2",
        "category": "bulletins",
        "titleEn": "Accomplishments-2018",
        "titleMr": "Accomplishments-2018",
        "year": "2018",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%20Accomplishments%202018_20191118042045.pdf"
    },
    {
        "id": "ext-bul-4-0",
        "category": "bulletins",
        "titleEn": "Glimpses 2017-18",
        "titleMr": "Glimpses 2017-18",
        "year": "2017",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Glimpses%202017-18_20191118042152.pdf"
    },
    {
        "id": "ext-bul-5-0",
        "category": "bulletins",
        "titleEn": "MPKV at a Glance 2019",
        "titleMr": "MPKV at a Glance 2019",
        "year": "2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%20At%20a%20Glance%202019_20200116103515.pdf"
    },
    {
        "id": "ext-bul-5-1",
        "category": "bulletins",
        "titleEn": "MPKV at a Glance 2018",
        "titleMr": "MPKV at a Glance 2018",
        "year": "2018",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%20At%20a%20Glance-2018_20191118042229.pdf"
    },
    {
        "id": "evarta-2026-may",
        "category": "evarta",
        "titleEn": "MPKV E-Varta Monthly Issue (May 2026)",
        "titleMr": "मफुकृवि ई-वार्ता मे २०२६ अंक",
        "year": "2026",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/20260811_154637_3d8a4de8ea0b2dc4092fc3b2233d0d71.pdf"
    },
    {
        "id": "evarta-2025-dec",
        "category": "evarta",
        "titleEn": "MPKV E-Varta December 2025",
        "titleMr": "मफुकृवि ई-वार्ता डिसेंबर २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/12_December_2025_20250210033619.pdf"
    },
    {
        "id": "evarta-2025-nov",
        "category": "evarta",
        "titleEn": "MPKV E-Varta November 2025",
        "titleMr": "मफुकृवि ई-वार्ता नोव्हेंबर २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/11_November_2025_20250210033606.pdf"
    },
    {
        "id": "evarta-2025-oct",
        "category": "evarta",
        "titleEn": "MPKV E-Varta October 2025",
        "titleMr": "मफुकृवि ई-वार्ता ऑक्टोबर २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/10_October_2025_20250210033351.pdf"
    },
    {
        "id": "evarta-2025-sep",
        "category": "evarta",
        "titleEn": "MPKV E-Varta September 2025",
        "titleMr": "मफुकृवि ई-वार्ता सप्टेंबर २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/9_September_2025_20250210033336.pdf"
    },
    {
        "id": "evarta-2025-aug",
        "category": "evarta",
        "titleEn": "MPKV E-Varta August 2025",
        "titleMr": "मफुकृवि ई-वार्ता ऑगस्ट २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/8_August_2025_20250210033323.pdf"
    },
    {
        "id": "evarta-2025-jul",
        "category": "evarta",
        "titleEn": "MPKV E-Varta July 2025",
        "titleMr": "मफुकृवि ई-वार्ता जुलै २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/7_Jully_2025_20250210033308.pdf"
    },
    {
        "id": "evarta-2025-jun",
        "category": "evarta",
        "titleEn": "MPKV E-Varta June 2025",
        "titleMr": "मफुकृवि ई-वार्ता जून २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/6_June_2025_20250210033253.pdf"
    },
    {
        "id": "evarta-2025-may",
        "category": "evarta",
        "titleEn": "MPKV E-Varta May 2025",
        "titleMr": "मफुकृवि ई-वार्ता मे २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/5_May_2025_20250210033235.pdf"
    },
    {
        "id": "evarta-2025-apr",
        "category": "evarta",
        "titleEn": "MPKV E-Varta April 2025",
        "titleMr": "मफुकृवि ई-वार्ता एप्रिल २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/4_April_2025_20250210033220.pdf"
    },
    {
        "id": "evarta-2025-mar",
        "category": "evarta",
        "titleEn": "MPKV E-Varta March 2025",
        "titleMr": "मफुकृवि ई-वार्ता मार्च २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/3_March_2025_20250210033202.pdf"
    },
    {
        "id": "evarta-2025-feb",
        "category": "evarta",
        "titleEn": "MPKV E-Varta February 2025",
        "titleMr": "मफुकृवि ई-वार्ता फेब्रुवारी २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/2_February_2025_20250210033148.pdf"
    },
    {
        "id": "evarta-2025-jan",
        "category": "evarta",
        "titleEn": "MPKV E-Varta January 2025",
        "titleMr": "मफुकृवि ई-वार्ता जानेवारी २०२५",
        "year": "2025",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/1_January_2025_20250210033134.pdf"
    },
    {
        "id": "ar-0",
        "category": "annual",
        "titleEn": "Annual Report 2022-23 English",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०२२-२३ (इंग्रजी)",
        "year": "2022-23",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202022-23%20English_20240618035515.pdf"
    },
    {
        "id": "ar-1",
        "category": "annual",
        "titleEn": "Annual Report 2022-23 Marathi",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०२२-२३ (मराठी)",
        "year": "2022-23",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202022-23%20Marathi_20240615010538.pdf"
    },
    {
        "id": "ar-2",
        "category": "annual",
        "titleEn": "Annual Report 2021-22 English",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०२१-२२ (इंग्रजी)",
        "year": "2021-22",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%2CRahuri%20Annual%20Report%202021-22%20English_20221123105649.pdf"
    },
    {
        "id": "ar-3",
        "category": "annual",
        "titleEn": "Annual Report 2021-22 Marathi",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०२१-२२ (मराठी)",
        "year": "2021-22",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%2CRahuri%20Anuual%20Report%20%202021-22%20Marathi_20221123105630.pdf"
    },
    {
        "id": "ar-4",
        "category": "annual",
        "titleEn": "Annual Report 2020-21 Marathi",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०२०-२१ (मराठी)",
        "year": "2020-21",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%2C%20Rahuri%20%20Annual%20Report%202020-21%2C%20Marathi_20211224092453.pdf"
    },
    {
        "id": "ar-5",
        "category": "annual",
        "titleEn": "Annual Report 2020-21 English",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०२०-२१ (इंग्रजी)",
        "year": "2020-21",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%2C%20Rahuri%20%20Annual%20Report%202020-21%2C%20English_20211224092413.pdf"
    },
    {
        "id": "ar-6",
        "category": "annual",
        "titleEn": "Annual Report 2019-20 English",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१९-२० (इंग्रजी)",
        "year": "2019-20",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%20%20Annual%20Report%20%202019-20%20English_20210602093913.pdf"
    },
    {
        "id": "ar-7",
        "category": "annual",
        "titleEn": "Annual Report  2019-20  Marathi",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१९-२० (मराठी)",
        "year": "2019-20",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%20Annual%20Report%202019-2020%20Marathi_20210602093823.pdf"
    },
    {
        "id": "ar-8",
        "category": "annual",
        "titleEn": "Annual Report English 2018-2019",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१८-२०१९ (इंग्रजी)",
        "year": "2018-2019",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/MPKV%20Annaul%20Report%20English%202018-19_20201013060819.pdf"
    },
    {
        "id": "ar-9",
        "category": "annual",
        "titleEn": "Annual Report English  2017-2018",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१७-२०१८ (इंग्रजी)",
        "year": "2017-2018",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%20English%20%202017-2018_20200216105547.pdf"
    },
    {
        "id": "ar-10",
        "category": "annual",
        "titleEn": "Annual Report Marathi 2017-18",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१७-१८ (मराठी)",
        "year": "2017-18",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%20Marathi%20%202017-18_20200216105511.pdf"
    },
    {
        "id": "ar-11",
        "category": "annual",
        "titleEn": "Annual Report Marathi 2016-17",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१६-१७ (मराठी)",
        "year": "2016-17",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202016-17%20Marathi_20191118042604.pdf"
    },
    {
        "id": "ar-12",
        "category": "annual",
        "titleEn": "Annual Report English 2016-17",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१६-१७ (इंग्रजी)",
        "year": "2016-17",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202016-2017_English_20191118042550.pdf"
    },
    {
        "id": "ar-13",
        "category": "annual",
        "titleEn": "Annual Report Marathi 2015-16",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१५-१६ (मराठी)",
        "year": "2015-16",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202015-2016%20Marathi_20191118042533.pdf"
    },
    {
        "id": "ar-14",
        "category": "annual",
        "titleEn": "Annual Report English 2015-16",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१५-१६ (इंग्रजी)",
        "year": "2015-16",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202015-2016_English_20191118042456.pdf"
    },
    {
        "id": "ar-15",
        "category": "annual",
        "titleEn": "Annual Report Marathi 2014-15",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१४-१५ (मराठी)",
        "year": "2014-15",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202014-2015%20Marathi_20191118042440.pdf"
    },
    {
        "id": "ar-16",
        "category": "annual",
        "titleEn": "Annual Report English 2014-15",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१४-१५ (इंग्रजी)",
        "year": "2014-15",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202014-2015_English_20191118042420.pdf"
    },
    {
        "id": "ar-17",
        "category": "annual",
        "titleEn": "Annual Report Marathi 2013-14",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१३-१४ (मराठी)",
        "year": "2013-14",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202013-2014%20Marathi_20191118042350.pdf"
    },
    {
        "id": "ar-18",
        "category": "annual",
        "titleEn": "Annual Report English 2013-14",
        "titleMr": "मफुकृवि वार्षिक अहवाल २०१३-१४ (इंग्रजी)",
        "year": "2013-14",
        "pdf": "https://mpkv.ac.in/Uploads/Publication/Annual%20Report%202013-2014_English_20191118042333.pdf"
    }
];

  const filteredPubs = useMemo(() => {
    return publications.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        return (
          p.titleEn.toLowerCase().includes(term) ||
          p.titleMr.toLowerCase().includes(term) ||
          (p.year && p.year.includes(term))
        );
      }
      return true;
    });
  }, [publications, activeCategory, searchTerm]);

  return (
    <div className="w-full bg-[#fbfbfa] min-h-screen text-slate-800">
      <ExtensionBreadcrumb currentPageTitle={{ en: 'Publications & Krishidarshani', mr: 'विस्तार प्रकाशने व कृषिदर्शनी' }} />

      <ExtensionHero
        theme="publications"
        badge={{ en: 'Official University Publications', mr: 'विद्यापीठ अधिकृत कृषी प्रकाशने' }}
        title={{
          en: 'Extension Publications & Krishidarshani',
          mr: 'विस्तार प्रकाशने व कृषिदर्शनी'
        }}
        subtitle={{
          en: 'Authentic agricultural knowledge bank featuring quarterly Shree Sugi, annual Krishidarshani diaries, research bulletins, monthly E-Varta, and university reports.',
          mr: 'त्रैमासिक "श्री सुगी", वार्षिक "कृषिदर्शनी" डायरी, ई-वार्ता व तांत्रिक पुस्तिकांचा अधिकृत कृषी ज्ञानभांडार.'
        }}
        quickChips={[
          { label: language === 'mr' ? 'श्री सुगी' : 'Shree Sugi', icon: BookOpen },
          { label: language === 'mr' ? 'कृषिदर्शनी' : 'Krishidarshani', icon: Calendar },
          { label: language === 'mr' ? 'मफुकृवि ई-वार्ता' : 'MPKV E-Varta', icon: FileText },
          { label: language === 'mr' ? 'वार्षिक अहवाल' : 'Annual Reports', icon: BookMarked }
        ]}
      />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8 space-y-12">

        {/* 1. Flagship Periodicals Showcase (Shree Sugi & Krishidarshani) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Sugi Showcase */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-900 to-stone-900 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="relative w-36 h-48 rounded-xl overflow-hidden shadow-lg shrink-0 border-2 border-amber-400/80 bg-stone-800">
              <img
                src="/media/images/extension/ShriSugionlyfrontpage.jpg"
                alt="Shree Sugi Magazine"
                className="w-full h-full object-cover"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = '/media/images/mpkv_icon.png';
                }}
              />
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider">
                {language === 'mr' ? 'त्रैमासिक शेती नियतकालिक' : 'Quarterly Farm Journal'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white leading-snug">
                {language === 'mr' ? '"श्री सुगी" त्रैमासिक' : 'Shree Sugi Magazine'}
              </h3>
              <p className="text-xs text-amber-100/90 leading-relaxed font-normal">
                {language === 'mr'
                  ? '१९७० पासून अखंड सुरू असलेले महाराष्ट्रातील अग्रगण्य कृषी मासिक. खरीप, रब्बी, उन्हाळी आणि फलोत्पादन विशेषांक दरवर्षी प्रकाशित केले जातात.'
                  : 'Maharashtra’s prestigious quarterly farm journal since 1970, publishing seasonal guides for Kharif, Rabi, Summer, and special horticultural issues.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-amber-300">
                  {language === 'mr' ? 'वर्गणीदार नोंदणी अ‍ॅटिक केंद्रात उपलब्ध' : 'Subscriptions available at ATIC & DEE'}
                </span>
                <a
                  href="https://mpkv.ac.in/Uploads/Publication/20261029_102946_6ae28c88e5b0e92e5976e4cedfba6c90.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'नवीनतम अंक PDF' : 'Download Latest Issue'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Krishidarshani Showcase */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950 to-stone-900 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden">
            <div className="relative w-36 h-48 rounded-xl overflow-hidden shadow-lg shrink-0 border-2 border-emerald-400/80 bg-stone-800">
              <img
                src="/media/images/extension/krishidarshani_cover.jpg"
                alt="Krishidarshani Diary"
                className="w-full h-full object-cover object-top"
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src = '/media/images/mpkv_icon.png';
                }}
              />
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 uppercase tracking-wider">
                {language === 'mr' ? 'वार्षिक कृषी दिनदर्शिका' : 'Annual Farm Reference Diary'}
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-serif text-white leading-snug">
                {language === 'mr' ? '"कृषिदर्शनी" संदर्भ डायरी' : 'Krishidarshani Diary'}
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'शेतकऱ्यांसाठी संपूर्ण वर्षाचे पीक नियोजन, खते, कीटकनाशके, शिफारशी आणि विद्यापीठ शास्त्रज्ञांची संपर्क माहिती देणारी लोकप्रिय डायरी.'
                  : 'The indispensable annual agricultural diary providing year-round sowing schedules, fertilizer doses, spray schedules, and scientist contacts.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold text-emerald-300">
                  {language === 'mr' ? 'दरवर्षी १ जानेवारी रोजी प्रकाशित' : 'Published annually on 1st January'}
                </span>
                <a
                  href="https://mpkv.ac.in/Uploads/Publication/20260725_120158_8d696de12b98586f94302f37cb1884b2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-all shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'कृषिदर्शनी २०२६ PDF' : 'Download 2026 Edition'}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Publications Filter & Search Bar */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', labelEn: 'All Documents', labelMr: 'सर्व प्रकाशने' },
                { id: 'krishidarshani', labelEn: 'Krishidarshani', labelMr: 'कृषिदर्शनी' },
                { id: 'sugi', labelEn: 'Shree Sugi', labelMr: 'श्री सुगी' },
                { id: 'bulletins', labelEn: 'Crop Guides', labelMr: 'विस्तार पुस्तिका' },
                { id: 'evarta', labelEn: 'E-Varta', labelMr: 'मफुकृवि ई-वार्ता' },
                { id: 'annual', labelEn: 'Annual Reports', labelMr: 'वार्षिक अहवाल' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {language === 'mr' ? cat.labelMr : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Live Search */}
            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={language === 'mr' ? 'पुस्तके, वर्ष, अहवाल शोधा...' : 'Search by title, edition, year...'}
                className="w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-600/30 font-medium"
              />
            </div>

          </div>
        </div>

        {/* 3. Publications Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>
              {language === 'mr'
                ? `${filteredPubs.length} प्रकाशने सापडली`
                : `Showing ${filteredPubs.length} publications`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPubs.map((pub, idx) => (
              <div
                key={pub.id || idx}
                className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-amber-400"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                      {pub.category.toUpperCase()}
                    </span>
                    {pub.year && (
                      <span className="text-xs font-bold text-amber-800 flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{pub.year}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-bold font-serif text-slate-900 leading-snug">
                    {language === 'mr' ? pub.titleMr : pub.titleEn}
                  </h4>

                  <p className="text-xs text-stone-500 font-medium">
                    Mahatma Phule Krishi Vidyapeeth, Rahuri Official PDF
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Official PDF</span>
                  </span>

                  <a
                    href={pub.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-2xs hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'डाउनलोड PDF' : 'Download PDF'}</span>
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
