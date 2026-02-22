import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Use Achieve Capsules',
  description: 'Learn how to prepare and enjoy Mother Vegetable Achieve capsules with delicious recipes for daily wellness.',
};

const CDN = 'https://mv-prod-1334776400.cos.ap-singapore.myqcloud.com/products/achieve';

interface Recipe {
  title: string;
  image: string;
  description: string;
  light: { label: string; items: string[] };
  strong: { label: string; items: string[] };
  note?: string;
}

interface RecipeCategory {
  name: string;
  recipes: Recipe[];
}

const drinkRecipes: Recipe[] = [
  {
    title: 'Mazavege Pure Water',
    image: `${CDN}/10002.jpg`,
    description: 'Mix Achieve into mineral water',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 glass of water', 'Achieve 1/2 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 glass of water', 'Achieve 1 stick'] },
  },
  {
    title: 'Mazavege Beer',
    image: `${CDN}/10003.jpg`,
    description: 'Mix Achieve into beer',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 glass of beer', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 glass of beer', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Mazavege Sour',
    image: `${CDN}/10004.jpg`,
    description: 'Mix Achieve into sour',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 glass of sour', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 glass of sour', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Mazavege Plum Wine on the Rocks',
    image: `${CDN}/10005.jpg`,
    description: 'Mix Achieve into plum wine',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 glass of plum wine', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 glass of plum wine', 'Achieve 1 stick'] },
    note: '*For plum wine soda, use Achieve 1/2 stick.',
  },
  {
    title: 'Mazavege Highball',
    image: `${CDN}/10006.jpg`,
    description: 'Mix Achieve into highball',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 glass of highball', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 glass of highball', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Mazavege Sake',
    image: `${CDN}/10007.jpg`,
    description: 'Mix Achieve into sake',
    light: { label: 'Recommended amount for a light tint of color', items: ['Tokkuri 180ml of sake', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Tokkuri 180ml of sake', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Mazavege Wine',
    image: `${CDN}/10008.jpg`,
    description: 'Mix Achieve into wine',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 glass of wine', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 glass of wine', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Mazavege Juice Blend',
    image: `${CDN}/10009.jpg`,
    description: 'Mix Achieve into juice',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 glass of juice', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 glass of juice', 'Achieve 1 stick'] },
    note: '*For sparkling juice, use Achieve 1/5 stick.',
  },
];

const japaneseCuisineRecipes: Recipe[] = [
  {
    title: 'Hiyayakko',
    image: `${CDN}/10011.jpg`,
    description: 'Sprinkle Achieve on tofu',
    light: { label: 'Recommended amount for a light tint of color', items: ['Mix into seasonings', 'Achieve 1/3 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Direct sprinkling on tofu', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Natto',
    image: `${CDN}/10013.jpg`,
    description: 'Mix Achieve into natto',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of natto', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of natto', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Mekabu',
    image: `${CDN}/10012.jpg`,
    description: 'Mix Achieve into mekabu',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of mekabu', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of mekabu', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Vegetable Dip',
    image: `${CDN}/10014.jpg`,
    description: 'Mix Achieve into miso dip',
    light: { label: 'Recommended amount for a light tint of color', items: ['Approx. 100g of miso dip', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Approx. 100g of miso dip', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Potato Salad',
    image: `${CDN}/10015.jpg`,
    description: 'Mix Achieve into potato salad',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of potato salad', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of potato salad', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Fried Chicken',
    image: `${CDN}/10016.jpg`,
    description: 'Sprinkle Achieve on fried chicken',
    light: { label: 'Recommended amount for a light tint of color', items: ['Mix into seasonings (salt 5:Achieve 1)', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Direct sprinkling', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Shrimp with Mayo',
    image: `${CDN}/10017.jpg`,
    description: 'Mix Achieve into mayo sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of shrimp with mayo', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of shrimp with mayo', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Ochazuke',
    image: `${CDN}/10018.jpg`,
    description: 'Mix Achieve into ochazuke broth',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of ochazuke', 'Achieve 1/6 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of ochazuke', 'Achieve 1 stick'] },
  },
  {
    title: 'Miso Soup',
    image: `${CDN}/10019.jpg`,
    description: 'Sprinkle Achieve on miso soup',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of miso soup', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of miso soup', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Grilled Pacific Saury',
    image: `${CDN}/10020.jpg`,
    description: 'Mix Achieve into grated daikon',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of grated daikon', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of grated daikon', 'Achieve 1/2 stick'] },
  },
];

const japaneseContinuedRecipes: Recipe[] = [
  {
    title: 'Tororo Rice',
    image: `${CDN}/10021.jpg`,
    description: 'Mix Achieve into grated yam',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of grated yam', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of grated yam', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Zaru Soba',
    image: `${CDN}/10022.jpg`,
    description: 'Knead Achieve into soba dough',
    light: { label: 'Recommended amount for a light tint of color', items: ['Approx. 300g of soba dough', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Approx. 300g of soba dough', 'Achieve 1 stick'] },
  },
  {
    title: 'Tempura',
    image: `${CDN}/10023.jpg`,
    description: 'Mix Achieve into tempura salt',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of tempura salt (salt 10:Achieve 1)', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Direct sprinkling on tempura', 'Achieve 1 stick'] },
  },
  {
    title: 'Sushi',
    image: `${CDN}/10024.jpg`,
    description: 'Mix Achieve into soy sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of soy sauce', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of soy sauce', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Shabu-shabu',
    image: `${CDN}/10025.jpg`,
    description: 'Mix Achieve into ponzu',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of ponzu', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of ponzu', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Teppanyaki',
    image: `${CDN}/10026.jpg`,
    description: 'Mix Achieve into teppanyaki sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of sauce', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of sauce', 'Achieve 1 stick'] },
  },
];

const westernRecipes: Recipe[] = [
  {
    title: 'Caprese',
    image: `${CDN}/10027.jpg`,
    description: 'Use Achieve as topping on caprese',
    light: { label: 'Recommended amount for a light tint of color', items: ['Mix into olive oil', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Direct sprinkling', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Salad',
    image: `${CDN}/10028.jpg`,
    description: 'Mix Achieve into salad dressing',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of dressing', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of dressing', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Bruschetta',
    image: `${CDN}/10029.jpg`,
    description: 'Spread Achieve mixed paste on bruschetta',
    light: { label: 'Recommended amount for a light tint of color', items: ['Mix into paste', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Mix into paste', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Lasagna',
    image: `${CDN}/10030.jpg`,
    description: 'Knead Achieve into lasagna dough',
    light: { label: 'Recommended amount for a light tint of color', items: ['Approx. 600g of dough', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Approx. 600g of dough', 'Achieve 2 sticks'] },
  },
  {
    title: 'Genovese',
    image: `${CDN}/10031.jpg`,
    description: 'Mix Achieve into basil sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of genovese', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of genovese', 'Achieve 1 stick'] },
  },
  {
    title: 'Peperoncino',
    image: `${CDN}/10032.jpg`,
    description: 'Mix Achieve into oil-based sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of peperoncino', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of peperoncino', 'Achieve 1 stick'] },
  },
  {
    title: 'Margherita',
    image: `${CDN}/10033.jpg`,
    description: 'Use Achieve as topping on margherita',
    light: { label: 'Recommended amount for a light tint of color', items: ['Mix into Tabasco', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Direct sprinkling', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Risotto',
    image: `${CDN}/10034.jpg`,
    description: 'Mix Achieve as finishing touch on risotto',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of risotto', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of risotto', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Baguette',
    image: `${CDN}/10035.jpg`,
    description: 'Mix Achieve into butter and spread on baguette',
    light: { label: 'Recommended amount for a light tint of color', items: ['200g of butter', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['200g of butter', 'Achieve 1 stick'] },
  },
  {
    title: 'Tabbouleh',
    image: `${CDN}/10036.jpg`,
    description: 'Mix Achieve into couscous salad',
    light: { label: 'Recommended amount for a light tint of color', items: ['Mix into dressing', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Direct mixing', 'Achieve 1 stick'] },
  },
  {
    title: 'Potage',
    image: `${CDN}/10037.jpg`,
    description: 'Mix and sprinkle Achieve on potage',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of potage', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of potage', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Avocado and Scallop Appetizer',
    image: `${CDN}/10038.jpg`,
    description: 'Mix Achieve into appetizer sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of appetizer', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of appetizer', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Ratatouille',
    image: `${CDN}/10039.jpg`,
    description: 'Mix Achieve as finishing touch on ratatouille',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of ratatouille', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of ratatouille', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Quiche',
    image: `${CDN}/10040.jpg`,
    description: 'Mix Achieve into quiche filling',
    light: { label: 'Recommended amount for a light tint of color', items: ['Quiche filling', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Quiche filling', 'Achieve 1 stick'] },
  },
  {
    title: 'Salmon Tartare',
    image: `${CDN}/10041.jpg`,
    description: 'Mix Achieve into salmon and avocado tartare',
    light: { label: 'Recommended amount for a light tint of color', items: ['Salmon tartare mixture', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Salmon tartare mixture', 'Achieve 1/2 stick'] },
  },
  {
    title: 'White Fish Meuniere',
    image: `${CDN}/10042.jpg`,
    description: 'Mix Achieve into meuniere sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of meuniere sauce', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of meuniere sauce', 'Achieve 1/2 stick'] },
  },
];

const chineseRecipes: Recipe[] = [
  {
    title: 'Egg Drop Soup',
    image: `${CDN}/10043.jpg`,
    description: 'Mix Achieve as finishing touch in egg drop soup',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of egg drop soup', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of egg drop soup', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Glass Noodle Salad',
    image: `${CDN}/10044.jpg`,
    description: 'Mix and sprinkle Achieve on glass noodle salad',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of glass noodle salad', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of glass noodle salad', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Mapo Tofu',
    image: `${CDN}/10045.jpg`,
    description: 'Sprinkle Achieve as finishing touch on mapo tofu',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of mapo tofu', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of mapo tofu', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Xiaolongbao',
    image: `${CDN}/10046.jpg`,
    description: 'Mix Achieve into dipping sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of dipping sauce', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of dipping sauce', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Bang Bang Chicken',
    image: `${CDN}/10047.jpg`,
    description: 'Mix Achieve into bang bang chicken sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of sauce', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of sauce', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Fried Rice',
    image: `${CDN}/10048.jpg`,
    description: 'Stir-fry Achieve with fried rice',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of fried rice', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of fried rice', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Shrimp in Chili Sauce',
    image: `${CDN}/10049.jpg`,
    description: 'Sprinkle Achieve as finishing touch on shrimp in chili sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of shrimp in chili sauce', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of shrimp in chili sauce', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Stir-Fried Green Pepper and Beef',
    image: `${CDN}/10050.jpg`,
    description: 'Toss Achieve as finishing touch',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of stir-fry', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of stir-fry', 'Achieve 1/2 stick'] },
  },
];

const koreanRecipes: Recipe[] = [
  {
    title: 'Kimchi',
    image: `${CDN}/10051.jpg`,
    description: 'Sprinkle Achieve on kimchi',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of kimchi', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of kimchi', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Tteokbokki',
    image: `${CDN}/10052.jpg`,
    description: 'Mix Achieve into tteokbokki sauce',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of tteokbokki', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of tteokbokki', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Kimbap',
    image: `${CDN}/10053.jpg`,
    description: 'Mix Achieve into kimbap rice',
    light: { label: 'Recommended amount for a light tint of color', items: ['Rice for kimbap', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Rice for kimbap', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Samgyetang',
    image: `${CDN}/10054.jpg`,
    description: 'Mix Achieve into samgyetang soup',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of samgyetang', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of samgyetang', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Samgyeopsal',
    image: `${CDN}/10055.jpg`,
    description: 'Mix Achieve into seasoned miso for samgyeopsal',
    light: { label: 'Recommended amount for a light tint of color', items: ['Approx. 300g / 10 servings of seasoned miso', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Approx. 300g / 10 servings of seasoned miso', 'Achieve 1 stick'] },
  },
  {
    title: 'Bibimbap',
    image: `${CDN}/10056.jpg`,
    description: 'Sprinkle Achieve on bibimbap',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of bibimbap', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of bibimbap', 'Achieve 1/2 stick'] },
  },
  {
    title: 'Cheese Dak-galbi',
    image: `${CDN}/10057.jpg`,
    description: 'Mix Achieve into cheese for dak-galbi',
    light: { label: 'Recommended amount for a light tint of color', items: ['Cheese for dak-galbi', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Cheese for dak-galbi', 'Achieve 1 stick'] },
  },
  {
    title: 'Naengmyeon',
    image: `${CDN}/10058.jpg`,
    description: 'Mix Achieve into naengmyeon soup',
    light: { label: 'Recommended amount for a light tint of color', items: ['Approx. 1000ml / 3 servings of soup', 'Achieve 1/3 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Approx. 1000ml / 3 servings of soup', 'Achieve 1 stick'] },
  },
];

const indianCurryDessertRecipes: Recipe[] = [
  {
    title: 'Dry Curry',
    image: `${CDN}/10059.jpg`,
    description: 'Mix Achieve while frying dry curry',
    light: { label: 'Recommended amount for a light tint of color', items: ['Dry curry ingredients', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Dry curry ingredients', 'Achieve 1 stick'] },
  },
  {
    title: 'Keema Curry',
    image: `${CDN}/10060.jpg`,
    description: 'Mix Achieve into keema curry',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of keema curry', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of keema curry', 'Achieve 1 stick'] },
  },
  {
    title: 'Biryani',
    image: `${CDN}/10061.jpg`,
    description: 'Mix Achieve as finishing touch on biryani',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of biryani', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of biryani', 'Achieve 1 stick'] },
  },
  {
    title: 'Naan',
    image: `${CDN}/10062.jpg`,
    description: 'Knead Achieve into naan dough',
    light: { label: 'Recommended amount for a light tint of color', items: ['Naan dough', 'Achieve 1/5 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Naan dough', 'Achieve 2 sticks'] },
  },
  {
    title: 'Lassi',
    image: `${CDN}/10063.jpg`,
    description: 'Mix Achieve into lassi',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of lassi', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of lassi', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Yogurt',
    image: `${CDN}/10064.jpg`,
    description: 'Mix Achieve into yogurt',
    light: { label: 'Recommended amount for a light tint of color', items: ['1 serving of yogurt', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['1 serving of yogurt', 'Achieve 1/3 stick'] },
  },
  {
    title: 'Curry Doria',
    image: `${CDN}/10065.jpg`,
    description: 'Make a doria with curry mixed with Achieve',
    light: { label: 'Recommended amount for a light tint of color', items: ['Ingredients for 1 serving', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Ingredients for 1 serving', 'Achieve 1 stick'] },
  },
  {
    title: 'Soup Curry',
    image: `${CDN}/10066.jpg`,
    description: 'Mix Achieve into soup curry',
    light: { label: 'Recommended amount for a light tint of color', items: ['Ingredients for soup curry', 'Achieve 1/10 stick'] },
    strong: { label: 'Recommended amount for a stronger color', items: ['Ingredients for soup curry', 'Achieve 1 stick'] },
    note: '*It is recommended to mix Achieve in as a finishing touch after cooking.',
  },
];

const categories: RecipeCategory[] = [
  { name: 'Drinks', recipes: drinkRecipes },
  { name: 'Japanese Cuisine', recipes: japaneseCuisineRecipes },
  { name: 'Japanese Cuisine (Continued)', recipes: japaneseContinuedRecipes },
  { name: 'Western / European', recipes: westernRecipes },
  { name: 'Chinese', recipes: chineseRecipes },
  { name: 'Korean', recipes: koreanRecipes },
  { name: 'Indian / Curry / Dessert', recipes: indianCurryDessertRecipes },
];

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-black border border-[#25C760] rounded-xl overflow-hidden mb-6">
      <div className="flex flex-col md:flex-row">
        {/* Left: Image */}
        <div className="md:w-[280px] lg:w-[320px] flex-shrink-0">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={320}
            height={240}
            className="w-full h-full object-cover"
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 p-5 md:p-6">
          <h4 className="text-white text-lg md:text-xl font-bold mb-2">{recipe.title}</h4>
          <p className="text-[#25C760] font-semibold text-sm md:text-base mb-4">{recipe.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-black/50 border border-[#25C760]/30 rounded-lg p-3">
              <p className="text-[#25C760]/80 font-semibold text-xs mb-2">{recipe.light.label}</p>
              {recipe.light.items.map((item, i) => (
                <p key={i} className="text-white text-sm leading-relaxed">{item}</p>
              ))}
            </div>
            <div className="bg-black/50 border border-[#25C760]/30 rounded-lg p-3">
              <p className="text-[#25C760]/80 font-semibold text-xs mb-2">{recipe.strong.label}</p>
              {recipe.strong.items.map((item, i) => (
                <p key={i} className="text-white text-sm leading-relaxed">{item}</p>
              ))}
            </div>
          </div>
          {recipe.note && (
            <p className="text-white/60 text-xs mt-3">{recipe.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function AchieveHowToPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-black min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-5">
        <h1 className="text-center font-bold text-3xl md:text-4xl text-[#25C760] tracking-wider mb-2">How to Use Achieve</h1>
        <Image src="/Images/Assets/homepage/underline.png" alt="Underline" width={250} height={10} className="mx-auto mb-8 max-w-[80%] h-auto drop-shadow-[0_0_15px_rgba(37,199,96,0.5)]" />

        {/* Hero Product Image */}
        <div className="text-center mb-10">
          <Image
            src={`${CDN}/10001.png`}
            alt="Achieve Product"
            width={400}
            height={400}
            className="mx-auto max-w-[300px] md:max-w-[400px] h-auto"
          />
        </div>

        {/* Intro Section */}
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

        {/* Recipe Categories */}
        {categories.map((category, catIdx) => (
          <div key={category.name} className="mb-10">
            {/* Section separator between Drinks and Food sections */}
            {catIdx === 1 && (
              <div className="text-center my-10">
                <Image
                  src={`${CDN}/10010.png`}
                  alt="Food Section"
                  width={800}
                  height={200}
                  className="mx-auto max-w-full h-auto"
                />
              </div>
            )}

            <h3 className="text-[#25C760] text-2xl font-bold mb-6 border-b border-[#25C760]/30 pb-3">
              {category.name}
            </h3>

            {category.recipes.map((recipe) => (
              <RecipeCard key={recipe.title} recipe={recipe} />
            ))}
          </div>
        ))}

        {/* Buy link */}
        <div className="text-center py-8">
          <a
            href="/product/achieve"
            className="inline-block bg-white text-black font-semibold py-3 px-8 rounded-lg no-underline hover:bg-[#25C760] hover:text-white transition-all duration-300"
          >
            To Buy Achieve
          </a>
        </div>

        <div className="text-center py-8">
          <Image src="/Images/favicon.png" alt="Mazavege Family" width={64} height={64} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
