/* eslint-disable prettier/prettier */
"use client";
import { useState } from 'react'

const CorporateCTA = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsFormSubmitted(true)
    setTimeout(() => setIsFormSubmitted(false), 3000)
  }

  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-brand-gold)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      {/* Corporate & Contact */}
      <div id="contact" className="relative mx-auto max-w-6xl text-left px-4 sm:px-6 py-20 lg:py-24">
        <div className="spotlight absolute inset-0 -top-20" />

        <div className="gradient-border animate-fade-in-up">
          <div className="inner rounded-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 via-transparent to-brand-gold/3 pointer-events-none" />

            {/* Header Section */}
            <div className="relative z-10 text-center mb-12">
              <h2 className="font-serif text-3xl lg:text-4xl mb-4 bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold bg-clip-text text-transparent animate-shimmer">
                Corporate & Contact
              </h2>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent rounded-full" />
              <p className="text-foreground/70 mt-4 text-lg font-light max-w-2xl mx-auto">
                Connect with us for partnerships, inquiries, or to learn more about PSR Infinity Mall
              </p>
            </div>

            {/* Digital Card Download Section - Enhanced */}
            <div className="mb-12 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-transparent rounded-xl blur-sm group-hover:blur-none transition-all duration-300" />
              <div className="relative bg-gradient-to-r from-brand-gold/10 via-brand-gold/5 to-transparent rounded-xl border border-brand-gold/30 p-6 lg:p-8 hover:border-brand-gold/50 transition-all duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {/* <div className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center text-2xl">
                        
                      </div> */}
                      <h3 className="font-semibold text-xl text-foreground">Digital Business Card</h3>
                    </div>
                    <p className="text-foreground/70 text-base">
                      Download our comprehensive digital card with all contact details, location info, and business highlights.
                    </p>
                  </div>
                  <a
                    href="/PSR INFINITY DC.pdf"
                    download="PSR INFINITY DC.pdf"
                    className="group/btn bg-gradient-to-r from-brand-gold to-yellow-500 hover:from-yellow-500 hover:to-brand-gold text-background inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-gold/25 whitespace-nowrap"
                  >
                    {/* <span className="mr-2">📄</span> */}
                    Download Card
                    <svg className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-8 lg:gap-12 lg:grid-cols-2">
              {/* Contact Information */}
              <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="bg-gradient-to-br from-foreground/5 to-foreground/2 rounded-xl p-6 border border-foreground/10 hover:border-brand-gold/30 transition-all duration-300">
                  <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    {/* <div className="w-8 h-8 bg-brand-gold/20 rounded-full flex items-center justify-center">🏢</div> */}
                    Corporate Office
                  </h4>
                  <p className="text-foreground/80 font-sans text-base leading-relaxed">
                    <span className="font-semibold text-brand-gold">SIRI Multiplex Pvt.Ltd</span><br />
                    4th Floor, ABK Mall<br />
                    Old Bus Depot, Ramnagar – 506001
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-foreground/5 transition-colors group">
                    {/* <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      
                    </div> */}
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Contact Person</p>
                      <a
                        href="tel:+918524060606"
                        className="text-foreground font-medium hover:text-brand-gold transition-colors text-base"
                      >
                        Arva Ramakanth Reddy<br />
                        <span className="text-brand-gold">+91 85240 60606</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-foreground/5 transition-colors group">
                    {/* <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      
                    </div> */}
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Email</p>
                      <a
                        href="mailto:psrinfinitymall@gmail.com"
                        className="text-foreground font-medium hover:text-brand-gold transition-colors text-base"
                      >
                        psrinfinitymall@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-foreground/5 transition-colors group">
                    {/* <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      
                    </div> */}
                    <div>
                      <p className="text-sm text-foreground/60 mb-1">Website</p>
                      <a
                        href="https://www.psrinfinitymall.in"
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground font-medium hover:text-brand-gold transition-colors text-base"
                      >
                        www.psrinfinitymall.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Contact Form */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="bg-gradient-to-br from-foreground/5 to-foreground/2 rounded-xl p-6 border border-foreground/10 hover:border-brand-gold/30 transition-all duration-300">
                  <h4 className="font-semibold text-lg mb-6 flex items-center gap-2">
                    {/* <div className="w-8 h-8 bg-brand-gold/20 rounded-full flex items-center justify-center">💬</div> */}
                    Get In Touch
                  </h4>

                  {isFormSubmitted ? (
                    <div className="text-center py-8 animate-fade-in">
                      {/* <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        
                      </div> */}
                      <h5 className="font-semibold text-lg mb-2">Message Sent!</h5>
                      <p className="text-foreground/70">We&apos;ll get back to you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="float-label">
                        <input
                          type="text"
                          name="Name"
                          placeholder=" "
                          className="w-full rounded-lg border border-foreground/20 bg-background/50 px-4 py-4 text-base outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all backdrop-blur-sm"
                          required
                        />
                        <label className="text-foreground/60 pointer-events-none absolute top-4 left-4 text-base transition-all duration-200">
                          Your Name
                        </label>
                      </div>

                      <div className="float-label">
                        <input
                          type="email"
                          name="Email"
                          placeholder=" "
                          className="w-full rounded-lg border border-foreground/20 bg-background/50 px-4 py-4 text-base outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all backdrop-blur-sm"
                          required
                        />
                        <label className="text-foreground/60 pointer-events-none absolute top-4 left-4 text-base transition-all duration-200">
                          Your Email
                        </label>
                      </div>

                      <div className="float-label">
                        <input
                          type="tel"
                          name="Phone"
                          placeholder=" "
                          className="w-full rounded-lg border border-foreground/20 bg-background/50 px-4 py-4 text-base outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all backdrop-blur-sm"
                        />
                        <label className="text-foreground/60 pointer-events-none absolute top-4 left-4 text-base transition-all duration-200">
                          Phone Number (Optional)
                        </label>
                      </div>

                      <div className="float-label">
                        <textarea
                          name="Message"
                          rows={4}
                          placeholder=" "
                          className="w-full rounded-lg border border-foreground/20 bg-background/50 px-4 py-4 text-base outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all backdrop-blur-sm resize-none"
                          required
                        />
                        <label className="text-foreground/60 pointer-events-none absolute top-4 left-4 text-base transition-all duration-200">
                          Your Message
                        </label>
                      </div>

                      <div className="flex gap-3 pt-2">
                        <a
                          href="mailto:psrinfinitymall@gmail.com"
                          className="flex-1 bg-foreground/10 hover:bg-foreground/20 text-foreground rounded-lg px-6 py-3 font-medium transition-all duration-300 text-center border border-foreground/20 hover:border-foreground/30"
                        >
                          Quick Email
                        </a>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-brand-gold to-yellow-500 hover:from-yellow-500 hover:to-brand-gold text-background rounded-lg px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-brand-gold/25"
                        >
                          Send Message
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 text-foreground/60 text-sm">
                <span>Ready to partner with us?</span>
                <a
                  href="https://api.whatsapp.com/send/?phone=918524060606&text&type=phone_number&app_absent=0"
                  className="text-brand-gold hover:text-yellow-400 font-medium transition-colors"
                >
                  Let&apos;s discuss →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CorporateCTA