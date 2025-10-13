/* eslint-disable prettier/prettier */
// import ScrollPullGallery from "../components/ScrollPullGallery";
import FadedScrollGallery from "../components/FadedScrollGallery";
import Scroll3DShowcase from "../components/Scroll3DShowcase";
import ScrollFocusShift from "@/components/ScrollFocusShift";
// import FlippingCard from "../components/FlippingCard";
// import ScrollGlowHero from "@/components/ScrollGlowHero";
import MallSection from "@/components/MallSection";
// import MouseTrailGallery from "@/components/MouseTrailGallery";
import InteractiveGallery from "@/components/InteractiveGallery";
// import StatisticsSection from "@/components/StatisticsSection";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import CorporateCTA from "@/components/CorporateCTA";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden">
        {/* Hero Section with Mall Background */}
        <HeroSection />

        {/* Video Section - Fullscreen on scroll */}
        {/* <VideoSection 
        videoSrc="/images/psrmall_1.png"
        title="Experience PSR Infinity Mall"
        description="Immerse yourself in the luxury and grandeur of modern retail architecture"
      /> */}

        {/* Main Content */}

        {/* New faded scrolling gallery using 6 images */}
        <FadedScrollGallery speed={0.01} />

        {/* Scroll focus shift: left -> right */}
        <ScrollFocusShift />

        {/* 3D product showcase (scroll-driven) */}
        <Scroll3DShowcase speed={0.6} />

        <div className="-mt-8 sm:-mt-[480px]">
          <MallSection />
        </div>

        {/* Features Showcase */}
        <FeaturesShowcase />

        {/* Interactive Gallery */}
        <div id="gallery" className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-b from-brand-gold to-foreground bg-clip-text text-transparent">
              Mall Gallery
            </h2>
            <div className="via-brand-gold mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Explore the stunning visuals and architectural beauty of PSR Infinity Mall
            </p>
          </div>
          <InteractiveGallery />
        </div>

        {/* Mall Highlights */}
        <div id="highlights" className="mx-auto max-w-5xl text-left px-4 sm:px-6 py-16">
          <div className="via-brand-gold mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* ...existing code... */}
          </div>
        </div>

       <CorporateCTA />

      </div>


    </>
  );
}
