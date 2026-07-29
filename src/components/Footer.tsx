import { useState, type FormEvent } from 'react';
import { Car, Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Send, Check } from 'lucide-react';
import { contactInfo, navLinks } from '@/lib/data';

export default function Footer({ onBook }: { onBook: () => void }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="relative overflow-hidden bg-ink-950 pt-20">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />

      {/* CTA strip */}
      <div className="container-x relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-accent-400/20 bg-gradient-to-br from-primary-800/40 to-accent-400/10 p-8 text-center sm:p-12">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent-400/20 blur-3xl" />
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Ready to hit the road?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-300">
            Book your cab in under a minute. Pay after the trip. Travel with Mysore's most trusted drivers.
          </p>
          <button onClick={onBook} className="btn-primary mt-6">
            Book your ride now
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-x relative z-10 mt-16 grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-400 to-accent-600 shadow-glow">
              <Car className="h-5 w-5 text-primary-900" strokeWidth={2.5} />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-white">Mythri Taxi</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent-300">Mysore</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-400">
            Safe, affordable, GPS-tracked cab service in Mysore since 2015. Outstation, airport, local rentals & sightseeing.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-300 transition-all hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Quick links</h4>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-ink-400 transition-colors hover:text-accent-300">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-ink-400">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
              <a href={`tel:${contactInfo.phoneRaw}`} className="hover:text-white">{contactInfo.phone}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-white">{contactInfo.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-300" />
              <span>{contactInfo.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Travel deals</h4>
          <p className="mt-4 text-sm text-ink-400">Get route discounts and seasonal offers in your inbox.</p>
          <form onSubmit={handleSubscribe} className="mt-4">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="input-field"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-accent-400 px-4 text-primary-900 transition-all hover:bg-accent-300"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
            {subscribed && (
              <p className="mt-2 text-xs text-success">Subscribed! Watch out for deals.</p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="container-x flex flex-col items-center justify-between gap-3 text-xs text-ink-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Mythri Taxi. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-ink-300">Privacy</a>
            <a href="#" className="hover:text-ink-300">Terms</a>
            <a href="#" className="hover:text-ink-300">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
