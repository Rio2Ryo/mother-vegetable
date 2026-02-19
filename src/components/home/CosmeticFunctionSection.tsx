'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef, useCallback, useEffect } from 'react';

const concerns = [
  { name: 'Dark Spots', desc: 'Freckles' },
  { name: 'Acne', desc: 'Acne scars' },
  { name: 'Wounds', desc: 'Scars, Burn Marks' },
  { name: 'Odor', desc: 'Face, Neck, Underarms, V-Zone, Feet' },
  { name: 'Shine', desc: 'Maintains A Clean Look, Natural/ Earth Tones' },
];

const testimonials = [
  {
    header: 'Female, 50s',
    subtitle: 'After 3 weeks of use',
    description: '\u201CAs I got older, dark spots and under-eye shadows became more visible. After using this for a few weeks, my skin looked softer, brighter, and I felt confident again.\u201D',
    beforeImage: '/Images/Assets/homepage/beforeAfter/before_6.png',
    afterImage: '/Images/Assets/homepage/beforeAfter/after_6.png',
    beforeTitle: 'Before',
    beforeDesc: 'Noticeable dark spots and under-eye circles, with makeup easily coming off by afternoon.',
    afterTitle: 'After',
    afterDesc: 'Spots appeared lighter and more diffused, giving a brighter, even-toned look. Foundation stayed on better and looked smoother.',
  },
  {
    header: 'Woman in her 80s',
    subtitle: '1 month of use',
    description: '\u201CThe dark spots that had been prominent gradually faded, and my overall complexion became more even. I realized that even as we age, when we care for our skin properly, it truly responds.\u201D',
    beforeImage: '/Images/Assets/homepage/beforeAfter/before_7.png',
    afterImage: '/Images/Assets/homepage/beforeAfter/after_7.png',
    beforeTitle: 'Before',
    beforeDesc: 'Multiple dark spots on the arms and cheeks with an overall dull tone.',
    afterTitle: 'After',
    afterDesc: 'Spots have lightened, skin tone looks more even, and firmness has returned for renewed confidence in bare skin.',
  },
  {
    header: 'Female, 40s',
    subtitle: 'After 3 days of use',
    description: '\u201CI started using it together with my prescribed cream, and within three days the flakiness and redness noticeably improved. My skin felt smoother, less itchy, and much more comfortable. I\u2019ll definitely keep using it.\u201D',
    beforeImage: '/Images/Assets/homepage/beforeAfter/before_1.png',
    afterImage: '/Images/Assets/homepage/beforeAfter/after_1.png',
    beforeTitle: 'Before',
    beforeDesc: 'Visible dry patches and rough texture caused by dryness.',
    afterTitle: 'After',
    afterDesc: 'Redness visibly reduced, and small red spots became lighter and less noticeable.',
  },
  {
    header: 'Male, age 10',
    subtitle: 'After 10 days of use',
    description: '\u201CWe wanted to avoid using steroids, so we continued gentle daily care. In just 10 days, the flakiness and redness calmed down, and his skin looked much cleaner and smoother.\u201D',
    beforeImage: '/Images/Assets/homepage/beforeAfter/before_2.png',
    afterImage: '/Images/Assets/homepage/beforeAfter/after_2.png',
    beforeTitle: 'Before',
    beforeDesc: 'Visible dry patches and rough texture caused by dryness.',
    afterTitle: 'After',
    afterDesc: 'Redness visibly reduced, and small red spots became lighter and less noticeable.',
  },
  {
    header: 'Male, age 5',
    subtitle: 'After 2 days of use',
    description: '\u201CBecause his hands were easily irritated by hard water, we used this together with hand cream. Within just two days, the roughness faded and his skin became noticeably smoother.\u201D',
    beforeImage: '/Images/Assets/homepage/beforeAfter/before_5.png',
    afterImage: '/Images/Assets/homepage/beforeAfter/after_5.png',
    beforeTitle: 'Before',
    beforeDesc: 'Visible redness and dryness from the wrist to the back of the hand.',
    afterTitle: 'After',
    afterDesc: 'Skin appeared smoother, more even, and visibly healthier\u2014with a clean, natural glow even in photos.',
  },
  {
    header: 'Female, 50s',
    subtitle: 'After 10 hours of use',
    description: '\u201CI had been struggling with redness and swelling that wouldn\u2019t go away. After applying it before bed, the dryness eased, and by morning the redness had noticeably calmed.\u201D',
    beforeImage: '/Images/Assets/homepage/beforeAfter/before_3.png',
    afterImage: '/Images/Assets/homepage/beforeAfter/after_3.png',
    beforeTitle: 'Before',
    beforeDesc: 'Circular red area near the wrist with scabbing and visible inflammation.',
    afterTitle: 'After',
    afterDesc: 'Skin appeared more hydrated and even-toned, with reduced redness and swelling.',
  },
  {
    header: 'Female, 50s',
    subtitle: 'After 2 days of use',
    description: '\u201CMy burn hadn\u2019t healed for over a month, but after applying it at night, the dryness eased. Within 48 hours, the redness visibly calmed down and my skin felt more comfortable.\u201D',
    beforeImage: '/Images/Assets/homepage/beforeAfter/before_4.png',
    afterImage: '/Images/Assets/homepage/beforeAfter/after_4.png',
    beforeTitle: 'Before',
    beforeDesc: 'Persistent redness and dryness from an arm burn that hadn\u2019t improved for a month.',
    afterTitle: 'After',
    afterDesc: 'Skin looked clearer and healthier, with noticeably less irritation during daily activities.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

/* ------------------------------------------------------------------ */
/* Comparison Slider                                                    */
/* ------------------------------------------------------------------ */

function ComparisonSlider({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(newPos);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updatePosition(e.clientX);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current) return;
      if (e.touches[0]) updatePosition(e.touches[0].clientX);
    };
    const handleEnd = () => {
      isDragging.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [updatePosition]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDragging.current = true;
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    updatePosition(e.clientX);
  };

  return (
    <div className="my-4">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] overflow-hidden rounded-lg cursor-ew-resize select-none"
        onClick={handleContainerClick}
      >
        {/* After image (background) */}
        <Image
          src={afterImage}
          alt="After Treatment"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Before image (clipped) */}
        <Image
          src={beforeImage}
          alt="Before Treatment"
          fill
          className="object-cover"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-[3px] bg-white z-10"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-black text-xs font-bold select-none">&lsaquo; &rsaquo;</span>
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
            {Math.round(position)}%
          </div>
        </div>
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 pb-3 pointer-events-none z-10">
          <span className="text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded" style={{ opacity: position > 15 ? 1 : 0 }}>Before</span>
          <span className="text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded" style={{ opacity: position < 85 ? 1 : 0 }}>After</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Before & After Modal                                                 */
/* ------------------------------------------------------------------ */

function BeforeAfterModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Group testimonials into rows of 2
  const rows: (typeof testimonials)[] = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    rows.push(testimonials.slice(i, i + 2));
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-[#111] border border-[#25C760] rounded-2xl w-[95vw] max-w-[1100px] max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl hover:text-[#25C760] transition-colors z-10 leading-none"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Header */}
        <div className="text-center pt-8 pb-4 px-6">
          <h2 className="text-[#25C760] text-3xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>Confidence</h2>
          <p className="text-white text-lg mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>Before &amp; After</p>
        </div>

        {/* Testimonials */}
        <div className="px-4 md:px-8 pb-8 space-y-8">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {row.map((t, idx) => (
                <div key={`${rowIdx}-${idx}`} className="bg-black border border-[#25C760]/30 rounded-xl p-5">
                  {/* Testimonial header */}
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-[#25C760] font-bold text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{t.header}</p>
                    <span className="text-white/50">&middot;</span>
                    <p className="text-white/70 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{t.subtitle}</p>
                  </div>

                  {/* Quote */}
                  <p className="text-white/90 text-sm leading-relaxed mb-3 italic" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {t.description}
                  </p>

                  {/* Comparison slider */}
                  <ComparisonSlider beforeImage={t.beforeImage} afterImage={t.afterImage} />

                  {/* Before/After descriptions */}
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <h4 className="text-[#25C760] font-bold text-sm mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>{t.beforeTitle}</h4>
                      <p className="text-white/80 text-xs leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>{t.beforeDesc}</p>
                    </div>
                    <div>
                      <h4 className="text-[#25C760] font-bold text-sm mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>{t.afterTitle}</h4>
                      <p className="text-white/80 text-xs leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>{t.afterDesc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                       */
/* ------------------------------------------------------------------ */

export default function CosmeticFunctionSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="bg-black border border-[#25C760] rounded-xl p-[10px] sm:p-[30px] md:p-10 my-5 md:my-10 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]"
        id="cosmetic-function"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title mb-2.5">Cosmetic Function</h2>
        <h3 className="text-center text-white font-normal text-[1.5rem] max-[767px]:text-[0.9rem] mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
          Confidence
        </h3>
        <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-2 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
        <h6 className="text-center text-[#dc3545] mb-8 max-[767px]:text-[0.5rem]" style={{ fontFamily: 'Arial, sans-serif' }}>SURIKOMU / MAZEKOMU</h6>

        {/* Function Diagram - VERTICAL layout: video on top, bracket below, circles at bottom */}
        <div className="flex flex-col items-center mb-10">
          {/* Cosmetic video */}
          <motion.div
            className="mb-0 -ml-2.5"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <video className="max-w-[150px] max-[767px]:max-w-[90px] h-auto rounded-lg" autoPlay muted loop playsInline>
              <source src="/Images/Assets/homepage/product/cosmetic_video.mov" type="video/mp4" />
            </video>
          </motion.div>

          {/* Bracket image - horizontal spanning full width */}
          <div className="mb-5 max-[767px]:mb-0 leading-[0]">
            <Image
              src="/Images/Assets/homepage/bracket_v2.png"
              alt="Bracket"
              width={800}
              height={40}
              className="w-full max-w-[800px] h-auto transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          {/* Concern circles - horizontal row */}
          <motion.div
            className="flex justify-between w-full max-w-[800px] gap-[1%]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {concerns.map((c) => (
              <motion.div
                key={c.name}
                variants={circleVariants}
                className="bg-[#3C8063] rounded-full w-[19%] aspect-square flex flex-col items-center justify-center text-center p-2.5 max-[767px]:p-1.5 transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_25px_rgba(37,199,96,0.4)] relative z-[2] flex-shrink-0"
              >
                <span className="text-white text-[clamp(0.7rem,1vw+0.5rem,1rem)] max-[767px]:text-[clamp(0.4rem,0.85vw+0.45rem,0.7rem)] max-[405px]:text-[clamp(0.4rem,0.85vw+0.45rem,0.47rem)] font-light leading-tight block" style={{ fontFamily: 'Arial, sans-serif' }}>{c.name}</span>
                <span className="text-white text-[clamp(0.7rem,1vw+0.5rem,1rem)] max-[767px]:text-[0.55rem] max-[405px]:text-[clamp(0.4rem,0.85vw+0.45rem,0.44rem)] font-light leading-tight block" style={{ fontFamily: 'Arial, sans-serif' }}>{c.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Medical Grade Content - vertical: centered text, then centered video */}
        <motion.div
          className="flex flex-col gap-[15px] px-0 sm:px-[30px] rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center">
            <p className="text-white text-[1.1rem] max-[767px]:text-[0.9rem] max-[530px]:text-[0.85rem] max-[490px]:text-[0.7rem] max-[405px]:text-[0.6rem] leading-[1.7] text-center max-w-[800px] mx-auto opacity-95" style={{ fontFamily: 'Arial, sans-serif' }}>
              Mother Vegetable, certified as a medical-grade quasi-drug, is trusted by medical institutions worldwide for its healing properties — used in post-surgery recovery, burn scar improvement, cancer care, and even to help control skin shine. It supports the skin&apos;s natural ability to heal and restore balance.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <video className="max-w-[60%] max-[767px]:max-w-[80%] max-[530px]:max-w-full h-auto rounded-lg drop-shadow-[0_5px_15px_rgba(37,199,96,0.3)] transition-transform duration-300 hover:scale-[1.02]" autoPlay muted loop playsInline>
              <source src="/Images/Assets/homepage/product/skin.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>

        {/* Before & After button - pill/capsule style with glow */}
        <motion.div
          className="flex items-center justify-center my-[30px] max-[490px]:my-[15px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => setModalOpen(true)}
            className="group inline-flex items-center justify-center gap-2.5 py-3 px-[30px] max-[767px]:py-2.5 max-[767px]:px-[25px] max-[530px]:py-2 max-[530px]:px-5 max-[490px]:py-2 max-[490px]:px-[18px] border-2 border-[#25C760] rounded-[30px] bg-transparent text-[#25C760] font-semibold text-[1.1rem] max-[767px]:text-[0.95rem] max-[530px]:text-[0.85rem] max-[490px]:text-[0.75rem] transition-all duration-300 relative overflow-hidden shadow-[0_0_15px_rgba(37,199,96,0.2)] animate-[pulse-glow_2s_ease-in-out_infinite] hover:animate-none hover:bg-[#25C760] hover:text-black hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(37,199,96,0.4),0_0_30px_rgba(37,199,96,0.3)] active:-translate-y-[1px] active:shadow-[0_4px_15px_rgba(37,199,96,0.3)] cursor-pointer outline-none"
            type="button"
            style={{ fontFamily: 'Arial, sans-serif' }}
          >
            <span className="relative z-[1] text-[1.2rem] max-[490px]:text-[1rem] font-bold text-[#25C760] group-hover:text-white transition-colors duration-300">&#10003;</span>
            <span className="relative z-[1] group-hover:tracking-[1px] group-hover:text-white transition-all duration-300">Before &amp; After</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Before & After Modal */}
      <BeforeAfterModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
