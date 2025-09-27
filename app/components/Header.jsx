"use client";
import Link from "next/link";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useCart } from "@/app/Context/CartContext";

export default function Header() {
  const { cart } = useCart();

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-full mx-auto px-4 md:px-6 flex items-center gap-4 h-20 bg-orange-500">
        {/* Logo + Tagline */}
        <div className="flex items-center gap-3 bg-orange-500">
         <Link href="/" className="flex items-center gap-3 bg-orange-500">
           <img src="/images/daraz.jpg" alt="Daraz Logo" className="h-8" />
         </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="hidden md:block text-sm text-gray-600">Pakistan's Online Shopping</Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1">
          <div className="flex items-center gap-2 bg-gray-100 rounded overflow-hidden">
            <input
              className="flex-1 p-3 bg-transparent outline-none text-sm"
              placeholder="Search in Daraz"
            />
            <button className="p-3 hover:bg-gray-200 transition">
              <FiSearch size={18}/>
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-white text-sm hover:text-black">
            Sign in
          </Link>
          <Link href="/Cart" className="relative flex items-center gap-2 text-white hover:text-black">
            <FiShoppingCart size={20}/>
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
