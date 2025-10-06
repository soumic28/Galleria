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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/psrmall_1.png')", // Add your mall image here
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Mouse Trail Animation for Hero Section */}
      {/* <MouseTrailGallery containerId="hero-interactive-area" /> */}

      {/* Decorative gold gradient overlays */}
      <div className="from-brand-gold/20 pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b to-transparent z-10" />
      <div className="spotlight pointer-events-none absolute inset-0 opacity-30 z-10" />
      <div className="bg-brand-gold/15 animate-float pointer-events-none absolute top-24 -left-24 h-40 w-40 rounded-full blur-2xl z-10" />
      <div className="bg-brand-gold/15 animate-float pointer-events-none absolute -right-24 bottom-24 h-40 w-40 rounded-full blur-2xl z-10" />

      {/* Hero Content - Enhanced with aesthetic design */}
      <div className="relative z-20 w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 text-center px-4 sm:px-6 mt-16 sm:mt-20 md:mt-8">
        <div className="flex items-center justify-center w-full">
          <span className="gradient-border inline-flex rounded-full backdrop-blur-sm">
            <span className="bg-brand-gold relative inline-flex items-center gap-1 sm:gap-2 rounded-full px-3 sm:px-4 md:px-6 py-2 text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-black uppercase whitespace-nowrap">
              Coming Soon
              <i className="animate-shimmer pointer-events-none absolute inset-0 rounded-full opacity-30" />
            </span>
          </span>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight bg-gradient-to-b from-brand-gold via-yellow-300 to-white bg-clip-text text-transparent animate-fade-in-up drop-shadow-2xl leading-tight break-words">
            PSR Infinity Mall
          </h1>
          
          <div className="via-brand-gold mx-auto my-4 h-px w-16 sm:w-20 md:w-24 lg:w-32 bg-gradient-to-r from-transparent to-transparent" />
          
          {/* Elegant Tagline */}
          <div className="relative">
            <p className="font-light text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 tracking-wide leading-relaxed">
              Where <span className="font-serif italic bg-gradient-to-r from-brand-gold to-yellow-300 bg-clip-text text-transparent">Excellence</span> Meets <span className="font-serif italic bg-gradient-to-r from-brand-gold to-yellow-300 bg-clip-text text-transparent">Experience</span>
            </p>
          </div>
        </div>
        
        {/* Sophisticated Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Main Feature Card */}
          <div className="group backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-brand-gold/40 rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-brand-gold/30 transition-all duration-500 hover:scale-[1.02] hover:border-brand-gold/60">
            <div className="flex items-start gap-4 mb-4">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 bg-black/20 rounded-sm"></div>
              </div> */}
              <div>
                <h3 className="text-brand-gold font-semibold text-base sm:text-lg mb-1">Telangana's Largest</h3>
                <p className="text-brand-gold/70 text-sm uppercase tracking-wider">Premium Destination</p>
              </div>
            </div>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              Spanning <span className="font-bold text-brand-gold">2 Lakh Square Feet</span> of meticulously designed retail space, establishing the region's most expansive shopping and lifestyle destination beyond Hyderabad.
            </p>
          </div>

          {/* Experience Card */}
          <div className="group backdrop-blur-lg bg-gradient-to-br from-slate-100/10 to-slate-200/5 border border-slate-300/40 rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-slate-300/30 transition-all duration-500 hover:scale-[1.02] hover:border-slate-300/60">
            <div className="flex items-start gap-4 mb-4">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-slate-300 to-slate-400 rounded-xl flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 border-2 border-black/20 rounded-full"></div>
              </div> */}
              <div>
                <h3 className="text-slate-200 font-semibold text-base sm:text-lg mb-1">Curated Luxury</h3>
                <p className="text-slate-300/70 text-sm uppercase tracking-wider">Premium Experience</p>
              </div>
            </div>
            <p className="text-white/85 text-sm sm:text-base leading-relaxed">
              An orchestrated blend of <span className="font-semibold text-slate-200">world-class retail, gourmet dining, entertainment venues</span> and luxury lifestyle brands - all unified under one architectural masterpiece.
            </p>
          </div>
        </div>

        {/* Refined Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {[
            { title: "Premium Retail", subtitle: "International Brands", gradient: "from-rose-400/20 to-pink-400/20", border: "border-rose-400/30" },
            { title: "Fine Dining", subtitle: "Culinary Excellence", gradient: "from-amber-400/20 to-orange-400/20", border: "border-amber-400/30" },
            { title: "Entertainment", subtitle: "Modern Leisure", gradient: "from-blue-400/20 to-indigo-400/20", border: "border-blue-400/30" },
            { title: "Lifestyle Hub", subtitle: "Luxury Services", gradient: "from-purple-400/20 to-violet-400/20", border: "border-purple-400/30" }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`backdrop-blur-sm bg-gradient-to-br ${feature.gradient} border ${feature.border} rounded-xl p-4 sm:p-5 hover:scale-105 transition-all duration-300 group`}
            >
              <div className="text-center space-y-2">
                <h4 className="text-white font-medium text-sm sm:text-base">{feature.title}</h4>
                <p className="text-white/60 text-xs sm:text-sm font-light">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Elegant Call to Action */}
        {/* <div className="space-y-6 max-w-lg mx-auto">
          <p className="text-white/70 text-sm sm:text-base font-light leading-relaxed border-l-2 border-brand-gold/50 pl-4 text-left">
            Join an exclusive community of early adopters and be among the first to experience Telangana's most anticipated retail destination.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <a
              href="#contact"
              className="flex-1 bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-black font-semibold text-sm sm:text-base px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-brand-gold/40 hover:scale-105 group"
            >
              <span className="flex items-center justify-center gap-2">
                Get Early Access
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <a
              href="#highlights"
              className="flex-1 border-2 border-white/30 text-white font-semibold text-sm sm:text-base px-8 py-4 rounded-xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 group"
            >
              <span className="flex items-center justify-center gap-2">
                Explore Details
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div> */}
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