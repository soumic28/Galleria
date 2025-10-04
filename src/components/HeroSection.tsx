/* eslint-disable prettier/prettier */
import MouseTrailGallery from "./MouseTrailGallery";

export default function HeroSection() {
  return (
    <section
      id="hero-interactive-area"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background Mall Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/psrmall_1.png')", // Add your mall image here
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Mouse Trail Animation for Hero Section */}
      <MouseTrailGallery containerId="hero-interactive-area" />

      {/* Decorative gold gradient overlays */}
      <div className="from-brand-gold/20 pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent z-10" />
      <div className="spotlight pointer-events-none absolute inset-0 opacity-30 z-10" />
      <div className="bg-brand-gold/15 animate-float pointer-events-none absolute top-24 -left-24 h-40 w-40 rounded-full blur-2xl z-10" />
      <div className="bg-brand-gold/15 animate-float pointer-events-none absolute -right-24 bottom-24 h-40 w-40 rounded-full blur-2xl z-10" />

      {/* Hero Content */}
      <div className="relative z-20 w-full max-w-6xl space-y-8 sm:space-y-12 text-center px-4 sm:px-16">
        <div className="flex items-center justify-center">
          <span className="gradient-border inline-flex rounded-full">
            <span className="bg-brand-gold relative inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold tracking-[0.25em] text-black uppercase">
              Coming Soon
              <i className="animate-shimmer pointer-events-none absolute inset-0 rounded-full opacity-30" />
            </span>
          </span>
        </div>

        <h1 className="font-serif text-5xl tracking-tight sm:text-7xl bg-gradient-to-b from-brand-gold to-white bg-clip-text text-transparent animate-fade-in-up drop-shadow-2xl">
          PSR Infinity Mall
        </h1>
        
        <div className="via-brand-gold mx-auto my-2 h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
        
        <p className="text-white/90 mx-auto max-w-3xl font-sans text-base sm:text-lg drop-shadow-lg">
          Largest Mall in Telangana Outside Hyderabad — 2 Lakh Sq. Ft. Built-up Area
        </p>
        
        <p className="text-white/75 mx-auto max-w-2xl font-sans text-sm sm:text-base mt-2 drop-shadow-lg">
          Premium retail, entertainment, and lifestyle destination opening soon
        </p>

        <div className="flex items-center justify-center gap-2 sm:gap-3 pt-4">
          <a
            href="#contact"
            className="bg-cta text-brand-white focus-visible:ring-brand-gold inline-flex items-center justify-center rounded-md px-6 py-3 font-sans text-sm font-semibold transition-all hover:opacity-90 hover:scale-105 focus-visible:ring-2 focus-visible:outline-none sm:text-base shadow-lg"
          >
            Notify Me
          </a>
          <a
            href="#highlights"
            className="border-brand-gold text-white/90 hover:bg-brand-gold/20 backdrop-blur-sm inline-flex items-center justify-center rounded-md border px-6 py-3 font-sans text-sm font-semibold sm:text-base transition-all hover:scale-105 shadow-lg"
          >
            Discover More
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-brand-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}