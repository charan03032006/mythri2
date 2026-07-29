import { useState } from 'react';
import { Clock, MapPin, ArrowRight, Star } from 'lucide-react';
import { destinations } from '@/lib/data';

export default function Destinations({ onBook }: { onBook: (prefill?: { drop?: string }) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="destinations" className="relative overflow-hidden bg-primary-950 py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-1/3 -right-32 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />

      <div className="container-x relative z-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <div className="section-eyebrow mb-5">Popular Routes</div>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Where will you go next?
            </h2>
            <p className="mt-4 text-ink-300">
              Curated outstation routes from Mysore with fixed starting fares. Pick a destination and we'll handle the rest.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-ink-200">
            <MapPin className="h-4 w-4 text-accent-300" />
            Starting from Mysore
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d) => (
            <article
              key={d.id}
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent-400/30 hover:shadow-deep"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full glass-strong px-3 py-1.5 text-xs font-semibold text-white">
                  <Star className="h-3 w-3 fill-accent-300 text-accent-300" />
                  {d.state}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-2xl font-bold text-white">{d.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-ink-300">
                    <Clock className="h-3.5 w-3.5" />
                    {d.distanceKm} km · {d.travelHours} hr from Mysore
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-1.5">
                  {d.highlights.map((h) => (
                    <span key={h} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-ink-200">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-ink-400">Starting from</p>
                    <p className="font-display text-xl font-bold text-accent-300">₹{d.startingPrice}</p>
                  </div>
                  <button
                    onClick={() => onBook({ drop: d.name })}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      hovered === d.id
                        ? 'bg-accent-400 text-primary-900'
                        : 'border border-white/15 bg-white/5 text-white'
                    }`}
                  >
                    Book trip
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
