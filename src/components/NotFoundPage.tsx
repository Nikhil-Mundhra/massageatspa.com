import React from 'react';
import { Sparkles, MapPin, ArrowLeft, Home, Calendar } from 'lucide-react';

interface NotFoundPageProps {
  onBackToHome: () => void;
  onOpenBooking: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onBackToHome, onOpenBooking }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="surface-card max-w-lg w-full p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
        {/* Subtle emblem */}
        <div className="w-16 h-16 rounded-full accent-pill flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-[#c59b6d]" aria-hidden="true" />
        </div>

        <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold block mb-2">
          Status 404 - Sanctuary Not Found
        </span>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-medium mb-3">
          This Page Does Not Exist
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-8">
          The requested appointment link or treatment page could not be located. Both Saga Luxury Spa
          (DT Mega Mall) and Signature Spa (MGF Mega City Mall) are open and accepting verified appointments.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase border border-white/15 hover:border-white/30 text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Return to Sanctuary</span>
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase text-black bg-[#c59b6d] hover:bg-[#d6af83] transition-colors shadow-md shadow-[#c59b6d]/15"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <span>Reserve a Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
