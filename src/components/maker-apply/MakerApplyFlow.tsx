'use client';

import { useMemo, useRef, useState } from 'react';

type RawMaterial = {
  id: string;
  name: string;
  region: string;
  category: '食品向け' | '化粧品向け' | '食品・化粧品向け';
  tags: string[];
  story: string;
  image: string;
  mixable: boolean;
  allowedContainerIds: string[];
};

type ContainerVariant = {
  id: string;
  name: string;
  capacity: string;
  color: string;
  shape: string;
  spec: string;
  material: string;
  image: string;
  labelSize: { widthMm: number; heightMm: number };
};

type ContainerItem = {
  id: string;
  name: string;
  capacity: string;
  tags: string[];
  note: string;
  image: string;
  variants: ContainerVariant[];
};

const rawMaterials: RawMaterial[] = [
  { id: 'kawazu-salt', name: '河津の平釜塩', region: '河津町', category: '食品向け', tags: ['調味料', '海の素材'], story: '海水を平釜で炊き上げた、土地の味が伝わるミネラル塩。', image: '/images/maker-apply/raw-materials/kawazu-salt.webp', mixable: true, allowedContainerIds: ['powder-shaker', 'can-container', 'glass-container'] },
  { id: 'kushimoto-miso', name: '串本の金山寺味噌', region: '串本町', category: '食品向け', tags: ['発酵食品', 'ごはんのお供', '常温'], story: '地域の米と麹で丁寧に仕込む、昔ながらの金山寺味噌。', image: '/images/maker-apply/raw-materials/kushimoto-kinzanji-miso.webp', mixable: false, allowedContainerIds: ['glass-container', 'can-container'] },
  { id: 'izu-onsen', name: '伊豆の温泉化粧水', region: '伊豆市', category: '化粧品向け', tags: ['スキンケア', '水素材', '保湿感', '観光地'], story: 'やわらかな質感の温泉水を活かした、化粧水やミストのベースに。', image: '/images/maker-apply/raw-materials/izu-onsen-toner.webp', mixable: true, allowedContainerIds: ['trigger-spray', 'push-spray', 'dropper-bottle'] },
  { id: 'minami-toner', name: '南伊豆ハーブ化粧水', region: '南伊豆町', category: '化粧品向け', tags: ['化粧水', 'ハーブ', 'スキンケア', '香り'], story: '小さな農園で育つハーブを活かした、やさしい化粧水素材。', image: '/images/maker-apply/raw-materials/minami-izu-herb-toner.webp', mixable: true, allowedContainerIds: ['trigger-spray', 'push-spray', 'dropper-bottle'] },
  { id: 'wakayama-shampoo', name: '紀州ゆずシャンプー', region: '和歌山県', category: '化粧品向け', tags: ['ヘアケア', '柑橘', '香り', 'バス用品'], story: 'ゆずの香りを活かした、地域色のあるヘアケア素材。', image: '/images/maker-apply/raw-materials/kishu-yuzu-shampoo.webp', mixable: false, allowedContainerIds: ['shampoo-bottle'] },
  { id: 'hokkaido-lip', name: '北海道ミルクリップ', region: '北海道', category: '化粧品向け', tags: ['リップ', '乾燥ケア', '乳素材'], story: '北海道らしいミルク感をテーマにしたリップ素材。', image: '/images/maker-apply/raw-materials/hokkaido-milk-lip.webp', mixable: false, allowedContainerIds: ['lipstick', 'glass-container'] },
  { id: 'komeko-pack', name: '米麹フェイスパック', region: '新潟県', category: '化粧品向け', tags: ['米麹', 'フェイスパック', '発酵', '美容'], story: '米どころの麹文化を美容アイテムに展開できる素材。', image: '/images/maker-apply/raw-materials/komeko-face-pack.webp', mixable: true, allowedContainerIds: ['glass-container', 'can-container'] },
  { id: 'shizuoka-wasabi', name: '静岡わさび塩', region: '静岡県', category: '食品向け', tags: ['調味料', 'わさび', '土産', '粉末'], story: '静岡のわさびを活かした、ふりかけ系コラボに向く素材。', image: '/images/maker-apply/raw-materials/shizuoka-wasabi-salt.webp', mixable: true, allowedContainerIds: ['powder-shaker', 'can-container'] },
  { id: 'olive-oil', name: '小豆島オリーブオイル', region: '小豆島', category: '食品・化粧品向け', tags: ['オイル', '食品', '美容'], story: '食品にも美容にも展開しやすい、地域性の強いオイル素材。', image: '/images/maker-apply/raw-materials/shodoshima-olive-oil.webp', mixable: true, allowedContainerIds: ['soy-ponzu', 'glass-container', 'dropper-bottle'] },
];

const containers: ContainerItem[] = [
  {
    id: 'trigger-spray',
    name: 'トリガータイプスプレー',
    capacity: '100ml〜300ml',
    tags: ['化粧品向け', 'ミスト', '液体'],
    note: '温泉化粧水・ヘアミスト・除菌系など、しっかり噴霧したい液体向け。',
    image: '/images/maker-apply/containers/trigger-spray.webp',
    variants: [
      { id: 'trigger-spray-100', name: '100ml トリガータイプ', capacity: '100ml', color: '透明', shape: '丸型', spec: 'トリガースプレー', material: 'PET', image: '/images/maker-apply/containers/trigger-spray.webp', labelSize: { widthMm: 50, heightMm: 88 } },
      { id: 'trigger-spray-200', name: '200ml トリガータイプ', capacity: '200ml', color: '透明', shape: 'ワイド円柱', spec: 'トリガースプレー', material: 'PET', image: '/images/maker-apply/containers/trigger-spray.webp', labelSize: { widthMm: 62, heightMm: 108 } },
      { id: 'trigger-spray-300', name: '300ml トリガータイプ', capacity: '300ml', color: '透明', shape: 'ワイド円柱', spec: 'トリガースプレー', material: 'PET', image: '/images/maker-apply/containers/trigger-spray.webp', labelSize: { widthMm: 72, heightMm: 125 } },
    ],
  },
  {
    id: 'push-spray',
    name: 'プッシュタイプスプレー',
    capacity: '30ml〜120ml',
    tags: ['化粧品向け', 'ミスト', '携帯'],
    note: '化粧水・香り系・持ち歩きミストに向く、片手で使いやすいスプレー容器。',
    image: '/images/maker-apply/containers/push-spray.webp',
    variants: [
      { id: 'push-spray-30', name: '30ml プッシュタイプ', capacity: '30ml', color: '透明', shape: 'スリム円柱', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/containers/push-spray.webp', labelSize: { widthMm: 32, heightMm: 58 } },
      { id: 'push-spray-50', name: '50ml プッシュタイプ', capacity: '50ml', color: '透明', shape: '丸型', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/containers/push-spray.webp', labelSize: { widthMm: 40, heightMm: 72 } },
      { id: 'push-spray-120', name: '120ml プッシュタイプ', capacity: '120ml', color: '透明', shape: '肩丸型', spec: 'プッシュミスト', material: 'PET', image: '/images/maker-apply/containers/push-spray.webp', labelSize: { widthMm: 52, heightMm: 95 } },
    ],
  },
  {
    id: 'soy-ponzu',
    name: '醤油ポン酢用ボトル',
    capacity: '100ml〜300ml',
    tags: ['食品向け', '液体', '卓上'],
    note: '醤油・ポン酢・ドレッシングなど、液体調味料に向く容器。',
    image: '/images/maker-apply/containers/soy-ponzu-bottle.webp',
    variants: [
      { id: 'soy-ponzu-100', name: '100ml 卓上ボトル', capacity: '100ml', color: '透明', shape: '丸型卓上', spec: '細口キャップ', material: 'PET/ガラス', image: '/images/maker-apply/containers/soy-ponzu-bottle.webp', labelSize: { widthMm: 46, heightMm: 68 } },
      { id: 'soy-ponzu-180', name: '180ml 卓上ボトル', capacity: '180ml', color: '透明', shape: 'スリム円柱', spec: '液だれ防止口', material: 'PET/ガラス', image: '/images/maker-apply/containers/soy-ponzu-bottle.webp', labelSize: { widthMm: 55, heightMm: 92 } },
      { id: 'soy-ponzu-300', name: '300ml 卓上ボトル', capacity: '300ml', color: '透明', shape: 'ワイド円柱', spec: 'スクリューキャップ', material: 'PET/ガラス', image: '/images/maker-apply/containers/soy-ponzu-bottle.webp', labelSize: { widthMm: 70, heightMm: 110 } },
    ],
  },
  {
    id: 'powder-shaker',
    name: '粉末用シェイカー',
    capacity: '20g〜120g',
    tags: ['食品向け', '粉末', '卓上'],
    note: '塩・わさび塩・スパイス・粉末素材に向く振り出し容器。',
    image: '/images/maker-apply/containers/powder-shaker.webp',
    variants: [
      { id: 'powder-shaker-20', name: '20g 粉末用シェイカー', capacity: '20g', color: '透明', shape: '小型円柱', spec: '3穴キャップ', material: 'PET', image: '/images/maker-apply/containers/powder-shaker.webp', labelSize: { widthMm: 36, heightMm: 48 } },
      { id: 'powder-shaker-50', name: '50g 粉末用シェイカー', capacity: '50g', color: '透明', shape: '円柱', spec: '7穴キャップ', material: 'PET', image: '/images/maker-apply/containers/powder-shaker.webp', labelSize: { widthMm: 50, heightMm: 70 } },
      { id: 'powder-shaker-120', name: '120g 粉末用シェイカー', capacity: '120g', color: '透明', shape: 'ワイド円柱', spec: '広口キャップ', material: 'PET', image: '/images/maker-apply/containers/powder-shaker.webp', labelSize: { widthMm: 66, heightMm: 90 } },
    ],
  },
  {
    id: 'glass-container',
    name: 'ガラス容器',
    capacity: '50g〜300g',
    tags: ['食品向け', '化粧品向け', '高級感'],
    note: '味噌・クリーム・バーム・オイル系に使いやすい高級感のある容器。',
    image: '/images/maker-apply/containers/glass-container.webp',
    variants: [
      { id: 'glass-container-50', name: '50g ガラス容器', capacity: '50g', color: '透明', shape: '低型丸', spec: 'スクリュー蓋', material: 'ガラス', image: '/images/maker-apply/containers/glass-container.webp', labelSize: { widthMm: 48, heightMm: 50 } },
      { id: 'glass-container-120', name: '120g ガラス容器', capacity: '120g', color: '透明', shape: '丸型', spec: 'スクリュー蓋', material: 'ガラス', image: '/images/maker-apply/containers/glass-container.webp', labelSize: { widthMm: 68, heightMm: 82 } },
      { id: 'glass-container-300', name: '300g ガラス容器', capacity: '300g', color: '透明', shape: '広口ワイド', spec: 'スクリュー蓋', material: 'ガラス', image: '/images/maker-apply/containers/glass-container.webp', labelSize: { widthMm: 90, heightMm: 105 } },
    ],
  },
  {
    id: 'shampoo-bottle',
    name: 'シャンプーボトル',
    capacity: '200ml〜500ml',
    tags: ['化粧品向け', 'ヘアケア', '液体'],
    note: 'シャンプー・トリートメント・ボディソープなどのヘアケア/バス用品向け。',
    image: '/images/maker-apply/containers/shampoo-bottle.webp',
    variants: [
      { id: 'shampoo-bottle-200', name: '200ml シャンプーボトル', capacity: '200ml', color: '透明', shape: '角丸ボトル', spec: 'ポンプ', material: 'PET/HDPE', image: '/images/maker-apply/containers/shampoo-bottle.webp', labelSize: { widthMm: 65, heightMm: 110 } },
      { id: 'shampoo-bottle-300', name: '300ml シャンプーボトル', capacity: '300ml', color: '透明', shape: '角丸ボトル', spec: 'ポンプ', material: 'PET/HDPE', image: '/images/maker-apply/containers/shampoo-bottle.webp', labelSize: { widthMm: 75, heightMm: 125 } },
      { id: 'shampoo-bottle-500', name: '500ml シャンプーボトル', capacity: '500ml', color: '透明', shape: '大型ボトル', spec: 'ポンプ', material: 'PET/HDPE', image: '/images/maker-apply/containers/shampoo-bottle.webp', labelSize: { widthMm: 88, heightMm: 145 } },
    ],
  },
  {
    id: 'dropper-bottle',
    name: 'ドロッパーボトル',
    capacity: '15ml〜50ml',
    tags: ['化粧品向け', 'オイル', '美容'],
    note: '美容オイル・エッセンス・香り系素材など、少量ずつ使う液体向け。',
    image: '/images/maker-apply/containers/dropper-bottle.webp',
    variants: [
      { id: 'dropper-bottle-15', name: '15ml ドロッパー', capacity: '15ml', color: '透明', shape: '小型円柱', spec: 'スポイト', material: 'ガラス', image: '/images/maker-apply/containers/dropper-bottle.webp', labelSize: { widthMm: 28, heightMm: 50 } },
      { id: 'dropper-bottle-30', name: '30ml ドロッパー', capacity: '30ml', color: '透明', shape: '丸型', spec: 'スポイト', material: 'ガラス', image: '/images/maker-apply/containers/dropper-bottle.webp', labelSize: { widthMm: 38, heightMm: 68 } },
      { id: 'dropper-bottle-50', name: '50ml ドロッパー', capacity: '50ml', color: '透明', shape: '丸型', spec: 'スポイト', material: 'ガラス', image: '/images/maker-apply/containers/dropper-bottle.webp', labelSize: { widthMm: 45, heightMm: 78 } },
    ],
  },
  {
    id: 'can-container',
    name: '缶容器',
    capacity: '20g〜120g',
    tags: ['食品向け', '化粧品向け', '粉末'],
    note: '粉末・茶葉・バーム・ギフト向けなど、保存性と見た目を両立した容器。',
    image: '/images/maker-apply/containers/can-container.webp',
    variants: [
      { id: 'can-container-20', name: '20g 缶容器', capacity: '20g', color: 'シルバー', shape: '小型丸缶', spec: 'かぶせ蓋', material: 'アルミ/スチール', image: '/images/maker-apply/containers/can-container.webp', labelSize: { widthMm: 42, heightMm: 32 } },
      { id: 'can-container-60', name: '60g 缶容器', capacity: '60g', color: 'シルバー', shape: '丸缶', spec: 'かぶせ蓋', material: 'アルミ/スチール', image: '/images/maker-apply/containers/can-container.webp', labelSize: { widthMm: 58, heightMm: 45 } },
      { id: 'can-container-120', name: '120g 缶容器', capacity: '120g', color: 'シルバー', shape: '大型丸缶', spec: 'スクリュー蓋', material: 'アルミ/スチール', image: '/images/maker-apply/containers/can-container.webp', labelSize: { widthMm: 72, heightMm: 58 } },
    ],
  },
  {
    id: 'lipstick',
    name: 'リップスティック',
    capacity: '3g〜15g',
    tags: ['化粧品向け', 'リップ', '携帯'],
    note: 'リップ・スティックバーム専用。食品不可。',
    image: '/images/maker-apply/containers/lipstick.webp',
    variants: [
      { id: 'lipstick-3', name: '3g リップスティック', capacity: '3g', color: '白', shape: '細身スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/containers/lipstick.webp', labelSize: { widthMm: 24, heightMm: 42 } },
      { id: 'lipstick-5', name: '5g リップスティック', capacity: '5g', color: '白', shape: '標準スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/containers/lipstick.webp', labelSize: { widthMm: 28, heightMm: 55 } },
      { id: 'lipstick-8', name: '8g リップスティック', capacity: '8g', color: '黒マット', shape: '太型スティック', spec: '繰り出し式', material: 'PP', image: '/images/maker-apply/containers/lipstick.webp', labelSize: { widthMm: 34, heightMm: 58 } },
    ],
  },
];

const logos = [
  { id: 'logo-1', name: 'Mother Vegetable ロゴ A', src: '/images/maker-apply/logo-1.png' },
  { id: 'logo-2', name: 'Mother Vegetable ロゴ B', src: '/images/maker-apply/logo-2.png' },
  { id: 'logo-3', name: 'Mother Vegetable ロゴ C', src: '/images/maker-apply/logo-3.png' },
  { id: 'logo-4', name: 'Mother Vegetable ロゴ D', src: '/images/maker-apply/logo-4.png' },
];

const motherVegetableOptions = [
  {
    id: 'achieve',
    name: 'Mother Vegetable Achieve',
    category: '食品用',
    description: '重金属などの不純物リスクを最大限に排除した、48種類の栄養素。美しい緑色が特徴',
  },
  {
    id: 'confidence',
    name: 'Mother Vegetable Confidence',
    category: '化粧品用/食品用',
    description: '日本の厚生労働省が定める医薬部外品原料規格をクリアした、純度約97%の天然非晶質シリカパウダー。アメリカのFDA基準の検査ではPremium Food Powder Grade と評価され、化粧品にも食品にも使用が可能。',
  },
  {
    id: 'both',
    name: '両方とも使用する',
    category: 'Achieve + Confidence',
    description: 'achieveとconfidenceをどちらも使用して展開したい方向け。'
  },
];

const regions = ['河津町', '串本町', '伊豆市', '南伊豆町', '和歌山県', '北海道', '新潟県', '静岡県', '小豆島'];
const categories = ['食品向け', '化粧品向け', '食品・化粧品向け'];
const tagOptions = ['発酵食品', '調味料', 'スキンケア', 'ヘアケア', '粉末', '液体'];
const containerColorOptions = ['透明', '黒遮光', '白マット'];
const lidColorOptions = ['白', '黒', '木目'];

const enRawMaterials: Record<string, { name: string; region: string; category: string; story: string; tags: Record<string, string> }> = {
  'kawazu-salt': { name: 'Kawazu Hiragama Salt', region: 'Kawazu Town', category: 'For food', story: 'Mineral-rich sea salt slowly cooked in a flat pan, carrying the character of the local coast.', tags: { '調味料': 'Seasoning', '海の素材': 'Sea ingredient' } },
  'kushimoto-miso': { name: 'Kushimoto Kinzanji Miso', region: 'Kushimoto Town', category: 'For food', story: 'Traditional Kinzanji miso carefully made with local rice and koji.', tags: { '発酵食品': 'Fermented food', 'ごはんのお供': 'Rice pairing', '常温': 'Shelf-stable' } },
  'izu-onsen': { name: 'Izu Onsen Toner', region: 'Izu City', category: 'For cosmetics', story: 'Soft-feeling hot spring water suitable as a base for toner and facial mist products.', tags: { 'スキンケア': 'Skin care', '水素材': 'Water-based', '保湿感': 'Moist feel', '観光地': 'Tourism area' } },
  'minami-toner': { name: 'Minami-Izu Herb Toner', region: 'Minami-Izu Town', category: 'For cosmetics', story: 'Gentle toner material using herbs grown on a small local farm.', tags: { '化粧水': 'Toner', 'ハーブ': 'Herbs', 'スキンケア': 'Skin care', '香り': 'Fragrance' } },
  'wakayama-shampoo': { name: 'Kishu Yuzu Shampoo', region: 'Wakayama', category: 'For cosmetics', story: 'A regional hair-care material that makes use of the fresh aroma of yuzu.', tags: { 'ヘアケア': 'Hair care', '柑橘': 'Citrus', '香り': 'Fragrance', 'バス用品': 'Bath care' } },
  'hokkaido-lip': { name: 'Hokkaido Milk Lip', region: 'Hokkaido', category: 'For cosmetics', story: 'A lip-care material inspired by the rich milk image of Hokkaido.', tags: { 'リップ': 'Lip care', '乾燥ケア': 'Dryness care', '乳素材': 'Milk-inspired' } },
  'komeko-pack': { name: 'Rice Koji Face Pack', region: 'Niigata', category: 'For cosmetics', story: 'A beauty material that brings the koji culture of Japan’s rice regions into skin-care ideas.', tags: { '米麹': 'Rice koji', 'フェイスパック': 'Face pack', '発酵': 'Fermentation', '美容': 'Beauty' } },
  'shizuoka-wasabi': { name: 'Shizuoka Wasabi Salt', region: 'Shizuoka', category: 'For food', story: 'A powdered seasoning material using Shizuoka wasabi, ideal for souvenir-style products.', tags: { '調味料': 'Seasoning', 'わさび': 'Wasabi', '土産': 'Souvenir', '粉末': 'Powder' } },
  'olive-oil': { name: 'Shodoshima Olive Oil', region: 'Shodoshima', category: 'For food / cosmetics', story: 'A highly regional oil material that can be developed for both food and beauty products.', tags: { 'オイル': 'Oil', '食品': 'Food', '美容': 'Beauty' } },
};

const enContainers: Record<string, { name: string; note: string; tags: Record<string, string>; variants: Record<string, string> }> = {
  'trigger-spray': { name: 'Trigger Spray Bottle', note: 'For liquids that need a strong spray, such as toner, hair mist, or cleaning-type products.', tags: { '化粧品向け': 'For cosmetics', 'ミスト': 'Mist', '液体': 'Liquid' }, variants: { '100ml トリガータイプ': '100ml Trigger Type', '200ml トリガータイプ': '200ml Trigger Type', '300ml トリガータイプ': '300ml Trigger Type' } },
  'push-spray': { name: 'Push Spray Bottle', note: 'A compact one-hand spray bottle for toner, fragrance products, and portable mist items.', tags: { '化粧品向け': 'For cosmetics', 'ミスト': 'Mist', '携帯': 'Portable' }, variants: { '30ml プッシュタイプ': '30ml Push Type', '50ml プッシュタイプ': '50ml Push Type', '120ml プッシュタイプ': '120ml Push Type' } },
  'soy-ponzu': { name: 'Soy Sauce / Ponzu Bottle', note: 'For liquid seasonings such as soy sauce, ponzu, and dressings.', tags: { '食品向け': 'For food', '液体': 'Liquid', '卓上': 'Tabletop' }, variants: { '100ml 卓上ボトル': '100ml Table Bottle', '180ml 卓上ボトル': '180ml Table Bottle', '300ml 卓上ボトル': '300ml Table Bottle' } },
  'powder-shaker': { name: 'Powder Shaker', note: 'For salt, wasabi salt, spices, and other powdered ingredients.', tags: { '食品向け': 'For food', '粉末': 'Powder', '卓上': 'Tabletop' }, variants: { '20g 粉末用シェイカー': '20g Powder Shaker', '50g 粉末用シェイカー': '50g Powder Shaker', '120g 粉末用シェイカー': '120g Powder Shaker' } },
  'glass-container': { name: 'Glass Container', note: 'A premium-looking container suitable for miso, cream, balm, and oil-based products.', tags: { '食品向け': 'For food', '化粧品向け': 'For cosmetics', '高級感': 'Premium feel' }, variants: { '50g ガラス容器': '50g Glass Container', '120g ガラス容器': '120g Glass Container', '300g ガラス容器': '300g Glass Container' } },
  'shampoo-bottle': { name: 'Shampoo Bottle', note: 'For hair-care and bath-care items such as shampoo, treatment, and body soap.', tags: { '化粧品向け': 'For cosmetics', 'ヘアケア': 'Hair care', '液体': 'Liquid' }, variants: { '200ml シャンプーボトル': '200ml Shampoo Bottle', '300ml シャンプーボトル': '300ml Shampoo Bottle', '500ml シャンプーボトル': '500ml Shampoo Bottle' } },
  'dropper-bottle': { name: 'Dropper Bottle', note: 'For liquids used in small amounts, such as beauty oils, essences, and fragrance materials.', tags: { '化粧品向け': 'For cosmetics', 'オイル': 'Oil', '美容': 'Beauty' }, variants: { '15ml ドロッパー': '15ml Dropper', '30ml ドロッパー': '30ml Dropper', '50ml ドロッパー': '50ml Dropper' } },
  'can-container': { name: 'Can Container', note: 'For powders, tea leaves, balms, and gift products where storage and appearance both matter.', tags: { '食品向け': 'For food', '化粧品向け': 'For cosmetics', '粉末': 'Powder' }, variants: { '20g 缶容器': '20g Can', '60g 缶容器': '60g Can', '120g 缶容器': '120g Can' } },
  'lipstick': { name: 'Lip Stick', note: 'Dedicated to lip and stick balm products. Not for food products.', tags: { '化粧品向け': 'For cosmetics', 'リップ': 'Lip care', '携帯': 'Portable' }, variants: { '3g リップスティック': '3g Lip Stick', '5g リップスティック': '5g Lip Stick', '8g リップスティック': '8g Lip Stick' } },
};

const enTerm: Record<string, string> = {
  '食品向け': 'For food', '化粧品向け': 'For cosmetics', '食品・化粧品向け': 'For food / cosmetics',
  '発酵食品': 'Fermented food', '調味料': 'Seasoning', 'スキンケア': 'Skin care', 'ヘアケア': 'Hair care', '粉末': 'Powder', '液体': 'Liquid',
  '透明': 'Clear', '黒遮光': 'Black UV-blocking', '白マット': 'Matte white', '白': 'White', '黒': 'Black', '木目': 'Wood grain', 'シルバー': 'Silver',
  '食品用': 'For food', '化粧品用/食品用': 'For cosmetics / food', '両方とも使用する': 'Use both',
  '河津町': 'Kawazu Town', '串本町': 'Kushimoto Town', '伊豆市': 'Izu City', '南伊豆町': 'Minami-Izu Town', '和歌山県': 'Wakayama', '北海道': 'Hokkaido', '新潟県': 'Niigata', '静岡県': 'Shizuoka', '小豆島': 'Shodoshima',
};

const enUi = {
  heroTitle: 'Make your dream product now',
  heroLead: 'Choose either a New Idea using Mother Vegetable from scratch, or Mix & Match with a Japanese Raw Material, then submit your Mazavege Maker idea. No monthly fee is charged until your idea passes review and you approve it.',
  courseTitle: 'Choose your idea course', courseLead: 'First choose how you want to create your Maker product.', newIdea: 'New Idea', newIdeaLead: 'Create a completely new product using Mother Vegetable.', mixMatch: 'Mix & Match', mixMatchLead: 'Collaborate with high-quality food / cosmetic materials made across Japan.',
  rawTitle: 'Choose a Japanese Raw Material',
  filters: 'Search & Filter', searchLabel: 'Search by region or material', searchPlaceholder: 'e.g. Kawazu, miso, toner', region: 'Region', usage: 'Use', featureTags: 'Feature tags', count: 'items', select: 'Select',
  mvTitle: 'Choose the Mother Vegetable to combine', mvLead: 'Select which Mother Vegetable you want to combine with your chosen Japanese Raw Material.', mvNewTitle: 'Choose the Mother Vegetable to use', mvNewLead: 'Select which Mother Vegetable you want to use.',
  ideaTitle: 'Tell us your idea', ideaLead: 'Please tell us what you would like to create.', productCategory: 'Product category', productCategoryPlaceholder: 'e.g. Toner, shampoo, ramen, bagel', ideaTarget: 'Target audience', ideaTargetPlaceholder: 'e.g. Age, gender, region, lifestyle', ideaIngredients: 'Ingredients you want to use', ideaIngredientsPlaceholder: 'Free entry', requiredIdea: 'STEP 2 is required. After filling in all fields, you can proceed to STEP 3.', goStep3: 'Proceed to STEP 3',
  containerTitle: 'What kind of container would you like to use?', containerLead: 'First choose the container shape that fits your material. After choosing a shape, you can select size, color, and specifications.', estimatedCapacity: 'Approx. capacity', chooseFrom: 'options', chooseFromSuffix: 'to choose from',
  specLabel: 'Container details', specTitleSuffix: ' specifications', specLead: 'Choose capacity, container color, and cap color in order.', threeSteps: '3 steps', capacityTitle: '1. Choose capacity', capacityNote: 'Choosing capacity also determines the label size.', labelArea: 'Label area', width: 'W', height: 'H', colorTitle: '2. Choose container color', lidTitle: '3. Choose cap color', desiredCapacity: 'Desired capacity', desiredCapacityPlaceholder: 'e.g. 100ml / 80g / 30 packs', capacityConfirm: 'Check here if this capacity is OK',
  labelTitle: 'Label design', labelLead: 'Choose the Mother Vegetable logo and adjust the size of the logo and Made in Japan mark. You can drag them directly on the preview.', chooseLogo: 'Choose Mother Vegetable logo', bgColor: 'Background color', upload: 'Upload label design image', selectedFile: 'Selected', designMemo: 'Design request memo', designMemoPlaceholder: 'e.g. Black background with white text, large material name, elegant mood that communicates the local story', goProductInfo: 'Go to product information', previewTitle: 'Label placement preview', previewLead: 'When you change the container, this work area changes its aspect ratio to match the label area.', containerColor: 'Container color', lidColor: 'Cap color', logoSize: 'Logo size', madeSize: 'MADE IN JAPAN size',
  infoTitle: 'Product name, desired price, and contact', productName: 'Desired product name', productNamePlaceholder: 'e.g. Kawazu Mineral Salt Achieve', desiredPrice: 'Desired selling price', desiredPricePlaceholder: 'e.g. JPY 2,980 incl. tax', priceNote: 'The final selling price may not match your request. Mother Vegetable will decide the final price.', name: 'Name', namePlaceholder: 'Taro Yamada', email: 'Email address', phone: 'Phone number', address: 'Address', addressPlaceholder: 'Tokyo...', requiredStep5: 'STEP 5 is required. You can proceed to confirmation after filling in all fields.', goConfirm: 'Go to confirmation',
  confirmTitle: 'Is this proposal correct?', course: 'Course', material: 'Material', ideaDetails: 'Idea details', containerAndCapacity: 'Container / Capacity', containerSpec: 'Container specifications', logo: 'Logo', position: 'Position', size: 'Size', designMethod: 'Design method', manual: 'Manual adjustment', noMemo: 'No memo entered', productAndPrice: 'Product name / Desired price', contact: 'Contact', notEntered: 'Not entered',
  agreements: [
    'I understand that the monthly USD 200 fee (or JPY 30,000 + tax) will not be charged until the proposal passes review.',
    'I understand that after approval, I will proceed to Maker registration and payment.',
    'I understand that Mazavege will support the production cost for the first 100 units, and 101 or more units can be produced at 30% of the selling price.',
    'I understand that if the product does not sell out within one month, I will purchase the remaining inventory at the amount after deducting the 10% Maker royalty.',
  ],
  submit: 'Submit', submitNote: 'After submission, you will receive a confirmation email. Review results will generally be sent by email within two weeks.',
  logoResize: 'Logo size handle', logoAria: 'Mazavege logo', madeAria: 'Made in Japan mark', madeResize: 'Made in Japan size handle', uploadedAlt: 'Uploaded label design',
};

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function MakerApplyFlow({ locale }: { locale: string }) {
  const [ideaCourse, setIdeaCourse] = useState<'new-idea' | 'mix-match' | ''>('');
  const [query, setQuery] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [rawMaterialIds, setRawMaterialIds] = useState<string[]>([]);
  const [motherVegetableId, setMotherVegetableId] = useState('');
  const [containerId, setContainerId] = useState('');
  const [containerVariantId, setContainerVariantId] = useState('');
  const [containerColor, setContainerColor] = useState('');
  const [lidColor, setLidColor] = useState('');
  const [capacity, setCapacity] = useState('');
  const [capacityConfirmed, setCapacityConfirmed] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [logoId, setLogoId] = useState(logos[0].id);
  const [logoX, setLogoX] = useState(50);
  const [logoY, setLogoY] = useState(36);
  const [logoScale, setLogoScale] = useState(100);
  const [madeMarkX, setMadeMarkX] = useState(50);
  const [madeMarkY, setMadeMarkY] = useState(86);
  const [madeMarkScale, setMadeMarkScale] = useState(100);
  const [selectedPreviewItem, setSelectedPreviewItem] = useState<'logo' | 'made' | null>(null);
  const [labelBg, setLabelBg] = useState('#101010');
  const [designImagePreview, setDesignImagePreview] = useState('');
  const [designImageName, setDesignImageName] = useState('');
  const [designMode, setDesignMode] = useState<'manual' | 'ai'>('manual');
  const [labelDesignChoice, setLabelDesignChoice] = useState<'manual' | 'ai' | ''>('');
  const [makerStory, setMakerStory] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [aiConcept, setAiConcept] = useState('');
  const [designMemo, setDesignMemo] = useState('');
  const [newIdeaCategory, setNewIdeaCategory] = useState('');
  const [newIdeaTarget, setNewIdeaTarget] = useState('');
  const [newIdeaIngredients, setNewIdeaIngredients] = useState('');
  const [newIdeaStep3Open, setNewIdeaStep3Open] = useState(false);
  const [productName, setProductName] = useState('');
  const [desiredPrice, setDesiredPrice] = useState('');
  const [applicantName, setApplicantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreements, setAgreements] = useState<string[]>([]);
  const rawMaterialSection = useRef<HTMLElement>(null);
  const motherVegetableSection = useRef<HTMLElement>(null);
  const ideaSection = useRef<HTMLElement>(null);
  const containerSection = useRef<HTMLElement>(null);
  const containerVariantSection = useRef<HTMLDivElement>(null);
  const containerColorSection = useRef<HTMLDivElement>(null);
  const lidColorSection = useRef<HTMLDivElement>(null);
  const designSection = useRef<HTMLElement>(null);
  const detailSection = useRef<HTMLElement>(null);
  const confirmSection = useRef<HTMLElement>(null);

  const selectedRawMaterials = rawMaterials.filter((item) => rawMaterialIds.includes(item.id));
  const selectedRaw = selectedRawMaterials[0] ?? rawMaterials[0];
  const selectedMotherVegetable = motherVegetableOptions.find((item) => item.id === motherVegetableId);
  const selectedContainer = containers.find((item) => item.id === containerId) ?? containers[0];
  const selectedLogo = logos.find((item) => item.id === logoId) ?? logos[0];
  const selectedContainerVariant = selectedContainer.variants.find((item) => item.id === containerVariantId) ?? selectedContainer.variants[0];
  const selectedLabelSize = selectedContainerVariant.labelSize;
  const capacityOptions = selectedContainer.variants.filter((variant, index, variants) => variants.findIndex((item) => item.capacity === variant.capacity) === index).slice(0, 3);
  const isContainerDetailComplete = Boolean(containerVariantId && containerColor && lidColor);
  const isDesignStepOpen = isContainerDetailComplete && capacityConfirmed;

  const isEnglish = locale === 'en';
  const ui = isEnglish ? enUi : null;
  const isNewIdea = ideaCourse === 'new-idea';
  const isMixMatch = ideaCourse === 'mix-match';
  const newIdeaComplete = Boolean(newIdeaCategory.trim() && newIdeaTarget.trim() && newIdeaIngredients.trim());
  const canShowMotherVegetable = isNewIdea || (isMixMatch && rawMaterialIds.length > 0);
  const canShowContainer = Boolean(motherVegetableId && (isMixMatch || (isNewIdea && newIdeaComplete && newIdeaStep3Open)));
  const availableContainers = useMemo(() => {
    if (!isMixMatch || selectedRawMaterials.length === 0) return containers;
    const sharedIds = selectedRawMaterials.reduce<string[] | null>((shared, item) => {
      if (shared === null) return item.allowedContainerIds;
      return shared.filter((id) => item.allowedContainerIds.includes(id));
    }, null);
    return containers.filter((item) => (sharedIds ?? []).includes(item.id));
  }, [isMixMatch, selectedRawMaterials]);
  const term = (value: string) => isEnglish ? (enTerm[value] ?? value) : value;
  const rawName = (item: RawMaterial) => isEnglish ? (enRawMaterials[item.id]?.name ?? item.name) : item.name;
  const rawRegion = (item: RawMaterial) => isEnglish ? (enRawMaterials[item.id]?.region ?? item.region) : item.region;
  const rawCategory = (item: RawMaterial) => isEnglish ? (enRawMaterials[item.id]?.category ?? item.category) : item.category;
  const rawStory = (item: RawMaterial) => isEnglish ? (enRawMaterials[item.id]?.story ?? item.story) : item.story;
  const rawTag = (item: RawMaterial, tag: string) => isEnglish ? (enRawMaterials[item.id]?.tags[tag] ?? term(tag)) : tag;
  const containerName = (item: ContainerItem) => isEnglish ? (enContainers[item.id]?.name ?? item.name) : item.name;
  const containerNote = (item: ContainerItem) => isEnglish ? (enContainers[item.id]?.note ?? item.note) : item.note;
  const containerTag = (item: ContainerItem, tag: string) => isEnglish ? (enContainers[item.id]?.tags[tag] ?? term(tag)) : tag;
  const variantName = (variant: ContainerVariant) => isEnglish ? (enContainers[selectedContainer.id]?.variants[variant.name] ?? variant.name) : variant.name;
  const logoName = (name: string) => isEnglish ? name.replace(' ロゴ ', ' Logo ') : name;
  const uiText = (ja: string, en: string) => isEnglish ? en : ja;
  const agreementsText = isEnglish ? enUi.agreements : [
    '審査が通過したら月額200ドル（または月額30,000円＋税）の支払いが発生します',
    '審査が通過したらMaker登録と支払い手続きへ進むことを確認しました。',
    '初回100個分の製造費はMazavege社が支援し、101個以上は販売価格の30%で製造可能であることを確認しました。',
    '1ヶ月間で完売できなかった場合、売れ残り分をMakerロイヤリティ10%を差し引いた金額で買い取る条件を確認しました。',
  ];

  const filteredMaterials = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rawMaterials.filter((item) => {
      const text = [item.name, item.region, item.category, item.story, ...item.tags].join(' ').toLowerCase();
      return (!q || text.includes(q))
        && (selectedRegions.length === 0 || selectedRegions.includes(item.region))
        && (selectedCategories.length === 0 || selectedCategories.includes(item.category))
        && (selectedTags.length === 0 || selectedTags.every((tag) => item.tags.includes(tag)));
    });
  }, [query, selectedRegions, selectedCategories, selectedTags]);

  const isStep4Complete = Boolean(productName.trim() && desiredPrice.trim() && applicantName.trim() && email.trim() && phone.trim() && address.trim());
  const canSubmit = isStep4Complete && agreements.length === 4;

  function jumpTo(ref: React.RefObject<HTMLElement | HTMLDivElement | null>, delay = 80) {
    window.setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), delay);
  }

  function resetFlowAfterCourse() {
    setRawMaterialIds([]);
    setMotherVegetableId('');
    setContainerId('');
    setContainerVariantId('');
    setContainerColor('');
    setLidColor('');
    setCapacity('');
    setCapacityConfirmed(false);
    setLabelDesignChoice('');
    setDetailOpen(false);
    setConfirmOpen(false);
    setNewIdeaCategory('');
    setNewIdeaTarget('');
    setNewIdeaIngredients('');
    setNewIdeaStep3Open(false);
    setAgreements([]);
  }

  function chooseCourse(course: 'new-idea' | 'mix-match') {
    setIdeaCourse(course);
    resetFlowAfterCourse();
    jumpTo(course === 'new-idea' ? motherVegetableSection : rawMaterialSection, 120);
  }

  function resetAfterRawMaterialChange() {
    setMotherVegetableId('');
    setContainerId('');
    setContainerVariantId('');
    setContainerColor('');
    setLidColor('');
    setCapacity('');
    setCapacityConfirmed(false);
    setLabelDesignChoice('');
    setDetailOpen(false);
    setConfirmOpen(false);
  }

  function toggleRawMaterial(item: RawMaterial) {
    setRawMaterialIds((current) => {
      if (current.includes(item.id)) return current.filter((id) => id !== item.id);
      const selectedItems = rawMaterials.filter((raw) => current.includes(raw.id));
      const canAddToCurrent = item.mixable && selectedItems.every((raw) => raw.mixable);
      return canAddToCurrent ? [...current, item.id] : [item.id];
    });
    resetAfterRawMaterialChange();
  }

  function getPointerPercent(event: React.PointerEvent<HTMLElement>, relativeTo: HTMLElement = event.currentTarget) {
    const rect = relativeTo.getBoundingClientRect();
    const x = Math.round(((event.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((event.clientY - rect.top) / rect.height) * 100);
    return {
      x: Math.min(95, Math.max(5, x)),
      y: Math.min(95, Math.max(5, y)),
    };
  }

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }

  function onPreviewPointer(event: React.PointerEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    setSelectedPreviewItem(null);
  }

  function onLogoPointer(event: React.PointerEvent<HTMLElement>) {
    event.stopPropagation();
    setSelectedPreviewItem('logo');
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const labelArea = event.currentTarget.parentElement;
    if (!labelArea) return;
    const point = getPointerPercent(event, labelArea);
    setLogoX(point.x);
    setLogoY(point.y);
  }

  function onLogoResizePointer(event: React.PointerEvent<HTMLElement>) {
    event.stopPropagation();
    setSelectedPreviewItem('logo');
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const labelArea = event.currentTarget.closest('[data-label-area="true"]') as HTMLElement | null;
    if (!labelArea) return;
    const rect = labelArea.getBoundingClientRect();
    const centerX = rect.left + (logoX / 100) * rect.width;
    const centerY = rect.top + (logoY / 100) * rect.height;
    const distance = Math.max(Math.abs(event.clientX - centerX), Math.abs(event.clientY - centerY));
    setLogoScale(clamp(Math.round(distance), 45, 150));
  }

  function onMadeMarkPointer(event: React.PointerEvent<HTMLDivElement>) {
    event.stopPropagation();
    setSelectedPreviewItem('made');
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const labelArea = event.currentTarget.parentElement;
    if (!labelArea) return;
    const point = getPointerPercent(event, labelArea);
    setMadeMarkX(point.x);
    setMadeMarkY(point.y);
  }

  function onMadeMarkResizePointer(event: React.PointerEvent<HTMLElement>) {
    event.stopPropagation();
    setSelectedPreviewItem('made');
    event.currentTarget.setPointerCapture?.(event.pointerId);
    const labelArea = event.currentTarget.closest('[data-label-area="true"]') as HTMLElement | null;
    if (!labelArea) return;
    const rect = labelArea.getBoundingClientRect();
    const centerX = rect.left + (madeMarkX / 100) * rect.width;
    const centerY = rect.top + (madeMarkY / 100) * rect.height;
    const distance = Math.max(Math.abs(event.clientX - centerX), Math.abs(event.clientY - centerY));
    setMadeMarkScale(clamp(Math.round((distance / 64) * 100), 45, 160));
  }

  function handleDesignImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setDesignImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => setDesignImagePreview(typeof reader.result === 'string' ? reader.result : '');
    reader.readAsDataURL(file);
  }

  function generateAiLabelDesign() {
    const selectedRawNames = selectedRawMaterials.map((item) => item.name).join(' + ');
    const selectedRawStories = selectedRawMaterials.map((item) => item.story).join(' / ');
    const name = productName.trim() || (isNewIdea ? newIdeaCategory.trim() || 'New Mother Vegetable Product' : selectedRawNames || selectedRaw.name);
    const audience = targetAudience.trim() || '地域の背景や作り手の想いに共感してくれる人';
    const story = makerStory.trim() || (isNewIdea ? `使用原料: ${newIdeaIngredients || '未入力'} / ターゲット: ${newIdeaTarget || '未入力'}` : selectedRawStories || selectedRaw.story);
    const hasCosmeticMaterial = selectedRawMaterials.some((item) => item.category.includes('化粧'));
    const suggestedBg = (isNewIdea ? newIdeaCategory : hasCosmeticMaterial ? '化粧品向け' : selectedRaw.category).includes('化粧') ? '#15231d' : '#101010';
    setDesignMode('ai');
    if (!productName.trim()) setProductName(name);
    setLabelBg(suggestedBg);
    setLogoX(50);
    setLogoY(16);
    setLogoScale(74);
    setMadeMarkX(50);
    setMadeMarkY(90);
    setMadeMarkScale(78);
    setAiConcept(`${name}は、${audience}に届けたい商品です。${story} 余白を活かした上品な黒基調で、素材名・地域性・自然感が一目で伝わるラベルにします。`);
    setDesignMemo(`AI提案: ${name} / 対象: ${audience} / ストーリー: ${story}`);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    window.location.href = `/${locale}/maker/apply/thanks`;
  }

  return (
    <form onSubmit={submit} className="bg-black text-white">
      <section className="relative overflow-hidden px-6 py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,199,96,0.18),transparent_46%)]" />
        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#25C760]">Mazavege Maker Application</p>
          <h1 className="mt-4 text-4xl font-black md:text-6xl">{ui?.heroTitle ?? 'いますぐ、あなたの夢を叶えよう'}</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-300">
            {ui?.heroLead ?? 'テーラーメイドであなただけの特別な商品を開発しましょう。審査が通過してあなたが承認するまで、月額費用は発生いたしませんのでご安心ください。'}
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#25C760]/25 bg-[#25C760]/[0.05] p-6 md:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#25C760]">Course Select</p>
          <h2 className="mt-3 text-3xl font-black">{ui?.courseTitle ?? 'アイデアのコースを選択する'}</h2>
          <p className="mt-3 max-w-3xl text-gray-300">{ui?.courseLead ?? 'まず、どの作り方でMaker商品を提案するか選んでください。'}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <button type="button" onClick={() => chooseCourse('new-idea')} className={`rounded-[1.75rem] border p-6 text-left transition ${isNewIdea ? 'border-[#25C760] bg-[#25C760]/15 shadow-[0_0_24px_rgba(37,199,96,0.22)]' : 'border-white/10 bg-black/35 hover:border-[#25C760]/50'}`}>
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#25C760]">New Idea</span>
              <h3 className="mt-3 text-2xl font-black">{ui?.newIdea ?? 'New Idea'}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-300">{ui?.newIdeaLead ?? 'Mother Vegetableを使った全く新しい商品を作る'}</p>
            </button>
            <button type="button" onClick={() => chooseCourse('mix-match')} className={`rounded-[1.75rem] border p-6 text-left transition ${isMixMatch ? 'border-[#25C760] bg-[#25C760]/15 shadow-[0_0_24px_rgba(37,199,96,0.22)]' : 'border-white/10 bg-black/35 hover:border-[#25C760]/50'}`}>
              <span className="text-xs font-black uppercase tracking-[0.24em] text-[#25C760]">Mix & Match</span>
              <h3 className="mt-3 text-2xl font-black">{ui?.mixMatch ?? 'Mix & Match'}</h3>
              <p className="mt-4 text-sm leading-7 text-gray-300">{ui?.mixMatchLead ?? '日本各地で作られる高品質の食品/化粧品とコラボする'}</p>
            </button>
          </div>
        </div>
      </section>

      {isMixMatch && (
      <section ref={rawMaterialSection} className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border-b border-white/10 pb-6">
            <p className="text-sm font-bold text-[#25C760]">STEP 01</p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">{ui?.rawTitle ?? 'Japanese Raw Materialを選ぶ'}</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-24">
              <h3 className="text-xl font-black">{ui?.filters ?? '検索・絞り込み'}</h3>
              <label className="mt-5 block text-sm font-bold text-gray-300">{ui?.searchLabel ?? '地域・素材名で検索'}</label>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={ui?.searchPlaceholder ?? '例：河津町、味噌、化粧水'} className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
              <FilterGroup title={ui?.region ?? '地域'} items={regions} selected={selectedRegions} onChange={(item) => setSelectedRegions(toggle(selectedRegions, item))} displayItem={term} />
              <FilterGroup title={ui?.usage ?? '用途'} items={categories} selected={selectedCategories} onChange={(item) => setSelectedCategories(toggle(selectedCategories, item))} displayItem={term} />
              <FilterGroup title={ui?.featureTags ?? '特徴タグ'} items={tagOptions} selected={selectedTags} onChange={(item) => setSelectedTags(toggle(selectedTags, item))} displayItem={term} />
          </aside>

          <div>
            <div className="mb-6 flex justify-end">
              <p className="text-sm text-gray-400">{filteredMaterials.length}{ui?.count ?? '件'}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredMaterials.map((item) => (
                <label key={item.id} className={`group cursor-pointer overflow-hidden rounded-[1.75rem] border bg-white/[0.035] transition ${rawMaterialIds.includes(item.id) ? 'border-[#25C760] shadow-[0_0_24px_rgba(37,199,96,0.25)]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                  <input type="checkbox" name="rawMaterial" value={item.id} checked={rawMaterialIds.includes(item.id)} onChange={() => toggleRawMaterial(item)} className="sr-only" />
                  <div className="relative h-44 overflow-hidden bg-white/5">
                    <img src={item.image} alt={isEnglish ? `${rawName(item)} material photo` : `${item.name}の素材写真`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    <span className={`absolute left-4 top-4 rounded-full border px-3 py-1.5 text-xs font-black shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur ${item.mixable ? 'border-[#25C760]/70 bg-[#25C760]/90 text-black' : 'border-white/45 bg-black/70 text-white'}`}>
                      {item.mixable ? uiText('複数組み合わせOK', 'Mixable') : uiText('単体での使用のみ', 'Single use only')}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-black">{rawName(item)}</h3>
                        <p className="mt-1 text-sm text-[#25C760]">{rawRegion(item)} / {rawCategory(item)}</p>
                      </div>
                      <span className="rounded-full border border-[#25C760]/40 px-3 py-1 text-xs font-bold text-[#25C760]">{rawMaterialIds.includes(item.id) ? uiText('選択中', 'Selected') : (ui?.select ?? '選択')}</span>
                    </div>
                    <p className="mt-4 min-h-16 text-sm leading-6 text-gray-300">{rawStory(item)}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{rawTag(item, tag)}</span>)}
                    </div>
                  </div>
                </label>
              ))}
            </div>
            {rawMaterialIds.length > 0 && (
              <div className="sticky bottom-6 z-20 mt-8 rounded-[1.5rem] border border-[#25C760]/30 bg-[#1C1D1D]/95 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.45)] backdrop-blur md:flex md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold text-[#25C760]">{uiText(`${rawMaterialIds.length}件の素材を選択中`, `${rawMaterialIds.length} material(s) selected`)}</p>
                  <p className="mt-1 text-xs text-gray-300">{selectedRawMaterials.map(rawName).join(' / ')}</p>
                </div>
                <button type="button" onClick={() => jumpTo(motherVegetableSection, 120)} className="mt-4 rounded-full bg-[#25C760] px-7 py-3 text-sm font-black text-black md:mt-0">
                  {uiText('Step2へ進む', 'Proceed to Step 2')}
                </button>
              </div>
            )}
          </div>
        </div>
        </div>
      </section>
      )}

      {canShowMotherVegetable && (
      <section ref={motherVegetableSection} className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold text-[#25C760]">{isNewIdea ? 'STEP 01' : 'STEP 02'}</p>
          <h2 className="mt-2 text-3xl font-black">{isNewIdea ? (ui?.mvNewTitle ?? '使用するMother Vegetableを選択する') : (ui?.mvTitle ?? '組み合わせるMother Vegetableを選択する')}</h2>
          <p className="mt-4 max-w-3xl text-gray-300">{isNewIdea ? (ui?.mvNewLead ?? 'どのMother Vegetableを使用するか選んでください。') : (ui?.mvLead ?? '選んだJapanese Raw Materialと、どのMother Vegetableを組み合わせるか選んでください。')}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {motherVegetableOptions.map((item) => (
              <label key={item.id} className={`relative overflow-hidden cursor-pointer rounded-[1.75rem] border bg-white/[0.04] p-6 transition ${motherVegetableId === item.id ? 'border-[#25C760] shadow-[0_0_24px_rgba(37,199,96,0.22)]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                <span className={`pointer-events-none absolute inset-0 opacity-80 ${item.id === 'achieve' ? 'bg-[radial-gradient(circle_at_50%_8%,rgba(37,199,96,0.34),transparent_32%),radial-gradient(circle_at_18%_78%,rgba(37,199,96,0.14),transparent_34%)]' : item.id === 'confidence' ? 'bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.26),transparent_34%),radial-gradient(circle_at_80%_78%,rgba(255,255,255,0.10),transparent_38%)]' : 'bg-[radial-gradient(circle_at_24%_16%,rgba(37,199,96,0.28),transparent_34%),radial-gradient(circle_at_76%_18%,rgba(255,255,255,0.22),transparent_34%),radial-gradient(circle_at_50%_82%,rgba(37,199,96,0.12),transparent_36%)]'}`} />
                <span className="pointer-events-none absolute inset-0 bg-black/35" />
                <span className="relative z-10 block">
                <input
                  type="radio"
                  name="motherVegetable"
                  value={item.id}
                  checked={motherVegetableId === item.id}
                  onChange={() => { setMotherVegetableId(item.id); setContainerId(''); setContainerVariantId(''); setContainerColor(''); setLidColor(''); setCapacity(''); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); setNewIdeaStep3Open(false); jumpTo(isNewIdea ? ideaSection : containerSection, 120); }}
                  className="sr-only"
                />
                <p className={`text-xs font-black uppercase tracking-[0.22em] ${item.id === 'confidence' && !isEnglish ? 'text-white' : 'text-[#25C760]'}`}>
                  {item.id === 'both' && !isEnglish ? <><span>Achieve</span><span className="text-white"> + Confidence</span></> : term(item.category)}
                </p>
                <h3 className={`mt-3 text-2xl font-black ${item.id === 'achieve' ? 'text-[#25C760]' : ''}`}>{item.id === 'achieve' ? 'Achieve' : item.id === 'confidence' ? 'Confidence' : (isEnglish ? term(item.name) : item.name)}</h3>
                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-300">{isEnglish ? (item.id === 'achieve' ? '48 types of nutrients with impurity risks such as heavy metals reduced as much as possible. Known for its beautiful green color.' : item.id === 'confidence' ? 'A natural amorphous silica powder with about 97% purity that meets Japan’s MHLW quasi-drug ingredient standards. It has been evaluated as Premium Food Powder Grade under FDA-standard testing in the United States and can be used for both cosmetics and food.' : 'For those who want to develop products using both Achieve and Confidence.') : item.description}</p>
                </span>
              </label>
            ))}
          </div>
        </div>
      </section>
      )}

      {isNewIdea && motherVegetableId && (
      <section ref={ideaSection} className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold text-[#25C760]">STEP 02</p>
          <h2 className="mt-2 text-3xl font-black">{ui?.ideaTitle ?? 'あなたのアイデアを教えてください'}</h2>
          <p className="mt-4 max-w-3xl text-gray-300">{ui?.ideaLead ?? '何を作りたいのか、自由に記入してください。'}</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <Input label={ui?.productCategory ?? '商品分類'} value={newIdeaCategory} onChange={(value) => { setNewIdeaCategory(value); setContainerId(''); setContainerVariantId(''); setContainerColor(''); setLidColor(''); setCapacity(''); setCapacityConfirmed(false); setNewIdeaStep3Open(false); setDetailOpen(false); setConfirmOpen(false); }} placeholder={ui?.productCategoryPlaceholder ?? '例）化粧水、シャンプー、ラーメン、ベーグル など'} />
            <TextareaInput label={ui?.ideaTarget ?? 'ターゲット層'} value={newIdeaTarget} onChange={(value) => { setNewIdeaTarget(value); setContainerId(''); setContainerVariantId(''); setContainerColor(''); setLidColor(''); setCapacity(''); setCapacityConfirmed(false); setNewIdeaStep3Open(false); setDetailOpen(false); setConfirmOpen(false); }} placeholder={ui?.ideaTargetPlaceholder ?? '年齢や性別、居住地域など'} />
            <TextareaInput label={ui?.ideaIngredients ?? '使用原料'} value={newIdeaIngredients} onChange={(value) => { setNewIdeaIngredients(value); setContainerId(''); setContainerVariantId(''); setContainerColor(''); setLidColor(''); setCapacity(''); setCapacityConfirmed(false); setNewIdeaStep3Open(false); setDetailOpen(false); setConfirmOpen(false); }} placeholder={ui?.ideaIngredientsPlaceholder ?? '自由記入'} />
          </div>
          {!newIdeaComplete && <p className="mt-4 text-sm font-bold text-[#25C760]">{ui?.requiredIdea ?? 'STEP 2はすべて必須入力です。全項目を入力するとSTEP03へ進めます。'}</p>}
          {newIdeaComplete && (
            <button type="button" onClick={() => { setNewIdeaStep3Open(true); jumpTo(containerSection, 120); }} className="mt-8 rounded-full bg-[#25C760] px-8 py-4 font-black text-black">
              {ui?.goStep3 ?? 'Step03へ進む'}
            </button>
          )}
        </div>
      </section>
      )}

      {canShowContainer && (
      <section ref={containerSection} className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold text-[#25C760]">STEP 03</p>
          <h2 className="mt-2 text-3xl font-black">{ui?.containerTitle ?? 'どのような容器を使いたいですか？'}</h2>
          <p className="mt-4 max-w-3xl text-gray-300">{ui?.containerLead ?? '選んだ素材に合わせて、まず容器の形状を1つ選んでください。形状を選ぶと、次にサイズ・色・仕様の候補が表示されます。'}</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {availableContainers.map((item) => (
              <label key={item.id} className={`cursor-pointer rounded-[1.75rem] border bg-white/[0.04] p-6 transition ${containerId === item.id ? 'border-[#25C760] shadow-[0_0_24px_rgba(37,199,96,0.22)]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                <input type="radio" name="container" value={item.id} checked={containerId === item.id} onChange={() => { setContainerId(item.id); setContainerVariantId(''); setContainerColor(''); setLidColor(''); setCapacity(''); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); jumpTo(containerVariantSection, 120); }} className="sr-only" />
                <div className="relative -mx-6 -mt-6 h-44 overflow-hidden rounded-t-[1.75rem] bg-white/5"><img src={item.image} alt={isEnglish ? `${containerName(item)} container photo` : `${item.name}の容器写真`} className="h-full w-full object-cover transition duration-500 hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" /></div>
                <h3 className="mt-5 text-2xl font-black">{containerName(item)}</h3>
                <p className="mt-1 text-sm font-bold text-[#25C760]">{ui?.estimatedCapacity ?? '目安容量'}: {item.capacity}</p>
                <p className="mt-2 inline-flex rounded-full border border-[#25C760]/35 px-3 py-1 text-xs font-bold text-[#25C760]">{isEnglish ? `${item.variants.length} ${ui?.chooseFrom}` : `${item.variants.length}候補から選択`}</p>
                <p className="mt-4 text-sm leading-6 text-gray-300">{containerNote(item)}</p>
                <div className="mt-4 flex flex-wrap gap-2">{item.tags.map((tag) => <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{containerTag(item, tag)}</span>)}</div>
              </label>
            ))}
          </div>
          {containerId && (
          <div ref={containerVariantSection} className="mt-12 scroll-mt-24 rounded-[2rem] border border-[#25C760]/25 bg-[#25C760]/[0.04] p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-bold text-[#25C760]">{ui?.specLabel ?? '容器の詳細仕様'}</p>
                <h3 className="mt-2 text-2xl font-black">{isEnglish ? `${containerName(selectedContainer)}${ui?.specTitleSuffix}` : `${selectedContainer.name}の仕様を選ぶ`}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-300">
                  {ui?.specLead ?? '容量・容器色・蓋色を順番に選びます。'}
                </p>
              </div>
              <span className="rounded-full border border-[#25C760]/35 px-4 py-2 text-sm font-bold text-[#25C760]">{ui?.threeSteps ?? '3ステップ'}</span>
            </div>

            <div className="mt-8 space-y-8">
              <ChoiceGroup title={ui?.capacityTitle ?? '1. 容量を選ぶ'} note={ui?.capacityNote ?? '容量を選ぶと、ラベルのサイズも決定します。'}>
                {capacityOptions.map((variant) => (
                  <TextChoice
                    key={variant.id}
                    name="containerCapacity"
                    checked={containerVariantId === variant.id}
                    onChange={() => { setContainerVariantId(variant.id); setCapacity(variant.capacity); setContainerColor(''); setLidColor(''); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); }}
                    title={variant.capacity}
                    detail={isEnglish ? `${ui?.labelArea}: ${ui?.width}${variant.labelSize.widthMm}mm × ${ui?.height}${variant.labelSize.heightMm}mm` : `ラベル範囲: 横${variant.labelSize.widthMm}mm × 縦${variant.labelSize.heightMm}mm`}
                  />
                ))}
              </ChoiceGroup>

              {containerVariantId && (
                <div ref={containerColorSection} className="scroll-mt-24">
                <ChoiceGroup title={ui?.colorTitle ?? '2. 容器の色を選ぶ'}>
                  {containerColorOptions.map((color) => (
                    <TextChoice
                      key={color}
                      name="containerColor"
                      checked={containerColor === color}
                      onChange={() => { setContainerColor(color); setLidColor(''); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); }}
                      title={term(color)}
                    />
                  ))}
                </ChoiceGroup>
                </div>
              )}

              {containerVariantId && containerColor && (
                <div ref={lidColorSection} className="scroll-mt-24">
                <ChoiceGroup title={ui?.lidTitle ?? '3. 蓋の色を選ぶ'}>
                  {lidColorOptions.map((color) => (
                    <TextChoice
                      key={color}
                      name="lidColor"
                      checked={lidColor === color}
                      onChange={() => { setLidColor(color); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); }}
                      title={term(color)}
                    />
                  ))}
                </ChoiceGroup>
                </div>
              )}
            </div>
          </div>
          )}

          {isContainerDetailComplete && (
          <div className="mt-8 max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <label className="text-sm font-bold text-gray-300">
                {ui?.desiredCapacity ?? '希望内容量'}
                <input value={capacity} onChange={(e) => { setCapacity(e.target.value); setCapacityConfirmed(false); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); }} placeholder={ui?.desiredCapacityPlaceholder ?? '例：100ml / 80g / 30包'} className="mt-2 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760] md:min-w-[260px]" />
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#25C760]/30 bg-[#25C760]/10 p-4 text-sm font-bold leading-6 text-gray-100">
                <input type="checkbox" checked={capacityConfirmed} onChange={(e) => { setCapacityConfirmed(e.target.checked); setLabelDesignChoice(''); setDetailOpen(false); setConfirmOpen(false); if (e.target.checked) jumpTo(designSection, 120); }} className="mt-1 h-5 w-5 accent-[#25C760]" />
                <span>{ui?.capacityConfirm ?? 'この容量でOKであればチェック'}</span>
              </label>
            </div>
          </div>
          )}
        </div>
      </section>
      )}

      {isDesignStepOpen && (
      <section ref={designSection} className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm font-bold text-[#25C760]">STEP 04</p>
            <h2 className="mt-2 text-3xl font-black">{ui?.labelTitle ?? 'ラベルデザイン'}</h2>
            <p className="mt-4 max-w-3xl text-gray-300">{ui?.labelLead ?? 'Mother Vegetableロゴを選び、ロゴとMade in Japanマークのサイズを調整します。位置はプレビュー上で直接ドラッグできます。'}</p>

            <div className="mt-8">
              <p className="text-sm font-bold text-gray-300">{ui?.chooseLogo ?? 'Mother Vegetableロゴを選ぶ'}</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {logos.map((logo) => (
                  <label key={logo.id} className={`cursor-pointer rounded-3xl border bg-white/[0.04] p-4 transition ${logoId === logo.id ? 'border-[#25C760]' : 'border-white/10 hover:border-[#25C760]/50'}`}>
                    <input type="radio" name="logo" value={logo.id} checked={logoId === logo.id} onChange={() => setLogoId(logo.id)} className="sr-only" />
                    <div className={`flex h-32 items-center justify-center rounded-2xl p-4 ${logo.id === 'logo-3' ? 'bg-white' : 'bg-black'}`}><img src={logo.src} alt={logoName(logo.name)} className="max-h-full max-w-full object-contain" /></div>
                    <p className="mt-3 text-sm font-bold">{logoName(logo.name)}</p>
                  </label>
                ))}
              </div>
            </div>

            <>
              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <label className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">{ui?.bgColor ?? '背景色'}
                  <input type="color" value={labelBg} onChange={(e) => setLabelBg(e.target.value)} className="mt-3 h-12 w-full rounded-xl bg-black" />
                </label>
                <label className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">{ui?.upload ?? 'ラベルデザイン画像をアップロード'}
                  <input type="file" accept="image/*" onChange={handleDesignImageUpload} className="mt-3 block w-full text-sm text-gray-300 file:mr-4 file:rounded-full file:border-0 file:bg-[#25C760] file:px-4 file:py-2 file:font-bold file:text-black" />
                  {designImageName && <span className="mt-3 block text-xs leading-5 text-[#25C760]">{ui?.selectedFile ?? '選択中'}: {designImageName}</span>}
                </label>
              </div>
              <label className="mt-5 block rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">{ui?.designMemo ?? 'デザイン希望メモ'}
                <textarea value={designMemo} onChange={(e) => setDesignMemo(e.target.value)} rows={5} placeholder={ui?.designMemoPlaceholder ?? '例：黒背景に白文字、素材名を大きく、地域の物語が伝わる上品な雰囲気にしたい'} className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
              </label>
            </>

            <button type="button" onClick={() => { setDetailOpen(true); setConfirmOpen(false); jumpTo(detailSection); }} className="mt-8 rounded-full bg-[#25C760] px-8 py-4 font-black text-black">{ui?.goProductInfo ?? '商品情報へ進む'}</button>
          </div>

          <div className="rounded-[2rem] border border-[#25C760]/30 bg-white/[0.04] p-6">
            <h3 className="text-xl font-black">{ui?.previewTitle ?? 'ラベル配置プレビュー'}</h3>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-[#25C760]">
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{containerName(selectedContainer)}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{selectedContainerVariant.capacity}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{ui?.containerColor ?? '容器色'}: {term(containerColor)}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{ui?.lidColor ?? '蓋色'}: {term(lidColor)}</span>
              <span className="rounded-full border border-[#25C760]/35 px-3 py-1">{ui?.labelArea ?? 'ラベル範囲'}: {isEnglish ? `${ui?.width}${selectedLabelSize.widthMm}mm × ${ui?.height}${selectedLabelSize.heightMm}mm` : `横${selectedLabelSize.widthMm}mm × 縦${selectedLabelSize.heightMm}mm`}</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-gray-400">
              {ui?.previewLead ?? '容器を変えると、この作業エリアの縦横比もラベル範囲に合わせて変わります。'}
            </p>
            <div className="mt-5 flex min-h-[540px] items-center justify-center rounded-[2rem] border border-white/10 bg-black/35 p-5">
              <div
                onPointerDown={onPreviewPointer}
                data-label-area="true"
                className="relative w-full max-w-[360px] overflow-hidden rounded-[1.35rem] border-2 border-dashed border-[#25C760]/70 shadow-[0_0_28px_rgba(37,199,96,0.18)]"
                style={{
                  aspectRatio: `${selectedLabelSize.widthMm} / ${selectedLabelSize.heightMm}`,
                  maxHeight: 500,
                  background: labelBg,
                }}
              >
                {designImagePreview && (
                  <img
                    src={designImagePreview}
                    alt={ui?.uploadedAlt ?? 'アップロードしたラベルデザイン'}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div
                  onPointerDown={onLogoPointer}
                  onPointerMove={(e) => e.buttons === 1 && onLogoPointer(e)}
                  className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none select-none p-1 active:cursor-grabbing ${selectedPreviewItem === 'logo' ? 'outline outline-2 outline-[#25C760]' : ''}`}
                  style={{ left: `${logoX}%`, top: `${logoY}%` }}
                  aria-label={ui?.logoAria ?? 'マザベジロゴ'}
                >
                  <img
                    src={selectedLogo.src}
                    alt="selected logo"
                    draggable={false}
                    className="block object-contain"
                    style={{ width: `${logoScale * 2}px`, maxWidth: '260px', maxHeight: '180px' }}
                  />
                  {selectedPreviewItem === 'logo' && (
                    <div
                      onPointerDown={onLogoResizePointer}
                      onPointerMove={(e) => e.buttons === 1 && onLogoResizePointer(e)}
                      className="absolute -bottom-3 -right-3 h-6 w-6 cursor-nwse-resize rounded-full border-2 border-black bg-[#25C760] shadow-[0_0_0_2px_rgba(255,255,255,0.85)]"
                      aria-label={ui?.logoResize ?? 'ロゴサイズ調整'}
                    />
                  )}
                </div>
                <MadeInJapanMark
                  x={madeMarkX}
                  y={madeMarkY}
                  scale={madeMarkScale}
                  selected={selectedPreviewItem === 'made'}
                  onPointerDown={onMadeMarkPointer}
                  onPointerMove={(e) => e.buttons === 1 && onMadeMarkPointer(e)}
                  onResizePointer={onMadeMarkResizePointer}
                />
              </div>
            </div>
            <div className="mt-5 grid gap-4 text-sm text-gray-300">
              <label>{ui?.logoSize ?? 'ロゴサイズ'}: {logoScale}%<input type="range" min="45" max="150" value={logoScale} onChange={(e) => setLogoScale(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
              <label>{ui?.madeSize ?? 'MADE IN JAPAN サイズ'}: {madeMarkScale}%<input type="range" min="45" max="160" value={madeMarkScale} onChange={(e) => setMadeMarkScale(Number(e.target.value))} className="w-full accent-[#25C760]" /></label>
            </div>

          </div>
        </div>
      </section>
      )}

      {detailOpen && (
      <section ref={detailSection} className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold text-[#25C760]">STEP 05</p>
          <h2 className="mt-2 text-3xl font-black">{ui?.infoTitle ?? '商品名・希望価格・連絡先'}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Input label={ui?.productName ?? '希望商品名'} value={productName} onChange={setProductName} placeholder={ui?.productNamePlaceholder ?? '例：Kawazu Mineral Salt Achieve'} />
            <Input label={ui?.desiredPrice ?? '希望販売価格'} value={desiredPrice} onChange={setDesiredPrice} placeholder={ui?.desiredPricePlaceholder ?? '例：税込 2,980円'} note={ui?.priceNote ?? '販売価格は希望通りにならない場合があります。最終価格はMother Vegetable社が決定します。'} />
            <Input label={ui?.name ?? 'お名前'} value={applicantName} onChange={setApplicantName} placeholder={ui?.namePlaceholder ?? '山田 太郎'} />
            <Input label={ui?.email ?? 'メールアドレス'} value={email} onChange={setEmail} placeholder="example@example.com" type="email" />
            <Input label={ui?.phone ?? '電話番号'} value={phone} onChange={setPhone} placeholder="090-0000-0000" />
            <Input label={ui?.address ?? '住所'} value={address} onChange={setAddress} placeholder={ui?.addressPlaceholder ?? '東京都...'} />
          </div>
          {!isStep4Complete && <p className="mt-4 text-sm font-bold text-[#25C760]">{ui?.requiredStep5 ?? 'STEP 5はすべて必須入力です。全項目を入力すると確認画面へ進めます。'}</p>}
          <button type="button" disabled={!isStep4Complete} onClick={() => { if (!isStep4Complete) return; setConfirmOpen(true); jumpTo(confirmSection); }} className="mt-8 rounded-full bg-[#25C760] px-8 py-4 font-black text-black transition disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300">{ui?.goConfirm ?? '確認画面へ進む'}</button>
        </div>
      </section>
      )}

      {confirmOpen && (
      <section ref={confirmSection} className="px-6 py-16 pb-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#25C760]/30 bg-[#25C760]/[0.06] p-6 md:p-10">
          <p className="text-sm font-bold text-[#25C760]">STEP 06</p>
          <h2 className="mt-2 text-3xl font-black">{ui?.confirmTitle ?? 'ご提案内容のご確認'}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Summary label={ui?.course ?? 'コース'} value={isNewIdea ? (ui?.newIdea ?? 'New Idea') : (ui?.mixMatch ?? 'Mix & Match')} />
            {isMixMatch ? (
              <Summary label={ui?.material ?? '素材'} value={isNewIdea ? (ui?.notEntered ?? '未入力') : selectedRawMaterials.map((item) => `${rawName(item)}（${rawRegion(item)}）`).join(' / ')} />
            ) : (
              <Summary label={ui?.ideaDetails ?? 'アイデア内容'} value={`${ui?.productCategory ?? '商品分類'}: ${newIdeaCategory || (ui?.notEntered ?? '未入力')} / ${ui?.ideaTarget ?? 'ターゲット層'}: ${newIdeaTarget || (ui?.notEntered ?? '未入力')} / ${ui?.ideaIngredients ?? '使用原料'}: ${newIdeaIngredients || (ui?.notEntered ?? '未入力')}`} />
            )}
            <Summary label="Mother Vegetable" value={selectedMotherVegetable ? `${isEnglish ? term(selectedMotherVegetable.name) : selectedMotherVegetable.name}（${term(selectedMotherVegetable.category)}）` : (ui?.notEntered ?? '未選択')} />
            <Summary label={ui?.containerAndCapacity ?? '容器・内容量'} value={`${containerName(selectedContainer)} / ${variantName(selectedContainerVariant)} / ${capacity}`} />
            <Summary label={ui?.containerSpec ?? '容器仕様'} value={`${ui?.containerColor ?? '容器色'}: ${term(containerColor)} / ${ui?.lidColor ?? '蓋色'}: ${term(lidColor)}`} />
            <Summary label={ui?.labelArea ?? 'ラベル範囲'} value={isEnglish ? `${ui?.width}${selectedLabelSize.widthMm}mm × ${ui?.height}${selectedLabelSize.heightMm}mm` : `横${selectedLabelSize.widthMm}mm × 縦${selectedLabelSize.heightMm}mm`} />
            <Summary label={ui?.logo ?? 'ロゴ'} value={`${logoName(selectedLogo.name)} / ${ui?.position ?? '位置'} ${logoX}%・${logoY}% / ${ui?.size ?? 'サイズ'} ${logoScale}%`} />
            <Summary label="Made in Japan" value={`${ui?.position ?? '位置'} ${madeMarkX}%・${madeMarkY}% / ${ui?.size ?? 'サイズ'} ${madeMarkScale}%`} />
            <Summary label={ui?.designMethod ?? 'デザイン方法'} value={`${ui?.manual ?? '手動調整'} / ${designMemo || (ui?.noMemo ?? 'メモ未入力')}`} />
            <Summary label={ui?.productAndPrice ?? '商品名・希望価格'} value={`${productName || (ui?.notEntered ?? '未入力')} / ${desiredPrice || (ui?.notEntered ?? '未入力')}`} />
            <Summary label={ui?.name ?? 'お名前'} value={applicantName || (ui?.notEntered ?? '未入力')} />
            <Summary label={ui?.contact ?? '連絡先'} value={`${email || (ui?.notEntered ?? '未入力')} / ${phone || (ui?.notEntered ?? '未入力')}`} />
          </div>
          <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-black/40 p-6">
            {agreementsText.map((item) => (
              <label key={item} className="flex gap-3 text-sm leading-6 text-gray-300">
                <input type="checkbox" checked={agreements.includes(item)} onChange={() => setAgreements(toggle(agreements, item))} className="mt-1 h-5 w-5 accent-[#25C760]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
          <button type="submit" disabled={!canSubmit} className="mt-8 rounded-full bg-[#25C760] px-10 py-4 font-black text-black transition disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300">{ui?.submit ?? '送信する'}</button>
          <p className="mt-4 text-sm text-gray-400">{ui?.submitNote ?? '送信後、控えメールが届きます。審査結果は原則2週間以内にメールでご連絡します。'}</p>
        </div>
      </section>
      )}
    </form>
  );
}



function MadeInJapanMark({
  x,
  y,
  scale,
  selected,
  onPointerDown,
  onPointerMove,
  onResizePointer,
}: {
  x: number;
  y: number;
  scale: number;
  selected: boolean;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onResizePointer: (event: React.PointerEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      className={`absolute z-10 w-[128px] cursor-grab select-none p-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] active:cursor-grabbing ${selected ? 'outline outline-2 outline-[#25C760]' : ''}`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `translate(-50%, -50%) scale(${scale / 100})`,
        transformOrigin: 'center',
        touchAction: 'none',
      }}
      aria-label={enUi.madeAria}
    >
      <img
        src="/Images/Assets/made-in-japan-mark.png"
        alt="Made in Japan"
        className="block h-auto w-full select-none"
        draggable={false}
      />
      {selected && (
        <div
          onPointerDown={onResizePointer}
          onPointerMove={(e) => e.buttons === 1 && onResizePointer(e)}
          className="absolute -bottom-3 -right-3 h-6 w-6 cursor-nwse-resize rounded-full border-2 border-black bg-[#25C760] shadow-[0_0_0_2px_rgba(255,255,255,0.85)]"
          aria-label={enUi.madeResize}
        />
      )}
    </div>
  );
}

function FilterGroup({ title, items, selected, onChange, displayItem = (item) => item }: { title: string; items: string[]; selected: string[]; onChange: (item: string) => void; displayItem?: (item: string) => string }) {
  return (
    <div className="mt-6">
      <p className="text-sm font-black text-white">{title}</p>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <label key={item} className="flex items-center gap-3 text-sm text-gray-300">
            <input type="checkbox" checked={selected.includes(item)} onChange={() => onChange(item)} className="h-4 w-4 accent-[#25C760]" />
            <span>{displayItem(item)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, note, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; note?: string; type?: string }) {
  return (
    <label className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">
      {label}
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]" />
      {note && <span className="mt-2 block text-xs leading-5 text-gray-500">{note}</span>}
    </label>
  );
}

function TextareaInput({ label, value, onChange, placeholder, rows = 6 }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; rows?: number }) {
  return (
    <label className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 text-sm font-bold text-gray-300">
      {label}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="mt-3 w-full resize-y rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-[#25C760]"
      />
    </label>
  );
}



function ChoiceGroup({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-lg font-black text-white">{title}</h4>
      {note && <p className="mt-2 text-xs leading-5 text-gray-400">{note}</p>}
      <div className="mt-4 grid gap-3 md:grid-cols-3">{children}</div>
    </div>
  );
}

function TextChoice({
  name,
  checked,
  onChange,
  title,
  detail,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  detail?: string;
}) {
  return (
    <label className={`cursor-pointer rounded-2xl border p-4 transition ${checked ? 'border-[#25C760] bg-[#25C760]/15 shadow-[0_0_18px_rgba(37,199,96,0.18)]' : 'border-white/10 bg-black/35 hover:border-[#25C760]/50'}`}>
      <input type="radio" name={name} checked={checked} onChange={onChange} className="sr-only" />
      <span className="block text-base font-black text-white">{title}</span>
      {detail && <span className="mt-2 block text-xs font-bold leading-5 text-[#25C760]">{detail}</span>}
    </label>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#25C760]">{label}</p>
      <p className="mt-1 font-bold text-gray-100">{value}</p>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 p-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#25C760]">{label}</p>
      <p className="mt-2 text-gray-200">{value}</p>
    </div>
  );
}
