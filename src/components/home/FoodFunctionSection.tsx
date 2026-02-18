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
  { name: 'Key Minerals For Balance', count: '2 types' },
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
      className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-10"
      id="food-function"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="section-title mb-1">Food Function</h2>
      <h3 className="text-center text-[#25C760] text-lg mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Achieve / Forever</h3>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-2 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
      <h6 className="text-center text-[#dc3545] mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>TORIKOMU / MAZEKOMU</h6>

      {/* Video + Bracket + Nutrient circles */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <video className="max-w-[100px] h-auto rounded-lg" autoPlay muted loop playsInline>
            <source src="/Images/Assets/homepage/product/food_video.mov" type="video/mp4" />
          </video>
        </motion.div>
        <div className="flex justify-center">
          <Image src="/Images/Assets/homepage/bracket_v2.png" alt="Bracket" width={40} height={200} className="h-[200px] w-auto hidden md:block" />
        </div>

        {/* Nutrient circles with stagger animation */}
        <motion.div
          className="flex flex-wrap justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {nutrients.map((n) => (
            <motion.div
              key={n.name}
              variants={circleVariants}
              className="w-[140px] h-[140px] rounded-full border-2 border-[#25C760] flex flex-col items-center justify-center text-center p-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,199,96,0.3)] hover:scale-105"
            >
              <span className="text-[#25C760] text-xs font-semibold leading-tight" style={{ fontFamily: 'Arial, sans-serif' }}>{n.name}</span>
              <span className="text-[#25C760] text-xs mt-1" style={{ fontFamily: 'Arial, sans-serif' }}>{n.count}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* 48 Nutrition description */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-[#25C760] font-bold text-2xl mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>48 Nutrition</h4>
        <p className="text-white text-sm md:text-base leading-relaxed max-w-[900px] mx-auto opacity-90" style={{ fontFamily: 'Arial, sans-serif' }}>
          Packed with over 48 essential nutrients, Mother Vegetable delivers everything your body needs in one serving. It contains vital minerals like potassium, magnesium, calcium, iron, zinc, and copper; a full spectrum of vitamins, including A, B-complex, C, E, and K; and all the essential amino acids along with conditionally essential ones to support overall health.
        </p>
      </motion.div>

      {/* Benefits grid: 2 columns on desktop */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {benefitCategories.map((cat) => (
          <motion.div key={cat.title} variants={cardVariants} className="flex gap-4 items-start">
            <div className="w-16 h-16 flex-shrink-0">
              <Image src={cat.image} alt={cat.title} width={64} height={64} className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="text-[#25C760] font-bold text-base mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>{cat.title}</h4>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#25C760] to-[#3C8063] mb-2 rounded" />
              <ul className="list-disc list-inside text-white text-sm leading-relaxed opacity-90 space-y-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>
                {cat.items.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
