import React, { useState } from 'react';
import { Shield, Sparkles, MapPin, Star, Calendar, Users, ChevronRight, CheckCircle2 } from 'lucide-react';
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
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/5">
      {/* Generative Organic Topography Canvas */}
      <AmbientCanvas />

      {/* Background ambient lighting */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 bg-[#c59b6d]/10 rounded-full blur-[128px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#8cae98]/10 rounded-full blur-[128px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c59b6d]/30 bg-[#c59b6d]/5 backdrop-blur-sm text-xs font-medium text-[#c59b6d] tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Official Partner Booking Portal</span>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08] mb-6">
            Bespoke Sanctuary Visits at{' '}
            <span className="font-serif-luxury italic font-normal gold-gradient-text">
              Saga Luxury Spa
            </span>{' '}
            &amp;{' '}
            <span className="font-serif-luxury italic font-normal sage-gradient-text">
              Signature Spa
            </span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
            Reserve direct appointments with certified master bodywork therapists. Indulge in private thermal suites,
            volcanic hot stone rituals, and botanical rejuvenation with seamless instant confirmation.
          </p>
        </div>

        {/* Quick Booking Engine Bar */}
        <div className="max-w-4xl mx-auto mb-14">
          <form
            onSubmit={handleQuickSearch}
            className="glass-panel p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Partner Select */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-left focus-within:border-[#c59b6d] transition-colors">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  Partner Spa
                </label>
                <select
                  value={selectedSpa}
                  onChange={(e) => setSelectedSpa(e.target.value as any)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#15181c] text-white">
                    Both Partner Spas
                  </option>
                  <option value="saga-luxury-spa" className="bg-[#15181c] text-white">
                    Saga Luxury Spa
                  </option>
                  <option value="signature-spa" className="bg-[#15181c] text-white">
                    Signature Spa
                  </option>
                </select>
              </div>

              {/* Service Category */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-left focus-within:border-[#c59b6d] transition-colors">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  Treatment Focus
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                >
                  <option value="all" className="bg-[#15181c] text-white">
                    All Therapy Types
                  </option>
                  <option value="Signature Rituals" className="bg-[#15181c] text-white">
                    Signature Rituals
                  </option>
                  <option value="Therapeutic Massage" className="bg-[#15181c] text-white">
                    Therapeutic Massage
                  </option>
                  <option value="Couples Sanctuary" className="bg-[#15181c] text-white">
                    Couples Sanctuary
                  </option>
                  <option value="Body Exfoliation & Wraps" className="bg-[#15181c] text-white">
                    Exfoliation &amp; Wraps
                  </option>
                  <option value="Express Restoration" className="bg-[#15181c] text-white">
                    Express Restoration
                  </option>
                </select>
              </div>

              {/* Date */}
              <div className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-left focus-within:border-[#c59b6d] transition-colors">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                  Preferred Date
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
                <div className="bg-black/40 border border-white/10 rounded-xl p-2.5 text-left focus-within:border-[#c59b6d] transition-colors w-1/2">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1">
                    Guests
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-transparent text-sm text-white focus:outline-none cursor-pointer"
                  >
                    <option value={1} className="bg-[#15181c] text-white">
                      1 Solo
                    </option>
                    <option value={2} className="bg-[#15181c] text-white">
                      2 Couple/Duo
                    </option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-1/2 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] text-black font-semibold text-xs tracking-wider uppercase hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#c59b6d]/20"
                >
                  <span>Search Times</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Dual Partner Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {SPA_PARTNERS.map((partner) => {
            const isSaga = partner.id === 'saga-luxury-spa';
            return (
              <div
                key={partner.id}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                {/* Image Header */}
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={partner.heroImage}
                    alt={partner.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-[#0c0e11]/40 to-transparent" />

                  {/* Partner Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase ${
                        isSaga
                          ? 'bg-[#c59b6d] text-black'
                          : 'bg-[#8cae98] text-black'
                      }`}
                    >
                      {partner.name}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs bg-black/60 backdrop-blur-md text-white border border-white/10 flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" aria-hidden="true" />
                      <span>{partner.rating}</span>
                      <span className="text-neutral-400 text-[10px]">({partner.reviewsCount})</span>
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-300 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c59b6d]" aria-hidden="true" />
                      <span>{partner.location.district}</span>
                    </div>
                    <h3 className="font-serif-luxury text-2xl font-medium text-white tracking-wide">
                      {partner.name}
                    </h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6">
                  <p className="text-xs text-neutral-300 line-clamp-2 mb-4 leading-relaxed">
                    {partner.brandTagline}
                  </p>

                  <div className="flex items-center justify-between text-xs text-neutral-400 border-t border-b border-white/10 py-3 mb-5">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-500">Therapies From</span>
                      <span className="text-sm font-semibold text-white">
                        {partner.currency}{partner.startingPrice}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-500">Atmosphere</span>
                      <span className="text-xs font-medium text-neutral-200">
                        {isSaga ? 'Thermal & Opulent' : 'Zen & Rejuvenating'}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-neutral-500">Facilities</span>
                      <span className="text-xs font-medium text-neutral-200">
                        {partner.amenities.length}+ Curated
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectPartner(partner.id)}
                      className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase border border-white/20 hover:border-white/40 text-white bg-white/5 hover:bg-white/10 transition-colors text-center"
                    >
                      Explore Sanctuary
                    </button>
                    <button
                      type="button"
                      onClick={() => onSearch(partner.id)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-black text-center transition-all ${
                        isSaga
                          ? 'bg-[#c59b6d] hover:bg-[#d6af83]'
                          : 'bg-[#8cae98] hover:bg-[#9fc1ab]'
                      }`}
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 text-neutral-400 text-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
            <span>Guaranteed Direct Partner Rates</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
            <span>Flexible Cancellation (4 to 6 Hours)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
            <span>Licensed Master Therapists Only</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
            <span>Thermal Suite Access Included</span>
          </div>
        </div>
      </div>
    </div>
  );
};
