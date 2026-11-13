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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Brand Logo: Fluid luxury typography that scales from 320px to ultrawide */}
          <a href="#" className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 group text-left">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl border border-[#c59b6d]/40 flex items-center justify-center bg-[#15181c] group-hover:border-[#c59b6d] transition-colors shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c59b6d]" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-xs min-[360px]:text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.1em] sm:tracking-[0.18em] font-medium text-white whitespace-nowrap">
                MASSAGE AT SPA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links: Visible from 1024px (lg) and up with fluid spacing */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-8 text-xs uppercase tracking-widest font-medium text-neutral-300">
            <a href="#partners" className="hover:text-[#c59b6d] transition-colors whitespace-nowrap">
              Partner Spas
            </a>
            <a href="#treatments" className="hover:text-[#c59b6d] transition-colors whitespace-nowrap">
              Treatments
            </a>
            <button
              type="button"
              onClick={onOpenGiftVouchers}
              className="hover:text-[#c59b6d] transition-colors whitespace-nowrap uppercase tracking-widest text-xs font-medium"
            >
              Gift Cards
            </button>
            <a href="#amenities" className="hover:text-[#c59b6d] transition-colors whitespace-nowrap">
              <span className="hidden xl:inline">Sanctuary </span>Standards
            </a>
          </nav>

          {/* Right Action Elements: Fluid scaling across all screen sizes */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Subtle Concierge Icon Button (Desktop XL 1280px+ only) */}
            <button
              type="button"
              onClick={onOpenConcierge}
              title="Partner Concierge Desk"
              className={`hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium tracking-wider transition-colors ${
                conciergeMode
                  ? 'bg-[#c59b6d] text-black font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="text-[11px] uppercase">Concierge</span>
            </button>

            {/* My Bookings Control: Compact icon button on mobile, labeled button on sm+ */}
            <button
              type="button"
              onClick={onOpenMyBookings}
              className="relative flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium text-neutral-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors whitespace-nowrap"
              aria-label="View my bookings"
            >
              <Calendar className="w-4 h-4 sm:w-3.5 sm:h-3.5 text-[#c59b6d]" aria-hidden="true" />
              <span className="hidden sm:inline">Bookings</span>
              {confirmedCount > 0 && (
                <span className="flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-black bg-[#c59b6d] rounded sm:static absolute -top-1 -right-1 shadow-sm">
                  {confirmedCount}
                </span>
              )}
            </button>

            {/* Primary Action: Book a Visit */}
            <button
              type="button"
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#c59b6d]/15 whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5 hidden min-[480px]:inline" aria-hidden="true" />
              <span>Book<span className="hidden min-[480px]:inline"> Visit</span></span>
            </button>

            {/* Responsive Menu Toggle (Visible below lg / 1024px) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
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

      {/* Drawer Menu for Tablet and Mobile (Accessible below lg, scrollable on any height) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d0f12]/98 backdrop-blur-xl px-5 sm:px-8 py-5 space-y-4 max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
            <a
              href="#partners"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors flex items-center justify-between"
            >
              <span>Partner Spas</span>
              <span className="text-[11px] text-[#c59b6d] font-normal">Saga &amp; Signature</span>
            </a>
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors"
            >
              Curated Treatments Menu
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGiftVouchers();
              }}
              className="text-left hover:text-white py-1 transition-colors flex items-center justify-between"
            >
              <span>Gift Cards &amp; Vouchers</span>
              <span className="text-[10px] text-[#c59b6d] border border-[#c59b6d]/30 px-1.5 py-0.5 rounded">₹1,500+</span>
            </button>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white py-1 transition-colors"
            >
              Sanctuary Hygiene Standards
            </a>

            <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyBookings();
                }}
                className="text-left py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-white flex items-center justify-between transition-colors text-xs font-medium"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#c59b6d]" />
                  <span>View My Reservations</span>
                </div>
                {confirmedCount > 0 && (
                  <span className="min-w-4 h-4 px-1.5 text-[10px] font-bold text-black bg-[#c59b6d] rounded flex items-center justify-center">
                    {confirmedCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="py-2.5 px-4 rounded-xl text-xs font-bold tracking-wider uppercase text-black bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] hover:brightness-110 transition-all text-center flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Book an Appointment</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConcierge();
                }}
                className="text-left text-[#c59b6d] py-1.5 px-3 rounded-xl hover:bg-white/[0.04] flex items-center gap-2 font-semibold text-xs tracking-wider uppercase transition-colors"
              >
                <Building2 className="w-4 h-4" aria-hidden="true" />
                <span>Partner Concierge Portal</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
