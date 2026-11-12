import React, { useState } from 'react';
import { X, Gift, Sparkles, Check, Copy, Printer } from 'lucide-react';
import { SpaPartner } from '../types';

interface GiftVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  partners: SpaPartner[];
}

export const GiftVoucherModal: React.FC<GiftVoucherModalProps> = ({
  isOpen,
  onClose,
  partners,
}) => {
  const [targetSpa, setTargetSpa] = useState<string>('any');
  const [amount, setAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentAmount = customAmount ? Number(customAmount) || 0 : amount;

  const handleGenerateVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = targetSpa === 'saga-luxury-spa' ? 'GIFT-SAGA' : targetSpa === 'signature-spa' ? 'GIFT-SIGN' : 'GIFT-DUAL';
    const rand = Math.floor(1000 + Math.random() * 9000);
    setCreatedCode(`${prefix}-${rand}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl border border-white/15 overflow-hidden shadow-2xl my-6">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-[#c59b6d]">
              Exclusive Gift Service
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-medium">
              Curate a Luxury Spa Voucher
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close gift voucher modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          {!createdCode ? (
            <form onSubmit={handleGenerateVoucher} className="space-y-6">
              {/* Partner Select */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Select Sanctuary Valid At
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTargetSpa('any')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      targetSpa === 'any'
                        ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white font-medium'
                        : 'border-white/10 bg-black/30 text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Dual Partner Pass</span>
                    <span className="block text-[10px] text-neutral-400">Valid at both spas</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetSpa('saga-luxury-spa')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      targetSpa === 'saga-luxury-spa'
                        ? 'border-[#c59b6d] bg-[#c59b6d]/15 text-white font-medium'
                        : 'border-white/10 bg-black/30 text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Saga Luxury Spa</span>
                    <span className="block text-[10px] text-neutral-400">Thermal Sanctuary</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetSpa('signature-spa')}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      targetSpa === 'signature-spa'
                        ? 'border-[#8cae98] bg-[#8cae98]/15 text-white font-medium'
                        : 'border-white/10 bg-black/30 text-neutral-300 hover:bg-white/5'
                    }`}
                  >
                    <span className="block text-xs font-semibold">Signature Spa</span>
                    <span className="block text-[10px] text-neutral-400">Botanical Zen</span>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                  Voucher Value (INR)
                </label>
                <div className="grid grid-cols-4 gap-2.5 mb-2.5">
                  {[1500, 2500, 4000, 6000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-3 rounded-xl border text-center transition-all ${
                        amount === val && !customAmount
                          ? 'border-[#c59b6d] bg-[#c59b6d]/20 text-white font-bold'
                          : 'border-white/10 bg-black/30 text-neutral-300 hover:bg-white/5'
                      }`}
                    >
                      ₹{val}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount (e.g. ₹3500)..."
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-[#c59b6d]"
                />
              </div>

              {/* Recipient & Sender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Evelyn Harper"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c59b6d]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Recipient Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. evelyn@example.com"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c59b6d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Your Name (Sender) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nicholas"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c59b6d]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                    Personalized Message
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Enjoy a day of total peace and relaxation."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#c59b6d]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-xs tracking-wider uppercase text-black bg-gradient-to-r from-[#dec3a0] to-[#c59b6d] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#c59b6d]/20"
              >
                Create Digital Voucher (₹{currentAmount})
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#c59b6d]/20 border border-[#c59b6d] flex items-center justify-center mx-auto text-[#c59b6d]">
                <Gift className="w-7 h-7" aria-hidden="true" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#c59b6d] font-semibold">
                  Gift Voucher Issued
                </span>
                <h4 className="font-serif-luxury text-2xl text-white font-medium mt-1">
                  Ready for Delivery
                </h4>
                <p className="text-xs text-neutral-300 mt-1">
                  An email copy has been simulated for {recipientEmail}.
                </p>
              </div>

              {/* Digital Voucher Preview */}
              <div className="max-w-md mx-auto rounded-3xl bg-gradient-to-br from-[#2a2218] via-[#15171a] to-[#0c0d10] border border-[#c59b6d] p-6 text-left shadow-2xl relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#c59b6d] font-bold block">
                      MASSAGE AT SPA GIFT CARD
                    </span>
                    <h5 className="font-serif-luxury text-lg text-white">
                      {targetSpa === 'saga-luxury-spa'
                        ? 'Saga Luxury Spa'
                        : targetSpa === 'signature-spa'
                        ? 'Signature Spa'
                        : 'Dual Sanctuary Choice Pass'}
                    </h5>
                  </div>
                  <span className="font-serif-luxury text-2xl font-bold text-[#c59b6d]">
                    ₹{currentAmount}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-neutral-300 mb-4">
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Presented To</span>
                    <span className="font-medium text-white">{recipientName || 'Valued Guest'}</span>
                  </div>
                  {message && (
                    <div>
                      <span className="text-neutral-400 block text-[10px] uppercase">Message</span>
                      <p className="italic text-neutral-200">"{message}"</p>
                    </div>
                  )}
                  <div>
                    <span className="text-neutral-400 block text-[10px] uppercase">Gift Code</span>
                    <span className="font-mono text-sm font-bold text-[#c59b6d]">{createdCode}</span>
                  </div>
                </div>

                <div className="text-[10px] text-neutral-400 border-t border-white/10 pt-2 text-center">
                  Redeemable online at massageatspa.com or presented directly at partner sanctuary.
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCreatedCode(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 bg-white/10 hover:bg-white/15"
                >
                  Create Another Voucher
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-black bg-[#c59b6d] hover:bg-[#d8b083]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
