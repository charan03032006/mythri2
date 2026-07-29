import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '@/lib/data';

function TiltCard({ service, onBook }: { service: typeof services[number]; onBook: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = service.icon;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group preserve-3d relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-6 transition-all duration-300 hover:border-accent-400/30 hover:shadow-deep"
      style={{ background: undefined }}
    >
      <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${service.gradient} opacity-60`} />
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent-400/5 blur-2xl transition-opacity duration-500 group-hover:bg-accent-400/15" />

      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 shadow-card">
        <Icon className="h-7 w-7 text-accent-300" />
      </div>

      <h3 className="font-display text-xl font-bold text-white">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-300">{service.description}</p>

      <ul className="mt-4 space-y-1.5">
        {service.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-xs text-ink-200">
            <Check className="h-3.5 w-3.5 shrink-0 text-success" />
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onBook}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-300 transition-all hover:gap-2.5 hover:text-accent-200"
      >
        Book this service
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function Services({ onBook }: { onBook: () => void }) {
  return (
    <section id="services" className="relative bg-ink-950 py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-eyebrow mb-5">What We Offer</div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Services built around your travel needs
          </h2>
          <p className="mt-4 text-ink-300">
            Whether it's a quick airport drop, a weekend in Coorg, or a 12-seat group pilgrimage — we have a service and a cab for it.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <TiltCard key={s.id} service={s} onBook={onBook} />
          ))}
        </div>
      </div>
    </section>
  );
}
