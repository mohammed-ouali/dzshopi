
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

    const slider = sliderRef.current;
    const firstItem = slider.firstElementChild;

    if (!firstItem) return;

    const gap = 16;
    const itemWidth = firstItem.getBoundingClientRect().width;

    slider.scrollBy({
      left: direction === "left"
        ? -(itemWidth + gap)
        : itemWidth + gap,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-white py-8">
      <div className="w-full px-3 md:px-10 ">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0B2E26]">
              Shop by Category
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Explore our product categories
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous category"
              className="flex h-10 w-10 hover:cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-[#0B2E26] transition hover:bg-[#0B2E26] hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={() => scroll("right")}
              aria-label="Next category"
              className="flex h-10 w-10 hover:cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-[#0B2E26] transition hover:bg-[#0B2E26] hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Categories Slider */}
        <div
          ref={sliderRef}
          className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth py-3 scrollbar-hide"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                className="group flex min-w-[150px] hover:cursor-pointer shrink-0 snap-start flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-[#F8FAF9] px-5 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#00A86B] hover:bg-[#F0F7F4] hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-[#0B2E26] shadow-sm transition-all duration-300 group-hover:bg-[#0B2E26] group-hover:text-white">
                  <Icon size={28} strokeWidth={1.7} />
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
