const CDN_BASE =
  "https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MixItem {
  label: string;
  image: string;
}

export interface ProductData {
  id: string;
  name: string;
  fullName: string;
  slug: string;
  description: string;
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
  fullName: "Mother Vegetable Achieve",
  slug: "achieve",
  description:
    "48 different nutrients at once. Supports a healthy gut, regeneration of cells throughout the body.",
  price: 150.0,
  currency: "USD",
  sku: "MV-ACH-030",
  category: "food",
  images: ["/cdn/products_achieve_10001.png"],
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
  fullName: "Mother Vegetable Confidence",
  slug: "confidence",
  description:
    "Skin Healing Effect. Powerful anti-aging benefits.",
  price: 180.0,
  currency: "USD",
  sku: "MV-CON-030",
  category: "cosmetic",
  images: ["/cdn/products_confidence_10001.png"],
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
// Forever
// ---------------------------------------------------------------------------

const forever: ProductData = {
  id: "forever-capsule-30",
  name: "Forever",
  fullName: "Mother Vegetable Forever",
  slug: "forever",
  description: "Extend your pet's healthy life.",
  price: 120.0,
  currency: "USD",
  sku: "MV-FOR-030",
  category: "pet",
  images: ["/cdn/products_forever_10001.png"],
  thumbnails: thumbnails("products_forever", 10002, 10010),
  videoUrls: videoRange("forever", 4),
  mainVideoUrl: `${CDN_BASE}/products/forever/forever_video_1.mp4`,
  benefits: [
    "Extend your pet's healthy life with 48 different nutrients.",
    "Supports digestion, coat health, and overall vitality for your pet.",
  ],
  taglineJp: "",
  tagline: "to extend your pet's healthy life.",
  subtitle: "for Pet",
  howToUse:
    "Simply mix one stick into your pet's food.",
  howToLink: "/forever-howto",
  inStock: true,
  petItems: [
    {
      label: "Dog Treats",
      image: "/Images/Assets/forever/mazekomu/dogTreats.png",
    },
    {
      label: "Dog Water",
      image: "/Images/Assets/forever/mazekomu/dogWater.png",
    },
    {
      label: "Cat Treats",
      image: "/Images/Assets/forever/mazekomu/catTreats.png",
    },
    {
      label: "Cat Water",
      image: "/Images/Assets/forever/mazekomu/catWater.png",
    },
    {
      label: "Dry Food",
      image: "/Images/Assets/forever/mazekomu/dryFood.png",
    },
    {
      label: "Wet Food",
      image: "/Images/Assets/forever/mazekomu/wetFood.png",
    },
  ],
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** Active products shown on the site (Forever removed from catalog). */
export const products: ProductData[] = [achieve, confidence];

/** All products including discontinued, for admin/order lookup. */
export const allProducts: ProductData[] = [achieve, confidence, forever];

export function getProductBySlug(slug: string): ProductData | undefined {
  return allProducts.find((p) => p.slug === slug);
}
