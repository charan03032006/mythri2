import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type BookingContextValue = {
  isOpen: boolean;
  prefill: { cabType?: string; tripType?: 'one_way' | 'round_trip'; pickup?: string; drop?: string };
  openBooking: (prefill?: BookingContextValue['prefill']) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookingContextValue['prefill']>({});

  const openBooking = useCallback((p: BookingContextValue['prefill'] = {}) => {
    setPrefill(p);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setPrefill({});
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, prefill, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
