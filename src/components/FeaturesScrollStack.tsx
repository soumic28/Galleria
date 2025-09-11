/* eslint-disable prettier/prettier */
"use client";

import ScrollStack, { ScrollStackItem } from "./ScrollStack";

export default function FeaturesScrollStack() {
  const imgs = [
    { src: "/pic-1.png", alt: "Galleria Feature 1" },
    { src: "/pic-2.png", alt: "Galleria Feature 2" },
    { src: "/pic-3.png", alt: "Galleria Feature 3" },
    { src: "/pic-4.png", alt: "Galleria Feature 4" },
    { src: "/pic-5.png", alt: "Galleria Feature 5" },
    { src: "/pic-6.png", alt: "Galleria Feature 6" },
  ];

  return (
    <section id="features" className="my-28">
      <div className="text-center mb-8">
        <h2 className="bg-gradient-to-b from-brand-gold to-white bg-clip-text text-transparent font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight">
          Features of the Galleria Mall
        </h2>
        <div className="via-brand-gold mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
        <p className="text-foreground/70 font-sans text-sm sm:text-base">Scroll to see the highlights</p>
      </div>

      <div className="">
        <ScrollStack
          className=""
          itemDistance={120}
          itemScale={0.035}
          itemStackDistance={34}
          stackPosition="25%"
          scaleEndPosition="12%"
          baseScale={0.86}
          rotationAmount={0}
          blurAmount={0}
          useWindowScroll={true}
        >
          {imgs.map((img, i) => (
            <ScrollStackItem key={i} itemClassName="bg-transparent shadow-none p-0">
              <div className="relative w-full overflow-hidden rounded-[20px] sm:rounded-[28px] flex items-center justify-center">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="block w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  style={{ maxHeight: "172vh" }}
                />
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
