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
import { QuickLinksSection } from '@/views/HomePage/components/QuickLinksSection';

export default function HomePage() {
  const homeData = homeDataRaw as any;

  return (
    <div className="w-full flex flex-col">
      {/* 1. Top Highlights: Immersive Scenic Hero Carousel */}
      <div id="hero" className="w-full scroll-mt-24">
        <HeroCarousel slides={homeData.hero_slides || []} />
      </div>

      {/* 2. Leadership: Top Leadership & Dignitary Profiles */}
      <div id="leadership" className="w-full scroll-mt-24">
        <LeadershipShowcase authorities={homeData.authorities || []} />
      </div>

      {/* 3. News & Notices: Real-Time 3-Column Announcements, Jobs & Tenders Desk + Upcoming Events */}
      <div id="announcements" className="w-full scroll-mt-24">
        <AnnouncementsTabs
          news={homeData.news_ticker || []}
          recruitment={homeData.recruitment || []}
          tenders={homeData.tenders || []}
        />
      </div>

      {/* 4. Farmer First: Direct Gateway & Cropping Calendar */}
      <div id="farmer-first" className="w-full scroll-mt-24">
        <FarmerServicesRibbon calendarMonths={homeData.calendar_months || []} />
      </div>

      {/* 5. Awards & Standing: ICAR Accreditation, PPVFRA National Record & Recognitions */}
      <div id="recognitions" className="w-full scroll-mt-24">
        <AchievementsNirfSection />
      </div>

      {/* 6. Core Pillars: Research, Academic & Extension Bento Grid */}
      <div id="pillars" className="w-full scroll-mt-24">
        <UniversityBentoGrid />
      </div>

      {/* 7. MPKV in Numbers: Institutional Scale & 57 Years Heritage Metrics */}
      <div id="at-a-glance" className="w-full scroll-mt-24">
        <StatsCounterGrid stats={homeData.statistics || []} />
      </div>

      {/* 8. Stakeholder Desk: Students, Governance & Employee Portals */}
      <div id="portals" className="w-full scroll-mt-24">
        <StakeholderQuickDesk />
      </div>

      {/* 9. Heritage & Vision: Historical Vision & Mahatma Phule Bronze Statue Narrative */}
      <div id="heritage" className="w-full scroll-mt-24">
        <AboutMahatmaPhuleSection aboutData={homeData.about_summary || {}} />
      </div>

      {/* 10. Directories: Institutional Governance & Services 8-Box Directory */}
      <div id="directories" className="w-full scroll-mt-24">
        <InstitutionalDirectories />
      </div>

      {/* 11. Media Gallery: Campus Life & Event Media Gallery */}
      <div id="media-gallery" className="w-full scroll-mt-24">
        <CampusGallerySection />
      </div>

      {/* 12. Agri Apps: 6 Smart Web & Mobile Decision Support Apps */}
      <div id="agri-apps" className="w-full scroll-mt-24">
        <AgriAppsShowcase />
      </div>

      {/* 13. Quick Links: Official Partner & National Portals */}
      <div id="quick-links" className="w-full scroll-mt-24">
        <QuickLinksSection />
      </div>
    </div>
  );
}
