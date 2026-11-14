
import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Laptop,
  Shirt,
  Home,
  BookOpen,
  Gamepad2,
  Utensils,
  Watch,
  Gem,
  Dumbbell,
} from "lucide-react";

const categories = [
  { name: "Electronics", icon: Smartphone },
  { name: "Computers", icon: Laptop },
  { name: "Fashion", icon: Shirt },
  { name: "Home & Kitchen", icon: Home },
  { name: "Books", icon: BookOpen },
  { name: "Gaming", icon: Gamepad2 },
  { name: "Food", icon: Utensils },
  { name: "Watches", icon: Watch },
  { name: "Jewelry", icon: Gem },
  { name: "Sports", icon: Dumbbell },
];

const CategorySlider = () => {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white p-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


        {/* Categories Slider */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4 px-25 scrollbar-hide"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className="group flex p-3 min-w-[120px] flex-col items-center gap-3"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F0F7F4] text-[#0B2E26] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0B2E26] group-hover:text-white">
                  <Icon size={32} strokeWidth={1.7} />
                </div>

                <span className="whitespace-nowrap text-sm font-semibold text-gray-700 transition group-hover:text-[#00A86B]">
                  {category.name}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default CategorySlider;
