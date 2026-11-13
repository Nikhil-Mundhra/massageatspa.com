import React, { useState, useMemo } from 'react';
import { Search, Clock, Check, Filter, XCircle, Sparkles, AlertCircle } from 'lucide-react';
import { SpaService } from '../types';

interface ServicesExplorerProps {
  services: SpaService[];
  initialSpaFilter?: 'saga-luxury-spa' | 'signature-spa' | 'all';
  initialCategoryFilter?: string;
  onSelectServiceDetails: (service: SpaService) => void;
  onBookService: (service: SpaService, durationMinutes: number) => void;
}

export const ServicesExplorer: React.FC<ServicesExplorerProps> = ({
  services,
  initialSpaFilter = 'all',
  initialCategoryFilter = 'all',
  onSelectServiceDetails,
  onBookService,
}) => {
  const [spaFilter, setSpaFilter] = useState<'all' | 'saga-luxury-spa' | 'signature-spa'>(
    initialSpaFilter
  );
  const [categoryFilter, setCategoryFilter] = useState<string>(initialCategoryFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDurations, setSelectedDurations] = useState<Record<string, number>>({});
  const [isFiltering, setIsFiltering] = useState(false);

  React.useEffect(() => {
    if (initialSpaFilter) setSpaFilter(initialSpaFilter);
  }, [initialSpaFilter]);

  React.useEffect(() => {
    if (initialCategoryFilter) setCategoryFilter(initialCategoryFilter);
  }, [initialCategoryFilter]);

  const categories = [
    'all',
    'Signature Rituals',
    'Therapeutic Massage',
    'Couples Sanctuary',
    'Express Restoration',
  ];

  const handleFilterChange = (setter: () => void) => {
    setIsFiltering(true);
    setter();
    setTimeout(() => setIsFiltering(false), 180);
  };

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      if (spaFilter !== 'all' && srv.spaId !== spaFilter) return false;
      if (categoryFilter !== 'all' && srv.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = srv.title.toLowerCase().includes(q);
        const matchesSummary = srv.summary.toLowerCase().includes(q);
        const matchesCategory = srv.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesCategory) return false;
      }
      return true;
    });
  }, [services, spaFilter, categoryFilter, searchQuery]);

  const handleDurationSelect = (serviceId: string, minutes: number) => {
    setSelectedDurations((prev) => ({ ...prev, [serviceId]: minutes }));
  };

  return (
    <section id="treatments" className="py-20 lg:py-28 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
            Treatment Menu
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white mt-2 mb-4 tracking-tight">
            Curated Therapies &amp; Bodywork
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Compare therapies across Saga Luxury Spa and Signature Spa. All sessions are conducted in private
            rooms with attached steam and hot shower facilities.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="surface-card p-4 sm:p-5 mb-10 space-y-4 shadow-xl">
          {/* Row 1: Search & Sanctuary Partner Filter */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search therapies, Thai, hot stones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 surface-inset text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c59b6d]/60 transition-colors"
              />
            </div>

            {/* Spa Partner Buttons: Single accent, clear states */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-neutral-400 font-medium mr-1 hidden sm:inline">
                Sanctuary:
              </span>
              <button
                type="button"
                onClick={() => handleFilterChange(() => setSpaFilter('all'))}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  spaFilter === 'all'
                    ? 'bg-[#c59b6d] text-black shadow-md shadow-[#c59b6d]/15'
                    : 'surface-inset text-neutral-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                All Sanctuaries ({services.length})
              </button>
              <button
                type="button"
                onClick={() => handleFilterChange(() => setSpaFilter('saga-luxury-spa'))}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  spaFilter === 'saga-luxury-spa'
                    ? 'bg-[#c59b6d] text-black shadow-md shadow-[#c59b6d]/15'
                    : 'surface-inset text-neutral-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                Saga Luxury Spa
              </button>
              <button
                type="button"
                onClick={() => handleFilterChange(() => setSpaFilter('signature-spa'))}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                  spaFilter === 'signature-spa'
                    ? 'bg-[#c59b6d] text-black shadow-md shadow-[#c59b6d]/15'
                    : 'surface-inset text-neutral-300 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                Signature Spa
              </button>
            </div>
          </div>

          {/* Row 2: Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-t border-white/[0.06] pt-3">
            <span className="text-neutral-500 font-medium whitespace-nowrap">Focus:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilterChange(() => setCategoryFilter(cat))}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'accent-pill font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {cat === 'all' ? 'All Therapies' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter & Clear */}
        <div className="flex justify-between items-center text-xs text-neutral-400 mb-8 px-1">
          <span>
            Displaying <strong className="text-white">{filteredServices.length}</strong> available therapies
          </span>
          {(spaFilter !== 'all' || categoryFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSpaFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
              }}
              className="text-[#c59b6d] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Loading State Animation */}
        {isFiltering ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="surface-card p-6 rounded-2xl space-y-4">
                <div className="h-48 w-full rounded-xl skeleton-pulse" />
                <div className="h-6 w-3/4 rounded-lg skeleton-pulse" />
                <div className="h-4 w-full rounded-lg skeleton-pulse" />
                <div className="h-10 w-full rounded-xl skeleton-pulse" />
              </div>
            ))}
          </div>
        ) : (
          /* Fewer Cards, More Room (2 columns on desktop) */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredServices.map((service) => {
              const isSaga = service.spaId === 'saga-luxury-spa';
              const selectedMins =
                selectedDurations[service.id] || service.durationOptions[0].minutes;
              const currentOption =
                service.durationOptions.find((opt) => opt.minutes === selectedMins) ||
                service.durationOptions[0];

              return (
                <div
                  key={service.id}
                  className="group flex flex-col surface-card surface-card-hover overflow-hidden shadow-xl"
                >
                  {/* Image with Location Tag */}
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-transparent to-transparent" />

                    {/* Sanctuary Pill Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="accent-pill text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                        {isSaga ? 'Saga Luxury (DT Mega Mall)' : 'Signature Spa (MGF Mega City)'}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-300">
                      <span className="bg-black/60 px-2.5 py-1 rounded-full border border-white/10 font-medium">
                        {service.category}
                      </span>
                      <span className="bg-black/60 px-2.5 py-1 rounded-full border border-white/10 font-medium">
                        {service.intensity}
                      </span>
                    </div>
                  </div>

                  {/* Card Content with Generous Spacing */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif-luxury text-2xl font-medium text-white mb-2 leading-snug group-hover:text-[#c59b6d] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 mb-4 leading-relaxed line-clamp-2">
                        {service.summary}
                      </p>

                      {/* Benefits Snippets */}
                      <div className="space-y-1.5 mb-6">
                        {service.benefits.slice(0, 2).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                            <Check className="w-3.5 h-3.5 text-[#c59b6d] shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Duration Selector & Price */}
                    <div className="border-t border-white/[0.08] pt-5 mt-auto">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                          Choose Duration:
                        </span>
                        <div className="text-right">
                          <span className="text-xl font-bold text-white">
                            ₹{currentOption.price}
                          </span>
                          {currentOption.originalPrice && (
                            <span className="text-xs text-neutral-500 line-through ml-2">
                              ₹{currentOption.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Duration Buttons: Unified corner radius */}
                      <div className="grid grid-cols-3 gap-2 mb-5">
                        {service.durationOptions.map((opt) => (
                          <button
                            key={opt.minutes}
                            type="button"
                            onClick={() => handleDurationSelect(service.id, opt.minutes)}
                            className={`py-2 px-3 rounded-xl text-xs font-medium transition-all ${
                              selectedMins === opt.minutes
                                ? 'bg-[#c59b6d] text-black font-semibold shadow-sm'
                                : 'surface-inset text-neutral-300 hover:text-white hover:bg-white/[0.06]'
                            }`}
                          >
                            <span className="block text-xs font-semibold">{opt.minutes} Mins</span>
                            <span className="block text-[11px] opacity-80 mt-0.5">₹{opt.price}</span>
                          </button>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => onSelectServiceDetails(service)}
                          className="py-2.5 px-4 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                        >
                          Protocol Details
                        </button>
                        <button
                          type="button"
                          onClick={() => onBookService(service, selectedMins)}
                          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase text-black bg-[#c59b6d] hover:bg-[#d6af83] transition-colors text-center shadow-md shadow-[#c59b6d]/15"
                        >
                          Book Visit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Point 12: Designed Empty State */}
        {!isFiltering && filteredServices.length === 0 && (
          <div className="text-center py-20 px-6 surface-card rounded-2xl max-w-xl mx-auto shadow-2xl">
            <div className="w-14 h-14 rounded-full accent-pill flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7 text-[#c59b6d]" aria-hidden="true" />
            </div>
            <h4 className="font-serif-luxury text-2xl text-white font-medium mb-2">
              No matching therapies found
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
              We couldn't find any treatments matching your current search criteria. Both Saga Luxury Spa and
              Signature Spa offer traditional Thai, deep tissue, and couples therapies daily.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSpaFilter('all');
                  setCategoryFilter('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b6d] hover:bg-[#d6af83] transition-colors"
              >
                View Full Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
