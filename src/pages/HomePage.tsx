import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { BrandStatement } from '../components/home/BrandStatement';
import { ServicesSection } from '../components/home/ServicesSection';
import { WhyWowverse } from '../components/home/WhyWowverse';
import { PerspectiveDifference } from '../components/home/PerspectiveDifference';
import { FeaturedStories } from '../components/home/FeaturedStories';
import { ExperienceTimeline } from '../components/home/ExperienceTimeline';
import { PackagesPreview } from '../components/home/PackagesPreview';
import { FinalCTA } from '../components/home/FinalCTA';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <BrandStatement />
      <FeaturedStories />
      <ServicesSection />
      <WhyWowverse />
      <PerspectiveDifference />
      <ExperienceTimeline />
      <PackagesPreview />
      <FinalCTA />
    </div>
  );
};
