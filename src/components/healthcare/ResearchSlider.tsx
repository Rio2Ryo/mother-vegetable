'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ------------------------------------------------------------------ */
/*  Research Paper data                                                */
/* ------------------------------------------------------------------ */

interface ResearchPaper {
  title: string;
  year: string;
  source: string;
  preview: string;
  pdf: string;
}

const papers: ResearchPaper[] = [
  {
    title: 'ESPEN Micronutrient Guideline (2022)',
    year: '2022',
    source: 'ESPEN Practical Short Micronutrient',
    preview: '/Images/medical/pdf/ESPEN Practical Short Micronutrient Preview.jpg',
    pdf: '/Images/medical/pdf/ESPEN Practical Short Micronutrient.pdf',
  },
  {
    title: 'ASPEN Critical Care Guidelines (ICU, 2020)',
    year: '2020',
    source: 'ASPEN Consensus Recommendations for Refeeding Syndrome',
    preview: '/Images/medical/pdf/ASPEN Consensus Recommendations for Refeeding Syndrome Preview.jpg',
    pdf: '/Images/medical/pdf/ASPEN Consensus Recommendations for Refeeding Syndrome.pdf',
  },
  {
    title: 'High-Leucine Essential Amino Acid Supplementation Study',
    year: '2019',
    source: "Leucine's Role in Muscle Protein Synthesis in Young and Elderly",
    preview: "/Images/medical/pdf/Leucine's Role in Muscle Protein Synthesis in Young and Elderly Preview.jpg",
    pdf: "/Images/medical/pdf/Leucine's Role in Muscle Protein Synthesis in Young and Elderly.pdf",
  },
  {
    title: 'Micronutrients in Surgical Recovery (ERAS)',
    year: '2021',
    source: 'ESPEN Practical Guideline Clinical Nutrition in Surgery',
    preview: '/Images/medical/pdf/ESPEN Practical Guideline Clinical Nutrition in Surgery Preview.jpg',
    pdf: '/Images/medical/pdf/ESPEN Practical Guideline Clinical Nutrition in Surgery.pdf',
  },
  {
    title: 'Critical Care Patient Guidelines',
    year: '2023',
    source: 'Adult Crit 3 Patient Guidelines',
    preview: '/Images/medical/pdf/Adult Crit 3 Patient Guidelines Preview.jpg',
    pdf: '/Images/medical/pdf/Adult Crit 3 Patient Guidelines.pdf',
  },
  {
    title: 'Malnutrition in Adult Patients',
    year: '2022',
    source: 'Malnutrition in Adult Patients Africa Studies',
    preview: '/Images/medical/pdf/Malnutrition in Adult Patients Africa Studies Preview.jpg',
    pdf: '/Images/medical/pdf/Malnutrition in Adult Patients Africa Studies.pdf',
  },
  {
    title: 'All 45E Essentials Hospital Therapeutic Use',
    year: '2024',
    source: 'All 45 Essentials Hospital Therapeutic Use',
    preview: '/Images/medical/pdf/All 45 Essentials Hospital Therapeutic Use Preview.jpg',
    pdf: '/Images/medical/pdf/All 45 Essentials Hospital Therapeutic Use.pdf',
  },
  {
    title: 'All 45E Essentials \u2013 Your Daily Safety Net',
    year: '2024',
    source: 'All 45 Essentials \u2013 Your Daily Safety Net2',
    preview: '/Images/medical/pdf/All 45 Essentials \u2013 Your Daily Safety Net2 Preview.jpg',
    pdf: '/Images/medical/pdf/All 45 Essentials \u2013 Your Daily Safety Net2.pdf',
  },
];

/* ------------------------------------------------------------------ */
/*  Research Card                                                      */
/* ------------------------------------------------------------------ */

function ResearchCard({ paper }: { paper: ResearchPaper }) {
  return (
    <div className="bg-white rounded-3xl p-5 md:p-6 border border-gray-200 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)] h-full">
      {/* Preview image */}
      <div
        className="w-full h-[160px] sm:h-[180px] md:h-[200px] bg-gray-100 rounded-2xl mb-5 md:mb-6 bg-cover bg-top border border-gray-100"
        style={{ backgroundImage: `url('${paper.preview}')` }}
      />

      {/* Meta row: PDF badge + year */}
      <div className="flex justify-between items-center mb-4 md:mb-5">
        <span className="bg-[#BDF626] text-black text-[11px] font-medium px-4 py-1 rounded-md">
          PDF
        </span>
        <span className="text-[11px] text-gray-400">{paper.year}</span>
      </div>

      {/* Card footer (below divider) */}
      <div className="pt-4 md:pt-5 border-t border-gray-100 flex flex-col gap-3 flex-1">
        <h3 className="text-sm md:text-[15px] font-bold leading-[1.4] text-[#333] line-clamp-2">
          {paper.title}
        </h3>

        <div className="flex justify-between items-end w-full gap-3 mt-auto">
          <div>
            <a
              href={paper.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#036A31] font-semibold underline text-[11px] inline-flex items-center gap-1.5"
            >
              Read More
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <span className="block text-[11px] text-gray-400 mt-3 line-clamp-1">
              Source: &ldquo;{paper.source}.pdf&rdquo;
            </span>
          </div>

          <a
            href={paper.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#036A31] hover:text-white hover:border-[#036A31] transition-colors shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14" />
              <path d="M19 12l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Slider wrapper                                                     */
/* ------------------------------------------------------------------ */

export default function ResearchSlider() {
  const [idx, setIdx] = useState(0);
  const [perView, setPerView] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Responsive breakpoints matching live Swiper config:
     < 640  => 1 slide
     >= 640 => 2 slides
     >= 1024 => 3 slides */
  const calcPerView = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    const w = window.innerWidth;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  }, []);

  useEffect(() => {
    const sync = () => {
      const pv = calcPerView();
      setPerView(pv);
      setIdx((prev) => Math.min(prev, Math.max(0, papers.length - pv)));
    };
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, [calcPerView]);

  const maxIdx = Math.max(0, papers.length - perView);
  const prev = () => setIdx((i) => Math.max(i - 1, 0));
  const next = () => setIdx((i) => Math.min(i + 1, maxIdx));

  /* Each slide occupies 1/perView of the container (minus gaps).
     One "step" = slideWidth + gap.  We compute the offset in pixels
     using the container's measured width so calc() math is trivial. */
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.offsetWidth;
      const gap = perView >= 3 ? 30 : 20;
      const slideW = (cw - (perView - 1) * gap) / perView;
      setOffset(idx * (slideW + gap));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [idx, perView]);

  const gap = perView >= 3 ? 30 : 20;

  return (
    <div className="relative" ref={containerRef}>
      {/* Viewport */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-[600ms] ease-out"
          style={{
            gap: `${gap}px`,
            transform: `translateX(-${offset}px)`,
          }}
        >
          {papers.map((paper, i) => (
            <div
              key={paper.title + i}
              className="shrink-0"
              style={{
                width: `calc((100% - ${(perView - 1) * gap}px) / ${perView})`,
              }}
            >
              <ResearchCard paper={paper} />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        disabled={idx === 0}
        className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-10 lg:-left-14 w-10 h-10 flex items-center justify-center text-[#333] disabled:opacity-20 hover:text-[#036A31] transition-colors"
        aria-label="Previous slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        onClick={next}
        disabled={idx >= maxIdx}
        className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-10 lg:-right-14 w-10 h-10 flex items-center justify-center text-[#333] disabled:opacity-20 hover:text-[#036A31] transition-colors"
        aria-label="Next slide"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* View More */}
      <div className="text-center mt-8">
        <a
          href="#"
          className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#036A31] transition-colors"
        >
          View More
        </a>
      </div>
    </div>
  );
}
