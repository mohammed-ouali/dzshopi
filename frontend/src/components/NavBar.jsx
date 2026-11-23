
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  const categoriesRef = useRef(null);
  const mobileCategoriesRef = useRef(null);

  const navigate = useNavigate();

  // Close categories when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      const clickedDesktop =
        categoriesRef.current?.contains(event.target);

      const clickedMobile =
        mobileCategoriesRef.current?.contains(event.target);

      if (!clickedDesktop && !clickedMobile) {
        setCategoriesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Best Deals", href: "/best-deals" },
    { label: "All Products", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ];

  // Search
  function handleSearch(e) {
    e.preventDefault();

    const query = search.trim();

    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setMobileOpen(false);
    }
  }

  // Close mobile menu
  function closeMobileMenu() {
    setMobileOpen(false);
    setCategoriesOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">

      {/* Top announcement */}
      <WilcomBaner />

      {/* Main navbar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          aria-label="DzShopi - Home"
          className="flex shrink-0 items-center gap-2"
        >
          <img src={logo} alt="DzShopi" className="w-40" />
        </Link>

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

{/* My Account Dropdown */}
<div className="relative hidden sm:block group">

  <Link
    to="/account"
    className="flex items-center gap-2 text-gray-700 transition hover:text-[#00A86B]"
  >
    <UserRound size={22} />


    <ChevronDown
      size={15}
      className="transition-transform duration-300 group-hover:rotate-180"
    />
  </Link>

  {/* Dropdown Menu */}
  <div className="invisible absolute right-0 top-full z-50 w-48 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">

    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl">

      <Link
        to="/orders"
        className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-[#00A86B]"
      >
        My Orders
      </Link>

      <Link
        to="/login"
        className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-[#00A86B]"
      >
        Login
      </Link>

      <Link
        to="/settings"
        className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-[#00A86B]"
      >
        Settings
      </Link>

    </div>
  </div>

</div>

          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="hidden text-gray-700 hover:text-[#00A86B] sm:block"
          >
            <Heart size={22} />
          </Link>

          <Link
            to="/cart"
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
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen(!mobileOpen);
              setCategoriesOpen(false);
            }}
            className="rounded-lg p-2 text-[#0B2E26] hover:bg-gray-100 md:hidden"
          >
            {mobileOpen ? <X size={25} /> : <Menu size={25} />}
          </button>

        </div>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden border-t border-gray-100 md:block">
        <div className="mx-auto flex max-w-7xl items-center gap-8 px-8">

          {/* Categories dropdown */}
          <div className="relative" ref={categoriesRef}>

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
                  <Link
                    key={category}
                    to={`/category/${encodeURIComponent(category)}`}
                    className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-[#008F5B]"
                    onClick={() => setCategoriesOpen(false)}
                  >
                    {category}
                  </Link>
                ))}

              </div>
            )}
          </div>

          {/* Navigation links */}
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="py-4 text-sm font-medium text-gray-600 transition hover:text-[#00A86B]"
            >
              {link.label}
            </Link>
          ))}

        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white p-4 md:hidden">

          {/* Mobile search */}
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

            {/* Home */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="border-b border-gray-100 py-3 text-sm"
            >
              Home
            </Link>

            {/* Mobile categories */}
            <div ref={mobileCategoriesRef}>

              <button
                type="button"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex w-full items-center justify-between border-b border-gray-100 py-3 text-left text-sm"
              >
                All Categories

                <ChevronDown
                  size={17}
                  className={`transition-transform ${
                    categoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoriesOpen &&
                categories.map((category) => (
                  <Link
                    key={category}
                    to={`/category/${encodeURIComponent(category)}`}
                    className="block py-2 pl-4 text-sm text-gray-600"
                    onClick={closeMobileMenu}
                  >
                    {category}
                  </Link>
                ))}

            </div>

            {/* Other links */}
            {links.slice(1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMobileMenu}
                className="border-b border-gray-100 py-3 text-sm"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/account"
              onClick={closeMobileMenu}
              className="py-3 text-sm"
            >
              My Account
            </Link>

            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              className="py-3 text-sm"
            >
              My Wishlist
            </Link>

          </div>
        </div>
      )}

    </header>
  );
}
