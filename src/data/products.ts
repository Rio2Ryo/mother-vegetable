const CDN_BASE =
  "https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GalleryImage {
  url: string;
  alt: string;
}

export interface MixItem {
  label: string;
  image: string;
}

export interface ProductData {
  id: string;
  name: string;
  nameJa?: string;
  fullName: string;
  slug: string;
  description: string;
  descriptionJa?: string;
  price: number;
  currency: string;
  sku: string;
  category: "food" | "cosmetic" | "pet";
  tier: 'regular' | 'product100';
  images: string[];
  thumbnails: string[];
  videoUrls: string[];
  mainVideoUrl: string;
  benefits: string[];
  taglineJp: string;
  tagline: string;
  subtitle: string;
  howToUse: string;
  howToLink: string;
  inStock: boolean;
  priceJpy: string;
  galleryImages: GalleryImage[];
  subscriptionMonth?: number; // 5-12 for May-December monthly subscription
  subcategory?: 'seasoning' | 'supplement' | 'cosmetic' | 'fish';
  // category-specific mix-in items
  drinkItems?: MixItem[];
  foodItems?: MixItem[];
  cosmeticItems?: MixItem[];
  petItems?: MixItem[];
  // Environmental impact + MVT reward (demo values)
  co2SavedKg?: number;
  proteinGrams?: number;
  chemicalReducedGrams?: number;
  mvtReward?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function thumbnails(
  prefix: string,
  start: number,
  end: number,
  ext = "jpg"
): string[] {
  const out: string[] = [];
  for (let i = start; i <= end; i++) {
    out.push(`/cdn/${prefix}_${i}.${ext}`);
  }
  return out;
}

function videoRange(product: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) =>
      `${CDN_BASE}/products/${product}/${product}_video_${i + 1}.mp4`
  );
}

// ---------------------------------------------------------------------------
// Achieve
// ---------------------------------------------------------------------------

const achieve: ProductData = {
  id: "achieve-capsule-30",
  name: "Achieve",
  nameJa: "アチーブ",
  fullName: "Mother Vegetable Achieve",
  slug: "achieve",
  description:
    "48 different nutrients at once. Supports a healthy gut, regeneration of cells throughout the body.",
  descriptionJa: "48種の栄養素を一度に摂取。腸の健康と全身の細胞再生をサポート。",
  price: 36.70,
  currency: "USD",
  sku: "MV-ACH-030",
  category: "food",
  tier: 'regular',
  images: ["/cdn/products_achieve_10001.png"],
  galleryImages: [
    { url: "/cdn/products_achieve_10001.png", alt: "Achieve green superfood supplement packaging with 30 individual stick packets" },
    { url: "/cdn/products_achieve_10001.png", alt: "Achieve supplement stick being mixed into a refreshing glass of water" },
    { url: "/cdn/products_achieve_10001.png", alt: "Close-up of Achieve powder showing fine green plant-based nutrient texture" },
    { url: "/cdn/products_achieve_10001.png", alt: "Achieve supplement alongside fresh fruits, salads, and healthy meal ingredients" },
    { url: "/cdn/products_achieve_10001.png", alt: "Active person enjoying improved energy and gut health from daily Achieve routine" },
  ],
  thumbnails: thumbnails("products_achieve", 10002, 10010),
  videoUrls: videoRange("achieve", 4),
  mainVideoUrl: `${CDN_BASE}/products/achieve/achieve_video_1.mp4`,
  benefits: [
    "Supports a healthy gut, Regeneration of cells throughout the body.",
    "Helps relieve constipation, improve sleep, and aid weight management.",
  ],
  taglineJp: "",
  tagline: "48 different nutrients at once.",
  subtitle: "for Body",
  howToUse:
    "Simply add one stick into your drink or meal.",
  howToLink: "/achieve-howto",
  inStock: true,
  priceJpy: '¥5,500',
  co2SavedKg: 1.2,
  proteinGrams: 6,
  chemicalReducedGrams: 40,
  mvtReward: 80,
  drinkItems: [
    { label: "Beer", image: "/Images/Assets/achieve/mazekomu/beer.png" },
    { label: "Cola", image: "/Images/Assets/achieve/mazekomu/cola.png" },
    { label: "Juice", image: "/Images/Assets/achieve/mazekomu/juice.png" },
    {
      label: "Highball",
      image: "/Images/Assets/achieve/mazekomu/highball.png",
    },
    {
      label: "White Wine",
      image: "/Images/Assets/achieve/mazekomu/whiteWine.png",
    },
    {
      label: "Water Green",
      image: "/Images/Assets/achieve/mazekomu/water_green.png",
    },
  ],
  foodItems: [
    {
      label: "Fried Rice",
      image: "/Images/Assets/achieve/mazekomu/friedRice.png",
    },
    { label: "Pasta", image: "/Images/Assets/achieve/mazekomu/pasta.png" },
    { label: "Ramen", image: "/Images/Assets/achieve/mazekomu/ramen.png" },
    { label: "Salad", image: "/Images/Assets/achieve/mazekomu/salad.png" },
    {
      label: "Tempura",
      image: "/Images/Assets/achieve/mazekomu/tempura.png",
    },
    {
      label: "Yogurt",
      image: "/Images/Assets/achieve/mazekomu/yogurt.png",
    },
  ],
};

// ---------------------------------------------------------------------------
// Confidence
// ---------------------------------------------------------------------------

const confidence: ProductData = {
  id: "confidence-tube-30",
  name: "Confidence",
  nameJa: "コンフィデンス",
  fullName: "Mother Vegetable Confidence",
  slug: "confidence",
  description:
    "Natural skin care for all skin types.",
  descriptionJa: "すべての肌タイプに。天然スキンケア。",
  price: 36.70,
  currency: "USD",
  sku: "MV-CON-030",
  category: "cosmetic",
  tier: 'regular',
  images: ["/cdn/products_confidence_10001.png"],
  galleryImages: [
    { url: "/cdn/products_confidence_10001.png", alt: "Confidence skincare tube packaging with sleek green and white design" },
    { url: "/cdn/products_confidence_10001.png", alt: "Confidence cream being gently applied to facial skin for daily care" },
    { url: "/cdn/products_confidence_10001.png", alt: "Close-up of Confidence gel texture showing smooth collagen-rich formula" },
    { url: "/cdn/products_confidence_10001.png", alt: "Confidence tube displayed with natural botanical ingredients and cosmetic tools" },
    { url: "/cdn/products_confidence_10001.png", alt: "Radiant glowing skin after consistent use of Confidence skincare treatment" },
  ],
  thumbnails: thumbnails("products_confidence", 10002, 10010),
  videoUrls: videoRange("confidence", 4),
  mainVideoUrl: `${CDN_BASE}/products/confidence/confidence_video_1.mp4`,
  benefits: [
    "Supports your daily beauty care.",
    "Helps keep skin looking healthy and radiant.",
  ],
  taglineJp: "",
  tagline: "For All Skin Types",
  subtitle: "For All Skin",
  howToUse:
    "Apply directly or mix into your current cosmetics.",
  howToLink: "/confidence-howto",
  inStock: true,
  priceJpy: '¥5,500',
  co2SavedKg: 0.9,
  proteinGrams: 0,
  chemicalReducedGrams: 55,
  mvtReward: 75,
  cosmeticItems: [
    {
      label: "Shampoo",
      image: "/Images/Assets/confidence/mazekomu/shampoo.png",
    },
    {
      label: "Cosmetic",
      image: "/Images/Assets/confidence/mazekomu/cosmetic.png",
    },
    {
      label: "Lip Balm",
      image: "/Images/Assets/confidence/mazekomu/ripbalm.png",
    },
    {
      label: "Toothpaste",
      image: "/Images/Assets/confidence/mazekomu/toothpaste.png",
    },
    {
      label: "Bathtub",
      image: "/Images/Assets/confidence/mazekomu/bathtub.png",
    },
    {
      label: "Manicure",
      image: "/Images/Assets/confidence/mazekomu/manicure.png",
    },
    {
      label: "Acne",
      image: "/Images/Assets/confidence/mazekomu/acne.png",
    },
    {
      label: "Allergy",
      image: "/Images/Assets/confidence/mazekomu/allergy.png",
    },
    {
      label: "Dark Spot",
      image: "/Images/Assets/confidence/mazekomu/darkSpot.png",
    },
    {
      label: "Freckles",
      image: "/Images/Assets/confidence/mazekomu/freckles.png",
    },
    {
      label: "Wound / Burn",
      image: "/Images/Assets/confidence/mazekomu/woundBurn.png",
    },
    {
      label: "Smell",
      image: "/Images/Assets/confidence/mazekomu/smell.png",
    },
  ],
};

// ---------------------------------------------------------------------------
// Tilapia
// ---------------------------------------------------------------------------

const tilapia: ProductData = {
  id: 'tilapia-fish-1',
  name: 'マザベジフィッシュ',
  nameJa: 'マザベジフィッシュ',
  fullName: 'Mother Vegetable Fish - MV Fish',
  slug: 'tilapia',
  description: 'Fresh MV Fish enriched with 48 natural nutrients for a healthy lifestyle.',
  descriptionJa: '48種の天然栄養素で育てた新鮮なマザベジフィッシュ。健康的な食生活に。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-TIL-001',
  category: 'food',
  tier: 'product100',
  subcategory: 'fish',
  subscriptionMonth: 5,
  images: ['/cdn/mv_tilapia.jpg'],
  galleryImages: [
    { url: '/cdn/mv_tilapia.jpg', alt: 'Mother Vegetable MV Fish fish product in premium packaging' },
    { url: '/cdn/mv_tilapia.jpg', alt: 'MV Fish fillet being prepared as a grilled dish with vegetables' },
    { url: '/cdn/mv_tilapia.jpg', alt: 'Close-up of fresh MV Fish flesh showing firm texture and natural color' },
    { url: '/cdn/mv_tilapia.jpg', alt: 'MV Fish served on a plate with rice, miso soup, and seasonal sides' },
    { url: '/cdn/mv_tilapia.jpg', alt: 'Nutrient-enriched MV Fish providing 48 essential vitamins and minerals' },
  ],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['48 different nutrients from MV Fish and plant-based nutrition.', 'High protein, omega-3 fatty acids, and essential minerals.'],
  taglineJp: '',
  tagline: 'Fresh nutrient-rich MV Fish.',
  subtitle: 'for Body',
  howToUse: 'Cook and enjoy as part of your daily meal.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.8,
  proteinGrams: 22,
  chemicalReducedGrams: 10,
  mvtReward: 60,
};

// ---------------------------------------------------------------------------
// MV Salt
// ---------------------------------------------------------------------------

const mvSalt: ProductData = {
  id: 'mv-salt-50g',
  name: 'マザベジ塩',
  nameJa: 'マザベジ塩',
  fullName: 'Mother Vegetable Salt',
  slug: 'mv-salt',
  description: 'Green nutrient-infused salt. 50g. Rich in minerals and 48 nutrients.',
  descriptionJa: '48種の栄養素配合の緑色の塩。50g。ミネラル豊富。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-SAL-050',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 6,
  images: ['/cdn/mv_salt.jpg'],
  galleryImages: [
    { url: '/cdn/mv_salt.jpg', alt: 'Mother Vegetable Salt 50g jar with distinctive green mineral-rich crystals' },
    { url: '/cdn/mv_salt.jpg', alt: 'Green nutrient salt being sprinkled over a freshly grilled steak' },
    { url: '/cdn/mv_salt.jpg', alt: 'Close-up of green salt crystals showing natural mineral-rich coloring' },
    { url: '/cdn/mv_salt.jpg', alt: 'Mother Vegetable Salt displayed alongside herbs, spices, and cooking utensils' },
    { url: '/cdn/mv_salt.jpg', alt: 'Mineral comparison chart showing 48 nutrients in each pinch of green salt' },
  ],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Green mineral-rich salt with 48 nutrients.', 'Enhances flavor while adding 48 nutrients.'],
  taglineJp: '',
  tagline: 'Green mineral-rich salt.',
  subtitle: '50g',
  howToUse: 'Use as everyday salt in cooking and seasoning.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.4,
  proteinGrams: 2,
  chemicalReducedGrams: 15,
  mvtReward: 35,
};

// ---------------------------------------------------------------------------
// MV Soy Sauce
// ---------------------------------------------------------------------------

const mvSoySauce: ProductData = {
  id: 'mv-soy-sauce-150ml',
  name: 'マザベジ醤油',
  nameJa: 'マザベジ醤油',
  fullName: 'Mother Vegetable Soy Sauce',
  slug: 'mv-soy-sauce',
  description: 'Premium dark soy sauce with 48 nutrients. 150ml. Rich umami flavor.',
  descriptionJa: '48種の栄養素配合のプレミアム醤油。150ml。豊かな旨味。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-SOY-150',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 7,
  images: ['/cdn/mv_soy_sauce.jpg'],
  galleryImages: [
    { url: '/cdn/mv_soy_sauce.jpg', alt: 'Mother Vegetable Soy Sauce 150ml bottle with rich dark color' },
    { url: '/cdn/mv_soy_sauce.jpg', alt: 'Nutrient-rich soy sauce being poured over fresh sashimi' },
    { url: '/cdn/mv_soy_sauce.jpg', alt: 'Close-up of dark soy sauce showing deep umami color with green nutrient infusion' },
    { url: '/cdn/mv_soy_sauce.jpg', alt: 'Soy sauce bottle beside sushi, tofu, and traditional Japanese dishes' },
    { url: '/cdn/mv_soy_sauce.jpg', alt: 'Rich umami soy sauce delivering 48 natural nutrients with every drop' },
  ],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-infused premium soy sauce.', 'Rich umami taste with added health benefits.'],
  taglineJp: '',
  tagline: 'Nutrient-rich dark soy sauce.',
  subtitle: '150ml',
  howToUse: 'Use as everyday soy sauce for cooking and dipping.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.5,
  proteinGrams: 3,
  chemicalReducedGrams: 18,
  mvtReward: 38,
};

// ---------------------------------------------------------------------------
// MV Toner (化粧水)
// ---------------------------------------------------------------------------

const mvToner: ProductData = {
  id: 'mv-toner-150ml',
  name: 'マザベジ化粧水',
  nameJa: 'マザベジ化粧水',
  fullName: 'Mother Vegetable Toner',
  slug: 'mv-toner',
  description: 'Nutrient-infused facial toner with natural collagen. 150ml.',
  descriptionJa: '天然コラーゲン配合の化粧水。150ml。毎日のスキンケアに。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-TON-150',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 10,
  images: ['/cdn/mv_toner_detail.png'],
  galleryImages: [
    { url: '/cdn/mv_toner_detail.png', alt: 'マザベジ化粧水' },
  ],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: [
    'Natural collagen formula for your daily skincare routine.',
    'Plant-based nutrients help keep skin moisturized.',
  ],
  taglineJp: '',
  tagline: 'Confidence-powered skin toner.',
  subtitle: '150ml',
  howToUse: 'Apply to cleansed face and neck morning and evening.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.3,
  proteinGrams: 0,
  chemicalReducedGrams: 30,
  mvtReward: 40,
};

// ---------------------------------------------------------------------------
// MV Balm (バウム)
// ---------------------------------------------------------------------------

const mvBalm: ProductData = {
  id: 'mv-balm-50g',
  name: 'マザベジバウム',
  nameJa: 'マザベジバウム',
  fullName: 'Mother Vegetable Balm',
  slug: 'mv-balm',
  description: 'Luxury nutrient-rich balm with natural collagen. 50g. Multi-purpose care.',
  descriptionJa: '天然コラーゲン配合のラグジュアリーバウム。50g。マルチユーススキンケア。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-BAL-050',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 11,
  images: ['/cdn/mv_balm.jpg'],
  galleryImages: [
    { url: '/cdn/mv_balm.jpg', alt: 'Mother Vegetable Balm 50g tin with premium green and gold packaging' },
    { url: '/cdn/mv_balm.jpg', alt: 'Balm being applied to hands and cuticles for deep moisturizing care' },
    { url: '/cdn/mv_balm.jpg', alt: 'Close-up of rich balm texture showing smooth nutrient-dense cream formula' },
    { url: '/cdn/mv_balm.jpg', alt: 'Luxury balm tin displayed with lip care items and natural skincare essentials' },
    { url: '/cdn/mv_balm.jpg', alt: 'Soft repaired skin on lips and hands after regular balm application' },
  ],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: [
    'Natural collagen formula for daily moisturizing care.',
    'Multi-use luxury balm for face, lips, and body.',
  ],
  taglineJp: '',
  tagline: 'Confidence-powered luxury balm.',
  subtitle: '50g',
  howToUse: 'Apply a small amount to dry areas of skin as needed.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.25,
  proteinGrams: 0,
  chemicalReducedGrams: 28,
  mvtReward: 38,
};

// ---------------------------------------------------------------------------
// MV Soap (石鹸)
// ---------------------------------------------------------------------------

const mvSoap: ProductData = {
  id: 'mv-soap-100g',
  name: 'マザベジ石鹸',
  nameJa: 'マザベジ石鹸',
  fullName: 'Mother Vegetable Soap',
  slug: 'mv-soap',
  description: 'Handcrafted green nutrient-rich soap with natural collagen. 100g.',
  descriptionJa: '天然コラーゲン配合の手作り石鹸。100g。毎日の洗浄に。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-SOP-100',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 12,
  images: ['/cdn/mv_soap.jpg'],
  galleryImages: [
    { url: '/cdn/mv_soap.jpg', alt: 'Mother Vegetable Soap 100g bar with natural green color and artisan finish' },
    { url: '/cdn/mv_soap.jpg', alt: 'Green nutrient soap creating a rich lather on hands during face wash' },
    { url: '/cdn/mv_soap.jpg', alt: 'Close-up of handcrafted soap bar showing marbled green plant-based ingredients' },
    { url: '/cdn/mv_soap.jpg', alt: 'Soap bar on a wooden dish with towels, bath accessories, and dried botanicals' },
    { url: '/cdn/mv_soap.jpg', alt: 'Clean refreshed skin with natural glow after washing with nutrient-rich soap' },
  ],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: [
    'Natural collagen formula for gentle, thorough cleansing.',
    'Natural plant-based deep cleanse for everyday use.',
  ],
  taglineJp: '',
  tagline: 'Confidence-powered natural soap.',
  subtitle: '100g',
  howToUse: 'Lather with water and massage onto face and body.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.35,
  proteinGrams: 0,
  chemicalReducedGrams: 32,
  mvtReward: 42,
};

// ---------------------------------------------------------------------------
// MV Miso (味噌)
// ---------------------------------------------------------------------------

const mvMiso: ProductData = {
  id: 'mv-miso-200g',
  name: 'マザベジ味噌',
  nameJa: 'マザベジ味噌',
  fullName: 'Mother Vegetable Miso',
  slug: 'mv-miso',
  description: 'Premium miso paste with 48 nutrients. 200g.',
  descriptionJa: '48種の栄養素配合のプレミアム味噌。200g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-MIS-200',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 8,
  images: ['https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich premium miso with 48 nutrients.', 'Traditional flavor enhanced with plant-based nutrition.'],
  taglineJp: '',
  tagline: 'Nutrient-rich premium miso.',
  subtitle: '200g',
  howToUse: 'Use as everyday miso for soup and cooking.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.45,
  proteinGrams: 4,
  chemicalReducedGrams: 16,
  mvtReward: 40,
};

// ---------------------------------------------------------------------------
// MV Wasabi (わさび)
// ---------------------------------------------------------------------------

const mvWasabi: ProductData = {
  id: 'mv-wasabi-50g',
  name: 'マザベジわさび',
  nameJa: 'マザベジわさび',
  fullName: 'Mother Vegetable Wasabi',
  slug: 'mv-wasabi',
  description: 'Premium wasabi paste with 48 nutrients. 50g.',
  descriptionJa: '48種の栄養素配合のプレミアムわさび。50g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-WAS-050',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 9,
  images: ['/cdn/mv_wasabi_detail.png'],
  galleryImages: [{ url: '/cdn/mv_wasabi_detail.png', alt: 'マザベジわさび' }],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich premium wasabi with 48 nutrients.', 'Fresh wasabi flavor with added health benefits.'],
  taglineJp: '',
  tagline: 'Nutrient-rich premium wasabi.',
  subtitle: '50g',
  howToUse: 'Use as condiment with sushi, sashimi, and other dishes.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.3,
  proteinGrams: 1,
  chemicalReducedGrams: 12,
  mvtReward: 30,
};

// ---------------------------------------------------------------------------
// MV Matcha Latte Mix (抹茶ラテミックス) - May
// ---------------------------------------------------------------------------

const mvMatchaLatte: ProductData = {
  id: 'mv-matcha-latte-30g',
  name: 'マザベジ抹茶ラテミックス',
  nameJa: 'マザベジ抹茶ラテミックス',
  fullName: 'Mother Vegetable Matcha Latte Mix',
  slug: 'mv-matcha-latte',
  description: 'Matcha latte mix blended with Mother Vegetable nutrients. 30g.',
  descriptionJa: 'マザベジ栄養素ブレンドの抹茶ラテミックス。30g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-MTL-030',
  category: 'food',
  tier: 'product100',
  subcategory: 'supplement',
  subscriptionMonth: 5,
  images: ['/cdn/mv_matcha_latte.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Matcha latte with 48 nutrients.', 'Creamy and nutritious daily drink.'],
  taglineJp: '',
  tagline: 'Nutrient-rich matcha latte mix.',
  subtitle: '30g',
  howToUse: 'Mix with hot milk or water for a nutrient-rich matcha latte.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.4,
  proteinGrams: 3,
  chemicalReducedGrams: 14,
  mvtReward: 36,
};

// ---------------------------------------------------------------------------
// MV Green Smoothie (グリーンスムージー) - May
// ---------------------------------------------------------------------------

const mvGreenSmoothie: ProductData = {
  id: 'mv-green-smoothie-30g',
  name: 'マザベジグリーンスムージー',
  nameJa: 'マザベジグリーンスムージー',
  fullName: 'Mother Vegetable Green Smoothie',
  slug: 'mv-green-smoothie',
  description: 'Green smoothie mix blended with Mother Vegetable nutrients. 30g.',
  descriptionJa: 'マザベジ栄養素ブレンドのグリーンスムージー。30g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-GSM-030',
  category: 'food',
  tier: 'product100',
  subcategory: 'supplement',
  subscriptionMonth: 5,
  images: ['/cdn/mv_green_smoothie.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Green smoothie with 48 nutrients.', 'Refreshing and nutritious daily drink.'],
  taglineJp: '',
  tagline: 'Nutrient-rich green smoothie.',
  subtitle: '30g',
  howToUse: 'Mix with water or milk for a nutrient-rich green smoothie.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.55,
  proteinGrams: 4,
  chemicalReducedGrams: 18,
  mvtReward: 45,
};

// ---------------------------------------------------------------------------
// MV Matcha (抹茶) - May
// ---------------------------------------------------------------------------

const mvMatcha: ProductData = {
  id: 'mv-matcha-30g',
  name: 'マザベジ抹茶',
  nameJa: 'マザベジ抹茶',
  fullName: 'Mother Vegetable Matcha',
  slug: 'mv-matcha',
  description: 'Premium matcha green tea powder blended with Mother Vegetable. 30g.',
  descriptionJa: 'マザベジブレンドの抹茶パウダー。30g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-MAT-030',
  category: 'food',
  tier: 'product100',
  subcategory: 'supplement',
  subscriptionMonth: 5,
  images: ['https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Premium matcha blended with 48 nutrients.', 'Antioxidant-rich daily wellness drink.'],
  taglineJp: '',
  tagline: 'Nutrient-rich matcha blend.',
  subtitle: '30g',
  howToUse: 'Mix with hot water or milk for a nutrient-rich matcha drink.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.5,
  proteinGrams: 3,
  chemicalReducedGrams: 15,
  mvtReward: 40,
};

// ---------------------------------------------------------------------------
// MV Olive Oil (オリーブオイル) - June
// ---------------------------------------------------------------------------

const mvOlive: ProductData = {
  id: 'mv-olive-100ml',
  name: 'マザベジオリーブオイル',
  nameJa: 'マザベジオリーブオイル',
  fullName: 'Mother Vegetable Olive Oil',
  slug: 'mv-olive',
  description: 'Extra virgin olive oil infused with Mother Vegetable nutrients. 100ml.',
  descriptionJa: 'マザベジ栄養素配合のエクストラバージンオリーブオイル。100ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-OLV-100',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 6,
  images: ['https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Premium olive oil with 48 nutrients.', 'Perfect for salads, cooking, and dipping.'],
  taglineJp: '',
  tagline: 'Nutrient-rich olive oil.',
  subtitle: '100ml',
  howToUse: 'Use as everyday cooking oil or salad dressing.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.45,
  proteinGrams: 2,
  chemicalReducedGrams: 18,
  mvtReward: 38,
};

// ---------------------------------------------------------------------------
// MV Dressing (ドレッシング) - June
// ---------------------------------------------------------------------------

const mvDressing: ProductData = {
  id: 'mv-dressing-150ml',
  name: 'マザベジドレッシング',
  nameJa: 'マザベジドレッシング',
  fullName: 'Mother Vegetable Dressing',
  slug: 'mv-dressing',
  description: 'Premium salad dressing with 48 nutrients. 150ml.',
  descriptionJa: '48種の栄養素配合のプレミアムドレッシング。150ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-DRS-150',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 6,
  images: ['https://images.unsplash.com/photo-1638324396082-69209f24abdc?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich premium dressing.', 'Perfect for salads and vegetables.'],
  taglineJp: '',
  tagline: 'Nutrient-rich dressing.',
  subtitle: '150ml',
  howToUse: 'Use as salad dressing or vegetable dip.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.4,
  proteinGrams: 2,
  chemicalReducedGrams: 14,
  mvtReward: 34,
};

// ---------------------------------------------------------------------------
// MV Herb Salt (ハーブソルト) - June
// ---------------------------------------------------------------------------

const mvHerbSalt: ProductData = {
  id: 'mv-herb-salt-50g',
  name: 'マザベジハーブソルト',
  nameJa: 'マザベジハーブソルト',
  fullName: 'Mother Vegetable Herb Salt',
  slug: 'mv-herb-salt',
  description: 'Herb-infused salt with 48 nutrients. 50g.',
  descriptionJa: '48種の栄養素配合のハーブソルト。50g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-HBS-050',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 6,
  images: ['/cdn/mv_herb_salt.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Herb salt with 48 nutrients.', 'Aromatic seasoning for everyday cooking.'],
  taglineJp: '',
  tagline: 'Nutrient-rich herb salt.',
  subtitle: '50g',
  howToUse: 'Use as seasoning for meat, fish, and vegetables.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.42,
  proteinGrams: 2,
  chemicalReducedGrams: 16,
  mvtReward: 36,
};

// ---------------------------------------------------------------------------
// MV Hand Cream (ハンドクリーム) - July
// ---------------------------------------------------------------------------

const mvHandCream: ProductData = {
  id: 'mv-handcream-30g',
  name: 'マザベジハンドクリーム',
  nameJa: 'マザベジハンドクリーム',
  fullName: 'Mother Vegetable Hand Cream',
  slug: 'mv-handcream',
  description: 'Moisturizing hand cream with natural collagen. 30g.',
  descriptionJa: '天然コラーゲン配合のハンドクリーム。30g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-HCR-030',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 7,
  images: ['https://images.unsplash.com/photo-1741896136021-ae070f0b6f24?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Natural collagen hand cream.', 'Keeps hands soft and moisturized.'],
  taglineJp: '',
  tagline: 'Natural collagen hand cream.',
  subtitle: '30g',
  howToUse: 'Apply to hands as needed throughout the day.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.2,
  proteinGrams: 0,
  chemicalReducedGrams: 26,
  mvtReward: 34,
};

// ---------------------------------------------------------------------------
// MV Suncare Gel (サンケアジェル) - July
// ---------------------------------------------------------------------------

const mvSuncare: ProductData = {
  id: 'mv-suncare-30g',
  name: 'マザベジサンケアジェル',
  nameJa: 'マザベジサンケアジェル',
  fullName: 'Mother Vegetable Suncare Gel',
  slug: 'mv-suncare',
  description: 'Natural suncare gel with plant-based nutrients. 30g.',
  descriptionJa: '天然植物由来成分配合のサンケアジェル。30g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-SUN-030',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 7,
  images: ['https://images.unsplash.com/photo-1662729182165-3612bfed89f4?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Natural suncare with plant-based nutrients.', 'Gentle protection for daily use.'],
  taglineJp: '',
  tagline: 'Nutrient-rich suncare gel.',
  subtitle: '30g',
  howToUse: 'Apply to exposed skin before going outdoors.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.18,
  proteinGrams: 0,
  chemicalReducedGrams: 30,
  mvtReward: 32,
};

// ---------------------------------------------------------------------------
// MV Body Mist (ボディミスト) - July
// ---------------------------------------------------------------------------

const mvBodyMist: ProductData = {
  id: 'mv-body-mist-50ml',
  name: 'マザベジボディミスト',
  nameJa: 'マザベジボディミスト',
  fullName: 'Mother Vegetable Body Mist',
  slug: 'mv-body-mist',
  description: 'Refreshing body mist with natural nutrients. 50ml.',
  descriptionJa: '天然栄養素配合のボディミスト。50ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-BMT-050',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 11,
  images: ['https://images.unsplash.com/photo-1604903614277-fb7e5f6dfce4?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Refreshing body mist with natural nutrients.', 'Light fragrance for everyday freshness.'],
  taglineJp: '',
  tagline: 'Nutrient-rich body mist.',
  subtitle: '50ml',
  howToUse: 'Spray lightly on body after bath or throughout the day.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.22,
  proteinGrams: 0,
  chemicalReducedGrams: 24,
  mvtReward: 32,
};

// ---------------------------------------------------------------------------
// MV Ponzu (ポン酢) - August
// ---------------------------------------------------------------------------

const mvPonzu: ProductData = {
  id: 'mv-ponzu-150ml',
  name: 'マザベジポン酢',
  nameJa: 'マザベジポン酢',
  fullName: 'Mother Vegetable Ponzu',
  slug: 'mv-ponzu',
  description: 'Citrus ponzu sauce with 48 nutrients. 150ml.',
  descriptionJa: '48種の栄養素配合のポン酢。150ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-PON-150',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 8,
  images: ['/cdn/mv_ponzu_detail.png'],
  galleryImages: [{ url: '/cdn/mv_ponzu_detail.png', alt: 'マザベジポン酢' }],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich citrus ponzu.', 'Perfect for nabe, salad, and grilled dishes.'],
  taglineJp: '',
  tagline: 'Nutrient-rich ponzu sauce.',
  subtitle: '150ml',
  howToUse: 'Use as dipping sauce or dressing.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.38,
  proteinGrams: 2,
  chemicalReducedGrams: 16,
  mvtReward: 36,
};

// ---------------------------------------------------------------------------
// MV Tsuyu (めんつゆ) - August
// ---------------------------------------------------------------------------

const mvTsuyu: ProductData = {
  id: 'mv-tsuyu-150ml',
  name: 'マザベジめんつゆ',
  nameJa: 'マザベジめんつゆ',
  fullName: 'Mother Vegetable Tsuyu',
  slug: 'mv-tsuyu',
  description: 'Premium noodle dipping sauce with 48 nutrients. 150ml.',
  descriptionJa: '48種の栄養素配合のめんつゆ。150ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-TSU-150',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 8,
  images: ['/cdn/mv_tsuyu.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich noodle dipping sauce.', 'Perfect for somen, soba, and udon.'],
  taglineJp: '',
  tagline: 'Nutrient-rich tsuyu sauce.',
  subtitle: '150ml',
  howToUse: 'Use as dipping sauce for noodles or seasoning for dishes.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.32,
  proteinGrams: 3,
  chemicalReducedGrams: 14,
  mvtReward: 34,
};

// ---------------------------------------------------------------------------
// MV Furikake (ふりかけ) - August
// ---------------------------------------------------------------------------

const mvFurikake: ProductData = {
  id: 'mv-furikake-30g',
  name: 'マザベジふりかけ',
  nameJa: 'マザベジふりかけ',
  fullName: 'Mother Vegetable Furikake',
  slug: 'mv-furikake',
  description: 'Rice seasoning with 48 nutrients. 30g.',
  descriptionJa: '48種の栄養素配合のふりかけ。30g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-FRK-030',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 8,
  images: ['/cdn/mv_furikake.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich rice seasoning.', 'Add nutrition to every bowl of rice.'],
  taglineJp: '',
  tagline: 'Nutrient-rich furikake.',
  subtitle: '30g',
  howToUse: 'Sprinkle over rice, onigiri, or bento.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.28,
  proteinGrams: 2,
  chemicalReducedGrams: 12,
  mvtReward: 30,
};

// ---------------------------------------------------------------------------
// MV Lip Balm (リップバーム) - September
// ---------------------------------------------------------------------------

const mvLipBalm: ProductData = {
  id: 'mv-lipbalm-5g',
  name: 'マザベジリップバーム',
  nameJa: 'マザベジリップバーム',
  fullName: 'Mother Vegetable Lip Balm',
  slug: 'mv-lipbalm',
  description: 'Natural collagen lip balm. 5g.',
  descriptionJa: '天然コラーゲン配合のリップバーム。5g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-LIP-005',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 9,
  images: ['/cdn/mv_lipbalm_detail.png'],
  galleryImages: [{ url: '/cdn/mv_lipbalm_detail.png', alt: 'マザベジリップバーム' }],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Natural collagen lip balm.', 'Keeps lips soft and moisturized.'],
  taglineJp: '',
  tagline: 'Natural collagen lip care.',
  subtitle: '5g',
  howToUse: 'Apply to lips as needed.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.15,
  proteinGrams: 0,
  chemicalReducedGrams: 18,
  mvtReward: 28,
};

// ---------------------------------------------------------------------------
// MV Face Mist (フェイスミスト) - September
// ---------------------------------------------------------------------------

const mvFaceMist: ProductData = {
  id: 'mv-face-mist-50ml',
  name: 'マザベジフェイスミスト',
  nameJa: 'マザベジフェイスミスト',
  fullName: 'Mother Vegetable Face Mist',
  slug: 'mv-face-mist',
  description: 'Refreshing face mist with natural collagen. 50ml.',
  descriptionJa: '天然コラーゲン配合のフェイスミスト。50ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-FCM-050',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 9,
  images: ['/cdn/mv_face_mist_detail.png'],
  galleryImages: [{ url: '/cdn/mv_face_mist_detail.png', alt: 'マザベジフェイスミスト' }],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Natural collagen face mist.', 'Refreshing hydration throughout the day.'],
  taglineJp: '',
  tagline: 'Nutrient-rich face mist.',
  subtitle: '50ml',
  howToUse: 'Spray lightly on face for instant hydration.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.2,
  proteinGrams: 0,
  chemicalReducedGrams: 22,
  mvtReward: 32,
};

// ---------------------------------------------------------------------------
// MV Hair Oil (ヘアオイル) - September
// ---------------------------------------------------------------------------

const mvHairOil: ProductData = {
  id: 'mv-hair-oil-30ml',
  name: 'マザベジヘアオイル',
  nameJa: 'マザベジヘアオイル',
  fullName: 'Mother Vegetable Hair Oil',
  slug: 'mv-hair-oil',
  description: 'Natural hair oil with plant-based nutrients. 30ml.',
  descriptionJa: '天然植物由来成分配合のヘアオイル。30ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-HRO-030',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 10,
  images: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Natural hair oil with plant-based nutrients.', 'Keeps hair smooth and nourished.'],
  taglineJp: '',
  tagline: 'Nutrient-rich hair oil.',
  subtitle: '30ml',
  howToUse: 'Apply a small amount to damp or dry hair.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.22,
  proteinGrams: 0,
  chemicalReducedGrams: 24,
  mvtReward: 32,
};

// ---------------------------------------------------------------------------
// MV Vinegar (酢) - October
// ---------------------------------------------------------------------------

const mvVinegar: ProductData = {
  id: 'mv-vinegar-150ml',
  name: 'マザベジ酢',
  nameJa: 'マザベジ酢',
  fullName: 'Mother Vegetable Vinegar',
  slug: 'mv-vinegar',
  description: 'Premium rice vinegar with 48 nutrients. 150ml.',
  descriptionJa: '48種の栄養素配合のプレミアム酢。150ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-VIN-150',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 10,
  images: ['https://images.unsplash.com/photo-1595706334573-09ea13ed4d04?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich premium vinegar.', 'Versatile for cooking and health drinks.'],
  taglineJp: '',
  tagline: 'Nutrient-rich rice vinegar.',
  subtitle: '150ml',
  howToUse: 'Use in cooking, dressings, or dilute with water as a health drink.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.36,
  proteinGrams: 1,
  chemicalReducedGrams: 15,
  mvtReward: 34,
};

// ---------------------------------------------------------------------------
// MV Yuzu Ponzu (ゆずポン酢) - October
// ---------------------------------------------------------------------------

const mvPonzuYuzu: ProductData = {
  id: 'mv-ponzu-yuzu-150ml',
  name: 'マザベジゆずポン酢',
  nameJa: 'マザベジゆずポン酢',
  fullName: 'Mother Vegetable Yuzu Ponzu',
  slug: 'mv-ponzu-yuzu',
  description: 'Yuzu citrus ponzu sauce with 48 nutrients. 150ml.',
  descriptionJa: '48種の栄養素配合のゆずポン酢。150ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-YPZ-150',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 10,
  images: ['/cdn/mv_ponzu_yuzu.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Yuzu-flavored ponzu with 48 nutrients.', 'Refreshing citrus taste for any dish.'],
  taglineJp: '',
  tagline: 'Nutrient-rich yuzu ponzu.',
  subtitle: '150ml',
  howToUse: 'Use as dipping sauce or dressing.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.34,
  proteinGrams: 1,
  chemicalReducedGrams: 14,
  mvtReward: 33,
};

// ---------------------------------------------------------------------------
// MV Cooking Sake (料理酒) - October
// ---------------------------------------------------------------------------

const mvCookingSake: ProductData = {
  id: 'mv-cooking-sake-150ml',
  name: 'マザベジ料理酒',
  nameJa: 'マザベジ料理酒',
  fullName: 'Mother Vegetable Cooking Sake',
  slug: 'mv-cooking-sake',
  description: 'Premium cooking sake with 48 nutrients. 150ml.',
  descriptionJa: '48種の栄養素配合の料理酒。150ml。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-CSK-150',
  category: 'food',
  tier: 'product100',
  subcategory: 'seasoning',
  subscriptionMonth: 10,
  images: ['/cdn/mv_cooking_sake.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich cooking sake.', 'Enhances flavor while adding 48 nutrients.'],
  taglineJp: '',
  tagline: 'Nutrient-rich cooking sake.',
  subtitle: '150ml',
  howToUse: 'Use in everyday Japanese cooking.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.3,
  proteinGrams: 1,
  chemicalReducedGrams: 14,
  mvtReward: 32,
};

// ---------------------------------------------------------------------------
// MV Bath Salt (バスソルト) - November
// ---------------------------------------------------------------------------

const mvBathSalt: ProductData = {
  id: 'mv-bathsalt-200g',
  name: 'マザベジバスソルト',
  nameJa: 'マザベジバスソルト',
  fullName: 'Mother Vegetable Bath Salt',
  slug: 'mv-bathsalt',
  description: 'Mineral-rich bath salt with 48 nutrients. 200g.',
  descriptionJa: '48種の栄養素配合のバスソルト。200g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-BST-200',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 11,
  images: ['/cdn/mv_bathsalt_detail.png'],
  galleryImages: [{ url: '/cdn/mv_bathsalt_detail.png', alt: 'マザベジバスソルト' }],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich mineral bath salt.', 'Relaxing bath experience with 48 nutrients.'],
  taglineJp: '',
  tagline: 'Nutrient-rich bath salt.',
  subtitle: '200g',
  howToUse: 'Add to bath water and enjoy a relaxing soak.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.25,
  proteinGrams: 0,
  chemicalReducedGrams: 28,
  mvtReward: 34,
};

// ---------------------------------------------------------------------------
// MV Bath Bomb (バスボム) - November
// ---------------------------------------------------------------------------

const mvBathBomb: ProductData = {
  id: 'mv-bath-bomb-3pcs',
  name: 'マザベジバスボム',
  nameJa: 'マザベジバスボム',
  fullName: 'Mother Vegetable Bath Bomb',
  slug: 'mv-bath-bomb',
  description: 'Nutrient-rich bath bombs. 3 pieces.',
  descriptionJa: '栄養素配合のバスボム。3個入。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-BBM-003',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 11,
  images: ['/cdn/mv_bath_bomb.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Nutrient-rich bath bombs for relaxation.', 'Fizzy and aromatic bath experience.'],
  taglineJp: '',
  tagline: 'Nutrient-rich bath bombs.',
  subtitle: '3個入',
  howToUse: 'Drop one bomb into warm bath water.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.2,
  proteinGrams: 0,
  chemicalReducedGrams: 32,
  mvtReward: 32,
};

// ---------------------------------------------------------------------------
// MV Body Cream (ボディクリーム) - November
// ---------------------------------------------------------------------------

const mvBodyCream: ProductData = {
  id: 'mv-body-cream-50g',
  name: 'マザベジボディクリーム',
  nameJa: 'マザベジボディクリーム',
  fullName: 'Mother Vegetable Body Cream',
  slug: 'mv-body-cream',
  description: 'Rich body cream with natural collagen. 50g.',
  descriptionJa: '天然コラーゲン配合のボディクリーム。50g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-BCR-050',
  category: 'cosmetic',
  tier: 'product100',
  subcategory: 'cosmetic',
  subscriptionMonth: 11,
  images: ['/cdn/mv_body_cream.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Natural collagen body cream.', 'Deep moisture for smooth and healthy skin.'],
  taglineJp: '',
  tagline: 'Nutrient-rich body cream.',
  subtitle: '50g',
  howToUse: 'Apply to body after bath for deep moisturizing.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.22,
  proteinGrams: 0,
  chemicalReducedGrams: 30,
  mvtReward: 32,
};

// ---------------------------------------------------------------------------
// MV Honey (蜂蜜) - December
// ---------------------------------------------------------------------------

const mvHoney: ProductData = {
  id: 'mv-honey-100g',
  name: 'マザベジ蜂蜜',
  nameJa: 'マザベジ蜂蜜',
  fullName: 'Mother Vegetable Honey',
  slug: 'mv-honey',
  description: 'Pure honey blended with Mother Vegetable nutrients. 100g.',
  descriptionJa: 'マザベジ栄養素ブレンドの蜂蜜。100g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-HNY-100',
  category: 'food',
  tier: 'product100',
  subcategory: 'supplement',
  subscriptionMonth: 12,
  images: ['https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Premium honey with 48 nutrients.', 'Perfect for drinks, toast, and cooking.'],
  taglineJp: '',
  tagline: 'Nutrient-rich honey.',
  subtitle: '100g',
  howToUse: 'Add to drinks, spread on toast, or use in cooking.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.38,
  proteinGrams: 1,
  chemicalReducedGrams: 10,
  mvtReward: 34,
};

// ---------------------------------------------------------------------------
// MV Ginger Tea (生姜茶) - December
// ---------------------------------------------------------------------------

const mvGingerTea: ProductData = {
  id: 'mv-ginger-tea-30g',
  name: 'マザベジ生姜茶',
  nameJa: 'マザベジ生姜茶',
  fullName: 'Mother Vegetable Ginger Tea',
  slug: 'mv-ginger-tea',
  description: 'Warming ginger tea blended with Mother Vegetable nutrients. 30g.',
  descriptionJa: 'マザベジ栄養素ブレンドの生姜茶。30g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-GGT-030',
  category: 'food',
  tier: 'product100',
  subcategory: 'supplement',
  subscriptionMonth: 12,
  images: ['https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Warming ginger tea with 48 nutrients.', 'Perfect winter wellness drink.'],
  taglineJp: '',
  tagline: 'Nutrient-rich ginger tea.',
  subtitle: '30g',
  howToUse: 'Mix with hot water for a warming nutrient-rich ginger tea.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.32,
  proteinGrams: 2,
  chemicalReducedGrams: 12,
  mvtReward: 32,
};

// ---------------------------------------------------------------------------
// MV Manuka Blend (マヌカブレンド) - December
// ---------------------------------------------------------------------------

const mvManuka: ProductData = {
  id: 'mv-manuka-50g',
  name: 'マザベジマヌカブレンド',
  nameJa: 'マザベジマヌカブレンド',
  fullName: 'Mother Vegetable Manuka Blend',
  slug: 'mv-manuka',
  description: 'Manuka honey blend with Mother Vegetable nutrients. 50g.',
  descriptionJa: 'マザベジ栄養素ブレンドのマヌカハニー。50g。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-MNK-050',
  category: 'food',
  tier: 'product100',
  subcategory: 'supplement',
  subscriptionMonth: 12,
  images: ['/cdn/mv_manuka.jpg'],
  galleryImages: [],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['Manuka honey blend with 48 nutrients.', 'Premium wellness supplement.'],
  taglineJp: '',
  tagline: 'Nutrient-rich manuka blend.',
  subtitle: '50g',
  howToUse: 'Take directly or add to drinks and food.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
  co2SavedKg: 0.45,
  proteinGrams: 2,
  chemicalReducedGrams: 16,
  mvtReward: 40,
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** Active products shown on the site. */
export const products: ProductData[] = [achieve, confidence, tilapia, mvSalt, mvSoySauce, mvToner, mvBalm, mvSoap, mvMiso, mvWasabi, mvMatcha, mvDressing, mvOlive, mvSuncare, mvBodyMist, mvHandCream, mvPonzu, mvFaceMist, mvHairOil, mvLipBalm, mvVinegar, mvBathSalt, mvGingerTea, mvHoney];

/** All products including discontinued, for admin/order lookup. */
export const allProducts: ProductData[] = [achieve, confidence, tilapia, mvSalt, mvSoySauce, mvToner, mvBalm, mvSoap, mvMiso, mvWasabi, mvMatcha, mvDressing, mvOlive, mvSuncare, mvBodyMist, mvHandCream, mvPonzu, mvFaceMist, mvHairOil, mvLipBalm, mvVinegar, mvBathSalt, mvGingerTea, mvHoney];

export function getProductBySlug(slug: string): ProductData | undefined {
  return allProducts.find((p) => p.slug === slug);
}
