import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { ReviewItem } from '../types';

interface TestimonialsSectionProps {
  testimonials: ReviewItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-16 sm:py-24 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
            Verified Guest Reflections
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white mt-2 mb-4 tracking-tight">
            Loved by Mindful Travelers &amp; Locals
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Read authentic reviews from guests who booked their visits at Saga Luxury Spa and Signature
            Spa through our partner network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => {
            const isSaga = item.spaId === 'saga-luxury-spa';
            return (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isSaga ? 'bg-[#c59b6d] text-black' : 'bg-[#8cae98] text-black'
                      }`}
                    >
                      {isSaga ? 'Saga Luxury Spa' : 'Signature Spa'}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-200 leading-relaxed italic mb-6">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">{item.author}</h4>
                    <span className="text-[11px] text-neutral-400">
                      {item.city} - {item.serviceName}
                    </span>
                  </div>

                  {item.verifiedBooking && (
                    <div className="flex items-center gap-1 text-[11px] text-[#c59b6d]">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Verified Visit</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
