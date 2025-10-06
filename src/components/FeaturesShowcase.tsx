/* eslint-disable prettier/prettier */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
  benefits: string[];
}

const features: Feature[] = [
  {
    id: 1,
    title: "Premium Cinema Experience",
    description: "State-of-the-art 5-screen multiplex with the biggest screens in Warangal region",
    image: "/pdf-images/page-02.png",
    icon: "🎬",
    benefits: [
      "1280+ seating capacity",
      "15,000 sq. ft. cine lounge",
      "Premium sound systems",
      "Comfortable seating",
    ],
  },
  {
    id: 2,
    title: "Luxury Shopping",
    description: "Premium retail zones with luxury brands and lifestyle shopping experience",
    image: "/pdf-images/page-03.png",
    icon: "🛍️",
    benefits: [
      "Luxury brand outlets",
      "Fashion & lifestyle stores",
      "Electronics & gadgets",
      "Home & decor sections",
    ],
  },
  {
    id: 3,
    title: "Grand Architecture",
    description: "Modern architectural design with premium finishes and contemporary aesthetics",
    image: "/pdf-images/page-06.png",
    icon: "🏛️",
    benefits: [
      "Contemporary design",
      "Premium finishes",
      "4,500 sq. ft. atrium",
      "Natural lighting",
    ],
  },
  {
    id: 4,
    title: "Green Spaces",
    description: "50% open space with 20% landscaped area for fresh-air shopping experience",
    image: "/pdf-images/page-04.png",
    icon: "🌿",
    benefits: ["Open-air spaces", "Landscaped areas", "Natural ventilation", "Eco-friendly design"],
  },
];

export default function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("features-showcase");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section id="features-showcase" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="from-brand-gold to-foreground bg-gradient-to-b bg-clip-text font-serif text-3xl font-bold text-transparent sm:text-4xl">
            Key Features
          </h2>
          <div className="via-brand-gold mx-auto my-4 h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
          <p className="text-foreground/70 mx-auto max-w-2xl">
            Discover the exceptional features that make PSR Infinity Mall the ultimate destination
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          {/* Feature Navigation */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 ${
                  activeFeature === index
                    ? "from-brand-gold/20 border-brand-gold/30 border bg-gradient-to-r to-transparent"
                    : "from-brand-gold/5 hover:from-brand-gold/10 bg-gradient-to-r to-transparent"
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{feature.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-foreground mb-2 font-semibold">{feature.title}</h3>
                    <p className="text-foreground/70 mb-3 text-sm">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="text-foreground/60 flex items-center gap-2 text-xs"
                        >
                          <div className="bg-brand-gold h-1.5 w-1.5 rounded-full" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Image */}
          <div className="relative">
            <div
              className={`relative overflow-hidden rounded-xl transition-all duration-500 ${
                isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <Image
                src={features[activeFeature].image}
                alt={features[activeFeature].title}
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Feature Badge */}
              <div className="text-foreground absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold backdrop-blur-sm">
                {features[activeFeature].icon} {features[activeFeature].title}
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    activeFeature === index
                      ? "bg-brand-gold"
                      : "bg-brand-gold/30 hover:bg-brand-gold/50"
                  }`}
                  onClick={() => setActiveFeature(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

