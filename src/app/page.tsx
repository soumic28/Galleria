/* eslint-disable prettier/prettier */
"use client";
import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
// import ScrollPullGallery from "../components/ScrollPullGallery";
import FadedScrollGallery from "../components/FadedScrollGallery";
import Scroll3DShowcase from "../components/Scroll3DShowcase";
// import FlippingCard from "../components/FlippingCard";
// import ScrollGlowHero from "@/components/ScrollGlowHero";
import MallSection from "@/components/MallSection";
// import MouseTrailGallery from "@/components/MouseTrailGallery";
import InteractiveGallery from "@/components/InteractiveGallery";
// import StatisticsSection from "@/components/StatisticsSection";
import HeroSection from "@/components/HeroSection";
import CorporateCTA from "@/components/CorporateCTA";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};



export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Interactive cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-brand-gold/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      <div className="overflow-hidden">
        {/* Hero Section with Mall Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <HeroSection />
        </motion.div>

        {/* Video Section - Fullscreen on scroll */}
        {/* <VideoSection 
        videoSrc="https://drive.google.com/file/d/1KJ4vwJ5OjgSr7NUUBwvXmA58c4X1Ah6Q/view"
        title="Experience PSR Infinity Mall"
        description="Immerse yourself in the luxury and grandeur of modern retail architecture"
      /> */}

        {/* Main Content */}

        {/* New faded scrolling gallery using 6 images */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <FadedScrollGallery speed={0.01} />
        </motion.div>

        {/* Scroll focus shift: left -> right */}
        {/* <ScrollFocusShift /> */}

        {/* 3D product showcase (scroll-driven) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={scaleIn}
        >
          <Scroll3DShowcase speed={0.6} />
        </motion.div>

        <motion.div 
          className="-mt-8 sm:-mt-[480px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeInUp}
        >
          <MallSection />
        </motion.div>

        {/* Features Showcase */}
        {/* <FeaturesShowcase /> */}

        {/* Interactive Gallery */}
        <motion.div 
          id="gallery" 
          className="mx-auto max-w-6xl px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
          >
            <motion.h2 
              className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-b from-brand-gold to-foreground bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Mall Gallery
            </motion.h2>
            <motion.div 
              className="via-brand-gold mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.p 
              className="text-foreground/70 max-w-2xl mx-auto"
              variants={fadeInUp}
            >
              Explore the stunning visuals and architectural beauty of PSR Infinity Mall
            </motion.p>
          </motion.div>
          <motion.div variants={scaleIn}>
            <InteractiveGallery />
          </motion.div>
        </motion.div>

        {/* Mall Highlights */}
        <motion.div 
          id="highlights" 
          className="mx-auto max-w-5xl text-left px-4 sm:px-6 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div 
            className="via-brand-gold mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
          <motion.div 
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            variants={staggerContainer}
          >
            {/* Enhanced highlights section */}
            {[
              {
                title: "Premium Shopping Experience",
                description: "Discover luxury brands and local favorites in our carefully curated retail spaces",
                icon: "",
                gradient: "from-blue-500 to-purple-600"
              },
              {
                title: "Entertainment Hub",
                description: "State-of-the-art cinema and family entertainment zones for all ages",
                icon: "",
                gradient: "from-purple-500 to-pink-600"
              },
              {
                title: "Culinary Delights",
                description: "A diverse range of dining options from street food to fine dining",
                icon: "",
                gradient: "from-orange-500 to-red-600"
              },
              {
                title: "Modern Infrastructure",
                description: "Contemporary architecture with world-class amenities and facilities",
                icon: "",
                gradient: "from-green-500 to-blue-600"
              }
            ].map((highlight, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(212, 175, 55, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-muted/30 rounded-lg p-6 border border-border/50 h-full">
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {highlight.icon}
                  </motion.div>
                  <h3 className="font-serif text-xl font-bold mb-3 text-brand-gold group-hover:text-brand-gold/80 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {highlight.description}
                  </p>
                  <motion.div
                    className={`h-1 w-0 bg-gradient-to-r ${highlight.gradient} rounded-full mt-4 group-hover:w-full`}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced CorporateCTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <CorporateCTA />
        </motion.div>

      </div>

      {/* Floating action button */}
      <motion.div
        className="fixed bottom-8 right-8 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.button
          className="bg-brand-gold hover:bg-brand-gold/90 text-black p-4 rounded-full shadow-lg"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)" }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          animate={{ y: [0, -5, 0] }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.2 },
            boxShadow: { duration: 0.2 }
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </motion.div>
    </>
  );
}
