import { Booking } from '../types';

const STORAGE_KEY = 'massageatspa_confirmed_bookings';

const SEED_BOOKINGS: Booking[] = [
  {
    id: 'seed-1',
    bookingCode: 'SAGA-5821',
    spaId: 'saga-luxury-spa',
    spaName: 'Saga Luxury Spa',
    serviceId: 'saga-thai-traditional',
    serviceTitle: 'Traditional Thai Body Therapy',
    durationMinutes: 90,
    price: 2799,
    addonsTotal: 499,
    totalAmount: 3298,
    currency: '₹',
    date: '2026-11-15',
    timeSlot: '14:15',
    guestCount: 1,
    guestName: 'Rohit Kulkarni',
    guestEmail: 'rohit.kulkarni@example.com',
    guestPhone: '+91 98112 34567',
    therapistGender: 'no-preference',
    pressurePreference: 'firm',
    focusAreas: ['Neck & Shoulders', 'Lower Back'],
    allergiesOrMedicalNotes: 'Mild sensitivity to synthetic fragrances.',
    specialRequests: 'Quiet session preferred, please.',
    selectedAddOns: [
      {
        id: 'addon-hot-stones',
        name: 'Volcanic Hot Stones Enhancement',
        durationMinutes: 15,
        price: 499,
        description: 'Smooth heated volcanic basalt stones along spine and shoulders.',
      },
    ],
    status: 'confirmed',
    paymentMethod: 'pay-at-spa',
    createdAt: '2026-11-10T14:20:00Z',
  },
  {
    id: 'seed-2',
    bookingCode: 'SIGN-3914',
    spaId: 'signature-spa',
    spaName: 'Signature Spa',
    serviceId: 'sig-thai-herbal-compress',
    serviceTitle: 'Thai Herbal Potli & Acupressure Fusion',
    durationMinutes: 90,
    price: 2699,
    addonsTotal: 399,
    totalAmount: 3098,
    currency: '₹',
    date: '2026-11-18',
    timeSlot: '17:15',
    guestCount: 1,
    guestName: 'Ananya Sharma',
    guestEmail: 'ananya.sharma@example.com',
    guestPhone: '+91 98710 88234',
    therapistGender: 'female',
    pressurePreference: 'medium',
    focusAreas: ['Lower Back', 'Legs & Glutes'],
    specialRequests: 'Stiffness from long hours seated in Cyber City office.',
    selectedAddOns: [
      {
        id: 'addon-aromatherapy',
        name: 'Herbal Potli Compress / Botanical Oil',
        durationMinutes: 15,
        price: 399,
        description: 'Steamed Ayurvedic herbal pouch with camphor and turmeric.',
      },
    ],
    status: 'confirmed',
    paymentMethod: 'pay-at-spa',
    createdAt: '2026-11-11T09:45:00Z',
  },
];

export function getStoredBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BOOKINGS));
      return SEED_BOOKINGS;
    }
    const parsed = JSON.parse(raw);
    // If old USD seed exists, update to new INR seeds
    if (parsed.length > 0 && parsed[0].currency === '$') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_BOOKINGS));
      return SEED_BOOKINGS;
    }
    return parsed;
  } catch {
    return SEED_BOOKINGS;
  }
}

export function saveBooking(booking: Booking): void {
  try {
    const existing = getStoredBookings();
    const updated = [booking, ...existing.filter((b) => b.id !== booking.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to save booking to localStorage:', error);
  }
}

export function cancelBooking(id: string): void {
  try {
    const existing = getStoredBookings();
    const updated = existing.map((b) =>
      b.id === id ? { ...b, status: 'cancelled' as const } : b
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to cancel booking:', error);
  }
}

export function generateBookingCode(spaId: string): string {
  const prefix = spaId === 'saga-luxury-spa' ? 'SAGA' : 'SIGN';
  const num = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${num}`;
}
