
import { useState } from "react";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Check,
  Star,
  Tag,
  Package,
  DollarSign,
} from "lucide-react";

const categories = [
  {
    name: "Electronics",
    subcategories: [
      "Phones",
      "Headphones",
      "Cameras",
      "Smart TVs",
      "Speakers",
    ],
  },
  {
    name: "Computers & IT",
    subcategories: [
      "Laptops",
      "Desktops",
      "Keyboards",
      "Monitors",
    ],
  },
  {
    name: "Fashion & Clothing",
    subcategories: [
      "Men Clothing",
      "Women Clothing",
      "Shoes",
      "Bags",
    ],
  },
  {
    name: "Home & Kitchen",
    subcategories: [
      "Furniture",
      "Kitchen Appliances",
      "Decoration",
    ],
  },
  {
    name: "Beauty & Personal Care",
    subcategories: [
      "Skincare",
      "Hair Care",
      "Makeup",
    ],
  },
];

const brands = [
  "Samsung",
  "Apple",
  "Xiaomi",
  "Lenovo",
  "HP",
  "Sony",
  "LG",
];

const FilterSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2.5">
          <Icon size={18} className="text-[#00A86B]" />
          <span className="text-sm font-bold text-[#0B2E26]">
            {title}
          </span>
        </div>

        {open ? (
          <ChevronUp size={17} className="text-gray-400" />
        ) : (
          <ChevronDown size={17} className="text-gray-400" />
        )}
      </button>

      {open && <div className="mt-4">{children}</div>}
    </div>
  );
};

export default function ProductFilters({ onApply }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("");
  const [availability, setAvailability] = useState("all");
  const [discount, setDiscount] = useState(false);

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setAvailability("all");
    setDiscount(false);

    onApply?.({});
  };

  const applyFilters = () => {
    onApply?.({
      category: selectedCategory,
      subcategory: selectedSubcategory,
      brands: selectedBrands,
      min_price: minPrice,
      max_price: maxPrice,
      rating,
      availability,
      discount,
    });
  };

  const activeFilters =
    selectedBrands.length +
    (selectedCategory ? 1 : 0) +
    (selectedSubcategory ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (rating ? 1 : 0) +
    (availability !== "all" ? 1 : 0) +
    (discount ? 1 : 0);

  return (
    <aside className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={20}
            className="text-[#00A86B]"
          />

          <h2 className="text-lg font-bold text-[#0B2E26]">
            Filters
          </h2>

          {activeFilters > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00A86B] px-1.5 text-xs font-bold text-white">
              {activeFilters}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition hover:text-[#00A86B]"
        >
          <RotateCcw size={14} />
          Reset All
        </button>
      </div>

      {/* Categories */}
      <FilterSection title="Categories" icon={Package}>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.name}>
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category.name}
                  onChange={() => {
                    setSelectedCategory(category.name);
                    setSelectedSubcategory("");
                  }}
                  className="h-4 w-4 accent-[#00A86B]"
                />

                <span className="text-sm text-gray-600 hover:text-[#00A86B]">
                  {category.name}
                </span>
              </label>

              {selectedCategory === category.name && (
                <div className="ml-6 mt-3 space-y-3 border-l-2 border-emerald-100 pl-3">
                  {category.subcategories.map((sub) => (
                    <label
                      key={sub}
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <input
                        type="radio"
                        name="subcategory"
                        checked={selectedSubcategory === sub}
                        onChange={() =>
                          setSelectedSubcategory(sub)
                        }
                        className="h-3.5 w-3.5 accent-[#00A86B]"
                      />

                      <span className="text-xs text-gray-500">
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price Range" icon={DollarSign}>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#00A86B]"
          />

          <span className="text-gray-400">-</span>

          <input
            type="number"
            min="0"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full min-w-0 rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#00A86B]"
          />
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Price in Algerian Dinar (DA)
        </p>
      </FilterSection>

      {/* Brands */}
      <FilterSection title="Brands" icon={Tag}>
        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="group flex cursor-pointer items-center justify-between"
            >
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="h-4 w-4 rounded accent-[#00A86B]"
                />

                <span className="text-sm text-gray-600 transition group-hover:text-[#00A86B]">
                  {brand}
                </span>
              </span>

              {selectedBrands.includes(brand) && (
                <Check size={15} className="text-[#00A86B]" />
              )}
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection title="Customer Rating" icon={Star}>
        <div className="space-y-3">
          {[4, 3, 2, 1].map((value) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <input
                type="radio"
                name="rating"
                checked={rating === String(value)}
                onChange={() => setRating(String(value))}
                className="h-4 w-4 accent-[#00A86B]"
              />

              <span className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={
                      star <= value
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-200"
                    }
                  />
                ))}

                <span className="ml-1 text-xs text-gray-500">
                  & Up
                </span>
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Availability */}
      <FilterSection title="Availability" icon={Package}>
        <div className="space-y-3">
          {[
            { label: "All Products", value: "all" },
            { label: "In Stock", value: "in_stock" },
            { label: "Out of Stock", value: "out_of_stock" },
          ].map((item) => (
            <label
              key={item.value}
              className="flex cursor-pointer items-center gap-2.5"
            >
              <input
                type="radio"
                name="availability"
                checked={availability === item.value}
                onChange={() => setAvailability(item.value)}
                className="h-4 w-4 accent-[#00A86B]"
              />

              <span className="text-sm text-gray-600">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Special Offers" icon={Tag}>
        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            checked={discount}
            onChange={(e) => setDiscount(e.target.checked)}
            className="h-4 w-4 accent-[#00A86B]"
          />

          <span className="text-sm text-gray-600">
            Discounted Products Only
          </span>
        </label>
      </FilterSection>

      {/* Apply Button */}
      <button
        type="button"
        onClick={applyFilters}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2E26] py-3.5 text-sm font-bold text-white transition hover:bg-[#17483B]"
      >
        <SlidersHorizontal size={17} />
        Apply Filters
      </button>
    </aside>
  );
}
