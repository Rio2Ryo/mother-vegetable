'use client';

import Image from 'next/image';
import { getProductBySlug } from '@/data/products';
import { STORY_TAGS, getProposerTagDef } from '@/data/tags';

function getStoryTagLabel(key: string, isJa: boolean): string {
  const def = STORY_TAGS.find((s) => s.key === key);
  if (!def) return key;
  return isJa ? def.labelJa : def.labelEn;
}

function getCategoryLabel(category: string, isJa: boolean): string {
  if (category === 'food') return isJa ? 'フード' : 'Food';
  if (category === 'cosmetic') return isJa ? 'コスメ' : 'Cosmetic';
  if (category === 'pet') return isJa ? 'ペット' : 'Pet';
  return category;
}

export default function ProductMetaBadges({ slug, isJa }: { slug: string; isJa: boolean }) {
  const product = getProductBySlug(slug);
  if (!product) return null;

  const proposerKey = product.proposerTags?.[0] ?? (product.tier === 'product100' ? 'マザーベジタブル社' : undefined);
  const proposer = proposerKey ? getProposerTagDef(proposerKey) : undefined;
  const storyTags = product.storyTags ?? [];
  const regionTags = product.regionTags ?? [];

  return (
    <div className="w-full rounded-2xl border border-[#25C760]/25 bg-[#07120b] p-3 text-white shadow-lg">
      <div className="mb-2 flex flex-wrap items-center gap-1.5">
        <span className="rounded-full bg-[#25C760] px-2 py-0.5 text-[10px] font-bold text-black">
          {getCategoryLabel(product.category, isJa)}
        </span>
        {storyTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[#25C760]/35 bg-[#25C760]/15 px-2 py-0.5 text-[10px] font-semibold text-[#25C760]"
          >
            {getStoryTagLabel(tag, isJa)}
          </span>
        ))}
        {regionTags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-gray-100"
          >
            {tag}
          </span>
        ))}
      </div>

      {(product.producer || product.region || proposer) && (
        <div className="flex items-center gap-2 text-[11px] leading-snug text-gray-100">
          {proposer?.faceImage && (
            <span className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[#25C760]/50">
              <Image src={proposer.faceImage} alt={proposer.labelJa} fill className="object-cover" sizes="28px" />
            </span>
          )}
          <div className="min-w-0">
            {proposer && (
              <p className="truncate font-semibold text-[#25C760]">
                {isJa ? '発案者: ' : 'Proposer: '}{isJa ? proposer.labelJa : proposer.labelEn}
              </p>
            )}
            {(product.producer || product.region) && (
              <p className="truncate text-gray-200">
                {[product.producer, product.region].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
