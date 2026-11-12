import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Clock, Check, ChevronRight, Filter } from 'lucide-react';
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
  const [intensityFilter, setIntensityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDurations, setSelectedDurations] = useState<Record<string, number>>({});

  // Sync state if initial props change
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
    'Body Exfoliation & Wraps',
    'Express Restoration',
  ];

  const intensities = [
    'all',
    'Gentle & Calming',
    'Balanced Medium',
    'Deep Tissue & Firm',
    'Bespoke Pressure',
  ];

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      if (spaFilter !== 'all' && srv.spaId !== spaFilter) return false;
      if (categoryFilter !== 'all' && srv.category !== categoryFilter) return false;
      if (intensityFilter !== 'all' && srv.intensity !== intensityFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = srv.title.toLowerCase().includes(q);
        const matchesSummary = srv.summary.toLowerCase().includes(q);
        const matchesCategory = srv.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesCategory) return false;
      }
      return true;
    });
  }, [services, spaFilter, categoryFilter, intensityFilter, searchQuery]);

  const handleDurationSelect = (serviceId: string, minutes: number) => {
    setSelectedDurations((prev) => ({ ...prev, [serviceId]: minutes }));
  };

  return (
    <section id="treatments" className="py-16 sm:py-24 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
            Curated Menu
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white mt-2 mb-4 tracking-tight">
            Therapies &amp; Restoration Rituals
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Compare protocols from Saga Luxury Spa and Signature Spa. Each treatment is conducted by
            licensed therapists using certified organic botanicals and thermal therapy.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 mb-8 space-y-4">
          {/* Row 1: Search & Spa Filter */}
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search therapies, hot stones, oils..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c59b6d] transition-colors"
              />
            </div>

            {/* Spa Partner Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-neutral-400 font-medium mr-1 hidden sm:inline">
                Partner:
              </span>
              <button
                type="button"
                onClick={() => setSpaFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  spaFilter === 'all'
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                All Spas ({services.length})
              </button>
              <button
                type="button"
                onClick={() => setSpaFilter('saga-luxury-spa')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  spaFilter === 'saga-luxury-spa'
                    ? 'bg-[#c59b6d] text-black font-semibold'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                Saga Luxury Spa
              </button>
              <button
                type="button"
                onClick={() => setSpaFilter('signature-spa')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  spaFilter === 'signature-spa'
                    ? 'bg-[#8cae98] text-black font-semibold'
                    : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                }`}
              >
                Signature Spa
              </button>
            </div>
          </div>

          {/* Row 2: Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-neutral-500 font-medium whitespace-nowrap">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-white/20 text-white font-medium border border-white/30'
                    : 'bg-black/30 text-neutral-400 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-neutral-400 mb-6 px-1">
          <span>
            Showing <strong className="text-white">{filteredServices.length}</strong> available treatments
          </span>
          {(spaFilter !== 'all' || categoryFilter !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSpaFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
                setIntensityFilter('all');
              }}
              className="text-[#c59b6d] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="group flex flex-col rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11] via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSaga ? 'bg-[#c59b6d] text-black' : 'bg-[#8cae98] text-black'
                      }`}
                    >
                      {isSaga ? 'Saga Luxury' : 'Signature Spa'}
                    </span>
                    {service.popular && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 text-amber-300 border border-amber-300/30">
                        Popular Choice
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-neutral-300 bg-black/60 px-2 py-0.5 rounded">
                      {service.category}
                    </span>
                    <span className="text-[11px] text-neutral-300 bg-black/60 px-2 py-0.5 rounded">
                      {service.intensity}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-medium text-white mb-1 leading-snug group-hover:text-[#c59b6d] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mb-3 line-clamp-2 leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Benefits Snippets */}
                    <div className="space-y-1 mb-4">
                      {service.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] text-neutral-300">
                          <Check className="w-3 h-3 text-[#c59b6d] shrink-0" aria-hidden="true" />
                          <span className="truncate">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Duration Selector & Price */}
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-medium">
                        Select Duration:
                      </span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-white">
                          ${currentOption.price}
                        </span>
                        {currentOption.originalPrice && (
                          <span className="text-xs text-neutral-500 line-through ml-1.5">
                            ${currentOption.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 mb-4">
                      {service.durationOptions.map((opt) => (
                        <button
                          key={opt.minutes}
                          type="button"
                          onClick={() => handleDurationSelect(service.id, opt.minutes)}
                          className={`py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                            selectedMins === opt.minutes
                              ? isSaga
                                ? 'bg-[#c59b6d] text-black font-semibold'
                                : 'bg-[#8cae98] text-black font-semibold'
                              : 'bg-black/30 text-neutral-300 hover:bg-white/5 border border-white/5'
                          }`}
                        >
                          {opt.minutes} Min
                        </button>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectServiceDetails(service)}
                        className="py-2 px-3 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => onBookService(service, selectedMins)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold tracking-wider uppercase text-black text-center transition-all ${
                          isSaga
                            ? 'bg-[#c59b6d] hover:bg-[#d8b083]'
                            : 'bg-[#8cae98] hover:bg-[#a1c4ad]'
                        }`}
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

        {filteredServices.length === 0 && (
          <div className="text-center py-16 glass-panel rounded-2xl border border-white/10">
            <p className="text-base text-neutral-300 mb-2">No treatments match your current filter.</p>
            <p className="text-xs text-neutral-500 mb-4">
              Try adjusting your category or search term to discover more options.
            </p>
            <button
              type="button"
              onClick={() => {
                setSpaFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
                setIntensityFilter('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-medium text-black bg-[#c59b6d]"
            >
              Show All Treatments
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
