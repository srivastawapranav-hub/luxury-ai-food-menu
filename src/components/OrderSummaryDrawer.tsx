import React from 'react';
import { CartItem, DiningMode, OrderRecord } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { X, Trash2, ArrowRight, UtensilsCrossed, Hotel, ShieldCheck, Plus, Minus, Sparkles } from 'lucide-react';

interface OrderSummaryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  diningMode: DiningMode;
  locationNumber: string;
  onConfirmOrder: (order: OrderRecord) => void;
  onOpenDessertPrompt?: () => void;
}

export const OrderSummaryDrawer: React.FC<OrderSummaryDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  diningMode,
  locationNumber,
  onConfirmOrder,
  onOpenDessertPrompt,
}) => {
  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = Math.round(subtotal * RESTAURANT_INFO.taxRate);
  const serviceCharge = Math.round(subtotal * RESTAURANT_INFO.serviceChargeRate);
  const total = subtotal + tax + serviceCharge;

  // Calculate estimated prep time: max prep time of all items in cart + 4 mins
  const maxPrepTime = cartItems.reduce(
    (max, item) => Math.max(max, item.dish.prepTimeMinutes),
    15
  );
  const estimatedPrepMinutes = maxPrepTime + 4;

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const newOrder: OrderRecord = {
      orderId: `ORD-${Date.now().toString().slice(-6)}`,
      orderNumber: `#${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      diningMode,
      locationIdentifier: locationNumber,
      items: [...cartItems],
      subtotal,
      discountTotal: 0,
      tax,
      serviceCharge,
      tip: 0,
      total,
      status: 'confirmed',
      estimatedMinutes: estimatedPrepMinutes,
    };

    onConfirmOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <aside className="w-full max-w-md bg-[#101115] border-l border-white/10 h-full flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Drawer Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#141519]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full border border-[#c5a059]/40 bg-[#1b1c22] flex items-center justify-center text-[#c5a059]">
              {diningMode === 'table' ? (
                <UtensilsCrossed className="w-4 h-4" />
              ) : (
                <Hotel className="w-4 h-4" />
              )}
            </div>
            <div>
              <h2 className="font-serif-luxury text-lg font-medium text-[#f5f3ef]">
                Your Dining Selection
              </h2>
              <span className="text-[11px] text-[#c5a059] font-medium block">
                {locationNumber} · {diningMode === 'table' ? 'Table Service' : 'In-Suite Dining'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <div className="w-14 h-14 rounded-full border border-dashed border-white/15 flex items-center justify-center mb-3 text-stone-600">
                <UtensilsCrossed className="w-6 h-6" />
              </div>
              <p className="font-serif-luxury text-base text-stone-300 mb-1">
                Your Selection is Empty
              </p>
              <p className="text-xs text-stone-500 max-w-[220px]">
                Explore our signature tasting creations to assemble your culinary course.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-[#141519] border border-white/5 rounded-2xl p-3.5 flex gap-3.5 items-start justify-between"
              >
                <img
                  src={item.dish.image}
                  alt={item.dish.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-luxury text-sm font-medium text-stone-200 truncate">
                    {item.dish.name}
                  </h4>

                  {/* Customization Details */}
                  <div className="text-[11px] text-stone-400 mt-0.5 space-y-0.5">
                    {item.selectedPortion && item.selectedPortion.name !== 'Regular Portioned' && (
                      <span className="block text-[#c5a059]">
                        Portion: {item.selectedPortion.name}
                      </span>
                    )}
                    {item.selectedSpice !== 'None' && (
                      <span className="block text-amber-400/90">
                        Spice: {item.selectedSpice}
                      </span>
                    )}
                    {item.selectedAddOns.length > 0 && (
                      <span className="block text-stone-400">
                        Additions: {item.selectedAddOns.map(a => a.name).join(', ')}
                      </span>
                    )}
                    {item.specialInstructions && (
                      <span className="block text-stone-500 italic">
                        Note: "{item.specialInstructions}"
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 bg-[#0c0d10] border border-white/10 rounded-lg px-2 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="text-stone-400 hover:text-white text-xs px-1 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-semibold text-stone-200 tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="text-stone-400 hover:text-white text-xs px-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-mono text-sm font-semibold text-[#f5f3ef] tabular-nums">
                      {RESTAURANT_INFO.currencySymbol}{item.totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="p-1.5 text-stone-600 hover:text-red-400 transition-colors"
                  title="Remove dish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bill Calculations & Confirmation CTA */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#131418] space-y-3">
            {/* Calculation Lines */}
            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex items-center justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span className="font-mono font-medium text-stone-200 tabular-nums">
                  {RESTAURANT_INFO.currencySymbol}{subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Goods & Services Tax (5% GST)</span>
                <span className="font-mono text-stone-300 tabular-nums">
                  {RESTAURANT_INFO.currencySymbol}{tax.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Luxury Hospitality Service Charge (10%)</span>
                <span className="font-mono text-stone-300 tabular-nums">
                  {RESTAURANT_INFO.currencySymbol}{serviceCharge.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm font-semibold text-stone-100">
                <span className="font-serif-luxury text-base">Estimated Total</span>
                <span className="font-mono text-lg text-[#d4af37] tabular-nums">
                  {RESTAURANT_INFO.currencySymbol}{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Kitchen Preparation Promise */}
            <div className="p-2.5 rounded-xl bg-[#18191f] border border-white/5 flex items-center justify-between text-[11px] text-stone-400">
              <span>Estimated Kitchen Prep Time:</span>
              <span className="text-[#c5a059] font-medium font-mono">~{estimatedPrepMinutes} mins</span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black py-3.5 rounded-xl font-medium tracking-wide text-xs uppercase shadow-xl hover:brightness-105 active:scale-98 transition-all cursor-pointer"
            >
              <span>Confirm & Send to Kitchen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
