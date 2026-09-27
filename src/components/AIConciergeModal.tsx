import React, { useState, useRef, useEffect } from 'react';
import { DishItem, CartItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { Sparkles, Send, X, Wine, UtensilsCrossed, Plus, ArrowRight, Bot, ShieldCheck } from 'lucide-react';

interface AIConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: DishItem[];
  cartItems: CartItem[];
  onSelectDish: (dish: DishItem) => void;
  onQuickAdd: (dish: DishItem) => void;
}

interface Message {
  id: string;
  sender: 'concierge' | 'guest';
  text: string;
  suggestedDishIds?: string[];
  pairingNote?: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  "Recommend a light but satisfying fine-dining selection.",
  "I am vegetarian and strictly prefer mild flavors.",
  "Which wine or cocktail pairs best with the Wagyu Tenderloin?",
  "Suggest a memorable 3-course anniversary dinner.",
  "What gluten-free options are available this evening?",
  "Recommend a signature dessert to conclude our meal.",
];

export const AIConciergeModal: React.FC<AIConciergeModalProps> = ({
  isOpen,
  onClose,
  dishes,
  cartItems,
  onSelectDish,
  onQuickAdd,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'concierge',
      text: `Good evening. I am Monsieur Vance, your Private Sommelier and Dining Concierge at ${RESTAURANT_INFO.name}. How may I orchestrate your culinary experience today?`,
      timestamp: 'Now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isOpen, messages]);

  if (!isOpen) return null;

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const guestMsg: Message = {
      id: `guest-${Date.now()}`,
      sender: 'guest',
      text: text.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, guestMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build lightweight menu summary for the server prompt
      const menuSummary = dishes
        .slice(0, 15)
        .map(
          (d) =>
            `ID: ${d.id} | Name: ${d.name} | Category: ${d.category} | Price: ₹${d.price} | Veg: ${
              d.isVegetarian
            } | Spice: ${d.spiceLevel} | Allergens: ${d.allergens.join(', ') || 'None'}`
        )
        .join('\n');

      const response = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text.trim(),
          currentCart: cartItems.map((c) => ({ id: c.dish.id, name: c.dish.name, qty: c.quantity })),
          menuSummary,
        }),
      });

      if (!response.ok) throw new Error('Concierge request error');

      const data = await response.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'concierge',
        text: data.message || "Allow me to guide your dining journey with our signature creations.",
        suggestedDishIds: data.suggestedDishIds || [],
        pairingNote: data.pairingNote,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn("Falling back to local concierge advisor:", err);

      // Graceful local concierge fallback grounded in actual dishes
      let fallbackText = "Our signature Truffle & Wild Morel Risotto and Pan-Seared Chilean Sea Bass are celebrated masterpieces tonight.";
      let suggested = ['sig-1', 'sea-1'];

      if (text.toLowerCase().includes('veg')) {
        fallbackText = "For an ethereal vegetarian journey, our Truffle Risotto and 24-Hour Dal Imperial Bukhara offer sublime harmony.";
        suggested = ['sig-1', 'ind-2'];
      } else if (text.toLowerCase().includes('sweet') || text.toLowerCase().includes('dessert')) {
        fallbackText = "Our Valrhona Guanaja Chocolate Fondant and Saffron Rasmalai Mille-Feuille will provide a magnificent finale.";
        suggested = ['des-1', 'des-2'];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'concierge',
          text: fallbackText,
          suggestedDishIds: suggested,
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0f1013] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[650px] max-h-[92vh]">
        {/* Concierge Header */}
        <div className="px-6 py-4 bg-[#14151a] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#c5a059]/50 bg-[#1b1c22] flex items-center justify-center text-[#d4af37] shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-luxury text-base font-semibold text-[#f5f3ef]">
                  Monsieur Vance
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30">
                  Sommelier Concierge
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light">
                Grounded strictly in {RESTAURANT_INFO.name}'s verified menu & cellar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === 'guest' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'guest'
                    ? 'bg-[#c5a059] text-[#0b0c0e] font-medium shadow-md rounded-br-none'
                    : 'bg-[#18191f] text-stone-200 border border-white/5 rounded-bl-none shadow-sm'
                }`}
              >
                {m.sender === 'concierge' && (
                  <div className="text-[10px] text-[#c5a059] uppercase tracking-wider font-semibold mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Concierge Sommelier
                  </div>
                )}
                <p className="font-light">{m.text}</p>

                {m.pairingNote && (
                  <div className="mt-3 pt-2.5 border-t border-white/10 flex items-start gap-2 text-xs text-[#d4af37] italic font-serif-luxury">
                    <Wine className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{m.pairingNote}</span>
                  </div>
                )}
              </div>

              {/* Actionable Dishes Recommended by Concierge */}
              {m.suggestedDishIds && m.suggestedDishIds.length > 0 && (
                <div className="mt-2.5 max-w-[95%] w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {m.suggestedDishIds.map((dishId) => {
                    const dish = dishes.find((d) => d.id === dishId);
                    if (!dish) return null;
                    return (
                      <div
                        key={dish.id}
                        className="bg-[#14151a] hover:bg-[#1a1b22] border border-[#c5a059]/30 rounded-xl p-2.5 flex items-center gap-3 transition-all cursor-pointer group"
                        onClick={() => onSelectDish(dish)}
                      >
                        <img
                          src={dish.image}
                          alt={dish.name}
                          className="w-12 h-12 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="font-serif-luxury text-xs text-stone-100 font-medium truncate block group-hover:text-[#c5a059]">
                            {dish.name}
                          </span>
                          <span className="font-mono text-xs font-semibold text-[#c5a059] block">
                            {RESTAURANT_INFO.currencySymbol}{dish.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onQuickAdd(dish);
                          }}
                          className="p-1.5 rounded-lg bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#c5a059] hover:text-black transition-colors"
                          title="Add to order"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <span className="text-[10px] text-stone-600 mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-stone-400 text-xs italic p-2 bg-[#14151a] rounded-xl border border-white/5 max-w-[260px]">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-spin" />
              <span>Monsieur Vance is consulting the cellar...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-3 bg-[#111216] border-t border-white/5 overflow-x-auto no-scrollbar flex items-center gap-2">
          {QUICK_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendMessage(prompt)}
              className="text-[11px] whitespace-nowrap bg-[#17181f] hover:bg-[#20212a] text-stone-300 hover:text-white px-3 py-1.5 rounded-full border border-white/5 transition-colors shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#14151a] border-t border-white/10 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage(inputText);
            }}
            placeholder="Ask about flavors, wine pairings, allergens, or light dining..."
            className="flex-1 bg-[#0b0c0e] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 outline-none focus:border-[#c5a059]/60 transition-colors"
          />
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 bg-gradient-to-r from-[#c5a059] to-[#d4af37] text-black rounded-xl hover:brightness-105 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Send query"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
