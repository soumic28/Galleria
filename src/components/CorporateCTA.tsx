/* eslint-disable prettier/prettier */



const CorporateCTA = () => {
    return (
    <div>
         {/* Corporate & Contact */}
         <div id="contact" className="mx-auto max-w-4xl text-left px-4 sm:px-6 py-16">
          <div className="gradient-border">
            <div className="inner rounded-xl p-4 sm:p-6">
              <h2 className="font-serif text-2xl">Corporate & Contact</h2>
              <div className="via-brand-gold my-3 h-px w-16 bg-gradient-to-r from-transparent to-transparent" />

              {/* Digital Card Download Section */}
              <div className="mb-6 p-4 bg-gradient-to-r from-brand-gold/10 to-transparent rounded-lg border border-brand-gold/20">
                <h3 className="font-semibold text-lg mb-2 text-foreground">Download Our Digital Card</h3>
                <p className="text-foreground/70 text-sm mb-3">
                  Get the PSR Infinity Mall digital card with all our contact details and information.
                </p>
                <a
                  href="/PSR INFINITY DC.pdf"
                  download="PSR INFINITY DC.pdf"
                  className="bg-brand-gold text-background inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  📄 Download Digital Card
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-foreground/80 font-sans text-sm">
                    <span className="font-semibold">Corporate Office:</span> SIRI Multiplex Pvt.Ltd , 4th Floor, ABK Mall, Old Bus Depot, Ramnagar – 506001
                  </p>
                  <div className="flex flex-col gap-1 font-sans text-sm">
                    <a
                      href="tel:+918524060606"
                      className="text-foreground/90 hover:text-foreground underline"
                    >
                      Contact: Arva Ramakanth Reddy – +91 85240 60606
                    </a>
                    <a
                      href="mailto:psrinfinitymall@gmail.com"
                      className="text-foreground/90 hover:text-foreground underline"
                    >
                      Email: psrinfinitymall@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.psrinfinitymall.in"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/90 hover:text-foreground underline"
                  >
                    Website: www.psrinfinitymall.com
                  </a>
                  {/* <a
              href="https://instagram.com/cpr.architects"
              target="_blank"
              rel="noreferrer"
              className="text-foreground/90 hover:text-foreground underline"
            >
              Instagram (Architects): @cpr.architects
            </a> */}
                  <div className="pt-2">
                    <a
                      href="mailto:psrinfinitymall@gmail.com"
                      className="bg-cta text-brand-white inline-flex items-center justify-center rounded-md px-5 py-2 text-sm font-semibold hover:opacity-90"
                    >
                      Enquire Now
                    </a>
                  </div>
                  <form
                    action="mailto:psrinfinitymall@gmail.com"
                    method="post"
                    encType="text/plain"
                    className="mt-3 sm:mt-4 grid grid-cols-1 gap-2.5 sm:gap-3"
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
    )
}

export default CorporateCTA