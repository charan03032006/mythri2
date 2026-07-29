import { useEffect, useRef, useState } from 'react';
import { stats, features, type Stat } from '@/lib/data';

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function StatCard({ stat, visible }: { stat: Stat; visible: boolean }) {
  const Icon = stat.icon;
  const val = useCountUp(stat.value, 1800, visible);
  const display = stat.value % 1 === 0 ? Math.round(val).toLocaleString('en-IN') : val.toFixed(1);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent-400/30">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-400/5 blur-2xl" />
      <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-400/10">
        <Icon className="h-6 w-6 text-accent-300" />
      </div>
      <p className="font-display text-3xl font-bold text-white sm:text-4xl">
        {display}<span className="text-accent-300">{stat.suffix}</span>
      </p>
      <p className="mt-1 text-sm text-ink-300">{stat.label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 lg:py-20">
      <div className="absolute inset-0 bg-radial-fade opacity-50" />
      <div className="container-x relative z-10">
        <div ref={ref} className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.id} stat={s} visible={visible} />
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.id} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="shrink-0 rounded-xl bg-accent-400/10 p-2.5">
                  <Icon className="h-5 w-5 text-accent-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-ink-400">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
