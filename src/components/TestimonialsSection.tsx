import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { ReviewItem } from '../types';

interface TestimonialsSectionProps {
  testimonials: ReviewItem[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  return (
    <section className="py-20 lg:py-28 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
            Verified Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white mt-2 mb-4 tracking-tight">
            Guest Reflections in Gurugram
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Read verified feedback from patrons who booked their visits at Saga Luxury Spa (DT Mega Mall)
            and Signature Spa (MGF Mega City Mall).
          </p>
        </div>

        {/* Fewer Cards, More Room (2 columns with generous padding) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item) => {
            const isSaga = item.spaId === 'saga-luxury-spa';
            return (
              <div
                key={item.id}
                className="p-8 surface-card surface-card-hover flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#c59b6d]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#c59b6d]" aria-hidden="true" />
                      ))}
                    </div>
                    <span className="accent-pill text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {isSaga ? 'DT Mega Mall' : 'MGF Mega City'}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-200 leading-relaxed italic mb-6">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white">{item.author}</h4>
                    <span className="text-[11px] text-neutral-400">
                      {item.city} - {item.serviceName}
                    </span>
                  </div>

                  {item.verifiedBooking && (
                    <div className="flex items-center gap-1 text-[11px] text-[#c59b6d] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Verified Booking</span>
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
