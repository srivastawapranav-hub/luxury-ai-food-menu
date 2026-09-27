import React, { useState } from 'react';
import { OrderRecord } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { X, Receipt, Check, CreditCard, Hotel, Sparkles, Star, Download, ShieldCheck, Heart } from 'lucide-react';

interface DigitalBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: OrderRecord | null;
  onPaymentSuccess?: () => void;
}

export const DigitalBillModal: React.FC<DigitalBillModalProps> = ({
  isOpen,
  onClose,
  order,
  onPaymentSuccess,
}) => {
  if (!isOpen || !order) return null;

  const [selectedTipPercent, setSelectedTipPercent] = useState<number>(10);
  const [customTip, setCustomTip] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'room' | 'card' | 'upi' | 'folio'>('room');
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(5);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const calculatedTip = customTip
    ? parseFloat(customTip) || 0
    : Math.round(order.subtotal * (selectedTipPercent / 100));

  const grandTotal = order.subtotal + order.tax + order.serviceCharge + calculatedTip;

  const handlePayNow = () => {
    setIsPaid(true);
    if (onPaymentSuccess) onPaymentSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#0e0f12] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#121316]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 bg-[#191a20] flex items-center justify-center text-[#c5a059]">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-luxury text-lg font-medium text-[#f5f3ef]">
                Your Digital Folio
              </h2>
              <span className="text-[11px] text-stone-400">
                {order.locationIdentifier} · Order {order.orderNumber}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Folio Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Restaurant Crest & Details */}
          <div className="text-center pb-4 border-b border-dashed border-white/15">
            <h3 className="font-serif-luxury text-xl text-[#f7f5f0] tracking-wider uppercase">
              {RESTAURANT_INFO.name}
            </h3>
            <p className="text-[11px] text-stone-400 uppercase tracking-widest mt-0.5">
              {RESTAURANT_INFO.hotelName}
            </p>
            <p className="text-[10px] text-stone-500 mt-1 font-mono">
              Tax Invoice · GSTIN 27AAACT2948R1Z5 · Table allocation {order.locationIdentifier}
            </p>
          </div>

          {/* Itemized Dishes */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-[11px] uppercase tracking-wider text-stone-500 font-semibold pb-1 border-b border-white/5">
              <span>Item Description</span>
              <span>Amount</span>
            </div>
            {order.items.map((it) => (
              <div key={it.cartItemId} className="flex justify-between items-start text-xs text-stone-200">
                <div className="pr-4">
                  <span className="font-medium text-stone-100">{it.quantity}x {it.dish.name}</span>
                  {it.selectedPortion && it.selectedPortion.name !== 'Regular Portioned' && (
                    <span className="block text-[11px] text-[#c5a059]">· {it.selectedPortion.name}</span>
                  )}
                  {it.selectedAddOns.length > 0 && (
                    <span className="block text-[10px] text-stone-400">
                      · {it.selectedAddOns.map(a => a.name).join(', ')}
                    </span>
                  )}
                </div>
                <span className="font-mono text-stone-300 font-medium tabular-nums shrink-0">
                  {RESTAURANT_INFO.currencySymbol}{it.totalPrice.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Subtotal, Tax, Service Charge */}
          <div className="pt-3 border-t border-dashed border-white/15 space-y-1.5 text-xs text-stone-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono text-stone-200">{RESTAURANT_INFO.currencySymbol}{order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5% Goods & Service Tax)</span>
              <span className="font-mono text-stone-200">{RESTAURANT_INFO.currencySymbol}{order.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Luxury Hospitality Service Charge (10%)</span>
              <span className="font-mono text-stone-200">{RESTAURANT_INFO.currencySymbol}{order.serviceCharge.toLocaleString()}</span>
            </div>
          </div>

          {/* Staff Gratuity / Tip Selector */}
          {!isPaid && (
            <div className="p-3.5 rounded-xl bg-[#14151a] border border-white/5">
              <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium mb-2">
                Staff Gratuity (Distributed 100% to Service & Kitchen Brigade)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[0, 10, 15, 20].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => {
                      setSelectedTipPercent(pct);
                      setCustomTip('');
                    }}
                    className={`py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      selectedTipPercent === pct && !customTip
                        ? 'bg-[#c5a059] text-black font-bold'
                        : 'bg-[#1a1c22] text-stone-400 hover:text-white'
                    }`}
                  >
                    {pct === 0 ? 'None' : `${pct}%`}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-stone-400 mt-2">
                <span>Gratuity Added:</span>
                <span className="font-mono text-[#c5a059] font-medium">
                  {RESTAURANT_INFO.currencySymbol}{calculatedTip.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Final Grand Total */}
          <div className="p-4 rounded-xl bg-[#15161b] border border-[#c5a059]/40 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Final Amount Payable</span>
              <span className="text-xs text-stone-500 font-light">Includes taxes, hospitality charge & gratuity</span>
            </div>
            <span className="font-mono text-2xl font-bold text-[#d4af37] tabular-nums">
              {RESTAURANT_INFO.currencySymbol}{grandTotal.toLocaleString()}
            </span>
          </div>

          {/* Payment Method Selector if not yet paid */}
          {!isPaid ? (
            <div className="space-y-3">
              <label className="block text-xs uppercase tracking-wider text-stone-400 font-medium">
                Select Settlement Method
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('room')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                    paymentMethod === 'room'
                      ? 'border-[#c5a059] bg-[#1a1914] text-stone-100'
                      : 'border-white/5 bg-[#14151a] text-stone-400 hover:border-white/20'
                  }`}
                >
                  <Hotel className="w-4 h-4 text-[#c5a059]" />
                  <div>
                    <span className="text-xs font-medium block">Room Folio Charge</span>
                    <span className="text-[10px] text-stone-500">Bill to Suite</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#c5a059] bg-[#1a1914] text-stone-100'
                      : 'border-white/5 bg-[#14151a] text-stone-400 hover:border-white/20'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-[#c5a059]" />
                  <div>
                    <span className="text-xs font-medium block">Credit / AMEX</span>
                    <span className="text-[10px] text-stone-500">Apple Pay & Tap</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-[#c5a059] bg-[#1a1914] text-stone-100'
                      : 'border-white/5 bg-[#14151a] text-stone-400 hover:border-white/20'
                  }`}
                >
                  <Receipt className="w-4 h-4 text-[#c5a059]" />
                  <div>
                    <span className="text-xs font-medium block">Instant UPI / QR</span>
                    <span className="text-[10px] text-stone-500">GPay, PhonePe</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('folio')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                    paymentMethod === 'folio'
                      ? 'border-[#c5a059] bg-[#1a1914] text-stone-100'
                      : 'border-white/5 bg-[#14151a] text-stone-400 hover:border-white/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <div>
                    <span className="text-xs font-medium block">Leather Folio Bill</span>
                    <span className="text-[10px] text-stone-500">Bring to table</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Payment Success Receipt */
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/50">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="font-serif-luxury text-lg text-emerald-300 font-medium">
                Settlement Completed
              </h4>
              <p className="text-xs text-stone-300 font-light max-w-xs mx-auto">
                Thank you for gracing {RESTAURANT_INFO.name}. A digital receipt copy has been saved to your guest record.
              </p>

              {/* Experience Rating */}
              <div className="pt-3 border-t border-white/10 mt-3">
                <span className="text-[11px] uppercase tracking-widest text-stone-400 block mb-2 font-medium">
                  Rate Your Experience
                </span>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setRating(star);
                        setFeedbackSent(true);
                      }}
                      className="text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {feedbackSent && (
                  <p className="text-[11px] text-[#c5a059] italic font-serif-luxury">
                    Thank you. Master Chef Julian Vance and the team appreciate your gracious score.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/10 bg-[#121316] flex items-center justify-between gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1a1b22] hover:bg-[#22242e] border border-white/10 text-xs text-stone-300 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Download PDF</span>
          </button>

          {!isPaid ? (
            <button
              onClick={handlePayNow}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black py-3 rounded-xl font-medium tracking-wide text-xs uppercase shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Settle {RESTAURANT_INFO.currencySymbol}{grandTotal.toLocaleString()}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs uppercase font-medium tracking-wide transition-colors cursor-pointer"
            >
              Close Folio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
