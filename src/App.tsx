import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PartnerShowcase } from './components/PartnerShowcase';
import { ServicesExplorer } from './components/ServicesExplorer';
import { SanctuaryStandards } from './components/SanctuaryStandards';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { ConciergePortal } from './components/ConciergePortal';
import { GiftVoucherModal } from './components/GiftVoucherModal';

import { SPA_PARTNERS, SPA_SERVICES, TESTIMONIALS } from './data/spas';
import { Booking, SpaService } from './types';
import { getStoredBookings } from './utils/bookingStore';

export const App: React.FC = () => {
  // Bookings state from localStorage
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Modal open states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isGiftVoucherOpen, setIsGiftVoucherOpen] = useState(false);
  const [selectedServiceForDetail, setSelectedServiceForDetail] = useState<SpaService | null>(null);

  // Preselected booking parameters
  const [preselectedSpaId, setPreselectedSpaId] = useState<
    'saga-luxury-spa' | 'signature-spa'
  >('saga-luxury-spa');
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedDuration, setPreselectedDuration] = useState<number | undefined>(undefined);

  // Active showcase tab
  const [activePartnerId, setActivePartnerId] = useState<'saga-luxury-spa' | 'signature-spa'>(
    'saga-luxury-spa'
  );

  // Services filters passed from hero search
  const [servicesSpaFilter, setServicesSpaFilter] = useState<
    'all' | 'saga-luxury-spa' | 'signature-spa'
  >('all');
  const [servicesCategoryFilter, setServicesCategoryFilter] = useState<string>('all');

  // Temporary toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load initial bookings
  useEffect(() => {
    setBookings(getStoredBookings());
  }, []);

  const refreshBookings = () => {
    setBookings(getStoredBookings());
  };

  const handleBookingConfirmed = (newBooking: Booking) => {
    refreshBookings();
    setToastMessage(`Reservation confirmed! Reference code: ${newBooking.bookingCode}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 6000);
  };

  // Trigger booking modal with optional pre-selection
  const openBookingModal = (
    spaId?: 'saga-luxury-spa' | 'signature-spa',
    serviceId?: string,
    duration?: number
  ) => {
    if (spaId) setPreselectedSpaId(spaId);
    setPreselectedServiceId(serviceId);
    setPreselectedDuration(duration);
    setIsBookingOpen(true);
  };

  // Handler for Hero Search bar
  const handleHeroSearch = (
    spaId?: 'saga-luxury-spa' | 'signature-spa',
    category?: string,
    _date?: string,
    _guests?: number
  ) => {
    if (spaId) {
      setServicesSpaFilter(spaId);
      setActivePartnerId(spaId);
    } else {
      setServicesSpaFilter('all');
    }
    if (category) {
      setServicesCategoryFilter(category);
    }
    // Scroll smoothly to treatments
    const el = document.getElementById('treatments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPartner = (spaId: 'saga-luxury-spa' | 'signature-spa') => {
    setActivePartnerId(spaId);
    const el = document.getElementById('partners');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterMenuBySpa = (spaId: 'saga-luxury-spa' | 'signature-spa') => {
    setServicesSpaFilter(spaId);
    const el = document.getElementById('treatments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentPartner =
    SPA_PARTNERS.find((p) => p.id === selectedServiceForDetail?.spaId) || SPA_PARTNERS[0];

  return (
    <div className="min-h-screen bg-[#0b0d0e] text-[#ede8df] flex flex-col selection:bg-[#c59b6d] selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl glass-panel-elevated border border-[#c59b6d] shadow-2xl flex items-center gap-3 max-w-md animate-bounce">
          <div className="w-2.5 h-2.5 rounded-full bg-[#c59b6d] shrink-0" />
          <span className="text-xs text-white font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white text-xs ml-auto"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onOpenBooking={() => openBookingModal()}
        onOpenMyBookings={() => setIsMyBookingsOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenGiftVouchers={() => setIsGiftVoucherOpen(true)}
        activeBookings={bookings}
        conciergeMode={isConciergeOpen}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero */}
        <Hero onSearch={handleHeroSearch} onSelectPartner={handleSelectPartner} />

        {/* Dual Partner Showcase */}
        <PartnerShowcase
          partners={SPA_PARTNERS}
          activePartnerId={activePartnerId}
          onSelectPartnerId={setActivePartnerId}
          onBookAtSpa={(id) => openBookingModal(id)}
          onFilterMenuBySpa={handleFilterMenuBySpa}
        />

        {/* Treatment Menu Explorer */}
        <ServicesExplorer
          services={SPA_SERVICES}
          initialSpaFilter={servicesSpaFilter}
          initialCategoryFilter={servicesCategoryFilter}
          onSelectServiceDetails={(srv) => setSelectedServiceForDetail(srv)}
          onBookService={(srv, duration) => openBookingModal(srv.spaId, srv.id, duration)}
        />

        {/* Sanctuary Standards */}
        <SanctuaryStandards />

        {/* Testimonials */}
        <TestimonialsSection testimonials={TESTIMONIALS} />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => openBookingModal()}
        onOpenGiftVouchers={() => setIsGiftVoucherOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onSelectPartner={handleSelectPartner}
      />

      {/* MODALS */}
      {/* 1. Unified Booking Wizard */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        partners={SPA_PARTNERS}
        services={SPA_SERVICES}
        preselectedSpaId={preselectedSpaId}
        preselectedServiceId={preselectedServiceId}
        preselectedDuration={preselectedDuration}
        onBookingConfirmed={handleBookingConfirmed}
      />

      {/* 2. Service Detail Modal */}
      <ServiceDetailModal
        service={selectedServiceForDetail}
        partner={currentPartner}
        onClose={() => setSelectedServiceForDetail(null)}
        onBookNow={(srv, duration) => openBookingModal(srv.spaId, srv.id, duration)}
      />

      {/* 3. My Bookings Modal */}
      <MyBookingsModal
        isOpen={isMyBookingsOpen}
        onClose={() => setIsMyBookingsOpen(false)}
        bookings={bookings}
        partners={SPA_PARTNERS}
        onBookingsUpdated={refreshBookings}
        onOpenNewBooking={() => openBookingModal()}
      />

      {/* 4. Partner Concierge Portal */}
      <ConciergePortal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        partners={SPA_PARTNERS}
        bookings={bookings}
      />

      {/* 5. Gift Voucher Modal */}
      <GiftVoucherModal
        isOpen={isGiftVoucherOpen}
        onClose={() => setIsGiftVoucherOpen(false)}
        partners={SPA_PARTNERS}
      />
    </div>
  );
};
export default App;
