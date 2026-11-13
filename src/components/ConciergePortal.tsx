import React, { useState } from 'react';
import {
  X,
  Building2,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Calendar,
  Sparkles,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { Booking, SpaPartner } from '../types';

interface ConciergePortalProps {
  isOpen: boolean;
  onClose: () => void;
  partners: SpaPartner[];
  bookings: Booking[];
}

export const ConciergePortal: React.FC<ConciergePortalProps> = ({
  isOpen,
  onClose,
  partners,
  bookings,
}) => {
  const [activeSpaId, setActiveSpaId] = useState<'saga-luxury-spa' | 'signature-spa'>(
    'saga-luxury-spa'
  );
  const [checkedInIds, setCheckedInIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const currentSpa = partners.find((p) => p.id === activeSpaId) || partners[0];
  const spaBookings = bookings.filter((b) => b.spaId === activeSpaId);
  const activeConfirmed = spaBookings.filter((b) => b.status === 'confirmed');

  const totalRevenue = activeConfirmed.reduce((sum, b) => sum + b.totalAmount, 0);

  const toggleCheckIn = (id: string) => {
    if (checkedInIds.includes(id)) {
      setCheckedInIds(checkedInIds.filter((item) => item !== id));
    } else {
      setCheckedInIds([...checkedInIds, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-4xl surface-elevated overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-black/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl surface-inset border border-[#c59b6d]/30 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#c59b6d]" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#c59b6d] bg-[#c59b6d]/10 border border-[#c59b6d]/30 px-2 py-0.5 rounded">
                  PARTNER DESK
                </span>
                <span className="text-xs text-neutral-400">Front Desk &amp; Concierge Console</span>
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium">
                Sanctuary Management Dashboard
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close concierge portal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Spa Partner Tabs with single accent */}
        <div className="px-6 pt-4 border-b border-white/[0.08] flex items-center gap-4 bg-black/30">
          {partners.map((p) => {
            const isSelected = p.id === activeSpaId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActiveSpaId(p.id)}
                className={`pb-3 text-xs sm:text-sm font-semibold tracking-wider uppercase border-b-2 transition-all ${
                  isSelected
                    ? 'border-[#c59b6d] text-white'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                {p.name} ({bookings.filter((b) => b.spaId === p.id).length})
              </button>
            );
          })}
        </div>

        {/* Dashboard Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Metrics summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 surface-inset">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
                <span>Active Appointments</span>
                <Calendar className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-white">{activeConfirmed.length}</span>
              <span className="block text-[11px] text-neutral-400 mt-1">
                Confirmed guest arrivals
              </span>
            </div>

            <div className="p-5 surface-inset">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
                <span>Checked In At Desk</span>
                <Users className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-white">{checkedInIds.length}</span>
              <span className="block text-[11px] text-neutral-400 mt-1">
                Currently in treatment suites
              </span>
            </div>

            <div className="p-5 surface-inset">
              <div className="flex items-center justify-between text-neutral-400 text-xs mb-1">
                <span>Projected Revenue</span>
                <DollarSign className="w-4 h-4 text-[#c59b6d]" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-[#c59b6d]">₹{totalRevenue}</span>
              <span className="block text-[11px] text-neutral-400 mt-1">
                Payable at reception desk
              </span>
            </div>
          </div>

          {/* Roster Table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
                Guest Arrivals Roster - {currentSpa.name}
              </h4>
              <span className="text-xs text-neutral-400">
                Live sync with MassageAtSpa
              </span>
            </div>

            {spaBookings.length > 0 ? (
              <div className="surface-inset overflow-hidden">
                <div className="divide-y divide-white/5">
                  {spaBookings.map((b) => {
                    const isCheckedIn = checkedInIds.includes(b.id);
                    const isCancelled = b.status === 'cancelled';

                    return (
                      <div
                        key={b.id}
                        className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                          isCheckedIn ? 'bg-[#c59b6d]/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl surface-inset border border-[#c59b6d]/30 flex items-center justify-center font-serif-luxury text-sm font-semibold text-[#c59b6d] shrink-0">
                            {b.guestName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-medium text-white">{b.guestName}</h5>
                              <span className="font-mono text-[11px] text-[#c59b6d]">
                                {b.bookingCode}
                              </span>
                              {isCancelled && (
                                <span className="text-[10px] text-red-400 border border-red-500/30 px-2 py-0.5 rounded bg-red-950/20">
                                  [CANCELLED]
                                </span>
                              )}
                              {isCheckedIn && (
                                <span className="text-[10px] text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/20">
                                  [CHECKED IN]
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-neutral-300 mt-0.5">{b.serviceTitle}</p>
                            <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-1">
                              <span>Slot: {b.timeSlot}</span>
                              <span>Date: {b.date}</span>
                              <span>Duration: {b.durationMinutes}m</span>
                              <span>Pressure: {b.pressurePreference}</span>
                            </div>
                            {b.specialRequests && (
                              <p className="text-[11px] text-[#c59b6d]/90 italic mt-1">
                                Note: {b.specialRequests}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                          <div className="text-right mr-2">
                            <span className="text-xs font-semibold text-white block">
                              ₹{b.totalAmount}
                            </span>
                            <span className="text-[10px] text-neutral-400 capitalize">
                              {b.paymentMethod.replace('-', ' ')}
                            </span>
                          </div>

                          {!isCancelled && (
                            <button
                              type="button"
                              onClick={() => toggleCheckIn(b.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                                isCheckedIn
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                                  : 'surface-inset text-neutral-300 hover:border-white/20'
                              }`}
                            >
                              {isCheckedIn ? 'Checked In' : 'Mark Arrival'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 surface-inset text-neutral-400 text-xs">
                No active bookings recorded for {currentSpa.name} yet.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Desk Status: <strong className="text-emerald-400">Online &amp; Connected</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-white/10 hover:bg-white/15 transition-colors"
          >
            Close Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
