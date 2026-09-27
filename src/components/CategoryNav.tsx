import React from 'react';
import { MENU_CATEGORIES } from '../data/menuData';
import { Filter, Sparkles, Flame, Clock, Leaf } from 'lucide-react';

interface CategoryNavProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  selectedFilter,
  onSelectFilter,
  categoryCounts,
}) => {
  return (
    <div className="w-full bg-[#0d0e12]/90 backdrop-blur-md border-b border-white/5 py-3 sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Horizontal Category Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {MENU_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#c5a059] text-[#0b0c0e] font-semibold shadow-md'
                    : 'bg-[#141519] text-stone-300 hover:text-white hover:bg-[#1a1b22] border border-white/5'
                }`}
              >
                <span>{cat}</span>
                {count > 0 && cat !== 'All Dishes' && (
                  <span className={`ml-2 text-[10px] font-mono tabular-nums ${isActive ? 'text-black/70' : 'text-stone-500'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Luxury Dietary & Dietary Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2.5 text-xs text-stone-400">
          <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-[#c5a059]" /> Filter:
          </span>

          <button
            onClick={() => onSelectFilter(selectedFilter === 'all' ? 'all' : 'all')}
            className={`px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'all'
                ? 'bg-white/10 text-white font-medium'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            All
          </button>

          <button
            onClick={() => onSelectFilter(selectedFilter === 'vegetarian' ? 'all' : 'vegetarian')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'vegetarian'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                : 'hover:text-emerald-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Vegetarian</span>
          </button>

          <button
            onClick={() => onSelectFilter(selectedFilter === 'vegan' ? 'all' : 'vegan')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'vegan'
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                : 'hover:text-emerald-400'
            }`}
          >
            <Leaf className="w-3 h-3 text-emerald-400" />
            <span>Vegan</span>
          </button>

          <button
            onClick={() => onSelectFilter(selectedFilter === 'nonveg' ? 'all' : 'nonveg')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'nonveg'
                ? 'bg-red-950/60 text-red-300 border border-red-500/30'
                : 'hover:text-red-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            <span>Non-Vegetarian</span>
          </button>

          <button
            onClick={() => onSelectFilter(selectedFilter === 'chef' ? 'all' : 'chef')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'chef'
                ? 'bg-amber-950/60 text-amber-300 border border-amber-500/30'
                : 'hover:text-amber-400'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#c5a059]" />
            <span>Chef's Choice</span>
          </button>

          <button
            onClick={() => onSelectFilter(selectedFilter === 'quick' ? 'all' : 'quick')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'quick'
                ? 'bg-blue-950/60 text-blue-300 border border-blue-500/30'
                : 'hover:text-blue-400'
            }`}
          >
            <Clock className="w-3 h-3 text-blue-400" />
            <span>Under 15 Min</span>
          </button>

          <button
            onClick={() => onSelectFilter(selectedFilter === 'offers' ? 'all' : 'offers')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              selectedFilter === 'offers'
                ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                : 'hover:text-purple-400'
            }`}
          >
            <Flame className="w-3 h-3 text-purple-400" />
            <span>Seasonal Offers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
