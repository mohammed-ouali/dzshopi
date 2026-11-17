
import { useState } from "react";

const categories = [
  "Recommended",
  "Men's Fashion",
  "Phones & Communication",
  "Home Improvement",
  "Electronics",
  "Lighting & Lamps",
  "Automobiles & Motorcycles",
  "Sports & Entertainment",
  "Tools",
  "Home Appliances",
  "Beauty & Health",
];

export default function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState(
    "Lighting & Lamps"
  );

  return (
    <div className="w-full border-t-[5px] border-[#FF2855] bg-white">
      <div
        className="flex items-center gap-4 overflow-x-auto px-6 py-3 scrollbar-hide"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              shrink-0 whitespace-nowrap rounded-full
              px-6 py-3 text-sm font-medium
              transition-all duration-200
              ${
                activeCategory === category
                  ? "bg-[#171717] text-white"
                  : "bg-[#F0F2F5] text-gray-600 hover:bg-gray-200"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
