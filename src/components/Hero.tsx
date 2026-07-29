import { useState, useEffect, useRef } from 'react';
import { ArrowRight, MapPin, Navigation, Star, ShieldCheck, Users } from 'lucide-react';
import { fleet, contactInfo, type FleetVehicle } from '@/lib/data';

const POPULAR_ROUTES = [
  'Mysore → Coorg',
  'Mysore → Bangalore Airport',
  'Mysore → Ooty',
  'Mysore → Wayanad',
  'Mysore → Goa',
  'Mysore → Srirangapatna',
];

function FloatingBadge({ className, children, delay = 0 }: { className: string; children: React.ReactNode; delay?: number }) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-2xl glass-strong px-3 py-2 text-xs font-semibold shadow-deep ${className}`}
      style={{ animation: `float 4s ease-in-out ${delay}s infinite` }}
    >
      {children}
    </div>
  );
}

export default function Hero({ onBook }: { onBook: (prefill?: { pickup?: string; drop?: string; cabType?: string; tripType?: 'one_way' | 'round_trip' }) => void }) {
  const [pickup, setPickup] = useState('Mysore');
  const [drop, setDrop] = useState('');
  const [selectedCab, setSelectedCab] = useState<FleetVehicle>(fleet[1]);
  const [tripType, setTripType] = useState<'one_way' | 'round_trip'>('one_way');
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      const car = heroRef.current.querySelector('[data-hero-car]') as HTMLElement | null;
      if (car) car.style.transform = `translateY(${y * 0.15}px) rotate(${Math.sin(y * 0.01) * 2}deg)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleQuickBook = () => {
    onBook({ pickup, drop, cabType: selectedCab.id, tripType });
  };

  return (
    <section id="home" ref={heroRef} className="relative overflow-hidden bg-ink-950 pt-28 pb-20 lg:pt-36 lg:pb-32">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-40" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />

      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-2">
        {/* Left: copy + quote */}
        <div className="animate-slide-up">
          <div className="section-eyebrow mb-6">
            <Star className="h-3.5 w-3.5 fill-accent-300 text-accent-300" />
            Trusted since 2015 · 4.9/5 rating
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-white text-balance sm:text-5xl lg:text-6xl">
            Travel safe, travel smart with{' '}
            <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-accent-500 bg-clip-text text-transparent">
              Mythri Taxi
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-300">
            Mysore's most trusted outstation cab service. Verified drivers, transparent fares, and a cab for every journey — across Karnataka & South India.
          </p>

          {/* Quick quote widget */}
          <div className="mt-8 rounded-3xl glass-strong p-5 shadow-deep sm:p-6">
            <div className="mb-4 flex gap-2">
              {(['one_way', 'round_trip'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTripType(t)}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    tripType === t
                      ? 'bg-accent-400 text-primary-900'
                      : 'bg-white/5 text-ink-300 hover:bg-white/10'
                  }`}
                >
                  {t === 'one_way' ? 'One Way' : 'Round Trip'}
                </button>
              ))}
            </div>
            <div className="grid gap-3">
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-300" />
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Pickup location"
                  className="input-field pl-10"
                />
              </div>
              <div className="relative">
                <Navigation className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-300" />
                <input
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  placeholder="Drop location"
                  list="route-list"
                  className="input-field pl-10"
                />
                <datalist id="route-list">
                  {POPULAR_ROUTES.map((r) => (
                    <option key={r} value={r.split(' → ')[1]} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Cab selector */}
            <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide">
              {fleet.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedCab(v)}
                  className={`flex shrink-0 flex-col items-center gap-1 rounded-xl border px-3 py-2 transition-all ${
                    selectedCab.id === v.id
                      ? 'border-accent-400/60 bg-accent-400/10'
                      : 'border-white/10 bg-white/5 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs font-semibold text-white">{v.name}</span>
                  <span className="flex items-center gap-1 text-[10px] text-ink-400">
                    <Users className="h-3 w-3" /> {v.seats}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-ink-400">Starting fare</p>
                <p className="font-display text-2xl font-bold text-accent-300">
                  ₹{selectedCab.baseRate}
                  <span className="text-sm font-medium text-ink-400"> + ₹{selectedCab.perKm}/km</span>
                </p>
              </div>
              <button onClick={handleQuickBook} className="btn-primary">
                Book Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-400">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-success" /> Verified drivers</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-accent-300 text-accent-300" /> 4.9/5 rating</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-primary-300" /> 25,000+ travelers</span>
          </div>
        </div>

        {/* Right: 3D car visual */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div data-hero-car className="relative w-full max-w-lg transition-transform duration-75">
            {/* Glow ring */}
            <div className="absolute inset-0 -z-10 mx-auto h-72 w-72 self-center rounded-full bg-accent-400/20 blur-3xl" />

            {/* Car image card */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-2 shadow-deep">
              <img
                src={selectedCab.image}
                alt={selectedCab.name}
                className="aspect-[4/3] w-full rounded-3xl object-cover"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl glass-strong px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-400">{selectedCab.category}</p>
                  <p className="font-display text-lg font-bold text-white">{selectedCab.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-400">Seats</p>
                  <p className="font-bold text-accent-300">{selectedCab.seats}</p>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <FloatingBadge className="-left-4 top-6 sm:-left-8" delay={0.2}>
              <ShieldCheck className="h-4 w-4 text-success" />
              GPS Tracked
            </FloatingBadge>
            <FloatingBadge className="-right-2 top-1/3 sm:-right-6" delay={0.8}>
              <Star className="h-4 w-4 fill-accent-300 text-accent-300" />
              Top Rated
            </FloatingBadge>
            <FloatingBadge className="bottom-8 -left-2 sm:-left-6" delay={1.4}>
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
              24/7 Support
            </FloatingBadge>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
        <svg viewBox="0 0 1440 100" fill="none" className="h-16 w-full">
          <path d="M0 100L1440 100L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 100Z" fill="#0a2647" fillOpacity="0.4"/>
        </svg>
      </div>
    </section>
  );
}
