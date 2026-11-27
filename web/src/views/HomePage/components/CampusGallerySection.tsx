'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import {
  Image as ImageIcon,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Radio,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Music,
  Camera,
  Layers,
  Sparkles,
  Eye,
  Film
} from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'campus' | 'research' | 'events' | 'video';
  title: {
    en: string;
    mr: string;
  };
  subtitle: {
    en: string;
    mr: string;
  };
  tag: {
    en: string;
    mr: string;
  };
  image: string;
  isVideo?: boolean;
  videoUrl?: string;
  channelUrl?: string;
  embedId?: string;
}

export const CampusGallerySection: React.FC = () => {
  const { language, getBilingual } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'campus' | 'research' | 'events' | 'video'>('all');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Audio player state
  const [activeAudioKey, setActiveAudioKey] = useState<'rajyageet' | 'mpkv' | 'icar' | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 10 Curated Authentic Photos & Videos
  const galleryItems: GalleryItem[] = [
    {
      id: 'gal_admin',
      category: 'campus',
      title: {
        en: 'Central Administrative Headquarters & VC Secretariat',
        mr: 'मध्यवर्ती प्रशासकीय इमारत व कुलगुरू सचिवालय, राहुरी'
      },
      subtitle: {
        en: 'Iconic architectural landmark serving as the administrative epicenter of agricultural higher education across Western Maharashtra.',
        mr: 'पश्चिम महाराष्ट्रातील कृषी उच्च शिक्षण व संशोधनाचे मध्यवर्ती प्रशासकीय केंद्र व ऐतिहासिक वास्तू.'
      },
      tag: { en: 'Campus Architecture', mr: 'मुख्यालय वास्तू' },
      image: '/media/images/Administration_Building_only_20200102043951.jpg'
    },
    {
      id: 'gal_statue',
      category: 'campus',
      title: {
        en: 'Mahatma Jyotirao Phule Bronze Statue Memorial & Garden',
        mr: 'क्रांतीसूर्य महात्मा जोतीराव फुले कांस्य पुतळा व प्रेरणा स्मृती उद्यान'
      },
      subtitle: {
        en: 'The eternal source of inspiration honoring Mahatma Jyotirao Phule, the pioneering champion of Indian farmer empowerment.',
        mr: 'भारतीय शेतकरी उद्धार व कृषी शिक्षणाचे आद्य प्रणेते महात्मा जोतीराव फुले यांचे प्रेरणादायी कांस्य स्मारक.'
      },
      tag: { en: 'Heritage Memorial', mr: 'ऐतिहासिक स्मारक' },
      image: '/media/images/Putal_Full_Wide_00002_copy_20200107050312_AAA_20200109034804.jpg'
    },
    {
      id: 'gal_cow_centre',
      category: 'research',
      title: {
        en: 'Indigenous Cow Research & Training Centre (Gir, Sahiwal, Dangi)',
        mr: 'अजितदादा पवार देशी गोवंश संशोधन, प्रशिक्षण व भ्रूण प्रत्यारोपण केंद्र'
      },
      subtitle: {
        en: 'India’s pioneer facility for indigenous cow conservation, advanced IVF embryo transfer, and dairy farmer training.',
        mr: 'गीर, साहिवाल, डांगी आदी देशी गोवंश संवर्धन, आधुनिक आयव्हीएफ भ्रूण प्रत्यारोपण व शेतकरी प्रशिक्षण केंद्र.'
      },
      tag: { en: 'Livestock Research', mr: 'देशी गोवंश संशोधन' },
      image: '/media/images/WhatsApp_Image_2026-06-10_at_9.45.55_PM_20260612125904_20260619122343.jpeg'
    },
    {
      id: 'gal_engineering',
      category: 'campus',
      title: {
        en: 'Dr. Annasaheb Shinde College of Agricultural Engineering & Technology',
        mr: 'डॉ. अण्णासाहेब शिंदे कृषि अभियांत्रिकी व तंत्रज्ञान महाविद्यालय संकुल'
      },
      subtitle: {
        en: 'Premier national institute for farm mechanization, precision drone robotics, and renewable energy research.',
        mr: 'कृषी यांत्रिकीकरण, ड्रोन तंत्रज्ञान आणि सिंचन व्यवस्थापनातील देशातील अग्रगण्य तंत्रज्ञान महाविद्यालय.'
      },
      tag: { en: 'Agri Engineering', mr: 'अभियांत्रिकी संकुल' },
      image: '/media/images/A_02_NCC_Engineering_20260130024914_20260612123909.jpg'
    },
    {
      id: 'gal_convocation',
      category: 'events',
      title: {
        en: '39th Annual Convocation Ceremony at Central Convocation Pandal',
        mr: '३९ वा वार्षिक पदवी प्रदान दीक्षांत सोहळा - मध्यवर्ती मंडप'
      },
      subtitle: {
        en: 'Prestigious graduation ceremony conferring degrees, gold medals, and honoris causa doctorates to agricultural scientists.',
        mr: 'मान्यवर अतिथींच्या उपस्थितीत कृषी पदवी, सुवर्णपदक व मानद डॉक्टरेट पदवी प्रदान सोहळा.'
      },
      tag: { en: 'Convocation', mr: 'दीक्षांत सोहळा' },
      image: '/media/images/IMGM0607_20260612125954_20260619122404.jpg'
    },
    {
      id: 'gal_exhibition',
      category: 'events',
      title: {
        en: 'State-Level Krishi Mahotsav & Live Crop Demonstration Grounds',
        mr: 'राज्यस्तरीय कृषी महोत्सव व पीक प्रात्यक्षिके प्रदर्शन प्रक्षेत्र'
      },
      subtitle: {
        en: 'Over 3 lakh farmers convene annually to explore breakthrough seed varieties, micro-irrigation, and horticulture stalls.',
        mr: 'लाखो शेतकऱ्यांच्या उपस्थितीत सुधारित वाण, जैविक खते व अवजारांचे थेट शेत प्रात्यक्षिक.'
      },
      tag: { en: 'Agri Expo & Melas', mr: 'कृषी महोत्सव' },
      image: '/media/images/WhatsApp_Image_2026-06-10_at_2.33.11_PM_20260612125447__1__20260619122209.jpeg'
    },
    {
      id: 'gal_atic',
      category: 'campus',
      title: {
        en: 'Agricultural Technology Information Centre (ATIC) Complex',
        mr: 'कृषि तंत्रज्ञान माहिती केंद्र (ATIC) शेतकरी सुविधा संकुल'
      },
      subtitle: {
        en: 'Single-window delivery system providing university certified seeds, saplings, bio-fertilizers, and technical advisory.',
        mr: 'विद्यापीठ निर्मित बियाणे, कलमे, रोपे, जैविक खते व तांत्रिक मार्गदर्शनाची शेतकऱ्यांसाठी एकल खिडकी सुविधा.'
      },
      tag: { en: 'Farmer Hub', mr: 'शेतकरी केंद्र' },
      image: '/media/images/Aticc_20200109041808.jpg'
    },
    {
      id: 'gal_hostel',
      category: 'campus',
      title: {
        en: 'International Student Hostel & Research Scholars Residence',
        mr: 'आंतरराष्ट्रीय विद्यार्थी वसतिगृह व युवा संशोधक संकुल'
      },
      subtitle: {
        en: 'Modern residential facilities hosting national and international postgraduate scholars and scientists.',
        mr: 'देश-विदेशातील पदव्युत्तर संशोधक, शास्त्रज्ञ व विद्यार्थ्यांसाठी अद्ययावत सुविधांनी सज्ज वसतिगृह.'
      },
      tag: { en: 'Campus Life', mr: 'विद्यार्थी वसतिगृह' },
      image: '/media/images/InterNational_Hostel_20200109041929.jpg'
    },
    {
      id: 'gal_auditorium',
      category: 'campus',
      title: {
        en: 'Late Nanasaheb Pawar Central Auditorium & Convention Centre',
        mr: 'कै. नानासाहेब पवार मध्यवर्ती प्रेक्षागृह व राष्ट्रीय परिसंवाद केंद्र'
      },
      subtitle: {
        en: 'A state-of-the-art 1,500-seat acoustic auditorium for national conferences, scientific symposiums, and cultural festivals.',
        mr: '१,५०० आसन क्षमतेचे भव्य वातानुकूलित प्रेक्षागृह, राष्ट्रीय कृषी परिषदा व युवा महोत्सवाचे केंद्र.'
      },
      tag: { en: 'Central Auditorium', mr: 'मध्यवर्ती प्रेक्षागृह' },
      image: '/media/images/Nanasaheb_AAA_20200109041947.jpg'
    },
    {
      id: 'gal_video_tour',
      category: 'video',
      title: {
        en: 'MPKV Rahuri Video Tour: Phule Krishi Mahotsav & Research Field Demonstrations',
        mr: 'मफुकृवि राहुरी अधिकृत माहितीपट : फुले कृषी महोत्सव, थेट पीक प्रात्यक्षिके व शिवार फेरी'
      },
      subtitle: {
        en: 'Watch the official video tour of MPKV Rahuri highlighting scientific breakthroughs, crop demonstrations, and farmer prosperity.',
        mr: 'मफुकृवि राहुरीच्या प्रगत संशोधन, थेट पीक प्रात्यक्षिके, शिवार फेरी व शेतकरी समृद्धीची संपूर्ण अधिकृत चित्रफीत.'
      },
      tag: { en: 'Official Video Tour', mr: 'व्हिडिओ माहितीपट' },
      image: '/media/images/WhatsApp_Image_2026-06-10_at_2.33.11_PM__2__20260612125340_20260619122121.jpeg',
      isVideo: true,
      videoUrl: 'https://www.youtube.com/watch?v=FWFkXxA8mp0',
      channelUrl: 'https://www.youtube.com/@mpkvrahuri1161',
      embedId: 'FWFkXxA8mp0'
    }
  ];

  // Filter items
  const filteredItems = galleryItems.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'video') return item.isVideo;
    return item.category === activeFilter;
  });

  // Make sure activeIndex stays within bounds of filtered items
  const safeActiveIndex = activeIndex >= filteredItems.length ? 0 : activeIndex;
  const currentItem = filteredItems[safeActiveIndex] || galleryItems[0];

  // Autoplay handler
  useEffect(() => {
    if (!isAutoplay || isHovered || isLightboxOpen) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredItems.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isAutoplay, isHovered, isLightboxOpen, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowRight') {
        setActiveIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, filteredItems.length]);

  // Navigation handlers
  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
  };

  // Audio stream & file control
  const audioTracks = {
    rajyageet: {
      id: 'rajyageet',
      titleMr: 'महाराष्ट्र राज्यगीत',
      titleEn: 'Maharashtra Rajya Geet',
      subMr: 'गर्जा महाराष्ट्र माझा',
      src: '/media/audio/RajyaGeet.mp3'
    },
    mpkv: {
      id: 'mpkv',
      titleMr: 'मफुकृवि विद्यापीठ गीत',
      titleEn: 'MPKV University Anthem',
      subMr: 'कृषी संस्कृतीचे मंदिर',
      src: '/media/audio/MPKV_Song.mp3'
    },
    icar: {
      id: 'icar',
      titleMr: 'भारतीय कृषी अनुसंधान गीत',
      titleEn: 'ICAR National Theme Song',
      subMr: 'भारतीय कृषी गीत',
      src: '/media/audio/IcarThemeSong.mp3'
    }
  };

  const handlePlayAudio = (trackKey: 'rajyageet' | 'mpkv' | 'icar') => {
    if (activeAudioKey === trackKey && isPlayingAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlayingAudio(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const newAudio = new Audio(audioTracks[trackKey].src);
      audioRef.current = newAudio;
      setActiveAudioKey(trackKey);
      setIsPlayingAudio(true);

      newAudio.play().catch(() => {
        setIsPlayingAudio(false);
      });

      newAudio.onended = () => {
        setIsPlayingAudio(false);
      };
    }
  };

  return (
    <section className="w-full py-10 sm:py-14 bg-[#edf3ed] border-t border-stone-300 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-[50px] space-y-6 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-300">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-emerald-100 to-amber-100 border border-amber-300/90 text-amber-950 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <Camera className="w-3.5 h-3.5 text-amber-700" />
              <span>{language === 'mr' ? 'दृकश्राव्य दालन' : 'Visual & Media Gallery'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-emerald-900 font-bold">{language === 'mr' ? 'संवादी गॅलरी संग्रह' : 'Interactive Multi-Image Gallery'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-bold text-slate-900 tracking-tight">
              {language === 'mr' ? 'विद्यापीठ परिसर, संशोधन प्रक्षेत्र व ऐतिहासिक सोहळे' : 'Campus Life, Agronomic Research & Historic Events'}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-[14.5px] mt-1 max-w-3xl">
              {language === 'mr'
                ? 'राहुरी परिसरातील ऐतिहासिक वास्तू, आधुनिक संशोधन केंद्रे, पदवी सोहळे आणि कृषी महोत्सवाचा संवादी डिजिटल संग्रह.'
                : 'Interactive digital archive showcasing iconic university infrastructure, research farms, convocations, and state farmer exhibitions.'}
            </p>
          </div>

          {/* Quick CTAs */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs hover:shadow-md"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? 'सर्व फोटो गॅलरी' : 'Full Photo Archive'}</span>
            </Link>
            <a
              href="https://www.youtube.com/@mpkvrahuri1161"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all shadow-xs hover:shadow-md"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{language === 'mr' ? 'अधिकृत यूट्यूब वाहिनी' : 'Official YouTube'}</span>
              <ExternalLink className="w-3 h-3 text-rose-200" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FILTER PILLS & STATUS BAR                                                 */}
        {/* ========================================================================= */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-stone-300 text-xs shadow-2xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => { setActiveFilter('all'); setActiveIndex(0); }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              {language === 'mr' ? 'सर्व चित्रे (१०)' : 'All Highlights (10)'}
            </button>
            <button
              onClick={() => { setActiveFilter('campus'); setActiveIndex(0); }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeFilter === 'campus'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              {language === 'mr' ? 'परिसर व वास्तू' : 'Campus Architecture'}
            </button>
            <button
              onClick={() => { setActiveFilter('research'); setActiveIndex(0); }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeFilter === 'research'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              {language === 'mr' ? 'संशोधन व प्रक्षेत्र' : 'Research & Livestock'}
            </button>
            <button
              onClick={() => { setActiveFilter('events'); setActiveIndex(0); }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeFilter === 'events'
                  ? 'bg-purple-800 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              {language === 'mr' ? 'दीक्षांत व सोहळे' : 'Convocations & Melas'}
            </button>
            <button
              onClick={() => { setActiveFilter('video'); setActiveIndex(0); }}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'video'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'चित्रफीत माहितीपट' : 'Video Tour'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-slate-600 font-semibold px-2 text-[11.5px]">
            {/* Autoplay Switcher */}
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl border transition-all ${
                isAutoplay
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                  : 'bg-stone-100 border-stone-200 text-stone-600'
              }`}
              title="Toggle automatic slideshow rotation"
            >
              {isAutoplay ? (
                <>
                  <Pause className="w-3 h-3 text-emerald-700" />
                  <span>{language === 'mr' ? 'ऑटोप्ले चालू' : 'Autoplay ON'}</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-stone-600 fill-stone-600" />
                  <span>{language === 'mr' ? 'ऑटोप्ले थांबले' : 'Autoplay Paused'}</span>
                </>
              )}
            </button>

            <span className="text-slate-400 hidden sm:inline">|</span>

            {/* Quick Tip */}
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-500 text-[11px]">
              <Eye className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'mr' ? 'थंबनेलवर क्लिक करून पहा' : 'Click thumbnails to explore'}</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN INTERACTIVE GALLERY STAGE & EXPLORER RAIL                            */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* ======================================================================= */}
          {/* LEFT: GRAND CINEMATIC STAGE (8 Cols)                                    */}
          {/* ======================================================================= */}
          <div
            className="lg:col-span-8 flex flex-col rounded-3xl bg-slate-950 border border-stone-300 overflow-hidden shadow-md relative group select-none min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Main Stage Image with Zoom transition */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                key={currentItem.id}
                src={currentItem.image}
                alt={getBilingual(currentItem.title)}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-104 brightness-95"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              
              {/* Rich Cinematic Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/40 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-slate-950/40 pointer-events-none" />
            </div>

            {/* Top Toolbar: Tag, Slide Counter, Autoplay Progress Bar */}
            <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold shadow-sm">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{getBilingual(currentItem.tag)}</span>
                </span>
                
                {currentItem.isVideo && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-600/90 text-white text-[11px] font-bold shadow-sm">
                    <Film className="w-3 h-3" />
                    <span>{language === 'mr' ? 'व्हिडिओ माहितीपट' : 'Video Tour'}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Counter Badge */}
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 text-xs font-mono font-bold border border-white/15">
                  {safeActiveIndex + 1} / {filteredItems.length}
                </span>

                {/* Fullscreen Button */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="p-2 rounded-xl bg-black/60 hover:bg-emerald-600 backdrop-blur-md text-white transition-all border border-white/15 shadow-xs"
                  title="Fullscreen View"
                  aria-label="Open Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Middle: Video Play Button if video */}
            {currentItem.isVideo && (
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <a
                  href={currentItem.videoUrl || 'https://www.youtube.com/@mpkvrahuri1161'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-600/95 hover:bg-rose-500 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 group-hover:ring-8 group-hover:ring-rose-500/30"
                  aria-label="Play Video on YouTube"
                >
                  <Play className="w-8 h-8 fill-white ml-1.5" />
                </a>
              </div>
            )}

            {/* Left/Right Floating Navigation Chevrons */}
            <button
              onClick={handlePrev}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-2xl bg-black/50 hover:bg-emerald-600 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-2xl bg-black/50 hover:bg-emerald-600 text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bottom Caption & Interactive Info Bar */}
            <div className="mt-auto relative z-20 p-5 sm:p-6 lg:p-7 space-y-2.5">
              
              {/* Autoplay progress line */}
              {isAutoplay && !isHovered && (
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-amber-400 animate-[grow_5.5s_linear_infinite]" style={{ width: '100%' }} />
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div className="space-y-1 max-w-2xl">
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-tight drop-shadow-md">
                    {getBilingual(currentItem.title)}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed drop-shadow line-clamp-2">
                    {getBilingual(currentItem.subtitle)}
                  </p>
                </div>

                {/* Primary Action Button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {currentItem.isVideo ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={currentItem.videoUrl || 'https://www.youtube.com/watch?v=FWFkXxA8mp0'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{language === 'mr' ? 'चित्रफीत पहा' : 'Watch Video'}</span>
                      </a>
                      <a
                        href={currentItem.channelUrl || 'https://www.youtube.com/@mpkvrahuri1161'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all shadow-md backdrop-blur-sm"
                        title={language === 'mr' ? 'अधिकृत यूट्यूब चॅनेल' : 'Official YouTube Channel'}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>{language === 'mr' ? 'यूट्यूब वाहिनी' : 'Channel'}</span>
                      </a>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/15 hover:bg-emerald-600 text-white border border-white/25 backdrop-blur-md text-xs font-bold transition-all shadow-md"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>{language === 'mr' ? 'मोठे दृश्य पहा' : 'Expand Image'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================================= */}
          {/* RIGHT: INTERACTIVE THUMBNAIL EXPLORER RAIL (4 Cols)                     */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 flex flex-col rounded-3xl bg-white border border-stone-300 p-4 shadow-xs">
            
            {/* Rail Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-slate-900 text-xs sm:text-sm">
                  {language === 'mr' ? 'गॅलरी सूची व त्वरित निवड' : 'Media Highlights Explorer'}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-500 bg-stone-100 px-2 py-0.5 rounded-lg border border-stone-200">
                {filteredItems.length} {language === 'mr' ? 'चित्रे' : 'Items'}
              </span>
            </div>

            {/* Scrollable Mini-Cards List */}
            <div className="flex-1 space-y-2 overflow-y-auto max-h-[380px] sm:max-h-[420px] lg:max-h-[450px] pr-1.5 custom-scrollbar">
              {filteredItems.map((item, idx) => {
                const isSelected = idx === safeActiveIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(idx)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all group ${
                      isSelected
                        ? 'bg-emerald-50 border-2 border-emerald-600 shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden flex-shrink-0 bg-stone-200 border border-stone-300">
                      <img
                        src={item.image}
                        alt={getBilingual(item.title)}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          isSelected ? 'scale-108' : 'group-hover:scale-105'
                        }`}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      {item.isVideo && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 fill-white text-white" />
                        </div>
                      )}
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-pulse" />
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? 'text-emerald-800' : 'text-slate-500'
                        }`}>
                          {getBilingual(item.tag)}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded-md">
                            {language === 'mr' ? 'सक्रिय' : 'Viewing'}
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xs font-bold leading-snug truncate ${
                        isSelected ? 'text-emerald-950 font-extrabold' : 'text-slate-800 group-hover:text-slate-950'
                      }`}>
                        {getBilingual(item.title)}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {getBilingual(item.subtitle)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Rail Footer */}
            <div className="pt-3 mt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-slate-600 font-medium">
              <span>{language === 'mr' ? 'क्लिक करून त्वरित बदल करा' : 'Click any card to select'}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1 rounded-lg hover:bg-stone-200 text-slate-700"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1 rounded-lg hover:bg-stone-200 text-slate-700"
                  title="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* MULTIMEDIA AUDIO-VISUAL HUB (Live Anthem Player & 90.8 FM Stream)          */}
        {/* ========================================================================= */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-5 sm:p-6 shadow-md border border-slate-700 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left Title & Equalizer status */}
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-amber-500 text-slate-950 shadow-md flex-shrink-0">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {language === 'mr'
                    ? 'विद्यापीठ गीत, राज्यगीत व फुले कृषी वाहिनी ९०.८ FM'
                    : 'University Anthems & Phule Radio 90.8 FM'}
                </span>
                {isPlayingAudio && (
                  <span className="flex items-end gap-1 h-3.5 px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40">
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-2" />
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-3.5 delay-100" />
                    <span className="w-1 bg-amber-400 rounded-full animate-bounce h-2 delay-200" />
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">
                {language === 'mr'
                  ? 'मध्यवर्ती राहुरी स्टुडिओ थेट ऑडिओ प्रसारण व अधिकृत विद्यापीठ गीत संग्रह.'
                  : 'Official audio recordings from MPKV Rahuri Studio & live community radio.'}
              </div>
            </div>
          </div>

          {/* Interactive Audio Tracks & Live Radio Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Rajya Geet */}
            <button
              onClick={() => handlePlayAudio('rajyageet')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeAudioKey === 'rajyageet' && isPlayingAudio
                  ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-amber-200 border border-slate-600'
              }`}
            >
              {activeAudioKey === 'rajyageet' && isPlayingAudio ? (
                <Pause className="w-3.5 h-3.5 fill-slate-950" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>{language === 'mr' ? 'महाराष्ट्र राज्यगीत' : 'Rajya Geet'}</span>
            </button>

            {/* MPKV Song */}
            <button
              onClick={() => handlePlayAudio('mpkv')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeAudioKey === 'mpkv' && isPlayingAudio
                  ? 'bg-emerald-400 text-slate-950 ring-2 ring-emerald-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-emerald-200 border border-slate-600'
              }`}
            >
              {activeAudioKey === 'mpkv' && isPlayingAudio ? (
                <Pause className="w-3.5 h-3.5 fill-slate-950" />
              ) : (
                <Music className="w-3.5 h-3.5 text-emerald-400" />
              )}
              <span>{language === 'mr' ? 'मफुकृवि विद्यापीठ गीत' : 'MPKV Song'}</span>
            </button>

            {/* ICAR Song */}
            <button
              onClick={() => handlePlayAudio('icar')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                activeAudioKey === 'icar' && isPlayingAudio
                  ? 'bg-cyan-400 text-slate-950 ring-2 ring-cyan-300'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-200 border border-slate-600'
              }`}
            >
              {activeAudioKey === 'icar' && isPlayingAudio ? (
                <Pause className="w-3.5 h-3.5 fill-slate-950" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              )}
              <span>{language === 'mr' ? 'ICAR कृषी गीत' : 'ICAR Anthem'}</span>
            </button>

            {/* Live FM 90.8 Stream */}
            <a
              href="https://digitalradio.co.in:8020/stream"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md group"
            >
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <Radio className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'mr' ? '९०.८ FM थेट ऐका' : 'Live FM 90.8'}</span>
              <ExternalLink className="w-3 h-3 text-purple-200 group-hover:translate-x-0.5 transition-transform" />
            </a>

          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* CINEMATIC FULLSCREEN LIGHTBOX MODAL                                       */}
      {/* ========================================================================= */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 transition-all"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between text-white z-20 pb-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/20">
                {getBilingual(currentItem.tag)}
              </span>
              <span className="text-xs text-white/70 font-mono font-bold">
                {safeActiveIndex + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
              title="Close (Esc)"
              aria-label="Close Fullscreen Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Large Image Container with Navigation Arrows */}
          <div className="flex-1 flex items-center justify-center relative min-h-0 py-2">
            
            {/* Prev Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 shadow-2xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Image or Video Player */}
            {currentItem.isVideo ? (
              <div
                className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative flex items-center justify-center border border-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${currentItem.embedId || 'FWFkXxA8mp0'}?autoplay=1&rel=0`}
                  title={getBilingual(currentItem.title)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <img
                src={currentItem.image}
                alt={getBilingual(currentItem.title)}
                className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
              />
            )}

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 shadow-2xl"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Bottom Caption & Mini Lightbox Filmstrip */}
          <div
            className="text-center text-white py-3 border-t border-white/10 z-20 max-w-4xl mx-auto space-y-3 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white">
                {getBilingual(currentItem.title)}
              </h4>
              <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto mt-0.5">
                {getBilingual(currentItem.subtitle)}
              </p>
              {currentItem.isVideo && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <a
                    href={currentItem.videoUrl || 'https://www.youtube.com/watch?v=FWFkXxA8mp0'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{language === 'mr' ? 'यूट्यूबवर पहा' : 'Open in YouTube'}</span>
                  </a>
                  <a
                    href={currentItem.channelUrl || 'https://www.youtube.com/@mpkvrahuri1161'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all shadow-md backdrop-blur-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'अधिकृत यूट्यूब वाहिनी' : 'Official Channel'}</span>
                  </a>
                </div>
              )}
            </div>

            {/* Mini Lightbox Filmstrip */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
              {filteredItems.map((item, idx) => (
                <button
                  key={`lb_thumb_${item.id}`}
                  onClick={() => handleSelect(idx)}
                  className={`w-12 h-9 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    idx === safeActiveIndex ? 'border-amber-400 scale-110' : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={item.image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
