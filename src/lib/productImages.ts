export const SITE_LOGO_IMAGE = '/Images/Assets/General/logo.png';
export const SITE_OG_LOGO_IMAGE = '/Images/Assets/General/og-logo.png';

// Canonical product thumbnails for UI surfaces where the product must be
// immediately identifiable (cart, checkout, product cards, Stripe checkout).
// Avoid legacy wordmark/how-to assets such as products_*_10001.png.
export const PRODUCT_IMAGE_OVERRIDES: Record<string, string> = {
  achieve: '/cdn/products_achieve_10004.jpg',
  'achieve-capsule-30': '/cdn/products_achieve_10004.jpg',
  confidence: '/cdn/products_confidence_10018.jpg',
  'confidence-tube-30': '/cdn/products_confidence_10018.jpg',
};

export function resolveProductImage(product: {
  slug?: string;
  id?: string;
  productImage?: string;
  imageUrl?: string;
  images?: string[];
}) {
  if (product.slug && PRODUCT_IMAGE_OVERRIDES[product.slug]) return PRODUCT_IMAGE_OVERRIDES[product.slug];
  if (product.id && PRODUCT_IMAGE_OVERRIDES[product.id]) return PRODUCT_IMAGE_OVERRIDES[product.id];
  return product.productImage ?? product.imageUrl ?? product.images?.[0] ?? SITE_LOGO_IMAGE;
}
