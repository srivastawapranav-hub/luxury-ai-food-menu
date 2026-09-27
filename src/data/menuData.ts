import { DishItem } from '../types/menu';

export const RESTAURANT_INFO = {
  name: "THE IMPERIAL TABLE",
  subtitle: "Grand Heritage & Fine Dining",
  hotelName: "The Imperial Palace Hotel & Grand Resort",
  executiveChef: "Julian Vance",
  sommelier: "Éléonore Moreau",
  tagline: "An exceptional culinary journey crafted by Master Chef Julian Vance",
  location: "Level 42, The Grand Atrium, Belvedere Bay",
  currencySymbol: "₹",
  taxRate: 0.05, // 5% GST
  serviceChargeRate: 0.10, // 10% Luxury Service Charge
};

export const MENU_CATEGORIES = [
  "All Dishes",
  "Chef's Signature",
  "Today's Specials",
  "Starters & Caviar",
  "Soups & Velouté",
  "Indian Heritage",
  "Continental & Grills",
  "Italian & Pasta",
  "Asian & Dim Sum",
  "Seafood & Coastal",
  "Vegetarian & Vegan",
  "Breads & Rice",
  "Desserts & Pâtisserie",
  "Reserve Cellar & Cocktails",
] as const;

export const INITIAL_DISHES: DishItem[] = [
  {
    id: "sig-1",
    name: "Truffle & Wild Morel Risotto",
    secondaryTitle: "Risotto ai Funghi Porcini e Tartufo Nero",
    category: "Chef's Signature",
    shortDescription: "Acquerello 7-year aged Carnaroli rice, French morels, 36-month Parmigiano-Reggiano, freshly shaved Norcia black truffles.",
    fullDescription: "A masterclass in Italian slow-cooking. We simmer 7-year aged Acquerello Carnaroli grains in a 24-hour reduced golden cep broth, folded with cultured Normandy butter and 36-month Vacche Rosse Parmigiano-Reggiano. Finished tableside with hand-shaved Norcia winter black truffles and organic chive oil.",
    price: 1850,
    originalPrice: 2200,
    discountPercent: 16,
    badge: "Chef's Signature",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "None",
    prepTimeMinutes: 18,
    rating: 4.95,
    reviewCount: 428,
    reviews: [
      {
        author: "Lord Henry Cavendish",
        role: "Gourmet Critic",
        rating: 5,
        tasteRating: 5,
        presentationRating: 5,
        qualityRating: 5,
        date: "Last week",
        text: "The aromatic punch of the shaved black truffles combined with the sheer creaminess of the Carnaroli is peerless in the city."
      },
      {
        author: "Meera Singhania",
        role: "Hotel Resident",
        rating: 5,
        tasteRating: 5,
        presentationRating: 4.9,
        qualityRating: 5,
        date: "2 days ago",
        text: "Ordered this to Suite 804. Arrived piping hot under a heated silver cloche. Spectacular comfort luxury."
      }
    ],
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-plating-a-dish-in-a-restaurant-kitchen-42867-large.mp4",
      caption: "Tableside shaving of Norcia black winter truffle over creamy Acquerello risotto."
    },
    ingredients: [
      "7-year Aged Acquerello Carnaroli Rice",
      "Norcia Black Winter Truffle",
      "French Wild Morels & Porcini",
      "36-Month Parmigiano-Reggiano Vacche Rosse",
      "Cultured Normandy Butter",
      "Reduced Cep Mushroom Broth",
      "Micro Celery Cress"
    ],
    allergens: ["Contains: Dairy"],
    nutrition: {
      calories: 520,
      protein: "14g",
      carbs: "62g",
      fat: "24g",
      servingSize: "320g"
    },
    chefsNote: "Our pride. We allow the Carnaroli grain to absorb the cep reduction at a measured 84°C before whipping with cold butter in the mantecatura technique.",
    pairings: [
      {
        id: "wine-1",
        name: "Barolo DOCG Riserva 2018",
        category: "Reserve Cellar",
        reason: "The earthy tannins and dried rose aromas complement the savory umami of the Norcia truffle.",
        price: 1600,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "mock-1",
        name: "Smoked Pear & Rosemary Elixir",
        category: "Artisanal Mocktail",
        reason: "Subtle woodsmoke botanicals balance the richness of aged Parmigiano.",
        price: 550,
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
      }
    ],
    customizations: {
      spiceLevels: ["None", "Mild"],
      portions: [
        { name: "Demi Tasting (Single)", priceDelta: -450 },
        { name: "Regular Portioned", priceDelta: 0 },
        { name: "Grand Reserve (With Extra Shaved Truffle)", priceDelta: 650 }
      ],
      addOns: [
        { name: "Additional Shaved Fresh Black Truffle (5g)", priceDelta: 600 },
        { name: "Pan-Seared Hudson Valley Foie Gras Medallion", priceDelta: 850 },
        { name: "Aged Aceto Balsamico Tradizionale 25yr Drops", priceDelta: 250 }
      ]
    },
    isAvailable: true
  },
  {
    id: "sig-2",
    name: "Miyazaki A5 Wagyu Tenderloin",
    secondaryTitle: "Filetto di Wagyu con Riduzione al Tartufo",
    category: "Chef's Signature",
    shortDescription: "Certified Japanese BMS 11+ tenderloin, Robata grilled over Binchotan charcoal, roasted bone marrow jus, silky Robuchon potato purée.",
    fullDescription: "Directly imported from Miyazaki Prefecture, this BMS 11+ A5 tenderloin is gently tempered and seared over smokeless Japanese white oak Binchotan coals. Served with glazed Tokyo turnip, silken pomme mousseline whipped with cultured Isigny butter, and a 48-hour veal glaze infused with black garlic.",
    price: 3800,
    originalPrice: 4200,
    discountPercent: 10,
    badge: "Michelin Selection",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "None",
    prepTimeMinutes: 24,
    rating: 4.98,
    reviewCount: 312,
    reviews: [
      {
        author: "Ambassador R. Sterling",
        role: "Private Diplomat",
        rating: 5,
        tasteRating: 5,
        presentationRating: 5,
        qualityRating: 5,
        date: "Yesterday",
        text: "Melt-in-mouth marbling that rivals the best steakhouses in Ginza. The bone marrow glaze is pure velvet."
      }
    ],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cutting-a-steak-on-a-wooden-board-42873-large.mp4",
      caption: "Slicing through tender Miyazaki A5 Wagyu glistening with rich demi-glace."
    },
    ingredients: [
      "Miyazaki Prefecture A5 Wagyu Beef Tenderloin",
      "Isigny Ste Mère French Butter",
      "Ratte Potatoes (Robuchon style)",
      "Binchotan Oak Smoke Essence",
      "48-hour Reduced Bone Marrow Veal Jus",
      "Fermented Black Garlic Emulsion",
      "Maldon Smoked Sea Salt Crystals"
    ],
    allergens: ["Contains: Dairy"],
    nutrition: {
      calories: 680,
      protein: "48g",
      carbs: "18g",
      fat: "46g",
      servingSize: "280g"
    },
    chefsNote: "We recommend Chef's preferred temperature: Medium Rare. Wagyu fat melts at precisely 25°C, creating unparalleled tenderness on the palate.",
    pairings: [
      {
        id: "wine-2",
        name: "Château Margaux Premier Grand Cru 2015",
        category: "Reserve Cellar",
        reason: "Velvety cassis, cedar box notes, and regal structure match the intense Wagyu marbling.",
        price: 3200,
        image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "side-1",
        name: "Charred Asparagus with Hollandaise",
        category: "Continental & Grills",
        reason: "Crisp mineral snap cleanses the palate between rich bites.",
        price: 650,
        image: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=600&q=80"
      }
    ],
    customizations: {
      portions: [
        { name: "Petite Cut (140g)", priceDelta: -800 },
        { name: "Signature Imperial Cut (200g)", priceDelta: 0 },
        { name: "Grand Emperor Cut (280g)", priceDelta: 1200 }
      ],
      addOns: [
        { name: "Pan-Seared Jumbo Diver Scallop", priceDelta: 750 },
        { name: "Fresh Shaved Norcia Truffle Medallion", priceDelta: 600 },
        { name: "Double Black Truffle Butter Quenelle", priceDelta: 280 }
      ]
    },
    isAvailable: true
  },
  {
    id: "start-1",
    name: "Royal Ossetra Caviar Tartlet",
    secondaryTitle: "Caviar Impérial & Crème Fraîche Fumée",
    category: "Starters & Caviar",
    shortDescription: "Gaspésie Royal Ossetra Caviar (30g), crisp buckwheat pastry shell, house smoked crème fraîche, cured quail egg yolk.",
    fullDescription: "Served on a sculpted crushed ice plinth. Delicate crisp Brittany buckwheat tartlet filled with organic smoked crème fraîche, chives, shaved cured golden egg yolk, crowned with generous Caspian Royal Ossetra Caviar pearls possessing deep nutty brine.",
    price: 3200,
    originalPrice: 3500,
    discountPercent: 9,
    badge: "Limited Reserve",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "None",
    prepTimeMinutes: 12,
    rating: 4.96,
    reviewCount: 184,
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Gentle mother-of-pearl spoon serving glistening Ossetra Caviar."
    },
    ingredients: [
      "Royal Ossetra Sturgeon Caviar (30g)",
      "Artisanal Brittany Buckwheat Pastry",
      "Applewood Smoked Normandy Crème Fraîche",
      "Slow-Cured Organic Quail Egg Yolk",
      "Finely Snipped Garden Chives",
      "Edible 24k Gold Flakes"
    ],
    allergens: ["Contains: Fish/Caviar", "Contains: Dairy", "Contains: Gluten", "Contains: Eggs"],
    nutrition: {
      calories: 210,
      protein: "16g",
      carbs: "11g",
      fat: "14g",
      servingSize: "110g"
    },
    chefsNote: "Always served with our hand-carved mother-of-pearl spoons to preserve the delicate sea-spray sweetness of unblemished caviar.",
    pairings: [
      {
        id: "wine-3",
        name: "Dom Pérignon Vintage Champagne",
        category: "Reserve Cellar",
        reason: "The crystalline effervescence and brioche nuances cleanse the palate with aristocratic grace.",
        price: 2800,
        image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=600&q=80"
      }
    ],
    customizations: {
      addOns: [
        { name: "Upgrade to Beluga Hybrid Reserve (30g)", priceDelta: 1800 },
        { name: "Extra Warm Toasted Blinis (4 pcs)", priceDelta: 200 }
      ]
    },
    isAvailable: true
  },
  {
    id: "soup-1",
    name: "Wild Lobster & Saffron Velouté",
    secondaryTitle: "Velouté de Homard Breton au Safran",
    category: "Soups & Velouté",
    shortDescription: "Brittany blue lobster tail, roasted fennel cream, Iranian saffron threads, Cognac flambé emulsion.",
    fullDescription: "Roasted Brittany blue lobster shells crushed and simmered with mirepoix, flambéed with aged Hennessy Cognac, then emulsified with farm-fresh double cream and Grade 1 Sargol saffron from Khorasan. Poured tableside over butter-poached lobster medallions and fennel pollen croutons.",
    price: 1250,
    originalPrice: 1450,
    discountPercent: 14,
    badge: "Today's Special",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "Mild",
    prepTimeMinutes: 14,
    rating: 4.88,
    reviewCount: 220,
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Tableside pour of steaming golden saffron lobster bisque over tender medallions."
    },
    ingredients: [
      "Poached Brittany Blue Lobster Tail",
      "Khorasan Iranian Sargol Saffron",
      "VSOP Cognac",
      "Braised Baby Fennel",
      "French Heavy Cream",
      "Fennel Pollen Brioche Croutons"
    ],
    allergens: ["Contains: Shellfish", "Contains: Dairy", "Contains: Gluten"],
    nutrition: {
      calories: 340,
      protein: "22g",
      carbs: "14g",
      fat: "22g",
      servingSize: "260ml"
    },
    chefsNote: "Flambéeing the shells with aged Cognac unlocks the sweet natural sugars of the lobster carapaces.",
    pairings: [
      {
        id: "bread-1",
        name: "French Truffle Brioche Loaf",
        category: "Breads & Rice",
        reason: "Golden, buttery crumb perfect for soaking the saffron lobster bisque.",
        price: 350,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
      }
    ],
    isAvailable: true
  },
  {
    id: "ind-1",
    name: "Imperial Awadhi Murgh Tikka",
    secondaryTitle: "Slow-Tandoor Saffron & Mace Chicken",
    category: "Indian Heritage",
    shortDescription: "Tender chicken suprêmes marinated in Kashmiri saffron, crushed green cardamom, Philadelphia curd, and edible silver vark.",
    fullDescription: "An ode to Lucknow's royal Nawabi banquets. Prime organic chicken breast steeped for 18 hours in hung curd, hand-pounded javitri (mace), Kashmiri saffron, and cold-pressed yellow mustard oil. Smoked in our clay pit tandoor with aromatic clove smoke, served with mint emulsion and roomali crisp.",
    price: 1450,
    originalPrice: 1650,
    discountPercent: 12,
    badge: "Chef's Signature",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "Medium",
    prepTimeMinutes: 20,
    rating: 4.92,
    reviewCount: 380,
    image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Skewers roasting inside clay tandoor with aromatic clove and charcoal smoke."
    },
    ingredients: [
      "Organic Farm Chicken Suprême",
      "Kashmiri Saffron (Grade 1)",
      "Hung Artisanal Yogurt",
      "Green Cardamom & Javitri (Mace)",
      "Charcoal Dhungar Clove Smoke",
      "Edible Silver Leaf (Chandi Vark)"
    ],
    allergens: ["Contains: Dairy"],
    nutrition: {
      calories: 460,
      protein: "42g",
      carbs: "9g",
      fat: "28g",
      servingSize: "300g"
    },
    chefsNote: "The signature tenderness comes from our traditional smoking technique (dhungar) infused with ghee and cloves.",
    pairings: [
      {
        id: "bread-2",
        name: "Truffle Garlic Butter Naan",
        category: "Breads & Rice",
        reason: "Clay-oven baked with cultured ghee and garlic, sublime with tandoor spices.",
        price: 280,
        image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "bevg-1",
        name: "Royal Kesar Pistachio Lassi",
        category: "Reserve Cellar & Cocktails",
        reason: "Velvety saffron yoghurt drink that cools the palate seamlessly.",
        price: 450,
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=80"
      }
    ],
    customizations: {
      spiceLevels: ["Mild", "Medium", "Spicy"],
      addOns: [
        { name: "Extra Fresh Mint & Pomegranate Chutney", priceDelta: 120 },
        { name: "Tossed Pickled Pearl Onions", priceDelta: 90 }
      ]
    },
    isAvailable: true
  },
  {
    id: "ind-2",
    name: "Dal Imperial 24-Hour Bukhara",
    secondaryTitle: "Slow-Simmered Black Lentils with Churned Butter",
    category: "Indian Heritage",
    shortDescription: "Whole black urad lentils slow-simmered for 24 continuous hours over low charcoal, enriched with vine tomatoes and white makhan.",
    fullDescription: "Our legendary heritage creation. Urad lentils cooked continuously over slow embers from dusk till dawn. Finished with slow-reduced tomato pulp, sun-dried fenugreek leaves (kasoori methi), and house-churned cultured white butter for a velvety, smoky finish.",
    price: 950,
    badge: "Popular",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "Mild",
    prepTimeMinutes: 12,
    rating: 4.95,
    reviewCount: 512,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Whirling dollop of fresh churned white butter melting into smoky black lentils."
    },
    ingredients: [
      "Slow-Soaked Whole Urad Dal",
      "Vine-Ripened San Marzano & Dehati Tomatoes",
      "Churned White Butter (Safed Makhan)",
      "Nagauri Kasoori Methi (Sun-Dried Fenugreek)",
      "Smoked Kashmiri Deggi Mirch",
      "Aromatic Ginger Slivers"
    ],
    allergens: ["Contains: Dairy"],
    nutrition: {
      calories: 390,
      protein: "18g",
      carbs: "42g",
      fat: "19g",
      servingSize: "320g"
    },
    chefsNote: "There are no shortcuts here. The unctuous mouthfeel comes solely from 24 hours of gentle thermal breakdown of the whole lentils.",
    pairings: [
      {
        id: "bread-3",
        name: "Laccha Paratha with Smoked Ghee",
        category: "Breads & Rice",
        reason: "Multi-layered flaky bread that carries the buttery sauce gracefully.",
        price: 240,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
      }
    ],
    isAvailable: true
  },
  {
    id: "sea-1",
    name: "Pan-Seared Chilean Sea Bass",
    secondaryTitle: "Loup de Mer au Beurre Blanc Yuzu",
    category: "Seafood & Coastal",
    shortDescription: "Wild-caught Patagonian Toothfish, golden caramelized crust, Tokyo yuzu beurre blanc, sea asparagus, caviar pearls.",
    fullDescription: "Sustainably caught in Antarctic deep waters. We pan-sear the thick sea bass fillet in clarifying butter until the skin crackles like glass while the interior remains pearlescent and buttery. Accompanied by charred baby leeks, sea asparagus, and a delicate emulsion of Japanese yuzu citrus and French cultured butter.",
    price: 2450,
    originalPrice: 2750,
    discountPercent: 11,
    badge: "Chef's Signature",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    spiceLevel: "None",
    prepTimeMinutes: 20,
    rating: 4.94,
    reviewCount: 260,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Saucing pan-seared sea bass with glistening citrus yuzu beurre blanc."
    },
    ingredients: [
      "Wild Caught Chilean Sea Bass Fillet (220g)",
      "Japanese Yuzu Citrus Reduction",
      "Normandy Cultured Butter",
      "Fresh Salicornia (Sea Asparagus)",
      "Charred Japanese Baby Leeks",
      "Salmon Trout Caviar Beads"
    ],
    allergens: ["Contains: Fish", "Contains: Dairy"],
    nutrition: {
      calories: 490,
      protein: "38g",
      carbs: "6g",
      fat: "32g",
      servingSize: "280g"
    },
    chefsNote: "The natural oil content of the Chilean sea bass allows it to remain succulent even with an intensely caramelized exterior.",
    pairings: [
      {
        id: "wine-4",
        name: "Puligny-Montrachet 1er Cru 2020",
        category: "Reserve Cellar",
        reason: "Crisp minerality, hazelnuts, and lemon curd note harmonize with the rich sea bass.",
        price: 2100,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
      }
    ],
    customizations: {
      portions: [
        { name: "Regular Portioned (220g)", priceDelta: 0 },
        { name: "Grand Portioned (300g)", priceDelta: 600 }
      ],
      addOns: [
        { name: "Add Golden Ossetra Caviar Garnish (10g)", priceDelta: 850 },
        { name: "Side of Steamed Romanesco with Herb Butter", priceDelta: 320 }
      ]
    },
    isAvailable: true
  },
  {
    id: "pasta-1",
    name: "Handmade Tagliolini al Tartufo",
    secondaryTitle: "Pasta Fresca ai 30 Tuorli con Tartufo",
    category: "Italian & Pasta",
    shortDescription: "Silky 30-egg-yolk pasta ribbons tossed in artisanal mountain butter, Sage infusion, and tableside shaved black truffle.",
    fullDescription: "Crafted daily at 7 AM in our temperature-controlled pasta laboratory using stone-milled Italian Tipo 00 flour and 30 golden organic egg yolks per kilogram. Cooked al dente for 90 seconds, then emulsified in a pan with foaming alpine butter, starchy pasta water, and mountain sage.",
    price: 1650,
    badge: "Popular",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "None",
    prepTimeMinutes: 14,
    rating: 4.89,
    reviewCount: 340,
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281699?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Twirling ribbons of egg tagliolini glistening with truffle butter."
    },
    ingredients: [
      "Organic 30-Egg-Yolk Tagliolini Ribbon Pasta",
      "Piedmontese Mountain Butter",
      "Shaved Black Winter Truffle",
      "Garden Sage Infusion",
      "Vacche Rosse Parmigiano Reggiano",
      "Cracked Tellicherry Black Pepper"
    ],
    allergens: ["Contains: Gluten", "Contains: Eggs", "Contains: Dairy"],
    nutrition: {
      calories: 580,
      protein: "19g",
      carbs: "68g",
      fat: "26g",
      servingSize: "290g"
    },
    chefsNote: "Fresh pasta is all about touch and timing. We roll the dough to exactly 0.8mm thickness for optimal al dente bite.",
    pairings: [
      {
        id: "wine-5",
        name: "Gavi di Gavi DOCG Black Label",
        category: "Reserve Cellar",
        reason: "Crisp Cortese grapes deliver pristine acidity that offsets the rich egg pasta.",
        price: 1100,
        image: "https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&w=600&q=80"
      }
    ],
    customizations: {
      addOns: [
        { name: "Extra Shaved Fresh Truffle", priceDelta: 450 },
        { name: "Grilled Wild Jumbo Prawn", priceDelta: 650 }
      ]
    },
    isAvailable: true
  },
  {
    id: "dim-1",
    name: "Truffle Edamame & Morel Dim Sum",
    secondaryTitle: "Artisanal Translucent Crystal Dumplings (4 Pcs)",
    category: "Asian & Dim Sum",
    shortDescription: "Translucent wheat-starch dumpling crystal skin, sweet young edamame purée, wild morels, white truffle perfume.",
    fullDescription: "Folded with 12 precise artisanal pleats. The filling combines baby edamame beans crushed with bamboo shoots, roasted Yunnan morels, water chestnuts, and cold-pressed white truffle oil. Steamed in fragrant lotus leaf baskets.",
    price: 980,
    badge: "Today's Special",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
    spiceLevel: "Mild",
    prepTimeMinutes: 12,
    rating: 4.87,
    reviewCount: 195,
    image: "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Lifting bamboo steamer lid to reveal delicate translucent dumplings with rising steam."
    },
    ingredients: [
      "Organic Young Edamame",
      "Wild Yunnan Morel Mushrooms",
      "Crisp Water Chestnuts & Bamboo Shoots",
      "White Truffle Essence",
      "Aged Soy & Ginger Vinegar Dip",
      "Crisp Chili Crisps Oil"
    ],
    allergens: ["Contains: Soy", "Contains: Gluten"],
    nutrition: {
      calories: 220,
      protein: "9g",
      carbs: "34g",
      fat: "6g",
      servingSize: "180g"
    },
    chefsNote: "Our dim sum master folds each dumpling in under seven seconds so the delicate crystal dough retains its elasticity.",
    pairings: [
      {
        id: "tea-1",
        name: "First Flush Darjeeling Imperial Spring",
        category: "Fine Teas & Coffee",
        reason: "Floral muscatel notes cleanse the palate delightfully between dumplings.",
        price: 380,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
      }
    ],
    isAvailable: true
  },
  {
    id: "des-1",
    name: "Valrhona Guanaja Chocolate Fondant",
    secondaryTitle: "Fondant au Chocolat Noir 70% & Feuille d'Or",
    category: "Desserts & Pâtisserie",
    shortDescription: "Warm molten 70% single-origin dark chocolate cake, 24k edible gold dust, paired with Tahitian vanilla bean gelato.",
    fullDescription: "Baked à la minute. Rich, warm bittersweet single-origin dark chocolate sponge with an oozing liquid center of molten Ganache. Embellished with 24k gold leaf, salted Valrhona cocoa nibs, and a quenelle of slow-churned Tahitian bourbon vanilla bean gelato.",
    price: 750,
    originalPrice: 850,
    discountPercent: 12,
    badge: "Chef's Signature",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "None",
    prepTimeMinutes: 16,
    rating: 4.97,
    reviewCount: 460,
    reviews: [
      {
        author: "Sophie Laurent",
        role: "Pastry Connoisseur",
        rating: 5,
        tasteRating: 5,
        presentationRating: 5,
        qualityRating: 5,
        date: "3 days ago",
        text: "The molten center is warm perfection without being cloying. The Tahitian vanilla gelato provides exquisite thermal contrast."
      }
    ],
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Spoon piercing chocolate cake as warm molten lava flows over gold leaf."
    },
    ingredients: [
      "Valrhona 70% Guanaja Single-Origin Cocoa",
      "Normandy Cultured Butter",
      "Farm Fresh Organic Eggs",
      "Tahitian Bourbon Vanilla Beans",
      "Maldon Smoked Sea Salt Flakes",
      "24-Karat Edible Gold Leaf"
    ],
    allergens: ["Contains: Dairy", "Contains: Eggs", "Contains: Gluten"],
    nutrition: {
      calories: 460,
      protein: "8g",
      carbs: "48g",
      fat: "28g",
      servingSize: "210g"
    },
    chefsNote: "Timing is everything: exactly 11 minutes in our stone oven guarantees a paper-thin exterior that bursts open at the touch of your spoon.",
    pairings: [
      {
        id: "wine-6",
        name: "Taylor's 20-Year Old Tawny Port",
        category: "Reserve Cellar",
        reason: "Fig, walnut, and dried plum aromatics elevate dark chocolate to heaven.",
        price: 950,
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "coffee-1",
        name: "Single-Estate Ethiopian Yirgacheffe Espresso",
        category: "Fine Teas & Coffee",
        reason: "Bright berry acidity cuts through rich cocoa butter.",
        price: 290,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
      }
    ],
    customizations: {
      addOns: [
        { name: "Extra Scoop Tahitian Vanilla Gelato", priceDelta: 180 },
        { name: "Fresh Macerated Raspberries in Grand Marnier", priceDelta: 220 }
      ]
    },
    isAvailable: true
  },
  {
    id: "des-2",
    name: "Royal Saffron Rasmalai Mille-Feuille",
    secondaryTitle: "Artisanal Indo-French Pâtisserie Fusion",
    category: "Desserts & Pâtisserie",
    shortDescription: "Caramelized crisp puff pastry leaves layered with cardamom-poached chenna patties and rich saffron rabri mousse.",
    fullDescription: "An artistic cross between Parisian haute patisserie and royal Awadhi confections. Feather-light caramelized puff pastry leaves sandwiching delicate fresh chenna pillows, infused with saffron-pistachio rabri mousse, rose petals, and crushed Iranian green pistachios.",
    price: 680,
    badge: "Chef's Signature",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
    spiceLevel: "None",
    prepTimeMinutes: 10,
    rating: 4.91,
    reviewCount: 284,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Pouring warm saffron rabri over delicate caramelized mille-feuille."
    },
    ingredients: [
      "Handmade Puff Pastry (Feuilletage)",
      "Organic Buffalo Milk Chenna",
      "Kashmiri Mogra Saffron",
      "Iranian Pistachios & Green Cardamom",
      "Candied Damask Rose Petals"
    ],
    allergens: ["Contains: Dairy", "Contains: Gluten", "Contains: Tree Nuts"],
    nutrition: {
      calories: 380,
      protein: "11g",
      carbs: "44g",
      fat: "18g",
      servingSize: "190g"
    },
    chefsNote: "A bridge between culinary continents: Parisian crispness meeting the aromatic decadence of Lucknow.",
    pairings: [
      {
        id: "tea-2",
        name: "Silver Needle White Tea Reserve",
        category: "Fine Teas & Coffee",
        reason: "Subtle honeydew melon sweetness that caresses the saffron cream.",
        price: 360,
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80"
      }
    ],
    isAvailable: true
  },
  {
    id: "cock-1",
    name: "The Imperial Smoked Sazerac",
    secondaryTitle: "Signature Tableside Presentation",
    category: "Reserve Cellar & Cocktails",
    shortDescription: "Woodford Reserve Bourbon, Hennessy Cognac, Peychaud's bitters, French absinthe rinse, smoked with applewood embers.",
    fullDescription: "Presented tableside under a crystal smoke bell. Premium rye and Cognac stirred over hand-cut crystal ice with artisanal cane syrup and Peychaud's bitters, rinsed with La Fée Absinthe and infused with aromatic applewood smoke.",
    price: 980,
    badge: "Limited Reserve",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
    spiceLevel: "None",
    prepTimeMinutes: 6,
    rating: 4.95,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=80",
    videoPreview: {
      caption: "Lifting crystal cloche as aromatic applewood smoke drifts around the coupe glass."
    },
    ingredients: [
      "Woodford Reserve Double Oaked Bourbon",
      "Hennessy VSOP Privilège Cognac",
      "La Fée Absinthe Blanche",
      "Peychaud's & Orange Bitters",
      "Applewood Smoke Infusion",
      "Flamed Lemon Peel Oils"
    ],
    allergens: [],
    nutrition: {
      calories: 190,
      protein: "0g",
      carbs: "6g",
      fat: "0g",
      servingSize: "120ml"
    },
    chefsNote: "Our head mixologist burns seasoned applewood staves directly into the glass bell to impart lingering caramel notes.",
    isAvailable: true
  }
];

export const SERVICE_REQUEST_OPTIONS = [
  { id: 'water', label: 'Request Sparkling / Still Water', icon: 'droplet', estimate: '2 min' },
  { id: 'waiter', label: 'Call Attentive Table Server', icon: 'user-check', estimate: '90 sec' },
  { id: 'sommelier', label: 'Request Master Sommelier', icon: 'wine', estimate: '3 min' },
  { id: 'cutlery', label: 'Extra Cutlery & Fine Linen', icon: 'utensils', estimate: '2 min' },
  { id: 'bill', label: 'Request Digital or Leather Folio Bill', icon: 'receipt', estimate: '2 min' },
  { id: 'chef', label: 'Compliments to Chef Julian Vance', icon: 'heart', estimate: 'Recorded' },
];
