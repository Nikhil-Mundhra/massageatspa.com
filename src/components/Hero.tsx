import React, { useState } from 'react';
import { Sparkles, MapPin, Star, Calendar, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SPA_PARTNERS } from '../data/spas';
import { AmbientCanvas } from './AmbientCanvas';

interface HeroProps {
  onSearch: (spaId?: 'saga-luxury-spa' | 'signature-spa', category?: string, date?: string, guests?: number) => void;
  onSelectPartner: (spaId: 'saga-luxury-spa' | 'signature-spa') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, onSelectPartner }) => {
  const [selectedSpa, setSelectedSpa] = useState<'all' | 'saga-luxury-spa' | 'signature-spa'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-15');
  const [guestCount, setGuestCount] = useState<number>(1);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(
      selectedSpa === 'all' ? undefined : selectedSpa,
      selectedCategory === 'all' ? undefined : selectedCategory,
      selectedDate,
      guestCount
    );
  };

  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-white/[0.08]">
      {/* Generative Organic Topography Canvas */}
      <AmbientCanvas />

      {/* Subtle single-accent glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#c59b6d]/[0.06] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Location Line: Clean editorial typography without pill */}
        <div className="text-center mb-5">
          <span className="text-[11px] font-semibold tracking-[0.25em] text-[#c59b6d] uppercase">
            Gurugram Partner Network · Golf Course Road &amp; MG Road
          </span>
        </div>

        {/* Main Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white leading-[1.1] mb-5">
            Verified Spa Appointments at{' '}
            <span className="font-serif-luxury italic font-normal accent-gradient-text block sm:inline">
              Saga Luxury Spa &amp; Signature Spa
            </span>
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto font-light leading-relaxed">
            Direct reservations for certified Thai bodywork, deep tissue therapies, and private steam suites.
            No platform markups. Settle your appointment directly at the spa desk.
          </p>
        </div>

        {/* Quick Booking Engine Bar */}
        <div className="max-w-4xl mx-auto mb-16">
          <form
            onSubmit={handleQuickSearch}
            className="surface-card p-4 sm:p-5 shadow-2xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Partner Select */}
              <div className="surface-inset p-3 text-left focus-within:border-[#c59b6d]/60 transition-colors">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  Sanctuary Partner
                </label>
                <select
                  value={selectedSpa}
                  onChange={(e) => setSelectedSpa(e.target.value as any)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#111317] text-white">
                    Both Sanctuaries
                  </option>
                  <option value="saga-luxury-spa" className="bg-[#111317] text-white">
                    Saga Luxury Spa (DT Mega Mall)
                  </option>
                  <option value="signature-spa" className="bg-[#111317] text-white">
                    Signature Spa (MGF Mega City)
                  </option>
                </select>
              </div>

              {/* Service Category */}
              <div className="surface-inset p-3 text-left focus-within:border-[#c59b6d]/60 transition-colors">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  Therapy Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#111317] text-white">
                    All Therapies
                  </option>
                  <option value="Signature Rituals" className="bg-[#111317] text-white">
                    Signature Rituals
                  </option>
                  <option value="Therapeutic Massage" className="bg-[#111317] text-white">
                    Therapeutic &amp; Deep Tissue
                  </option>
                  <option value="Couples Sanctuary" className="bg-[#111317] text-white">
                    Couples Suite Sessions
                  </option>
                  <option value="Express Restoration" className="bg-[#111317] text-white">
                    Express Head &amp; Back
                  </option>
                </select>
              </div>

              {/* Date */}
              <div className="surface-inset p-3 text-left focus-within:border-[#c59b6d]/60 transition-colors">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                />
              </div>

              {/* Guests and Action */}
              <div className="flex gap-2">
                <div className="surface-inset p-3 text-left focus-within:border-[#c59b6d]/60 transition-colors w-1/2">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                    Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value={1} className="bg-[#111317] text-white">
                      1 Guest
                    </option>
                    <option value={2} className="bg-[#111317] text-white">
                      2 Couple
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-1/2 flex items-center justify-center rounded-xl bg-[#c59b6d] text-black font-semibold text-xs tracking-wider uppercase hover:bg-[#d6af83] active:scale-95 transition-all shadow-md shadow-[#c59b6d]/20"
                >
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Dual Partner Spotlight Cards: Clean architectural layout without floating pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SPA_PARTNERS.map((partner) => {
            const isSaga = partner.id === 'saga-luxury-spa';
            return (
              <div
                key={partner.id}
                className="group relative surface-card surface-card-hover overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                {/* Image Header with clean metadata */}
                <div>
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={partner.heroImage}
                      alt={partner.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/50 to-transparent" />

                    {/* Clean top metadata badge - crisp rectangular tags */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#c59b6d] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                        {isSaga ? 'Golf Course Road' : 'MG Road'}
                      </span>
                      <span className="text-[11px] font-medium text-white bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#c59b6d] text-[#c59b6d]" aria-hidden="true" />
                        <span>{partner.rating}</span>
                        <span className="text-neutral-400 text-[10px]">({partner.reviewsCount})</span>
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-5 right-5">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-300 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#c59b6d]" aria-hidden="true" />
                        <span>{partner.location.landmark}</span>
                      </div>
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-white tracking-tight">
                        {partner.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details with generous padding */}
                  <div className="p-6">
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                      {partner.brandTagline}
                    </p>

                    <div className="grid grid-cols-3 gap-3 text-xs border-t border-b border-white/[0.08] py-4 mb-6">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">
                          Therapies
                        </span>
                        <span className="text-sm font-semibold text-white">
                          From ₹{partner.startingPrice}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">
                          Private Suites
                        </span>
                        <span className="text-xs font-medium text-neutral-200">
                          Attached Steam
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">
                          Hours
                        </span>
                        <span className="text-xs font-medium text-neutral-200">
                          10am - 10pm Daily
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="px-6 pb-6 pt-0 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectPartner(partner.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase border border-white/15 hover:border-white/30 text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors text-center"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => onSearch(partner.id)}
                    className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-black text-center bg-[#c59b6d] hover:bg-[#d6af83] transition-colors"
                  >
                    Book Visit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-white/[0.08] text-neutral-300 text-xs max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
            <span>Direct Spa Desk Rates</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
            <span>Free Cancellation (3 Hours)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
            <span>Attached Steam &amp; Shower</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
            <span>No Prepayment Required</span>
          </div>
        </div>
      </div>
    </div>
  );
};
