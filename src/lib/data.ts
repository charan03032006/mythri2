import type { LucideIcon } from 'lucide-react';
import sedanImg from '@/assets/images/images_(3).jpg';
import ertigaImg from '@/assets/images/images_(4).jpg';
import innovaImg from '@/assets/images/images_(5).jpg';
import tempoImg from '@/assets/images/images_(7).jpg';
import {
  MapPin,
  Plane,
  Building2,
  Camera,
  Users,
  Package,
  Clock,
  ShieldCheck,
  Wallet,
  PhoneCall,
} from 'lucide-react';

export type FleetVehicle = {
  id: string;
  name: string;
  category: string;
  seats: number;
  bags: number;
  ac: boolean;
  baseRate: number;
  perKm: number;
  color: string;
  accent: string;
  features: string[];
  image: string;
  popular?: boolean;
};

export const fleet: FleetVehicle[] = [
  {
    id: 'sedan',
    name: 'Sedan',
    category: 'Hatchback/Sedan',
    seats: 4,
    bags: 2,
    ac: true,
    baseRate: 299,
    perKm: 13,
    color: '#1f5ce8',
    accent: '#599dff',
    features: ['AC', '4 Seater', 'Bluetooth Audio', 'First Aid Kit'],
    image: sedanImg,
  },
  {
    id: 'ertiga',
    name: 'Maruti Ertiga',
    category: 'SUV',
    seats: 6,
    bags: 3,
    ac: true,
    baseRate: 399,
    perKm: 16,
    color: '#0f3460',
    accent: '#8ec1ff',
    features: ['AC', '6 Seater', 'Spacious Legroom', 'Roof Rack'],
    image: ertigaImg,
    popular: true,
  },
  {
    id: 'innova',
    name: 'Innova Crysta',
    category: 'Premium SUV',
    seats: 7,
    bags: 4,
    ac: true,
    baseRate: 549,
    perKm: 19,
    color: '#0a2647',
    accent: '#f4b860',
    features: ['AC', '7 Seater', 'Premium Leather', 'Captain Seats', 'Charging Port'],
    image: tempoImg,
  },
  {
    id: 'tempo',
    name: 'Tempo Traveller',
    category: 'Group Travel',
    seats: 12,
    bags: 8,
    ac: true,
    baseRate: 899,
    perKm: 24,
    color: '#2d2d2d',
    accent: '#ffd34d',
    features: ['AC', '12 Seater', 'Pushback Seats', 'Ample Luggage', 'Music System'],
    image: innovaImg,
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  gradient: string;
};

export const services: Service[] = [
  {
    id: 'outstation',
    title: 'Outstation Cabs',
    description: 'One-way and round-trip outstation taxi service across Karnataka, Tamil Nadu, Kerala & Andhra.',
    icon: MapPin,
    features: ['One-way drops', 'Round trips', 'Multi-city tours', 'Driver allowance included'],
    gradient: 'from-primary-500/20 to-primary-700/10',
  },
  {
    id: 'airport',
    title: 'Airport Transfers',
    description: 'On-time pickup & drop to Mysore, Bangalore, Coimbatore and Calicut airports with flight tracking.',
    icon: Plane,
    features: ['Flight delay tracking', 'Free waiting 45 min', 'Meet & greet', 'Fixed pricing'],
    gradient: 'from-accent-400/20 to-accent-600/10',
  },
  {
    id: 'local',
    title: 'Local Rentals',
    description: 'Hourly rentals for shopping, meetings, or a full day around Mysore with a dedicated driver.',
    icon: Building2,
    features: ['4hr/40km package', '8hr/80km package', 'Flexible stops', 'Knowledgeable drivers'],
    gradient: 'from-success/20 to-success/5',
  },
  {
    id: 'sightseeing',
    title: 'Sightseeing Tours',
    description: 'Curated Mysore tour packages covering palace, zoo, Chamundi Hill, Srirangapatna & more.',
    icon: Camera,
    features: ['Custom itineraries', 'Local guides', 'Photo stops', 'Family friendly'],
    gradient: 'from-primary-400/20 to-accent-500/10',
  },
  {
    id: 'group',
    title: 'Group & Corporate',
    description: 'Tempo Travellers and mini-buses for weddings, corporate offsites, college tours & pilgrimages.',
    icon: Users,
    features: ['12-17 seater', 'Bulk discounts', 'GST invoice', 'Dedicated coordinator'],
    gradient: 'from-accent-500/20 to-primary-600/10',
  },
  {
    id: 'packages',
    title: 'Tour Packages',
    description: 'All-inclusive multi-day packages to Coorg, Ooty, Wayanad, Goa, Kerala with stay & cab.',
    icon: Package,
    features: ['Hotel + Cab bundled', 'Fixed price', 'Customizable', 'Experienced drivers'],
    gradient: 'from-primary-600/20 to-success/5',
  },
];

export type Destination = {
  id: string;
  name: string;
  state: string;
  distanceKm: number;
  travelHours: number;
  startingPrice: number;
  image: string;
  highlights: string[];
};

export const destinations: Destination[] = [
  {
    id: 'bangalore',
    name: 'Bangalore',
    state: 'Karnataka',
    distanceKm: 145,
    travelHours: 3,
    startingPrice: 2499,
    image: '/places/banga.jpg',
    highlights: ['Tech parks', 'Lalbagh', 'MG Road', 'UB City'],
  },
  {
    id: 'coorg',
    name: 'Coorg',
    state: 'Karnataka',
    distanceKm: 120,
    travelHours: 3,
    startingPrice: 2999,
    image: '/places/coorg.jpg',
    highlights: ['Coffee estates', 'Abbey Falls', 'Dubare Elephant Camp', 'Namdroling Monastery'],
  },
  {
    id: 'ooty',
    name: 'Ooty',
    state: 'Tamil Nadu',
    distanceKm: 240,
    travelHours: 6,
    startingPrice: 4499,
    image: '/places/ooty.jpg',
    highlights: ['Botanical Garden', 'Doddabetta Peak', 'Toy Train', 'Ooty Lake'],
  },
  {
    id: 'wayanad',
    name: 'Wayanad',
    state: 'Kerala',
    distanceKm: 210,
    travelHours: 5,
    startingPrice: 3999,
    image: 'https://images.pexels.com/photos/1437903/pexels-photo-1437903.jpeg?auto=compress&cs=tinysrgb&w=1200',
    highlights: ['Edakkal Caves', 'Banasura Sagar', 'Wildlife Sanctuary', 'Tea gardens'],
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    distanceKm: 580,
    travelHours: 11,
    startingPrice: 9999,
    image: '/places/goa.jpg',
    highlights: ['Beaches', 'Old Goa churches', 'Fort Aguada', 'Night markets'],
  },
  {
    id: 'kerala',
    name: 'Munnar',
    state: 'Kerala',
    distanceKm: 410,
    travelHours: 9,
    startingPrice: 7499,
    image: '/places/munnar.jpg',
    highlights: ['Tea plantations', 'Eravikulam Park', 'Mattupetty Dam', 'Top Station'],
  },
];

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  trip: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Kumar',
    location: 'Mysore',
    rating: 5,
    text: 'Booked an Innova for a Coorg trip. Driver was punctual, cab was spotless, and the fare was exactly as quoted. No hidden charges at all.',
    trip: 'Mysore → Coorg (Round trip)',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't2',
    name: 'Priya Nair',
    location: 'Bangalore',
    rating: 5,
    text: 'Airport pickup at 4 AM was on the dot. Got flight delay updates from the driver before I even landed. Will book again.',
    trip: 'Bangalore Airport → Mysore',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't3',
    name: 'Mohammed Irfan',
    location: 'Mysore',
    rating: 5,
    text: 'Took 12 family members to Ooty in the Tempo Traveller. Super comfortable, AC worked great, driver knew all the viewpoints.',
    trip: 'Mysore → Ooty (Group tour)',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't4',
    name: 'Anita Rao',
    location: 'Chennai',
    rating: 5,
    text: 'The Mysore sightseeing package covered palace, zoo, Chamundi Hill and Srirangapatna in one day. Driver was also a great guide.',
    trip: 'Mysore Local Sightseeing',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: 't5',
    name: 'Sunil Gowda',
    location: 'Mysore',
    rating: 5,
    text: 'Use Mythri for all my client visits. GST invoice comes on WhatsApp instantly, drivers are professional. Best corporate cab in Mysore.',
    trip: 'Local Rental (8hr/80km)',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export type Stat = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
};

export const stats: Stat[] = [
  { id: 'customers', value: 25000, suffix: '+', label: 'Happy Travelers', icon: Users },
  { id: 'cabs', value: 120, suffix: '+', label: 'Cabs in Fleet', icon: Package },
  { id: 'years', value: 9, suffix: '+', label: 'Years of Service', icon: Clock },
  { id: 'rating', value: 4.9, suffix: '/5', label: 'Customer Rating', icon: ShieldCheck },
];

export type Feature = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    id: 'verified',
    title: 'Verified Drivers',
    description: 'Police-verified, background-checked drivers with 5+ years experience.',
    icon: ShieldCheck,
  },
  {
    id: 'transparent',
    title: 'Transparent Pricing',
    description: 'Exact fare quoted upfront. No surge, no hidden charges, no surprises.',
    icon: Wallet,
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Real humans on call anytime — before, during, and after your trip.',
    icon: PhoneCall,
  },
  {
    id: 'ontime',
    title: 'On-Time Guarantee',
    description: 'Driver arrives 10 min before pickup. Late? Your ride is on us.',
    icon: Clock,
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Services', href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
];

export const contactInfo = {
  phone: '+91 98450 12345',
  phoneRaw: '+919845012345',
  whatsapp: '+91 98450 12345',
  email: 'bookings@mythritaxi.in',
  address: 'Hebbal Industrial Area, Mysore, Karnataka 570016',
  hours: 'Open 24 hours, 7 days a week',
};

export type TripType = 'one_way' | 'round_trip';

export const tripTypeLabels: Record<TripType, string> = {
  one_way: 'One Way',
  round_trip: 'Round Trip',
};
