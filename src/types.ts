export interface LocationInfo {
  address: string;
  city: string;
  district: string;
  landmark: string;
  phone: string;
  email: string;
  googleMapsUrl: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export interface ServiceAddOn {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  description: string;
}

export interface DurationPrice {
  minutes: number;
  price: number;
  originalPrice?: number;
}

export interface SpaService {
  id: string;
  spaId: 'saga-luxury-spa' | 'signature-spa';
  title: string;
  subtitle: string;
  category: 'Signature Rituals' | 'Therapeutic Massage' | 'Couples Sanctuary' | 'Body Exfoliation & Wraps' | 'Express Restoration';
  summary: string;
  fullDescription: string;
  durationOptions: DurationPrice[];
  image: string;
  intensity: 'Gentle & Calming' | 'Balanced Medium' | 'Deep Tissue & Firm' | 'Bespoke Pressure';
  benefits: string[];
  ritualSteps: string[];
  popular?: boolean;
  featured?: boolean;
}

export interface SpaPartner {
  id: 'saga-luxury-spa' | 'signature-spa';
  name: string;
  shortName: string;
  brandTagline: string;
  atmosphere: string;
  description: string;
  story: string;
  accentColor: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  currency: string;
  heroImage: string;
  gallery: {
    url: string;
    caption: string;
  }[];
  location: LocationInfo;
  amenities: Amenity[];
  operatingHours: {
    days: string;
    hours: string;
  }[];
  policies: {
    arrival: string;
    cancellation: string;
    attire: string;
  };
  highlights: string[];
}

export interface Booking {
  id: string;
  bookingCode: string;
  spaId: 'saga-luxury-spa' | 'signature-spa';
  spaName: string;
  serviceId: string;
  serviceTitle: string;
  durationMinutes: number;
  price: number;
  addonsTotal: number;
  totalAmount: number;
  currency: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // HH:MM
  guestCount: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  therapistGender: 'no-preference' | 'female' | 'male';
  pressurePreference: 'gentle' | 'medium' | 'firm' | 'deep';
  focusAreas: string[];
  allergiesOrMedicalNotes?: string;
  specialRequests?: string;
  selectedAddOns: ServiceAddOn[];
  status: 'confirmed' | 'rescheduled' | 'cancelled' | 'completed';
  paymentMethod: 'pay-at-spa' | 'online-hold';
  createdAt: string;
}

export interface ReviewItem {
  id: string;
  spaId: 'saga-luxury-spa' | 'signature-spa';
  author: string;
  city: string;
  rating: number;
  date: string;
  serviceName: string;
  comment: string;
  verifiedBooking: boolean;
}
