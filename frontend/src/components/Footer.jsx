
import { useState } from "react";

import logo from "../../assets/Logo.png";


import {
  ShoppingBag,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
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

const Footer = () => {
  const [showAllCategories, setShowAllCategories] = useState(false);

  return (
    <footer className="bg-[#011510] text-white">

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Stay Connected with{" "}
              <span className="text-[#00A86B]">DzShopi.</span>
            </h2>

            <p className="mt-2 text-gray-400">
              Discover our latest arrivals and best deals.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full md:max-w-md"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="min-w-0 flex-1 rounded-l-xl bg-white/10 px-4 py-3 outline-none border border-white/10 focus:border-[#00A86B] transition"
            />

            <button
              type="submit"
              aria-label="Subscribe to newsletter"
              className="rounded-r-xl bg-[#00A86B] px-5 hover:bg-[#008F5B] transition duration-300"
            >
              <ArrowRight size={20} />
            </button>
          </form>

        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <a href="/" className="inline-flex items-center gap-2 group">

 <img src={logo} alt="DzShopi" className="w-40" />

            </a>

            <p className="mt-5 text-sm leading-7 text-gray-400">
              Your shopping destination in Algeria.
              Discover a wide selection of products
              designed to meet all your needs.
            </p>

            {/* Social Media */}
            <div className="flex flex-wrap gap-3 mt-6">

              {/* Facebook */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-3 rounded-xl bg-white/5 hover:bg-[#00A86B] hover:-translate-y-1 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.6-4.3 4.5V10H7.2v3h2.7v8h3.6z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 rounded-xl bg-white/5 hover:bg-[#00A86B] hover:-translate-y-1 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-xl bg-white/5 hover:bg-[#00A86B] hover:-translate-y-1 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM3 9h4v12H3zM9 9h4v1.7c.6-1.1 1.8-2 3.6-2 3.2 0 4.4 2 4.4 5.3V21h-4v-6.2c0-1.7-.5-2.7-1.9-2.7-1.5 0-2.1 1.1-2.1 2.7V21H9z" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-xl bg-white/5 hover:bg-[#00A86B] hover:-translate-y-1 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.3-4.5-1.1-4.5-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.3 4.7-4.5 5 .4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Navigation */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">

              <li>
                <a href="/" className="hover:text-[#00A86B] transition">
                  Home
                </a>
              </li>

              <li>
                <a href="/products" className="hover:text-[#00A86B] transition">
                  All Products
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-[#00A86B] transition">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-[#00A86B] transition">
                  Contact Us
                </a>
              </li>

            </ul>
          </div>

          {/* Categories */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Our Categories
            </h3>

            <ul className="space-y-4 text-sm text-gray-400">

              {categories
                .slice(0, showAllCategories ? categories.length : 5)
                .map((category) => (
                  <li key={category}>
                    <a
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="hover:text-[#00A86B] transition duration-300"
                    >
                      {category}
                    </a>
                  </li>
                ))}

            </ul>

            <button
              type="button"
              onClick={() => setShowAllCategories(!showAllCategories)}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#00A86B] hover:text-white transition duration-300"
            >
              {showAllCategories ? "Show Less" : "Show More"}

              <ArrowRight
                size={16}
                className={`transition-transform duration-300 ${
                  showAllCategories ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>

          </div>

          {/* Contact */}
          <div>

            <h3 className="font-bold text-lg mb-5">
              Contact Us
            </h3>

            <ul className="space-y-5 text-sm text-gray-400">

              <li className="flex items-start gap-3">
                <MapPin size={19} className="text-[#00A86B] shrink-0" />
                <span>Algeria</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail size={19} className="text-[#00A86B] shrink-0" />

                <a
                  href="mailto:contact@dzshopi.com"
                  className="hover:text-[#00A86B] transition break-all"
                >
                  contact@dzshopi.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone size={19} className="text-[#00A86B] shrink-0" />
                <span>Customer Service</span>
              </li>

            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">

        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          <p className="text-center">
            © {new Date().getFullYear()} DzShopi. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-5">

            <a
              href="/privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </a>

            <a
              href="/terms"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </a>

          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
