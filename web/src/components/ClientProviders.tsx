'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import { AccessibilityProvider } from '@/context/AccessibilityContext';
import { Topbar } from '@/components/Topbar';
import { Header } from '@/components/Header';
import { MegaMenu } from '@/components/MegaMenu';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AccessibilityProvider>
        <div className="min-h-screen flex flex-col bg-[#faf9f6]">
          {/* Top Accessibility & Language Bar with Audio Modal */}
          <Topbar />

          {/* Institutional Header with Bilingual MPKV Seal */}
          <Header />

          {/* 3-Level Mega Menu */}
          <MegaMenu />

          {/* Main Public Page Content */}
          <main className="flex-1 w-full">
            {children}
          </main>

          {/* Universal Footer */}
          <Footer />

          {/* Floating Scroll to Top Action Button */}
          <ScrollToTop />
        </div>
      </AccessibilityProvider>
    </LanguageProvider>
  );
}
