import React, { useState } from 'react';
import { SERVICE_REQUEST_OPTIONS, RESTAURANT_INFO } from '../data/menuData';
import { DiningMode } from '../types/menu';
import { 
  X, BellRing, Droplet, UserCheck, Wine, Utensils, Receipt, Heart, Check, Clock, Sparkles
} from 'lucide-react';

interface ServiceAssistanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  diningMode: DiningMode;
  locationNumber: string;
}

export const ServiceAssistanceModal: React.FC<ServiceAssistanceModalProps> = ({
  isOpen,
  onClose,
  diningMode,
  locationNumber,
}) => {
  if (!isOpen) return null;

  const [activeRequest, setActiveRequest] = useState<string | null>(null);
  const [confirmedTime, setConfirmedTime] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'droplet': return <Droplet className="w-5 h-5 text-blue-400" />;
      case 'user-check': return <UserCheck className="w-5 h-5 text-[#c5a059]" />;
      case 'wine': return <Wine className="w-5 h-5 text-purple-400" />;
      case 'utensils': return <Utensils className="w-5 h-5 text-amber-400" />;
      case 'receipt': return <Receipt className="w-5 h-5 text-emerald-400" />;
      default: return <Heart className="w-5 h-5 text-red-400" />;
    }
  };

  const handleSelectOption = (opt: typeof SERVICE_REQUEST_OPTIONS[0]) => {
    setActiveRequest(opt.label);
    setConfirmedTime(opt.estimate);
    setTimeout(() => {
      // Keep confirmation visible
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#101115] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full border border-[#c5a059]/40 bg-[#16171d] flex items-center justify-center text-[#c5a059]">
            <BellRing className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-xl font-medium text-[#f5f3ef]">
              Table & Hospitality Assistance
            </h3>
            <span className="text-xs text-[#c5a059]">
              Allocated to {locationNumber} · {diningMode === 'table' ? 'Restaurant Floor' : 'In-Suite Service'}
            </span>
          </div>
        </div>

        {/* Confirmation banner if request sent */}
        {activeRequest ? (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 mb-6 text-center animate-fadeIn">
            <div className="w-8 h-8 rounded-full bg-emerald-900/60 text-emerald-400 flex items-center justify-center mx-auto mb-2 border border-emerald-500/50">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <h4 className="font-serif-luxury text-base text-emerald-300 font-medium">
              Attendant Dispatched
            </h4>
            <p className="text-xs text-stone-300 mt-1">
              "{activeRequest}" requested for <strong className="text-white">{locationNumber}</strong>.
            </p>
            <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#d4af37] font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Arriving in approximately {confirmedTime}</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-stone-400 font-light mb-6">
            Tap any service below. Your dedicated hospitality team member will attend to your request immediately.
          </p>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {SERVICE_REQUEST_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelectOption(opt)}
              className="p-3.5 rounded-xl bg-[#14151a] hover:bg-[#1b1c24] border border-white/5 hover:border-[#c5a059]/40 flex items-center gap-3 text-left transition-all group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0e0f13] border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                {getIcon(opt.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-medium text-stone-200 block truncate group-hover:text-[#c5a059]">
                  {opt.label}
                </span>
                <span className="text-[10px] text-stone-500 font-mono">
                  Response ~{opt.estimate}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
        >
          Return to Menu
        </button>
      </div>
    </div>
  );
};
