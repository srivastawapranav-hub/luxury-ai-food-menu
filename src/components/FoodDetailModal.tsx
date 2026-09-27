import React, { useState } from 'react';
import { DishItem, PortionOption, AddOnOption, SpiceLevel, CartItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  X, Star, Clock, Flame, ShieldAlert, Sparkles, Plus, Check, 
  Heart, Wine, ChevronRight, Play, Pause, Volume2, VolumeX, Info, ThumbsUp
} from 'lucide-react';

interface FoodDetailModalProps {
  dish: DishItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (dishId: string) => void;
  onOpenDishById?: (dishId: string) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  isFavorite,
  onToggleFavorite,
  onOpenDishById,
}) => {
  if (!dish) return null;

  // Customization state
  const defaultPortion = dish.customizations?.portions?.[1] || dish.customizations?.portions?.[0] || { name: 'Regular Portioned', priceDelta: 0 };
  const [selectedPortion, setSelectedPortion] = useState<PortionOption>(defaultPortion);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel>(dish.spiceLevel || 'None');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'nutrition' | 'reviews'>('details');

  // Video state
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Price calculation
  const portionDelta = selectedPortion?.priceDelta || 0;
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.priceDelta, 0);
  const unitPrice = dish.price + portionDelta + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (addon: AddOnOption) => {
    if (selectedAddOns.some(a => a.name === addon.name)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.name !== addon.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      cartItemId: `${dish.id}-${Date.now()}`,
      dish,
      quantity,
      selectedSpice,
      selectedPortion,
      selectedAddOns,
      specialInstructions: specialInstructions.trim() || undefined,
      totalPrice,
    };
    onAddToCart(cartItem);
    setToastMessage(`Added ${quantity}x ${dish.name} to order.`);
    setTimeout(() => {
      setToastMessage(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Background click to close */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#101115] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row my-auto max-h-[92vh]">
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 text-stone-300 hover:text-white hover:bg-black/90 backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Media Hero & Video Player */}
        <div className="w-full md:w-1/2 relative bg-[#0b0c0e] min-h-[300px] md:min-h-full flex flex-col justify-between overflow-hidden">
          <div className="relative w-full h-full min-h-[300px]">
            {isPlayingVideo && dish.videoPreview?.videoUrl ? (
              <video
                src={dish.videoPreview.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={dish.image}
                alt={dish.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            )}

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101115] via-transparent to-black/40 pointer-events-none" />

            {/* Video Controls if URL is available */}
            {dish.videoPreview?.videoUrl && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                <button
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="flex items-center gap-2 bg-black/70 hover:bg-black/90 backdrop-blur-md text-[#d4af37] px-3 py-1.5 rounded-full border border-white/15 text-xs transition-colors cursor-pointer"
                >
                  {isPlayingVideo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingVideo ? 'Pause Reel' : 'Watch Cinematic Plating'}</span>
                </button>

                {isPlayingVideo && (
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-stone-200 backdrop-blur-md transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                )}
              </div>
            )}

            {/* Top Badges */}
            <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
              {dish.badge && (
                <span className="bg-[#0b0c0e]/80 backdrop-blur-md border border-[#c5a059]/40 text-[#c5a059] text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-md">
                  {dish.badge}
                </span>
              )}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite(dish.id)}
              className="absolute top-4 right-14 z-20 p-2 rounded-full bg-black/60 backdrop-blur-md hover:bg-black/90 text-stone-300 hover:text-red-400 transition-colors"
              title={isFavorite ? "Remove favorite" : "Save to favorites"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>

          {/* Quick Chef's Pairing Footnote */}
          {dish.pairings && dish.pairings.length > 0 && (
            <div className="hidden md:block p-4 border-t border-white/10 bg-[#0e0f13]/90">
              <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-medium flex items-center gap-1.5 mb-1.5">
                <Wine className="w-3.5 h-3.5" /> Master Sommelier Recommendation
              </span>
              <p className="text-xs text-stone-300 font-serif-luxury italic leading-relaxed">
                "{dish.pairings[0].reason}"
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Information, Customization & Actions */}
        <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto max-h-[600px] md:max-h-[90vh] p-5 sm:p-7">
          <div>
            {/* Header: Category & Ratings */}
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
              <div className="flex items-center gap-2">
                <span className="uppercase tracking-widest text-[#c5a059] font-medium">{dish.category}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>{dish.prepTimeMinutes} mins prep</span>
                </span>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-mono font-medium text-stone-200">{dish.rating.toFixed(2)}</span>
                <span className="text-stone-500">({dish.reviewCount})</span>
              </div>
            </div>

            {/* Dish Titles */}
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#f7f5f0] mb-1">
              {dish.name}
            </h2>
            {dish.secondaryTitle && (
              <p className="font-serif-luxury italic text-sm text-[#c5a059]/90 font-light mb-3">
                {dish.secondaryTitle}
              </p>
            )}

            {/* Pricing Line */}
            <div className="flex items-baseline gap-2.5 mb-5 pb-4 border-b border-white/10">
              <span className="font-mono text-2xl font-semibold text-[#f8f6f0] tabular-nums">
                {RESTAURANT_INFO.currencySymbol}{dish.price.toLocaleString()}
              </span>
              {dish.originalPrice && (
                <span className="font-mono text-sm text-stone-500 line-through tabular-nums">
                  {RESTAURANT_INFO.currencySymbol}{dish.originalPrice.toLocaleString()}
                </span>
              )}
              {dish.discountPercent ? (
                <span className="text-xs text-emerald-400 font-medium">
                  Save {dish.discountPercent}% · Special Tasting Selection
                </span>
              ) : null}
            </div>

            {/* Nav Tabs: Details | Nutrition | Reviews */}
            <div className="flex items-center gap-4 text-xs uppercase tracking-wider border-b border-white/10 pb-2 mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`transition-colors cursor-pointer pb-1 ${
                  activeTab === 'details'
                    ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Culinary Profile
              </button>
              <button
                onClick={() => setActiveTab('nutrition')}
                className={`transition-colors cursor-pointer pb-1 ${
                  activeTab === 'nutrition'
                    ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Ingredients & Nutrition
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`transition-colors cursor-pointer pb-1 ${
                  activeTab === 'reviews'
                    ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-semibold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Tasting Reviews ({dish.reviews?.length || 0})
              </button>
            </div>

            {/* Tab 1: Culinary Profile & Customization */}
            {activeTab === 'details' && (
              <div className="space-y-5">
                {/* Full Description */}
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {dish.fullDescription}
                </p>

                {/* Chef's Note Quote */}
                {dish.chefsNote && (
                  <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#c5a059]/20 flex gap-3">
                    <Sparkles className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#c5a059] font-medium block">
                        Chef's Tasting Note — Julian Vance
                      </span>
                      <p className="text-xs text-stone-300 font-serif-luxury italic leading-relaxed mt-0.5">
                        "{dish.chefsNote}"
                      </p>
                    </div>
                  </div>
                )}

                {/* Portion Selector if available */}
                {dish.customizations?.portions && dish.customizations.portions.length > 0 && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                      Select Portion Size
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {dish.customizations.portions.map((portion) => {
                        const isSelected = selectedPortion.name === portion.name;
                        return (
                          <button
                            key={portion.name}
                            type="button"
                            onClick={() => setSelectedPortion(portion)}
                            className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'border-[#c5a059] bg-[#1a1914] text-[#f8f6f0]'
                                : 'border-white/5 bg-[#141519] text-stone-400 hover:border-white/20'
                            }`}
                          >
                            <span className="font-medium block">{portion.name}</span>
                            <span className="text-[11px] text-[#c5a059] font-mono">
                              {portion.priceDelta > 0
                                ? `+${RESTAURANT_INFO.currencySymbol}${portion.priceDelta}`
                                : portion.priceDelta < 0
                                ? `-${RESTAURANT_INFO.currencySymbol}${Math.abs(portion.priceDelta)}`
                                : 'Included'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Spice Level Preference */}
                {dish.customizations?.spiceLevels && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                      Spice Level Preference
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {dish.customizations.spiceLevels.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setSelectedSpice(lvl)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            selectedSpice === lvl
                              ? 'bg-[#c5a059] text-black font-semibold'
                              : 'bg-[#141519] text-stone-400 hover:text-white border border-white/5'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Luxury Add-ons */}
                {dish.customizations?.addOns && dish.customizations.addOns.length > 0 && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-medium">
                      Enhance With Luxury Additions
                    </label>
                    <div className="space-y-1.5">
                      {dish.customizations.addOns.map((addon) => {
                        const isChecked = selectedAddOns.some(a => a.name === addon.name);
                        return (
                          <div
                            key={addon.name}
                            onClick={() => toggleAddOn(addon)}
                            className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                              isChecked
                                ? 'border-[#c5a059]/60 bg-[#191815] text-stone-200'
                                : 'border-white/5 bg-[#141519] text-stone-400 hover:border-white/15'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center ${isChecked ? 'bg-[#c5a059] border-[#c5a059] text-black' : 'border-stone-600'}`}>
                                {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span>{addon.name}</span>
                            </div>
                            <span className="font-mono text-[#c5a059] font-medium">
                              +{RESTAURANT_INFO.currencySymbol}{addon.priceDelta}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Special Dining Request */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-400 mb-1">
                    Special Kitchen Instructions (Allergies / Dressing on side)
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Please avoid pine nuts, extra virgin olive oil on side"
                    className="w-full bg-[#141519] border border-white/10 rounded-xl px-3 py-2 text-xs text-stone-200 placeholder:text-stone-600 outline-none focus:border-[#c5a059]/60"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Ingredients & Nutrition */}
            {activeTab === 'nutrition' && (
              <div className="space-y-5">
                {/* Allergens Banner */}
                {dish.allergens.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block uppercase tracking-wider text-[11px]">Allergen Notice</span>
                      <span>{dish.allergens.join(' · ')}</span>
                    </div>
                  </div>
                )}

                {/* Ingredients List */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Finest Certified Ingredients
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                    {dish.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 bg-[#141519] p-2 rounded-lg border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nutrition Grid */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-2">
                    Nutritional Information (Per {dish.nutrition.servingSize})
                  </h4>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-[#141519] border border-white/5">
                      <span className="block text-stone-500 text-[10px] uppercase">Calories</span>
                      <span className="font-mono text-base font-semibold text-stone-200">{dish.nutrition.calories}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141519] border border-white/5">
                      <span className="block text-stone-500 text-[10px] uppercase">Protein</span>
                      <span className="font-mono text-base font-semibold text-stone-200">{dish.nutrition.protein}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141519] border border-white/5">
                      <span className="block text-stone-500 text-[10px] uppercase">Carbs</span>
                      <span className="font-mono text-base font-semibold text-stone-200">{dish.nutrition.carbs}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#141519] border border-white/5">
                      <span className="block text-stone-500 text-[10px] uppercase">Fat</span>
                      <span className="font-mono text-base font-semibold text-stone-200">{dish.nutrition.fat}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Tasting Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-[#141519] border border-white/5 flex items-center justify-around text-center text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Taste</span>
                    <span className="font-mono text-sm font-bold text-amber-400">4.9 / 5.0</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Presentation</span>
                    <span className="font-mono text-sm font-bold text-amber-400">5.0 / 5.0</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div>
                    <span className="text-stone-500 block text-[10px] uppercase">Ingredient Quality</span>
                    <span className="font-mono text-sm font-bold text-amber-400">4.9 / 5.0</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {(dish.reviews && dish.reviews.length > 0) ? (
                    dish.reviews.map((rev, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#141519] border border-white/5">
                        <div className="flex items-center justify-between mb-1.5">
                          <div>
                            <span className="text-xs font-medium text-stone-200">{rev.author}</span>
                            <span className="text-[10px] text-stone-500 ml-2">· {rev.role}</span>
                          </div>
                          <span className="text-[11px] text-stone-500">{rev.date}</span>
                        </div>
                        <div className="flex items-center text-amber-400 text-xs mb-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "fill-amber-400" : "text-stone-700"}`} />
                          ))}
                        </div>
                        <p className="text-xs text-stone-300 font-light leading-relaxed">
                          "{rev.text}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-stone-500 text-center py-6">
                      Every order is freshly prepared and scored by our fine dining patrons.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Fixed Purchase Module */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-[#141519] border border-white/10 rounded-xl px-3 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="font-mono text-sm font-semibold text-stone-100 tabular-nums w-4 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Total Price & Add to Order CTA */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="text-right">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block">Total Price</span>
                <span className="font-mono text-xl font-bold text-[#f5f3ef] tabular-nums">
                  {RESTAURANT_INFO.currencySymbol}{totalPrice.toLocaleString()}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!dish.isAvailable}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black px-6 py-3 rounded-xl font-medium tracking-wide text-xs uppercase shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add to Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
