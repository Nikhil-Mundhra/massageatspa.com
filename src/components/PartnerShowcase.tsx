import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Sparkles,
  Flame,
  CloudFog,
  HeartHandshake,
  Coffee,
  Car,
  Bed,
  Headphones,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { SpaPartner } from '../types';

interface PartnerShowcaseProps {
  partners: SpaPartner[];
  activePartnerId: 'saga-luxury-spa' | 'signature-spa';
  onSelectPartnerId: (id: 'saga-luxury-spa' | 'signature-spa') => void;
  onBookAtSpa: (id: 'saga-luxury-spa' | 'signature-spa') => void;
  onFilterMenuBySpa: (id: 'saga-luxury-spa' | 'signature-spa') => void;
}

export const PartnerShowcase: React.FC<PartnerShowcaseProps> = ({
  partners,
  activePartnerId,
  onSelectPartnerId,
  onBookAtSpa,
  onFilterMenuBySpa,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const currentPartner = partners.find((p) => p.id === activePartnerId) || partners[0];
  const isSaga = currentPartner.id === 'saga-luxury-spa';

  // Helper to map amenity icon name to Lucide component
  const renderAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />;
      case 'CloudFog':
        return <CloudFog className="w-4 h-4 text-[#8cae98]" aria-hidden="true" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />;
      case 'Coffee':
        return <Coffee className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />;
      case 'Car':
        return <Car className="w-4 h-4 text-[#8cae98]" aria-hidden="true" />;
      case 'Bed':
        return <Bed className="w-4 h-4 text-[#8cae98]" aria-hidden="true" />;
      case 'Headphones':
        return <Headphones className="w-4 h-4 text-[#8cae98]" aria-hidden="true" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />;
    }
  };

  return (
    <section id="partners" className="py-16 sm:py-24 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
            Premier Destination Profiles
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white mt-2 mb-4 tracking-tight">
            Discover Our Two Sanctuary Partners
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Each partner offers a distinct sensory philosophy. Select a sanctuary to review facilities,
            gallery collections, signature amenities, and location directions.
          </p>
        </div>

        {/* Partner Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl glass-panel border border-white/10 max-w-md w-full">
            {partners.map((partner) => {
              const selected = partner.id === activePartnerId;
              const isPartnerSaga = partner.id === 'saga-luxury-spa';
              return (
                <button
                  key={partner.id}
                  type="button"
                  onClick={() => onSelectPartnerId(partner.id)}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-all duration-200 ${
                    selected
                      ? isPartnerSaga
                        ? 'bg-[#c59b6d] text-black shadow-lg shadow-[#c59b6d]/20'
                        : 'bg-[#8cae98] text-black shadow-lg shadow-[#8cae98]/20'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {partner.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Partner Detailed Presentation */}
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          {/* Top Banner with Key Highlights */}
          <div className="relative h-80 sm:h-96 w-full">
            <img
              src={currentPartner.heroImage}
              alt={currentPartner.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f12] via-[#0d0f12]/50 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-md ${
                      isSaga ? 'bg-[#c59b6d] text-black' : 'bg-[#8cae98] text-black'
                    }`}
                  >
                    Partner Sanctuary
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold bg-black/60 px-2 py-0.5 rounded border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-amber-400" aria-hidden="true" />
                    <span>{currentPartner.rating}</span>
                    <span className="text-neutral-400">({currentPartner.reviewsCount} reviews)</span>
                  </div>
                </div>
                <h3 className="font-serif-luxury text-3xl sm:text-5xl text-white font-medium">
                  {currentPartner.name}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mt-1">
                  {currentPartner.brandTagline}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onFilterMenuBySpa(currentPartner.id)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
                >
                  View Menu ({isSaga ? '5 Rituals' : '5 Therapies'})
                </button>
                <button
                  type="button"
                  onClick={() => onBookAtSpa(currentPartner.id)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black transition-all ${
                    isSaga ? 'bg-[#c59b6d] hover:bg-[#d8b083]' : 'bg-[#8cae98] hover:bg-[#a1c4ad]'
                  }`}
                >
                  Reserve Visit
                </button>
              </div>
            </div>
          </div>

          {/* Details Body Grid */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Column 1: Story, Atmosphere & Highlights */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold mb-2">
                  Sanctuary Philosophy
                </h4>
                <p className="text-neutral-200 text-sm sm:text-base leading-relaxed mb-4">
                  {currentPartner.description}
                </p>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed border-l-2 border-[#c59b6d]/40 pl-4 italic">
                  "{currentPartner.story}"
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold mb-3">
                  Distinguishing Signatures
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentPartner.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                    >
                      <CheckCircle className="w-4 h-4 text-[#c59b6d] shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-xs text-neutral-300 leading-snug">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curated Photo Gallery */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
                    Inside The Sanctuary
                  </h4>
                  <span className="text-xs text-neutral-400">Click to expand preview</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentPartner.gallery.map((photo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedPhoto(photo.url)}
                      className="group relative h-28 sm:h-32 rounded-xl overflow-hidden border border-white/10 hover:border-[#c59b6d]/50 transition-all text-left"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute bottom-1.5 left-2 right-2 text-[10px] text-white/90 truncate font-light">
                        {photo.caption}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities Grid */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold mb-3">
                  Complimentary Guest Facilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentPartner.amenities.map((amenity) => (
                    <div
                      key={amenity.id}
                      className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {renderAmenityIcon(amenity.iconName)}
                        <h5 className="text-xs font-semibold text-white">{amenity.name}</h5>
                      </div>
                      <p className="text-[11px] text-neutral-400 leading-relaxed">
                        {amenity.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2: Practical Details, Location, Hours & Policies */}
            <div className="space-y-6">
              {/* Location Card */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                    Location &amp; Contact
                  </h4>
                  <span className="text-[11px] text-[#c59b6d] font-medium">{currentPartner.location.city}</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex items-start gap-2.5 text-neutral-300">
                    <MapPin className="w-4 h-4 text-[#c59b6d] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-medium text-white">{currentPartner.location.address}</p>
                      <p className="text-neutral-400">{currentPartner.location.landmark}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-neutral-300">
                    <Phone className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
                    <span>{currentPartner.location.phone}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-neutral-300">
                    <Mail className="w-4 h-4 text-[#c59b6d] shrink-0" aria-hidden="true" />
                    <span>{currentPartner.location.email}</span>
                  </div>
                </div>

                <a
                  href={currentPartner.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-medium text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open Directions in Maps</span>
                </a>
              </div>

              {/* Operating Hours */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 font-semibold border-b border-white/10 pb-3">
                  <Clock className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />
                  <span>Sanctuary Hours</span>
                </div>
                <div className="space-y-2 text-xs">
                  {currentPartner.operatingHours.map((schedule, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1">
                      <span className="text-neutral-400">{schedule.days}</span>
                      <span className="text-white font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-3 text-xs">
                <div className="flex items-center gap-2 uppercase tracking-widest text-neutral-400 font-semibold border-b border-white/10 pb-3">
                  <ShieldCheck className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />
                  <span>Partner Policies</span>
                </div>
                <div>
                  <span className="block font-semibold text-white mb-0.5">Arrival Guidance:</span>
                  <p className="text-neutral-400 leading-relaxed">{currentPartner.policies.arrival}</p>
                </div>
                <div>
                  <span className="block font-semibold text-white mb-0.5">Cancellation Policy:</span>
                  <p className="text-neutral-400 leading-relaxed">{currentPartner.policies.cancellation}</p>
                </div>
                <div>
                  <span className="block font-semibold text-white mb-0.5">Spa Attire:</span>
                  <p className="text-neutral-400 leading-relaxed">{currentPartner.policies.attire}</p>
                </div>
              </div>

              {/* Quick Book Button */}
              <button
                type="button"
                onClick={() => onBookAtSpa(currentPartner.id)}
                className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase text-black text-center shadow-lg transition-all ${
                  isSaga
                    ? 'bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] hover:brightness-110 shadow-[#c59b6d]/20'
                    : 'bg-gradient-to-r from-[#b1cfbe] to-[#8cae98] hover:brightness-110 shadow-[#8cae98]/20'
                }`}
              >
                Reserve at {currentPartner.shortName}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl border border-white/20">
            <img src={selectedPhoto} alt="Spa Gallery" className="w-full h-auto object-contain" />
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close photo preview"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
