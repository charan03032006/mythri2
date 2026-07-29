import { useEffect, useState } from 'react';
import { Menu, X, Phone, Car } from 'lucide-react';
import { navLinks, contactInfo } from '@/lib/data';

export default function Header({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 shadow-glow">
            <Car className="h-5 w-5 text-primary-900" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight text-white">Mythri Taxi</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-accent-300">Mysore</span>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-ink-200 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 md:inline-flex"
          >
            <Phone className="h-4 w-4 text-accent-300" />
            {contactInfo.phone}
          </a>
          <button
            onClick={onBook}
            className="hidden rounded-full bg-accent-400 px-5 py-2.5 text-sm font-semibold text-primary-900 shadow-glow transition-all hover:bg-accent-300 hover:scale-105 active:scale-95 sm:inline-flex"
          >
            Book Now
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 top-[64px] z-40 origin-top bg-ink-950/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="container-x flex flex-col gap-2 py-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-lg font-medium text-white transition-all hover:bg-white/10"
              style={{ animation: menuOpen ? `slide-up 0.4s ease-out ${i * 0.05}s both` : 'none' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-base font-semibold text-white"
          >
            <Phone className="h-5 w-5 text-accent-300" />
            {contactInfo.phone}
          </a>
          <button
            onClick={() => {
              setMenuOpen(false);
              onBook();
            }}
            className="inline-flex items-center justify-center rounded-2xl bg-accent-400 px-5 py-4 text-base font-semibold text-primary-900 shadow-glow"
          >
            Book Your Ride
          </button>
        </div>
      </div>
    </header>
  );
}
