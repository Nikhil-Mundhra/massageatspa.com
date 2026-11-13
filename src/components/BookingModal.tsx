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
  AlertCircle,
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
  const [timeSlot, setTimeSlot] = useState<string>('14:15');
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

  // Real Error Messages State (Point 15)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync preselected values when opening modal
  useEffect(() => {
    if (isOpen) {
      setFormErrors({});
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

  // Real Error Validation (Point 15)
  const validateGuestDetails = (): boolean => {
    const errs: Record<string, string> = {};

    if (!guestName.trim() || guestName.trim().length < 2) {
      errs.guestName = 'Please enter your full name as registered for spa security entry.';
    }

    if (!guestEmail.trim() || !guestEmail.includes('@') || !guestEmail.includes('.')) {
      errs.guestEmail = 'Please provide a valid email address so we can send your digital entry pass.';
    }

    const cleanPhone = guestPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      errs.guestPhone = 'Please enter a valid 10-digit mobile number for appointment confirmation SMS.';
    }

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Submission handler
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateGuestDetails()) {
      return;
    }

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
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
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
      `SUMMARY:Spa Appointment: ${confirmedBooking.serviceTitle} at ${confirmedBooking.spaName}`,
      `DESCRIPTION:Booking Reference: ${confirmedBooking.bookingCode}\\nDuration: ${confirmedBooking.durationMinutes} min\\nGuests: ${confirmedBooking.guestCount}\\nAmount Due: INR ${confirmedBooking.totalAmount}`,
      `LOCATION:${selectedSpaObj.location.address}, Gurugram`,
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
      <div className="relative w-full max-w-3xl surface-elevated overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-black/40">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#c59b6d]">
                Reservation Wizard
              </span>
              <span className="text-neutral-400 text-xs">- Step {step} of 4</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium">
              {step === 1 && 'Sanctuary & Treatment Selection'}
              {step === 2 && 'Date, Time & Preferences'}
              {step === 3 && 'Guest Profile & Verification'}
              {step === 4 && 'Reservation Confirmed: Your Spa Pass'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close reservation modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Progress Bar with single accent */}
        <div className="h-1 w-full bg-white/5">
          <div
            className="h-full bg-[#c59b6d] transition-all duration-300"
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
                  1. Choose Sanctuary Location
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {partners.map((p) => {
                    const isSelected = p.id === spaId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleSpaChange(p.id)}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#c59b6d] bg-[#c59b6d]/10 shadow-md'
                            : 'surface-inset hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-serif-luxury text-lg font-medium text-white">
                            {p.name}
                          </h4>
                          {isSelected && (
                            <CheckCircle2
                              className="w-4 h-4 text-[#c59b6d]"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <p className="text-xs text-neutral-300 line-clamp-1">{p.location.district}</p>
                        <div className="mt-2 text-[11px] text-[#c59b6d] font-medium">
                          From ₹{p.startingPrice} - Attached Steam &amp; Shower
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Treatment Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  2. Select Therapy
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
                            : 'surface-inset hover:border-white/20'
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
                          <span className="text-xs text-neutral-400 block">From</span>
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
                    3. Duration
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {currentService.durationOptions.map((opt) => (
                      <button
                        key={opt.minutes}
                        type="button"
                        onClick={() => setDurationMinutes(opt.minutes)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          durationMinutes === opt.minutes
                            ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white font-semibold'
                            : 'surface-inset text-neutral-300 hover:border-white/20'
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
                  4. Number of Guests
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    type="button"
                    onClick={() => setGuestCount(1)}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      guestCount === 1
                        ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white'
                        : 'surface-inset text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    1 Guest (Solo)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuestCount(2)}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                      guestCount === 2
                        ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white'
                        : 'surface-inset text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    2 Guests (Couples Suite)
                  </button>
                </div>
              </div>

              {/* Optional Add-Ons */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  5. Optional Enhancements
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
                            ? 'border-[#c59b6d] bg-[#c59b6d]/10'
                            : 'surface-inset hover:border-white/20'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-medium text-white block mb-0.5">
                            {addon.name}
                          </span>
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
                      min="2026-11-13"
                      className="w-full p-3 rounded-xl surface-inset text-white text-sm focus:outline-none focus:border-[#c59b6d]/60"
                    />
                  </div>
                  <div className="flex items-center text-xs text-neutral-300 surface-inset p-3">
                    <Info className="w-4 h-4 text-[#c59b6d] shrink-0 mr-2" aria-hidden="true" />
                    <span>Private eucalyptus steam and hot rainfall shower included with your visit.</span>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                    Select Appointment Time Slot
                  </label>
                  <span className="text-xs text-neutral-400">Operating: 10:00 - 21:00</span>
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
                            : 'surface-inset text-neutral-300 hover:border-white/20'
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
                  Therapist Preference
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
                          ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white font-semibold'
                          : 'surface-inset text-neutral-400 hover:border-white/20'
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
                  Massage Pressure Level
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'gentle', label: 'Gentle', desc: 'Calming, light touch' },
                    { id: 'medium', label: 'Medium', desc: 'Standard therapeutic' },
                    { id: 'firm', label: 'Firm', desc: 'Deep muscle release' },
                    { id: 'deep', label: 'Deep Tissue', desc: 'Intensive knots' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPressurePreference(p.id as any)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        pressurePreference === p.id
                          ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white'
                          : 'surface-inset text-neutral-400 hover:border-white/20'
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
                  Target Muscle Focus Areas
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Neck & Shoulders',
                    'Lower Back',
                    'Upper Back & Scapulae',
                    'Legs & Glutes',
                    'Arms & Hands',
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
                            ? 'accent-pill font-semibold'
                            : 'surface-inset text-neutral-400 hover:text-white'
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

          {/* STEP 3: GUEST DETAILS & REAL ERROR MESSAGES (Point 15) */}
          {step === 3 && (
            <form onSubmit={handleConfirmReservation} className="space-y-6">
              {/* Summary Card */}
              <div className="p-4 rounded-xl surface-inset text-xs">
                <div className="flex justify-between items-start border-b border-white/[0.08] pb-3 mb-3">
                  <div>
                    <h5 className="font-semibold text-white text-sm">{currentService.title}</h5>
                    <p className="text-neutral-400">
                      {selectedSpaObj.name} - {date} at {timeSlot}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-[#c59b6d]">₹{subtotal}</span>
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

              {/* Guest Fields with Real Human Error Feedback */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rohit Kulkarni"
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      if (formErrors.guestName) setFormErrors({ ...formErrors, guestName: '' });
                    }}
                    className={`w-full p-3 rounded-xl surface-inset text-white text-sm focus:outline-none transition-colors ${
                      formErrors.guestName ? 'border-red-500/80 bg-red-950/10' : 'focus:border-[#c59b6d]/60'
                    }`}
                  />
                  {formErrors.guestName && (
                    <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{formErrors.guestName}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      Email Address (for Digital Entry Pass) *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rohit@example.com"
                      value={guestEmail}
                      onChange={(e) => {
                        setGuestEmail(e.target.value);
                        if (formErrors.guestEmail) setFormErrors({ ...formErrors, guestEmail: '' });
                      }}
                      className={`w-full p-3 rounded-xl surface-inset text-white text-sm focus:outline-none transition-colors ${
                        formErrors.guestEmail ? 'border-red-500/80 bg-red-950/10' : 'focus:border-[#c59b6d]/60'
                      }`}
                    />
                    {formErrors.guestEmail && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{formErrors.guestEmail}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                      Mobile Number (for SMS Confirmation) *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98112 34567"
                      value={guestPhone}
                      onChange={(e) => {
                        setGuestPhone(e.target.value);
                        if (formErrors.guestPhone) setFormErrors({ ...formErrors, guestPhone: '' });
                      }}
                      className={`w-full p-3 rounded-xl surface-inset text-white text-sm focus:outline-none transition-colors ${
                        formErrors.guestPhone ? 'border-red-500/80 bg-red-950/10' : 'focus:border-[#c59b6d]/60'
                      }`}
                    />
                    {formErrors.guestPhone && (
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{formErrors.guestPhone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Allergies or Medical Notes (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nut oil sensitivity, recent neck sprain, pregnancy"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full p-3 rounded-xl surface-inset text-white text-sm focus:outline-none focus:border-[#c59b6d]/60"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Quiet session preferred, post-work fatigue relief"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full p-3 rounded-xl surface-inset text-white text-sm focus:outline-none focus:border-[#c59b6d]/60"
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
                        : 'surface-inset text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-white">
                      Pay Upon Arrival at Spa Desk
                    </span>
                    <span className="block text-[11px] text-neutral-400 mt-1">
                      No prepayment required. Pay via UPI, Card, or Cash at reception.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online-hold')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      paymentMethod === 'online-hold'
                        ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white'
                        : 'surface-inset text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <span className="block text-xs font-semibold text-white">
                      Express Priority Check-in
                    </span>
                    <span className="block text-[11px] text-neutral-400 mt-1">
                      Skip registration queues with instant digital gate confirmation.
                    </span>
                  </button>
                </div>
              </div>

              {/* Policy agreement notice */}
              <div className="text-[11px] text-neutral-400 surface-inset p-3.5 leading-relaxed">
                By reserving, you agree to {selectedSpaObj.name}'s policy: arrive 15 minutes before your slot.
                Free cancellation up to 3 hours before your scheduled appointment.
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 transition-colors"
                >
                  Back to Schedule
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#c59b6d] text-black hover:bg-[#d6af83] active:scale-95 transition-all shadow-md shadow-[#c59b6d]/20"
                >
                  Confirm Reservation (₹{subtotal})
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: CONFIRMATION & DIGITAL SPA PASS */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full accent-pill flex items-center justify-center mx-auto text-[#c59b6d]">
                <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
                  Appointment Confirmed
                </span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-white font-medium mt-1">
                  We Look Forward to Welcoming You
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 mt-1">
                  Confirmation and entry pass dispatched to{' '}
                  <strong className="text-white">{confirmedBooking.guestEmail}</strong>.
                </p>
              </div>

              {/* The Digital Spa Pass Card */}
              <div className="max-w-md mx-auto surface-elevated border border-[#c59b6d]/40 p-6 text-left shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#c59b6d] font-semibold block">
                      DIGITAL ENTRY PASS
                    </span>
                    <h5 className="font-serif-luxury text-lg font-medium text-white">
                      {confirmedBooking.spaName}
                    </h5>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block">
                      Reference Code
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
                    <span className="text-neutral-400">Therapy:</span>
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
                  <div className="flex justify-between border-t border-white/10 pt-2 font-medium">
                    <span className="text-neutral-300">Amount Due at Desk:</span>
                    <span className="text-[#c59b6d] font-bold text-sm">
                      ₹{confirmedBooking.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Location snippet */}
                <div className="p-3 surface-inset text-[11px] text-neutral-300 flex items-start gap-2 mb-4">
                  <MapPin className="w-3.5 h-3.5 text-[#c59b6d] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-medium text-white">{selectedSpaObj.location.address}</span>
                    <p className="text-neutral-400">{selectedSpaObj.location.landmark}</p>
                  </div>
                </div>

                <div className="text-[10px] text-neutral-400 text-center border-t border-white/5 pt-3">
                  Please arrive 15 minutes early. Private steam suite and towels are pre-assigned.
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
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b6d] hover:bg-[#d6af83] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation (Steps 1 & 2) */}
        {step < 3 && (
          <div className="px-6 py-4 border-t border-white/[0.08] flex items-center justify-between bg-black/40">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-white/5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => setStep((step + 1) as any)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-[#c59b6d] text-black hover:bg-[#d6af83] transition-all shadow-md shadow-[#c59b6d]/15"
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
