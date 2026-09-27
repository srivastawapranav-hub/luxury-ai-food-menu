import React from 'react';
import { DiningMode, CartItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { UtensilsCrossed, Hotel, BellRing, Sparkles, ShoppingBag, ShieldCheck, Heart, Search } from 'lucide-react';

interface NavbarProps {
  diningMode: DiningMode;
  setDiningMode: (mode: DiningMode) => void;
  locationNumber: string;
  cartItems: CartItem[];
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenConcierge: () => void;
  onOpenAssistance: () => void;
  onOpenFavorites: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onOpenCover: () => void;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  diningMode,
  setDiningMode,
  locationNumber,
  cartItems,
  favoritesCount,
  onOpenCart,
  onOpenConcierge,
  onOpenAssistance,
  onOpenFavorites,
  onOpenSearch,
  onOpenAdmin,
  onOpenCover,
  activeCategory,
  onSelectCategory,
}) => {
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0c0e]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={onOpenCover}
          className="text-left font-serif-luxury text-xl sm:text-2xl tracking-wider text-[#f5f3ef] hover:text-[#c5a059] transition-colors whitespace-nowrap shrink-0"
        >
          {RESTAURANT_INFO.name}
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-medium uppercase tracking-widest text-stone-300 shrink-0">
          <button 
            onClick={() => onSelectCategory("All Dishes")}
            className={`hover:text-[#c5a059] transition-colors cursor-pointer ${activeCategory === "All Dishes" ? "text-[#c5a059] border-b border-[#c5a059] pb-0.5" : ""}`}
          >
            Menu
          </button>
          <button 
            onClick={() => onSelectCategory("Chef's Signature")}
            className={`hover:text-[#c5a059] transition-colors cursor-pointer ${activeCategory === "Chef's Signature" ? "text-[#c5a059] border-b border-[#c5a059] pb-0.5" : ""}`}
          >
            Signatures
          </button>
          <button 
            onClick={onOpenConcierge}
            className="flex items-center gap-1.5 text-[#d4af37] hover:brightness-110 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Concierge</span>
          </button>
          <button 
            onClick={() => onSelectCategory("Reserve Cellar & Cocktails")}
            className={`hover:text-[#c5a059] transition-colors cursor-pointer ${activeCategory === "Reserve Cellar & Cocktails" ? "text-[#c5a059] border-b border-[#c5a059] pb-0.5" : ""}`}
          >
            Wine Cellar
          </button>
          <button 
            onClick={onOpenAssistance}
            className="hover:text-[#c5a059] transition-colors cursor-pointer"
          >
            Assistance
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions and controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Location Badge (Interactive quick change) */}
          <button
            onClick={onOpenCover}
            title="Change Dining Setting"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141518] hover:bg-[#1a1c22] border border-white/10 text-stone-300 text-xs transition-colors"
          >
            {diningMode === 'table' ? (
              <UtensilsCrossed className="w-3 h-3 text-[#c5a059]" />
            ) : (
              <Hotel className="w-3 h-3 text-[#c5a059]" />
            )}
            <span className="font-medium truncate max-w-[120px]">{locationNumber}</span>
          </button>

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-300 hover:text-[#c5a059] rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Search Dishes and Ingredients"
            title="Search Menu"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Favorites Heart */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-stone-300 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Saved Favorites"
            title="My Favorites"
          >
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            )}
          </button>

          {/* AI Concierge Quick Trigger (visible on mobile too) */}
          <button
            onClick={onOpenConcierge}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#191815] border border-[#c5a059]/40 text-[#c5a059] hover:bg-[#222019] text-xs font-medium transition-colors cursor-pointer"
            title="AI Dining Concierge & Sommelier"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="hidden sm:inline">Concierge</span>
          </button>

          {/* Request Service / Call Waiter */}
          <button
            onClick={onOpenAssistance}
            className="p-2 text-stone-300 hover:text-[#c5a059] rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            title="Request Service / Water / Waiter"
            aria-label="Table Assistance"
          >
            <BellRing className="w-4 h-4" />
          </button>

          {/* Cart / Dining Order Folio */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-[#0a0a0c] px-3.5 py-1.5 rounded-lg font-medium text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden md:inline font-semibold">Order</span>
            {totalItemCount > 0 ? (
              <span className="bg-[#0b0c0e] text-[#f5f3ef] text-[11px] font-mono px-1.5 py-0.2 rounded-full font-medium">
                {totalItemCount}
              </span>
            ) : null}
            {cartSubtotal > 0 && (
              <span className="hidden sm:inline font-mono font-bold text-xs pl-0.5 border-l border-black/20">
                {RESTAURANT_INFO.currencySymbol}{cartSubtotal.toLocaleString()}
              </span>
            )}
          </button>

          {/* Staff Manager Portal */}
          <button
            onClick={onOpenAdmin}
            title="Staff Kitchen & Menu Controls"
            className="p-1.5 text-stone-500 hover:text-stone-300 text-xs transition-colors rounded"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
