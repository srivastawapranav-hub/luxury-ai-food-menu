import React, { useState, useRef, useEffect } from 'react';
import { DishItem } from '../types/menu';
import { RESTAURANT_INFO } from '../data/menuData';
import { Heart, Plus, Clock, Star, Flame, Play, Video, Volume2, VolumeX, Sparkles, Check } from 'lucide-react';

interface FoodCardProps {
  dish: DishItem;
  isFavorite: boolean;
  onToggleFavorite: (dishId: string) => void;
  onOpenDetails: (dish: DishItem) => void;
  onQuickAdd: (dish: DishItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  dish,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  onQuickAdd,
}) => {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startHold = (e: React.SyntheticEvent) => {
    // Prevent context menu or image drag
    setIsHolding(true);
    setHoldProgress(0);

    const startTime = Date.now();
    const targetDuration = 350; // 350ms hold to activate video

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / targetDuration) * 100);
      setHoldProgress(progress);

      if (progress >= 100) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setIsPlayingVideo(true);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(() => {});
        }
      }
    }, 20);
  };

  const endHold = () => {
    setIsHolding(false);
    setHoldProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlayingVideo(false);
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(dish);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(dish.id);
  };

  return (
    <article
      onClick={() => onOpenDetails(dish)}
      className="group relative bg-[#121316] rounded-2xl border border-white/5 hover:border-[#c5a059]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      {/* Top Image & Cinematic Video Container */}
      <div 
        className="relative w-full aspect-[4/3] bg-[#16171b] overflow-hidden select-none touch-none"
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        onTouchCancel={endHold}
      >
        {/* Still Dish Image */}
        {!imageError ? (
          <img
            src={dish.image}
            alt={dish.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
              isPlayingVideo ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1c1d22] to-[#121316]">
            <Sparkles className="w-8 h-8 text-[#c5a059]/40 mb-2" />
            <span className="font-serif-luxury text-sm text-stone-300">{dish.name}</span>
          </div>
        )}

        {/* Cinematic Food Video Layer */}
        {dish.videoPreview?.videoUrl ? (
          <div className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${isPlayingVideo ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
            <video
              ref={videoRef}
              src={dish.videoPreview.videoUrl}
              loop
              muted={isMuted}
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            {/* Audio Toggle in Video Mode */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              className="pointer-events-auto absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white/90 backdrop-blur-md hover:bg-black/80 transition-colors"
              title={isMuted ? "Unmute Sizzle" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] text-stone-200 truncate">
              {dish.videoPreview.caption}
            </div>
          </div>
        ) : (
          /* High-end animated plating simulation if video stream is unattached */
          <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-center transition-opacity duration-300 pointer-events-none ${isPlayingVideo ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`}>
            <div className="text-center p-4">
              <Sparkles className="w-8 h-8 text-[#c5a059] mx-auto mb-2 animate-pulse" />
              <p className="text-xs uppercase tracking-widest text-[#d4af37] font-medium">Chef's Table Plating</p>
              <p className="text-[11px] text-stone-300 italic mt-1 max-w-[200px] mx-auto">{dish.chefsNote || dish.shortDescription}</p>
            </div>
          </div>
        )}

        {/* Luxury Badges on Image */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20 pointer-events-none">
          {dish.badge && (
            <span className="inline-block bg-[#0b0c0e]/85 backdrop-blur-md border border-[#c5a059]/40 text-[#d4af37] text-[10px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-md shadow-sm">
              {dish.badge}
            </span>
          )}
          {!dish.isAvailable && (
            <span className="inline-block bg-red-950/90 text-red-200 border border-red-500/40 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md">
              Sold Out
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/70 text-stone-300 hover:text-red-400 transition-colors cursor-pointer"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`w-4 h-4 transition-transform ${isFavorite ? "fill-red-500 text-red-500 scale-110" : ""}`} />
        </button>

        {/* "Hold to Preview" Subtle Luxury Hint */}
        <div className="absolute bottom-2.5 right-2.5 z-20 pointer-events-none">
          {isHolding ? (
            <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#c5a059] text-[10px] text-[#d4af37]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
              <span>Playing Cinema...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 text-[10px] text-stone-300 opacity-80 group-hover:opacity-100 transition-opacity">
              <Play className="w-2.5 h-2.5 text-[#c5a059]" />
              <span>Hold to preview</span>
            </div>
          )}
        </div>

        {/* Holding Progress Bar Ring at bottom of media */}
        {isHolding && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-30">
            <div
              className="h-full bg-gradient-to-r from-[#c5a059] to-[#d4af37] transition-all duration-75"
              style={{ width: `${holdProgress}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Veg/Non-Veg + Prep Time + Spice Level */}
          <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
            <div className="flex items-center gap-2">
              {/* Veg / Non-Veg Luxury Symbol */}
              <div 
                className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 rounded-[3px] ${
                  dish.isVegetarian ? 'border-emerald-500' : 'border-red-500'
                }`}
                title={dish.isVegetarian ? "Pure Vegetarian" : "Non-Vegetarian"}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${dish.isVegetarian ? 'bg-emerald-500' : 'bg-red-500'}`} />
              </div>

              {dish.isVegan && (
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-medium">Vegan</span>
              )}

              {/* Spice Meter */}
              {dish.spiceLevel !== 'None' && (
                <span className="flex items-center text-[11px] text-amber-400/90 gap-0.5 font-normal">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span>{dish.spiceLevel}</span>
                </span>
              )}
            </div>

            {/* Preparation Time */}
            <div className="flex items-center gap-1 text-[11px] text-stone-400">
              <Clock className="w-3 h-3 text-[#c5a059]" />
              <span className="tabular-nums">{dish.prepTimeMinutes} min</span>
            </div>
          </div>

          {/* Dish Name */}
          <h3 className="font-serif-luxury text-lg sm:text-xl font-normal text-[#f4f2ee] group-hover:text-[#c5a059] transition-colors line-clamp-1">
            {dish.name}
          </h3>

          {/* Secondary Title (Italian / French / Heritage) */}
          {dish.secondaryTitle && (
            <p className="font-serif-luxury italic text-xs text-stone-400 line-clamp-1 mb-2 font-light">
              {dish.secondaryTitle}
            </p>
          )}

          {/* Short Description */}
          <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2 mb-3">
            {dish.shortDescription}
          </p>
        </div>

        {/* Footer: Rating + Price + Add Button */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-3 mt-auto">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="ml-1 font-mono font-medium tabular-nums text-stone-200">
                {dish.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[11px] text-stone-500 tabular-nums">
              ({dish.reviewCount})
            </span>
          </div>

          {/* Price Block & Action */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-base font-semibold text-[#f5f3ef] tabular-nums">
                  {RESTAURANT_INFO.currencySymbol}{dish.price.toLocaleString()}
                </span>
                {dish.originalPrice && (
                  <span className="font-mono text-xs text-stone-500 line-through tabular-nums">
                    {RESTAURANT_INFO.currencySymbol}{dish.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {dish.discountPercent ? (
                <span className="text-[10px] text-emerald-400 font-medium block">
                  Save {dish.discountPercent}%
                </span>
              ) : null}
            </div>

            {/* Quick Add Button */}
            <button
              onClick={handleQuickAddClick}
              disabled={!dish.isAvailable}
              className={`p-2 rounded-xl transition-all flex items-center justify-center cursor-pointer ${
                dish.isAvailable
                  ? addedAnimation
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#1e2026] hover:bg-[#c5a059] text-stone-200 hover:text-black border border-white/10 hover:border-transparent active:scale-90'
                  : 'bg-stone-800 text-stone-600 cursor-not-allowed border border-white/5'
              }`}
              title={dish.isAvailable ? "Add to Order" : "Currently Unavailable"}
              aria-label={`Add ${dish.name} to order`}
            >
              {addedAnimation ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
