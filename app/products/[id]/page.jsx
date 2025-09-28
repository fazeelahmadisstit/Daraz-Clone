"use client";
import * as React from "react";
import products from "@/app/data/products.json";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/Context/CartContext";

export default function ProductDetail({ params }) {
  const router = useRouter();
  const { addToCart } = useCart();

  // ✅ unwrap params promise
  const { id } = React.use(params);

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
        {/* ✅ two-line title */}
         <h1 className="text-2xl font-bold py-2">{product.title}</h1>

        <div className="flex items-center gap-2">
          <p className="text-xl font-bold mb-4 text-orange-500 py-2">
            Rs. {product.price?.toLocaleString()}
          </p>
          {product.oldPrice && (
            <span className="line-through text-gray-400 text-xs">
              Rs. {product.oldPrice.toLocaleString()}
            </span>
          )}
          {product.discount && (
            <span className="text-green-600 text-xs">{product.discount}</span>
          )}
        </div>
        <span >
        <button className="ml-10 bg-red-500 text-white px-20 py-2 rounded hover:bg-red-600 mt-4 mr-10">Buy it Now</button>
        <button className="bg-blue-500 text-white px-20 py-2 rounded hover:bg-blue-600 mt-4"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
        </span>
      </div>
    </div>
  );
}
