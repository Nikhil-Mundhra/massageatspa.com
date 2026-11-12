import React, { useState } from 'react';
import { Calendar, Sparkles, Building2, Menu, X, ShieldCheck } from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const confirmedCount = activeBookings.filter((b) => b.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0c0e11]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo: Clean, single-line luxury typography */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group text-left">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#c59b6d]/40 flex items-center justify-center bg-[#15181c] group-hover:border-[#c59b6d] transition-colors">
              <Sparkles className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-lg sm:text-xl tracking-[0.2em] font-medium text-white whitespace-nowrap">
                MASSAGE AT SPA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links: Concise, single-line labels with ample spacing */}
          <nav className="hidden md:flex items-center space-x-7 lg:space-x-9 text-xs uppercase tracking-widest font-medium text-neutral-300">
            <a href="#partners" className="hover:text-white transition-colors whitespace-nowrap">
              Partner Spas
            </a>
            <a href="#treatments" className="hover:text-white transition-colors whitespace-nowrap">
              Treatments
            </a>
            <button
              type="button"
              onClick={onOpenGiftVouchers}
              className="hover:text-white transition-colors whitespace-nowrap uppercase tracking-widest text-xs font-medium"
            >
              Gift Cards
            </button>
            <a href="#amenities" className="hover:text-white transition-colors whitespace-nowrap">
              Standards
            </a>
          </nav>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Subtle Concierge Icon Button */}
            <button
              type="button"
              onClick={onOpenConcierge}
              title="Partner Concierge Desk"
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wider transition-colors ${
                conciergeMode
                  ? 'bg-[#c59b6d] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden lg:inline text-[11px] uppercase">Concierge</span>
            </button>

            {/* My Bookings Pill */}
            <button
              type="button"
              onClick={onOpenMyBookings}
              className="relative flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-medium text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors whitespace-nowrap"
              aria-label="View my bookings"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c59b6d]" aria-hidden="true" />
              <span>Bookings</span>
              {confirmedCount > 0 && (
                <span className="flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-black bg-[#c59b6d] rounded-full">
                  {confirmedCount}
                </span>
              )}
            </button>

            {/* Primary Action: Book a Visit */}
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold tracking-wider uppercase text-black bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#c59b6d]/15 whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Book Visit</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0d0f12] px-6 py-5 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
            <a
              href="#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors"
            >
              Partner Spas (Saga &amp; Signature)
            </a>
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors"
            >
              Treatment Menu
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGiftVouchers();
              }}
              className="text-left hover:text-white py-1 transition-colors"
            >
              Curate Gift Cards
            </button>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors"
            >
              Sanctuary Standards
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="text-left text-[#c59b6d] py-1 flex items-center gap-2 font-semibold text-xs tracking-wider uppercase"
            >
              <Building2 className="w-4 h-4" aria-hidden="true" />
              <span>Partner Concierge Portal</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
