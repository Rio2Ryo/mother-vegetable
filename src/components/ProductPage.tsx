'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useCartStore } from '@/store/cart';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { getStoredReferralCode } from '@/lib/affiliate';

const REFERRAL_DISCOUNT_PRICE = 33.00;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface FunctionCircle {
  name: string;
  detail: string;
}

interface BenefitCategory {
  title: string;
  image: string;
  items: string[];
}

interface IngredientRow {
  label: string;
  value: string;
}

interface NutritionalDetail {
  name: string;
  value: string;
}

interface FunctionSection {
  type: 'food' | 'cosmetic';
  title: string;
  subtitle: string;
  method: string;
  videoUrl: string;
  circles: FunctionCircle[];
  summary?: { total: string; description: string };
  benefits: BenefitCategory[];
  // Cosmetic-specific
  medicalText?: string;
  skinVideoUrl?: string;
  // Ingredient & nutritional info (food)
  ingredientInfo?: IngredientRow[];
  nutritionalDetails?: NutritionalDetail[];
  // Characteristics (food & cosmetic)
  characteristics?: string[];
}

interface TrustSection {
  productName: string;
  certification: string;
  partners: string[];
}

export interface ProductPageData {
  id: string;
  name: string;
  fullName: string;
  subtitle: string;
  taglineJp: string;
  tagline: string;
  price: number;
  currency: string;
  priceDisplay: string;
  priceJpy?: string;
  inStock: boolean;
  videoUrls: string[];
  mainVideoUrl: string;
  benefits: string[];
  howToUse: string;
  howToLink: string;
  productImage: string;
  // Trust
  trust: TrustSection;
  // Function
  functionSection: FunctionSection;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function ProductPage({ product }: { product: ProductPageData }) {
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [hasReferral, setHasReferral] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addItem } = useCartStore();
  const router = useRouter();
  const t = useTranslations('cart');

  useEffect(() => {
    const code = getStoredReferralCode();
    if (code) setHasReferral(true);
  }, []);

  const effectivePrice = hasReferral ? REFERRAL_DISCOUNT_PRICE : product.price;

  const handleAddToCart = useCallback(() => {
    if (!product.inStock) return;
    addItem({
      id: product.id,
      productId: product.id,
      name: product.fullName,
      price: product.price,
      discountedPrice: hasReferral ? REFERRAL_DISCOUNT_PRICE : undefined,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  }, [addItem, product, hasReferral, quantity]);

  const handleBuyNow = useCallback(() => {
    if (!product.inStock) return;
    addItem({
      id: product.id,
      productId: product.id,
      name: product.fullName,
      price: product.price,
      discountedPrice: hasReferral ? REFERRAL_DISCOUNT_PRICE : undefined,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
    router.push('/checkout');
  }, [addItem, product, hasReferral, quantity, router]);

  return (
    <div className="bg-black min-h-screen">
      <style>{`
        /* ============================================================================
           PRODUCT GALLERY & CART SECTION
           ============================================================================ */
        .product-gallery-section { padding: 40px 0; background-color: black; min-height: 60vh; }
        .product-gallery-section .gallery-container { max-width: 1500px; margin: 0 auto; padding: 0 15px; }

        /* Gallery Row */
        .gallery-row { display: flex; align-items: stretch; height: 750px; }
        .gallery-col-thumb { width: 8.333%; flex: 0 0 8.333%; max-width: 8.333%; }
        .gallery-col-main { width: 33.333%; flex: 0 0 33.333%; max-width: 33.333%; }
        .gallery-col-info { width: 58.333%; flex: 0 0 58.333%; max-width: 58.333%; }

        /* Thumbnail Gallery */
        .thumbnail-gallery { display: flex; flex-direction: column; gap: 15px; padding: 20px 0; max-height: 600px; overflow-y: auto; scrollbar-width: none; -ms-overflow-style: none; }
        .thumbnail-gallery::-webkit-scrollbar { display: none; }
        .thumbnail-item { width: 100%; aspect-ratio: 1; border-radius: 10px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: all 0.3s ease; position: relative; flex-shrink: 0; }
        .thumbnail-item:hover { border-color: #25C760; transform: scale(1.05); }
        .thumbnail-item.active { border-color: #25C760; box-shadow: 0 0 15px rgba(37, 199, 96, 0.5); }
        .thumbnail-video { width: 100%; height: 100%; object-fit: cover; }

        /* Main Product Display */
        .main-product-display { display: flex; justify-content: center; align-items: center; padding: 20px; height: 700px; }
        .product-media-container { position: relative; width: 100%; max-width: 500px; height: 100%; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); background-color: black; display: flex; align-items: center; justify-content: center; }
        .main-product-video { width: 100%; max-height: 100%; height: auto; display: block; object-fit: contain; }

        /* Product Info Cart */
        .product-info-cart { background: black; padding: 40px; border-radius: 20px; color: #FFFFFF; height: fit-content; margin-top: 20px; }
        .product-name { font-size: 2.5rem; font-weight: bold; color: #25C760; margin-bottom: 10px; line-height: 1.2; }
        .product-price { font-size: 2.5rem; font-weight: bold; color: #25C760; margin-bottom: 10px; }
        .free-shipping-badge { border: 1px solid #25C760; border-radius: 5px; padding: 5px 10px; font-size: 12px; height: fit-content; width: fit-content; max-width: 100%; }
        .free-shipping-badge p { color: #25C760; display: flex; align-items: center; margin: 0; white-space: nowrap; }

        /* Quantity Selector */
        .quantity-selector { margin-bottom: 30px; display: flex; align-items: center; gap: 15px; }
        .quantity-selector label { font-size: 1.1rem; color: #000000; background-color: #ffffff; border-radius: 5px; padding: 8px 15px; margin: 0; }
        .quantity-controls { display: flex; align-items: center; background: #FFFFFF; border: 2px solid #25C760; border-radius: 5px; padding: 5px; width: 120px; }
        .quantity-btn { width: 30px; height: 30px; border: none; background: transparent; color: black; border-radius: 50%; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; }
        .quantity-btn:hover { background: #f0f0f0; }
        .quantity-input { width: 40px; height: 30px; text-align: center; border: none; background: transparent; color: black; font-size: 1.1rem; font-weight: bold; outline: none; }

        /* Action Buttons */
        .action-buttons { display: flex; flex-direction: column; gap: 15px; }
        .action-btn { padding: 15px 25px; font-size: 0.95rem; font-weight: bold; border-radius: 8px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; border: 2px solid #25C760; background: #FFFFFF; color: black; cursor: pointer; width: 100%; }
        .action-btn:hover { background: #25C760; color: #FFFFFF; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(37, 199, 96, 0.3); }

        /* ============================================================================
           PRODUCT DETAILS CARD (3-column grid)
           ============================================================================ */
        .products-grid-details { display: grid; gap: 20px; max-width: 100%; margin: 0 auto; }
        .product-card { background-color: black; border: 1px solid #25C760; border-radius: 12px; padding: 10px; position: relative; overflow: hidden; transition: all 0.3s ease; font-size: 1rem; }
        .card-content { display: grid; grid-template-columns: auto 1fr 1fr; grid-template-rows: auto auto; gap: 10px; align-items: start; text-align: left; padding: 12px; }
        .card-product-image { grid-column: 1; grid-row: 1 / 3; width: unset; height: auto; border-radius: 8px; overflow: hidden; position: relative; display: flex; align-items: flex-start; padding-top: 5px; }
        .card-product-video { width: 100%; height: auto; object-fit: contain; display: block; padding-left: 10%; padding-right: 10%; max-width: 240px; border-radius: 8px; }
        .card-product-title { grid-column: 2; grid-row: 1; margin: 0; display: flex; flex-direction: column; gap: 5px; text-align: left; align-self: end; padding-left: 5%; }
        .card-title-main { font-size: 2rem; font-weight: bold; color: #25C760; margin: 0; line-height: 1.2; }
        .card-title-sub { font-size: 0.9rem; color: #25C760; margin: 0; }
        .card-product-tagline { grid-column: 2; grid-row: 2; font-size: 1rem; color: #FFFFFF; margin: 2px 0 0 0; line-height: 1.5; text-align: left; padding-left: 5%; }
        .card-product-benefits { grid-column: 3; grid-row: 1; margin: 0; align-self: end; display: flex; flex-direction: column; justify-content: flex-end; }
        .benefit-item { display: flex; align-items: flex-start; margin-bottom: 10px; gap: 10px; }
        .benefit-item .checkmark { color: #25C760; font-weight: bold; font-size: 1.2rem; flex-shrink: 0; }
        .benefit-item span:last-child { font-size: 1.2rem; color: #FFFFFF; line-height: 1.4; }
        .card-how-to-use { grid-column: 3; grid-row: 2; margin: 0; margin-top: 10px; }
        .card-how-to-use h4 { font-size: 1.5rem; color: #25C760; margin: 0 0 10px 0; }
        .usage-item { display: flex; align-items: flex-start; gap: 10px; }
        .usage-item .checkmark { margin-top: -2px; }
        .usage-item span:last-child { font-size: 0.95rem; color: #FFFFFF; line-height: 1.4; }

        /* ============================================================================
           HERO UNDERLINE
           ============================================================================ */
        .hero-underline-img { display: block; width: 250px; max-width: 80%; height: auto; margin: 20px auto; filter: drop-shadow(0 0 15px rgba(37, 199, 96, 0.5)); }

        /* ============================================================================
           TRUST SECTION
           ============================================================================ */
        .trust-content { background-color: black; border: 1px solid #25C760; border-radius: 12px; padding: 40px; margin: 40px 0; transition: all 0.3s ease; }
        .trust-content:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(37, 199, 96, 0.2); }
        .trust-content p { font-family: Arial, sans-serif; font-size: 1rem; color: #FFFFFF; line-height: 1.4; text-align: center; margin-bottom: 0; }
        .trust-title { text-align: center; font-family: Arial, sans-serif; font-weight: 700; font-size: 2.5rem; color: #25C760; letter-spacing: 2px; }
        .trust-logos { display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: 30px; max-width: 1400px; margin: 0 auto; }
        .trust-logo { display: flex; justify-content: center; align-items: center; padding: 10px; }
        .partner-logo { max-width: 120px; max-height: 120px; width: auto; height: auto; transition: all 0.3s ease; }
        .partner-logo:hover { transform: scale(1.1); }

        /* ============================================================================
           FUNCTION SECTION (.com card-based layout)
           ============================================================================ */
        .function-content { background-color: black; border: 2px solid #25C760; border-radius: 12px; padding: 16px 16px 32px; margin: 40px 0; }
        .function-title { color: #25C760; margin-bottom: 4px; text-align: center; font-family: Arial, sans-serif; font-weight: 700; font-size: 1.25rem; letter-spacing: 2px; }
        .function-subtitle-green { color: #25C760; font-family: Arial, sans-serif; font-weight: 400; font-size: 0.875rem; text-align: center; margin-bottom: 8px; }
        .function-product-name { color: #FFFFFF; font-family: Arial, sans-serif; font-weight: 400; font-size: 1rem; text-align: center; margin-bottom: 16px; }
        .function-divider { width: 128px; height: 4px; background: linear-gradient(to right, transparent, #4ade80, transparent); margin: 16px auto 24px; border-radius: 9999px; opacity: 0.8; }
        .function-video-center { display: flex; justify-content: center; margin-bottom: 0; }
        .function-video-center video { height: 96px; width: auto; object-fit: contain; border-radius: 8px; }
        .function-bracket-center { display: flex; justify-content: center; margin-bottom: 16px; }
        .function-bracket-center img { width: 100%; max-width: 672px; object-fit: contain; }

        /* Nutrient heading */
        .fn-nutrient-heading { color: #25C760; font-family: Arial, sans-serif; font-weight: 700; font-size: 1.125rem; text-align: center; margin-bottom: 8px; }
        .fn-nutrient-sub { color: #9ca3af; font-size: 0.75rem; text-align: center; margin-bottom: 16px; }

        /* Main 5 oval pills */
        .fn-main-nutrients { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 24px; max-width: 768px; margin-left: auto; margin-right: auto; }
        .fn-pill { border: 2px solid #4ade80; border-radius: 8px; padding: 8px 8px; background: rgba(22, 101, 52, 0.4); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 28%; }
        .fn-pill-label { color: #f3f4f6; font-size: 9px; font-weight: 600; margin-bottom: 4px; line-height: 1.2; }
        .fn-pill-value { color: #86efac; font-size: 9px; font-weight: 700; }

        /* Detail grid cards */
        .fn-detail-heading { color: rgba(34, 197, 94, 0.8); font-family: Arial, sans-serif; font-weight: 700; font-size: 0.875rem; text-align: center; margin-bottom: 12px; }
        .fn-detail-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; max-width: 768px; margin: 0 auto 32px; }
        .fn-detail-card { border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 8px; padding: 8px; background: rgba(22, 101, 52, 0.2); transition: background 0.2s; }
        .fn-detail-card:hover { background: rgba(22, 101, 52, 0.4); }
        .fn-detail-name { color: #e5e7eb; font-size: 10px; font-weight: 500; line-height: 1.3; }
        .fn-detail-value { color: #4ade80; font-size: 11px; font-weight: 700; }

        /* Characteristics 2-col */
        .fn-chars-heading { color: #25C760; font-family: Arial, sans-serif; font-weight: 700; font-size: 1.125rem; text-align: center; margin-bottom: 24px; }
        .fn-chars-grid { display: grid; grid-template-columns: 1fr; gap: 20px 32px; max-width: 896px; margin: 0 auto 48px; padding: 0 16px; }
        .fn-char-item { display: flex; align-items: flex-start; gap: 12px; }
        .fn-char-dot { margin-top: 8px; width: 6px; height: 6px; min-width: 6px; border-radius: 9999px; background: #25C760; }
        .fn-char-text { color: #e5e7eb; font-size: 0.75rem; }

        /* Disclaimer section */
        .fn-disclaimer-heading { color: #25C760; font-family: Arial, sans-serif; font-weight: 700; font-size: 1.125rem; text-align: center; margin-bottom: 24px; }
        .fn-disclaimer-text { color: #d1d5db; font-size: 0.875rem; text-align: left; line-height: 1.6; margin-bottom: 32px; max-width: 768px; margin-left: auto; margin-right: auto; }

        /* Medical Grade Content (Confidence only) */
        .medical-grade-content { display: flex; flex-direction: column; gap: 15px; padding: 30px; border-radius: 12px; }
        .medical-description { text-align: center; }
        .medical-text { font-family: Arial, sans-serif; font-size: 1.1rem; line-height: 1.7; color: #FFFFFF; margin: 0 auto; opacity: 0.95; text-align: center; max-width: 800px; }
        .medical-image { display: flex; justify-content: center; align-items: center; }
        .skin-healing-video { max-width: 60%; height: auto; border-radius: 8px; filter: drop-shadow(0 5px 15px rgba(37, 199, 96, 0.3)); transition: transform 0.3s ease; object-fit: cover; }
        .skin-healing-video:hover { transform: scale(1.02); }

        /* ============================================================================
           FUNCTION SECTION — DESKTOP OVERRIDES
           ============================================================================ */
        @media (min-width: 768px) {
          .function-content { padding: 32px; }
          .function-title { font-size: 3rem; }
          .function-subtitle-green { font-size: 1.5rem; margin-bottom: 8px; }
          .function-product-name { font-size: 1.25rem; margin-bottom: 16px; }
          .function-divider { width: 192px; height: 6px; margin: 24px auto 32px; }
          .function-video-center video { height: 96px; }
          .fn-nutrient-heading { font-size: 1.875rem; }
          .fn-nutrient-sub { font-size: 0.875rem; margin-bottom: 24px; }
          .fn-main-nutrients { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
          .fn-pill { padding: 16px; width: auto; }
          .fn-pill-label { font-size: 0.875rem; }
          .fn-pill-value { font-size: 1.125rem; }
          .fn-detail-heading { font-size: 1.125rem; margin-bottom: 16px; }
          .fn-detail-grid { grid-template-columns: repeat(6, 1fr); gap: 12px; }
          .fn-detail-name { font-size: 0.75rem; }
          .fn-detail-value { font-size: 0.875rem; }
          .fn-detail-card { padding: 12px; }
          .fn-chars-heading { font-size: 1.875rem; margin-bottom: 32px; }
          .fn-chars-grid { grid-template-columns: repeat(2, 1fr); gap: 20px 32px; }
          .fn-char-text { font-size: 0.875rem; }
          .fn-disclaimer-heading { font-size: 1.875rem; margin-bottom: 32px; }
          .fn-disclaimer-text { font-size: 1rem; }
        }

        /* ============================================================================
           RESPONSIVE
           ============================================================================ */
        @media (max-width: 1024px) {
          .function-content { margin: 30px 0; padding: 24px; }
          .function-title { font-size: 2rem; }
          .fn-nutrient-heading { font-size: 1.5rem; }
          .fn-pill { padding: 12px 16px; width: auto; }
          .fn-pill-label { font-size: 0.8rem; }
          .fn-pill-value { font-size: 1rem; }
          .fn-detail-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .fn-detail-name { font-size: 0.75rem; }
          .fn-detail-value { font-size: 0.85rem; }
          .fn-chars-grid { grid-template-columns: repeat(2, 1fr); }
          .fn-char-text { font-size: 0.85rem; }
          .trust-title { font-size: 2rem; }
          .trust-content { margin: 30px 0; padding: 30px; }
          .trust-logos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; padding: 0 20px; }
          .card-content { grid-template-columns: auto 1fr 1fr; gap: 15px; }
          .card-product-video { max-width: 160px; padding-left: 0; padding-right: 0; }
          .card-title-main { font-size: 1.5rem; }
          .card-title-sub { font-size: 1.3rem; }
          .benefit-item span:last-child { font-size: 1rem; }
          .card-how-to-use h4 { font-size: 1rem; }
          .usage-item span:last-child { font-size: 1rem; }
        }

        @media (max-width: 820px) {
          .gallery-row { display: flex; flex-direction: column; height: unset; }
          .gallery-col-main { order: 1; width: 100%; max-width: 100%; flex: 0 0 100%; }
          .gallery-col-thumb { order: 2; width: 100%; max-width: 100%; flex: 0 0 100%; }
          .gallery-col-info { order: 3; width: 100%; max-width: 100%; flex: 0 0 100%; }
          .main-product-display { height: auto; min-height: 400px; padding: 20px 0; }
          .product-media-container { max-width: 100%; min-height: 350px; height: auto; }
          .main-product-video { max-height: none; width: 50%; height: auto; }
          .thumbnail-gallery { flex-direction: row; overflow-x: auto; padding: 10px 0; gap: 10px; height: auto; max-height: none; }
          .thumbnail-item { min-width: 60px; max-width: 80px; height: auto; aspect-ratio: unset; }
          .thumbnail-video { width: 100%; height: auto; object-fit: contain; }
          .product-name { font-size: 1.2rem; line-height: 1.3; margin-bottom: 8px; }
          .product-info-cart { padding: 30px 20px; margin-top: 30px; }
          .trust-title { font-size: 1rem; margin-bottom: 5px; }
          .trust-content { margin: 20px 0; padding: 10px; }
          .trust-content p { font-size: 0.6rem; }
          .trust-logos { display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: center; gap: 4px; padding: 0 4px; width: 100%; overflow: hidden; }
          .trust-logo { padding: 2px; flex-shrink: 1; width: 15%; max-width: 15%; display: flex; justify-content: center; align-items: center; min-width: 0; }
          .partner-logo { max-width: 100%; max-height: 40px; width: 100%; height: auto; object-fit: contain; display: block; }
          .card-content { padding: 20px; }
          .card-title-main { font-size: 1.6rem; }
          .card-title-sub { font-size: 0.8rem; }
          .card-product-tagline { font-size: 0.9rem; }
          .card-product-video { max-width: 150px; }
          .hero-underline-img { width: 220px; margin: 15px auto; }
          .action-btn { font-size: 0.5rem; }
          .quantity-selector label { font-size: 0.8rem; padding: 6px 8px; }
        }

        @media (max-width: 767px) {
          .function-content { margin: 20px 0; padding: 10px; }
          .function-title { font-size: 1.5rem; }
          .function-subtitle-green { font-size: 0.8rem; }
          .fn-nutrient-heading { font-size: 1.2rem; }
          .fn-main-nutrients { gap: 6px; }
          .fn-pill { width: 28%; padding: 8px; }
          .fn-pill-label { font-size: 9px; }
          .fn-pill-value { font-size: 9px; }
          .fn-detail-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; }
          .fn-detail-name { font-size: 10px; }
          .fn-detail-value { font-size: 11px; }
          .fn-chars-grid { grid-template-columns: 1fr; gap: 16px; }
          .fn-char-text { font-size: 0.75rem; }
          .medical-text { font-size: 0.9rem; }
          .skin-healing-video { max-width: 80%; }
        }

        @media (max-width: 620px) {
          .medical-grade-content { padding: 15px 0; }
          .product-name { font-size: 1.1rem; }
        }

        @media (max-width: 530px) {
          .product-name { font-size: 1rem; }
          .medical-text { font-size: 0.85rem; }
          .skin-healing-video { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .card-content { display: grid; grid-template-columns: 0.5fr 1.3fr; grid-template-rows: auto auto auto auto; gap: 10px 12px; }
          .card-product-image { height: 100%; grid-column: 1; grid-row: 1 / 5; display: flex; align-items: center; justify-content: center; padding: 0; }
          .card-product-video { width: 100%; max-width: 100%; height: auto; padding: 0; }
          .card-product-title { line-height: 0.5; grid-column: 2; grid-row: 1; margin: 0; padding: 0; }
          .card-product-tagline { font-size: 0.7rem; grid-column: 2; grid-row: 2; margin: 0; padding: 0; }
          .card-product-benefits { grid-column: 2; grid-row: 3; margin: 0; padding: 0; }
          .benefit-item span:last-child { font-size: 0.7rem; }
          .card-how-to-use { grid-column: 2; grid-row: 4; margin: 0; padding: 0; }
          .card-how-to-use h4 { font-size: 0.7rem; }
          .usage-item span:last-child { font-size: 0.7rem; }
          .trust-content p { font-size: 0.6rem; padding-top: 10px; }
        }

        @media (max-width: 400px) {
          .card-content { gap: 8px 10px; }
          .card-title-main { font-size: 0.85rem; }
          .card-title-sub { font-size: 0.65rem; }
          .card-product-tagline { font-size: 0.6rem; }
          .benefit-item span:last-child { font-size: 0.6rem; }
          .card-how-to-use h4 { font-size: 0.65rem; }
          .usage-item span:last-child { font-size: 0.6rem; }
          .hero-underline-img { width: 100px; margin: 5px auto 10px auto; }
        }
      `}</style>

      {/* Product Gallery & Cart Section */}
      <section className="product-gallery-section">
        <div className="gallery-container">
          <div className="gallery-row">
            {/* Left Side - Thumbnail Gallery */}
            <div className="gallery-col-thumb">
              <div className="thumbnail-gallery">
                {product.videoUrls.map((url, i) => (
                  <div
                    key={i}
                    className={`thumbnail-item${selectedVideo === i ? ' active' : ''}`}
                    onClick={() => setSelectedVideo(i)}
                  >
                    <video className="thumbnail-video" muted preload="metadata" playsInline>
                      <source src={url} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Side - Main Product Display */}
            <div className="gallery-col-main">
              <div className="main-product-display">
                <div className="product-media-container">
                  <video
                    key={selectedVideo}
                    className="main-product-video"
                    muted
                    autoPlay
                    loop
                    playsInline
                  >
                    <source src={product.videoUrls[selectedVideo]} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>

            {/* Right Side - Product Info & Cart */}
            <div className="gallery-col-info">
              <div className="product-info-cart">
                <div style={{ display: 'flex' }}>
                  <h1 className="product-name" style={{ fontFamily: 'Arial, sans-serif', marginBottom: 0 }}>
                    {product.fullName}
                  </h1>
                </div>

                <h2 className="product-price" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {product.priceJpy ? (
                    <span>{product.priceJpy}</span>
                  ) : (
                    product.priceDisplay
                  )}
                </h2>
                {hasReferral && (
                  <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(37,199,96,0.15)', border: '1px solid #25C760', borderRadius: '6px', marginBottom: '8px' }}>
                    <span style={{ color: '#25C760', fontSize: '13px', fontWeight: 600 }}>{t('referralDiscount')}</span>
                  </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <div className="free-shipping-badge">
                    <p>
                      <svg className="inline-block w-4 h-4" style={{ marginRight: '7px' }} fill="currentColor" viewBox="0 0 640 512"><path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                      {t('freeShipping')}
                    </p>
                  </div>
                </div>

                <div className="quantity-selector">
                  <label style={{ fontFamily: 'Arial, sans-serif' }}>{t('quantity')}</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={quantity}
                      min={1}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <button
                      className="quantity-btn"
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  {!product.inStock && (
                    <div style={{ padding: '12px 16px', background: 'rgba(239,68,68,0.15)', border: '1px solid #ef4444', borderRadius: '8px', marginBottom: '8px', textAlign: 'center' }}>
                      <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '1rem' }}>{t('outOfStock')}</span>
                      <p style={{ color: '#f87171', fontSize: '0.85rem', margin: '4px 0 0' }}>{t('outOfStockDesc')}</p>
                    </div>
                  )}
                  <button
                    className="action-btn"
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    style={!product.inStock ? { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' } : {}}
                  >
                    {addedFeedback ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5 text-[#25C760]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                        {t('addedToCart')}
                      </span>
                    ) : t('addToCart')}
                  </button>
                  <button
                    className="action-btn"
                    onClick={handleBuyNow}
                    disabled={!product.inStock}
                    style={!product.inStock ? { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' } : {}}
                  >
                    {t('buyNow')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Detail Card */}
        <div className="gallery-container">
          <div className="products-grid-details">
            <div className="product-card">
              <div className="card-content">
                <div className="card-product-image">
                  <video className="card-product-video" autoPlay muted loop playsInline>
                    <source src={product.mainVideoUrl} type="video/mp4" />
                  </video>
                </div>
                <h3 className="card-product-title">
                  <span className="card-title-main">{product.name}</span>
                  <span className="card-title-sub">{product.subtitle}</span>
                </h3>
                <p className="card-product-tagline">
                  {product.taglineJp && (
                    <><strong style={{ color: '#dc3545' }}>{product.taglineJp}</strong>{' '}</>
                  )}
                  <span style={{ color: '#FFFFFF' }}>{product.tagline}</span>
                </p>
                <div className="card-product-benefits">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="benefit-item">
                      <span className="checkmark">&#10003;</span>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <div className="card-how-to-use">
                  <h4>{t('howToUseTitle')}</h4>
                  <div className="usage-item">
                    <span className="checkmark">&#10003;</span>
                    <span>{product.howToUse}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="gallery-container">
          <div className="trust-content">
            <h2 className="trust-title">{t('ourTrust')}</h2>
            <Image
              src="/Images/Assets/homepage/underline.png"
              alt="Underline"
              width={250}
              height={20}
              className="hero-underline-img"
            />
            <div className="trust-logos">
              {product.trust.partners.map((partner, i) => (
                <div key={i} className="trust-logo">
                  <Image
                    src={partner}
                    alt={`Partner ${i + 1}`}
                    width={120}
                    height={120}
                    className="partner-logo"
                  />
                </div>
              ))}
            </div>
            <div style={{ padding: '8px 0' }}>
              <p><span style={{ color: '#25C760' }}>{product.trust.productName}</span></p>
              {product.trust.certification && (
                <p style={{ textAlign: 'center', color: '#FFFFFF' }}>{product.trust.certification}</p>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================
            Function Section — .com card-based layout
            ================================================================ */}
        <div className="gallery-container">
          <div className="function-content">
            {/* 1. Title */}
            <h2 className="function-title">
              {product.functionSection.type === 'food' ? 'Food Function' : 'Cosmetic Function'}
            </h2>

            {/* 2. Subtitle */}
            <p className="function-subtitle-green">
              {product.functionSection.type === 'food'
                ? '\u98F2\u3080\u30BF\u30A4\u30D7\u306EMother Vegetable'
                : '\u808C\u306B\u5857\u308B\u30BF\u30A4\u30D7\u306EMother Vegetable'}
            </p>

            {/* 3. Product name */}
            <p className="function-product-name">{product.functionSection.subtitle}</p>

            {/* Divider */}
            <div className="function-divider" />

            {/* 4. Product video */}
            <div className="function-video-center">
              <video autoPlay muted loop playsInline>
                <source src={product.functionSection.videoUrl} type="video/mp4" />
              </video>
            </div>

            {/* 5. Bracket image */}
            <div className="function-bracket-center">
              <Image
                src="/Images/Assets/homepage/bracket_v2.png"
                alt="Bracket"
                width={800}
                height={40}
              />
            </div>

            {/* 6. Nutrient heading */}
            <div style={{ maxWidth: '768px', margin: '0 auto', padding: '0' }}>
              <h3 className="fn-nutrient-heading">
                {product.functionSection.type === 'food'
                  ? '\u6804\u990A\u6210\u5206\u8868\u793A'
                  : '\u6210\u5206\u8868\u793A'}
              </h3>
              <p className="fn-nutrient-sub">
                {'\uFF08100g\u5F53\u305F\u308A\uFF09'}
              </p>

              {/* 7. Main 5 oval/pill cards */}
              {product.functionSection.ingredientInfo && (
                <div className="fn-main-nutrients">
                  {product.functionSection.ingredientInfo.map((row, i) => (
                    <div key={i} className="fn-pill">
                      <div className="fn-pill-label">{row.label}</div>
                      <div className="fn-pill-value">{row.value}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 8. Detailed breakdown heading + grid (food only) */}
              {product.functionSection.nutritionalDetails && product.functionSection.nutritionalDetails.length > 0 && (
                <>
                  <h4 className="fn-detail-heading">
                    {'\u6804\u990A\u5206\u306E\u5185\u8A33\uFF08\u8A73\u7D30\uFF09'}
                  </h4>
                  <div className="fn-detail-grid">
                    {product.functionSection.nutritionalDetails.map((item, i) => (
                      <div key={i} className="fn-detail-card">
                        <div className="fn-detail-name">{item.name}</div>
                        <div className="fn-detail-value">{item.value}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* 10. Characteristics heading + 2-col checklist */}
            {product.functionSection.characteristics && product.functionSection.characteristics.length > 0 && (
              <div style={{ maxWidth: '896px', margin: '48px auto 0' }}>
                <h3 className="fn-chars-heading">
                  {product.functionSection.type === 'food'
                    ? 'Achieve\u306E\u7279\u6027\u306B\u3064\u3044\u3066'
                    : 'Confidence\u306E\u7279\u6027\u306B\u3064\u3044\u3066'}
                </h3>
                <div className="fn-chars-grid">
                  {product.functionSection.characteristics.map((item, i) => (
                    <div key={i} className="fn-char-item">
                      <span className="fn-char-dot" />
                      <span className="fn-char-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 12. Disclaimer section */}
            <div style={{ maxWidth: '896px', margin: '0 auto' }}>
              <h3 className="fn-disclaimer-heading">
                {'\u52B9\u679C\u52B9\u80FD\u306E\u8868\u73FE\u898F\u5236\u306B\u3064\u3044\u3066'}
              </h3>
              <p className="fn-disclaimer-text">
                {product.functionSection.type === 'food'
                  ? '\u79C1\u305F\u3061Mother Vegetable\u30B0\u30EB\u30FC\u30D7\u306F\u3001\u4E16\u754C\u5404\u5730\u3067\u6D3B\u52D5\u3092\u884C\u3063\u3066\u3044\u308B\u305F\u3081\u3001\u52B9\u679C\u52B9\u80FD\u306B\u95A2\u3059\u308B\u8868\u73FE\u306B\u3064\u3044\u3066\u3082\u5404\u56FD\u306E\u6CD5\u5F8B\u30FB\u30AC\u30A4\u30C9\u30E9\u30A4\u30F3\u3092\u9075\u5B88\u3057\u307E\u3059\u3002'
                  : '\u79C1\u305F\u3061Mother Vegetable\u30B0\u30EB\u30FC\u30D7\u306F\u3001\u4E16\u754C\u5404\u5730\u3067\u6D3B\u52D5\u3092\u884C\u3063\u3066\u3044\u308B\u305F\u3081\u3001\u52B9\u679C\u52B9\u80FD\u306B\u95A2\u3059\u308B\u8868\u73FE\u306B\u3064\u3044\u3066\u3082\u5404\u56FD\u306E\u6CD5\u5F8B\u30FB\u30AC\u30A4\u30C9\u30E9\u30A4\u30F3\u3092\u9075\u5B88\u3057\u307E\u3059\u3002'}
              </p>
            </div>

            {/* Cosmetic Medical Grade Content */}
            {product.functionSection.medicalText && (
              <div className="medical-grade-content">
                <div className="medical-description">
                  <p className="medical-text">{product.functionSection.medicalText}</p>
                </div>
                {product.functionSection.skinVideoUrl && (
                  <div className="medical-image">
                    <video className="skin-healing-video" autoPlay muted loop playsInline>
                      <source src={product.functionSection.skinVideoUrl} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
