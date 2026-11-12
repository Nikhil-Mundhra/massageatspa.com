import { Booking } from '../types';

const STORAGE_KEY = 'massageatspa_confirmed_bookings';

const SEED_BOOKINGS: Booking[] = [
  {
    id: 'seed-1',
    bookingCode: 'SAGA-5821',
    spaId: 'saga-luxury-spa',
    spaName: 'Saga Luxury Spa',
    serviceId: 'saga-royal-hot-stone',
    serviceTitle: 'Imperial Volcanic Hot Stone Ritual',
    durationMinutes: 90,
    price: 210,
    addonsTotal: 35,
    totalAmount: 245,
    currency: '$',
    date: '2026-11-15',
    timeSlot: '14:30',
    guestCount: 1,
    guestName: 'Julian Sterling',
    guestEmail: 'julian.sterling@example.com',
    guestPhone: '+1 (555) 234-8901',
    therapistGender: 'no-preference',
    pressurePreference: 'firm',
    focusAreas: ['Neck & Shoulders', 'Lower Back'],
    allergiesOrMedicalNotes: 'Mild sensitivity to eucalyptus scent.',
    specialRequests: 'Quiet session preferred, please.',
    selectedAddOns: [
      {
        id: 'addon-hot-stones',
        name: 'Volcanic Hot Stones Enhancement',
        durationMinutes: 15,
        price: 35,
        description: 'Smooth heated basalt stones applied along tension points.',
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
    serviceTitle: 'Herbal Compress & Acupressure Fusion',
    durationMinutes: 90,
    price: 175,
    addonsTotal: 25,
    totalAmount: 200,
    currency: '$',
    date: '2026-11-18',
    timeSlot: '17:00',
    guestCount: 1,
    guestName: 'Aria Montgomery',
    guestEmail: 'aria.m@example.com',
    guestPhone: '+1 (555) 781-9923',
    therapistGender: 'female',
    pressurePreference: 'medium',
    focusAreas: ['Lower Back', 'Legs & Glutes'],
    specialRequests: 'Post-flight stiffness from international travel.',
    selectedAddOns: [
      {
        id: 'addon-aromatherapy',
        name: 'Custom Organic Aromatherapy Blend',
        durationMinutes: 0,
        price: 25,
        description: 'Wildcrafted botanical oils for muscle revival.',
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
    return JSON.parse(raw);
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
