
import { useState } from "react";
import {
  ShoppingBag,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  ShoppingCart,
  Heart,
  Search,
  Package,
  RotateCcw,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    price: 11500,
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    price: 13500,
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    price: 9000,
  },
  {
    id: 4,
    name: "Modern Camera",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
    price: 52000,
  },
  {
    id: 5,
    name: "Laptop",
    category: "Computers",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    price: 105000,
  },
  {
    id: 6,
    name: "Backpack",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    price: 6000,
  },
  {
    id: 7,
    name: "Modern Speaker",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    price: 10500,
  },
  {
    id: 8,
    name: "Gaming Controller",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600",
    price: 8500,
  },
];

const categories = [
  "All Categories",
  "Electronics",
  "Computers",
  "Fashion",
  "Home & Kitchen",
];

export default function Products() {
  const [category, setCategory] = useState("All Categories");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");

  // Filter and Sort Products
  const filteredProducts = products
    .filter((product) => {
      const categoryMatch =
        category === "All Categories" ||
        product.category === category;

      const minMatch =
        minPrice === "" || product.price >= Number(minPrice);

      const maxMatch =
        maxPrice === "" || product.price <= Number(maxPrice);

      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && minMatch && maxMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  // Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // Reset Filters
  const resetFilters = () => {
    setCategory("All Categories");
    setMinPrice("");
    setMaxPrice("");
    setSort("default");
    setSearch("");
  };

  return (
    <main className="min-h-screen w-full bg-white">

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#002d22] text-white">

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(0,180,110,0.25),transparent_55%)]" />

        <div className="absolute right-[-60px] top-[-80px] h-[250px] w-[250px] rounded-full border-[20px] border-emerald-500/10 sm:right-[5%] sm:h-[350px] sm:w-[350px] lg:right-[10%] lg:top-[-100px] lg:h-[450px] lg:w-[450px] lg:border-[30px]" />

        <div className="absolute bottom-[-120px] left-[-20%] h-[220px] w-[450px] rounded-full bg-emerald-500/10 blur-3xl sm:left-[10%] lg:bottom-[-180px] lg:left-[20%] lg:h-[300px] lg:w-[700px]" />

        <div className="relative flex min-h-[380px] flex-col items-center justify-center gap-8 px-5 py-12 sm:px-8 md:flex-row md:justify-between md:px-10 lg:px-14">

          {/* LEFT CONTENT */}
          <div className="z-10 w-full text-center md:w-[60%] md:text-left">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-600/40 px-3 py-1.5 text-xs font-semibold sm:px-4 sm:py-2 sm:text-sm">
              <ShoppingBag size={16} />
              Explore Our Collection
            </div>

            <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight min-[400px]:text-4xl sm:text-5xl xl:text-6xl">
              Discover All Our
              <span className="block text-[#50e65e]">
                Products!
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-[460px] text-sm leading-6 text-gray-300 sm:text-base md:mx-0">
              Explore our complete collection of quality products.
              Find everything you need at DzShopi and enjoy
              a simple shopping experience.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
              <Package size={17} />
              Quality Products & Best Prices
            </div>

          </div>

          {/* RIGHT CONTENT */}
          <div className="relative z-10 flex h-48 w-48 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10 sm:h-56 sm:w-56 lg:h-64 lg:w-64">

            <div className="absolute inset-3 rounded-full border border-dashed border-emerald-400/30" />

            <div className="text-center">
              <ShoppingBag
                size={45}
                className="mx-auto text-[#50e65e]"
              />

              <p className="mt-3 text-4xl font-black text-white sm:text-5xl">
                SHOP
              </p>

              <p className="mt-1 text-sm font-semibold text-emerald-300">
                Everything You Need
              </p>
            </div>

            <div className="absolute -right-2 top-5 rounded-full bg-[#50e65e] px-3 py-2 text-xs font-black text-[#002d22] shadow-lg">
              NEW
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="w-full bg-white py-12">

        {/* SECTION HEADER */}
        <div className="mb-7 flex flex-col justify-between gap-4 px-4 sm:px-6 lg:flex-row lg:items-end lg:px-10">

          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#00A86B]">
              Explore DzShopi
            </p>

            <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              All Products
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Find everything you need in one place.
            </p>
          </div>

          <p className="text-sm font-medium text-gray-500">
            {filteredProducts.length} Products Found
          </p>

        </div>

        {/* FILTER BAR */}
        <div className="mx-3 mb-8 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:mx-5 lg:mx-10 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-2">
              <SlidersHorizontal size={19} className="text-[#00A86B]" />
              <span className="text-sm font-bold text-gray-800">
                Filter By:
              </span>
            </div>

            {/* CATEGORY FILTER */}
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-700 outline-none transition focus:border-[#00A86B] sm:w-48"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={15}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* PRICE FILTER */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                placeholder="Min DA"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-24 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#00A86B]"
              />

              <span className="text-gray-400">-</span>

              <input
                type="number"
                min="0"
                placeholder="Max DA"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-24 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#00A86B]"
              />
            </div>

            {/* RESET */}
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 transition hover:text-[#00A86B]"
            >
              <RotateCcw size={13} />
              Reset
            </button>

          </div>

          {/* SORTING */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={17} className="text-[#00A86B]" />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#00A86B] sm:w-52"
            >
              <option value="default">Default Sorting</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

        </div>

        {/* SEARCH */}
        <div className="mx-3 mb-7 sm:mx-5 lg:mx-10">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-[#00A86B]"
            />
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (

          <div className="grid w-full grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:px-5 md:grid-cols-4 lg:grid-cols-5 lg:px-10 xl:grid-cols-7 xl:gap-4">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
              >

                {/* PRODUCT IMAGE */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">

                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* WISHLIST */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="Toggle wishlist"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-white shadow-sm transition hover:bg-emerald-50"
                  >
                    <Heart
                      size={15}
                      className={
                        wishlist.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-500"
                      }
                    />
                  </button>

                </div>

                {/* PRODUCT INFO */}
                <div className="p-2.5">

                  <p className="mb-1.5 truncate text-[10px] text-gray-400">
                    {product.category}
                  </p>

                  <h3 className="truncate text-xs font-bold text-gray-900">
                    {product.name}
                  </h3>

                  {/* PRICE */}
                  <div className="mt-2">
                    <span className="text-sm font-extrabold text-[#00A86B]">
                      {product.price.toLocaleString("en-US")} DA
                    </span>
                  </div>

                  {/* ADD TO CART */}
                  <button
                    type="button"
                    className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-[#00A86B] py-2 text-[10px] font-bold text-white transition hover:bg-[#008f5b]"
                  >
                    <ShoppingCart size={13} />
                    Add to Cart
                  </button>

                </div>
              </div>

            ))}

          </div>

        ) : (

          /* EMPTY STATE */
          <div className="mx-3 rounded-xl border border-gray-200 bg-white py-20 text-center sm:mx-5 lg:mx-10">

            <Package size={38} className="mx-auto text-gray-300" />

            <h3 className="mt-4 text-lg font-bold text-gray-900">
              No Products Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your filters to find more products.
            </p>

            <button
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-[#00A86B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#008f5b]"
            >
              Reset Filters
            </button>

          </div>

        )}

      </section>
    </main>
  );
}
