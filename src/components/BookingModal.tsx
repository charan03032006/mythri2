import { useEffect, useState, type FormEvent } from 'react';
import { X, Check, Loader2, Phone, Calendar, Car, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import { fleet, tripTypeLabels, type TripType } from '@/lib/data';
import { createBooking, type Booking } from '@/lib/supabase';
import { useBooking } from '@/lib/booking-context';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const PHONE_RE = /^[+]?[0-9]{10,13}$/;

export default function BookingModal() {
  const { isOpen, closeBooking, prefill } = useBooking();
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<Booking | null>(null);

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    email: '',
    pickup: 'Mysore',
    drop_location: '',
    travel_date: '',
    cab_type: 'ertiga',
    trip_type: 'one_way' as TripType,
    return_date: '',
    special_requests: '',
  });

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setError('');
      setResult(null);
      setForm((f) => ({
        ...f,
        pickup: prefill.pickup || 'Mysore',
        drop_location: prefill.drop || '',
        cab_type: prefill.cabType || 'ertiga',
        trip_type: prefill.tripType || 'one_way',
      }));
    }
  }, [isOpen, prefill]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedCab = fleet.find((v) => v.id === form.cab_type) ?? fleet[0];
  const baseFare = selectedCab.baseRate;
  const estimatedFare = baseFare;

  const validate = () => {
    if (!form.customer_name.trim()) return 'Please enter your name';
    if (!PHONE_RE.test(form.phone.replace(/\s/g, ''))) return 'Enter a valid 10-digit phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email or leave it blank';
    if (!form.pickup.trim()) return 'Pickup location is required';
    if (!form.drop_location.trim()) return 'Drop location is required';
    if (!form.travel_date) return 'Travel date is required';
    if (form.trip_type === 'round_trip' && !form.return_date) return 'Return date is required for round trips';
    return '';
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setError('');
    try {
      const payload = {
        customer_name: form.customer_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        pickup: form.pickup.trim(),
        drop_location: form.drop_location.trim(),
        travel_date: new Date(form.travel_date).toISOString(),
        cab_type: form.cab_type,
        trip_type: form.trip_type,
        return_date: form.trip_type === 'round_trip' && form.return_date ? new Date(form.return_date).toISOString() : null,
        special_requests: form.special_requests.trim() || null,
        estimated_fare: estimatedFare,
      };
      const booking = await createBooking(payload);
      setResult(booking);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const handleClose = () => {
    closeBooking();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-md animate-fade-in"
        onClick={handleClose}
      />

      {/* Panel */}
      <div className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-ink-900 shadow-deep animate-slide-up sm:rounded-3xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-ink-900/90 px-6 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-400/15">
              <Car className="h-5 w-5 text-accent-300" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">Book your ride</h2>
              <p className="text-xs text-ink-400">Get instant confirmation on WhatsApp</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10"
            aria-label="Close booking"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {status === 'success' && result ? (
          <SuccessView booking={result} onClose={handleClose} />
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            {status === 'error' && error && (
              <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Trip type */}
            <div className="mb-5 flex gap-2">
              {(['one_way', 'round_trip'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, trip_type: t }))}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                    form.trip_type === t
                      ? 'bg-accent-400 text-primary-900'
                      : 'border border-white/10 bg-white/5 text-ink-300 hover:bg-white/10'
                  }`}
                >
                  {tripTypeLabels[t]}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="input-label">Full name *</label>
                <input
                  className="input-field"
                  value={form.customer_name}
                  onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))}
                  placeholder="e.g. Rajesh Kumar"
                />
              </div>
              <div>
                <label className="input-label">Phone number *</label>
                <input
                  className="input-field"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  placeholder="10-digit mobile"
                  inputMode="tel"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="input-label">Email (optional)</label>
                <input
                  className="input-field"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  inputMode="email"
                />
              </div>
              <div>
                <label className="input-label">Pickup *</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-300" />
                  <input
                    className="input-field pl-10"
                    value={form.pickup}
                    onChange={(e) => setForm((f) => ({ ...f, pickup: e.target.value }))}
                    placeholder="Pickup city"
                  />
                </div>
              </div>
              <div>
                <label className="input-label">Drop *</label>
                <div className="relative">
                  <ArrowRight className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-300" />
                  <input
                    className="input-field pl-10"
                    value={form.drop_location}
                    onChange={(e) => setForm((f) => ({ ...f, drop_location: e.target.value }))}
                    placeholder="Destination"
                  />
                </div>
              </div>
              <div>
                <label className="input-label">Travel date *</label>
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-300" />
                  <input
                    type="date"
                    className="input-field pl-10"
                    value={form.travel_date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setForm((f) => ({ ...f, travel_date: e.target.value }))}
                  />
                </div>
              </div>
              {form.trip_type === 'round_trip' && (
                <div>
                  <label className="input-label">Return date *</label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent-300" />
                    <input
                      type="date"
                      className="input-field pl-10"
                      value={form.return_date}
                      min={form.travel_date || new Date().toISOString().slice(0, 10)}
                      onChange={(e) => setForm((f) => ({ ...f, return_date: e.target.value }))}
                    />
                  </div>
                </div>
              )}
              <div className="sm:col-span-2">
                <label className="input-label">Select cab</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {fleet.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, cab_type: v.id }))}
                      className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                        form.cab_type === v.id
                          ? 'border-accent-400/60 bg-accent-400/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <p className="text-xs font-bold text-white">{v.name}</p>
                      <p className="text-[10px] text-ink-400">{v.seats} seats · ₹{v.baseRate}</p>
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="input-label">Special requests (optional)</label>
                <textarea
                  className="input-field min-h-[80px] resize-none"
                  value={form.special_requests}
                  onChange={(e) => setForm((f) => ({ ...f, special_requests: e.target.value }))}
                  placeholder="Child seat, extra stops, pickup time, etc."
                />
              </div>
            </div>

            {/* Fare estimate */}
            <div className="mt-5 flex items-center justify-between rounded-2xl border border-accent-400/20 bg-accent-400/5 px-5 py-4">
              <div>
                <p className="text-xs text-ink-400">Estimated starting fare</p>
                <p className="font-display text-2xl font-bold text-accent-300">₹{estimatedFare}</p>
                <p className="text-xs text-ink-400">+ ₹{selectedCab.perKm}/km · final fare confirmed on call</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-400">Cab</p>
                <p className="font-semibold text-white">{selectedCab.name}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="btn-primary mt-5 w-full disabled:opacity-60"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  Confirm Booking
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-ink-400">
              By booking you agree to our terms. No payment now — pay after the trip.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

function SuccessView({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  return (
    <div className="p-8 text-center">
      <div className="relative mx-auto mb-6 h-20 w-20">
        <span className="absolute inset-0 rounded-full bg-success/20 animate-pulse-ring" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-success">
          <Check className="h-10 w-10 text-white" strokeWidth={3} />
        </div>
      </div>
      <h3 className="font-display text-2xl font-bold text-white">Booking confirmed!</h3>
      <p className="mt-2 text-ink-300">Your ride is booked. Our team will call you shortly to confirm details.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs uppercase tracking-wider text-ink-400">Booking ref</span>
          <span className="font-display text-lg font-bold text-accent-300">{booking.booking_ref}</span>
        </div>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-400">Name</dt>
            <dd className="font-medium text-white">{booking.customer_name}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-400">Route</dt>
            <dd className="font-medium text-white">{booking.pickup} → {booking.drop_location}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-400">Cab</dt>
            <dd className="font-medium text-white">{booking.cab_type}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-400">Travel date</dt>
            <dd className="font-medium text-white">{new Date(booking.travel_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-400">Est. fare</dt>
            <dd className="font-medium text-accent-300">₹{booking.estimated_fare ?? '—'}</dd>
          </div>
        </dl>
      </div>

      <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-ink-300">
        <Phone className="h-4 w-4 text-accent-300" />
        Save your booking ref for future reference
      </p>

      <button onClick={onClose} className="btn-ghost mt-6 w-full">
        Done
      </button>
    </div>
  );
}
