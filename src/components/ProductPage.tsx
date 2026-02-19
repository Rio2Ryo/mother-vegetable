'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface MixItem {
  name: string;
  image: string;
}

interface MazekomuSection {
  title: string;
  items: MixItem[];
}

interface FunctionCircle {
  name: string;
  detail: string;
}

interface BenefitCategory {
  title: string;
  image: string;
  items: string[];
}

interface FunctionSection {
  type: 'food' | 'cosmetic';
  title: string;
  subtitle: string;
  method: string; // e.g. "TORIKOMU / MAZEKOMU"
  videoUrl: string;
  circles: FunctionCircle[];
  summary?: { total: string; description: string };
  benefits: BenefitCategory[];
  // Cosmetic-specific
  medicalText?: string;
  skinVideoUrl?: string;
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
  videoUrls: string[];
  mainVideoUrl: string;
  benefits: string[];
  howToUse: string;
  howToLink: string;
  productImage: string;
  // MAZEKOMU grid sections
  leftSection: MazekomuSection;
  rightSection: MazekomuSection;
  centerTitle: string;
  centerImage: string;
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
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.fullName,
      price: product.price,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
  };

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.fullName,
      price: product.price,
      image: product.productImage,
      currency: product.currency,
      quantity,
    });
    router.push('/checkout');
  };

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
           MAZEKOMU GRID LAYOUT
           ============================================================================ */
        .mazekomu-grid { height: 500px; display: grid; grid-template-columns: 3fr 1fr 3fr; grid-template-rows: repeat(5, 1fr); width: 100%; gap: 0; background: black; margin: 40px 0; }
        .mazekomu-cell { background: black; border: none; display: flex; align-items: center; justify-content: center; color: #FFFFFF; font-size: 18px; }
        .mazekomu-left-box { grid-column: 1; grid-row: 1 / 6; border-top: 1px solid #25C760; border-left: 1px solid #25C760; border-bottom: 1px solid #25C760; border-top-left-radius: 20px; border-bottom-left-radius: 20px; }
        .mazekomu-right-box { grid-column: 3; grid-row: 1 / 6; border-top: 1px solid #25C760; border-right: 1px solid #25C760; border-bottom: 1px solid #25C760; border-top-right-radius: 20px; border-bottom-right-radius: 20px; }
        .mazekomu-box-1-2 { grid-column: 2; grid-row: 1; border-left: 1px solid #25C760; border-right: 1px solid #25C760; }
        .mazekomu-box-2-2 { grid-column: 2; grid-row: 2; border-left: 1px solid #25C760; border-right: 1px solid #25C760; border-bottom: 1px solid #25C760; }
        .mazekomu-box-3-2 { grid-column: 2; grid-row: 3; }
        .mazekomu-box-4-2 { grid-column: 2; grid-row: 4; border-left: 1px solid #25C760; border-right: 1px solid #25C760; border-top: 1px solid #25C760; }
        .mazekomu-box-5-2 { grid-column: 2; grid-row: 5; border-left: 1px solid #25C760; border-right: 1px solid #25C760; }

        .content-section { padding: 20px; height: 100%; width: 100%; display: flex; justify-content: center; flex-direction: column; }
        .content-section .section-title { font-family: Arial, sans-serif; font-size: 1.5rem; font-weight: 700; color: #ff0000; margin-bottom: 10px; text-align: center; }
        .content-section .section-title-center { text-align: center; }
        .red-hero-underline-img { display: block; width: 100px; max-width: 80%; height: auto; margin: 0 auto 20px auto; filter: drop-shadow(0 0 15px rgba(255, 0, 0, 0.5)); }
        .grid-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px; }
        .grid-container.cols-3 { grid-template-columns: repeat(3, 1fr); }
        .grid-item { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }
        .grid-image { width: 50%; height: auto; margin-bottom: 8px; object-fit: contain; }
        .text-label { font-family: Arial, sans-serif; font-size: 0.9rem; color: #FFFFFF; }
        .mazekomu-grid .test-tube-icon { width: 70%; object-fit: contain; }
        .test-tube-container { text-align: center; }
        .mazekomu-content-section { padding: 10px 0; }

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
           FUNCTION SECTION
           ============================================================================ */
        .function-content { background-color: black; border: 1px solid #25C760; border-radius: 12px; padding: 40px; margin: 40px 0; transition: all 0.3s ease; }
        .function-content:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(37, 199, 96, 0.2); }
        .function-title { color: #25C760; margin-bottom: 10px; text-align: center; font-family: Arial, sans-serif; font-weight: 700; font-size: 2.5rem; letter-spacing: 2px; }
        .function-subtitle { color: #FFFFFF; font-family: Arial, sans-serif; font-weight: 400; font-size: 1.5rem; text-align: center; }
        .function-diagram { position: relative; display: flex; flex-direction: column; align-items: center; margin-bottom: 40px; }
        .function-diagram .test-tube-icon { margin-left: -10px; margin-bottom: 0; line-height: 0; width: unset; }
        .function-diagram .product-video { max-width: 240px; height: auto; transition: transform 0.3s ease; object-fit: cover; border-radius: 8px; }
        .bracket-icon { margin-bottom: 20px; line-height: 0; }
        .bracket-img { width: 100%; max-width: 800px; height: auto; transition: transform 0.3s ease; }
        .bracket-img:hover { transform: scale(1.02); }
        .function-branches { position: relative; width: 100%; display: flex; justify-content: center; }
        .function-circle-div { display: flex; justify-content: space-between; width: 100%; max-width: 800px; gap: 1%; }
        .function-circle { background-color: #3C8063; border-radius: 50%; width: 19%; height: auto; aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 10px; transition: all 0.3s ease; position: relative; z-index: 2; }
        .function-circle:hover { transform: scale(1.1); box-shadow: 0 10px 25px rgba(37, 199, 96, 0.4); }
        .function-circle-text { font-size: clamp(0.7rem, 1vw + 0.5rem, 1rem); font-family: Arial, sans-serif; font-weight: 300; color: #FFFFFF; line-height: 1.2; display: block; }
        .function-summary { text-align: center; margin-top: 40px; }
        .function-total { font-family: Arial, sans-serif; font-weight: 700; font-size: 2rem; color: #25C760; margin-bottom: 20px; }
        .function-description { font-family: Arial, sans-serif; font-size: 1rem; color: #FFFFFF; line-height: 1.6; text-align: center; max-width: 800px; margin: 0 auto; opacity: 0.9; }

        /* Benefits Section */
        .benefits-section { padding-top: 5%; }
        .benefits-section .benefits-row { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; width: 100%; }
        .benefits-section .benefits-col { width: 50%; padding: 10px; }
        .benefits-section .benefit-flex { display: flex; justify-content: center; }
        .benefits-section .benefit-image { width: 30%; display: flex; justify-content: flex-end; }
        .benefits-section .benefit-image img { width: 100%; height: auto; max-width: 100%; max-height: 200px; object-fit: contain; }
        .benefits-section .benefit-content { width: 70%; }
        .benefits-section .benefit-content .benefit-title { font-size: 1.4rem; font-weight: 700; color: #25C760; margin-bottom: 0px; }
        .benefits-section .benefit-content .title-underline { width: 100%; max-width: 500px; margin: 5px 0 8px 0; height: 2px; background-color: #25C760; border-radius: 1px; }
        .benefits-section .benefit-content .benefit-list { list-style: disc; padding-left: 20px; }
        .benefits-section .benefit-content .benefit-list li { font-size: 1.1rem; color: #FFFFFF; font-weight: normal; }
        .benefits-section .benefit-content .benefit-list li::marker { color: #25C760; }

        /* Medical Grade Content (Confidence only) */
        .medical-grade-content { display: flex; flex-direction: column; gap: 15px; padding: 30px; border-radius: 12px; }
        .medical-description { text-align: center; }
        .medical-text { font-family: Arial, sans-serif; font-size: 1.1rem; line-height: 1.7; color: #FFFFFF; margin: 0 auto; opacity: 0.95; text-align: center; max-width: 800px; }
        .medical-image { display: flex; justify-content: center; align-items: center; }
        .skin-healing-video { max-width: 60%; height: auto; border-radius: 8px; filter: drop-shadow(0 5px 15px rgba(37, 199, 96, 0.3)); transition: transform 0.3s ease; object-fit: cover; }
        .skin-healing-video:hover { transform: scale(1.02); }

        /* ============================================================================
           RESPONSIVE
           ============================================================================ */
        @media (max-width: 1024px) {
          .grid-container { grid-template-columns: repeat(2, 1fr); }
          .grid-container.cols-3 { grid-template-columns: repeat(3, 1fr); }
          .mazekomu-grid { margin: 20px 0; }
          .content-section .red-hero-underline-img { width: 80px; margin: 0 auto 15px; }
          .function-content { margin: 30px 0; padding: 30px; }
          .function-total { font-size: 1.6rem; }
          .function-description { font-size: 0.9rem; }
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
          .benefits-section .benefit-content .benefit-title { font-size: 1.2rem; }
          .benefits-section .benefit-content .benefit-list li { font-size: 0.9rem; }
          .benefits-section .benefit-image img { max-height: 150px; }
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
          .mazekomu-grid { margin: 20px 0; }
          .content-section .section-title { font-size: 1.2rem; }
          .trust-title { font-size: 1rem; margin-bottom: 5px; }
          .trust-content { margin: 20px 0; padding: 10px; }
          .trust-content p { font-size: 0.6rem; }
          .trust-logos { display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: center; align-items: center; gap: 1px; padding: 0 2px; width: 100%; overflow: hidden; }
          .trust-logo { padding: 1px; flex-shrink: 0; width: 16.66%; max-width: 16.66%; display: flex; justify-content: center; align-items: center; min-width: 0; }
          .partner-logo { max-width: 100%; max-height: 35px; width: 100%; height: auto; object-fit: contain; display: block; }
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
          .function-subtitle { font-size: 0.9rem; }
          .function-content .product-video { max-width: 90px; }
          .function-total { font-size: 1.2rem; margin-bottom: 10px; }
          .function-description { font-size: 0.9rem; }
          .function-circle-text { font-size: clamp(0.4rem, 0.85vw + 0.45rem, 0.7rem); font-weight: 300; }
          .benefits-section .benefit-content .benefit-title { font-size: 1rem; }
          .benefits-section .benefit-content .benefit-list li { font-size: 0.8rem; }
          .benefits-section .benefit-image img { max-height: 100px; }
          .medical-text { font-size: 0.9rem; }
          .skin-healing-video { max-width: 80%; }
          .mazekomu-grid { height: 450px; }
          .grid-container { grid-template-columns: repeat(2, 1fr); padding-top: 20px; }
          .grid-container.cols-3 { grid-template-columns: repeat(3, 1fr); }
          .content-section .red-hero-underline-img { width: 70px; margin: 0 auto 10px; }
        }

        @media (max-width: 620px) {
          .mazekomu-grid { height: 420px; }
          .content-section { padding: 0; }
          .content-section .section-title { font-size: 0.8rem; }
          .mazekomu-grid .text-label { font-size: 0.5rem; }
          .grid-container { gap: 5px; padding-top: 10px; }
          .mazekomu-content-section { padding: 10px 0; }
          .content-section .red-hero-underline-img { width: 50px; margin: 0 auto 8px; }
          .function-total { font-size: 1rem; }
          .function-description { font-size: 0.8rem; }
          .medical-grade-content { padding: 15px 0; }
          .product-name { font-size: 1.1rem; }
          .benefits-section .benefits-col { width: 100%; }
        }

        @media (max-width: 580px) {
          .content-section .section-title { font-size: 0.6rem; }
          .mazekomu-grid { height: 400px; }
        }

        @media (max-width: 540px) {
          .mazekomu-grid { height: 350px; }
        }

        @media (max-width: 530px) {
          .product-name { font-size: 1rem; }
          .function-total { font-size: 1rem; }
          .function-description { font-size: 0.75rem; }
          .medical-text { font-size: 0.85rem; }
          .skin-healing-video { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .grid-container, .grid-container.cols-3 { grid-template-columns: repeat(2, 1fr); }
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

        @media (max-width: 420px) {
          .mazekomu-grid { height: 250px; }
          .content-section .red-hero-underline-img { width: 40px; margin: 0 auto 5px; }
        }

        @media (max-width: 400px) {
          .card-content { gap: 8px 10px; }
          .card-title-main { font-size: 0.85rem; }
          .card-title-sub { font-size: 0.65rem; }
          .card-product-tagline { font-size: 0.5rem; }
          .benefit-item span:last-child { font-size: 0.45rem; }
          .card-how-to-use h4 { font-size: 0.55rem; }
          .usage-item span:last-child { font-size: 0.45rem; }
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
                  {product.priceDisplay}
                </h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
                  <div className="free-shipping-badge">
                    <p>
                      <svg className="inline-block w-4 h-4" style={{ marginRight: '7px' }} fill="currentColor" viewBox="0 0 640 512"><path d="M48 0C21.5 0 0 21.5 0 48V368c0 26.5 21.5 48 48 48H64c0 53 43 96 96 96s96-43 96-96H384c0 53 43 96 96 96s96-43 96-96h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V288 256 237.3c0-17-6.7-33.3-18.7-45.3L512 114.7c-12-12-28.3-18.7-45.3-18.7H416V48c0-26.5-21.5-48-48-48H48zM416 160h50.7L544 237.3V256H416V160zM112 416a48 48 0 1 1 96 0 48 48 0 1 1-96 0zm368-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                      Free Shipping Worldwide
                    </p>
                  </div>
                </div>

                <div className="quantity-selector">
                  <label style={{ fontFamily: 'Arial, sans-serif' }}>Quantity</label>
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
                  <button className="action-btn" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <button className="action-btn" onClick={handleBuyNow}>
                    Buy Now / Proceed to Checkout
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
                  <strong style={{ color: '#dc3545' }}>{product.taglineJp}</strong>{' '}
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
                  <h4>How to use</h4>
                  <div className="usage-item">
                    <span className="checkmark">&#10003;</span>
                    <span>{product.howToUse}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAZEKOMU Grid Section */}
        <div className="gallery-container">
          <div className="mazekomu-grid">
            {/* Left Box */}
            <div className="mazekomu-cell mazekomu-left-box">
              <div className="content-section">
                <h4 className="section-title">{product.leftSection.title}</h4>
                <Image
                  src={`/Images/Assets/${product.id === 'achieve' ? 'achieve' : product.id === 'confidence' ? 'confidence' : 'forever'}/mazekomu/red_underline.png`}
                  alt="Underline"
                  width={100}
                  height={10}
                  className="red-hero-underline-img"
                />
                <div className={`grid-container${product.leftSection.items.length > 4 ? ' cols-3' : ''}`}>
                  {product.leftSection.items.map((item, i) => (
                    <div key={i} className="grid-item">
                      <Image src={item.image} alt={item.name} width={80} height={80} className="grid-image" />
                      <span className="text-label">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center connector cells */}
            <div className="mazekomu-cell mazekomu-box-1-2" />
            <div className="mazekomu-cell mazekomu-box-2-2" />
            <div className="mazekomu-cell mazekomu-box-3-2">
              <div className="content-section mazekomu-content-section">
                <h4 className="section-title section-title-center">{product.centerTitle}</h4>
                <Image
                  src={`/Images/Assets/${product.id === 'achieve' ? 'achieve' : product.id === 'confidence' ? 'confidence' : 'forever'}/mazekomu/red_underline.png`}
                  alt="Underline"
                  width={100}
                  height={10}
                  className="red-hero-underline-img"
                />
                <div className="test-tube-container">
                  <Image
                    src={product.centerImage}
                    alt={product.centerTitle}
                    width={200}
                    height={300}
                    className="test-tube-icon"
                    style={{ width: '70%', height: 'auto', objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
            <div className="mazekomu-cell mazekomu-box-4-2" />
            <div className="mazekomu-cell mazekomu-box-5-2" />

            {/* Right Box */}
            <div className="mazekomu-cell mazekomu-right-box">
              <div className="content-section">
                <h4 className="section-title">{product.rightSection.title}</h4>
                <Image
                  src={`/Images/Assets/${product.id === 'achieve' ? 'achieve' : product.id === 'confidence' ? 'confidence' : 'forever'}/mazekomu/red_underline.png`}
                  alt="Underline"
                  width={100}
                  height={10}
                  className="red-hero-underline-img"
                />
                <div className={`grid-container${product.rightSection.items.length > 4 ? ' cols-3' : ''}`}>
                  {product.rightSection.items.map((item, i) => (
                    <div key={i} className="grid-item">
                      <Image src={item.image} alt={item.name} width={80} height={80} className="grid-image" />
                      <span className="text-label">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="gallery-container">
          <div className="trust-content">
            <h2 className="trust-title">Our Trust</h2>
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

        {/* Function Section */}
        <div className="gallery-container">
          <div className="function-content">
            <h2 className="function-title">
              {product.functionSection.type === 'food' ? 'Food Function' : 'Cosmetic Function'}
            </h2>
            <h3 className="function-subtitle">{product.functionSection.subtitle}</h3>
            <Image
              src="/Images/Assets/homepage/underline.png"
              alt="Underline"
              width={250}
              height={20}
              className="hero-underline-img"
            />
            <h6 style={{ textAlign: 'center', color: '#dc3545' }}>{product.functionSection.method}</h6>

            <div className="function-diagram">
              <div className="test-tube-icon">
                <video className="product-video" autoPlay muted loop playsInline>
                  <source src={product.functionSection.videoUrl} type="video/mp4" />
                </video>
              </div>
              <div className="bracket-icon">
                <Image
                  src="/Images/Assets/homepage/bracket_v2.png"
                  alt="Bracket"
                  width={800}
                  height={100}
                  className="bracket-img"
                />
              </div>
              <div className="function-branches">
                <div className={`function-circle-div${product.functionSection.type === 'cosmetic' ? ' cosmetic-function-circle' : ''}`}>
                  {product.functionSection.circles.map((circle, i) => (
                    <div key={i} className="function-circle">
                      <span className="function-circle-text">{circle.name}</span>
                      <span className="function-circle-text">{circle.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Food Function Summary */}
            {product.functionSection.summary && (
              <div className="function-summary">
                <h4 className="function-total">{product.functionSection.summary.total}</h4>
                <p className="function-description">{product.functionSection.summary.description}</p>
              </div>
            )}

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

            {/* Benefits Grid */}
            <div className="benefits-section">
              <div className="benefits-row">
                {product.functionSection.benefits.map((category, i) => (
                  <div key={i} className="benefits-col">
                    <div className="benefit-flex">
                      <div className="benefit-image">
                        <Image src={category.image} alt={category.title} width={200} height={200} />
                      </div>
                      <div className="benefit-content">
                        <h4 className="benefit-title">{category.title}</h4>
                        <div className="title-underline" />
                        <ul className="benefit-list">
                          {category.items.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
