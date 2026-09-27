import React from 'react';
import { DishItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { Heart, X, Plus, Star, Clock } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteDishIds: string[];
  allDishes: DishItem[];
  onOpenDetails: (dish: DishItem) => void;
  onQuickAdd: (dish: DishItem) => void;
  onRemoveFavorite: (dishId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoriteDishIds,
  allDishes,
  onOpenDetails,
  onQuickAdd,
  onRemoveFavorite,
}) => {
  if (!isOpen) return null;

  const favoriteDishes = allDishes.filter((d) => favoriteDishIds.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#111216] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#14151a]">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h3 className="font-serif-luxury text-xl font-medium text-[#f5f3ef]">
              My Saved Favorites
            </h3>
            <span className="text-xs text-stone-500 font-mono">({favoriteDishes.length})</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {favoriteDishes.length === 0 ? (
            <div className="py-16 text-center text-stone-500">
              <div className="w-12 h-12 rounded-full border border-dashed border-white/15 flex items-center justify-center mx-auto mb-3 text-stone-600">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base text-stone-300 mb-1">
                Your Favorites
              </h4>
              <p className="text-xs text-stone-500 max-w-[240px] mx-auto">
                "Your favorite dishes will appear here." Tap the heart icon on any dish to save it for your tasting session.
              </p>
            </div>
          ) : (
            favoriteDishes.map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  onClose();
                  onOpenDetails(dish);
                }}
                className="bg-[#15161b] hover:bg-[#1a1b22] border border-white/5 hover:border-[#c5a059]/40 rounded-xl p-3.5 flex items-center justify-between gap-4 transition-all cursor-pointer group"
              >
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-luxury text-sm font-medium text-stone-100 group-hover:text-[#c5a059] transition-colors truncate">
                    {dish.name}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-1 font-light">
                    {dish.shortDescription}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-stone-500 mt-1">
                    <span className="text-[#c5a059]">{dish.category}</span>
                    <span>·</span>
                    <span className="font-mono text-stone-300 font-semibold">
                      {RESTAURANT_INFO.currencySymbol}{dish.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(dish);
                    }}
                    className="p-2 rounded-lg bg-[#c5a059] text-black hover:brightness-110 text-xs font-medium"
                    title="Add to order"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFavorite(dish.id);
                    }}
                    className="p-2 text-stone-500 hover:text-red-400"
                    title="Remove favorite"
                  >
                    <X className="w-4 h-4" />
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
