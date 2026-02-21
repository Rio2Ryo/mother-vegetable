'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const benefitCategories = [
  { title: 'Children', image: '/Images/Assets/homepage/foodFunction/children.png', items: ['Improves concentration', 'Enhances learning ability', 'Supports bone growth', 'Boosts immunity', 'Increases appetite'] },
  { title: 'Adults', image: '/Images/Assets/homepage/foodFunction/alduts.png', items: ['Improves constipation and digestion', 'Enhances sleep quality', 'Reduces fatigue', 'Suppresses cellular aging and inflammation', 'Supports dieting*'] },
  { title: 'Seniors', image: '/Images/Assets/homepage/foodFunction/seniors.png', items: ['Improves sleep quality and blood circulation', 'Boosts appetite and nutrient intake', 'Supports internal organ function', 'Promotes bone density'] },
  { title: 'Athletes', image: '/Images/Assets/homepage/foodFunction/athletes.png', items: ['Detoxifies additives', 'Aids muscle recovery and improves endurance', 'Provides efficient nutrient absorption', 'Reduces inflammation and supports recovery', 'Enhances training effectiveness'] },
  { title: 'Dog', image: '/Images/Assets/homepage/foodFunction/dog.png', items: ['Reduces tear stains', 'Improves waste odor', 'Increases appetite', 'Supports digestive health', 'Promotes deep sleep', 'Reduces body odor'] },
  { title: 'Cat', image: '/Images/Assets/homepage/foodFunction/cat.png', items: ['Reduces tear stains', 'Improves waste odor', 'Increases appetite', 'Supports digestive health', 'Promotes deep sleep', 'Reduces body odor'] },
];

const nutrients = [
  { name: 'Essential Fatty Acids', count: '9 types' },
  { name: 'Amino Acids', count: '10 types' },
  { name: 'Vital Vitamins', count: '18 types' },
  { name: 'Key Minerals For Balance', count: '3 types' },
  { name: 'Other Functional Ingredients', count: '9 types' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export default function FoodFunctionSection() {
  return (
    <motion.div
      className="bg-black border border-[#25C760] rounded-xl p-[10px] sm:p-[30px] md:p-10 my-5 md:my-10 transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_15px_40px_rgba(37,199,96,0.2)]"
      id="food-function"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title mb-2.5">Food Function</h2>
      <h3 className="text-center text-white font-normal text-[1.5rem] max-[767px]:text-[0.9rem] mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
        <span>Achieve</span> / <span>Forever</span>
      </h3>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-2 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
      <h6 className="text-center text-[#dc3545] mb-8 max-[767px]:text-[0.5rem]" style={{ fontFamily: 'Arial, sans-serif' }}>TORIKOMU / MAZEKOMU</h6>

      {/* Function Diagram - VERTICAL layout: video on top, bracket below, circles at bottom */}
      <div className="flex flex-col items-center mb-10">
        {/* Test tube video */}
        <motion.div
          className="mb-0 -ml-2.5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <video className="max-w-[150px] max-[767px]:max-w-[90px] h-auto rounded-lg" autoPlay muted loop playsInline>
            <source src="/Images/Assets/homepage/product/food_video.mov" type="video/mp4" />
          </video>
        </motion.div>

        {/* Bracket image */}
        <div className="mb-5 max-[767px]:mb-0 leading-[0]">
          <Image
            src="/Images/Assets/homepage/bracket_v2.png"
            alt="Bracket"
            width={800}
            height={40}
            className="w-full max-w-[800px] h-auto transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Nutrient circles - horizontal row matching original */}
        <motion.div
          className="flex justify-between w-full max-w-[800px] gap-[1%]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {nutrients.map((n) => (
            <motion.div
              key={n.name}
              variants={circleVariants}
              className="bg-[#3C8063] rounded-full w-[19%] aspect-square flex flex-col items-center justify-center text-center p-2.5 max-[767px]:p-1.5 transition-all duration-300 hover:scale-110 hover:shadow-[0_10px_25px_rgba(37,199,96,0.4)] relative z-[2] flex-shrink-0"
            >
              <span className="text-white text-[clamp(0.7rem,1vw+0.5rem,1rem)] max-[767px]:text-[clamp(0.4rem,0.85vw+0.45rem,0.7rem)] max-[405px]:text-[clamp(0.4rem,0.85vw+0.45rem,0.47rem)] font-light leading-tight block" style={{ fontFamily: 'Arial, sans-serif' }}>{n.name}</span>
              <span className="text-white text-[clamp(0.7rem,1vw+0.5rem,1rem)] max-[767px]:text-[clamp(0.4rem,0.85vw+0.45rem,0.7rem)] max-[405px]:text-[clamp(0.4rem,0.85vw+0.45rem,0.47rem)] font-light leading-tight block" style={{ fontFamily: 'Arial, sans-serif' }}>{n.count}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 48 Nutrition summary */}
      <motion.div
        className="text-center mt-10 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-[#25C760] font-bold text-[2rem] max-[1024px]:text-[1.6rem] max-[767px]:text-[1.2rem] max-[620px]:text-[1rem] mb-5" style={{ fontFamily: 'Arial, sans-serif' }}>48 Nutrients</h4>
        <p className="text-white text-[1rem] max-[1024px]:text-[0.9rem] max-[767px]:text-[0.9rem] max-[620px]:text-[0.8rem] max-[530px]:text-[0.75rem] max-[490px]:text-[0.7rem] max-[405px]:text-[0.6rem] leading-[1.6] text-center max-w-[800px] mx-auto opacity-90" style={{ fontFamily: 'Arial, sans-serif' }}>
          Potassium, sodium, magnesium, calcium, phosphorus, iron, manganese, zinc, copper, Vitamin A, B1, B2, B3, B5, B6, B9, C, E, K, tryptophan, threonine, leucine, isoleucine, lysine, methionine, phenylalanine, valine, histidine, arginine, cystine, tyrosine, alanine, aspartic acid, glutamic acid, serine, glycine, proline, saturated fatty acids, omega-3 fatty acids, omega-6 fatty acids, C-phycocyanin, chlorophyll a, total carotenoids, nucleic acids, spirulan, glycogen-like polysaccharides, &beta;-glucan-like polysaccharides, cellulose.
        </p>
      </motion.div>

      {/* Benefits grid: 2 columns on sm+, matching original layout with 30%/70% split */}
      <motion.div
        className="pt-[5%]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
          {benefitCategories.map((cat) => (
            <motion.div key={cat.title} variants={cardVariants} className="flex justify-center py-3 px-2">
              <div className="flex w-full max-w-[500px]">
                {/* Image - 30% width */}
                <div className="w-[30%] max-[575px]:w-[20%] flex justify-end pr-3">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={200}
                    height={200}
                    className="w-full h-auto max-h-[200px] max-[1024px]:max-h-[150px] max-[767px]:max-h-[100px] object-contain"
                  />
                </div>
                {/* Content - 70% width */}
                <div className="w-[70%] max-[575px]:w-[80%]">
                  <h4 className="text-[#25C760] font-bold text-[1.4rem] max-[1024px]:text-[1.2rem] max-[767px]:text-[1rem] max-[490px]:text-[0.9rem] max-[370px]:text-[0.8rem] mb-0" style={{ fontFamily: 'Arial, sans-serif' }}>{cat.title}</h4>
                  <div className="w-full max-w-[500px] h-[2px] bg-[#25C760] rounded-[1px] my-1.5" />
                  <ul className="list-disc list-inside text-white text-[1.1rem] max-[1024px]:text-[0.9rem] max-[767px]:text-[0.8rem] max-[490px]:text-[0.7rem] max-[370px]:text-[0.6rem] leading-relaxed opacity-90 space-y-0" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {cat.items.map((item) => (<li key={item}>{item}</li>))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
