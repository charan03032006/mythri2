import { BookingProvider, useBooking } from '@/lib/booking-context';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Fleet from '@/components/Fleet';
import Services from '@/components/Services';
import Destinations from '@/components/Destinations';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import WhatsAppButton from '@/components/WhatsAppButton';

function AppContent() {
  const { openBooking } = useBooking();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink-950">
      <Header onBook={() => openBooking()} />
      <main>
        <Hero onBook={(p) => openBooking(p)} />
        <Stats />
        <Fleet onBook={(p) => openBooking(p)} />
        <Services onBook={() => openBooking()} />
        <Destinations onBook={(p) => openBooking(p)} />
        <Pricing onBook={() => openBooking()} />
        <Testimonials />
      </main>
      <Footer onBook={() => openBooking()} />
      <BookingModal />
      <WhatsAppButton />
    </div>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
