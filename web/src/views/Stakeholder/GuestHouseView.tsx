'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Building2,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ChevronRight,
  Printer,
  Volume2,
  VolumeX,
  Sparkles,
  Wifi,
  Coffee,
  Car,
  Tv,
  Wind,
  ShieldCheck,
  Calendar,
  Users,
  DollarSign,
  Info,
  Download,
  ExternalLink,
  FileText
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAccessibility } from '@/context/AccessibilityContext';

interface GuestHouseViewProps {
  pageData?: any;
}

export const GuestHouseView: React.FC<GuestHouseViewProps> = ({ pageData }) => {
  const { language, getBilingual } = useLanguage();
  const { isSpeaking, speakContent, stopSpeech } = useAccessibility();
  const [activeCampusTab, setActiveCampusTab] = useState<'rahuri' | 'kolhapur' | 'pune' | 'dhule'>('rahuri');

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  // 1. Central Campus, MPKV Rahuri Data from PDF Page 1
  const rahuriData = [
    {
      sr: 1,
      name: { en: 'VIP Guest House', mr: 'व्हीआयपी अतिथीगृह' },
      incharge: { en: 'Shri. Jawane Anil Pandurang', mr: 'श्री. जवने अनिल पांडुरंग' },
      contact: 'Phone: 02426-243358, Mob: 8796373831, 7972231964',
      email: 'vipghmpkv@gmail.com',
      rates: [
        { type: 'Suite Type 1', acOfficial: 'Rs. 700/- per Day', acUnofficial: 'Rs. 1200/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' },
        { type: 'Suite Type 2', acOfficial: 'Rs. 500/- per Day', acUnofficial: 'Rs. 1000/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' }
      ]
    },
    {
      sr: 2,
      name: { en: 'VIP Annexure', mr: 'व्हीआयपी अनेक्स' },
      incharge: { en: 'Shri. Jawane Anil Pandurang', mr: 'श्री. जवने अनिल पांडुरंग' },
      contact: 'Phone: 02426-243358, Mob: 8796373831',
      email: 'vipghmpkv@gmail.com',
      rates: [
        { type: 'Annexure Room', acOfficial: 'Rs. 400/- per Day', acUnofficial: 'Rs. 800/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' }
      ]
    },
    {
      sr: 3,
      name: { en: 'Scientist Hostel', mr: 'शास्त्रज्ञ निवास (सायंटिस्ट हॉस्टेल)' },
      incharge: { en: 'Shri. Jawane Anil Pandurang', mr: 'श्री. जवने अनिल पांडुरंग' },
      contact: 'Phone: 02426-243358',
      email: 'vipghmpkv@gmail.com',
      rates: [
        { type: 'Scientist Room', acOfficial: 'Rs. 400/- per Day', acUnofficial: 'Rs. 800/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' }
      ]
    },
    {
      sr: 4,
      name: { en: 'Pravara VIP Guest House', mr: 'प्रवरा व्हीआयपी अतिथीगृह' },
      incharge: { en: 'Shri. Jalindar Devram Dhanawade', mr: 'श्री. जालिंदर देवराम धनावडे' },
      contact: 'Mob: 9921754016, Intercom: 365',
      email: 'vipghmpkv@gmail.com',
      rates: [
        { type: 'Deluxe AC Suite', acOfficial: 'Rs. 500/- per Day', acUnofficial: 'Rs. 800/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' },
        { type: 'Executive AC Room', acOfficial: 'Rs. 400/- per Day', acUnofficial: 'Rs. 600/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' },
        { type: 'Standard AC Room', acOfficial: 'Rs. 200/- per Day', acUnofficial: 'Rs. 500/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' },
        { type: 'Single AC Room', acOfficial: 'Rs. 200/- per Day', acUnofficial: 'Rs. 300/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' }
      ]
    },
    {
      sr: 5,
      name: { en: 'Mula Godavari Guest House', mr: 'मुळा गोदावरी अतिथीगृह' },
      incharge: { en: 'Shri. Jalindar Devram Dhanawade', mr: 'श्री. जालिंदर देवराम धनावडे' },
      contact: 'Mob: 9921754016, Intercom: 396, Phone: 02426-243354',
      email: 'vipghmpkv@gmail.com',
      rates: [
        { type: 'Non-AC Room Type A', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 200/- per Day', nonAcUnofficial: 'Rs. 400/- per Day' },
        { type: 'Non-AC Room Type B', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 100/- per Day', nonAcUnofficial: 'Rs. 200/- per Day' },
        { type: 'Non-AC Room Type C', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 50/- per Day', nonAcUnofficial: 'Rs. 100/- per Day' }
      ]
    },
    {
      sr: 6,
      name: { en: 'Shetkari Niwas (Farmers Hostel)', mr: 'शेतकरी निवास' },
      incharge: { en: 'Shri. Jalindar Devram Dhanawade', mr: 'श्री. जालिंदर देवराम धनावडे' },
      contact: 'Mob: 9921754016, Intercom: 398',
      email: 'vipghmpkv@gmail.com',
      rates: [
        { type: 'Female Trainee / Farmer Room', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 100/- per head/Day', nonAcUnofficial: 'Rs. 200/- per head/Day' },
        { type: 'Female Subsidized Bed', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 50/- per head/Day', nonAcUnofficial: 'Rs. 50/- per head/Day' },
        { type: 'Male Trainee / Farmer Room', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 100/- per head/Day', nonAcUnofficial: 'Rs. 200/- per head/Day' },
        { type: 'Male Subsidized Bed', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 50/- per head/Day', nonAcUnofficial: 'Rs. 50/- per head/Day' }
      ]
    }
  ];

  // 2. Kolhapur Campus Data from PDF Page 2
  const kolhapurData = [
    {
      sr: 1,
      name: { en: 'Rajashree Chatrapati Shahu Maharaj Agriculture College Guest House', mr: 'रा.छ.शा.म. कृषि महाविद्यालय अतिथीगृह, कोल्हापूर' },
      incharge: { en: 'Shri. Kadam Sameer Govind', mr: 'श्री. कदम समीर गोविंद' },
      contact: 'Phone: 0231-2606054, Mob: 9890878967',
      email: 'arack2006@gmail.com / sameerkadam2011@gmail.com',
      rates: [
        { type: 'AC Suite / Room', acOfficial: 'Rs. 75/- per Day', acUnofficial: 'Rs. 200/- per Day', nonAcOfficial: 'Rs. 50/- Per Day', nonAcUnofficial: 'Rs. 100/- per Day' }
      ]
    }
  ];

  // 3. Pune Campus Data from PDF Page 2
  const puneData = [
    {
      sr: 1,
      name: { en: 'VIP Guest House, Pune Campus', mr: 'व्हीआयपी अतिथीगृह, पुणे कॅम्पस' },
      incharge: { en: 'Shri. Rajkumar Pawar', mr: 'श्री. राजकुमार पवार' },
      contact: 'Phone: 020-25519686, 020-25537033, Ext: 244, Estate: 334',
      email: 'adacpune@gmail.com',
      rates: [
        { type: 'Basement + First Floor (F.F.)', acOfficial: 'Rs. 125/- Per Day', acUnofficial: 'Rs. 350/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' },
        { type: 'Ground Floor', acOfficial: 'Rs. 75/- Per Day', acUnofficial: 'Rs. 200/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' }
      ]
    },
    {
      sr: 2,
      name: { en: 'International Hostel, Pune', mr: 'आंतरराष्ट्रीय हॉस्टेल, पुणे' },
      incharge: { en: 'Shri. Rajkumar Pawar', mr: 'श्री. राजकुमार पवार' },
      contact: 'Phone: 020-25519686, 020-25537033',
      email: 'adacpune@gmail.com',
      rates: [
        { type: 'International Suite', acOfficial: 'Rs. 125/- Per Day', acUnofficial: 'Rs. 400/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' }
      ]
    },
    {
      sr: 3,
      name: { en: 'A Block Guest Rooms, Pune', mr: 'ए ब्लॉक निवास कक्ष, पुणे' },
      incharge: { en: 'Shri. Sunil Prakash Bhosale', mr: 'श्री. सुनील प्रकाश भोसले' },
      contact: 'Phone: 020-25537033, Ext: 244',
      email: 'adacpune@gmail.com',
      rates: [
        { type: 'Standard Non-AC Room', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 50/- Per Day', nonAcUnofficial: 'Rs. 200/- Per Day' }
      ]
    }
  ];

  // 4. Dhule Campus Data from PDF Page 2
  const dhuleData = [
    {
      sr: 1,
      name: { en: 'VIP Guest House, Dhule Campus', mr: 'व्हीआयपी अतिथीगृह, धुळे कॅम्पस' },
      incharge: { en: 'Associate Dean, A.C. Dhule', mr: 'सहयोगी अधिष्ठाता, कृषि महाविद्यालय, धुळे' },
      contact: 'Phone: 02562-230367, 230368, Mob: 7588168069',
      email: 'dhulead@gmail.com',
      rates: [
        { type: 'AC Deluxe Room', acOfficial: 'Rs. 150/- per Day', acUnofficial: 'Rs. 300/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' },
        { type: 'AC Standard Room', acOfficial: 'Rs. 100/- per Day', acUnofficial: 'Rs. 200/- per Day', nonAcOfficial: '--', nonAcUnofficial: '--' }
      ]
    },
    {
      sr: 2,
      name: { en: 'General Guest House, Dhule', mr: 'सर्वसाधारण अतिथीगृह, धुळे' },
      incharge: { en: 'Associate Dean / Dr. V. N. Barai', mr: 'सहयोगी अधिष्ठाता / डॉ. व्ही. एन. बारई' },
      contact: 'Phone: 02562-230367, Mob: 9423440102',
      email: 'dhulead@gmail.com',
      rates: [
        { type: 'Non-AC Guest Room', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 50/- per Day', nonAcUnofficial: 'Rs. 100/- per Day' }
      ]
    },
    {
      sr: 3,
      name: { en: 'Dormitory, Dhule Campus', mr: 'डॉर्मिटरी, धुळे कॅम्पस' },
      incharge: { en: 'Associate Dean Office, Dhule', mr: 'सहयोगी अधिष्ठाता कार्यालय, धुळे' },
      contact: 'Phone: 02562-230367',
      email: 'dhulead@gmail.com',
      rates: [
        { type: 'Dormitory Bed', acOfficial: '--', acUnofficial: '--', nonAcOfficial: 'Rs. 20/- per Day', nonAcUnofficial: 'Rs. 40/- per Day' }
      ]
    }
  ];

  const getActiveCampusData = () => {
    switch (activeCampusTab) {
      case 'rahuri': return rahuriData;
      case 'kolhapur': return kolhapurData;
      case 'pune': return puneData;
      case 'dhule': return dhuleData;
      default: return rahuriData;
    }
  };

  return (
    <div className="w-full bg-[#f6f9f8] min-h-screen text-slate-800">
      
      {/* 1. Breadcrumbs */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-teal-700 flex items-center gap-1 font-medium text-slate-600 transition-colors">
            <Home className="w-3.5 h-3.5 text-teal-700" />
            <span>{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold text-teal-900">
            {language === 'mr' ? 'अतिथीगृह व निवास दालन' : 'Guest House Services'}
          </span>
        </nav>
      </div>

      {/* 2. Hero Section: Warm Hospitality Teal & Marine */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] py-6 sm:py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c312a] via-[#124239] to-[#08231d] text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-teal-700/50">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Home className="w-4 h-4 text-teal-300" />
                <span>{language === 'mr' ? 'अधिकृत अतिथीगृह दर व संपर्क निर्देशिका' : 'Official Guest House Rates & Contacts'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-amber-300 font-semibold">{language === 'mr' ? 'राहुरी, कोल्हापूर, पुणे व धुळे' : 'Rahuri, Kolhapur, Pune & Dhule'}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight">
                {language === 'mr'
                  ? 'अतिथीगृह निवास दर व अधिकृत संपर्क दालन'
                  : 'Official Guest House Tariff & In-Charge Contact Directory'}
              </h1>

              <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed font-normal max-w-2xl">
                {language === 'mr'
                  ? 'महात्मा फुले कृषि विद्यापीठाच्या राहुरी मुख्य परिसर, कोल्हापूर, पुणे व धुळे येथील अतिथीगृहे, व्हीआयपी सुईट्स व शेतकरी निवास व्यवस्थेचे अधिकृत दर व संपर्क अधिकारी.'
                  : 'Official approved tariff structure, in-charge officers, direct phone numbers, and official emails for transit accommodation across all 4 MPKV campuses.'}
              </p>

              {/* Action Buttons to View & Download PDF */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#official-pdf-section"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{language === 'mr' ? 'अधिकृत पीडीएफ दस्तऐवज पहा' : 'View Official PDF Document'}</span>
                </a>

                <a
                  href="/media/docs/mpkv_guesthouse_rates_and_contacts.pdf"
                  download="mpkv_guesthouse_rates_and_contacts.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm transition-all border border-white/20 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>{language === 'mr' ? 'डाउनलोड करा (PDF)' : 'Download PDF (107 KB)'}</span>
                </a>
              </div>

            </div>

            {/* Audio & Print */}
            <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => (isSpeaking ? stopSpeech() : speakContent())}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                    : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-600" />
                    <span>{language === 'mr' ? 'थांबवा' : 'Stop Audio'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-teal-300" />
                    <span>{language === 'mr' ? 'मजकूर ऐका' : 'Listen'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/15 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>{language === 'mr' ? 'प्रिंट करा' : 'Print Page'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* 3. CENTERPIECE: OFFICIAL PDF DOCUMENT EMBEDDED VIEWER */}
      <div id="official-pdf-section" className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-12">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-950 border border-emerald-300">
                    {language === 'mr' ? 'अधिकृत परिपत्रक' : 'Official Circular'}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">2 Pages · Verified Document</span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  {language === 'mr'
                    ? 'महात्मा फुले कृषि विद्यापीठ: अतिथीगृह दर व संपर्क निर्देशिका (मूळ प्रत)'
                    : 'MPKV Guest House Rates, In-Charge Contacts & Accommodation Guidelines'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="/media/docs/mpkv_guesthouse_rates_and_contacts.pdf"
                download="mpkv_guesthouse_rates_and_contacts.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'डाउनलोड करा' : 'Download PDF'}</span>
              </a>

              <a
                href="/media/docs/mpkv_guesthouse_rates_and_contacts.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold transition-colors border border-stone-200"
              >
                <ExternalLink className="w-3.5 h-3.5 text-teal-700" />
                <span>{language === 'mr' ? 'नवीन टॅबमध्ये उघडा' : 'Open in New Tab'}</span>
              </a>
            </div>
          </div>

          {/* Embedded Full PDF Viewer Iframe */}
          <div className="w-full h-[650px] sm:h-[750px] rounded-2xl overflow-hidden border border-stone-200 bg-stone-100 shadow-inner relative">
            <iframe
              src="/media/docs/mpkv_guesthouse_rates_and_contacts.pdf#toolbar=1"
              className="w-full h-full border-0"
              title="Official MPKV Guest House Rates and Contacts Document"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <span>
              {language === 'mr'
                ? 'दस्तऐवज दिसत नसल्यास वरील "डाउनलोड करा" अथवा "नवीन टॅबमध्ये उघडा" पर्यायाचा वापर करा.'
                : 'If the embedded viewer does not render on your device, please use "Download PDF" or "Open in New Tab".'}
            </span>
            <span className="font-semibold text-teal-800">
              /media/docs/mpkv_guesthouse_rates_and_contacts.pdf
            </span>
          </div>

        </div>
      </div>

      {/* 4. Interactive Verified Tables by Campus (Matching the PDF) */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] pb-16">
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-800 uppercase tracking-wider">
                <DollarSign className="w-4 h-4" />
                <span>{language === 'mr' ? 'तपशीलवार अधिकृत दर तक्ता' : 'Detailed Tariff & Contact Matrix'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                {language === 'mr' ? 'कॅम्पसनुसार अतिथीगृह तपशील व दैनिक दर' : 'Campus-Wise Rate Cards & In-Charge Directory'}
              </h3>
            </div>

            {/* Campus Selector Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-bold">
              {[
                { id: 'rahuri' as const, label: { en: '1. Central Campus, Rahuri (6)', mr: '१. मुख्य परिसर, राहुरी (६)' } },
                { id: 'kolhapur' as const, label: { en: '2. Kolhapur Campus (1)', mr: '२. कोल्हापूर कॅम्पस (१)' } },
                { id: 'pune' as const, label: { en: '3. Pune Campus (3)', mr: '३. पुणे कॅम्पस (३)' } },
                { id: 'dhule' as const, label: { en: '4. Dhule Campus (3)', mr: '४. धुळे कॅम्पस (३)' } }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCampusTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    activeCampusTab === tab.id
                      ? 'bg-teal-900 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white'
                  }`}
                >
                  {getBilingual(tab.label)}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-stone-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-100 text-slate-800 font-bold uppercase tracking-wider text-[11px] border-b border-stone-200">
                  <th className="px-3 py-3 w-12 text-center">Sr.</th>
                  <th className="px-4 py-3">{language === 'mr' ? 'अतिथीगृहाचे नाव' : 'Name of Guest House'}</th>
                  <th className="px-4 py-3">{language === 'mr' ? 'प्रभारी अधिकारी' : 'Name of Incharge'}</th>
                  <th className="px-4 py-3">{language === 'mr' ? 'संपर्क क्रमांक' : 'Contact No'}</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-3 py-3 text-center bg-teal-50 border-l border-r border-teal-200" colSpan={2}>
                    A.C. Rate
                  </th>
                  <th className="px-3 py-3 text-center bg-amber-50" colSpan={2}>
                    Non A.C. Rate
                  </th>
                </tr>
                <tr className="bg-stone-50 text-[10.5px] font-bold text-slate-600 border-b border-stone-200">
                  <th colSpan={5} />
                  <th className="px-3 py-1.5 text-center bg-teal-50 border-l border-teal-200">Official</th>
                  <th className="px-3 py-1.5 text-center bg-teal-50 border-r border-teal-200">Unofficial</th>
                  <th className="px-3 py-1.5 text-center bg-amber-50">Official</th>
                  <th className="px-3 py-1.5 text-center bg-amber-50">Unofficial</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {getActiveCampusData().map((item) => (
                  <React.Fragment key={item.sr}>
                    {item.rates.map((rate, rIdx) => (
                      <tr key={rIdx} className="hover:bg-teal-50/30 transition-colors">
                        {rIdx === 0 && (
                          <>
                            <td className="px-3 py-3 text-center font-bold text-slate-500 align-top" rowSpan={item.rates.length}>
                              {item.sr}
                            </td>
                            <td className="px-4 py-3 font-bold text-slate-900 align-top" rowSpan={item.rates.length}>
                              {getBilingual(item.name)}
                            </td>
                            <td className="px-4 py-3 font-semibold text-slate-700 align-top" rowSpan={item.rates.length}>
                              {getBilingual(item.incharge)}
                            </td>
                            <td className="px-4 py-3 text-slate-700 align-top" rowSpan={item.rates.length}>
                              <div className="font-medium">{item.contact}</div>
                            </td>
                            <td className="px-4 py-3 font-mono text-[11px] text-teal-800 align-top" rowSpan={item.rates.length}>
                              <a href={`mailto:${item.email.split(' ')[0]}`} className="hover:underline">
                                {item.email}
                              </a>
                            </td>
                          </>
                        )}
                        <td className="px-3 py-2.5 text-center font-bold text-teal-900 bg-teal-50/40 border-l border-teal-200/80">
                          {rate.acOfficial}
                        </td>
                        <td className="px-3 py-2.5 text-center font-medium text-slate-700 bg-teal-50/40 border-r border-teal-200/80">
                          {rate.acUnofficial}
                        </td>
                        <td className="px-3 py-2.5 text-center font-bold text-amber-900 bg-amber-50/40">
                          {rate.nonAcOfficial}
                        </td>
                        <td className="px-3 py-2.5 text-center font-medium text-slate-700 bg-amber-50/40">
                          {rate.nonAcUnofficial}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Requisition Guideline Note */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
              <strong>{language === 'mr' ? 'आरक्षण व दर सूचना: ' : 'Booking & Rate Guidelines: '}</strong>
              {language === 'mr'
                ? 'अधिकृत दर (Official Rate) केवळ शासकीय व विद्यापीठ कामासाठी येणाऱ्या मान्यवरांसाठी लागू आहे. अनधिकृत दर (Unofficial Rate) खाजगी/इतर पाहुण्यांसाठी लागू राहील. आरक्षण निश्चितीसाठी संबंधित इन-चार्ज अधिकाऱ्यांशी आगाऊ संपर्क साधावा.'
                : 'Official rates apply exclusively to dignitaries and officers traveling on sanctioned university/government duty. Unofficial rates apply to other guests. Advance booking must be confirmed with the respective in-charge officer.'}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
