/* eslint-disable prettier/prettier */
"use client";
import Image from "next/image";
import { Metadata } from "next";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Note: Metadata should be moved to a separate file if using "use client"
// export const metadata: Metadata = {
//   title: "About Us - PSR Infinity Mall",
//   description: "Learn about PSR Infinity Mall's vision, mission, and commitment to excellence in retail and entertainment.",
// };

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Interactive counter component
function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <div ref={ref}>{count}</div>;
}

// Parallax hero component
function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <Image
          src="/images/gallery_2.png"
          alt="PSR Infinity Mall Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
      </motion.div>
      
      <motion.div 
        className="relative z-10 text-center text-white max-w-4xl mx-auto px-6"
        style={{ opacity }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.h1 
          className="font-serif text-4xl sm:text-7xl font-bold mb-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          About <span className="text-brand-gold">PSR Infinity</span>
        </motion.h1>
        <motion.p 
          className="text-xl sm:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Redefining retail excellence through innovation, luxury, and unparalleled customer experience
        </motion.p>
        
        {/* Floating scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Interactive cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-brand-gold/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      
      {/* Parallax Hero Section */}
      <ParallaxHero />

      {/* Company Overview */}
      <section className="py-20 px-6 relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--brand-gold) 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={slideInLeft}>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-b from-brand-gold to-foreground bg-clip-text text-transparent">
                Our Story
              </h2>
              <motion.div 
                className="h-px w-24 bg-gradient-to-r from-brand-gold to-transparent mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <div className="space-y-6 text-foreground/80 leading-relaxed">
                <motion.p 
                  className="text-lg"
                  variants={fadeInUp}
                >
                  PSR Infinity Mall stands as a testament to modern retail architecture and innovative design. 
                  Born from a vision to create more than just a shopping destination, we have crafted an 
                  immersive experience that blends luxury, entertainment, and community.
                </motion.p>
                <motion.p 
                  className="text-lg"
                  variants={fadeInUp}
                >
                  Since our inception, we have been committed to providing our visitors with world-class 
                  amenities, premium brands, and unforgettable experiences. Our mall represents the perfect 
                  fusion of contemporary design and traditional hospitality.
                </motion.p>
                <motion.p 
                  className="text-lg"
                  variants={fadeInUp}
                >
                  Today, PSR Infinity Mall continues to set new standards in the retail industry, offering 
                  a diverse mix of shopping, dining, and entertainment options under one magnificent roof.
                </motion.p>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={slideInRight}
            >
              <motion.div 
                className="aspect-[4/3] relative rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/gallery_1.png"
                  alt="PSR Infinity Mall Interior"
                  fill
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-brand-gold/20 to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-6 -right-6 aspect-square w-32 rounded-lg overflow-hidden border-4 border-white shadow-lg"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/PSRInfinity-LOGO.png"
                  alt="PSR Infinity Logo"
                  fill
                  className="object-contain bg-white p-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/30 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-b from-brand-gold to-foreground bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <motion.div 
              className="h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Our Mission",
                description: "To create extraordinary retail experiences that inspire, connect, and delight our customers while fostering community growth and economic development.",
                icon: "M13 10V3L4 14h7v7l9-11h-7z"
              },
              {
                title: "Our Vision", 
                description: "To be the premier destination that sets the benchmark for innovation, luxury, and customer satisfaction in the retail and entertainment industry.",
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              },
              {
                title: "Our Values",
                description: "Excellence, integrity, innovation, and customer-centricity guide everything we do, ensuring we deliver unmatched quality and service in every interaction.",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-background rounded-lg p-8 shadow-lg border border-border/50 group"
                variants={scaleIn}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(212, 175, 55, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-gold/20"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <svg className="w-8 h-8 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                  </svg>
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-center mb-4 text-brand-gold">{value.title}</h3>
                <p className="text-foreground/80 text-center leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-b from-brand-gold to-foreground bg-clip-text text-transparent">
              What Makes Us Special
            </h2>
            <motion.div 
              className="h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
            <p className="text-foreground/70 max-w-3xl mx-auto text-lg">
              Discover the unique features and amenities that set PSR Infinity Mall apart from the rest
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            {[
              {
                title: "Premium Retail Experience",
                description: "Curated selection of international and local brands offering the finest in fashion, lifestyle, and luxury goods.",
                icon: "🛍️"
              },
              {
                title: "State-of-the-Art Cinema",
                description: "Modern multiplex with latest technology, comfortable seating, and immersive audio-visual experience.",
                icon: "🎬"
              },
              {
                title: "Diverse Dining Options",
                description: "From fine dining to casual eateries, experience a world of flavors in our extensive food court and restaurants.",
                icon: "🍽️"
              },
              {
                title: "Family Entertainment",
                description: "Dedicated play areas, gaming zones, and entertainment facilities designed for visitors of all ages.",
                icon: "🎮"
              },
              {
                title: "Convenient Parking",
                description: "Spacious, secure parking facilities with easy access and modern safety features for your peace of mind.",
                icon: "🚗"
              },
              {
                title: "Customer Service",
                description: "Dedicated customer service team committed to ensuring your visit is comfortable and enjoyable.",
                icon: "💁‍♀️"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-muted/30 rounded-lg p-6 border border-border/50 group cursor-pointer"
                variants={fadeInUp}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  boxShadow: "0 15px 30px rgba(212, 175, 55, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-4xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-serif text-xl font-bold mb-3 text-brand-gold group-hover:text-brand-gold/80 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-b from-brand-gold to-foreground bg-clip-text text-transparent">
              By The Numbers
            </h2>
            <motion.div 
              className="h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            {[
              { number: 200, suffix: "+", label: "Premium Stores" },
              { number: 50, suffix: "+", label: "Dining Options" },
              { number: 10, suffix: "+", label: "Entertainment Zones" },
              { number: 1000000, suffix: "+", label: "Annual Visitors" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                variants={scaleIn}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="font-serif text-4xl sm:text-5xl font-bold text-brand-gold mb-2"
                  whileHover={{ textShadow: "0 0 20px rgba(212, 175, 55, 0.5)" }}
                >
                  <AnimatedCounter end={stat.number} />
                  <span>{stat.suffix}</span>
                </motion.div>
                <div className="text-foreground/70 text-lg group-hover:text-foreground transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="font-serif text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-b from-brand-gold to-foreground bg-clip-text text-transparent"
            variants={fadeInUp}
          >
            Ready to Experience PSR Infinity?
          </motion.h2>
          <motion.div 
            className="h-px w-24 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          />
          <motion.p 
            className="text-foreground/70 text-lg mb-8 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Visit us today and discover why PSR Infinity Mall is the premier destination for shopping, 
            dining, and entertainment. We look forward to welcoming you!
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <motion.button 
              className="bg-brand-gold hover:bg-brand-gold/90 text-black font-semibold px-8 py-3 rounded-lg transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              Visit Our Gallery
            </motion.button>
            <motion.button 
              className="border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black font-semibold px-8 py-3 rounded-lg transition-colors relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-brand-gold"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <span className="relative z-10">Contact Us</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}