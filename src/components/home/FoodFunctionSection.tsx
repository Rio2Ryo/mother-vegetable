import Image from 'next/image';

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

export default function FoodFunctionSection() {
  return (
    <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-10 mb-10" id="food-function">
      <h2 className="text-center font-bold text-2xl md:text-4xl text-[#25C760] tracking-wider mb-1">Food Function</h2>
      <h3 className="text-center text-[#25C760] text-lg mb-2">Achieve / Forever</h3>
      <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-2 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />
      <h6 className="text-center text-[#dc3545] mb-8">TORIKOMU / MAZEKOMU</h6>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
        <div className="flex justify-center">
          <video className="max-w-[100px] h-auto rounded-lg" autoPlay muted loop playsInline>
            <source src="/Images/Assets/homepage/product/food_video.mov" type="video/mp4" />
          </video>
        </div>
        <div className="flex justify-center">
          <Image src="/Images/Assets/homepage/bracket_v2.png" alt="Bracket" width={40} height={200} className="h-[200px] w-auto hidden md:block" />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {nutrients.map((n) => (
            <div key={n.name} className="w-[140px] h-[140px] rounded-full border-2 border-[#25C760] flex flex-col items-center justify-center text-center p-2">
              <span className="text-[#25C760] text-xs font-semibold leading-tight">{n.name}</span>
              <span className="text-[#25C760] text-xs mt-1">{n.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mb-8">
        <h4 className="text-[#25C760] font-bold text-2xl mb-3">48 Nutrition</h4>
        <p className="text-white text-sm md:text-base leading-relaxed max-w-[900px] mx-auto opacity-90">
          Packed with over 48 essential nutrients, Mother Vegetable delivers everything your body needs in one serving. It contains vital minerals like potassium, magnesium, calcium, iron, zinc, and copper; a full spectrum of vitamins, including A, B-complex, C, E, and K; and all the essential amino acids along with conditionally essential ones to support overall health.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {benefitCategories.map((cat) => (
          <div key={cat.title} className="flex gap-4 items-start">
            <div className="w-16 h-16 flex-shrink-0">
              <Image src={cat.image} alt={cat.title} width={64} height={64} className="w-full h-full object-contain" />
            </div>
            <div>
              <h4 className="text-[#25C760] font-bold text-base mb-1">{cat.title}</h4>
              <div className="w-12 h-0.5 bg-gradient-to-r from-[#25C760] to-[#3C8063] mb-2 rounded" />
              <ul className="list-disc list-inside text-white text-sm leading-relaxed opacity-90 space-y-0.5">
                {cat.items.map((item) => (<li key={item}>{item}</li>))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
