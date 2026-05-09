import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  console.error('STRIPE_SECRET_KEY is required');
  process.exit(1);
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mother-vegetable.vercel.app';
const stripe = new Stripe(secretKey);

const items = [
  {
    env: 'NEXT_PUBLIC_STRIPE_LINK_ATH_SPRAY',
    name: 'Confidence After Sun Care Spray',
    description: 'Malaysia event limited after-sun care spray. Max 100 pcs per order.',
    unitAmount: 2000,
    path: '/ath',
  },
  {
    env: 'NEXT_PUBLIC_STRIPE_LINK_WN_HONEY',
    name: '永原和可那 × 十勝 Honey Achieve',
    description: 'Malaysia event limited Honey Achieve from Tokachi, Hokkaido. Max 100 pcs per order.',
    unitAmount: 3500,
    path: '/wn',
  },
  {
    env: 'NEXT_PUBLIC_STRIPE_LINK_TI_HONEY',
    name: '伊藤友広 × 大仙市 Honey Achieve',
    description: 'Malaysia event limited Honey Achieve from Daisen, Akita. Max 100 pcs per order.',
    unitAmount: 3500,
    path: '/ti',
  },
];

const results = [];

for (const item of items) {
  const product = await stripe.products.create({
    name: item.name,
    description: item.description,
    metadata: {
      source: 'mother-vegetable-malaysia-event',
      max_quantity: '100',
      page_path: item.path,
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: 'usd',
    unit_amount: item.unitAmount,
  });

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 100,
        },
      },
    ],
    after_completion: {
      type: 'redirect',
      redirect: {
        url: `${appUrl}${item.path}?purchase=success`,
      },
    },
    metadata: {
      source: 'mother-vegetable-malaysia-event',
      product: item.name,
      max_quantity: '100',
    },
  });

  results.push({ env: item.env, url: paymentLink.url, productId: product.id, priceId: price.id });
}

console.log('\nAdd these environment variables to Vercel/local env:\n');
for (const result of results) {
  console.log(`${result.env}=${result.url}`);
}
console.log('\nStripe object IDs:');
console.log(JSON.stringify(results, null, 2));
