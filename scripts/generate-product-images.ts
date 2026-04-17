/**
 * generate-product-images.ts
 *
 * Outputs image-generation prompts for every Mother Vegetable product.
 * Each product gets 5 prompts covering different angles / uses.
 *
 * Usage:
 *   npx tsx scripts/generate-product-images.ts
 *
 * IMPORTANT: Prompts intentionally avoid restricted ingredient names.
 * Use "green superfood", "plant-based supplement", "natural nutrients", etc.
 */

interface ProductPrompts {
  slug: string;
  name: string;
  prompts: { label: string; prompt: string }[];
}

const productPrompts: ProductPrompts[] = [
  // -----------------------------------------------------------------------
  // Achieve
  // -----------------------------------------------------------------------
  {
    slug: "achieve",
    name: "Achieve",
    prompts: [
      {
        label: "Packaging shot",
        prompt:
          "Premium green superfood supplement in sleek black and green packaging, 30 individual stick packets arranged elegantly on a dark marble surface, soft studio lighting, product photography, 4k",
      },
      {
        label: "Lifestyle / in-use shot",
        prompt:
          "Person pouring a green plant-based supplement stick into a glass of sparkling water at a modern kitchen counter, morning sunlight streaming through window, healthy lifestyle photography, 4k",
      },
      {
        label: "Texture / ingredients close-up",
        prompt:
          "Extreme close-up of fine green superfood powder spilling from a stick packet onto a white ceramic spoon, showing vibrant natural green color and fine texture, macro photography, 4k",
      },
      {
        label: "Complementary items",
        prompt:
          "Green superfood supplement packet surrounded by colorful fresh fruits, a smoothie bowl, yogurt, and a glass of juice on a bright clean table, flat lay food photography, 4k",
      },
      {
        label: "Benefit visualization",
        prompt:
          "Active energetic person stretching outdoors at sunrise, glowing with health, subtle green energy aura effect, representing gut health and cellular vitality, wellness photography, 4k",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Confidence
  // -----------------------------------------------------------------------
  {
    slug: "confidence",
    name: "Confidence",
    prompts: [
      {
        label: "Packaging shot",
        prompt:
          "Luxury skincare tube with green and white minimalist design on a stone slab, soft diffused lighting, premium beauty product photography, 4k",
      },
      {
        label: "Lifestyle / in-use shot",
        prompt:
          "Woman gently applying a green-tinted collagen cream to her cheek in front of a vanity mirror, soft golden light, beauty editorial photography, 4k",
      },
      {
        label: "Texture / ingredients close-up",
        prompt:
          "Macro shot of smooth green gel-cream texture swirled on frosted glass, showing rich collagen-infused formula, beauty product macro photography, 4k",
      },
      {
        label: "Complementary items",
        prompt:
          "Skincare tube arranged with jade roller, botanical leaves, cotton pads, and a small white ceramic tray, spa flat lay photography, 4k",
      },
      {
        label: "Benefit visualization",
        prompt:
          "Close-up portrait of radiant glowing skin, dewy and smooth complexion, soft ring light, beauty portrait showing healthy skin, 4k",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // Tilapia (Izumi Tai)
  // -----------------------------------------------------------------------
  {
    slug: "tilapia",
    name: "Izumi Tai Fish",
    prompts: [
      {
        label: "Packaging shot",
        prompt:
          "Fresh whole Izumi Tai fish on premium black tray with Mother Vegetable branding label, ice crystals, dark background, seafood product photography, 4k",
      },
      {
        label: "Lifestyle / in-use shot",
        prompt:
          "Chef grilling a nutrient-enriched Izumi Tai fillet on a hot iron plate with herbs and lemon, restaurant kitchen, food action photography, 4k",
      },
      {
        label: "Texture / ingredients close-up",
        prompt:
          "Close-up of fresh Izumi Tai fillet cross-section showing firm white flesh with subtle natural coloring, on a wooden cutting board, food macro, 4k",
      },
      {
        label: "Complementary items",
        prompt:
          "Beautifully plated grilled Izumi Tai with steamed rice, miso soup, pickled vegetables, and chopsticks on a traditional Japanese table, food photography, 4k",
      },
      {
        label: "Benefit visualization",
        prompt:
          "Infographic-style photo of Izumi Tai surrounded by floating icons of vitamins, omega-3, protein, and 48 essential nutrients, clean design, 4k",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // MV Salt
  // -----------------------------------------------------------------------
  {
    slug: "mv-salt",
    name: "Mother Vegetable Salt",
    prompts: [
      {
        label: "Packaging shot",
        prompt:
          "Small glass jar of green mineral-rich salt with cork lid, Mother Vegetable label, on a rustic wooden surface, warm studio lighting, gourmet product photography, 4k",
      },
      {
        label: "Lifestyle / in-use shot",
        prompt:
          "Fingers pinching green nutrient-infused salt and sprinkling it over a sizzling steak on a cast iron pan, action cooking photography, 4k",
      },
      {
        label: "Texture / ingredients close-up",
        prompt:
          "Extreme macro of green salt crystals on a black slate, showing natural mineral coloring and crystal structure, food macro photography, 4k",
      },
      {
        label: "Complementary items",
        prompt:
          "Green salt jar arranged with a pepper mill, olive oil bottle, fresh herbs, garlic, and a mortar and pestle, kitchen flat lay, 4k",
      },
      {
        label: "Benefit visualization",
        prompt:
          "Split comparison: regular white salt vs green nutrient salt with illustrated nutrient labels floating around the green salt, clean infographic style, 4k",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // MV Soy Sauce
  // -----------------------------------------------------------------------
  {
    slug: "mv-soy-sauce",
    name: "Mother Vegetable Soy Sauce",
    prompts: [
      {
        label: "Packaging shot",
        prompt:
          "Elegant dark glass bottle of nutrient-infused soy sauce with green accent label, 150ml, on a dark wooden surface with subtle green reflections, product photography, 4k",
      },
      {
        label: "Lifestyle / in-use shot",
        prompt:
          "Dark rich soy sauce being poured from a bottle onto a plate of fresh sashimi, droplets caught mid-air, Japanese cuisine photography, 4k",
      },
      {
        label: "Texture / ingredients close-up",
        prompt:
          "Close-up of dark umami soy sauce pooled in a small ceramic dish, showing deep amber-brown color with green nutrient tint, food macro, 4k",
      },
      {
        label: "Complementary items",
        prompt:
          "Soy sauce bottle beside a sushi platter, wasabi, pickled ginger, tofu cubes, and bamboo chopsticks on a slate board, food styling, 4k",
      },
      {
        label: "Benefit visualization",
        prompt:
          "Artistic pour of dark soy sauce forming a wave shape with floating vitamin and mineral icons, representing 48 natural nutrients, creative food photography, 4k",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // MV Toner
  // -----------------------------------------------------------------------
  {
    slug: "mv-toner",
    name: "Mother Vegetable Toner",
    prompts: [
      {
        label: "Packaging shot",
        prompt:
          "Frosted glass bottle of green-tinted facial toner, 150ml, minimalist white and green label, on a marble vanity with soft backlight, beauty product photography, 4k",
      },
      {
        label: "Lifestyle / in-use shot",
        prompt:
          "Woman pressing a cotton pad soaked with green plant-based toner against her cheek, bathroom mirror reflection, morning skincare routine, 4k",
      },
      {
        label: "Texture / ingredients close-up",
        prompt:
          "Toner liquid being poured in slow motion, translucent green-tinted formula catching light, showing pure plant-based nutrient content, beauty macro, 4k",
      },
      {
        label: "Complementary items",
        prompt:
          "Toner bottle on a vanity tray with a serum dropper, moisturizer jar, cotton rounds, and small potted succulent, beauty shelfie photography, 4k",
      },
      {
        label: "Benefit visualization",
        prompt:
          "Before-and-after style split portrait: dull dry skin on left, hydrated luminous glowing skin on right, soft even lighting, skincare results photography, 4k",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // MV Balm
  // -----------------------------------------------------------------------
  {
    slug: "mv-balm",
    name: "Mother Vegetable Balm",
    prompts: [
      {
        label: "Packaging shot",
        prompt:
          "Premium round tin of green-tinted luxury balm, 50g, gold and green lid design, on dark velvet surface, luxury beauty product photography, 4k",
      },
      {
        label: "Lifestyle / in-use shot",
        prompt:
          "Fingertip scooping a small amount of rich green balm from an open tin, applying to dry lips, soft warm lighting, beauty close-up, 4k",
      },
      {
        label: "Texture / ingredients close-up",
        prompt:
          "Macro shot of smooth rich balm surface in an open tin, showing creamy dense green-tinted texture with a finger swipe trail, beauty macro, 4k",
      },
      {
        label: "Complementary items",
        prompt:
          "Balm tin arranged with a lip brush, hand cream tube, cuticle oil, dried lavender, and a silk pouch, beauty essentials flat lay, 4k",
      },
      {
        label: "Benefit visualization",
        prompt:
          "Close-up of smooth soft moisturized lips and hands, showing repaired skin texture, warm golden light, beauty results photography, 4k",
      },
    ],
  },

  // -----------------------------------------------------------------------
  // MV Soap
  // -----------------------------------------------------------------------
  {
    slug: "mv-soap",
    name: "Mother Vegetable Soap",
    prompts: [
      {
        label: "Packaging shot",
        prompt:
          "Handcrafted green marbled soap bar, 100g, on a wooden soap dish with kraft paper wrapping nearby, artisan bathroom setting, product photography, 4k",
      },
      {
        label: "Lifestyle / in-use shot",
        prompt:
          "Hands creating a rich green lather with the nutrient soap bar under running water, bathroom sink, self-care moment photography, 4k",
      },
      {
        label: "Texture / ingredients close-up",
        prompt:
          "Cross-section of green marbled soap bar showing swirled layers of natural plant-based ingredients, on white marble, artisan soap macro, 4k",
      },
      {
        label: "Complementary items",
        prompt:
          "Green soap bar on a teak dish surrounded by folded white towels, a loofah, dried eucalyptus, and a candle, spa bathroom flat lay, 4k",
      },
      {
        label: "Benefit visualization",
        prompt:
          "Fresh clean skin with natural healthy glow after washing, water droplets on smooth skin, bright clean bathroom lighting, skincare results, 4k",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Output
// ---------------------------------------------------------------------------

console.log("=".repeat(80));
console.log("MOTHER VEGETABLE - IMAGE GENERATION PROMPTS");
console.log("=".repeat(80));
console.log();
console.log(`Total products: ${productPrompts.length}`);
console.log(`Total images needed: ${productPrompts.length * 5}`);
console.log();

for (const product of productPrompts) {
  console.log("-".repeat(80));
  console.log(`Product: ${product.name} (${product.slug})`);
  console.log("-".repeat(80));

  for (const [i, p] of product.prompts.entries()) {
    const filename = `${product.slug}_gallery_${i + 1}.png`;
    console.log();
    console.log(`  [${i + 1}] ${p.label}`);
    console.log(`      File: public/cdn/${filename}`);
    console.log(`      Prompt: ${p.prompt}`);
  }

  console.log();
}

console.log("=".repeat(80));
console.log("HOW TO USE:");
console.log("  1. Copy each prompt into an image generation tool (DALL-E, Midjourney, etc.)");
console.log("  2. Save the output as the filename listed above");
console.log("  3. Place files in public/cdn/");
console.log("  4. Update galleryImages URLs in src/data/products.ts");
console.log("=".repeat(80));
