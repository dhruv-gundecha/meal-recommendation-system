import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sun, Moon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type MealType = "Breakfast" | "Lunch" | "Dinner";

// Updated cuisines for each meal as you specified
const mealCuisines: Record<MealType, string[]> = {
  Breakfast: ["Maharashtrian", "South Indian", "Gujarati", "Fast Food", "American"],
  Lunch: ["North Indian", "Maharashtrian", "Rajasthani", "South Indian", "Continental"],
  Dinner: ["Italian", "North Indian", "South Indian", "Fast Food", "Chinese"],
};

// Meal data — make sure to expand your meals object to match new cuisines!
const meals: Record<string, Record<MealType, { name: string; desc: string }[]>> = {
  Italian: {
    Breakfast: [],
    Lunch: [],
    Dinner: [
      { name: "Lasagna", desc: "Baked pasta layered with tomato sauce and cheese." },
      { name: "Pink Pasta", desc: "Creamy pink sauce pasta made with tomato and cream." },
      { name: "Pesto Pasta", desc: "Pasta tossed in fresh basil pesto sauce." },
      { name: "Mac and Cheese", desc: "Creamy macaroni pasta with cheddar cheese." },
      { name: "Pizza", desc: "Classic flatbread topped with sauce, cheese, and vegetables." },
    ],
  },
  Chinese: {
    Breakfast: [],
    Lunch: [/* your Chinese lunch items */],
    Dinner: [
      { name: "Hakka Noodles", desc: "Stir-fried noodles with vegetables and sauces." },
      { name: "Chinese Bhel", desc: "Crispy noodles mixed with tangy Chinese sauces." },
      { name: "Manchurian with Fried Rice", desc: "Fried veggie balls in sauce served with rice." },
      { name: "Paneer Chilly with Fried Rice", desc: "Spicy paneer stir-fry with fried rice." },
  ],
},
  Maharashtrian: {
    Breakfast: [
      { name: "Poha", desc: "Flattened rice cooked with turmeric, mustard seeds, peanuts, and curry leaves." },
      { name: "Misal Pav", desc: "Spicy sprouted bean curry served with bread rolls." },
      { name: "Upma", desc: "Savory semolina porridge cooked with mustard seeds and veggies." },
      { name: "Childa", desc: "Savory thin crepes made from fermented rice and chickpea batter." },
    ],
    Lunch: [
      { name: "Puran Poli", desc: "Sweet stuffed flatbread made with jaggery and chana dal." },
      { name: "Chavli ki Subji", desc: "Black-eyed peas curry with Maharashtrian spices." },
      { name: "Karela ki Subji", desc: "Bitter gourd stir-fry spiced with Indian flavors." },
      { name: "Beans ki Subji", desc: "French beans cooked with mustard seeds and coconut." },
      { name: "Cauliflower ki Subji", desc: "Spiced cauliflower curry or dry sabzi." },
    ],
    Dinner: [],
  },
  "South Indian": {
    Breakfast: [
      { name: "Dosa", desc: "Thin, crispy fermented rice and lentil crepes." },
      { name: "Uttapam", desc: "Thick pancake topped with onions, tomatoes, and chilies." },
      { name: "Idli", desc: "Steamed fermented rice and lentil cakes." },
    ],
    Lunch: [
      { name: "Idli", desc: "Steamed rice cakes served with sambar and chutney." },
    ],
    Dinner: [
      { name: "Dosa", desc: "Fermented rice crepe served with chutney and sambar." },
      { name: "Uttapam", desc: "Thick savory pancake with veggies." },
      { name: "Idli", desc: "Soft steamed rice cakes served with chutneys." },
    ],
  },
  Gujarati: {
    Breakfast: [
      { name: "Dhokla", desc: "Steamed savory gram flour cake, light and fluffy." },
      { name: "Thepla", desc: "Spiced flatbread made with fenugreek leaves and whole wheat." },
    ],
    Lunch: [],
    Dinner: [],
  },
  "Fast Food": {
    Breakfast: [
      { name: "Waffle", desc: "Sweet, crispy batter-based breakfast cake." },
      { name: "Pancake", desc: "Fluffy cakes often served with syrup and butter." },
    ],
    Lunch: [],
    Dinner: [
      { name: "Bhel", desc: "Puffed rice with tangy chutneys and vegetables." },
      { name: "Chana Chor", desc: "Spiced and flattened chickpeas snack." },
      { name: "Sandwich", desc: "Toasted or grilled bread with spiced veggie filling." },
      { name: "Avocado Toast", desc: "Bread topped with mashed avocado and seasonings." },
      { name: "Burrito Bowl", desc: "Rice, beans, veggies, and sauces in a bowl." },
      { name: "Quesadilla", desc: "Grilled tortilla filled with cheese and veggies." },
],
  },
  American: {
    Breakfast: [
      { name: "Oats", desc: "Warm oatmeal topped with fruits and nuts." },
      { name: "Pancake", desc: "Fluffy cakes served with syrup and butter." },
      { name: "Waffle", desc: "Golden, crispy waffles often served with syrup." },
    ],
    Lunch: [],
    Dinner: [],
  },
  "North Indian": {
    Breakfast: [],
    Lunch: [
      { name: "Paneer Butter Masala", desc: "Creamy tomato-based curry with soft paneer cubes." },
      { name: "Paneer Bhurji", desc: "Scrambled paneer cooked with onions, tomatoes, and spices." },
      { name: "Palak Paneer", desc: "Cottage cheese cooked in a smooth spinach gravy." },
      { name: "Chole Bhature", desc: "Spiced chickpea curry served with deep-fried bread." },
      { name: "Rajma Chawal", desc: "Kidney bean curry served with steamed rice." },
      { name: "Dal Makhani with Chawal", desc: "Creamy black lentil curry served with rice." },
      { name: "Dum Aloo", desc: "Potatoes cooked in a rich, spiced tomato gravy." },
      { name: "Aloo Fried", desc: "Simple stir-fried potatoes with Indian spices." },
    ],
    Dinner: [
      { name: "Dal Makhani with Rice", desc: "Slow-cooked creamy black lentils with basmati rice." },
      { name: "Chole Bhature", desc: "Spiced chickpeas served with deep-fried bread." },
      { name: "Chole Kulche", desc: "Chickpea curry with fluffy flatbread." },
      { name: "Paneer Frankie", desc: "Stuffed Indian roll with spiced paneer." },
      { name: "Thepla", desc: "Spiced flatbread made with fenugreek leaves." },
      { name: "Thalipeeth", desc: "Multi-grain spiced flatbread." },
      { name: "Handwa", desc: "Savory lentil and rice cake from Gujarat." },
      { name: "Samosa Chaat", desc: "Crushed samosas topped with chutneys and yogurt." },
      { name: "Ragda Pattice", desc: "Potato patties topped with spicy white pea curry." },
    ],
  },
  Rajasthani: {
    Breakfast: [],
    Lunch: [
      { name: "Pittod ki Subji", desc: "Gram flour pieces in a spicy yogurt gravy." },
      { name: "Gatte ki Subji", desc: "Gram flour dumplings cooked in spicy yogurt curry." },
      { name: "Jaam ki Subji", desc: "Raw mango curry unique to Rajasthan." },
      { name: "Dal Baati", desc: "Baked wheat dough balls with spicy lentil curry." },
    ],
    Dinner: [],
  },
  Continental: {
    Breakfast: [],
    Lunch: [],
    Dinner: [],
  },
};

export default function MealRecommendations() {
  const [mealType, setMealType] = useState<MealType>("Breakfast");
  const [cuisine, setCuisine] = useState<string>(mealCuisines[mealType][0]);
  const [darkMode, setDarkMode] = useState(false);

  // Update cuisine options when meal type changes
  useEffect(() => {
    setCuisine(mealCuisines[mealType][0]);
  }, [mealType]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-white dark:bg-zinc-900 transition-colors">
      {/* Dark mode toggle */}
      <div className="flex justify-end mb-4">
        <Button variant="outline" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>

      <h1 className="text-4xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
        The answer to aaj kya khaoge?
      </h1>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {(["Breakfast", "Lunch", "Dinner"] as MealType[]).map((type) => (
          <Button
            key={type}
            variant={mealType === type ? "default" : "outline"}
            onClick={() => setMealType(type)}
          >
            {type}
          </Button>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <Select value={cuisine} onValueChange={setCuisine}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select Cuisine" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {mealCuisines[mealType].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {meals[cuisine]?.[mealType]?.map((meal, idx) => (
          <Card
            key={idx}
            className="hover:shadow-lg transition cursor-pointer rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
          >
            <CardContent>
              <h2 className="text-xl font-semibold mb-2">{meal.name}</h2>
              <p className="text-muted-foreground dark:text-zinc-400">{meal.desc}</p>
            </CardContent>
          </Card>
        )) ?? <p className="text-center col-span-2">No meals available.</p>}
      </div>
    </div>
  );
}
