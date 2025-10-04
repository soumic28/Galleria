/* eslint-disable react/no-unescaped-entities */
/* eslint-disable prettier/prettier */
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-brand-gold">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
          <p className="text-foreground/70 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="bg-cta text-brand-white inline-flex items-center justify-center rounded-md px-6 py-3 font-sans text-sm font-semibold transition-all hover:opacity-90 hover:scale-105"
          >
            Return Home
          </Link>
          
          <div className="text-sm text-foreground/60">
            <Link href="/" className="underline hover:text-foreground">
              PSR Infinity Mall
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}