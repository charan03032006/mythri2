import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

export type Booking = {
  id: string;
  booking_ref: string;
  customer_name: string;
  phone: string;
  email: string | null;
  pickup: string;
  drop_location: string;
  travel_date: string;
  cab_type: string;
  trip_type: 'one_way' | 'round_trip';
  return_date: string | null;
  special_requests: string | null;
  estimated_fare: number | null;
  status: string;
  created_at: string;
};

export type BookingInput = {
  customer_name: string;
  phone: string;
  email?: string | null;
  pickup: string;
  drop_location: string;
  travel_date: string;
  cab_type: string;
  trip_type: 'one_way' | 'round_trip';
  return_date?: string | null;
  special_requests?: string | null;
  estimated_fare?: number;
};

export async function createBooking(input: BookingInput) {
  const { data, error } = await supabase
    .from('bookings')
    .insert(input)
    .select()
    .maybeSingle();

  if (error) throw error;
  return data as Booking;
}

export async function fetchBookingByRef(ref: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('booking_ref', ref.toUpperCase())
    .maybeSingle();

  if (error) throw error;
  return data as Booking | null;
}
