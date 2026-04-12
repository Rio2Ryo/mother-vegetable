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
  // category-specific mix-in items
  drinkItems?: MixItem[];
  foodItems?: MixItem[];
  cosmeticItems?: MixItem[];
  petItems?: MixItem[];
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
    "Skin Healing Effect. Powerful anti-aging benefits.",
  descriptionJa: "肌の修復効果。強力なアンチエイジング効果。",
  price: 36.70,
  currency: "USD",
  sku: "MV-CON-030",
  category: "cosmetic",
  images: ["/cdn/products_confidence_10001.png"],
  galleryImages: [
    { url: "/cdn/products_confidence_10001.png", alt: "Confidence skincare tube packaging with sleek green and white design" },
    { url: "/cdn/products_confidence_10001.png", alt: "Confidence cream being gently applied to facial skin for anti-aging care" },
    { url: "/cdn/products_confidence_10001.png", alt: "Close-up of Confidence gel texture showing smooth collagen-rich formula" },
    { url: "/cdn/products_confidence_10001.png", alt: "Confidence tube displayed with natural botanical ingredients and cosmetic tools" },
    { url: "/cdn/products_confidence_10001.png", alt: "Radiant glowing skin after consistent use of Confidence skincare treatment" },
  ],
  thumbnails: thumbnails("products_confidence", 10002, 10010),
  videoUrls: videoRange("confidence", 4),
  mainVideoUrl: `${CDN_BASE}/products/confidence/confidence_video_1.mp4`,
  benefits: [
    "Skin Healing Effect. Powerful anti-aging benefits.",
    "Helps improve skin texture, reduce wrinkles, and restore radiance.",
  ],
  taglineJp: "",
  tagline: "Skin Healing Effect",
  subtitle: "For All Skin",
  howToUse:
    "Apply directly or mix into your current cosmetics.",
  howToLink: "/confidence-howto",
  inStock: true,
  priceJpy: '¥5,500',
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
  name: 'マザベジフィッシュ-イズミ鯛',
  nameJa: 'マザベジフィッシュ-イズミ鯛',
  fullName: 'Mother Vegetable Fish - Izumi Tai',
  slug: 'tilapia',
  description: 'Fresh Izumi Tai enriched with 48 natural nutrients for a healthy lifestyle.',
  descriptionJa: '48種の天然栄養素で育てた新鮮なイズミ鯛。健康的な食生活に。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-TIL-001',
  category: 'food',
  images: ['/cdn/mv_tilapia.jpg'],
  galleryImages: [
    { url: '/cdn/mv_tilapia.jpg', alt: 'Mother Vegetable Izumi Tai fish product in premium packaging' },
    { url: '/cdn/mv_tilapia.jpg', alt: 'Izumi Tai fillet being prepared as a grilled dish with vegetables' },
    { url: '/cdn/mv_tilapia.jpg', alt: 'Close-up of fresh Izumi Tai flesh showing firm texture and natural color' },
    { url: '/cdn/mv_tilapia.jpg', alt: 'Izumi Tai served on a plate with rice, miso soup, and seasonal sides' },
    { url: '/cdn/mv_tilapia.jpg', alt: 'Nutrient-enriched Izumi Tai providing 48 essential vitamins and minerals' },
  ],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: ['48 different nutrients from Izumi Tai and plant-based nutrition.', 'High protein, omega-3 fatty acids, and essential minerals.'],
  taglineJp: '',
  tagline: 'Fresh nutrient-rich Izumi Tai.',
  subtitle: 'for Body',
  howToUse: 'Cook and enjoy as part of your daily meal.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
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
  description: 'Nutrient-infused facial toner with Confidence collagen. 150ml. Skin healing and anti-aging.',
  descriptionJa: 'Confidenceコラーゲン配合の化粧水。150ml。肌の修復とエイジングケア。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-TON-150',
  category: 'cosmetic',
  images: ['/cdn/mv_toner.jpg'],
  galleryImages: [
    { url: '/cdn/mv_toner.jpg', alt: 'Mother Vegetable Toner 150ml bottle with elegant green-tinted formula' },
    { url: '/cdn/mv_toner.jpg', alt: 'Toner being applied to face with cotton pad for morning skincare routine' },
    { url: '/cdn/mv_toner.jpg', alt: 'Close-up of toner liquid showing translucent plant-based nutrient infusion' },
    { url: '/cdn/mv_toner.jpg', alt: 'Toner bottle arranged with serum, moisturizer, and natural botanical decor' },
    { url: '/cdn/mv_toner.jpg', alt: 'Hydrated and youthful skin demonstrating anti-aging toner benefits' },
  ],
  thumbnails: [],
  videoUrls: [],
  mainVideoUrl: '',
  benefits: [
    'Skin Healing Effect — Confidence collagen repairs and restores skin.',
    'Deeply hydrates and reduces wrinkles with plant-based nutrients.',
  ],
  taglineJp: '',
  tagline: 'Confidence-powered skin toner.',
  subtitle: '150ml',
  howToUse: 'Apply to cleansed face and neck morning and evening.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
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
  description: 'Luxury nutrient-rich balm with Confidence collagen. 50g. Multi-purpose skin healing.',
  descriptionJa: 'Confidenceコラーゲン配合のラグジュアリーバウム。50g。マルチユーススキンケア。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-BAL-050',
  category: 'cosmetic',
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
    'Skin Healing Effect — Confidence collagen for intensive skin repair.',
    'Multi-use luxury balm for face, lips, and body.',
  ],
  taglineJp: '',
  tagline: 'Confidence-powered luxury balm.',
  subtitle: '50g',
  howToUse: 'Apply a small amount to dry areas of skin as needed.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
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
  description: 'Handcrafted green nutrient-rich soap with Confidence collagen. 100g. Deep cleansing with skin care.',
  descriptionJa: 'Confidenceコラーゲン配合の手作り石鹸。100g。洗浄しながらスキンケア。',
  price: 13.50,
  currency: 'USD',
  sku: 'MV-SOP-100',
  category: 'cosmetic',
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
    'Skin Healing Effect — Confidence collagen cleanses while healing skin.',
    'Natural plant-based deep cleanse with anti-aging benefits.',
  ],
  taglineJp: '',
  tagline: 'Confidence-powered natural soap.',
  subtitle: '100g',
  howToUse: 'Lather with water and massage onto face and body.',
  howToLink: '#',
  inStock: true,
  priceJpy: '¥2,000',
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** Active products shown on the site. */
export const products: ProductData[] = [achieve, confidence, tilapia, mvSalt, mvSoySauce, mvToner, mvBalm, mvSoap];

/** All products including discontinued, for admin/order lookup. */
export const allProducts: ProductData[] = [achieve, confidence, tilapia, mvSalt, mvSoySauce, mvToner, mvBalm, mvSoap];

export function getProductBySlug(slug: string): ProductData | undefined {
  return allProducts.find((p) => p.slug === slug);
}
