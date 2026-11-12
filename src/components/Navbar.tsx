import React from 'react';
import { Calendar, ShieldCheck, Sparkles, Building2, UserCheck } from 'lucide-react';
import { Booking } from '../types';

interface NavbarProps {
  onOpenBooking: (spaId?: 'saga-luxury-spa' | 'signature-spa', serviceId?: string) => void;
  onOpenMyBookings: () => void;
  onOpenConcierge: () => void;
  onOpenGiftVouchers: () => void;
  activeBookings: Booking[];
  conciergeMode: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyBookings,
  onOpenConcierge,
  onOpenGiftVouchers,
  activeBookings,
  conciergeMode,
}) => {
  const confirmedCount = activeBookings.filter((b) => b.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0e11]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group text-left">
            <div className="w-10 h-10 rounded-full border border-[#c59b6d]/40 flex items-center justify-center bg-[#15181c] group-hover:border-[#c59b6d] transition-colors">
              <Sparkles className="w-5 h-5 text-[#c59b6d]" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-luxury text-xl sm:text-2xl tracking-[0.2em] font-semibold text-white">
                  MASSAGE AT SPA
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-[#c59b6d] font-semibold px-2 py-0.5 rounded border border-[#c59b6d]/30 bg-[#c59b6d]/10">
                  PARTNER PLATFORM
                </span>
              </div>
              <p className="text-[11px] tracking-wider text-neutral-400 uppercase hidden sm:block">
                Exclusive Reservations: Saga Luxury Spa &amp; Signature Spa
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-neutral-300">
            <a href="#partners" className="hover:text-white transition-colors">
              Partner Spas
            </a>
            <a href="#treatments" className="hover:text-white transition-colors">
              Curated Treatments
            </a>
            <button
              type="button"
              onClick={onOpenGiftVouchers}
              className="hover:text-white transition-colors text-left"
            >
              Gift Vouchers
            </button>
            <a href="#amenities" className="hover:text-white transition-colors">
              Sanctuary Standards
            </a>
            <button
              type="button"
              onClick={onOpenConcierge}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider transition-colors ${
                conciergeMode
                  ? 'bg-[#c59b6d] text-black'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              CONCIERGE PORTAL
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenMyBookings}
              className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              aria-label="View my bookings"
            >
              <Calendar className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />
              <span className="hidden sm:inline">My Bookings</span>
              {confirmedCount > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-black bg-[#c59b6d] rounded-full">
                  {confirmedCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold tracking-wide uppercase text-black bg-gradient-to-r from-[#dec3a0] via-[#c59b6d] to-[#b38553] hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-[#c59b6d]/10"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Book a Visit</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
