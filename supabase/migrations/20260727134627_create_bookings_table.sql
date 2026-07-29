/*
# Create bookings table for Mythri Taxi

1. New Tables
- `bookings`
  - id (uuid, primary key)
  - booking_ref (text, unique human-readable reference e.g. MYTH-XXXXXX)
  - customer_name (text, not null)
  - phone (text, not null)
  - email (text, nullable)
  - pickup (text, not null)
  - drop_location (text, not null)
  - travel_date (timestamptz, not null)
  - cab_type (text, not null)
  - trip_type (text, not null, default 'one_way')
  - return_date (timestamptz, nullable)
  - special_requests (text, nullable)
  - estimated_fare (numeric, nullable)
  - status (text, not null, default 'pending')
  - created_at (timestamptz, default now())
2. Security
- Enable RLS on `bookings`.
- Allow anon + authenticated INSERT (customers book without signing in).
- Allow anon + authenticated SELECT (public booking lookup by ref) — intentionally shared.
- No update/delete from anon (admin-only via service role if needed later).
3. Notes
- booking_ref auto-generated via a trigger using a random 6-char code prefixed with MYTH-.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref text UNIQUE,
  customer_name text NOT NULL,
  phone text NOT NULL,
  email text,
  pickup text NOT NULL,
  drop_location text NOT NULL,
  travel_date timestamptz NOT NULL,
  cab_type text NOT NULL,
  trip_type text NOT NULL DEFAULT 'one_way',
  return_date timestamptz,
  special_requests text,
  estimated_fare numeric,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings" ON bookings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings" ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- booking_ref generator function
CREATE OR REPLACE FUNCTION generate_booking_ref()
RETURNS trigger AS $$
DECLARE
  ref text;
BEGIN
  ref := 'MYTH-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
  NEW.booking_ref := ref;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_booking_ref ON bookings;
CREATE TRIGGER set_booking_ref
BEFORE INSERT ON bookings
FOR EACH ROW
WHEN (NEW.booking_ref IS NULL)
EXECUTE FUNCTION generate_booking_ref();

CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON bookings (created_at DESC);
