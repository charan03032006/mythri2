import { useEffect, useRef, useState } from 'react';
import { Users, Briefcase, Snowflake, Check, Star, ArrowRight } from 'lucide-react';
import { fleet, type FleetVehicle } from '@/lib/data';

export default function Fleet({ onBook }: { onBook: (prefill?: { cabType?: string }) => void }) {
  const [active, setActive] = useState<FleetVehicle>(fleet[1]);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startRotation = useRef(0);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const delta = clientX - startX.current;
      setRotation(startRotation.current + delta * 0.5);
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging]);

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startRotation.current = rotation;
  };

  return (
    <section id="fleet" className="relative overflow-hidden bg-primary-900 py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-accent-400/10 blur-3xl" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-eyebrow mb-5">Our Fleet</div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            A cab for every journey
          </h2>
          <p className="mt-4 text-ink-300">
            From budget sedans to premium Innovas and group travellers — all AC, sanitized, and driven by verified chauffeurs.
          </p>
        </div>

        {/* Cab selector tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {fleet.map((v) => (
            <button
              key={v.id}
              onClick={() => setActive(v)}
              className={`group relative rounded-2xl border px-5 py-3 text-left transition-all duration-300 ${
                active.id === v.id
                  ? 'border-accent-400/60 bg-accent-400/10 shadow-glow'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {v.popular && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-accent-400 px-2 py-0.5 text-[10px] font-bold uppercase text-primary-900">
                  Popular
                </span>
              )}
              <p className="text-sm font-bold text-white">{v.name}</p>
              <p className="text-xs text-ink-400">{v.category}</p>
            </button>
          ))}
        </div>

        {/* Active vehicle display */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
          {/* 360 viewer */}
          <div
            className="relative aspect-[4/3] cursor-grab select-none overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent active:cursor-grabbing"
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <img
              src={active.image}
              alt={active.name}
              draggable={false}
              className="h-full w-full object-cover transition-transform duration-200"
              style={{ transform: `perspective(1000px) rotateY(${rotation}deg) scale(1.05)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="rounded-full glass-strong px-3 py-1.5 text-xs font-semibold text-white">
                Drag to rotate 360°
              </div>
              <div className="flex items-center gap-1 rounded-full glass-strong px-3 py-1.5 text-xs font-semibold text-white">
                <Star className="h-3 w-3 fill-accent-300 text-accent-300" />
                {active.seats} seater
              </div>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="font-display text-3xl font-bold text-white">{active.name}</h3>
            <p className="mt-1 text-ink-300">{active.category} · AC</p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <Users className="mx-auto h-5 w-5 text-accent-300" />
                <p className="mt-2 text-2xl font-bold text-white">{active.seats}</p>
                <p className="text-xs text-ink-400">Seats</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <Briefcase className="mx-auto h-5 w-5 text-accent-300" />
                <p className="mt-2 text-2xl font-bold text-white">{active.bags}</p>
                <p className="text-xs text-ink-400">Bags</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <Snowflake className="mx-auto h-5 w-5 text-accent-300" />
                <p className="mt-2 text-2xl font-bold text-white">AC</p>
                <p className="text-xs text-ink-400">Cooling</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-300">Features</p>
              <div className="flex flex-wrap gap-2">
                {active.features.map((f) => (
                  <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-ink-200">
                    <Check className="h-3.5 w-3.5 text-success" />
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-end justify-between rounded-2xl border border-accent-400/20 bg-accent-400/5 p-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-400">Starting fare</p>
                <p className="font-display text-3xl font-bold text-accent-300">
                  ₹{active.baseRate}
                </p>
                <p className="text-xs text-ink-400">+ ₹{active.perKm}/km · driver allowance included</p>
              </div>
              <button onClick={() => onBook({ cabType: active.id })} className="btn-primary">
                Book {active.name}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
