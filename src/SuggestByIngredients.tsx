import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState} from "react";

import foodData from "../data/foodData.json"; 

interface Suggestion {
  dishName: string;
  cuisine: string;
  matchCount: number;
  missingIngredients: string[];
  totalTime: number; // in minutes
}


export default function IngredientSuggestion() {
  const [ingredientsInput, setIngredientsInput] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const navigate = useNavigate();

  const handleSearch = () => {
  const availableIngredients = ingredientsInput
    .toLowerCase()
    .split(",")
    .map((i) => i.trim());

  const matches: Suggestion[] = [];

  Object.entries(foodData).forEach(([cuisine, dishes]) => {
    Object.entries(dishes).forEach(([dishName, details]) => {
      if (details.meal_type === mealType) {
        const matched = details.ingredients.filter((ingredient) =>
          availableIngredients.includes(ingredient.toLowerCase())
        );

        const missing = details.ingredients.filter(
          (ingredient) => !availableIngredients.includes(ingredient.toLowerCase())
        );

        const matchCount = matched.length;
        const totalTime = (details.prep_time_minutes || 0) + (details.cook_time_minutes || 0);

        if (matchCount > 0) {
          matches.push({
            dishName,
            cuisine,
            matchCount,
            missingIngredients: missing,
            totalTime
          });
        }
      }
    });
  });

  matches.sort((a, b) => b.matchCount - a.matchCount);
  setSuggestions(matches);
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
        <div className="max-w-2xl w-full p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">

      <div className="p-4">
        <Button onClick={() => navigate("/")} className="mb-4">
          Home page
        </Button>
      </div>

      <h1 className="text-2xl font-semibold pb-6 text-center text-zinc-900 dark:text-white">
        Find a Meal with Your Ingredients
      </h1>
      

      <div className="space-y-4">
        <div className="mt-4">
        <Label className="block mb-2">Enter ingredients (comma separated):</Label>
            <Input
            value={ingredientsInput}
            onChange={(e) => setIngredientsInput(e.target.value)}
            placeholder="e.g. onion, tomato, cheese"
            />
        </div>

    <div className="mt-4">
        <Label className="block mb-2">Choose Meal Type:</Label>
        <select
        className="w-full p-2 rounded-md bg-white dark:bg-zinc-900"
        value={mealType}
        onChange={(e) => setMealType(e.target.value)}
        >
        <option>Breakfast</option>
        <option>Lunch</option>
        <option>Dinner</option>
        <option>Snack</option>
        </select>
    </div>


        <Button onClick={handleSearch} className="w-full">Suggest Meals</Button>

        <div className="mt-6 space-y-4">
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-4 space-y-2">
                    <h2 className="text-lg font-bold">{item.dishName}</h2>
                    <p className="text-sm text-gray-600">Cuisine: {item.cuisine}</p>
                    <p className="text-sm">Ingredient match: {item.matchCount}</p>
                    <p className="text-sm">
                    🕒 Total Time: <strong>{item.totalTime}</strong> mins
                    </p>
                    <p className="text-sm">
                    ❗Missing Ingredients:{" "}
                    {item.missingIngredients.length > 0
                        ? item.missingIngredients.join(", ")
                        : "None"}
                    </p>
                </CardContent>
              </Card>

            ))
          ) : (
            <p className="text-center text-gray-500">No suggestions yet. Try entering some ingredients.</p>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
