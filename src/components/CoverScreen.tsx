import React, { useState } from 'react';
import { DiningMode } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { Wine, Sparkles, UtensilsCrossed, Hotel, Globe, ChevronRight, Clock, Star } from 'lucide-react';

interface CoverScreenProps {
  onEnterMenu: () => void;
  diningMode: DiningMode;
  setDiningMode: (mode: DiningMode) => void;
  locationNumber: string;
  setLocationNumber: (loc: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'fr', label: 'Français' },
  { code: 'ja', label: '日本語' },
  { code: 'es', label: 'Español' },
];

export const CoverScreen: React.FC<CoverScreenProps> = ({
  onEnterMenu,
  diningMode,
  setDiningMode,
  locationNumber,
  setLocationNumber,
  language,
  setLanguage,
}) => {
  const [ambientAudioPlaying, setAmbientAudioPlaying] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#08080a] text-[#f5f3ef] overflow-hidden select-none">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105 opacity-40 brightness-75"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        {/* Soft Luxury Vignette & Radial Light */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/80 to-[#08080a]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Top Bar on Cover */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium block">
              {RESTAURANT_INFO.hotelName}
            </span>
            <span className="text-xs text-stone-400">Three Michelin Stars · Grand Luxury</span>
          </div>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-2 bg-[#121316]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
          <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-stone-200 outline-none cursor-pointer pr-1"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="bg-[#141518] text-stone-200">
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* Center Hero Block */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-12 flex flex-col items-center text-center">
        {/* Crest & Insignia */}
        <div className="mb-6 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#c5a059]/50 bg-[#121316]/60 backdrop-blur-md text-[#c5a059] shadow-[0_0_30px_rgba(197,160,89,0.2)] mb-4">
            <UtensilsCrossed className="w-7 h-7" />
          </div>
          <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent" />
        </div>

        {/* Title */}
        <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light tracking-wide text-[#fdfcf9] mb-4 drop-shadow-sm">
          {RESTAURANT_INFO.name}
        </h1>
        
        <p className="font-serif-luxury italic text-lg sm:text-2xl text-[#d4af37]/90 max-w-2xl mb-4 font-light tracking-wide">
          "{RESTAURANT_INFO.tagline}"
        </p>

        <p className="text-xs sm:text-sm text-stone-400 max-w-lg mb-10 tracking-wider uppercase font-light">
          Master Chef Julian Vance · Head Sommelier Éléonore Moreau
        </p>

        {/* Dining Mode & Location Selector Card */}
        <div className="w-full max-w-md bg-[#131418]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl mb-8 text-left">
          <div className="text-xs font-medium text-stone-400 uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>Dining Setting</span>
            <span className="text-[#c5a059] font-normal">Complimentary Valet & Sommelier</span>
          </div>

          {/* Toggle Table vs Room */}
          <div className="grid grid-cols-2 gap-2 bg-[#0b0c0e] p-1 rounded-xl border border-white/5 mb-4">
            <button
              onClick={() => {
                setDiningMode('table');
                if (!locationNumber.toLowerCase().includes('table')) {
                  setLocationNumber('Table 14 — Garden Terrace');
                }
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
                diningMode === 'table'
                  ? 'bg-[#c5a059] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Restaurant Table</span>
            </button>

            <button
              onClick={() => {
                setDiningMode('room');
                if (!locationNumber.toLowerCase().includes('suite')) {
                  setLocationNumber('Suite 804 — Royal Penthouse');
                }
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-medium transition-all ${
                diningMode === 'room'
                  ? 'bg-[#c5a059] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>Hotel Room Service</span>
            </button>
          </div>

          {/* Location input selector */}
          <div>
            <label className="block text-[11px] text-stone-400 mb-1.5 uppercase tracking-wider">
              {diningMode === 'table' ? 'Your Table Allocation' : 'Your Suite / Room Number'}
            </label>
            <div className="flex items-center gap-2 bg-[#0b0c0e] border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-stone-200 focus-within:border-[#c5a059]/60 transition-colors">
              <span className="text-[#c5a059] text-xs">#</span>
              <input 
                type="text" 
                value={locationNumber}
                onChange={(e) => setLocationNumber(e.target.value)}
                placeholder={diningMode === 'table' ? 'e.g. Table 14' : 'e.g. Suite 804'}
                className="w-full bg-transparent outline-none text-stone-100 placeholder:text-stone-600 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onEnterMenu}
          className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-[#0a0a0c] px-8 sm:px-10 py-4 rounded-xl font-medium tracking-wider text-sm uppercase shadow-[0_4px_25px_rgba(197,160,89,0.35)] hover:shadow-[0_4px_35px_rgba(197,160,89,0.5)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Explore Digital Menu</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Feature Highlights */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Hold Dish Image to Watch Cooking Video</span>
          </div>
          <span className="text-stone-600">·</span>
          <div className="flex items-center gap-1.5">
            <Wine className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>AI Concierge & Wine Pairings</span>
          </div>
          <span className="text-stone-600">·</span>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Real-time Table & Kitchen Status</span>
          </div>
        </div>
      </main>

      {/* Footer Details */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <div className="flex items-center gap-2">
          <span>{RESTAURANT_INFO.location}</span>
          <span>·</span>
          <span>Open Daily 12:00 – 23:30</span>
        </div>
        <div className="flex items-center gap-4 text-stone-400">
          <span className="hover:text-stone-200 transition-colors">Taxes & Service Disclosed Transparently</span>
          <span>·</span>
          <span className="text-[#c5a059]">Bespoke Dietary Customization</span>
        </div>
      </footer>
    </div>
  );
};
