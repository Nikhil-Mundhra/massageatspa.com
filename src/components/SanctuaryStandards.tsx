import React from 'react';
import { ShieldCheck, Award, Sparkles, Droplets, HeartHandshake, CheckCircle } from 'lucide-react';

export const SanctuaryStandards: React.FC = () => {
  const standards = [
    {
      icon: <Award className="w-5 h-5 text-[#c59b6d]" aria-hidden="true" />,
      title: 'Certified Master Practitioners',
      description:
        'All bodywork therapists at Saga Luxury Spa and Signature Spa maintain formal clinical certifications in authentic Thai bodywork, orthopedic acupressure, and restorative thermal therapies.',
    },
    {
      icon: <Droplets className="w-5 h-5 text-[#c59b6d]" aria-hidden="true" />,
      title: 'Certified Pure Botanicals',
      description:
        'Only cold-pressed sesame, sweet almond, and pure essential aroma oils are utilized, with zero synthetic fillers, mineral oils, or harsh chemical fragrances.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#c59b6d]" aria-hidden="true" />,
      title: 'Private Attached Thermal Suites',
      description:
        'Every reserved session includes attached eucalyptus steam and hot rainfall shower facilities, ensuring complete privacy from arrival to departure.',
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#c59b6d]" aria-hidden="true" />,
      title: 'Direct Desk Rates & Free Cancellation',
      description:
        'Pay standard sanctuary rates directly at the front desk. Reschedule or cancel freely up to 3 hours prior to your scheduled appointment.',
    },
  ];

  return (
    <section id="amenities" className="py-20 lg:py-28 border-b border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
            Quality &amp; Sanitation Protocol
          </span>
          <h2 className="text-3xl sm:text-5xl font-light text-white mt-2 mb-4 tracking-tight">
            The MassageAtSpa Partner Standard
          </h2>
          <p className="text-sm sm:text-base text-neutral-300">
            We independently verify each partner sanctuary in Gurugram to guarantee strict hygiene,
            certified therapists, and transparent pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((std, idx) => (
            <div
              key={idx}
              className="p-6 surface-card surface-card-hover flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="w-11 h-11 rounded-xl surface-inset flex items-center justify-center mb-5">
                  {std.icon}
                </div>
                <h3 className="font-serif-luxury text-xl font-medium text-white mb-2 leading-snug">
                  {std.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">{std.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-1.5 text-[11px] text-[#c59b6d] font-medium">
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
