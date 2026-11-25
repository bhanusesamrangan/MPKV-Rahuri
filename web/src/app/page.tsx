'use client';

import React from 'react';
import homeDataRaw from '@/data/scraped/home_data.json';
import { HeroCarousel } from '@/views/HomePage/components/HeroCarousel';
import { LeadershipShowcase } from '@/views/HomePage/components/LeadershipShowcase';
import { AnnouncementsTabs } from '@/views/HomePage/components/AnnouncementsTabs';
import { FarmerServicesRibbon } from '@/views/HomePage/components/FarmerServicesRibbon';
import { AchievementsNirfSection } from '@/views/HomePage/components/AchievementsNirfSection';
import { UniversityBentoGrid } from '@/views/HomePage/components/UniversityBentoGrid';
import { StatsCounterGrid } from '@/views/HomePage/components/StatsCounterGrid';
import { StakeholderQuickDesk } from '@/views/HomePage/components/StakeholderQuickDesk';
import { AboutMahatmaPhuleSection } from '@/views/HomePage/components/AboutMahatmaPhuleSection';
import { InstitutionalDirectories } from '@/views/HomePage/components/InstitutionalDirectories';
import { CampusGallerySection } from '@/views/HomePage/components/CampusGallerySection';
import { AgriAppsShowcase } from '@/views/HomePage/components/AgriAppsShowcase';

export default function HomePage() {
  const homeData = homeDataRaw as any;

  return (
    <div className="w-full flex flex-col">
      {/* 1. Immersive Scenic Hero Carousel */}
      <HeroCarousel slides={homeData.hero_slides || []} />

      {/* 2. Top Leadership & Dignitary Profiles */}
      <LeadershipShowcase authorities={homeData.authorities || []} />

      {/* 3. Real-Time 3-Column Announcements, Jobs & Tenders Desk + Upcoming Events */}
      <AnnouncementsTabs
        news={homeData.news_ticker || []}
        recruitment={homeData.recruitment || []}
        tenders={homeData.tenders || []}
      />

      {/* 4. Farmer First ("शेतकरी प्रथम") Direct Gateway & Cropping Calendar */}
      <FarmerServicesRibbon calendarMonths={homeData.calendar_months || []} />

      {/* 5. National Standing: ICAR Accreditation, PPVFRA National Record & Comprehensive Recognitions */}
      <AchievementsNirfSection />

      {/* 6. Core Research, Academic & Extension Pillars Bento Grid */}
      <UniversityBentoGrid />

      {/* 7. Institutional Scale & 57 Years Heritage Metrics */}
      <StatsCounterGrid stats={homeData.statistics || []} />

      {/* 8. Stakeholder Fast-Track Desk (Students, Governance & Employee Portals) */}
      <StakeholderQuickDesk />

      {/* 9. Historical Vision & Mahatma Phule Bronze Statue Narrative */}
      <AboutMahatmaPhuleSection aboutData={homeData.about_summary || {}} />

      {/* 10. Institutional Governance & Services 8-Box Directory */}
      <InstitutionalDirectories />

      {/* 11. Campus Life & Event Media Gallery */}
      <CampusGallerySection />

      {/* 12. Advance Agriculture: 6 Smart Web & Mobile Decision Support Apps */}
      <AgriAppsShowcase />
    </div>
  );
}
