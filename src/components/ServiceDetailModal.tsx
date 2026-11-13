import React from 'react';
import { X, Clock, Check, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { SpaService, SpaPartner } from '../types';

interface ServiceDetailModalProps {
  service: SpaService | null;
  partner?: SpaPartner;
  onClose: () => void;
  onBookNow: (service: SpaService, durationMinutes: number) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  partner,
  onClose,
  onBookNow,
}) => {
  if (!service) return null;

  const isSaga = service.spaId === 'saga-luxury-spa';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl surface-elevated overflow-hidden shadow-2xl my-6">
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 w-full">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16191f] via-[#16191f]/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-black/60 text-white hover:bg-black transition-colors"
            aria-label="Close ritual details"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          {/* Badge & Title */}
          <div className="absolute bottom-5 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#c59b6d] bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#c59b6d]/30">
                {partner ? partner.name : service.spaId}
              </span>
              <span className="text-[10px] text-neutral-300 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 font-medium uppercase tracking-wider">
                {service.category}
              </span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium">
              {service.title}
            </h3>
            <p className="text-xs text-neutral-300 mt-1">{service.subtitle}</p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Full description */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold mb-2">
              Therapy Description
            </h4>
            <p className="text-neutral-200 text-sm leading-relaxed">{service.fullDescription}</p>
          </div>

          {/* Ritual Steps */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold mb-3">
              Step-by-Step Protocol
            </h4>
            <div className="space-y-2.5">
              {service.ritualSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 surface-inset"
                >
                  <span className="w-5 h-5 rounded surface-inset border border-[#c59b6d]/40 text-[#c59b6d] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-neutral-300 leading-snug">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Therapeutic Benefits */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold mb-3">
              Clinical Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((b, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                  <Check className="w-3.5 h-3.5 text-[#c59b6d] shrink-0" aria-hidden="true" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Duration & Pricing Matrix */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold mb-3">
              Available Durations &amp; Desk Rates
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {service.durationOptions.map((opt) => (
                <div
                  key={opt.minutes}
                  className="p-3.5 surface-inset text-center"
                >
                  <span className="block text-xs text-neutral-400">{opt.minutes} Minutes</span>
                  <span className="block text-lg font-bold text-white mt-0.5">₹{opt.price}</span>
                  {opt.originalPrice && (
                    <span className="text-[11px] text-neutral-500 line-through">
                      ₹{opt.originalPrice}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/[0.08] bg-black/40 flex items-center justify-between">
          <div className="text-xs text-neutral-400">
            Pressure: <strong className="text-white">{service.intensity}</strong>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onBookNow(service, service.durationOptions[0].minutes);
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b6d] hover:bg-[#d6af83] transition-all shadow-md shadow-[#c59b6d]/15"
          >
            Reserve Therapy
          </button>
        </div>
      </div>
    </div>
  );
};
