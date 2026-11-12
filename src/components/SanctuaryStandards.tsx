import React from 'react';
import { ShieldCheck, Award, Sparkles, Droplets, HeartHandshake, Lock } from 'lucide-react';

export const SanctuaryStandards: React.FC = () => {
  const standards = [
    {
      icon: <Award className="w-5 h-5 text-[#c59b6d]" aria-hidden="true" />,
      title: 'Master Certified Practitioners',
      description:
        'All bodywork therapists at Saga Luxury Spa and Signature Spa maintain professional certifications with extensive training in orthopedic biomechanics, myofascial release, and thermal rituals.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#8cae98]" aria-hidden="true" />,
      title: 'Certified Organic Botanicals',
      description:
        'We require 100% cold-pressed botanical oils, therapeutic essential extracts, and mineral clays with zero synthetic parabens, petroleum fillers, or artificial fragrances.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#c59b6d]" aria-hidden="true" />,
      title: 'Complimentary Thermal Suite Privileges',
      description:
        'Every booked treatment includes dedicated time to enjoy cedar saunas, eucalyptus steam chambers, and private relaxation lounges prior to your scheduled session.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#8cae98]" aria-hidden="true" />,
      title: 'Direct Partner Pricing Guarantee',
      description:
        'No hidden platform booking fees or inflated resort surcharges. You pay authentic partner sanctuary rates with clear, flexible cancellation policies.',
    },
  ];

  return (
    <section id="amenities" className="py-16 sm:py-24 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
            Quality &amp; Safety Commitment
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white mt-2 mb-4 tracking-tight">
            The MassageAtSpa Partner Standard
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            Our platform selectively audits each partner sanctuary to guarantee exceptional sanitation,
            master therapist pedigree, and holistic guest rejuvenation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {std.icon}
                </div>
                <h3 className="font-serif-luxury text-xl font-medium text-white mb-2 leading-snug">
                  {std.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{std.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-[#c59b6d]">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Verified Partner Requirement</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
