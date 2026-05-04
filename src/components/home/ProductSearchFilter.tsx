'use client';

import { useEffect, useMemo, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Search, X, MapPin } from 'lucide-react';
import { REGION_TAGS, STORY_TAGS } from '@/data/tags';
import type { HomeProductCard } from '@/data/products';

export interface FilterState {
  q: string;
  regions: string[];
  stories: string[];
}

export const EMPTY_FILTER: FilterState = { q: '', regions: [], stories: [] };

interface Props {
  products: HomeProductCard[];
  value: FilterState;
  onChange: (next: FilterState) => void;
  /** Children render-prop receives the filtered products array. */
  children: (filtered: HomeProductCard[]) => ReactNode;
}

/**
 * Build a normalized URL query string from the current filter state.
 * Empty fields are omitted; arrays are joined with commas.
 */
function buildQueryString(value: FilterState): string {
  const params = new URLSearchParams();
  if (value.q.trim()) params.set('q', value.q.trim());
  if (value.regions.length > 0) params.set('region', value.regions.join(','));
  if (value.stories.length > 0) params.set('story', value.stories.join(','));
  return params.toString();
}

/** Parse a comma-separated URL query value into a unique string array. */
export function parseFilterFromSearchParams(
  searchParams: URLSearchParams,
): FilterState {
  const q = searchParams.get('q') ?? '';
  const regionRaw = searchParams.get('region') ?? '';
  const storyRaw = searchParams.get('story') ?? '';
  const regions = regionRaw
    ? Array.from(new Set(regionRaw.split(',').map((s) => s.trim()).filter(Boolean)))
    : [];
  const stories = storyRaw
    ? Array.from(new Set(storyRaw.split(',').map((s) => s.trim()).filter(Boolean)))
    : [];
  return { q, regions, stories };
}

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function isFilterActive(value: FilterState): boolean {
  return value.q.trim().length > 0 || value.regions.length > 0 || value.stories.length > 0;
}

/**
 * Match a single product against the current filter. AND across categories,
 * AND within each category (every selected region/story must be present).
 */
function matchesFilter(p: HomeProductCard, value: FilterState): boolean {
  // Keyword (case-insensitive substring across several text fields).
  const q = value.q.trim().toLowerCase();
  if (q) {
    const haystack = [
      p.name,
      p.tagline,
      p.subtitle ?? '',
      p.producer ?? '',
      p.region ?? '',
      ...(p.regionTags ?? []),
      ...(p.storyTags ?? []),
      ...(p.features ?? []),
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(q)) return false;
  }

  // Regions: every selected region must appear in product.regionTags.
  if (value.regions.length > 0) {
    const set = new Set(p.regionTags ?? []);
    for (const r of value.regions) {
      if (!set.has(r)) return false;
    }
  }

  // Stories: every selected story must appear in product.storyTags.
  if (value.stories.length > 0) {
    const set = new Set(p.storyTags ?? []);
    for (const s of value.stories) {
      if (!set.has(s)) return false;
    }
  }

  return true;
}

export default function ProductSearchFilter({
  products,
  value,
  onChange,
  children,
}: Props) {
  const locale = useLocale();
  const isJa = locale === 'ja';
  const router = useRouter();
  const pathname = usePathname();

  // Sync URL whenever filter state changes (parent owns the state).
  useEffect(() => {
    const qs = buildQueryString(value);
    const target = qs ? `${pathname}?${qs}` : pathname;
    router.replace(target, { scroll: false });
    // We intentionally only depend on serialized state to avoid loops.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.q, value.regions.join(','), value.stories.join(','), pathname]);

  // Compute the set of region/story tags that actually appear on at least one product.
  const availableRegions = useMemo(() => {
    const present = new Set<string>();
    products.forEach((p: HomeProductCard) =>
      (p.regionTags ?? []).forEach((r: string) => present.add(r)),
    );
    // Preserve canonical order from REGION_TAGS where possible.
    const ordered: string[] = (REGION_TAGS as readonly string[]).filter((r) =>
      present.has(r),
    );
    // Append any region not in REGION_TAGS (defensive for data drift).
    Array.from(present).forEach((r) => {
      if (!ordered.includes(r)) ordered.push(r);
    });
    return ordered;
  }, [products]);

  const availableStories = useMemo(() => {
    const present = new Set<string>();
    products.forEach((p: HomeProductCard) =>
      (p.storyTags ?? []).forEach((s: string) => present.add(s)),
    );
    return STORY_TAGS.filter((def) => present.has(def.key));
  }, [products]);

  const filtered = useMemo(
    () => products.filter((p) => matchesFilter(p, value)),
    [products, value],
  );

  const active = isFilterActive(value);

  const clearAll = () => onChange(EMPTY_FILTER);
  const setQ = (q: string) => onChange({ ...value, q });
  const toggleRegion = (r: string) =>
    onChange({ ...value, regions: toggleInArray(value.regions, r) });
  const toggleStory = (s: string) =>
    onChange({ ...value, stories: toggleInArray(value.stories, s) });

  const searchPlaceholder = isJa
    ? '商品名・地域・特徴で検索'
    : 'Search by name, region, or feature';
  const regionLabel = isJa ? '地域' : 'Region';
  const storyLabel = isJa ? 'ストーリー' : 'Story';
  const clearLabel = isJa ? 'すべてクリア' : 'Clear all';

  return (
    <>
      <div className="space-y-3 mb-4 md:mb-6">
        {/* Search row */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
            <input
              type="text"
              value={value.q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full pl-9 pr-9 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#25c760]/60 transition-colors"
            />
            {value.q && (
              <button
                type="button"
                onClick={() => setQ('')}
                aria-label={isJa ? '検索をクリア' : 'Clear search'}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {active && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-zinc-700 text-xs text-white/70 hover:border-[#25c760]/60 hover:text-white transition-colors whitespace-nowrap"
            >
              <X className="h-3.5 w-3.5" />
              <span>{clearLabel}</span>
            </button>
          )}
        </div>

        {/* Region chips */}
        {availableRegions.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[11px] text-white/50 mr-1">
              <MapPin className="h-3 w-3" />
              {regionLabel}:
            </span>
            {availableRegions.map((r) => {
              const selected = value.regions.includes(r);
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => toggleRegion(r)}
                  aria-pressed={selected}
                  className={
                    selected
                      ? 'rounded-full px-2.5 py-1 text-[11px] font-semibold bg-[#25c760] text-black border border-[#25c760] transition-colors'
                      : 'rounded-full px-2.5 py-1 text-[11px] border border-zinc-700 text-white/70 hover:border-[#25c760]/60 hover:text-white transition-colors'
                  }
                >
                  {r}
                </button>
              );
            })}
          </div>
        )}

        {/* Story chips */}
        {availableStories.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-white/50 mr-1">
              <span aria-hidden="true">✨</span> {storyLabel}:
            </span>
            {availableStories.map((def) => {
              const selected = value.stories.includes(def.key);
              const label = isJa ? def.labelJa : def.labelEn;
              return (
                <button
                  key={def.key}
                  type="button"
                  onClick={() => toggleStory(def.key)}
                  aria-pressed={selected}
                  className={
                    selected
                      ? 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold bg-[#25c760] text-black border border-[#25c760] transition-colors'
                      : 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] border border-zinc-700 text-white/70 hover:border-[#25c760]/60 hover:text-white transition-colors'
                  }
                >
                  <span aria-hidden="true">{def.icon}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-white/60">
          <p className="text-base mb-3">
            {isJa ? '該当する商品がありません' : 'No matching products'}
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="text-[#25c760] underline hover:opacity-80 transition-opacity"
          >
            {isJa ? 'フィルタをクリア' : 'Clear filters'}
          </button>
        </div>
      ) : (
        children(filtered)
      )}
    </>
  );
}
