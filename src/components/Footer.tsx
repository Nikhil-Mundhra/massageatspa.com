import React from 'react';
import { Sparkles, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';
import { SPA_PARTNERS } from '../data/spas';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenGiftVouchers: () => void;
  onOpenConcierge: () => void;
  onSelectPartner: (id: 'saga-luxury-spa' | 'signature-spa') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenGiftVouchers,
  onOpenConcierge,
  onSelectPartner,
}) => {
  return (
    <footer className="border-t border-white/10 bg-[#08090b] text-neutral-400 text-xs">
      {/* Top Banner CTA */}
      <div className="border-b border-white/10 py-12 bg-gradient-to-b from-transparent to-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
            Begin Your Sanctuary Retreat
          </span>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-medium mt-2 mb-4">
            Reserve Your Visit at Saga Luxury Spa or Signature Spa
          </h3>
          <p className="text-neutral-300 max-w-xl mx-auto text-xs sm:text-sm mb-6">
            Private thermal steam facilities, certified master therapists, and bespoke bodywork
            designed for complete mental and physical restoration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] hover:brightness-110 transition-all shadow-lg shadow-[#c59b6d]/20"
            >
              Book an Appointment
            </button>
            <button
              type="button"
              onClick={onOpenGiftVouchers}
              className="px-6 py-3 rounded-xl text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Gift a Spa Visit
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Locations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#c59b6d]/40 flex items-center justify-center bg-[#15181c]">
                <Sparkles className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />
              </div>
              <span className="font-serif-luxury text-xl font-semibold tracking-wider text-white">
                MASSAGE AT SPA
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              The premier reservation platform connecting discerning guests directly with accredited
              luxury spa destinations. Curating elevated bodywork and thermal wellness.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenConcierge}
                className="text-xs text-[#c59b6d] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Partner Concierge Portal Access</span>
              </button>
            </div>
          </div>

          {/* Partner 1: Saga Luxury Spa */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-luxury text-base font-semibold">
              Saga Luxury Spa
            </h4>
            <p className="text-[11px] text-neutral-400">
              Luxury thermal suites, authentic Thai massage, and private steam chambers on Golf Course Road.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c59b6d] shrink-0 mt-0.5" aria-hidden="true" />
                <span>2nd Floor, DT Mega Mall, Golf Course Road, DLF Phase 1, Gurugram</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#c59b6d] shrink-0" aria-hidden="true" />
                <span>+91 98188 72427</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onSelectPartner('saga-luxury-spa')}
              className="text-[#c59b6d] text-xs hover:underline pt-1 block"
            >
              Explore Saga Luxury Spa &rarr;
            </button>
          </div>

          {/* Partner 2: Signature Spa */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-luxury text-base font-semibold">
              Signature Spa
            </h4>
            <p className="text-[11px] text-neutral-400">
              Holistic wellness, Thai herbal potli compress, and 4-hand bodywork on MG Road.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8cae98] shrink-0 mt-0.5" aria-hidden="true" />
                <span>Ground Floor, G-34, MGF Mega City Mall, MG Road, Gurugram</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#8cae98] shrink-0" aria-hidden="true" />
                <span>+91 98114 74462</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onSelectPartner('signature-spa')}
              className="text-[#8cae98] text-xs hover:underline pt-1 block"
            >
              Explore Signature Spa &rarr;
            </button>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-white font-serif-luxury text-base font-semibold">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#partners" className="hover:text-white transition-colors">
                  Our Partner Spas
                </a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-white transition-colors">
                  Treatment Menu
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenGiftVouchers}
                  className="hover:text-white transition-colors"
                >
                  Purchase Gift Vouchers
                </button>
              </li>
              <li>
                <a href="#amenities" className="hover:text-white transition-colors">
                  Sanctuary Standards
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors"
                >
                  Direct Booking Desk
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            &copy; 2026 MassageAtSpa Platform. All rights reserved. Partner sanctuary reservations.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Sanitation Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
