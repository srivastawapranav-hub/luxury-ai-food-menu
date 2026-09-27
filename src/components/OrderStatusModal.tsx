import React, { useState, useEffect } from 'react';
import { OrderRecord } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { CheckCircle2, ChefHat, Clock, Sparkles, Utensils, Bell, Receipt, X, ArrowRight } from 'lucide-react';

interface OrderStatusModalProps {
  order: OrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBill: () => void;
  onRequestAssistance: () => void;
}

export const OrderStatusModal: React.FC<OrderStatusModalProps> = ({
  order,
  isOpen,
  onClose,
  onOpenBill,
  onRequestAssistance,
}) => {
  if (!isOpen || !order) return null;

  // Simulated live progress
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [minutesRemaining, setMinutesRemaining] = useState<number>(order.estimatedMinutes || 20);

  useEffect(() => {
    // Countdown timer simulation
    const interval = setInterval(() => {
      setMinutesRemaining((prev) => Math.max(1, prev - 1));
    }, 60000); // 1 minute per tick

    return () => clearInterval(interval);
  }, []);

  const stages = [
    { step: 1, label: "Order Confirmed", desc: "Transmitted to Executive Chef Julian Vance's station." },
    { step: 2, label: "Culinary Preparation", desc: "Ingredients tempered, searing over Binchotan coals." },
    { step: 3, label: "Plating & Sommelier Inspection", desc: "Tableside cloche and reserve wine temperature checked." },
    { step: 4, label: "Serving to Your Table", desc: "Attentive server en route to your allocation." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-[#0f1013] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Header */}
          <div className="text-center mb-6">
            <span className="text-[11px] uppercase tracking-widest text-[#c5a059] font-medium block mb-1">
              Live Kitchen Tracker · {order.locationIdentifier}
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#f5f3ef]">
              Your Dining Experience
            </h2>
            <div className="flex items-center justify-center gap-3 text-xs text-stone-400 mt-2 font-mono">
              <span>Order {order.orderNumber}</span>
              <span>·</span>
              <span>Placed at {order.timestamp}</span>
            </div>
          </div>

          {/* Time Remaining Callout */}
          <div className="bg-[#14151a] border border-[#c5a059]/30 rounded-2xl p-4 text-center mb-8 shadow-inner">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest block mb-1">
              Estimated Serving Time
            </span>
            <div className="font-mono text-3xl sm:text-4xl font-light text-[#d4af37] flex items-center justify-center gap-2">
              <Clock className="w-6 h-6 text-[#c5a059]" />
              <span>~{minutesRemaining} Minutes</span>
            </div>
            <p className="text-[11px] text-stone-400 italic mt-1 font-serif-luxury">
              Crafted fresh à la minute. Precision timing for optimal temperature.
            </p>
          </div>

          {/* Progress Timeline */}
          <div className="space-y-4 mb-8">
            {stages.map((stage) => {
              const isPast = stage.step < currentStep;
              const isCurrent = stage.step === currentStep;
              return (
                <div key={stage.step} className="flex items-start gap-4">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isPast
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-400'
                        : isCurrent
                        ? 'bg-[#1e1d16] border-[#c5a059] text-[#c5a059] shadow-[0_0_15px_rgba(197,160,89,0.3)] animate-pulse'
                        : 'border-white/10 text-stone-600 bg-[#121316]'
                    }`}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-mono font-medium">{stage.step}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`text-xs uppercase tracking-wider font-semibold ${
                        isCurrent ? 'text-[#c5a059]' : isPast ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {stage.label}
                    </h4>
                    <p className="text-xs text-stone-400 font-light mt-0.5">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Staff Controls for simulation testing */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 pb-4 mb-4 border-b border-white/5">
            <span>Advance Kitchen Stage (Staff Sim):</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentStep(num)}
                  className={`w-6 h-6 rounded text-[10px] font-mono ${
                    currentStep === num ? 'bg-[#c5a059] text-black font-bold' : 'bg-white/5 hover:bg-white/10 text-stone-400'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Order Details Brief */}
          <div className="bg-[#121316] rounded-xl p-3.5 border border-white/5 text-xs text-stone-300 space-y-1.5 mb-6">
            <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-1">Items in this Course</span>
            {order.items.map((it) => (
              <div key={it.cartItemId} className="flex justify-between items-center text-xs">
                <span>{it.quantity}x {it.dish.name}</span>
                <span className="font-mono text-stone-400">{RESTAURANT_INFO.currencySymbol}{it.totalPrice.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onRequestAssistance}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#17181e] hover:bg-[#20212a] border border-white/10 text-xs font-medium text-stone-300 transition-colors cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Request Table Service</span>
          </button>

          <button
            onClick={onOpenBill}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black text-xs font-medium uppercase tracking-wider shadow-lg hover:brightness-105 transition-all cursor-pointer"
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>View Digital Bill</span>
          </button>
        </div>
      </div>
    </div>
  );
};
