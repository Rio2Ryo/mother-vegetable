import Image from 'next/image';
import Link from 'next/link';

export default function ConfidenceHowToPage() {
  const cosmeticItems = [
    { name: 'Dark Spots', image: '/Images/Assets/confidence/mazekomu/darkSpot.png' },
    { name: 'Acne', image: '/Images/Assets/confidence/mazekomu/acne.png' },
    { name: 'Freckles', image: '/Images/Assets/confidence/mazekomu/freckles.png' },
    { name: 'Wound/Burn', image: '/Images/Assets/confidence/mazekomu/woundBurn.png' },
    { name: 'Allergy', image: '/Images/Assets/confidence/mazekomu/allergy.png' },
    { name: 'Odor', image: '/Images/Assets/confidence/mazekomu/smell.png' },
    { name: 'Bathtub', image: '/Images/Assets/confidence/mazekomu/bathtub.png' },
    { name: 'Shampoo', image: '/Images/Assets/confidence/mazekomu/shampoo.png' },
    { name: 'Lip Balm', image: '/Images/Assets/confidence/mazekomu/ripbalm.png' },
    { name: 'Toothpaste', image: '/Images/Assets/confidence/mazekomu/toothpaste.png' },
    { name: 'Manicure', image: '/Images/Assets/confidence/mazekomu/manicure.png' },
    { name: 'Cosmetic', image: '/Images/Assets/confidence/mazekomu/cosmetic.png' },
  ];

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">How to Use Confidence</h1>
        <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

        {/* SURIKOMU method */}
        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-white font-bold text-xl mb-4">SURIKOMU - Rub In</h2>
          <p className="text-white text-sm leading-relaxed opacity-90 mb-4">
            Apply Confidence powder directly onto the skin area you want to treat. Gently rub the powder in using circular motions. This method is especially effective for targeting specific skin concerns like dark spots, acne scars, and wound marks.
          </p>
        </div>

        {/* MAZEKOMU method */}
        <div className="bg-black border border-[#25C760] rounded-xl p-6 md:p-8 mb-8">
          <h2 className="text-white font-bold text-xl mb-4">MAZEKOMU - Mix In</h2>
          <p className="text-white text-sm leading-relaxed opacity-90 mb-4">
            Mix Confidence powder into your existing cosmetics, skincare products, or daily essentials. This allows you to enhance the healing properties of products you already use and love.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-6">
            {cosmeticItems.map((item) => (
              <div key={item.name} className="flex flex-col items-center gap-2">
                <Image src={item.image} alt={item.name} width={60} height={60} className="w-15 h-15 object-contain" />
                <span className="text-white text-xs text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buy link */}
        <div className="text-center py-8">
          <Link
            href="/product/confidence"
            className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg no-underline hover:bg-[#25C760] hover:text-white transition-all duration-300"
          >
            To Buy Confidence
          </Link>
        </div>

        <div className="text-center py-8">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
