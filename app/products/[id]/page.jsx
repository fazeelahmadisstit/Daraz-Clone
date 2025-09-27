"use client";
import * as React from "react";
import products from "@/app/data/products.json";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/Context/CartContext";

export default function ProductDetail({ params }) {
  const router = useRouter();
  const { addToCart } = useCart();
 const { id } = React.use(params); // ✅ unwrap the promise
  
  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return <h1 className="p-6 text-xl">No product found for id: {id}</h1>;
  }

  const handleAddToCart = (item) => {
    addToCart(item);
    router.push("/Cart");
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-contain rounded-lg"
      />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600 my-4">{product.description}</p>
        <p className="text-xl font-bold mb-4">Rs.{product.price}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
