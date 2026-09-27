import React from 'react';
import { DishItem, CartItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { Wine, Sparkles, Plus, ArrowRight } from 'lucide-react';

interface SmartPairingSectionProps {
  cartItems: CartItem[];
  allDishes: DishItem[];
  onOpenDetails: (dish: DishItem) => void;
  onQuickAdd: (dish: DishItem) => void;
}

export const SmartPairingSection: React.FC<SmartPairingSectionProps> = ({
  cartItems,
  allDishes,
  onOpenDetails,
  onQuickAdd,
}) => {
  // If no items in cart, recommend standard flagship pairings
  const mainDishInCart = cartItems.find((c) =>
    ['Chef\'s Signature', 'Continental & Grills', 'Seafood & Coastal', 'Indian Heritage', 'Italian & Pasta'].includes(
      c.dish.category
    )
  )?.dish || allDishes[0];

  const suggestedPairings = mainDishInCart?.pairings || [];
  if (suggestedPairings.length === 0) return null;

  return (
    <section className="my-14 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="bg-[#121317] border border-[#c5a059]/25 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a059] font-medium mb-1">
              <Wine className="w-4 h-4 text-[#d4af37]" />
              <span>Sommelier & Cellar Guidance</span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#f7f5f0] font-light">
              Complete Your Dining Experience
            </h3>
            <p className="text-xs text-stone-400 font-light mt-0.5">
              Harmonious reserve pairings curated by Head Sommelier Éléonore Moreau for your table.
            </p>
          </div>
        </div>

        {/* Pairings Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedPairings.map((pairing) => {
            // Find if matching dish exists in menu, or display pairing directly
            const matchedDish = allDishes.find((d) => d.id === pairing.id || d.name === pairing.name);
            return (
              <div
                key={pairing.id}
                className="bg-[#15171d] border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:border-[#c5a059]/30 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={pairing.image}
                      alt={pairing.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#c5a059] block">
                        {pairing.category}
                      </span>
                      <h4 className="font-serif-luxury text-sm font-medium text-stone-100">
                        {pairing.name}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-stone-400 font-serif-luxury italic leading-relaxed mb-3">
                    "{pairing.reason}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="font-mono text-sm font-semibold text-stone-200">
                    {RESTAURANT_INFO.currencySymbol}{pairing.price.toLocaleString()}
                  </span>

                  <button
                    onClick={() => {
                      if (matchedDish) {
                        onQuickAdd(matchedDish);
                      } else {
                        // Create ephemeral item to add
                        const pseudoDish: DishItem = {
                          id: pairing.id,
                          name: pairing.name,
                          category: pairing.category,
                          shortDescription: pairing.reason,
                          fullDescription: pairing.reason,
                          price: pairing.price,
                          isVegetarian: true,
                          isVegan: false,
                          spiceLevel: 'None',
                          prepTimeMinutes: 5,
                          rating: 5,
                          reviewCount: 95,
                          image: pairing.image,
                          ingredients: [],
                          allergens: [],
                          nutrition: { calories: 120, protein: '0g', carbs: '4g', fat: '0g', servingSize: '1 glass' },
                          chefsNote: pairing.reason,
                          isAvailable: true,
                        };
                        onQuickAdd(pseudoDish);
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c5a059] text-black hover:brightness-110 text-xs font-medium transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Pairing</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
