import Image from 'next/image';
import Link from 'next/link';

const recipes = [
  {
    title: 'Curry Doria',
    description: 'Make a doria with curry mixed with Achieve',
    light: { label: 'Recommended amount for a light tint of color', items: ['Ingredients for 1 serving', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Ingredients for 1 serving', 'Achieve 1 stick'] },
  },
  {
    title: 'Soup Curry',
    description: 'Mix Achieve into soup',
    light: { label: 'Recommended amount for a light tint of color', items: ['Ingredients for soup curry', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Ingredients for soup curry', 'Achieve 1 stick'] },
    note: '*It is recommended to mix Achieve in as a finishing touch after cooking.',
  },
];

export default function AchieveHowToPage() {
  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">How to Use Achieve</h1>
        <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-white font-bold text-xl mb-4">TORIKOMU - Take In</h2>
              <p className="text-white text-sm leading-relaxed opacity-90 mb-4">
                Simply open one capsule of Achieve and mix it into your favorite drink or meal. The powder dissolves easily and blends naturally, allowing you to take in all 48 essential nutrients without changing the taste of your food or drink.
              </p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
                {[
                  { name: 'Water', image: '/Images/Assets/achieve/mazekomu/water_green.png' },
                  { name: 'Juice', image: '/Images/Assets/achieve/mazekomu/juice.png' },
                  { name: 'Cola', image: '/Images/Assets/achieve/mazekomu/cola.png' },
                  { name: 'Beer', image: '/Images/Assets/achieve/mazekomu/beer.png' },
                  { name: 'Yogurt', image: '/Images/Assets/achieve/mazekomu/yogurt.png' },
                  { name: 'Salad', image: '/Images/Assets/achieve/mazekomu/salad.png' },
                  { name: 'Pasta', image: '/Images/Assets/achieve/mazekomu/pasta.png' },
                  { name: 'Ramen', image: '/Images/Assets/achieve/mazekomu/ramen.png' },
                  { name: 'Fried Rice', image: '/Images/Assets/achieve/mazekomu/friedRice.png' },
                  { name: 'Tempura', image: '/Images/Assets/achieve/mazekomu/tempura.png' },
                  { name: 'Highball', image: '/Images/Assets/achieve/mazekomu/highball.png' },
                  { name: 'White Wine', image: '/Images/Assets/achieve/mazekomu/whiteWine.png' },
                ].map((item) => (
                  <div key={item.name} className="flex flex-col items-center gap-2">
                    <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                    <span className="text-white text-xs text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recipes */}
        {recipes.map((recipe) => (
          <div key={recipe.title} className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8 mb-6">
            <h4 className="text-white text-xl font-bold mb-4">{recipe.title}</h4>
            <h5 className="text-[#25C760] font-bold text-center mb-4">{recipe.description}</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-white text-sm">
                <p className="font-semibold mb-2">【{recipe.light.label}】</p>
                {recipe.light.items.map((item, i) => (
                  <p key={i}>①{item}</p>
                ))}
              </div>
              <div className="text-white text-sm">
                <p className="font-semibold mb-2">【{recipe.strong.label}】</p>
                {recipe.strong.items.map((item, i) => (
                  <p key={i}>①{item}</p>
                ))}
              </div>
            </div>
            {recipe.note && (
              <p className="text-white/70 text-sm mt-4">{recipe.note}</p>
            )}
          </div>
        ))}

        {/* Buy link */}
        <div className="text-center py-8">
          <Link
            href="/product/achieve"
            className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg no-underline hover:bg-[#25C760] hover:text-white transition-all duration-300"
          >
            To Buy Achieve
          </Link>
        </div>

        <div className="text-center py-8">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
