import Image from "next/image";

export default function Header() {
  return (
    <header className="border-brand-gold/20 bg-brand-white/70 supports-[backdrop-filter]:bg-brand-white/60 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:h-20">
        <div className="flex items-baseline gap-2">
          <span className="inline-flex items-center gap-2 font-serif text-2xl tracking-tight">
            <Image
              className="h-10 w-auto"
              src="/PSRInfinity-LOGO.png"
              alt="PsrInfinity Mall logo"
              width={40}
              height={40}
            />
          </span>
          <span className="text-foreground/60 font-sans text-xs tracking-[0.2em] uppercase"></span>
        </div>
        {/* <nav className="flex items-center gap-6">
          <a
            className="text-foreground/70 hover:text-foreground font-sans text-xs tracking-[0.2em] uppercase"
            href="#"
          >
            EN
          </a>
          <span className="text-foreground/30">/</span>
          <a
            className="text-foreground/70 hover:text-foreground font-sans text-xs tracking-[0.2em] uppercase"
            href="#"
          >
            AR
          </a>
        </nav> */}
      </div>
    </header>
  );
}
