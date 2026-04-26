'use client';

import { useState, useEffect, useMemo } from 'react';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { useCartStore } from '@/store/cart';
import { getStoredReferralCode } from '@/lib/affiliate';

const REFERRAL_DISCOUNT_RATE = 0.10;

function parseJpyPrice(priceStr: string): number {
  return parseInt(priceStr.replace(/[¥,]/g, ''), 10);
}

function formatJpyPrice(amount: number): string {
  return '¥' + amount.toLocaleString();
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

function getMonthBadgeColor(month: number | undefined): string {
  if (!month) return 'bg-gray-500';
  // Spring green -> Summer blue -> Autumn orange -> Winter red
  const colors: Record<number, string> = {
    5: 'bg-emerald-500',    // May - spring green
    6: 'bg-teal-500',       // June - late spring
    7: 'bg-cyan-500',       // July - summer
    8: 'bg-blue-500',       // August - summer blue
    9: 'bg-amber-500',      // September - early autumn
    10: 'bg-orange-500',    // October - autumn orange
    11: 'bg-red-500',       // November - late autumn
    12: 'bg-rose-600',      // December - winter red
  };
  return colors[month] ?? 'bg-gray-500';
}

type Tier = 'regular' | 'product100';
type Subcategory = 'seasoning' | 'supplement' | 'cosmetic' | 'fish';

const REGULAR_IDS = new Set(['achieve', 'confidence']);

function getProducts(isJa: boolean) {
  return [
    {
      id: 'achieve',
      name: 'Achieve',
      tier: 'regular' as Tier,
      subcategory: undefined as Subcategory | undefined,
      subtitle: isJa ? '飲むタイプ' : 'Drinkable Type',
      subName: isJa ? 'フレッシュドライプロテイン' : 'Flesh Dry Protein',
      tagline: isJa ? '48種類の栄養を一度に摂取' : '48 different nutrients at once.',
      videoUrl: '/new_achieve_video.mp4',
      imageUrl: '/cdn/products_achieve_10001.png',
      features: isJa
        ? ['48種類の栄養を一度に摂取', '毎日の健康を大切な人と']
        : ['48 different nutrients in one serving', 'Share daily wellness with your loved ones'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/achieve',
      priceUsd: '$36.70',
      priceJpy: '¥5,500',
    },
    {
      id: 'confidence',
      name: 'Confidence',
      tier: 'regular' as Tier,
      subcategory: undefined as Subcategory | undefined,
      subtitle: isJa ? '肌に塗るタイプ' : 'Topical Type',
      subName: isJa ? 'フレッシュブリッジコラーゲン' : 'Flesh Bridge Collagen',
      tagline: isJa ? '肌の気になるところに直接塗布' : 'For All Skin Types',
      videoUrl: '/new_confidence_video.mp4',
      imageUrl: '/cdn/products_confidence_10001.png',
      features: isJa
        ? ['肌の気になるところに直接塗布', 'お気に入りコスメに混ぜて使用']
        : ['Apply directly to areas of skin concern', 'Mix into your favorite cosmetics'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/confidence',
      priceUsd: '$36.70',
      priceJpy: '¥5,500',
    },
    {
      id: 'tilapia',
      name: isJa ? 'マザベジフィッシュ' : 'MV Fish',
      tier: 'product100' as Tier,
      subcategory: 'fish' as Subcategory,
      subscriptionMonth: 5,
      subtitle: isJa ? '1匹' : '1 fish',
      subName: '',
      tagline: isJa ? '48種の栄養素で育てた新鮮なマザベジフィッシュ' : 'Fresh MV Fish enriched with 48 nutrients',
      videoUrl: null,
      imageUrl: '/cdn/mv_tilapia.jpg',
      features: isJa
        ? ['48種類の栄養素を含む高タンパク食品', 'オメガ3脂肪酸・必須ミネラル豊富']
        : ['High protein with 48 different nutrients', 'Rich in omega-3 fatty acids & minerals'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/tilapia',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-salt',
      name: isJa ? 'マザベジ塩' : 'MV Salt',
      tier: 'product100' as Tier,
      subcategory: 'seasoning' as Subcategory,
      subscriptionMonth: 6,
      subtitle: '50g',
      subName: '',
      tagline: isJa ? '48種の栄養素配合の緑色の塩' : 'Green nutrient-infused salt',
      videoUrl: null,
      imageUrl: '/cdn/mv_salt.jpg',
      features: isJa
        ? ['48種類の栄養素が摂れる緑の塩', '毎日の料理に混ぜるだけ']
        : ['Green salt with 48 different nutrients', 'Simply add to everyday cooking'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-salt',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-soy-sauce',
      name: isJa ? 'マザベジ醤油' : 'MV Soy Sauce',
      tier: 'product100' as Tier,
      subcategory: 'seasoning' as Subcategory,
      subscriptionMonth: 7,
      subtitle: '150ml',
      subName: '',
      tagline: isJa ? '48種の栄養素配合プレミアム醤油' : 'Premium nutrient-rich dark soy sauce',
      videoUrl: null,
      imageUrl: '/cdn/mv_soy_sauce_top.png',
      features: isJa
        ? ['48種類の栄養素入りプレミアム醤油', '豊かな旨味と栄養素で毎日をサポート']
        : ['Premium soy sauce with 48 nutrients', 'Rich umami with added health benefits'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-soy-sauce',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-toner',
      name: isJa ? 'マザベジ化粧水' : 'MV Toner',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 10,
      subtitle: '150ml',
      subName: '',
      tagline: isJa ? 'Confidenceコラーゲン配合の化粧水' : 'Confidence-powered skin toner',
      videoUrl: null,
      imageUrl: '/cdn/mv_toner.jpg',
      features: isJa
        ? ['天然コラーゲン配合・毎日のスキンケアに', '天然栄養素でうるおいケア']
        : ['Natural collagen for daily skincare', 'Moisture care with natural nutrients'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-toner',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-balm',
      name: isJa ? 'マザベジバウム' : 'MV Balm',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 11,
      subtitle: '50g',
      subName: '',
      tagline: isJa ? 'Confidenceコラーゲン配合のラグジュアリーバウム' : 'Confidence-powered luxury balm',
      videoUrl: null,
      imageUrl: '/cdn/mv_balm.jpg',
      features: isJa
        ? ['天然コラーゲン配合・集中保湿ケア', '顔・唇・ボディのマルチユース']
        : ['Natural collagen for intensive moisture care', 'Multi-use for face, lips & body'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-balm',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-soap',
      name: isJa ? 'マザベジ石鹸' : 'MV Soap',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 12,
      subtitle: '100g',
      subName: '',
      tagline: isJa ? 'Confidenceコラーゲン配合の手作り石鹸' : 'Confidence-powered natural soap',
      videoUrl: null,
      imageUrl: '/cdn/mv_soap.jpg',
      features: isJa
        ? ['天然コラーゲン配合・やさしく洗う', '天然成分のディープクレンジング']
        : ['Natural collagen for gentle cleansing', 'Natural plant-based deep cleanse'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-soap',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-miso',
      name: isJa ? 'マザベジ味噌' : 'MV Miso',
      tier: 'product100' as Tier,
      subcategory: 'seasoning' as Subcategory,
      subscriptionMonth: 8,
      subtitle: '200g',
      subName: '',
      tagline: isJa ? '48種の栄養素配合プレミアム味噌' : 'Nutrient-rich premium miso',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=400&fit=crop',
      features: isJa
        ? ['48種類の栄養素入りプレミアム味噌', '伝統の味わいに植物由来の栄養をプラス']
        : ['Premium miso with 48 nutrients', 'Traditional flavor with plant-based nutrition'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-miso',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-wasabi',
      name: isJa ? 'マザベジわさび' : 'MV Wasabi',
      tier: 'product100' as Tier,
      subcategory: 'seasoning' as Subcategory,
      subscriptionMonth: 9,
      subtitle: '50g',
      subName: '',
      tagline: isJa ? '48種の栄養素配合プレミアムわさび' : 'Nutrient-rich premium wasabi',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=400&fit=crop',
      features: isJa
        ? ['48種類の栄養素入りプレミアムわさび', '新鮮なわさびの風味に栄養素をプラス']
        : ['Premium wasabi with 48 nutrients', 'Fresh wasabi flavor with added health benefits'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-wasabi',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-matcha',
      name: isJa ? 'マザベジ抹茶' : 'MV Matcha',
      tier: 'product100' as Tier,
      subcategory: 'supplement' as Subcategory,
      subscriptionMonth: 5,
      subtitle: '30g',
      subName: '',
      tagline: isJa ? 'マザベジブレンドの抹茶パウダー' : 'Nutrient-rich matcha blend',
      videoUrl: null,
      imageUrl: '/cdn/mv_matcha_top.png',
      features: isJa
        ? ['48種類の栄養素入りプレミアム抹茶', '抗酸化物質豊富な毎日の健康ドリンク']
        : ['Premium matcha blended with 48 nutrients', 'Antioxidant-rich daily wellness drink'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-matcha',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-dressing',
      name: isJa ? 'マザベジドレッシング' : 'MV Dressing',
      tier: 'product100' as Tier,
      subcategory: 'seasoning' as Subcategory,
      subscriptionMonth: 6,
      subtitle: '150ml',
      subName: '',
      tagline: isJa ? '48種の栄養素配合ドレッシング' : 'Nutrient-rich dressing',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=400&h=400&fit=crop',
      features: isJa
        ? ['48種類の栄養素入りプレミアムドレッシング', 'サラダ・温野菜に最適']
        : ['Premium dressing with 48 nutrients', 'Perfect for salads and vegetables'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-dressing',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-olive',
      name: isJa ? 'マザベジオリーブオイル' : 'MV Olive Oil',
      tier: 'product100' as Tier,
      subcategory: 'seasoning' as Subcategory,
      subscriptionMonth: 6,
      subtitle: '100ml',
      subName: '',
      tagline: isJa ? 'マザベジ栄養素配合オリーブオイル' : 'Nutrient-rich olive oil',
      videoUrl: null,
      imageUrl: '/cdn/mv_olive_top.png',
      features: isJa
        ? ['48種類の栄養素入りオリーブオイル', 'サラダ・料理・ディップに最適']
        : ['Premium olive oil with 48 nutrients', 'Perfect for salads, cooking, and dipping'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-olive',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-suncare',
      name: isJa ? 'マザベジサンケアジェル' : 'MV Suncare Gel',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 7,
      subtitle: '30g',
      subName: '',
      tagline: isJa ? '天然植物由来成分のサンケアジェル' : 'Nutrient-rich suncare gel',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?w=400&h=400&fit=crop',
      features: isJa
        ? ['天然植物由来成分配合サンケアジェル', 'やさしい日焼け対策に']
        : ['Natural suncare with plant-based nutrients', 'Gentle protection for daily use'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-suncare',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-body-mist',
      name: isJa ? 'マザベジボディミスト' : 'MV Body Mist',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 11,
      subtitle: '50ml',
      subName: '',
      tagline: isJa ? '天然栄養素配合のボディミスト' : 'Nutrient-rich body mist',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop',
      features: isJa
        ? ['天然栄養素配合ボディミスト', '毎日のリフレッシュに']
        : ['Refreshing body mist with natural nutrients', 'Light fragrance for everyday freshness'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-body-mist',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-handcream',
      name: isJa ? 'マザベジハンドクリーム' : 'MV Hand Cream',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 7,
      subtitle: '30g',
      subName: '',
      tagline: isJa ? '天然コラーゲン配合のハンドクリーム' : 'Natural collagen hand cream',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=400&h=400&fit=crop',
      features: isJa
        ? ['天然コラーゲン配合ハンドクリーム', '手をやわらかくしっとり保湿']
        : ['Natural collagen hand cream', 'Keeps hands soft and moisturized'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-handcream',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-ponzu',
      name: isJa ? 'マザベジポン酢' : 'MV Ponzu',
      tier: 'product100' as Tier,
      subcategory: 'seasoning' as Subcategory,
      subscriptionMonth: 8,
      subtitle: '150ml',
      subName: '',
      tagline: isJa ? '48種の栄養素配合ポン酢' : 'Nutrient-rich ponzu sauce',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=400&h=400&fit=crop',
      features: isJa
        ? ['48種類の栄養素入りポン酢', '鍋・サラダ・焼き物に最適']
        : ['Nutrient-rich citrus ponzu', 'Perfect for nabe, salad, and grilled dishes'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-ponzu',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-face-mist',
      name: isJa ? 'マザベジフェイスミスト' : 'MV Face Mist',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 9,
      subtitle: '50ml',
      subName: '',
      tagline: isJa ? '天然コラーゲン配合のフェイスミスト' : 'Nutrient-rich face mist',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
      features: isJa
        ? ['天然コラーゲン配合フェイスミスト', 'いつでもどこでもうるおい補給']
        : ['Natural collagen face mist', 'Refreshing hydration throughout the day'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-face-mist',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-hair-oil',
      name: isJa ? 'マザベジヘアオイル' : 'MV Hair Oil',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 10,
      subtitle: '30ml',
      subName: '',
      tagline: isJa ? '天然植物由来成分のヘアオイル' : 'Nutrient-rich hair oil',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop',
      features: isJa
        ? ['天然植物由来成分配合ヘアオイル', '髪をなめらかに栄養補給']
        : ['Natural hair oil with plant-based nutrients', 'Keeps hair smooth and nourished'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-hair-oil',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-lipbalm',
      name: isJa ? 'マザベジリップバーム' : 'MV Lip Balm',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 9,
      subtitle: '5g',
      subName: '',
      tagline: isJa ? '天然コラーゲン配合のリップバーム' : 'Natural collagen lip care',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&h=400&fit=crop',
      features: isJa
        ? ['天然コラーゲン配合リップバーム', '唇をやわらかくしっとり保湿']
        : ['Natural collagen lip balm', 'Keeps lips soft and moisturized'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-lipbalm',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-vinegar',
      name: isJa ? 'マザベジ酢' : 'MV Vinegar',
      tier: 'product100' as Tier,
      subcategory: 'seasoning' as Subcategory,
      subscriptionMonth: 10,
      subtitle: '150ml',
      subName: '',
      tagline: isJa ? '48種の栄養素配合プレミアム酢' : 'Nutrient-rich rice vinegar',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=400&h=400&fit=crop',
      features: isJa
        ? ['48種類の栄養素入りプレミアム酢', '料理・ドレッシング・健康ドリンクに']
        : ['Nutrient-rich premium vinegar', 'Versatile for cooking and health drinks'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-vinegar',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-bathsalt',
      name: isJa ? 'マザベジバスソルト' : 'MV Bath Salt',
      tier: 'product100' as Tier,
      subcategory: 'cosmetic' as Subcategory,
      subscriptionMonth: 11,
      subtitle: '200g',
      subName: '',
      tagline: isJa ? '48種の栄養素配合バスソルト' : 'Nutrient-rich bath salt',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&h=400&fit=crop',
      features: isJa
        ? ['48種類の栄養素入りバスソルト', 'リラックスバスタイムに栄養素をプラス']
        : ['Nutrient-rich mineral bath salt', 'Relaxing bath experience with 48 nutrients'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-bathsalt',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-ginger-tea',
      name: isJa ? 'マザベジ生姜茶' : 'MV Ginger Tea',
      tier: 'product100' as Tier,
      subcategory: 'supplement' as Subcategory,
      subscriptionMonth: 12,
      subtitle: '30g',
      subName: '',
      tagline: isJa ? 'マザベジ栄養素ブレンドの生姜茶' : 'Nutrient-rich ginger tea',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400&h=400&fit=crop',
      features: isJa
        ? ['48種類の栄養素入り生姜茶', '冬のあたたかい健康ドリンク']
        : ['Warming ginger tea with 48 nutrients', 'Perfect winter wellness drink'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-ginger-tea',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
    {
      id: 'mv-honey',
      name: isJa ? 'マザベジ蜂蜜' : 'MV Honey',
      tier: 'product100' as Tier,
      subcategory: 'supplement' as Subcategory,
      subscriptionMonth: 12,
      subtitle: '100g',
      subName: '',
      tagline: isJa ? 'マザベジ栄養素ブレンドの蜂蜜' : 'Nutrient-rich honey',
      videoUrl: null,
      imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop',
      features: isJa
        ? ['48種類の栄養素入りプレミアム蜂蜜', 'ドリンク・トースト・料理に最適']
        : ['Premium honey with 48 nutrients', 'Perfect for drinks, toast, and cooking'],
      howToUseLabel: '',
      howToLink: '',
      productLink: '/product/mv-honey',
      priceUsd: '$13.50',
      priceJpy: '¥2,000',
    },
  ];
}

type Category = 'all' | 'food' | 'cosmetic';

const FOOD_IDS = new Set(['achieve', 'tilapia', 'mv-salt', 'mv-soy-sauce', 'mv-miso', 'mv-wasabi', 'mv-matcha', 'mv-dressing', 'mv-olive', 'mv-ponzu', 'mv-vinegar', 'mv-ginger-tea', 'mv-honey']);
const COSMETIC_IDS = new Set(['confidence', 'mv-toner', 'mv-balm', 'mv-soap', 'mv-suncare', 'mv-body-mist', 'mv-handcream', 'mv-face-mist', 'mv-hair-oil', 'mv-lipbalm', 'mv-bathsalt']);

const SUBCATEGORY_LABELS: Record<string, Record<Subcategory | 'all', string>> = {
  ja: {
    all: 'すべて',
    seasoning: '調味料',
    supplement: 'サプリ',
    cosmetic: 'コスメ',
    fish: 'フィッシュ',
  },
  en: {
    all: 'All',
    seasoning: 'Seasoning',
    supplement: 'Supplement',
    cosmetic: 'Cosmetic',
    fish: 'Fish',
  },
};

export default function ProductsSection() {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const tMvt = useTranslations('mvt');
  const products = getProducts(isJa);
  const addItem = useCartStore((s) => s.addItem);
  const [quantities, setQuantities] = useState<Record<string, number>>(
    () => Object.fromEntries(products.map((p) => [p.id, 1]))
  );
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<Subcategory | 'all'>('all');
  const [activeMonth, setActiveMonth] = useState<number | 'all'>('all');
  const [selectedPlan, setSelectedPlan] = useState<'light' | 'standard' | 'premium'>('standard');
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);
  const [hasReferral, setHasReferral] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const code = getStoredReferralCode();
    if (code) setHasReferral(true);
  }, []);

  // Map UI plan keys to API plan IDs (`light` → `basic` on the server).
  const toApiPlanId = (planKey: 'light' | 'standard' | 'premium'): string => {
    if (planKey === 'light') return 'basic';
    return planKey;
  };

  // Send the user to the unified /checkout page (same UI as cart checkout)
  // with the chosen subscription plan in the query string. The checkout page
  // detects the `subscription` param and submits to /api/checkout/subscription
  // instead of the cart route.
  const handleSubscribe = (planKey: 'light' | 'standard' | 'premium') => {
    if (subscribing) return;
    setSubscribing(true);
    const planId = toApiPlanId(planKey);
    const target = `/${locale || 'ja'}/checkout?subscription=${encodeURIComponent(planId)}`;
    window.location.href = target;
  };

  const filteredProducts = products.filter((p) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'food') return FOOD_IDS.has(p.id);
    if (activeCategory === 'cosmetic') return COSMETIC_IDS.has(p.id);
    return true;
  });

  const regularProducts = filteredProducts.filter((p) => p.tier === 'regular');
  const product100Products = filteredProducts.filter((p) => p.tier === 'product100');

  // Determine which subcategories exist in the current product100 list
  const availableSubcategories = useMemo(() => {
    const subs = new Set<Subcategory>();
    product100Products.forEach((p) => {
      if (p.subcategory) subs.add(p.subcategory);
    });
    return subs;
  }, [product100Products]);

  // Filter product100 by subcategory and month, sorted by subscriptionMonth ascending
  const filteredProduct100 = product100Products
    .filter((p) => {
      if (activeSubcategory !== 'all' && p.subcategory !== activeSubcategory) return false;
      if (activeMonth !== 'all' && p.subscriptionMonth !== activeMonth) return false;
      return true;
    })
    .sort((a, b) => {
      const ma = a.subscriptionMonth ?? Infinity;
      const mb = b.subscriptionMonth ?? Infinity;
      return ma - mb;
    });

  // Group product100 by subscription month for timeline view
  const productsByMonth = useMemo(() => {
    return filteredProduct100.reduce((acc, product) => {
      const month = product.subscriptionMonth || 0;
      if (!acc[month]) acc[month] = [];
      acc[month].push(product);
      return acc;
    }, {} as Record<number, typeof filteredProduct100>);
  }, [filteredProduct100]);

  const MONTH_OPTIONS = [5, 6, 7, 8, 9, 10, 11, 12] as const;
  const monthLabels: Record<string, Record<number | 'all', string>> = {
    ja: { all: 'すべて', 5: '5月', 6: '6月', 7: '7月', 8: '8月', 9: '9月', 10: '10月', 11: '11月', 12: '12月' },
    en: { all: 'All', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' },
  };
  const mLabels = monthLabels[isJa ? 'ja' : 'en'] ?? monthLabels.en;

  // Check if any product100 products have subscriptionMonth
  const hasMonthlyProducts = product100Products.some((p) => p.subscriptionMonth != null);

  const tierLabels = {
    regular: isJa ? 'レギュラー商品' : 'Regular',
    product100: isJa ? 'MV プロダクト100' : 'MV Product 100',
  };

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: isJa ? 'すべて' : 'All' },
    { key: 'food', label: isJa ? 'フード' : 'Food' },
    { key: 'cosmetic', label: isJa ? 'コスメ' : 'Cosmetic' },
  ];

  const subcatLabels = SUBCATEGORY_LABELS[isJa ? 'ja' : 'en'] ?? SUBCATEGORY_LABELS.en;

  // Render the green MVT earn chip + env impact line for a product card.
  // Fields (co2SavedKg, proteinGrams, chemicalReducedGrams, mvtReward) are
  // read defensively from the product via an index lookup so this works
  // whether or not the local product shape has been extended yet. If no
  // fields are present, nothing renders.
  const renderMvtBadge = (product: Record<string, unknown>) => {
    const mvtReward = typeof product.mvtReward === 'number' ? product.mvtReward : undefined;
    const co2 = typeof product.co2SavedKg === 'number' ? product.co2SavedKg : undefined;
    const protein = typeof product.proteinGrams === 'number' ? product.proteinGrams : undefined;
    const chemical =
      typeof product.chemicalReducedGrams === 'number' ? product.chemicalReducedGrams : undefined;

    if (
      mvtReward === undefined &&
      co2 === undefined &&
      protein === undefined &&
      chemical === undefined
    ) {
      return null;
    }

    const hasImpact = co2 !== undefined || protein !== undefined || chemical !== undefined;

    return (
      <div className="mt-1 mb-1 space-y-1">
        {mvtReward !== undefined && (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] md:text-xs font-semibold border"
            style={{
              color: '#25c760',
              backgroundColor: 'rgba(37, 199, 96, 0.12)',
              borderColor: 'rgba(37, 199, 96, 0.45)',
            }}
            aria-label={tMvt('earnPrefix')}
          >
            <span aria-hidden="true">🪙</span>
            <span>
              +{mvtReward} MVT
            </span>
          </span>
        )}
        {hasImpact && (
          <p className="text-[9px] md:text-[11px] text-white/60 leading-snug">
            {tMvt('co2Label')} {co2 ?? 0}kg / {tMvt('proteinLabel')} {protein ?? 0}g / {tMvt('chemicalLabel')} {chemical ?? 0}g
          </p>
        )}
      </div>
    );
  };

  // Build subcategory filter buttons (only show categories that have products)
  const subcategoryButtons: { key: Subcategory | 'all'; label: string }[] = [
    { key: 'all', label: subcatLabels.all },
    ...(['seasoning', 'supplement', 'cosmetic', 'fish'] as Subcategory[])
      .filter((s) => availableSubcategories.has(s))
      .map((s) => ({ key: s, label: subcatLabels[s] })),
  ];

  return (
    <motion.div
      className="bg-black border-2 border-[#25C760] rounded-lg p-4 md:p-8 my-5 md:my-5"
      id="product-listing"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <h2 className="text-xl md:text-5xl font-bold text-center mb-2 md:mb-4" style={{ color: '#25c760' }}>
        Products
      </h2>

      <div className="w-32 md:w-48 h-1 md:h-1.5 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto rounded-full mt-4 md:mt-6 mb-6 md:mb-8 opacity-80" />

      {/* Category Filter */}
      <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-12">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-1.5 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors ${
              activeCategory === cat.key
                ? 'bg-[#25c760] text-black'
                : 'border border-[#25c760] text-[#25c760] hover:bg-[#25c760]/10'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Regular Products */}
      {regularProducts.length > 0 && (
        <>
          <h3 className="text-lg md:text-2xl font-bold text-center mb-4 md:mb-6" style={{ color: '#25c760' }}>
            {tierLabels.regular}
          </h3>
          <motion.div
            key={`regular-${activeCategory}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-8 md:mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {regularProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={cardVariants}
                className="rounded-lg p-3 md:p-6"
                style={{ border: '1px solid #25c760' }}
              >
                {/* Mobile: Horizontal Layout / Desktop: Vertical Layout */}
                <div className="flex flex-row md:flex-col gap-3 md:gap-0">
                  {/* Video or Image — Achieve/Confidence keep the original portrait look on desktop */}
                  <div className="flex-shrink-0 self-stretch md:self-auto md:mb-4 md:flex md:justify-center">
                    {product.videoUrl ? (
                      <video
                        src={product.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-24 h-full md:w-28 md:h-52 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={product.imageUrl!}
                        alt={product.name}
                        className="w-24 h-24 md:w-28 md:h-52 object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 flex flex-col">
                    {/* Title & Subtitle */}
                    <div className="mb-1 md:text-center">
                      <h3 className="text-lg md:text-3xl font-bold" style={{ color: '#25c760' }}>
                        {product.name}
                      </h3>
                      <p className="text-green-400 text-xs md:text-sm">{product.subtitle}</p>
                      {product.subName && <p className="text-green-400 text-xs md:text-sm">{product.subName}</p>}
                    </div>

                    {/* Features */}
                    <div className="space-y-1 mb-2 mt-5">
                      {product.features.map((feature, idx) => (
                        <p key={idx} className="text-white text-[10px] md:text-lg flex items-start text-left">
                          <span className="text-green-400 mr-1 md:mr-2">{'\u2713'}</span>
                          {feature}
                        </p>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex flex-wrap gap-2 mt-3 mb-2 items-center justify-center">
                      {hasReferral ? (
                        <>
                          <span className="text-white/50 line-through text-base md:text-lg">{product.priceJpy}</span>
                          <span className="text-white font-bold text-xl md:text-2xl">
                            {formatJpyPrice(Math.round(parseJpyPrice(product.priceJpy) * (1 - REFERRAL_DISCOUNT_RATE)))}
                          </span>
                          <span className="text-xs font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-2 py-0.5">
                            10% OFF
                          </span>
                        </>
                      ) : (
                        <span className="text-white font-bold text-xl md:text-2xl">{product.priceJpy}</span>
                      )}
                    </div>

                    {/* MVT earn preview */}
                    {renderMvtBadge(product as unknown as Record<string, unknown>)}

                  </div>
                </div>

                {/* Quantity + Add to Cart */}
                <div className="mt-4 md:mt-6 px-2 md:px-4 pb-1 md:pb-2 space-y-3">
                  {/* Quantity selector */}
                  <div className="flex items-center justify-center gap-4 py-1">
                    <button
                      onClick={() => setQuantities((prev) => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] ?? 1) - 1) }))}
                      className="w-9 h-9 rounded-full border-2 border-[#25c760] text-[#25c760] font-bold text-xl flex items-center justify-center hover:bg-[#25c760]/20 transition-colors"
                    >{'\u2212'}</button>
                    <span className="text-white font-bold text-base w-8 text-center">{quantities[product.id] ?? 1}</span>
                    <button
                      onClick={() => setQuantities((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 1) + 1 }))}
                      className="w-9 h-9 rounded-full border-2 border-[#25c760] text-[#25c760] font-bold text-xl flex items-center justify-center hover:bg-[#25c760]/20 transition-colors"
                    >+</button>
                  </div>
                  {/* Add to cart */}
                  <button
                    onClick={() => {
                      const basePrice = parseFloat(product.priceUsd.replace('$', ''));
                      addItem({
                        id: product.id,
                        productId: product.id,
                        name: product.name,
                        price: basePrice,
                        discountedPrice: hasReferral ? parseFloat((basePrice * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2)) : undefined,
                        currency: 'USD',
                        quantity: quantities[product.id] ?? 1,
                        image: product.imageUrl ?? '',
                      });
                    }}
                    className="block w-full text-center py-2.5 md:py-3 bg-[#25c760] text-black font-semibold text-sm md:text-base rounded-full hover:bg-[#1da84e] transition-colors"
                  >
                    {isJa ? 'カートに入れる' : 'Add to Cart'}
                  </button>
                  <Link
                    href={product.productLink}
                    className="block w-full text-center py-2 text-white/60 font-medium text-xs md:text-sm hover:text-white transition-colors no-underline"
                  >
                    {isJa ? '商品詳細' : 'View Details'}
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}

      {/* Product 100 */}
      {product100Products.length > 0 && (
        <>
          <h3 className="text-lg md:text-2xl font-bold text-center mb-4 md:mb-6" style={{ color: '#25c760' }}>
            {tierLabels.product100}
          </h3>

          {/* Subscription Plan Selector */}
          <div className="max-w-4xl mx-auto mb-8 md:mb-10">
            <h4 className="text-sm md:text-lg font-bold text-center mb-4" style={{ color: '#25c760' }}>
              {isJa ? 'サブスクリプションプラン' : locale === 'zh' ? '订阅计划' : 'Subscription Plans'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {([
                {
                  key: 'light' as const,
                  name: isJa ? 'ライトプラン' : locale === 'zh' ? '轻量计划' : 'Light Plan',
                  desc: isJa ? '毎月ランダムで1個お届け' : locale === 'zh' ? '每月随机配送1件商品' : '1 random product delivered monthly',
                  price: '¥2,000',
                  count: '1',
                },
                {
                  key: 'standard' as const,
                  name: isJa ? 'スタンダードプラン' : locale === 'zh' ? '标准计划' : 'Standard Plan',
                  desc: isJa ? '毎月2個お届け' : locale === 'zh' ? '每月配送2件商品' : '2 products delivered monthly',
                  price: '¥3,500',
                  count: '2',
                },
                {
                  key: 'premium' as const,
                  name: isJa ? 'プレミアムプラン' : locale === 'zh' ? '高级计划' : 'Premium Plan',
                  desc: isJa ? '毎月3個すべてお届け' : locale === 'zh' ? '每月配送全部3件商品' : 'All 3 products delivered monthly',
                  price: '¥5,000',
                  count: '3',
                },
              ]).map((plan) => (
                <button
                  key={plan.key}
                  onClick={() => setSelectedPlan(plan.key)}
                  className={`relative rounded-xl p-4 md:p-5 text-left transition-all duration-200 ${
                    selectedPlan === plan.key
                      ? 'border-2 border-[#25c760] bg-[#25c760]/10 shadow-lg shadow-[#25c760]/20'
                      : 'border border-white/15 bg-white/5 hover:border-white/30'
                  }`}
                >
                  {/* Radio indicator */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.key ? 'border-[#25c760]' : 'border-white/30'
                    }`}>
                      {selectedPlan === plan.key && (
                        <div className="w-2 h-2 rounded-full bg-[#25c760]" />
                      )}
                    </div>
                    <span className={`text-sm md:text-base font-bold ${
                      selectedPlan === plan.key ? 'text-[#25c760]' : 'text-white/70'
                    }`}>
                      {plan.name}
                    </span>
                  </div>
                  <p className={`text-[10px] md:text-xs mb-3 ${
                    selectedPlan === plan.key ? 'text-white/70' : 'text-white/40'
                  }`}>
                    {plan.desc}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-lg md:text-2xl font-bold ${
                      selectedPlan === plan.key ? 'text-white' : 'text-white/60'
                    }`}>
                      {plan.price}
                    </span>
                    <span className={`text-[10px] md:text-xs ${
                      selectedPlan === plan.key ? 'text-white/50' : 'text-white/30'
                    }`}>
                      {isJa ? '/月' : locale === 'zh' ? '/月' : '/mo'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            {/* Subscribe Button */}
            <div className="flex justify-center mt-5">
              <button
                onClick={() => handleSubscribe(selectedPlan)}
                disabled={subscribing}
                className="px-8 py-3 md:px-12 md:py-4 bg-[#25c760] text-black font-bold text-sm md:text-lg rounded-full hover:bg-[#1da84e] transition-colors shadow-lg shadow-[#25c760]/20 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isJa ? 'サブスクリプションを開始する' : 'Start Subscription'}
              </button>
            </div>
          </div>

          {/* Monthly Timeline — wide, no scroll arrow, no count; product name click toggles a wide dropdown modal */}
          <div className="space-y-3 w-full">
            {Object.entries(productsByMonth)
              .sort(([a], [b]) => Number(a) - Number(b))
              .map(([month, products]) => (
                <div key={month}>
                  {/* Month row — top-aligned on mobile so the month badge and the (vertically-stacked) product icons line up at the top */}
                  <div
                    className={`flex items-start md:items-center gap-3 md:gap-5 px-3 py-2.5 md:px-4 md:py-3 rounded-lg transition-colors ${
                      expandedMonth === Number(month)
                        ? 'bg-[#25c760]/10 border border-[#25c760]/30'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {/* Month badge */}
                    <span className={`${getMonthBadgeColor(Number(month))} text-white text-xs md:text-sm font-bold px-3 py-1 md:px-4 md:py-1.5 rounded-full min-w-[48px] md:min-w-[56px] text-center shrink-0`}>
                      {mLabels[Number(month)]}
                    </span>

                    {/* Product thumbnails — equal-width columns. Mobile: stack vertically (icon above wrapped name). Desktop: icon next to name. */}
                    <div className="relative flex-1 min-w-0">
                      <div className="grid grid-cols-3 gap-2 md:gap-4 justify-items-center">
                        {products.map((p) => {
                          const isOpen = expandedMonth === Number(month);
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() =>
                                setExpandedMonth(isOpen ? null : Number(month))
                              }
                              className="w-full flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start gap-1.5 md:gap-2 rounded-lg px-1 py-1 md:px-2 hover:bg-white/5 transition-colors"
                            >
                              <div
                                className="w-10 h-10 md:w-11 md:h-11 shrink-0 rounded-full bg-cover bg-center border-2 border-[#25c760]/60 shadow-[0_0_0_1px_rgba(37,199,96,0.25)]"
                                style={{ backgroundImage: `url(${p.imageUrl})` }}
                              />
                              <span className="text-[11px] leading-tight md:text-sm text-gray-200 hover:text-[#25c760] transition-colors text-center md:text-left break-words md:truncate w-full md:w-auto">
                                {p.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Expanded dropdown modal — wider, full-width */}
                  {expandedMonth === Number(month) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-7 p-4 md:p-6 border border-[#25c760]/40 rounded-xl mt-3 bg-black/40">
                        {products.map((product) => (
                          <motion.div
                            key={product.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            className="rounded-lg p-3 md:p-6"
                            style={{ border: '1px solid #25c760' }}
                          >
                            {/* Mobile: Horizontal Layout / Desktop: Vertical Layout */}
                            <div className="flex flex-row md:flex-col gap-3 md:gap-0">
                              {/* Video or Image — 16:9 landscape on desktop, square on mobile */}
                              <div className="flex-shrink-0 self-stretch md:self-auto md:mb-4 md:w-full">
                                {product.videoUrl ? (
                                  <video
                                    src={product.videoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-24 h-full md:w-full md:h-auto md:aspect-video object-cover rounded-lg"
                                  />
                                ) : (
                                  <img
                                    src={product.imageUrl!}
                                    alt={product.name}
                                    className="w-24 h-24 md:w-full md:h-auto md:aspect-video object-cover rounded-lg"
                                  />
                                )}
                              </div>

                              {/* Text Content */}
                              <div className="flex-1 flex flex-col">
                                {/* Title & Subtitle */}
                                <div className="mb-1 md:text-center">
                                  <h3 className="text-lg md:text-3xl font-bold" style={{ color: '#25c760' }}>
                                    {product.name}
                                  </h3>
                                  <p className="text-green-400 text-xs md:text-sm">{product.subtitle}</p>
                                  {product.subName && <p className="text-green-400 text-xs md:text-sm">{product.subName}</p>}
                                </div>

                                {/* Features */}
                                <div className="space-y-1 mb-2 mt-5">
                                  {product.features.map((feature, idx) => (
                                    <p key={idx} className="text-white text-[10px] md:text-lg flex items-start text-left">
                                      <span className="text-green-400 mr-1 md:mr-2">{'\u2713'}</span>
                                      {feature}
                                    </p>
                                  ))}
                                </div>

                                {/* Price */}
                                <div className="flex flex-wrap gap-2 mt-3 mb-2 items-center justify-center">
                                  {hasReferral ? (
                                    <>
                                      <span className="text-white/50 line-through text-base md:text-lg">{product.priceJpy}</span>
                                      <span className="text-white font-bold text-xl md:text-2xl">
                                        {formatJpyPrice(Math.round(parseJpyPrice(product.priceJpy) * (1 - REFERRAL_DISCOUNT_RATE)))}
                                      </span>
                                      <span className="text-xs font-semibold text-[#25C760] bg-[#25C760]/15 border border-[#25C760] rounded px-2 py-0.5">
                                        10% OFF
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-white font-bold text-xl md:text-2xl">{product.priceJpy}</span>
                                  )}
                                </div>

                                {/* MVT earn preview */}
                                {renderMvtBadge(product as unknown as Record<string, unknown>)}

                              </div>
                            </div>

                            {/* Quantity + Add to Cart */}
                            <div className="mt-4 md:mt-6 px-2 md:px-4 pb-1 md:pb-2 space-y-3">
                              {/* Quantity selector */}
                              <div className="flex items-center justify-center gap-4 py-1">
                                <button
                                  onClick={() => setQuantities((prev) => ({ ...prev, [product.id]: Math.max(1, (prev[product.id] ?? 1) - 1) }))}
                                  className="w-9 h-9 rounded-full border-2 border-[#25c760] text-[#25c760] font-bold text-xl flex items-center justify-center hover:bg-[#25c760]/20 transition-colors"
                                >{'\u2212'}</button>
                                <span className="text-white font-bold text-base w-8 text-center">{quantities[product.id] ?? 1}</span>
                                <button
                                  onClick={() => setQuantities((prev) => ({ ...prev, [product.id]: (prev[product.id] ?? 1) + 1 }))}
                                  className="w-9 h-9 rounded-full border-2 border-[#25c760] text-[#25c760] font-bold text-xl flex items-center justify-center hover:bg-[#25c760]/20 transition-colors"
                                >+</button>
                              </div>
                              {/* Add to cart */}
                              <button
                                onClick={() => {
                                  const basePrice = parseFloat(product.priceUsd.replace('$', ''));
                                  addItem({
                                    id: product.id,
                                    productId: product.id,
                                    name: product.name,
                                    price: basePrice,
                                    discountedPrice: hasReferral ? parseFloat((basePrice * (1 - REFERRAL_DISCOUNT_RATE)).toFixed(2)) : undefined,
                                    currency: 'USD',
                                    quantity: quantities[product.id] ?? 1,
                                    image: product.imageUrl ?? '',
                                  });
                                }}
                                className="block w-full text-center py-2.5 md:py-3 bg-[#25c760] text-black font-semibold text-sm md:text-base rounded-full hover:bg-[#1da84e] transition-colors"
                              >
                                {isJa ? 'カートに入れる' : 'Add to Cart'}
                              </button>
                              <Link
                                href={product.productLink}
                                className="block w-full text-center py-2 text-white/60 font-medium text-xs md:text-sm hover:text-white transition-colors no-underline"
                              >
                                {isJa ? '商品詳細' : 'View Details'}
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
          </div>

        </>
      )}

    </motion.div>
  );
}
