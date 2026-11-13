import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Search,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Printer,
  ChevronRight,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import { Booking, SpaPartner } from '../types';
import { cancelBooking } from '../utils/bookingStore';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  partners: SpaPartner[];
  onBookingsUpdated: () => void;
  onOpenNewBooking: () => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  partners,
  onBookingsUpdated,
  onOpenNewBooking,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookingForPass, setSelectedBookingForPass] = useState<Booking | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.bookingCode.toLowerCase().includes(q) ||
      b.guestName.toLowerCase().includes(q) ||
      b.guestEmail.toLowerCase().includes(q) ||
      b.spaName.toLowerCase().includes(q)
    );
  });

  const handleCancel = (id: string) => {
    cancelBooking(id);
    setConfirmCancelId(null);
    onBookingsUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl surface-elevated overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#c59b6d]">
              Guest Reservations
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium">
              My Spa Appointments
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close my bookings"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Look up by reference code (e.g. SAGA-5821), email, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 surface-inset text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c59b6d]/60"
            />
          </div>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <div className="space-y-4">
              {filteredBookings.map((b) => {
                const partner = partners.find((p) => p.id === b.spaId);
                const isConfirmed = b.status === 'confirmed';

                return (
                  <div
                    key={b.id}
                    className={`p-6 surface-inset border transition-all ${
                      isConfirmed
                        ? 'border-white/10 hover:border-white/20'
                        : 'border-neutral-800 bg-neutral-900/30 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif-luxury text-lg font-medium text-white">
                            {b.spaName}
                          </h4>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                              isConfirmed
                                ? 'bg-[#c59b6d]/15 text-[#c59b6d] border border-[#c59b6d]/30'
                                : 'bg-red-950/40 text-red-400 border border-red-500/30'
                            }`}
                          >
                            [{b.status.toUpperCase()}]
                          </span>
                        </div>
                        <p className="text-xs text-neutral-300 mt-1">{b.serviceTitle}</p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                          Reference Code
                        </span>
                        <span className="font-mono text-sm font-bold text-[#c59b6d]">
                          {b.bookingCode}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-neutral-300 mb-4">
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-500">Date</span>
                        <span className="font-medium text-white">{b.date}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-500">Slot</span>
                        <span className="font-medium text-white">{b.timeSlot}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-500">Duration</span>
                        <span className="font-medium text-white">{b.durationMinutes} Mins</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase text-neutral-500">Pay at Desk</span>
                        <span className="font-bold text-[#c59b6d]">₹{b.totalAmount}</span>
                      </div>
                    </div>

                    {partner && (
                      <div className="flex items-center gap-2 text-[11px] text-neutral-400 mb-4">
                        <MapPin className="w-3.5 h-3.5 text-[#c59b6d] shrink-0" aria-hidden="true" />
                        <span>{partner.location.address}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => setSelectedBookingForPass(b)}
                        className="text-xs text-neutral-200 hover:text-white underline underline-offset-4"
                      >
                        View Digital Pass &amp; Entry Instructions
                      </button>

                      {isConfirmed && (
                        <div>
                          {confirmCancelId === b.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-red-400">Cancel visit?</span>
                              <button
                                type="button"
                                onClick={() => handleCancel(b.id)}
                                className="px-2.5 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                              >
                                Yes, Cancel
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmCancelId(null)}
                                className="px-2 py-1 text-xs bg-white/10 hover:bg-white/20 text-neutral-300 rounded-lg transition-colors"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmCancelId(b.id)}
                              className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>Cancel Reservation</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Point 12: Designed Empty State for Bookings */
            <div className="text-center py-14 px-6 surface-inset max-w-md mx-auto">
              <div className="w-12 h-12 rounded-xl surface-inset border border-[#c59b6d]/30 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-[#c59b6d]" aria-hidden="true" />
              </div>
              <h4 className="font-serif-luxury text-xl text-white font-medium mb-1">
                No active appointments found
              </h4>
              <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
                {searchQuery
                  ? `No reservation matches "${searchQuery}". Please verify your 8-digit reference code or check your confirmation SMS.`
                  : 'You do not have any saved appointments in this session. Reserve your visit at Saga Luxury Spa or Signature Spa anytime.'}
              </p>
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b6d] hover:bg-[#d6af83]"
                >
                  Clear Search
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenNewBooking();
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b6d] hover:bg-[#d6af83] transition-colors"
                >
                  Book a Spa Visit
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-black/40 flex items-center justify-between">
          <span className="text-xs text-neutral-400">
            Recorded visits: <strong className="text-white">{bookings.length}</strong>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-white/10 hover:bg-white/15 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Digital Pass Modal Preview */}
      {selectedBookingForPass && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md surface-elevated p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c59b6d] font-bold block">
                  DIGITAL ENTRY PASS
                </span>
                <h4 className="font-serif-luxury text-lg font-medium text-white">
                  {selectedBookingForPass.spaName}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBookingForPass(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Reference:</span>
                <span className="font-mono text-sm font-bold text-[#c59b6d]">
                  {selectedBookingForPass.bookingCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Guest:</span>
                <span className="font-medium text-white">{selectedBookingForPass.guestName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Therapy:</span>
                <span className="font-medium text-white">{selectedBookingForPass.serviceTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Date &amp; Slot:</span>
                <span className="font-medium text-white">
                  {selectedBookingForPass.date} at {selectedBookingForPass.timeSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Duration:</span>
                <span className="font-medium text-white">
                  {selectedBookingForPass.durationMinutes} Minutes
                </span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-medium">
                <span className="text-neutral-300">Pay at Reception:</span>
                <span className="text-[#c59b6d] font-bold text-sm">
                  ₹{selectedBookingForPass.totalAmount}
                </span>
              </div>
            </div>

            <div className="p-3 surface-inset text-[11px] text-neutral-400 leading-relaxed">
              Show this pass at the front desk upon arrival. Private room, hot shower, and steam chamber
              are reserved for your slot.
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b6d] hover:bg-[#d6af83] transition-colors"
            >
              Print / Save Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
