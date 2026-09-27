import React, { useState } from 'react';
import { DishItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { X, ShieldCheck, Check, AlertCircle, ToggleLeft, ToggleRight, DollarSign, Sparkles } from 'lucide-react';

interface AdminManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: DishItem[];
  onToggleAvailability: (dishId: string) => void;
  onUpdatePrice: (dishId: string, newPrice: number) => void;
}

export const AdminManagerModal: React.FC<AdminManagerModalProps> = ({
  isOpen,
  onClose,
  dishes,
  onToggleAvailability,
  onUpdatePrice,
}) => {
  if (!isOpen) return null;

  const [searchFilter, setSearchFilter] = useState('');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPriceValue, setNewPriceValue] = useState<string>('');

  const filteredDishes = dishes.filter(
    (d) =>
      d.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      d.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleSavePrice = (dishId: string) => {
    const parsed = parseInt(newPriceValue, 10);
    if (!isNaN(parsed) && parsed > 0) {
      onUpdatePrice(dishId, parsed);
    }
    setEditingPriceId(null);
    setNewPriceValue('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[#0f1013] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[700px] max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#14151a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#c5a059]/40 bg-[#1b1c22] flex items-center justify-center text-[#c5a059]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg font-medium text-[#f5f3ef]">
                Restaurant Management & Kitchen Console
              </h3>
              <p className="text-xs text-stone-400">
                Live availability & inventory sync for {RESTAURANT_INFO.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter input */}
        <div className="p-4 bg-[#121316] border-b border-white/5 flex items-center gap-3">
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter dishes by name or category..."
            className="flex-1 bg-[#0b0c0e] border border-white/10 rounded-xl px-4 py-2 text-xs text-stone-200 placeholder:text-stone-600 outline-none focus:border-[#c5a059]/60"
          />
          <span className="text-xs text-stone-400 font-mono">
            {filteredDishes.length} items
          </span>
        </div>

        {/* Dish List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-[#14151a] border border-white/5 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-12 h-12 rounded-lg object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif-luxury text-sm text-stone-100 font-medium">
                      {dish.name}
                    </h4>
                    {!dish.isAvailable && (
                      <span className="text-[10px] uppercase font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/30">
                        Sold Out
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#c5a059] block">
                    {dish.category} · Prep {dish.prepTimeMinutes}m
                  </span>
                </div>
              </div>

              {/* Price & Availability Control */}
              <div className="flex items-center gap-4 justify-between sm:justify-end">
                {/* Editable Price */}
                {editingPriceId === dish.id ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={newPriceValue}
                      onChange={(e) => setNewPriceValue(e.target.value)}
                      placeholder={dish.price.toString()}
                      className="w-20 bg-[#0b0c0e] border border-[#c5a059] rounded-lg px-2 py-1 text-xs text-stone-100 font-mono outline-none"
                    />
                    <button
                      onClick={() => handleSavePrice(dish.id)}
                      className="p-1 rounded bg-[#c5a059] text-black text-xs"
                      title="Save"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setEditingPriceId(null)}
                      className="p-1 text-stone-400 hover:text-white text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      setEditingPriceId(dish.id);
                      setNewPriceValue(dish.price.toString());
                    }}
                    className="font-mono text-sm font-semibold text-stone-200 cursor-pointer hover:text-[#c5a059] flex items-center gap-1 p-1 rounded hover:bg-white/5"
                    title="Click to edit price"
                  >
                    <span>{RESTAURANT_INFO.currencySymbol}{dish.price.toLocaleString()}</span>
                  </div>
                )}

                {/* Availability Toggle */}
                <button
                  onClick={() => onToggleAvailability(dish.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    dish.isAvailable
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/40'
                      : 'bg-red-950/60 text-red-300 border border-red-500/40'
                  }`}
                >
                  <span>{dish.isAvailable ? 'In Stock' : 'Mark Available'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#121316] flex items-center justify-between text-xs text-stone-400">
          <span>Changes update guest tablets instantly in real-time.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
