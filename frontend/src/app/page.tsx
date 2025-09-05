export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8 sm:p-16">
      <section className="w-full max-w-4xl space-y-8 text-center">
        <span className="bg-brand-gold inline-flex items-center rounded-full px-3 py-1 text-sm font-medium text-black">
          Coming Soon
        </span>

        <h1 className="font-serif text-5xl tracking-tight sm:text-7xl">Galleria Mall</h1>
        <p className="text-foreground/75 mx-auto max-w-2xl font-sans text-base sm:text-lg">
          We’re crafting an elevated retail destination. Be the first to know when doors open.
        </p>

        <div className="flex items-center justify-center gap-3">
          <a
            href="#"
            className="bg-cta text-brand-white focus-visible:ring-brand-gold inline-flex items-center justify-center rounded-md px-6 py-3 font-sans text-base font-semibold transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
          >
            Get Updates
          </a>
          <a
            href="#"
            className="border-brand-gold text-foreground/90 hover:bg-brand-gold/10 inline-flex items-center justify-center rounded-md border px-6 py-3 font-sans text-base font-semibold"
          >
            Learn More
          </a>
        </div>
      </section>
    </main>
  );
}
