'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from '@/components/LoadingScreen';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { FeaturedProjectSection } from '@/components/sections/FeaturedProjectSection';
import { VRProjectsSection } from '@/components/sections/VRProjectsSection';
import { OtherProjectsSection } from '@/components/sections/OtherProjectsSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { RecruiterSection } from '@/components/sections/RecruiterSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { ContactSection } from '@/components/sections/ContactSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onLoadComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && (
        <main className="flex flex-col">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <FeaturedProjectSection />
          <VRProjectsSection />
          <OtherProjectsSection />
          <JourneySection />
          <RecruiterSection />
          <DownloadSection />
          <ContactSection />
        </main>
      )}
    </>
  );
}
