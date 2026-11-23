
import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";

const categories = [
  "Electronics",
  "Computers & IT",
  "Fashion & Clothing",
  "Home & Kitchen",
  "Beauty & Personal Care",
];

export default function ProductFilters({ onApply }) {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleApply = () => {
    onApply?.({
      category,
      min_price: minPrice,
      max_price: maxPrice,
    });
  };

  const resetFilters = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");

    onApply?.({});
  };

  return (
    <div className="w-full rounded-xl border my-4 border-gray-100 bg-white p-4  shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* Category Filter */}
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              size={19}
              className="text-[#00A86B]"
            />
            <span className="text-sm font-bold text-[#0B2E26]">
              Filter By:
            </span>
          </div>

          <div className="relative min-w-[170px] flex-1 md:flex-none">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 pr-10 text-sm text-gray-600 outline-none transition focus:border-[#00A86B]"
            >
              <option value="">All Categories</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Price Filter */}
          <div className="flex flex-1 items-center gap-2 md:flex-none">
            <span className="whitespace-nowrap text-sm font-semibold text-gray-600">
              Price:
            </span>

            <input
              type="number"
              min="0"
              placeholder="Min DA"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#00A86B] md:w-28"
            />

            <span className="text-gray-400">-</span>

            <input
              type="number"
              min="0"
              placeholder="Max DA"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#00A86B] md:w-28"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleApply}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0B2E26] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#17483B] md:flex-none"
          >
            <SlidersHorizontal size={16} />
            Apply
          </button>

          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-500 transition hover:border-red-200 hover:text-red-500"
          >
            <X size={16} />
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}
