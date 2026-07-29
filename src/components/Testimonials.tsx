import { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const active = testimonials[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-primary-900 py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-eyebrow mb-5">Traveler Stories</div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Loved by 25,000+ travelers
          </h2>
        </div>

        <div
          className="relative mx-auto mt-12 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-12">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-white/5" />
            <div className="flex gap-1">
              {Array.from({ length: active.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent-300 text-accent-300" />
              ))}
            </div>
            <p className="mt-5 font-display text-xl leading-relaxed text-white sm:text-2xl">
              "{active.text}"
            </p>
            <div className="mt-6 flex items-center gap-4">
              <img src={active.avatar} alt={active.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-accent-400/40" />
              <div>
                <p className="font-semibold text-white">{active.name}</p>
                <p className="text-sm text-ink-300">{active.location} · {active.trip}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:bg-white/10"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-8 bg-accent-400' : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all hover:bg-white/10"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
