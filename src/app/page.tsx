/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
// import ScrollPullGallery from "../components/ScrollPullGallery";
import FadedScrollGallery from "../components/FadedScrollGallery";
import Scroll3DShowcase from "../components/Scroll3DShowcase";
import ScrollFocusShift from "@/components/ScrollFocusShift";
import FlippingCard from "../components/FlippingCard";
// import ScrollGlowHero from "@/components/ScrollGlowHero";
import MallSection from "@/components/MallSection";
import HeroImageTrail from "@/components/HeroImageTrail";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden p-8 sm:p-16">
      {/* Decorative gold gradient to echo luxury styling */}
      <div className="from-brand-gold/15 pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />
      <div className="spotlight pointer-events-none absolute inset-0 opacity-25" />
      <div className="bg-brand-gold/10 animate-float pointer-events-none absolute top-24 -left-24 h-40 w-40 rounded-full blur-2xl" />
      <div className="bg-brand-gold/10 animate-float pointer-events-none absolute -right-24 bottom-24 h-40 w-40 rounded-full blur-2xl" />

      <section id="hero-interactive-area" className="relative w-full max-w-6xl space-y-12 text-center">
        <HeroImageTrail />
        <div className="relative space-y-8">
          <div className="flex items-center justify-center">
            <span className="gradient-border inline-flex rounded-full">
              <span className="bg-brand-gold relative inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold tracking-[0.25em] text-black uppercase">
                Coming Soon
                <i className="animate-shimmer pointer-events-none absolute inset-0 rounded-full opacity-30" />
              </span>
            </span>
          </div>

          <h1 className="font-serif text-5xl tracking-tight sm:text-7xl bg-gradient-to-b from-brand-gold to-foreground bg-clip-text text-transparent animate-fade-in-up">The Galleria Mall</h1>
          <div className="via-brand-gold mx-auto my-2 h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
          <p className="text-foreground/75 mx-auto max-w-3xl font-sans text-base sm:text-lg">
            Warangal's biggest lifestyle and entertainment destination - opening soon.
          </p>

          <div className="flex items-center justify-center gap-3">
            <a
              href="#contact"
              className="bg-cta text-brand-white focus-visible:ring-brand-gold inline-flex items-center justify-center rounded-md px-6 py-3 font-sans text-sm font-semibold transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none sm:text-base"
            >
              Notify Me
            </a>
            <a
              href="#highlights"
              className="border-brand-gold text-foreground/90 hover:bg-brand-gold/10 inline-flex items-center justify-center rounded-md border px-6 py-3 font-sans text-sm font-semibold sm:text-base"
            >
              Discover More
            </a>
          </div>

        </div>
        {/* Flipping Card */}
        <div className="relative z-10">
          <FlippingCard />
        </div>

      </section>

      <div className="w-full max-w-6xl space-y-12 text-center mt-12">



        {/* Pull-in gallery section (Westfield-like) */}
        {/* <ScrollPullGallery /> */}

        {/* New faded scrolling gallery using 6 images */}
        <FadedScrollGallery speed={0.01} />

        {/* Scroll focus shift: left -> right */}
        <ScrollFocusShift stepped />

        {/* 3D product showcase (scroll-driven) */}
        <Scroll3DShowcase speed={0.6} />



        {/* <ScrollGlowHero /> */}

        <div className="-mt-8 sm:-mt-[480px]">
          <MallSection />
        </div>




        {/* Location Advantage */}
        <div className="mx-auto max-w-5xl text-left">
          <div className="gradient-border">
            <div className="inner rounded-xl p-6">
              <h2 className="font-serif text-2xl">Location Advantage</h2>
              <div className="via-brand-gold my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
              <div className="marquee">
                <div className="marquee-track">
                  <span className="bg-brand-gold/15 text-black/80 inline-flex rounded-full px-3 py-1 text-xs">
                    8 mins Hanamkonda
                  </span>
                  <span className="bg-brand-gold/15 text-black/80 inline-flex rounded-full px-3 py-1 text-xs">
                    10 mins Warangal
                  </span>
                  <span className="bg-brand-gold/15 text-black/80 inline-flex rounded-full px-3 py-1 text-xs">
                    25 mins Kazipet
                  </span>
                  <span className="bg-brand-gold/15 text-black/80 inline-flex rounded-full px-3 py-1 text-xs">
                    8 mins Hanamkonda
                  </span>
                  <span className="bg-brand-gold/15 text-black/80 inline-flex rounded-full px-3 py-1 text-xs">
                    10 mins Warangal
                  </span>
                  <span className="bg-brand-gold/15 text-black/80 inline-flex rounded-full px-3 py-1 text-xs">
                    25 mins Kazipet
                  </span>
                </div>
              </div>
              <ul className="text-foreground list-disc space-y-2 pt-4 pl-5 font-sans text-sm">
                <li>Strategically placed, close to 3 cities (~1.1M population)</li>
                <li>High rental yield (10â€“12%) with strong demand for organized retail</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mall Highlights */}
        <div id="highlights" className="mx-auto max-w-5xl text-left">
          <h2 className="text-center font-serif text-2xl">Mall Highlights</h2>
          <div className="via-brand-gold mx-auto my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Card 1 */}
            <div className="gradient-border">
              <div className="inner rounded-xl p-5">
                <div className="bg-brand-gold/15 mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 21h16V3H4v18zm3-3h10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-foreground">
                  9 floors of premium retail & entertainment
                </p>
                <p className="font-sans text-sm text-foreground">
                  5-screen multiplex (1280+ seating)
                </p>
                <p className="font-sans text-sm text-foreground">300+ car parking capacity</p>
                <p className="font-sans text-sm text-foreground">6 lifts + 3 basements</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="gradient-border">
              <div className="inner rounded-xl p-5">
                <div className="bg-brand-gold/15 mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-foreground">2 lakh sq. ft. built-up area</p>
                <p className="font-sans text-sm text-foreground">71,280 sq. ft. site area</p>
                <p className="font-sans text-sm text-foreground">4,500 sq. ft. atrium</p>
                <p className="font-sans text-sm text-foreground">15,000 sq. ft. cine lounge</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="gradient-border">
              <div className="inner rounded-xl p-5">
                <div className="bg-brand-gold/15 mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 12c4-6 12-6 16 0" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-foreground">50% open space</p>
                <p className="font-sans text-sm text-foreground">20% landscaped area</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="gradient-border">
              <div className="inner rounded-xl p-5">
                <div className="bg-brand-gold/15 mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 6h8v12H3zM13 8h8v8h-8z" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="font-sans text-sm text-foreground">
                  Prime location across Warangalâ€“Hanamkondaâ€“Kazipet
                </p>
                <p className="font-sans text-sm text-foreground">Strong brand mix potential</p>
              </div>
            </div>
          </div>
        </div>

        {/* Entertainment */}
        <div className="mx-auto max-w-4xl text-left">
          <div className="gradient-border">
            <div className="inner rounded-xl p-6">
              <h2 className="font-serif text-2xl">Entertainment</h2>
              <div className="via-brand-gold my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
              <ul className="text-foreground list-disc space-y-2 pl-5 font-sans text-sm">
                <li>5 cinema screens (biggest in Warangal)</li>
                <li>15,000 sq. ft. cine lounge for a premium movie experience</li>
                <li>Where food meets cinema â€” integrated dining & entertainment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Lifestyle & Leisure */}
        <div className="mx-auto max-w-4xl text-left">
          <div className="gradient-border">
            <div className="inner rounded-xl p-6">
              <h2 className="font-serif text-2xl">Lifestyle & Leisure</h2>
              <div className="via-brand-gold my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
              <ul className="text-foreground list-disc space-y-2 pl-5 font-sans text-sm">
                <li>Open fresh-air spaces for shopping & leisure</li>
                <li>20% green landscaping</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Corporate & Contact */}
        <div id="contact" className="mx-auto max-w-4xl text-left">
          <div className="gradient-border">
            <div className="inner rounded-xl p-6">
              <h2 className="font-serif text-2xl">Corporate & Contact</h2>
              <div className="via-brand-gold my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-foreground/80 font-sans text-sm">
                    <span className="font-semibold">Corporate Office:</span> 4th Floor, ABK Mall, Old Bus Depot, Ramnagar â€“ 506001
                  </p>
                  <div className="flex flex-col gap-1 font-sans text-sm">
                    <a
                      href="tel:+918524060606"
                      className="text-foreground/90 hover:text-foreground underline"
                    >
                      Contact: Arva Ramakanth Reddy â€“ +91 85240 60606
                    </a>
                    <a
                      href="mailto:galleriamallwarangal@gmail.com"
                      className="text-foreground/90 hover:text-foreground underline"
                    >
                      Email: galleriamallwarangal@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.thegalleriamall.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/90 hover:text-foreground underline"
                  >
                    Website: www.thegalleriamall.in
                  </a>
                  <a
                    href="https://instagram.com/cpr.architects"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/90 hover:text-foreground underline"
                  >
                    Instagram (Architects): @cpr.architects
                  </a>
                  <div className="pt-2">
                    <a
                      href="mailto:galleriamallwarangal@gmail.com"
                      className="bg-cta text-brand-white inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-semibold hover:opacity-90"
                    >
                      Enquire Now
                    </a>
                  </div>
                  <form
                    action="mailto:galleriamallwarangal@gmail.com"
                    method="post"
                    encType="text/plain"
                    className="mt-4 grid grid-cols-1 gap-3"
                  >
                    <div className="float-label">
                      <input
                        type="text"
                        name="Name"
                        placeholder=" "
                        className="focus:border-brand-gold w-full rounded-md border border-brand-gold/30 bg-transparent px-3 py-3 text-sm outline-none"
                        required
                      />
                      <label className="text-foreground/60 pointer-events-none absolute top-2 left-3 text-xs transition-all">
                        Your Name
                      </label>
                    </div>
                    <div className="float-label">
                      <input
                        type="email"
                        name="Email"
                        placeholder=" "
                        className="focus:border-brand-gold w-full rounded-md border border-brand-gold/30 bg-transparent px-3 py-3 text-sm outline-none"
                        required
                      />
                      <label className="text-foreground/60 pointer-events-none absolute top-2 left-3 text-xs transition-all">
                        Your Email
                      </label>
                    </div>
                    <div className="float-label">
                      <textarea
                        name="Message"
                        rows={3}
                        placeholder=" "
                        className="focus:border-brand-gold w-full rounded-md border border-brand-gold/30 bg-transparent px-3 py-3 text-sm outline-none"
                      />
                      <label className="text-foreground/60 pointer-events-none absolute top-2 left-3 text-xs transition-all">
                        Your Message
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="bg-cta text-brand-white rounded-md px-4 py-2 text-sm font-semibold hover:opacity-90"
                    >
                      Send Enquiry
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}