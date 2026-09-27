/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { DishItem, CartItem, DiningMode, OrderRecord } from './types/menu';
import { INITIAL_DISHES, RESTAURANT_INFO, MENU_CATEGORIES } from './data/menuData';

import { CoverScreen } from './components/CoverScreen';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { FoodCard } from './components/FoodCard';
import { FoodDetailModal } from './components/FoodDetailModal';
import { AIConciergeModal } from './components/AIConciergeModal';
import { OrderSummaryDrawer } from './components/OrderSummaryDrawer';
import { OrderStatusModal } from './components/OrderStatusModal';
import { DigitalBillModal } from './components/DigitalBillModal';
import { ServiceAssistanceModal } from './components/ServiceAssistanceModal';
import { AdminManagerModal } from './components/AdminManagerModal';
import { SearchModal } from './components/SearchModal';
import { FavoritesModal } from './components/FavoritesModal';
import { DessertSpotlight } from './components/DessertSpotlight';
import { SmartPairingSection } from './components/SmartPairingSection';

import { Sparkles, UtensilsCrossed, Hotel, Wine, ShieldCheck, Clock, Award, Star } from 'lucide-react';

export default function App() {
  // Screen & Navigation States
  const [showCoverScreen, setShowCoverScreen] = useState(true);
  const [diningMode, setDiningMode] = useState<DiningMode>('table');
  const [locationNumber, setLocationNumber] = useState('Table 14 — Garden Terrace');
  const [language, setLanguage] = useState('en');

  // Menu States
  const [dishes, setDishes] = useState<DishItem[]>(INITIAL_DISHES);
  const [activeCategory, setActiveCategory] = useState<string>('All Dishes');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Interactive Modals
  const [selectedDetailDish, setSelectedDetailDish] = useState<DishItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [isAssistanceOpen, setIsAssistanceOpen] = useState(false);
  const [isOrderStatusOpen, setIsOrderStatusOpen] = useState(false);
  const [isBillOpen, setIsBillOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(null);

  // Favorites (persisted)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('imperial_favorites');
      return saved ? JSON.parse(saved) : ['sig-1', 'sig-2'];
    } catch {
      return ['sig-1', 'sig-2'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('imperial_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const toggleFavorite = (dishId: string) => {
    setFavorites((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  // Cart Handlers
  const handleAddToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (p) =>
          p.dish.id === item.dish.id &&
          p.selectedPortion?.name === item.selectedPortion?.name &&
          p.selectedSpice === item.selectedSpice &&
          p.selectedAddOns.length === item.selectedAddOns.length &&
          p.selectedAddOns.every((a, idx) => a.name === item.selectedAddOns[idx]?.name)
      );

      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity;
        updated[existingIdx].totalPrice += item.totalPrice;
        return updated;
      }
      return [...prev, item];
    });
  };

  const handleQuickAdd = (dish: DishItem) => {
    const quickItem: CartItem = {
      cartItemId: `${dish.id}-${Date.now()}`,
      dish,
      quantity: 1,
      selectedSpice: dish.spiceLevel || 'None',
      selectedPortion: dish.customizations?.portions?.[0],
      selectedAddOns: [],
      totalPrice: dish.price,
    };
    handleAddToCart(quickItem);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = item.totalPrice / item.quantity;
            return {
              ...item,
              quantity: newQty,
              totalPrice: singleUnitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  // Order Placement
  const handleConfirmOrder = (order: OrderRecord) => {
    setCurrentOrder(order);
    setCartItems([]);
    setIsCartOpen(false);
    setIsOrderStatusOpen(true);
  };

  // Admin Controls
  const handleToggleAvailability = (dishId: string) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, isAvailable: !d.isAvailable } : d))
    );
  };

  const handleUpdatePrice = (dishId: string, newPrice: number) => {
    setDishes((prev) =>
      prev.map((d) => (d.id === dishId ? { ...d, price: newPrice } : d))
    );
  };

  // Filtered Dishes Computation
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Category match
      if (activeCategory !== 'All Dishes') {
        if (activeCategory === "Chef's Signature" && dish.badge !== "Chef's Signature") return false;
        if (activeCategory === "Today's Specials" && dish.badge !== "Today's Special") return false;
        if (
          activeCategory !== "Chef's Signature" &&
          activeCategory !== "Today's Specials" &&
          dish.category !== activeCategory
        ) {
          return false;
        }
      }

      // Dietary / attribute filter
      if (selectedFilter === 'vegetarian' && !dish.isVegetarian) return false;
      if (selectedFilter === 'vegan' && !dish.isVegan) return false;
      if (selectedFilter === 'nonveg' && dish.isVegetarian) return false;
      if (selectedFilter === 'chef' && dish.badge !== "Chef's Signature" && dish.badge !== "Michelin Selection") {
        return false;
      }
      if (selectedFilter === 'quick' && dish.prepTimeMinutes > 15) return false;
      if (selectedFilter === 'offers' && !dish.discountPercent) return false;

      return true;
    });
  }, [dishes, activeCategory, selectedFilter]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Dishes': dishes.length };
    MENU_CATEGORIES.forEach((cat) => {
      if (cat === 'All Dishes') return;
      if (cat === "Chef's Signature") {
        counts[cat] = dishes.filter((d) => d.badge === "Chef's Signature").length;
      } else if (cat === "Today's Specials") {
        counts[cat] = dishes.filter((d) => d.badge === "Today's Special").length;
      } else {
        counts[cat] = dishes.filter((d) => d.category === cat).length;
      }
    });
    return counts;
  }, [dishes]);

  // Extract desserts for the spotlight
  const dessertDishes = useMemo(() => {
    return dishes.filter((d) => d.category === 'Desserts & Pâtisserie');
  }, [dishes]);

  // If cover screen is active, show CoverScreen
  if (showCoverScreen) {
    return (
      <CoverScreen
        onEnterMenu={() => setShowCoverScreen(false)}
        diningMode={diningMode}
        setDiningMode={setDiningMode}
        locationNumber={locationNumber}
        setLocationNumber={setLocationNumber}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#f4f2ee] font-sans antialiased flex flex-col selection:bg-[#c5a059]/30 selection:text-[#f8f6f0]">
      {/* 1. Universal Top Navigation Bar */}
      <Navbar
        diningMode={diningMode}
        setDiningMode={setDiningMode}
        locationNumber={locationNumber}
        cartItems={cartItems}
        favoritesCount={favorites.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onOpenAssistance={() => setIsAssistanceOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCover={() => setShowCoverScreen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* 2. Horizontal Category and Dietary Filter Navigation */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        selectedFilter={selectedFilter}
        onSelectFilter={setSelectedFilter}
        categoryCounts={categoryCounts}
      />

      {/* 3. Personalized Dining Banner (AI Concierge Hint) */}
      <div className="w-full bg-[#101115] border-b border-white/5 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <span className="w-2 h-2 rounded-full bg-[#c5a059] inline-block animate-ping" />
            <span className="font-serif-luxury italic text-stone-200 text-sm">
              "Good evening. Welcome to {locationNumber}."
            </span>
            <span className="hidden md:inline text-stone-500">·</span>
            <span className="hidden md:inline text-stone-400">
              Executive Chef Julian Vance presents our Autumn Caviar & Truffle Degustation.
            </span>
          </div>

          <button
            onClick={() => setIsConciergeOpen(true)}
            className="flex items-center gap-1.5 text-[#d4af37] hover:underline cursor-pointer ml-auto sm:ml-0 text-[11px] uppercase tracking-wider font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consult Private Sommelier</span>
          </button>
        </div>
      </div>

      {/* 4. Active Orders Floating Pill if an order is active */}
      {currentOrder && (
        <div className="bg-[#171821] border-b border-[#c5a059]/30 py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs">
              <Clock className="w-4 h-4 text-[#c5a059]" />
              <span>
                Order <strong className="text-white">{currentOrder.orderNumber}</strong> is currently being prepared in the kitchen.
              </span>
            </div>
            <button
              onClick={() => setIsOrderStatusOpen(true)}
              className="text-xs text-[#c5a059] hover:underline uppercase tracking-wider font-semibold cursor-pointer"
            >
              Track Serving Status →
            </button>
          </div>
        </div>
      )}

      {/* 5. Main Hero Section / Editorial Food Showcase */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-1">
              <span>Imperial Culinary Collection</span>
              <span>·</span>
              <span>Michelin Standard</span>
            </div>
            <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#f7f5f0] tracking-wide">
              {activeCategory}
            </h1>
          </div>

          <p className="text-xs text-stone-400 max-w-md font-light leading-relaxed">
            Every dish is cooked strictly à la minute. Press and hold any culinary image to preview the chef's plating reel.
          </p>
        </div>

        {/* Empty State if filter yields no items */}
        {filteredDishes.length === 0 ? (
          <div className="py-24 text-center text-stone-500">
            <div className="w-16 h-16 rounded-full border border-dashed border-white/10 flex items-center justify-center mx-auto mb-4 text-stone-600">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h3 className="font-serif-luxury text-xl text-stone-300 mb-2">
              No Dishes in Current Selection
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
              Try adjusting your dietary filter or category selection to explore our full menu.
            </p>
            <button
              onClick={() => {
                setActiveCategory('All Dishes');
                setSelectedFilter('all');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-medium uppercase tracking-wider transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Food Cards Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDishes.map((dish) => (
              <FoodCard
                key={dish.id}
                dish={dish}
                isFavorite={favorites.includes(dish.id)}
                onToggleFavorite={toggleFavorite}
                onOpenDetails={setSelectedDetailDish}
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        )}

        {/* 6. Smart Food Pairing Section */}
        <SmartPairingSection
          cartItems={cartItems}
          allDishes={dishes}
          onOpenDetails={setSelectedDetailDish}
          onQuickAdd={handleQuickAdd}
        />

        {/* 7. Dessert Spotlight ("End on a Sweet Note") */}
        <DessertSpotlight
          desserts={dessertDishes}
          onOpenDetails={setSelectedDetailDish}
          onQuickAdd={handleQuickAdd}
        />
      </main>

      {/* 8. Luxury Editorial Footer */}
      <footer className="w-full bg-[#08080a] border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h4 className="font-serif-luxury text-2xl text-[#f7f5f0] tracking-wider mb-1">
              {RESTAURANT_INFO.name}
            </h4>
            <p className="text-xs text-stone-400 font-light">
              {RESTAURANT_INFO.subtitle} · {RESTAURANT_INFO.hotelName}
            </p>
            <p className="text-[11px] text-stone-500 mt-2 font-mono">
              {RESTAURANT_INFO.location} · Valet & Concierge Services
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
            <button
              onClick={() => setShowCoverScreen(true)}
              className="hover:text-[#c5a059] transition-colors cursor-pointer"
            >
              Switch Table / Room
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAssistanceOpen(true)}
              className="hover:text-[#c5a059] transition-colors cursor-pointer"
            >
              Request Waiter
            </button>
            <span>·</span>
            <button
              onClick={() => setIsConciergeOpen(true)}
              className="hover:text-[#c5a059] transition-colors cursor-pointer text-[#c5a059]"
            >
              AI Sommelier
            </button>
            <span>·</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-stone-300 transition-colors cursor-pointer"
            >
              Kitchen Console
            </button>
          </div>

          <div className="text-xs text-stone-500">
            <span>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. All Rights Reserved.</span>
          </div>
        </div>
      </footer>

      {/* Modals & Slide-Overs */}
      {selectedDetailDish && (
        <FoodDetailModal
          dish={selectedDetailDish}
          onClose={() => setSelectedDetailDish(null)}
          onAddToCart={handleAddToCart}
          isFavorite={favorites.includes(selectedDetailDish.id)}
          onToggleFavorite={toggleFavorite}
          onOpenDishById={(id) => {
            const found = dishes.find((d) => d.id === id);
            if (found) setSelectedDetailDish(found);
          }}
        />
      )}

      {isCartOpen && (
        <OrderSummaryDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          diningMode={diningMode}
          locationNumber={locationNumber}
          onConfirmOrder={handleConfirmOrder}
        />
      )}

      {isConciergeOpen && (
        <AIConciergeModal
          isOpen={isConciergeOpen}
          onClose={() => setIsConciergeOpen(false)}
          dishes={dishes}
          cartItems={cartItems}
          onSelectDish={(dish) => {
            setIsConciergeOpen(false);
            setSelectedDetailDish(dish);
          }}
          onQuickAdd={handleQuickAdd}
        />
      )}

      {isAssistanceOpen && (
        <ServiceAssistanceModal
          isOpen={isAssistanceOpen}
          onClose={() => setIsAssistanceOpen(false)}
          diningMode={diningMode}
          locationNumber={locationNumber}
        />
      )}

      {isOrderStatusOpen && (
        <OrderStatusModal
          order={currentOrder}
          isOpen={isOrderStatusOpen}
          onClose={() => setIsOrderStatusOpen(false)}
          onOpenBill={() => {
            setIsOrderStatusOpen(false);
            setIsBillOpen(true);
          }}
          onRequestAssistance={() => {
            setIsOrderStatusOpen(false);
            setIsAssistanceOpen(true);
          }}
        />
      )}

      {isBillOpen && (
        <DigitalBillModal
          isOpen={isBillOpen}
          onClose={() => setIsBillOpen(false)}
          order={currentOrder}
          onPaymentSuccess={() => {
            // Keep bill open with receipt state
          }}
        />
      )}

      {isAdminOpen && (
        <AdminManagerModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          dishes={dishes}
          onToggleAvailability={handleToggleAvailability}
          onUpdatePrice={handleUpdatePrice}
        />
      )}

      {isSearchOpen && (
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          dishes={dishes}
          onOpenDetails={(d) => setSelectedDetailDish(d)}
          onQuickAdd={handleQuickAdd}
        />
      )}

      {isFavoritesOpen && (
        <FavoritesModal
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favoriteDishIds={favorites}
          allDishes={dishes}
          onOpenDetails={(d) => setSelectedDetailDish(d)}
          onQuickAdd={handleQuickAdd}
          onRemoveFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
