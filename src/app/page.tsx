export default function Home() {
  return (
    <main className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden p-8 sm:p-16">
      {/* Decorative gold gradient to echo luxury styling */}
      <div className="from-brand-gold/15 pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent" />

      <section className="w-full max-w-5xl space-y-8 text-center">
        <div className="flex items-center justify-center">
          <span className="bg-brand-gold inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-[0.25em] text-black uppercase">
            Coming Soon
          </span>
        </div>

        <h1 className="font-serif text-5xl tracking-tight sm:text-7xl">Galleria Mall</h1>
        <div className="via-brand-gold mx-auto my-2 h-px w-24 bg-gradient-to-r from-transparent to-transparent" />
        <p className="text-foreground/75 mx-auto max-w-2xl font-sans text-base sm:text-lg">
          An elevated retail and lifestyle destination in Hyderabad.
        </p>

        <div className="flex items-center justify-center gap-3">
          <a
            href="#"
            className="bg-cta text-brand-white focus-visible:ring-brand-gold inline-flex items-center justify-center rounded-md px-6 py-3 font-sans text-sm font-semibold transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none sm:text-base"
          >
            Notify Me
          </a>
          <a
            href="#"
            className="border-brand-gold text-foreground/90 hover:bg-brand-gold/10 inline-flex items-center justify-center rounded-md border px-6 py-3 font-sans text-sm font-semibold sm:text-base"
          >
            Discover More
          </a>
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 pt-8 sm:grid-cols-3">
          <div className="space-y-1">
            <p className="text-foreground/50 font-sans text-xs tracking-[0.2em] uppercase">
              Opening
            </p>
            <p className="font-serif text-xl">2025</p>
          </div>
          <div className="space-y-1">
            <p className="text-foreground/50 font-sans text-xs tracking-[0.2em] uppercase">
              Location
            </p>
            <p className="font-serif text-xl">Hyderabad</p>
          </div>
          <div className="space-y-1">
            <p className="text-foreground/50 font-sans text-xs tracking-[0.2em] uppercase">
              Follow
            </p>
            <p className="font-serif text-xl">@galleriamall</p>
          </div>
        </div>
      </section>
    </main>
  );
}
