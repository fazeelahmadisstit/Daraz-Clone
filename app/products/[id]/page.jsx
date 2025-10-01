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
    addToCart({ ...item, selectedColor });
    router.push("/Cart");
  };

  // ✅ normalize colors
  const colors = Array.isArray(product.colors)
    ? product.colors
    : typeof product.colors === "string"
    ? product.colors.split(",").map((c) => c.trim())
    : [];

  const [selectedColor, setSelectedColor] = React.useState(colors[0] || null);

  // ⭐ Function to render stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gold"
            className="w-4 h-4"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.64a1 
            1 0 00.95.69h3.831c.969 0 1.371 
            1.24.588 1.81l-3.102 2.253a1 1 
            0 00-.364 1.118l1.18 3.64c.3.922-.755 
            1.688-1.54 1.118l-3.102-2.253a1 
            1 0 00-1.176 0l-3.102 
            2.253c-.784.57-1.838-.196-1.539-1.118l1.18-3.64a1 
            1 0 00-.364-1.118L2.5 
            9.067c-.783-.57-.38-1.81.588-1.81h3.83a1 
            1 0 00.951-.69l1.18-3.64z" />
          </svg>
        ))}

        {halfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-4 h-4"
          >
            <defs>
              <linearGradient id="half">
                <stop offset="50%" stopColor="gold" />
                <stop offset="50%" stopColor="lightgray" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half)"
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 
              0l1.18 3.64a1 1 0 00.95.69h3.831c.969 
              0 1.371 1.24.588 1.81l-3.102 
              2.253a1 1 0 00-.364 1.118l1.18 
              3.64c.3.922-.755 1.688-1.54 
              1.118l-3.102-2.253a1 1 0 
              00-1.176 0l-3.102 
              2.253c-.784.57-1.838-.196-1.539-1.118l1.18-3.64a1 
              1 0 00-.364-1.118L2.5 
              9.067c-.783-.57-.38-1.81.588-1.81h3.83a1 
              1 0 00.951-.69l1.18-3.64z"
            />
          </svg>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="lightgray"
            className="w-4 h-4"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 
            1.902 0l1.18 3.64a1 1 0 00.95.69h3.831c.969 
            0 1.371 1.24.588 1.81l-3.102 
            2.253a1 1 0 00-.364 1.118l1.18 
            3.64c.3.922-.755 1.688-1.54 
            1.118l-3.102-2.253a1 1 0 
            00-1.176 0l-3.102 
            2.253c-.784.57-1.838-.196-1.539-1.118l1.18-3.64a1 
            1 0 00-.364-1.118L2.5 
            9.067c-.783-.57-.38-1.81.588-1.81h3.83a1 
            1 0 00.951-.69l1.18-3.64z" />
          </svg>
        ))}
      </div>
    );
  };

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

        {/* ⭐ Rating & Reviews */}
        <div className="flex items-center gap-2 mb-3">
          {renderStars(product.rate || 0)}
          <span className="text-sm text-gray-600">
            {product.rate?.toFixed(1)} ({product.reviews} reviews)
          </span>
        </div>

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
