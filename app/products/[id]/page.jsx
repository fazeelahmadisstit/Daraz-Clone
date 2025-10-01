"use client";
import * as React from "react";
import { use } from "react";
import products from "@/app/data/products.json";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/Context/CartContext";

export default function ProductDetail({ params }) {
  const router = useRouter();
  const { addToCart } = useCart();

  // ✅ unwrap params promise correctly
  const { id } = use(params);

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    return <h1 className="p-6 text-xl">No product found for id: {id}</h1>;
  }

  const handleAddToCart = (item) => {
    addToCart({ ...item, selectedColor }); // ✅ store chosen color in cart
    router.push("/Cart");
  };

  // ✅ normalize colors
  const colors = Array.isArray(product.colors)
    ? product.colors
    : typeof product.colors === "string"
    ? product.colors.split(",").map((c) => c.trim())
    : [];

  // ✅ state for selected color
  const [selectedColor, setSelectedColor] = React.useState(colors[0] || null);

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-contain rounded-lg"
      />

      <div className="flex flex-col">
        {/* Title */}
        <h1 className="text-2xl font-bold py-2">{product.title}</h1>

        {/* Price & Discount */}
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

        {/* ✅ Selectable Color Swatches */}
        {colors.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold mb-2">Available Colors:</p>
            <div className="flex gap-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full border cursor-pointer transition ${
                    selectedColor === color
                      ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                      : "border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                ></button>
              ))}
            </div>

            {selectedColor && (
              <p className="text-xs mt-2">
                Selected Color:{" "}
                <span className="font-semibold">{selectedColor}</span>
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
            Buy it Now
          </button>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
