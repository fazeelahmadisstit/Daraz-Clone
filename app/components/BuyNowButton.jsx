"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/Context/CartContext";

export default function BuyNowButton({ product, selectedColor }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    // Add the product into the cart first
    addToCart({ ...product, selectedColor });

    // Then redirect to checkout page
    router.push("/checkout");
  };

  return (
    <button
      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
      onClick={handleBuyNow}
    >
      Buy it Now
    </button>
  );
}
