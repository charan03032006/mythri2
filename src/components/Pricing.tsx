import { Check, Star, ArrowRight } from 'lucide-react';

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  unit: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

const localPlans: Plan[] = [
  {
    id: 'local-4',
    name: '4hr / 40km',
    tagline: 'Quick city trips',
    price: 1299,
    unit: 'package',
    features: ['Sedan or Ertiga', 'Within Mysore city', 'Driver fuel included', 'Extra km @ ₹16/km'],
    cta: 'Book local',
  },
  {
    id: 'local-8',
    name: '8hr / 80km',
    tagline: 'Full day rental',
    price: 2299,
    unit: 'package',
    features: ['Any cab up to Innova', 'Within Mysore + 30km', 'Driver fuel included', 'Extra hr @ ₹250/hr'],
    highlight: true,
    cta: 'Book full day',
  },
  {
    id: 'local-12',
    name: '12hr / 120km',
    tagline: 'Extended day',
    price: 3299,
    unit: 'package',
    features: ['Any cab in fleet', 'Mysore + outskirts', 'Driver fuel included', 'Extra km @ ₹16/km'],
    cta: 'Book extended',
  },
];

const outstationPlans: Plan[] = [
  {
    id: 'out-sedan',
    name: 'Sedan Outstation',
    tagline: 'Budget long trips',
    price: 13,
    unit: 'per km',
    features: ['4 seater AC', 'One-way or round', 'Driver allowance included', 'Tolls & parking extra'],
    cta: 'Book sedan',
  },
  {
    id: 'out-suv',
    name: 'Ertiga / SUV',
    tagline: 'Family comfort',
    price: 16,
    unit: 'per km',
    features: ['6 seater AC', 'One-way or round', 'Driver allowance included', 'Tolls & parking extra'],
    highlight: true,
    cta: 'Book SUV',
  },
  {
    id: 'out-innova',
    name: 'Innova Crysta',
    tagline: 'Premium travel',
    price: 19,
    unit: 'per km',
    features: ['7 seater AC', 'Captain seats', 'Driver allowance included', 'Tolls & parking extra'],
    cta: 'Book Innova',
  },
];

function PlanCard({ plan, onBook }: { plan: Plan; onBook: () => void }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-500 hover:-translate-y-1.5 ${
        plan.highlight
          ? 'border-accent-400/50 bg-gradient-to-b from-accent-400/10 to-transparent shadow-glow'
          : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      {plan.highlight && (
        <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-accent-400 px-3 py-1 text-[10px] font-bold uppercase text-primary-900">
          <Star className="h-3 w-3 fill-primary-900" />
 Best value
        </span>
      )}
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-300">{plan.tagline}</p>
      <h3 className="mt-1 font-display text-2xl font-bold text-white">{plan.name}</h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="font-display text-4xl font-bold text-white">₹{plan.price}</span>
        <span className="text-sm text-ink-400">/{plan.unit}</span>
      </div>
      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm text-ink-200">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15">
              <Check className="h-3 w-3 text-success" />
            </span>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={onBook}
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
          plan.highlight
            ? 'bg-accent-400 text-primary-900 hover:bg-accent-300 hover:scale-105'
            : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
        }`}
      >
        {plan.cta}
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function Pricing({ onBook }: { onBook: () => void }) {
  return (
    <section id="pricing" className="relative overflow-hidden bg-ink-950 py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -bottom-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />

      <div className="container-x relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="section-eyebrow mb-5">Transparent Pricing</div>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Fares with no hidden surprises
          </h2>
          <p className="mt-4 text-ink-300">
            Fixed local rental packages and per-km outstation rates. Driver allowance, fuel, and taxes included unless stated otherwise.
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-300">
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> No surge pricing</span>
          <span className="mx-2 h-1 w-1 rounded-full bg-ink-500" />
          <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-success" /> GST invoice available</span>
        </div>

        {/* Local rentals */}
        <div className="mt-14">
          <h3 className="mb-6 text-center font-display text-xl font-semibold text-accent-300">Local Rentals (Mysore)</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {localPlans.map((p) => (
              <PlanCard key={p.id} plan={p} onBook={onBook} />
            ))}
          </div>
        </div>

        {/* Outstation */}
        <div className="mt-16">
          <h3 className="mb-6 text-center font-display text-xl font-semibold text-accent-300">Outstation (per km)</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {outstationPlans.map((p) => (
              <PlanCard key={p.id} plan={p} onBook={onBook} />
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-ink-400">
          Need a custom quote for a group or multi-day tour? <button onClick={onBook} className="font-semibold text-accent-300 underline-offset-2 hover:underline">Get in touch</button>
        </p>
      </div>
    </section>
  );
}
