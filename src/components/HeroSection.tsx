/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
// import MouseTrailGallery from "./MouseTrailGallery";

export default function HeroSection() {
  return (
    <section
      id="hero-interactive-area"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden w-full"
    >
      {/* Background Mall Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -mt-32 sm:-mt-20 md:-mt-26"
        style={{
          backgroundImage: "url('/images/new_pdf_1.png')", // Add your mall image here
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/50" />
      </div>

      {/* Mouse Trail Animation for Hero Section */}
      {/* <MouseTrailGallery containerId="hero-interactive-area" /> */}

      {/* Decorative gold gradient overlays */}
      <div className="from-brand-gold/20 pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b to-transparent z-10" />
      <div className="spotlight pointer-events-none absolute inset-0 opacity-20 sm:opacity-30 z-10" />
      <div className="bg-brand-gold/15 animate-float pointer-events-none absolute top-16 sm:top-24 -left-16 sm:-left-24 h-24 w-24 sm:h-40 sm:w-40 rounded-full blur-xl sm:blur-2xl z-10" />
      <div className="bg-brand-gold/15 animate-float pointer-events-none absolute -right-16 sm:-right-24 bottom-16 sm:bottom-24 h-24 w-24 sm:h-40 sm:w-40 rounded-full blur-xl sm:blur-2xl z-10" />

      {/* Hero Content - Enhanced with aesthetic design */}
      <div className="relative z-20 w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 text-center px-3 sm:px-4 md:px-6 mt-12 sm:mt-16 md:mt-20 lg:mt-8">
        <div className="flex items-center justify-center w-full">
          <span className="gradient-border inline-flex rounded-full backdrop-blur-sm">
            <span className="bg-brand-gold relative inline-flex items-center gap-1 sm:gap-2 rounded-full px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 text-[8px] xs:text-[10px] sm:text-xs font-semibold tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-black uppercase whitespace-nowrap">
              Coming Soon
              <i className="animate-shimmer pointer-events-none absolute inset-0 rounded-full opacity-30" />
            </span>
          </span>
        </div>

        <div className="space-y-3 sm:space-y-4 md:space-y-6">
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl tracking-tight bg-gradient-to-b from-brand-gold via-yellow-300 to-white bg-clip-text text-transparent animate-fade-in-up drop-shadow-2xl leading-tight break-words px-2">
            PSR Infinity Mall
          </h1>
          
          <div className="via-brand-gold mx-auto my-3 sm:my-4 h-px w-12 sm:w-16 md:w-20 lg:w-24 xl:w-32 bg-gradient-to-r from-transparent to-transparent" />
          
          {/* Elegant Tagline */}
          <div className="relative px-2">
            <p className="font-light text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/90 tracking-wide leading-relaxed">
              Where <span className="font-serif italic bg-gradient-to-r from-brand-gold to-yellow-300 bg-clip-text text-transparent">Excellence</span> Meets <span className="font-serif italic bg-gradient-to-r from-brand-gold to-yellow-300 bg-clip-text text-transparent">Experience</span>
            </p>
          </div>
        </div>
        
        {/* Sophisticated Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Main Feature Card */}
          <div className="group backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-brand-gold/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-brand-gold/30 transition-all duration-500 hover:scale-[1.02] hover:border-brand-gold/60">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <h3 className="text-brand-gold font-semibold text-sm sm:text-base lg:text-lg mb-1">Telangana's Largest</h3>
                <p className="text-brand-gold/70 text-xs sm:text-sm uppercase tracking-wider">Premium Destination</p>
              </div>
            </div>
            <p className="text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed">
              Spanning <span className="font-bold text-brand-gold">2 Lakh Square Feet</span> of meticulously designed retail space, establishing the region's most expansive shopping and lifestyle destination beyond Hyderabad.
            </p>
          </div>

          {/* Experience Card */}
          <div className="group backdrop-blur-lg bg-gradient-to-br from-slate-100/10 to-slate-200/5 border border-slate-300/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl hover:shadow-slate-300/30 transition-all duration-500 hover:scale-[1.02] hover:border-slate-300/60">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div>
                <h3 className="text-slate-200 font-semibold text-sm sm:text-base lg:text-lg mb-1">Curated Luxury</h3>
                <p className="text-slate-300/70 text-xs sm:text-sm uppercase tracking-wider">Premium Experience</p>
              </div>
            </div>
            <p className="text-white/85 text-xs sm:text-sm lg:text-base leading-relaxed">
              An orchestrated blend of <span className="font-semibold text-slate-200">world-class retail, gourmet dining, entertainment venues</span> and luxury lifestyle brands - all unified under one architectural masterpiece.
            </p>
          </div>
        </div>

        {/* Refined Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
          {[
            { title: "Premium Retail", subtitle: "International Brands", gradient: "from-rose-400/20 to-pink-400/20", border: "border-rose-400/30" },
            { title: "Fine Dining", subtitle: "Culinary Excellence", gradient: "from-amber-400/20 to-orange-400/20", border: "border-amber-400/30" },
            { title: "Entertainment", subtitle: "Modern Leisure", gradient: "from-blue-400/20 to-indigo-400/20", border: "border-blue-400/30" },
            { title: "Lifestyle Hub", subtitle: "Luxury Services", gradient: "from-purple-400/20 to-violet-400/20", border: "border-purple-400/30" }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`backdrop-blur-sm bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-center space-y-1 sm:space-y-2">
                <h4 className="text-white font-medium text-xs sm:text-sm lg:text-base">{feature.title}</h4>
                <p className="text-white/60 text-[10px] sm:text-xs lg:text-sm font-light">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold"
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
