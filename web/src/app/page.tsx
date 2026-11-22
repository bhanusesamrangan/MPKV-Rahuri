'use client';

import React from 'react';
import homeDataRaw from '@/data/scraped/home_data.json';
import { HeroCarousel } from '@/views/HomePage/components/HeroCarousel';
import { LeadershipShowcase } from '@/views/HomePage/components/LeadershipShowcase';
import { FarmerServicesRibbon } from '@/views/HomePage/components/FarmerServicesRibbon';
import { UniversityBentoGrid } from '@/views/HomePage/components/UniversityBentoGrid';
import { AnnouncementsTabs } from '@/views/HomePage/components/AnnouncementsTabs';
import { StatsCounterGrid } from '@/views/HomePage/components/StatsCounterGrid';
import { AboutMahatmaPhuleSection } from '@/views/HomePage/components/AboutMahatmaPhuleSection';

export default function HomePage() {
  const homeData = homeDataRaw as any;

  return (
    <div className="w-full flex flex-col">
      {/* 1. Immersive Full-Width Hero Carousel */}
      <HeroCarousel slides={homeData.hero_slides || []} />

      {/* 2. Top Leadership & Dignitary Profiles (MahaPrisons Style) */}
      <LeadershipShowcase authorities={homeData.authorities || []} />

      {/* 3. Farmer First Quick Input & Seeds Ribbon */}
      <FarmerServicesRibbon calendarMonths={homeData.calendar_months || []} />

      {/* 4. University Key Pillars Bento Grid */}
      <UniversityBentoGrid />

      {/* 5. Filterable Announcements, Recruitment & Tenders Desk */}
      <AnnouncementsTabs
        news={homeData.news_ticker || []}
        recruitment={homeData.recruitment || []}
        tenders={homeData.tenders || []}
      />

      {/* 6. Institutional Scale & 57 Years Heritage Stats */}
      <StatsCounterGrid stats={homeData.statistics || []} />

      {/* 7. Historical Vision & Mahatma Phule Statue Narrative */}
      <AboutMahatmaPhuleSection aboutData={homeData.about_summary || {}} />
    </div>
  );
}
