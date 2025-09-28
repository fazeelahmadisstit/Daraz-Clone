"use client";
import Link from "next/link";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/app/Context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { cart } = useCart();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setQuery(""); // clear input after search
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-full mx-auto px-4 md:px-6 flex flex-wrap items-center gap-4 h-auto py-3 md:h-20 bg-orange-500">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/daraz.jpg" alt="Daraz Logo" className="h-8" />
          </Link>
          <span className="hidden md:block text-sm text-white">
            Pakistan's Online Shopping
          </span>
        </div>

        {/* Search Bar (full width on mobile) */}
        <div className="flex-1 w-full md:w-auto order-3 md:order-2">
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 bg-gray-100 rounded overflow-hidden"
          >
            <input
              className="flex-1 p-2 md:p-3 bg-transparent outline-none text-sm"
              placeholder="Search in Daraz"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="p-2 md:p-3 hover:bg-gray-200 transition">
              <FiSearch size={18} />
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 order-2 md:order-3 ml-auto">
          <Link
            href="/login"
            className="hidden md:block text-white text-sm hover:text-black"
          >
            Sign in
          </Link>
          <Link
            href="/Cart"
            className="relative flex items-center gap-2 text-white hover:text-black"
          >
            <FiShoppingCart size={20} />
            <span className="text-xs">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] rounded-full px-1">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
