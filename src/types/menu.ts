export type DiningMode = 'table' | 'room';

export type SpiceLevel = 'None' | 'Mild' | 'Medium' | 'Spicy' | 'Extra Spicy';

export interface PortionOption {
  name: string;
  priceDelta: number;
}

export interface AddOnOption {
  name: string;
  priceDelta: number;
}

export interface DishReview {
  author: string;
  role: string;
  rating: number;
  text: string;
  date: string;
  tasteRating: number;
  presentationRating: number;
  qualityRating: number;
}

export interface DishPairing {
  id: string;
  name: string;
  category: string;
  reason: string;
  price: number;
  image: string;
}

export interface DishItem {
  id: string;
  name: string;
  secondaryTitle?: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  badge?: 'Chef\'s Signature' | 'Michelin Selection' | 'Today\'s Special' | 'Limited Reserve' | 'Popular';
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree?: boolean;
  spiceLevel: SpiceLevel;
  prepTimeMinutes: number;
  rating: number;
  reviewCount: number;
  reviews?: DishReview[];
  image: string;
  videoPreview?: {
    videoUrl?: string;
    caption: string;
  };
  ingredients: string[];
  allergens: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    servingSize: string;
  };
  chefsNote: string;
  pairings?: DishPairing[];
  customizations?: {
    spiceLevels?: SpiceLevel[];
    portions?: PortionOption[];
    addOns?: AddOnOption[];
  };
  isAvailable: boolean;
}

export interface CartItem {
  cartItemId: string;
  dish: DishItem;
  quantity: number;
  selectedSpice: SpiceLevel;
  selectedPortion?: PortionOption;
  selectedAddOns: AddOnOption[];
  specialInstructions?: string;
  totalPrice: number;
}

export interface OrderRecord {
  orderId: string;
  orderNumber: string;
  timestamp: string;
  diningMode: DiningMode;
  locationIdentifier: string; // e.g. "Table 14" or "Suite 804"
  guestName?: string;
  items: CartItem[];
  subtotal: number;
  discountTotal: number;
  tax: number;
  serviceCharge: number;
  tip: number;
  total: number;
  status: 'confirmed' | 'preparing' | 'plating' | 'ready' | 'delivered';
  estimatedMinutes: number;
  notes?: string;
}
