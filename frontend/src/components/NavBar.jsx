
import { useState } from "react";
import WilcomBaner from "./WilcomBaner";

import logo from "../../assets/Logo.png";
import {
  ShoppingCart,
  Search,
  UserRound,
  Menu,
  X,
  ChevronDown,
  Package,
  Heart,
} from "lucide-react";

const categories = [
  "Electronics",
  "Computers & IT",
  "Fashion & Clothing",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Sports & Fitness",
  "Food & Groceries",
  "Baby & Kids",
  "Jewelry & Watches",
];

export default function Navbar({ cartCount = 0 }) {
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: " Best Deals", href: "/promotions" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label:"About Us",href:"/about" },
    { label:"Contact Us",href:"/contact" },
  ];

  function handleSearch(e) {
    e.preventDefault();
    const query = search.trim();

    if (query) {
      window.location.href =
        `/products?search=${encodeURIComponent(query)}`;
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top announcement */}
      <WilcomBaner />

      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">
        {/* Logo */}
        <a
          href="/"
          aria-label="DzShopi - Home"
          className="flex shrink-0 items-center gap-2"
        >
          <img src={logo} alt="DzShopi" className="w-40" />
        </a>

        {/* Desktop search */}
        <form
          onSubmit={handleSearch}
          className="hidden flex-1 md:block"
        >
          <div className="flex rounded-xl border border-gray-200 bg-gray-50 focus-within:border-[#00A86B] focus-within:ring-2 focus-within:ring-[#00A86B]/15">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a product..."
              aria-label="Search for a product"
              className="w-full bg-transparent px-4 py-3 text-sm text-gray-800 outline-none"
            />

            <button
              type="submit"
              aria-label="Search"
              className="m-1 flex items-center justify-center rounded-lg bg-[#00A86B] px-4 text-white transition hover:bg-[#008F5B]"
            >
              <Search size={19} />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-4">
          <a
            href="/account"
            className="hidden items-center gap-2 text-gray-700 transition hover:text-[#00A86B] sm:flex"
          >
            <UserRound size={22} />
            <span className="hidden text-sm lg:block">My Account</span>
          </a>

          <a
            href="/wishlist"
            aria-label="Wishlist"
            className="hidden text-gray-700 hover:text-[#00A86B] sm:block"
          >
            <Heart size={22} />
          </a>

          <a
            href="/cart"
            aria-label={`Shopping cart, ${cartCount} items`}
            className="relative flex items-center gap-2 rounded-xl bg-[#0B2E26] px-3 py-3 text-white transition hover:bg-[#17483B]"
          >
            <ShoppingCart size={21} />

            <span className="hidden text-sm font-medium lg:block">
              Cart
            </span>

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#00A86B] px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </a>

          <button
            type="button"
            aria-label={
              mobileOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-[#0B2E26] hover:bg-gray-100 md:hidden"
          >
            {mobileOpen ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-8">
          <div className="relative">
            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              aria-expanded={categoriesOpen}
              className="flex items-center gap-2 py-4 text-sm font-semibold text-[#0B2E26] hover:text-[#00A86B]"
            >
              <Package size={18} />
              All Categories
              <ChevronDown size={16} />
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 top-full z-50 w-60 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`/category/${encodeURIComponent(category)}`}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#008F5B]"
                    onClick={() => setCategoriesOpen(false)}
                  >
                    {category}
                  </a>
                ))}
              </div>
            )}
          </div>

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-4 text-sm font-medium text-gray-600 transition hover:text-[#00A86B]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white p-4 md:hidden">
          <form onSubmit={handleSearch} className="mb-4 flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              aria-label="Search for a product"
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-[#00A86B]"
            />

            <button
              type="submit"
              aria-label="Search"
              className="rounded-xl bg-[#00A86B] px-4 text-white"
            >
              <Search size={20} />
            </button>
          </form>

          <div className="flex flex-col">
            <a
              href="/"
              className="border-b border-gray-100 py-3 text-sm"
            >
              Home
            </a>

            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className="flex items-center justify-between border-b border-gray-100 py-3 text-left text-sm"
            >
              All Categories
              <ChevronDown size={17} />
            </button>

            {categoriesOpen &&
              categories.map((category) => (
                <a
                  key={category}
                  href={`/category/${encodeURIComponent(category)}`}
                  className="py-2 pl-4 text-sm text-gray-600"
                >
                  {category}
                </a>
              ))}

            {links.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="border-b border-gray-100 py-3 text-sm"
              >
                {link.label}
              </a>
            ))}

            <a href="/account" className="py-3 text-sm">
              My Account
            </a>

            <a href="/wishlist" className="py-3 text-sm">
              My Wishlist
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
