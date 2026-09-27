import React, { useState } from 'react';
import { DishItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { Search, X, Star, Clock, Plus, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: DishItem[];
  onOpenDetails: (dish: DishItem) => void;
  onQuickAdd: (dish: DishItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  dishes,
  onOpenDetails,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase().trim();
  const searchResults = q
    ? dishes.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.shortDescription.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q) ||
          d.ingredients.some((ing) => ing.toLowerCase().includes(q)) ||
          (d.secondaryTitle && d.secondaryTitle.toLowerCase().includes(q))
      )
    : [];

  const popularSearches = ['Truffle', 'Wagyu', 'Caviar', 'Saffron', 'Sea Bass', 'Chocolate', 'Risotto'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#111216] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#14151a]">
          <Search className="w-5 h-5 text-[#c5a059] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish name, ingredient (e.g. Truffle, Paneer, Wagyu, Saffron)..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-100 placeholder:text-stone-600 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-stone-500 hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!searchQuery && (
          <div className="p-5 border-b border-white/5 bg-[#0e0f13]">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium block mb-2">
              Popular Culinary Inquiries
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setSearchQuery(term)}
                  className="px-3 py-1 rounded-lg bg-[#181920] hover:bg-[#22242e] text-stone-300 hover:text-white text-xs border border-white/5 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {searchQuery && searchResults.length === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="font-serif-luxury text-base text-stone-300 mb-1">
                No matching dishes found for "{searchQuery}"
              </p>
              <p className="text-xs text-stone-500">
                Our kitchen can cater bespoke requests. Consult Monsieur Vance via AI Concierge.
              </p>
            </div>
          ) : (
            (searchQuery ? searchResults : dishes.slice(0, 4)).map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  onClose();
                  onOpenDetails(dish);
                }}
                className="bg-[#15161b] hover:bg-[#1a1b22] border border-white/5 hover:border-[#c5a059]/40 rounded-xl p-3 flex items-center justify-between gap-3.5 transition-all cursor-pointer group"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif-luxury text-sm font-medium text-stone-100 group-hover:text-[#c5a059] transition-colors truncate">
                      {dish.name}
                    </h4>
                    {dish.badge && (
                      <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#c5a059]/15 text-[#c5a059]">
                        {dish.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-1 font-light">
                    {dish.shortDescription}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-stone-500 mt-1">
                    <span className="text-[#c5a059]">{dish.category}</span>
                    <span>·</span>
                    <span>Prep {dish.prepTimeMinutes}m</span>
                    <span>·</span>
                    <span className="flex items-center text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400 inline mr-0.5" />
                      {dish.rating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono text-xs font-semibold text-stone-200">
                    {RESTAURANT_INFO.currencySymbol}{dish.price.toLocaleString()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(dish);
                    }}
                    className="p-1.5 rounded-lg bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#c5a059] hover:text-black transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
