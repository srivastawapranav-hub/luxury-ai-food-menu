import React from 'react';
import { DishItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { Sparkles, Plus, Check, ArrowRight } from 'lucide-react';

interface DessertSpotlightProps {
  desserts: DishItem[];
  onOpenDetails: (dish: DishItem) => void;
  onQuickAdd: (dish: DishItem) => void;
}

export const DessertSpotlight: React.FC<DessertSpotlightProps> = ({
  desserts,
  onOpenDetails,
  onQuickAdd,
}) => {
  if (desserts.length === 0) return null;

  return (
    <section className="my-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Pâtisserie Finale</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#f5f3ef] font-light tracking-wide mb-2">
          End on a Sweet Note
        </h2>
        <p className="font-serif-luxury italic text-stone-400 text-sm sm:text-base font-light">
          "A meal without a dessert is like a grand sonata without its triumphant crescendo."
        </p>
      </div>

      {/* Grid of Decadent Desserts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {desserts.slice(0, 2).map((dessert) => (
          <div
            key={dessert.id}
            onClick={() => onOpenDetails(dessert)}
            className="group relative bg-[#121317] rounded-2xl border border-white/5 hover:border-[#c5a059]/40 p-5 sm:p-6 transition-all duration-300 flex flex-col sm:flex-row gap-5 items-center cursor-pointer shadow-xl hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
          >
            <div className="relative w-full sm:w-44 aspect-square rounded-xl overflow-hidden shrink-0 bg-[#16171d]">
              <img
                src={dessert.image}
                alt={dessert.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {dessert.badge && (
                <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-[#d4af37] text-[10px] uppercase font-medium px-2 py-0.5 rounded border border-[#c5a059]/30">
                  {dessert.badge}
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059] font-medium block mb-1">
                  Chef's Suggestion
                </span>
                <h3 className="font-serif-luxury text-xl text-[#f4f2ee] group-hover:text-[#c5a059] transition-colors mb-1">
                  {dessert.name}
                </h3>
                {dessert.secondaryTitle && (
                  <p className="font-serif-luxury italic text-xs text-stone-400 mb-2">
                    {dessert.secondaryTitle}
                  </p>
                )}
                <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2 mb-4">
                  {dessert.shortDescription}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="font-mono text-base font-semibold text-[#f5f3ef]">
                  {RESTAURANT_INFO.currencySymbol}{dessert.price.toLocaleString()}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd(dessert);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#c5a059]/15 hover:bg-[#c5a059] text-[#c5a059] hover:text-black border border-[#c5a059]/30 text-xs font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Selection</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
