export default function Footer() {
  return (
    <footer className="border-brand-gold/20 border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-foreground/60 text-sm">© {new Date().getFullYear()} Galleria Mall</p>
        <div className="flex items-center gap-4">
          <a aria-label="Instagram" className="text-foreground/60 hover:text-foreground" href="#">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </a>
          <a aria-label="Facebook" className="text-foreground/60 hover:text-foreground" href="#">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 9h3V6h-3a3 3 0 00-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9a1 1 0 011-1z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a aria-label="X" className="text-foreground/60 hover:text-foreground" href="#">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3l8.5 10.5L3 21h3.5l6-6.7L18.5 21H21l-8.5-10.5L21 3h-3.5L12 9.7 7.5 3H3z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
