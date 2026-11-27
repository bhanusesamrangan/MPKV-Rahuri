'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  Scale,
  FileText,
  Clock,
  CheckCircle2,
  Users,
  Building,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Home,
  Sparkles,
  Info,
  DollarSign,
  Download,
  AlertTriangle,
  ShieldCheck,
  FileCheck,
  Send,
  AlertCircle,
  RefreshCw,
  Search,
  Check,
  History,
  Trash2
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import {
  DB_KEYS,
  GrievanceTicketRecord,
  appendRecord,
  clearCollection,
  getCollection
} from '@/lib/localDb';

interface TransparencyRtiViewProps {
  pageData?: any;
}

export const TransparencyRtiView: React.FC<TransparencyRtiViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const [activeTab, setActiveTab] = useState<
    'grievance' | 'posh' | 'ragging' | 'rti' | 'rts' | 'vigilance'
  >('grievance');

  // Grievance Form State
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    district: '',
    taluka: '',
    department: '',
    category: 'academic',
    comments: '',
    file: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    date: string;
    name: string;
    department: string;
  } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [savedTickets, setSavedTickets] = useState<GrievanceTicketRecord[]>([]);

  useEffect(() => {
    setSavedTickets(getCollection<GrievanceTicketRecord>(DB_KEYS.GRIEVANCE_TICKETS));
  }, []);

  // RTI Search filter
  const [rtiSearchQuery, setRtiSearchQuery] = useState('');

  // Districts (All 36 of Maharashtra)
  const districts: string[] = pageData?.districts || [
    'Ahmednagar', 'Akola', 'Amravati', 'Sambhajinagar', 'Beed', 'Bhandara', 'Buldhana',
    'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna',
    'Kolhapur', 'Latur', 'Mumbai', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik',
    'Osmanabad', 'Palghar', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli',
    'Satara', 'Sindhudurg', 'Solapur', 'Thane', 'Wardha', 'Washim', 'Yavatmal'
  ];

  // University Departments (All 24)
  const departments: string[] = pageData?.departments || [
    'Agriculture Agronomy', 'Dairy Science', 'Seed Science & Technology',
    'Agriculture Soil Science Chemistry', 'Agriculture Plant Pathology',
    'Agriculture Biotechnology & Physics', 'Horticulture', 'Agriculture Microbiology',
    'Agriculture Irrigation Water Management', 'Agriculture Extension Education',
    'Agriculture Plant Physiology', 'Agriculture Meteorology', 'Agriculture Entomology',
    'Food Science & Technology', 'Agriculture Botany', 'Biochemistry',
    'Animal Science & Husbandry and Dairy Science', 'Agriculture Economics',
    'Fruit Science', 'Genetics and Plant Breeding', 'Soil Water Conservation',
    'Irrigation Drainage Engineering', 'Agriculture Process Engineering',
    'Farm Machinery and Power'
  ];

  // RTI Designated Officers
  const rtiOfficers = [
    {
      level: { en: 'First Appellate Authority (FAA)', mr: 'प्रथम अपिलीय अधिकारी' },
      officer: { en: 'Registrar, MPKV Rahuri', mr: 'कुलसचिव, म.फु.कृ.वि., राहुरी' },
      scope: { en: 'Entire University Administrative Jurisdiction & Final Appeals', mr: 'संपूर्ण विद्यापीठ प्रशासकीय कार्यक्षेत्र व अंतिम अपिले' },
      address: { en: 'Registrar Secretariat, Central Administrative Building, Rahuri', mr: 'कुलसचिव सचिवालय, मध्यवर्ती प्रशासकीय इमारत, राहुरी' },
      phone: '02426-243216 / 243208',
      email: 'registrar.mpkv@nic.in',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300'
    },
    {
      level: { en: 'Central Public Information Officer (CPIO - Administration)', mr: 'केंद्रीय जनमाहिती अधिकारी (प्रशासन)' },
      officer: { en: 'Assistant Registrar (Administration)', mr: 'सहाय्यक कुलसचिव (प्रशासन)' },
      scope: { en: 'General Administration, Executive Council, Service Books & University Records', mr: 'सर्वसाधारण प्रशासन, कार्यकारी परिषद, सेवा पुस्तके व मध्यवर्ती अभिलेख' },
      address: { en: 'Administration Branch, MPKV Rahuri', mr: 'प्रशासन शाखा, म.फु.कृ.वि., राहुरी' },
      phone: '02426-243216',
      email: 'admin.mpkv@gov.in',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300'
    },
    {
      level: { en: 'Public Information Officer (Academic & Degrees)', mr: 'जनमाहिती अधिकारी (शैक्षणिक व पदव्या)' },
      officer: { en: 'Assistant Registrar (Education / Exam)', mr: 'सहाय्यक कुलसचिव (शिक्षण व परीक्षा)' },
      scope: { en: 'Admissions, Degree Verification, Transcripts, Gold Medals & Academic Affairs', mr: 'विद्यार्थी प्रवेश, पदवी पडताळणी, गुणपत्रिका, पदवीदान व शैक्षणिक बाबी' },
      address: { en: 'Academic Branch, Central Campus, Rahuri', mr: 'शैक्षणिक शाखा, मध्यवर्ती परिसर, राहुरी' },
      phone: '02426-243205',
      email: 'academic.mpkv@gov.in',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300'
    },
    {
      level: { en: 'Public Information Officer (Research & Patents)', mr: 'जनमाहिती अधिकारी (संशोधन व पेटंट्स)' },
      officer: { en: 'Assistant Registrar (Research)', mr: 'सहाय्यक कुलसचिव (संशोधन)' },
      scope: { en: 'Research Stations, Crop Varieties, AICRP Schemes, Implements & Patents', mr: 'संशोधन केंद्रे, पीक वाण, अखिल भारतीय प्रकल्प, शेती अवजारे व पेटंट्स' },
      address: { en: 'Directorate of Research, Rahuri', mr: 'संशोधन संचलनालय, राहुरी' },
      phone: '02426-243223',
      email: 'dor.mpkv@mpkv.ac.in',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300'
    },
    {
      level: { en: 'Public Information Officer (Pune Campus)', mr: 'जनमाहिती अधिकारी (पुणे कॅम्पस)' },
      officer: { en: 'Assistant Registrar, College of Agriculture, Pune', mr: 'सहाय्यक कुलसचिव, कृषी महाविद्यालय, पुणे' },
      scope: { en: 'Pune Campus, Student Hostels & Regional Research Sub-Stations', mr: 'पुणे महाविद्यालय परिसर, वसतिगृहे व संलग्न विभागीय संशोधन केंद्रे' },
      address: { en: 'Shivajinagar, Pune (MS)', mr: 'शिवाजीनगर, पुणे (महाराष्ट्र)' },
      phone: '020-25537033',
      email: 'adacpune@mpkv.ac.in',
      badgeColor: 'bg-rose-100 text-rose-950 border-rose-300'
    },
    {
      level: { en: 'Public Information Officer (Kolhapur Campus)', mr: 'जनमाहिती अधिकारी (कोल्हापूर कॅम्पस)' },
      officer: { en: 'Assistant Registrar, RCSM College of Agriculture', mr: 'सहाय्यक कुलसचिव, रा.छ.शा.म. कृषी महाविद्यालय' },
      scope: { en: 'Kolhapur Campus, Southern Maharashtra Stations & KVK', mr: 'कोल्हापूर परिसर व दक्षिण महाराष्ट्र संशोधन केंद्रे' },
      address: { en: 'Kasaba Bawada, Kolhapur', mr: 'कसबा बावडा, कोल्हापूर' },
      phone: '0231-2605851',
      email: 'adackolhapur@mpkv.ac.in',
      badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300'
    }
  ];

  // RTS Services Notified under Maharashtra Right to Public Services Act, 2015
  const rtsServices = [
    {
      service: { en: 'Issue of Official Degree Transcript / Grade Cards', mr: 'अधिकृत पदवी ट्रान्सक्रिप्ट / गुणपत्रिका देणे' },
      designated: { en: 'Assistant Registrar (Academic)', mr: 'सहाय्यक कुलसचिव (शिक्षण)' },
      timeframe: '15 Working Days',
      appeal: { en: 'Registrar, MPKV Rahuri', mr: 'कुलसचिव' }
    },
    {
      service: { en: 'Verification of Educational Certificates & Degrees', mr: 'शैक्षणिक पदवी प्रमाणपत्रांची अधिकृत पडताळणी' },
      designated: { en: 'Controller of Examinations', mr: 'परीक्षा नियंत्रक' },
      timeframe: '15 Working Days',
      appeal: { en: 'Registrar, MPKV Rahuri', mr: 'कुलसचिव' }
    },
    {
      service: { en: 'Issue of Student Migration Certificate', mr: 'स्थलांतर प्रमाणपत्र (मायग्रेशन) देणे' },
      designated: { en: 'Assistant Registrar (Academic)', mr: 'सहाय्यक कुलसचिव (शिक्षण)' },
      timeframe: '7 Working Days',
      appeal: { en: 'Registrar, MPKV Rahuri', mr: 'कुलसचिव' }
    },
    {
      service: { en: 'Soil & Irrigation Water Health Card Testing Report', mr: 'माती व सिंचन पाणी तपासणी अहवाल देणे' },
      designated: { en: 'In-Charge, Soil Testing Laboratory', mr: 'प्रभारी, मृद परीक्षण प्रयोगशाळा' },
      timeframe: '15 Working Days',
      appeal: { en: 'Associate Dean (Respective College)', mr: 'सहयोगी अधिष्ठाता' }
    },
    {
      service: { en: 'Booking of Certified Breeder & Foundation Seed Stock', mr: 'प्रमाणित व पैदासकार बियाणे आरक्षण सेवा' },
      designated: { en: 'In-Charge Seed Cell / ATIC', mr: 'प्रभारी बियाणे कक्ष / ॲटिक' },
      timeframe: '3 Working Days',
      appeal: { en: 'Director of Extension Education', mr: 'संचालक विस्तार शिक्षण' }
    }
  ];

  // Statutory Anti Sexual Harassment POSH Cell Documents
  const poshDocuments = [
    {
      title: {
        en: 'Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013',
        mr: 'कामाच्या ठिकाणी महिलांचे लैंगिक छळापासून संरक्षण (प्रतिबंध, मनाई आणि निवारण) अधिनियम, २०१३'
      },
      desc: {
        en: 'Statutory Act enacted by Parliament of India guaranteeing zero tolerance for harassment of female students, employees, and visitors.',
        mr: 'संसदेने पारित केलेला अधिकृत कायदा जो महिला कर्मचारी, विद्यार्थिनी व अभ्यागत यांच्यासाठी सुरक्षित वातावरणाची वैधानिक हमी देतो.'
      },
      fileUrl: '/media/docs/transparency/Anti_Sexual_Harassment_Act_2013.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/AntiAct.pdf'
    },
    {
      title: {
        en: 'Internal Complaints Committee (ICC) Composition & Powers',
        mr: 'अंतर्गत तक्रार निवारण समिती (ICC) रचना व वैधानिक अधिकार'
      },
      desc: {
        en: 'Mandatory structural composition including Presiding Officer (senior woman professor), faculty members, non-teaching staff, and external NGO representative.',
        mr: 'पीठासीन अधिकारी (वरिष्ठ महिला प्राध्यापिका), महिला सदस्य, शिक्षकेतर कर्मचारी व बाह्य अशासकीय संस्था प्रतिनिधी यांची वैधानिक रचना.'
      },
      fileUrl: '/media/docs/transparency/Anti_Sexual_Harassment_Composition.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/AntiCompo.pdf'
    },
    {
      title: {
        en: 'Notified University ICC Committee Gazette & Office Order',
        mr: 'अधिसूचित विद्यापीठ अंतर्गत तक्रार समिती आदेश (गॅझेट अधिसूचना)'
      },
      desc: {
        en: 'Official notification notifying currently active members, nodal campus officers, and contact coordinators.',
        mr: 'विद्यापीठाने जारी केलेला अधिकृत आदेश ज्यामध्ये कार्यरत समिती सदस्य व समन्वय अधिकाऱ्यांची नावे व संपर्क तपशील समाविष्ट आहेत.'
      },
      fileUrl: '/media/docs/transparency/Anti_Sexual_Harassment_Committees.pdf',
      externalUrl: 'https://mpkv.ac.in/Uploads/Education/20260825_163230_922240bc8c94932b04f6693e2a1f96e4.pdf'
    }
  ];

  // Statutory Anti-Ragging Regulatory Documents
  const antiRaggingDocuments = [
    {
      title: {
        en: 'UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009',
        mr: 'उच्च शिक्षण संस्थांमध्ये रॅगिंग प्रतिबंधक यूजीसी नियमावली, २००९'
      },
      desc: {
        en: 'Statutory regulations mandated by UGC under the directions of Hon. Supreme Court of India.',
        mr: 'सर्वोच्च न्यायालयाच्या निर्देशानुसार विद्यापीठ अनुदान आयोगाने जारी केलेली अधिकृत मार्गदर्शक तत्त्वे.'
      },
      fileUrl: '/media/docs/transparency/Anti_Ragging_UGC_Regulations_2009.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/RagUgc.pdf'
    },
    {
      title: {
        en: 'Anti-Ragging First Amendment (2012)',
        mr: 'रॅगिंग प्रतिबंधक पहिली सुधारणा (२०१२)'
      },
      desc: {
        en: 'First amendment incorporating institutional monitoring cell and affidavit requirements.',
        mr: 'हमीपत्र व सनियंत्रण कक्षासंदर्भातील पहिली वैधानिक सुधारणा.'
      },
      fileUrl: '/media/docs/transparency/Anti_Ragging_First_Amendment_2012.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/RagFirst.pdf'
    },
    {
      title: {
        en: 'Anti-Ragging Second Amendment (2013)',
        mr: 'रॅगिंग प्रतिबंधक दुसरी सुधारणा (२०१३)'
      },
      desc: {
        en: 'Second amendment updating penalties, FIR lodging protocols, and institutional inspections.',
        mr: 'दंडात्मक कारवाई व प्रथम माहिती अहवाल (FIR) दाखल करण्याच्या कार्यपद्धतीची दुसरी सुधारणा.'
      },
      fileUrl: '/media/docs/transparency/Anti_Ragging_Second_Amendment_2013.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/RagScond.pdf'
    },
    {
      title: {
        en: 'Anti-Ragging Third Amendment (2016)',
        mr: 'रॅगिंग प्रतिबंधक तिसरी सुधारणा (२०१६)'
      },
      desc: {
        en: 'Third amendment expanding scope to racial, regional, gender, and digital discrimination.',
        mr: 'प्रादेशिक, वांशिक, लैंगिक व डिजिटल भेदभावाचा समावेश करणारी तिसरी सुधारणा.'
      },
      fileUrl: '/media/docs/transparency/Anti_Ragging_Third_Amendment_2016.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/RagThird.pdf'
    },
    {
      title: {
        en: 'Anti-Ragging Squad & Committee Composition',
        mr: 'रॅगिंग विरोधी पथक व समिती रचना'
      },
      desc: {
        en: 'Campus-level anti-ragging squad composition, rector patrols, and vigilance squad protocols.',
        mr: 'कॅम्पस व वसतिगृह स्तरावरील रॅगिंग विरोधी भरारी पथक व सनियंत्रण समितीची रचना.'
      },
      fileUrl: '/media/docs/transparency/Anti_Ragging_Composition.pdf',
      externalUrl: 'https://mpkv.ac.in/StaticPdf/Composion.pdf'
    },
    {
      title: {
        en: 'Notified University Anti-Ragging Committees Order',
        mr: 'अधिसूचित विद्यापीठ रॅगिंग विरोधी समिती आदेश'
      },
      desc: {
        en: 'Official notification notifying college-wise anti-ragging committees and associate deans in charge.',
        mr: 'महाविद्यालयनिहाय रॅगिंग प्रतिबंधक समित्या व सहयोगी अधिष्ठाता प्रमुख यांच्या अधिकृत आदेशाची प्रत.'
      },
      fileUrl: '/media/docs/transparency/Anti_Ragging_Committees.pdf',
      externalUrl: 'https://mpkv.ac.in/Uploads/Education/1223_20240809043124.pdf'
    }
  ];

  // Vigilance Document
  const vigilanceDocument = {
    title: {
      en: 'Vigilance & Grievance Redressal System — Statutory Notification',
      mr: 'दक्षता व तक्रार निवारण प्रणाली — अधिकृत अधिसूचना'
    },
    desc: {
      en: 'Official University order formally notifying vigilance officers, grievance redressal coordinators, and procedures.',
      mr: 'विद्यापीठ प्रशासनाने जारी केलेली दक्षता अधिकारी व तक्रार निवारण कक्ष अधिकृत अधिसूचना.'
    },
    fileUrl: '/media/docs/transparency/Vigilance_Grievance_Redressal_Committees.pdf',
    externalUrl: 'https://mpkv.ac.in/StaticPdf/Notification.pdf'
  };

  // Filtered RTI Officers
  const filteredRtiOfficers = rtiOfficers.filter((o) => {
    if (!rtiSearchQuery.trim()) return true;
    const q = rtiSearchQuery.toLowerCase().trim();
    const lEn = o.level.en.toLowerCase();
    const lMr = o.level.mr.toLowerCase();
    const offEn = o.officer.en.toLowerCase();
    const offMr = o.officer.mr.toLowerCase();
    const sEn = o.scope.en.toLowerCase();
    const sMr = o.scope.mr.toLowerCase();
    return (
      lEn.includes(q) ||
      lMr.includes(q) ||
      offEn.includes(q) ||
      offMr.includes(q) ||
      sEn.includes(q) ||
      sMr.includes(q)
    );
  });

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError(language === 'mr' ? 'कृपया आपले पूर्ण नाव भरा.' : 'Please enter your full name.');
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.trim().length < 10) {
      setFormError(language === 'mr' ? 'कृपया १० अंकी वैध मोबाईल नंबर टाका.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!formData.district) {
      setFormError(language === 'mr' ? 'कृपया आपला जिल्हा निवडा.' : 'Please select your district.');
      return;
    }
    if (!formData.department) {
      setFormError(language === 'mr' ? 'कृपया संबंधित विभाग निवडा.' : 'Please select the relevant department.');
      return;
    }
    if (!formData.comments.trim()) {
      setFormError(language === 'mr' ? 'कृपया तक्रारीचा सविस्तर तपशील लिहा.' : 'Please provide details of your grievance.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const randomTicket = `MPKV-GRS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      const formattedDate = new Date().toLocaleDateString(language === 'mr' ? 'mr-IN' : 'en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
      const record: GrievanceTicketRecord = {
        id: randomTicket,
        name: formData.name.trim(),
        mobile: formData.mobile.trim(),
        email: formData.email.trim(),
        district: formData.district,
        taluka: formData.taluka.trim(),
        department: formData.department,
        category: formData.category,
        comments: formData.comments.trim(),
        date: formattedDate
      };
      const updated = appendRecord(DB_KEYS.GRIEVANCE_TICKETS, record);
      setSavedTickets(updated);
      setSubmittedTicket({
        id: randomTicket,
        date: formattedDate,
        name: formData.name,
        department: formData.department
      });
      setIsSubmitting(false);
      // Reset form
      setFormData({
        name: '',
        mobile: '',
        email: '',
        district: '',
        taluka: '',
        department: '',
        category: 'academic',
        comments: '',
        file: null
      });
    }, 600);
  };

  return (
    <div className="w-full bg-[#f8faf9] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumb Strip (Standard MPKV Breadcrumb) */}
      <div className="w-full bg-[#f4f7f2] border-b border-stone-200/80 py-2.5 px-4 sm:px-8 lg:px-[50px]">
        <div className="w-full max-w-[1720px] mx-auto flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-[13px] text-stone-600 font-medium">
          <Link href="/" className="hover:text-emerald-800 flex items-center gap-1.5 transition-colors">
            <Home className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-emerald-950 font-bold truncate max-w-[280px] sm:max-w-md">
            {language === 'mr'
              ? 'पारदर्शकता, माहिती अधिकार व तक्रार निवारण'
              : 'Transparency, RTI & Grievance Redressal'}
          </span>
        </div>
      </div>

      {/* 2. Hero Header: Institutional Navy & Forest Emerald */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-4 sm:py-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c1f38] via-[#0f2d4a] to-[#071728] text-white p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-900/40">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-5xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? 'वैधानिक पारदर्शकता व जन उत्तरदायित्व' : 'Statutory Governance & Public Accountability'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-serif">
              {language === 'mr'
                ? 'पारदर्शकता, माहिती अधिकार (RTI) व तक्रार निवारण प्रणाली'
                : 'Statutory Transparency, Right to Information (RTI) & Grievance Redressal System'}
            </h1>

            <p className="text-blue-100/90 text-xs sm:text-sm lg:text-base leading-relaxed font-normal max-w-3xl">
              {language === 'mr'
                ? 'माहितीचा अधिकार अधिनियम २००५, महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५ (आपले सरकार), लैंगिक छळ प्रतिबंधक कायदा २०१३ व यूजीसी रॅगिंग प्रतिबंधक नियमांन्वये विद्यापीठाचे पारदर्शक व उत्तरदायी संचलन.'
                : 'Fulfilling our institutional mandate of administrative transparency, time-bound citizen delivery under RTS Act 2015, zero-tolerance POSH ICC & UGC Anti-Ragging safety.'}
            </p>

            {/* Quick-Access Statutory Resources Ribbon */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <a
                href="/media/docs/transparency/RTI.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white transition-all shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'mr' ? 'माहिती अधिकार नियमावली (PDF)' : 'RTI Act & Manual (PDF)'}</span>
              </a>

              <a
                href="/media/docs/transparency/Right_to_Service.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-bold text-white transition-all shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>{language === 'mr' ? 'लोकसेवा हक्क नियम (PDF)' : 'Right to Public Services (RTS) PDF'}</span>
              </a>

              <a
                href="https://aaplesarkar.mahaonline.gov.in/en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-bold transition-all shadow-sm"
              >
                <span>{language === 'mr' ? 'आपले सरकार पोर्टल' : 'Aaple Sarkar Portal'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <a
                href="https://rtionline.maharashtra.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-700/80 hover:bg-blue-600 text-white text-xs font-bold border border-blue-400/40 transition-all shadow-sm"
              >
                <span>{language === 'mr' ? 'ऑनलाइन आरटीआय पोर्टल' : 'RTI Online Maharashtra'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Main Navigation & Content Container */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16 space-y-8">
        
        {/* Navigation Tabs (Wrap layout so all 6 tabs are 100% visible with zero horizontal clipping) */}
        <div className="p-3 sm:p-4 rounded-2xl bg-white border border-stone-200/90 shadow-xs">
          <div className="flex flex-wrap items-center gap-2">
            {[
              {
                key: 'grievance',
                labelEn: 'Online Grievance Redressal',
                labelMr: 'तक्रार निवारण प्रणाली',
                icon: ShieldAlert,
                badge: 'Portal'
              },
              {
                key: 'posh',
                labelEn: 'Anti-Sexual Harassment (POSH)',
                labelMr: 'लैंगिक छळ प्रतिबंधक कक्ष (ICC)',
                icon: ShieldCheck,
                badge: 'Act 2013'
              },
              {
                key: 'ragging',
                labelEn: 'Anti-Ragging Regulatory Cell',
                labelMr: 'रॅगिंग प्रतिबंधक कक्ष',
                icon: AlertTriangle,
                badge: 'UGC'
              },
              {
                key: 'rti',
                labelEn: 'RTI Act 2005 Officers Directory',
                labelMr: 'माहिती अधिकार नियुक्त अधिकारी',
                icon: Scale,
                badge: '6 Officers'
              },
              {
                key: 'rts',
                labelEn: 'Right to Public Services (RTS)',
                labelMr: 'लोकसेवा हक्क हमी (RTS)',
                icon: Clock,
                badge: '5 Services'
              },
              {
                key: 'vigilance',
                labelEn: 'Vigilance & Notifications',
                labelMr: 'दक्षता व वैधानिक समित्या',
                icon: FileCheck,
                badge: 'Gazette'
              }
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-950 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-500'}`} />
                  <span className="whitespace-nowrap">{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-blue-800 text-white' : 'bg-stone-200 text-stone-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* TAB 1: ONLINE GRIEVANCE REDRESSAL PORTAL & FORM                   */}
        {/* ================================================================= */}
        {activeTab === 'grievance' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Resolution SLA Workflow Ribbon */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-blue-700" />
                <span>{language === 'mr' ? 'तक्रार निवारण कार्यपद्धती व कालमर्यादा (SLA)' : 'Grievance Resolution Workflow & Resolution SLA'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    step: '01',
                    title: { en: 'Digital Registration', mr: 'ऑनलाइन नोंदणी' },
                    desc: { en: 'Instant acknowledgment with tracking ticket generated within 24 hours.', mr: 'नोंदणीनंतर तात्काळ पोचपावती व डिजिटल ट्रॅकिंग टोकन क्रमांक जारी.' },
                    time: '24 Hours'
                  },
                  {
                    step: '02',
                    title: { en: 'Desk Verification', mr: 'प्राथमिक पडताळणी' },
                    desc: { en: 'Nodal officer reviews and assigns grievance to the concerned faculty/department.', mr: 'नोडल अधिकाऱ्यांमार्फत छाननी व संबंधित विभाग प्रमुखांकडे वर्ग.' },
                    time: '3 Working Days'
                  },
                  {
                    step: '03',
                    title: { en: 'Redressal & Action', mr: 'निवारण व आदेश' },
                    desc: { en: 'Inquiry, corrective action taken, and official resolution order issued.', mr: 'वस्तुनिष्ठ चौकशी, निवारक उपाययोजना व लेखी निवारण आदेश.' },
                    time: '15 Working Days'
                  },
                  {
                    step: '04',
                    title: { en: 'First Appeal Option', mr: 'प्रथम अपील अधिकार' },
                    desc: { en: 'If unsatisfied, citizen can appeal directly to University Registrar.', mr: 'निवारणाने समाधान न झाल्यास मा. कुलसचिवांकडे प्रथम अपील करण्याची सुविधा.' },
                    time: 'Appellate Authority'
                  }
                ].map((s, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-blue-900 px-2 py-0.5 rounded-md bg-blue-100">
                        {s.step}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {s.time}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 pt-1">
                      {language === 'mr' ? s.title.mr : s.title.en}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {language === 'mr' ? s.desc.mr : s.desc.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Submission Form Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Card (lg:col-span-8) */}
              <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
                
                <div className="border-b border-stone-100 pb-4 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                    <Send className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'mr' ? 'अधिकृत तक्रार नोंदणी अर्ज' : 'Official Grievance Registration Form'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'तक्रार निवारण अर्ज दाखल करा' : 'Submit a Formal Grievance'}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {language === 'mr'
                      ? 'विद्यार्थी, पालक, शेतकरी व नागरिकांच्या तक्रारींचे विहित मुदतीत निवारण करण्यासाठी अधिकृत दालन.'
                      : 'Dedicated institutional window for prompt redressal of grievances for students, farmers, staff, and general public.'}
                  </p>
                </div>

                {submittedTicket ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-500 space-y-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                        {language === 'mr' ? 'तक्रार यशस्वीरित्या नोंदवली गेली!' : 'Grievance Registered Successfully!'}
                      </span>
                      <h4 className="text-xl font-mono font-bold text-slate-900">
                        {submittedTicket.id}
                      </h4>
                      <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                        {language === 'mr'
                          ? `आपली तक्रार ${submittedTicket.department} विभागाकडे वर्ग करण्यात आली आहे. कृपया हा संदर्भ क्रमांक जतन करून ठेवा.`
                          : `Your grievance has been officially routed to ${submittedTicket.department}. Please save this reference ticket for tracking.`}
                      </p>
                    </div>

                    <div className="pt-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setSubmittedTicket(null)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'दुसरा अर्ज नोंदवा' : 'Submit Another Grievance'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitGrievance} className="space-y-4">
                    
                    {formError && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-300 text-xs text-rose-800 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {language === 'mr' ? 'पूर्ण नाव *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={language === 'mr' ? 'उदा. सचिन विठ्ठल जाधव' : 'e.g. Dr. / Shri / Smt.'}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all"
                        />
                      </div>

                      {/* Mobile */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {language === 'mr' ? 'मोबाईल नंबर (१० अंकी) *' : 'Mobile Number (10 digits) *'}
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
                          placeholder="e.g. 9822000000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {language === 'mr' ? 'ईमेल पत्ता' : 'Email Address'}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="user@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all"
                        />
                        <span className="text-[10px] text-stone-500">
                          {language === 'mr' ? 'आपला ईमेल गोपनीय ठेवला जाईल.' : "We'll never share your email with anyone else."}
                        </span>
                      </div>

                      {/* Grievance Category */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {language === 'mr' ? 'तक्रारीचा वर्ग *' : 'Grievance Category *'}
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all"
                        >
                          <option value="academic">{language === 'mr' ? 'शैक्षणिक व प्रवेश' : 'Academic & Admission'}</option>
                          <option value="examination">{language === 'mr' ? 'परीक्षा व पदवी' : 'Examination & Degrees'}</option>
                          <option value="hostel">{language === 'mr' ? 'वसतिगृह व सुविधा' : 'Hostel & Student Facilities'}</option>
                          <option value="farm_services">{language === 'mr' ? 'शेतकरी सेवा व बियाणे' : 'Farmer & Seed Services'}</option>
                          <option value="administration">{language === 'mr' ? 'प्रशासकीय व आस्थापना' : 'General Administrative'}</option>
                          <option value="other">{language === 'mr' ? 'इतर' : 'Other Inquiries'}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* District */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {language === 'mr' ? 'जिल्हा (महाराष्ट्र राज्य) *' : 'District (Maharashtra State) *'}
                        </label>
                        <select
                          required
                          value={formData.district}
                          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all"
                        >
                          <option value="">{language === 'mr' ? '-- जिल्हा निवडा --' : '-- Select District --'}</option>
                          {districts.map((d, idx) => (
                            <option key={idx} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>

                      {/* Taluka */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">
                          {language === 'mr' ? 'तालुका' : 'Taluka'}
                        </label>
                        <input
                          type="text"
                          value={formData.taluka}
                          onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                          placeholder={language === 'mr' ? 'उदा. राहुरी, संगमनेर' : 'e.g. Rahuri, Haveli, Karad'}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all"
                        />
                      </div>
                    </div>

                    {/* Department Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        {language === 'mr' ? 'संबंधित विद्यापीठ विभाग *' : 'Concerned University Department *'}
                      </label>
                      <select
                        required
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all"
                      >
                        <option value="">{language === 'mr' ? '-- विभाग निवडा --' : '-- Select Department --'}</option>
                        {departments.map((dept, idx) => (
                          <option key={idx} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>

                    {/* Comments */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        {language === 'mr' ? 'तक्रारीचा सविस्तर तपशील *' : 'Grievance Description / Comments *'}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        placeholder={language === 'mr' ? 'तक्रारीचे कारण, घटना, संबंधित कार्यालय व आपल्या अपेक्षेचा सविस्तर तपशील लिहा...' : 'Describe your grievance clearly, including dates, relevant office, and specific redressal sought...'}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all leading-relaxed"
                      />
                    </div>

                    {/* File Attachment */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">
                        {language === 'mr' ? 'दस्तऐवज / पुरावा किंवा स्क्रीनशॉट जोडा (ऐच्छिक)' : 'Upload Supporting Document / Screenshot (Optional)'}
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setFormData({ ...formData, file });
                        }}
                        className="w-full text-xs text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-100 file:text-blue-900 hover:file:bg-blue-200 transition-all cursor-pointer"
                      />
                      <span className="text-[10px] text-stone-500">
                        {language === 'mr' ? 'स्वीकार्य फॉरमॅट: PDF, PNG, JPG (कमाल ५ MB)' : 'Supported: PDF, JPG, PNG (Max size: 5 MB)'}
                      </span>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-60"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>{language === 'mr' ? 'अर्ज नोंदवला जात आहे...' : 'Submitting Grievance...'}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5 text-amber-300" />
                            <span>{language === 'mr' ? 'तक्रार अर्ज सादर करा' : 'Submit Formal Grievance'}</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}

                {savedTickets.length > 0 && (
                  <div className="pt-5 border-t border-stone-100 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <History className="w-4 h-4 text-blue-800" />
                        <span>
                          {language === 'mr'
                            ? `जतन केलेल्या तक्रार नोंदी (${savedTickets.length})`
                            : `Saved Grievance Tickets (${savedTickets.length})`}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          clearCollection(DB_KEYS.GRIEVANCE_TICKETS);
                          setSavedTickets([]);
                        }}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:underline cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{language === 'mr' ? 'इतिहास पुसा' : 'Clear'}</span>
                      </button>
                    </div>

                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {savedTickets.map((t) => (
                        <div
                          key={t.id}
                          className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs flex flex-wrap items-center justify-between gap-2"
                        >
                          <div className="min-w-0">
                            <span className="font-mono font-bold text-blue-900">{t.id}</span>
                            <span className="text-stone-400 mx-1.5">•</span>
                            <span className="font-semibold text-slate-800">{t.department}</span>
                          </div>
                          <span className="text-[11px] text-stone-500 font-medium">{t.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Sidebar Info Card (lg:col-span-4) */}
              <div className="lg:col-span-4 space-y-5">
                
                {/* Aaple Sarkar Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-6 shadow-md space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/15 font-bold text-[10px] uppercase tracking-wider">
                    <ExternalLink className="w-3 h-3" />
                    <span>{language === 'mr' ? 'महाराष्ट्र शासन' : 'Government of Maharashtra'}</span>
                  </div>
                  <h4 className="text-lg font-bold font-serif leading-snug">
                    {language === 'mr' ? 'आपले सरकार तक्रार निवारण' : 'Aaple Sarkar Grievance Redressal'}
                  </h4>
                  <p className="text-xs text-slate-900/90 leading-relaxed font-medium">
                    {language === 'mr'
                      ? 'नागरिक महाराष्ट्र शासनाच्या महाऑनलाइन आपले सरकार पोर्टलद्वारे थेट विद्यापीठाशी संबंधित तक्रारी नोंदवू शकतात.'
                      : 'Citizens may also lodge public grievances directly via Government of Maharashtra Aaple Sarkar portal with integrated tracking.'}
                  </p>
                  <a
                    href="https://aaplesarkar.mahaonline.gov.in/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 w-full justify-center py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>aaplesarkar.mahaonline.gov.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Statutory Contact Card */}
                <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                    <Building className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'mr' ? 'मध्यवर्ती संपर्क कक्ष' : 'Central Redressal Secretariat'}</span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-700">
                    <div className="font-bold text-slate-900">Office of the Registrar</div>
                    <div className="text-stone-500">Mahatma Phule Krishi Vidyapeeth, Rahuri</div>
                    <div className="text-stone-500">Dist. Ahmednagar, Maharashtra - 413722</div>
                  </div>
                  <div className="pt-2 border-t border-stone-100 space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      <span>02426-243216 / 243208</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 font-mono text-[11px]">
                      <Mail className="w-3.5 h-3.5 text-emerald-700" />
                      <span>registrar.mpkv@nic.in</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 2: ANTI-SEXUAL HARASSMENT (POSH / ICC CELL)                   */}
        {/* ================================================================= */}
        {activeTab === 'posh' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Zero-Tolerance Banner */}
            <div className="p-6 rounded-3xl bg-rose-50/80 border border-rose-200 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-200 text-rose-950 text-[10px] font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
                <span>{language === 'mr' ? 'शून्य सहिष्णुता धोरण' : 'Zero Tolerance Policy'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-rose-950 font-serif">
                {language === 'mr'
                  ? 'कामाच्या ठिकाणी महिलांचे लैंगिक छळापासून संरक्षण (प्रतिबंध, मनाई आणि निवारण)'
                  : 'Internal Complaints Committee (ICC) & POSH Act 2013 Compliance'}
              </h3>
              <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-normal max-w-4xl">
                {language === 'mr'
                  ? 'महात्मा फुले कृषी विद्यापीठ, राहुरी येथे सर्व महिला प्राध्यापिका, विद्यार्थिनी, महिला कर्मचारी व अभ्यागतांच्या सन्मान व सुरक्षेसाठी अंतर्गत तक्रार निवारण समिती (ICC) कार्यरत असून तक्रारदाराची ओळख १००% गोपनीय ठेवून विहित ९० दिवसांच्या आत सखोल चौकशी व कारवाई केली जाते.'
                  : 'MPKV Rahuri maintains an active Internal Complaints Committee (ICC) to ensure a safe, dignified, and harassment-free academic and professional environment. All complaints receive strictly confidential, time-bound investigation within 90 days as mandated under POSH Act 2013.'}
              </p>
            </div>

            {/* 3 Statutory Documents Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {poshDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-rose-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-900">
                      {idx === 0 ? 'Statutory Act' : idx === 1 ? 'Composition' : 'Notified Committees'}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {language === 'mr' ? doc.title.mr : doc.title.en}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {language === 'mr' ? doc.desc.mr : doc.desc.en}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white font-bold text-xs transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'दस्तऐवज पहा (PDF)' : 'View Document (PDF)'}</span>
                    </a>

                    <a
                      href={doc.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-stone-700 text-xs"
                      title="Original Portal Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 3: ANTI-RAGGING REGULATORY CELL                               */}
        {/* ================================================================= */}
        {activeTab === 'ragging' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* National Helpline Banner */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 shadow-md space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-950/15 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? '२४x७ राष्ट्रीय रॅगिंग विरोधी हेल्पलाईन' : '24x7 National Anti-Ragging Helpline'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-serif">
                    Toll-Free: 1800-180-5522
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-950/90 font-medium">
                    {language === 'mr'
                      ? 'रॅगिंग ही शिक्षापात्र फौजदारी गुन्हा आहे. विद्यापीठाच्या सर्व महाविद्यालये, वसतिगृहे व क्रीडा संकुलांमध्ये रॅगिंगला पूर्णपणे बंदी आहे.'
                      : 'Ragging is a cognizable criminal offense punishable under Indian Penal Code and UGC Regulations with immediate suspension and FIR.'}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <a
                    href="https://www.antiragging.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>antiragging.in</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <span className="text-[11px] font-mono text-slate-950 font-bold text-center">
                    helpline@antiragging.in
                  </span>
                </div>
              </div>
            </div>

            {/* 6 Anti-Ragging Regulatory Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {antiRaggingDocuments.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                      {idx === 0 ? 'Primary UGC Regulation' : idx < 4 ? 'Statutory Amendment' : 'Squad & Notification'}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {language === 'mr' ? doc.title.mr : doc.title.en}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed font-normal">
                      {language === 'mr' ? doc.desc.mr : doc.desc.en}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'पीडीएफ पहा' : 'View PDF'}</span>
                    </a>

                    <a
                      href={doc.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-stone-700 text-xs"
                      title="Original Portal Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 4: RTI ACT 2005 DESIGNATED OFFICERS DIRECTORY                 */}
        {/* ================================================================= */}
        {activeTab === 'rti' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Header Toolbar & Live Search */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-[11px] font-bold uppercase tracking-wider">
                    <Scale className="w-3.5 h-3.5 text-blue-700" />
                    <span>{language === 'mr' ? 'माहिती अधिकार २००५' : 'RTI Act 2005 Designated Directory'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                    {language === 'mr' ? 'प्रथम अपिलीय व जनमाहिती अधिकारी निर्देशिका' : 'Appellate Authority & Public Information Officers'}
                  </h3>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-80 shrink-0">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={rtiSearchQuery}
                    onChange={(e) => setRtiSearchQuery(e.target.value)}
                    placeholder={language === 'mr' ? 'अधिकारी किंवा कार्यक्षेत्र शोधा...' : 'Search by officer or campus...'}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition-all shadow-2xs"
                  />
                </div>
              </div>

              {/* Online RTI Portal Direct Box */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-blue-800" />
                    <span>{language === 'mr' ? 'महाराष्ट्र ऑनलाइन आरटीआय पोर्टल' : 'Government of Maharashtra Online RTI Portal'}</span>
                  </div>
                  <p className="text-xs text-blue-900/80">
                    {language === 'mr'
                      ? '१० रुपये कोर्ट फी सह घरबसल्या ऑनलाइन अर्ज सादर करण्यासाठी rtionline.maharashtra.gov.in ला भेट द्या.'
                      : 'File digital RTI requests with ₹10 online fee through rtionline.maharashtra.gov.in (Select Agriculture / MPKV).'}
                  </p>
                </div>
                <a
                  href="https://rtionline.maharashtra.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors shrink-0"
                >
                  <span>rtionline.maharashtra.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Officers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRtiOfficers.map((o, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2.5">
                    <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border ${o.badgeColor}`}>
                      {getBilingual(o.level)}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 font-serif">
                      {getBilingual(o.officer)}
                    </h4>
                    <div className="space-y-1 text-xs text-stone-600">
                      <div>
                        <strong className="text-slate-800">{language === 'mr' ? 'कार्यक्षेत्र: ' : 'Scope: '}</strong>
                        {getBilingual(o.scope)}
                      </div>
                      <div className="text-stone-500 pt-0.5">
                        {getBilingual(o.address)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-100 space-y-1.5">
                    <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-800" />
                      <span>{o.phone}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-800" />
                      <span>{o.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Offline Application & Fee Guidelines Card */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
                <DollarSign className="w-4 h-4 text-emerald-700" />
                <span>{language === 'mr' ? 'प्रत्यक्ष (ऑफलाइन) अर्ज व शुल्क नियम' : 'Offline Applications & Prescribed Fee Rules'}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                {language === 'mr'
                  ? 'ऑफलाइन अर्जासोबत १० रुपयांचा कोर्ट फी स्टॅम्प किंवा कुलसचिव/नियंत्रक, मफुकृवि राहुरी यांच्या नावे धनाकर्ष जोडावा. माहितीचा अधिकार नियम २००५ अन्वये A4/A3 आकाराच्या छायांकित प्रतींसाठी २ रुपये प्रति पृष्ठ दर विहित आहे. अभिलेख निरीक्षणासाठी प्रथम तासासाठी कोणतेही शुल्क नाही; त्यानंतर प्रत्येक तासासाठी ५ रुपये शुल्क आकारले जाते.'
                  : 'Physical applications must accompany a ₹10 Court Fee Stamp or Demand Draft drawn in favor of "The Comptroller, MPKV Rahuri". Under RTI Rules 2005, photocopy charges are ₹2 per A4/A3 page. First hour of record inspection is free; ₹5 is charged for each subsequent hour.'}
              </p>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 5: RIGHT TO PUBLIC SERVICES (RTS & AAPLE SARKAR)              */}
        {/* ================================================================= */}
        {activeTab === 'rts' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[11px] font-bold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-emerald-700" />
                <span>{language === 'mr' ? 'महाराष्ट्र लोकसेवा हक्क अधिनियम २०१५' : 'Maharashtra Right to Public Services Act 2015'}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {language === 'mr' ? 'विद्यापीठाच्या अधिसूचित सेवा व विहित मुदत' : 'Notified University Public Services & Timeframes'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                {language === 'mr'
                  ? 'नागरिक व विद्यार्थ्यांना विहित कालावधीत पारदर्शक व गतिमान सेवा मिळण्याची वैधानिक हमी. वेळेत सेवा न मिळाल्यास प्रथम अपिलीय अधिकाऱ्यांकडे अपील करता येते.'
                  : 'Statutory guarantee for citizens and students to receive transparent, time-bound public services. Failure to deliver within the stipulated timeframe permits direct appeal to the designated authority.'}
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-2xs">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-stone-50 text-slate-800 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                    <th className="px-5 py-3.5">Sr.</th>
                    <th className="px-5 py-3.5">{language === 'mr' ? 'अधिसूचित लोकसेवा' : 'Notified Public Service'}</th>
                    <th className="px-5 py-3.5">{language === 'mr' ? 'पदनिर्देशित अधिकारी' : 'Designated Officer'}</th>
                    <th className="px-5 py-3.5">{language === 'mr' ? 'विहित मुदत' : 'Stipulated Timeframe'}</th>
                    <th className="px-5 py-3.5">{language === 'mr' ? 'प्रथम अपिलीय अधिकारी' : 'First Appellate Authority'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {rtsServices.map((r, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-500">{i + 1}</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-900">{getBilingual(r.service)}</td>
                      <td className="px-5 py-3.5 text-slate-700">{getBilingual(r.designated)}</td>
                      <td className="px-5 py-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-300">
                          {r.timeframe}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-600">{getBilingual(r.appeal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* TAB 6: VIGILANCE NOTIFICATIONS & STATUTORY CIRCULARS             */}
        {/* ================================================================= */}
        {activeTab === 'vigilance' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-100 text-blue-950 border border-blue-300 text-[11px] font-bold uppercase tracking-wider">
                <FileCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>{language === 'mr' ? 'दक्षता व तक्रार निवारण समित्या' : 'Vigilance & Grievance Redressal Committees'}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-serif">
                {language === 'mr' ? 'विद्यापीठ अधिकृत गॅझेट व अधिसूचना' : 'Official University Gazette & Circulars'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                {language === 'mr'
                  ? 'विद्यापीठ प्रशासनाने विविध संकुलांमध्ये स्थापन केलेल्या दक्षता, शिस्तपालन व तक्रार निवारण समित्यांचे अधिकृत आदेश.'
                  : 'Official university notifications establishing vigilance, discipline, and grievance committees across constituent colleges and campuses.'}
              </p>
            </div>

            {/* Notification Card */}
            <div className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-900">
                  Notification
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {language === 'mr' ? vigilanceDocument.title.mr : vigilanceDocument.title.en}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-2xl">
                  {language === 'mr' ? vigilanceDocument.desc.mr : vigilanceDocument.desc.en}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={vigilanceDocument.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'अधिसूचना पहा (PDF)' : 'View Notification (PDF)'}</span>
                </a>

                <a
                  href={vigilanceDocument.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                  title="Original Portal Link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
