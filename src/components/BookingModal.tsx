import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  MapPin,
  Download,
  Printer,
  ChevronRight,
  ChevronLeft,
  Info,
} from 'lucide-react';
import { SpaPartner, SpaService, ServiceAddOn, Booking } from '../types';
import { COMMON_ADD_ONS, TIME_SLOTS } from '../data/spas';
import { saveBooking, generateBookingCode } from '../utils/bookingStore';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  partners: SpaPartner[];
  services: SpaService[];
  preselectedSpaId?: 'saga-luxury-spa' | 'signature-spa';
  preselectedServiceId?: string;
  preselectedDuration?: number;
  onBookingConfirmed: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  partners,
  services,
  preselectedSpaId = 'saga-luxury-spa',
  preselectedServiceId,
  preselectedDuration,
  onBookingConfirmed,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [spaId, setSpaId] = useState<'saga-luxury-spa' | 'signature-spa'>(preselectedSpaId);
  const [serviceId, setServiceId] = useState<string>('');
  const [durationMinutes, setDurationMinutes] = useState<number>(60);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [selectedAddOns, setSelectedAddOns] = useState<ServiceAddOn[]>([]);

  // Step 2
  const [date, setDate] = useState<string>('2026-11-15');
  const [timeSlot, setTimeSlot] = useState<string>('14:30');
  const [therapistGender, setTherapistGender] = useState<'no-preference' | 'female' | 'male'>(
    'no-preference'
  );
  const [pressurePreference, setPressurePreference] = useState<
    'gentle' | 'medium' | 'firm' | 'deep'
  >('medium');
  const [focusAreas, setFocusAreas] = useState<string[]>(['Neck & Shoulders', 'Lower Back']);

  // Step 3
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [allergies, setAllergies] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'pay-at-spa' | 'online-hold'>('pay-at-spa');

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync preselected values when opening modal
  useEffect(() => {
    if (isOpen) {
      if (preselectedSpaId) setSpaId(preselectedSpaId);
      const availableServices = services.filter(
        (s) => s.spaId === (preselectedSpaId || 'saga-luxury-spa')
      );
      if (preselectedServiceId && availableServices.some((s) => s.id === preselectedServiceId)) {
        setServiceId(preselectedServiceId);
        const srv = availableServices.find((s) => s.id === preselectedServiceId);
        if (srv) {
          const matchDuration =
            preselectedDuration || srv.durationOptions[0]?.minutes || 60;
          setDurationMinutes(matchDuration);
        }
      } else if (availableServices.length > 0) {
        setServiceId(availableServices[0].id);
        setDurationMinutes(availableServices[0].durationOptions[0]?.minutes || 60);
      }
    }
  }, [isOpen, preselectedSpaId, preselectedServiceId, preselectedDuration, services]);

  // When spa changes, ensure service belongs to new spa
  const handleSpaChange = (newSpaId: 'saga-luxury-spa' | 'signature-spa') => {
    setSpaId(newSpaId);
    const spaServices = services.filter((s) => s.spaId === newSpaId);
    if (spaServices.length > 0) {
      setServiceId(spaServices[0].id);
      setDurationMinutes(spaServices[0].durationOptions[0]?.minutes || 60);
    }
  };

  const selectedSpaObj = partners.find((p) => p.id === spaId) || partners[0];
  const spaServices = services.filter((s) => s.spaId === spaId);
  const currentService = spaServices.find((s) => s.id === serviceId) || spaServices[0];

  // Pricing calculations
  const basePrice =
    currentService?.durationOptions.find((d) => d.minutes === durationMinutes)?.price || 1999;
  const addonsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const subtotal = (basePrice + addonsTotal) * guestCount;

  const toggleAddon = (addon: ServiceAddOn) => {
    if (selectedAddOns.some((a) => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const toggleFocusArea = (area: string) => {
    if (focusAreas.includes(area)) {
      setFocusAreas(focusAreas.filter((a) => a !== area));
    } else {
      setFocusAreas([...focusAreas, area]);
    }
  };

  // Submission handler
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    const booking: Booking = {
      id: 'book-' + Date.now(),
      bookingCode: generateBookingCode(spaId),
      spaId: spaId,
      spaName: selectedSpaObj.name,
      serviceId: currentService.id,
      serviceTitle: currentService.title,
      durationMinutes: durationMinutes,
      price: basePrice,
      addonsTotal: addonsTotal,
      totalAmount: subtotal,
      currency: selectedSpaObj.currency,
      date: date,
      timeSlot: timeSlot,
      guestCount: guestCount,
      guestName: guestName.trim() || 'Valued Guest',
      guestEmail: guestEmail.trim() || 'guest@example.com',
      guestPhone: guestPhone.trim() || '+1 (555) 000-0000',
      therapistGender: therapistGender,
      pressurePreference: pressurePreference,
      focusAreas: focusAreas,
      allergiesOrMedicalNotes: allergies.trim() || undefined,
      specialRequests: specialRequests.trim() || undefined,
      selectedAddOns: selectedAddOns,
      status: 'confirmed',
      paymentMethod: paymentMethod,
      createdAt: new Date().toISOString(),
    };

    saveBooking(booking);
    setConfirmedBooking(booking);
    onBookingConfirmed(booking);
    setStep(4);
  };

  // Calendar file simulation (.ics)
  const downloadIcsCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//MassageAtSpa//Spa Reservation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Spa Visit: ${confirmedBooking.serviceTitle} at ${confirmedBooking.spaName}`,
      `DESCRIPTION:Booking Reference: ${confirmedBooking.bookingCode}\\nDuration: ${confirmedBooking.durationMinutes} min\\nGuests: ${confirmedBooking.guestCount}`,
      `LOCATION:${selectedSpaObj.location.address}, ${selectedSpaObj.location.city}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${confirmedBooking.bookingCode}-reservation.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl glass-panel-elevated rounded-3xl border border-white/15 overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#c59b6d]">
                Reservation Wizard
              </span>
              <span className="text-neutral-400 text-xs">- Step {step} of 4</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium">
              {step === 1 && 'Select Spa Sanctuary & Therapy'}
              {step === 2 && 'Date, Time & Specialist Notes'}
              {step === 3 && 'Guest Details & Confirmation'}
              {step === 4 && 'Reservation Confirmed: Your Spa Pass'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-white/5">
          <div
            className="h-full bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: SPA & THERAPY */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Spa Partner Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  1. Choose Partner Sanctuary
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {partners.map((p) => {
                    const isSelected = p.id === spaId;
                    const isSaga = p.id === 'saga-luxury-spa';
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSpaChange(p.id)}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          isSelected
                            ? isSaga
                              ? 'border-[#c59b6d] bg-[#c59b6d]/15 shadow-md'
                              : 'border-[#8cae98] bg-[#8cae98]/15 shadow-md'
                            : 'border-white/10 bg-black/40 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-serif-luxury text-lg font-medium text-white">
                            {p.name}
                          </h4>
                          {isSelected && (
                            <CheckCircle2
                              className={`w-4 h-4 ${isSaga ? 'text-[#c59b6d]' : 'text-[#8cae98]'}`}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <p className="text-xs text-neutral-300 line-clamp-1">{p.atmosphere}</p>
                        <div className="mt-2 text-[11px] text-neutral-400">
                          {p.location.district} - From ₹{p.startingPrice}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Treatment Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  2. Select Treatment Protocol
                </label>
                <div className="space-y-2.5">
                  {spaServices.map((srv) => {
                    const isSelected = srv.id === currentService?.id;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => {
                          setServiceId(srv.id);
                          setDurationMinutes(srv.durationOptions[0]?.minutes || 60);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-4 transition-all ${
                          isSelected
                            ? 'border-[#c59b6d] bg-[#c59b6d]/10'
                            : 'border-white/10 bg-black/30 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={srv.image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-sm font-medium text-white">{srv.title}</h5>
                              <span className="text-[10px] text-neutral-400 px-1.5 py-0.5 rounded bg-white/5">
                                {srv.category}
                              </span>
                            </div>
                            <p className="text-xs text-neutral-400 line-clamp-1">{srv.summary}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs text-neutral-400 block">Starting at</span>
                          <span className="text-sm font-semibold text-white">
                            ₹{srv.durationOptions[0]?.price}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration Options */}
              {currentService && (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                    3. Treatment Duration
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {currentService.durationOptions.map((opt) => (
                      <button
                        key={opt.minutes}
                        type="button"
                        onClick={() => setDurationMinutes(opt.minutes)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          durationMinutes === opt.minutes
                            ? 'border-[#c59b6d] bg-[#c59b6d]/20 text-white font-semibold'
                            : 'border-white/10 bg-black/30 text-neutral-300 hover:bg-white/5'
                        }`}
                      >
                        <span className="block text-sm">{opt.minutes} Minutes</span>
                        <span className="block text-xs font-bold text-[#c59b6d] mt-0.5">
                          ₹{opt.price}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Guest Count */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  4. Guests
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setGuestCount(1)}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      guestCount === 1
                        ? 'border-[#c59b6d] bg-[#c59b6d]/20 text-white'
                        : 'border-white/10 bg-black/30 text-neutral-400 hover:bg-white/5'
                    }`}
                  >
                    1 Guest (Solo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestCount(2)}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      guestCount === 2
                        ? 'border-[#c59b6d] bg-[#c59b6d]/20 text-white'
                        : 'border-white/10 bg-black/30 text-neutral-400 hover:bg-white/5'
                    }`}
                  >
                    2 Guests (Duo / Couple)
                  </button>
                </div>
              </div>

              {/* Optional Add-Ons */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  5. Optional Enhancements &amp; Add-ons
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {COMMON_ADD_ONS.map((addon) => {
                    const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddon(addon)}
                        className={`p-3 rounded-xl border text-left flex items-start justify-between gap-3 transition-all ${
                          isChecked
                            ? 'border-[#c59b6d] bg-[#c59b6d]/15'
                            : 'border-white/5 bg-black/30 hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                            <span className="text-xs font-medium text-white">{addon.name}</span>
                          </div>
                          <p className="text-[11px] text-neutral-400 line-clamp-1">
                            {addon.description}
                          </p>
                        </div>
                        <span className="text-xs font-semibold text-[#c59b6d] shrink-0">
                          +₹{addon.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: DATE, TIME & PREFERENCES */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Date Input */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Appointment Date
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min="2026-11-12"
                      className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c59b6d]"
                    />
                  </div>
                  <div className="flex items-center text-xs text-neutral-300 bg-white/5 p-3 rounded-xl border border-white/5">
                    <Info className="w-4 h-4 text-[#c59b6d] shrink-0 mr-2" aria-hidden="true" />
                    <span>Complimentary access to steam room &amp; thermal sauna included before treatment.</span>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Select Available Time Slot
                  </label>
                  <span className="text-xs text-neutral-400">Operating: 09:00 - 21:00</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium text-center border transition-all ${
                          isSelected
                            ? 'border-[#c59b6d] bg-[#c59b6d] text-black font-bold shadow-md'
                            : 'border-white/10 bg-black/40 text-neutral-300 hover:bg-white/5'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Therapist Preference */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Therapist Gender Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'no-preference', label: 'No Preference' },
                    { id: 'female', label: 'Female Therapist' },
                    { id: 'male', label: 'Male Therapist' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTherapistGender(item.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                        therapistGender === item.id
                          ? 'border-[#c59b6d] bg-[#c59b6d]/20 text-white'
                          : 'border-white/10 bg-black/30 text-neutral-400 hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pressure Preference */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Massage Pressure Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'gentle', label: 'Gentle & Calming', desc: 'Light, soothing touch' },
                    { id: 'medium', label: 'Balanced Medium', desc: 'Standard therapeutic pressure' },
                    { id: 'firm', label: 'Firm Pressure', desc: 'Deep muscle focus' },
                    { id: 'deep', label: 'Deep Tissue', desc: 'Intensive chronic knots' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPressurePreference(p.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        pressurePreference === p.id
                          ? 'border-[#c59b6d] bg-[#c59b6d]/20 text-white'
                          : 'border-white/10 bg-black/30 text-neutral-400 hover:bg-white/5'
                      }`}
                    >
                      <span className="block text-xs font-semibold text-white">{p.label}</span>
                      <span className="block text-[10px] text-neutral-400 mt-0.5">{p.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Target Tension Areas (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Neck & Shoulders',
                    'Lower Back',
                    'Upper Back & Scapulae',
                    'Legs & Glutes',
                    'Arms & Hands',
                    'Feet & Calves',
                    'Full Body Equal',
                  ].map((area) => {
                    const isSelected = focusAreas.includes(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleFocusArea(area)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                          isSelected
                            ? 'border-[#c59b6d] bg-[#c59b6d]/20 text-white'
                            : 'border-white/10 bg-black/30 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: GUEST DETAILS & POLICIES */}
          {step === 3 && (
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-xs">
                <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-3">
                  <div>
                    <h5 className="font-semibold text-white text-sm">{currentService.title}</h5>
                    <p className="text-neutral-400">
                      {selectedSpaObj.name} - {date} at {timeSlot}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-white">₹{subtotal}</span>
                    <span className="block text-[10px] text-neutral-400">
                      {guestCount} Guest{guestCount > 1 ? 's' : ''} ({durationMinutes}m)
                    </span>
                  </div>
                </div>

                {selectedAddOns.length > 0 && (
                  <div className="text-neutral-400 space-y-1">
                    <span className="font-medium text-neutral-300">Selected Add-ons:</span>
                    {selectedAddOns.map((a) => (
                      <div key={a.id} className="flex justify-between">
                        <span>+ {a.name}</span>
                        <span>+₹{a.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Guest Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Sterling"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c59b6d]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      Email Address (for Digital Pass) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. julian@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c59b6d]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      Mobile Phone (for SMS Reminders) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 019-2834"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c59b6d]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Allergies, Skin Sensitivities, or Health Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nut oil allergy, pregnancy, high blood pressure, recent surgery"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c59b6d]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Special Requests or Occasion (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Celebrating anniversary, quiet session requested"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full p-3 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:border-[#c59b6d]"
                  />
                </div>
              </div>

              {/* Payment Guarantee Preference */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pay-at-spa')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'pay-at-spa'
                        ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white'
                        : 'border-white/10 bg-black/30 text-neutral-400 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-white">
                      Pay Upon Arrival at Sanctuary
                    </span>
                    <span className="block text-[11px] text-neutral-400 mt-1">
                      No upfront deposit required. Settle via Card or Cash at reception.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online-hold')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'online-hold'
                        ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white'
                        : 'border-white/10 bg-black/30 text-neutral-400 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-white">
                      Express Card Guarantee
                    </span>
                    <span className="block text-[11px] text-neutral-400 mt-1">
                      Hold appointment instantly without immediate charge.
                    </span>
                  </button>
                </div>
              </div>

              {/* Policy agreement notice */}
              <div className="text-[11px] text-neutral-400 bg-white/5 p-3 rounded-xl border border-white/5 leading-relaxed">
                By confirming, you agree to {selectedSpaObj.name}'s arrival guidance (arrive 20m early)
                and flexible cancellation window (free cancellation up to 6 hours prior to visit).
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 transition-colors"
                >
                  Back to Schedule
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] text-black hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#c59b6d]/20"
                >
                  Complete Reservation (₹{subtotal})
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION & DIGITAL SPA PASS */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-[#c59b6d]/20 border border-[#c59b6d] flex items-center justify-center mx-auto text-[#c59b6d]">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
                  Reservation Confirmed
                </span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium mt-1">
                  We Look Forward to Welcoming You
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                  Confirmation and arrival pass dispatched to{' '}
                  <strong className="text-white">{confirmedBooking.guestEmail}</strong>.
                </p>
              </div>

              {/* The Digital Spa Pass Card */}
              <div className="max-w-md mx-auto rounded-3xl bg-gradient-to-b from-[#181c22] to-[#0f1115] border border-[#c59b6d]/40 p-6 text-left shadow-2xl relative overflow-hidden">
                {/* Decorative border notch */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#c59b6d] font-semibold block">
                      OFFICIAL SPA PASS
                    </span>
                    <h5 className="font-serif-luxury text-lg font-medium text-white">
                      {confirmedBooking.spaName}
                    </h5>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                      Booking Reference
                    </span>
                    <span className="font-mono text-base font-bold text-[#c59b6d]">
                      {confirmedBooking.bookingCode}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-300 mb-5">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Guest:</span>
                    <span className="font-medium text-white">{confirmedBooking.guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Treatment:</span>
                    <span className="font-medium text-white">{confirmedBooking.serviceTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Date &amp; Time:</span>
                    <span className="font-medium text-white">
                      {confirmedBooking.date} at {confirmedBooking.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Duration:</span>
                    <span className="font-medium text-white">
                      {confirmedBooking.durationMinutes} Minutes ({confirmedBooking.guestCount} Guest)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Pressure / Focus:</span>
                    <span className="font-medium text-white capitalize">
                      {confirmedBooking.pressurePreference} Pressure
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-medium">
                    <span className="text-neutral-300">Amount Due at Spa:</span>
                    <span className="text-[#c59b6d] font-bold text-sm">
                      ₹{confirmedBooking.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Location snippet */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-300 flex items-start gap-2 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#c59b6d] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-medium text-white">{selectedSpaObj.location.address}</span>
                    <p className="text-neutral-400">{selectedSpaObj.location.landmark}</p>
                  </div>
                </div>

                {/* Arrival note */}
                <div className="text-[10px] text-neutral-400 text-center border-t border-white/5 pt-3">
                  Please arrive 20 minutes early. Thermal sauna and robes are prepared for your arrival.
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={downloadIcsCalendar}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Add to Calendar (.ics)</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Print Pass</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b6d] hover:bg-[#d8b083] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation (Steps 1 & 2) */}
        {step < 3 && (
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/40">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Previous Step</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => setStep((step + 1) as any)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] text-black hover:brightness-110 transition-all shadow-md"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
